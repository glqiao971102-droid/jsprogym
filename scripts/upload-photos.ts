import { getPayload } from "payload";
import config from "../payload.config";
import { readdirSync, statSync, mkdirSync, renameSync, existsSync } from "fs";
import { join } from "path";
import os from "os";

// Drop photos into ~/Desktop/jspro-photos/<category>/ and run this.
// <category> can be the area name or slug, e.g. "Environment",
// "Personal Trainer Class", "Chest", "Ladies Area".
const BASE = join(os.homedir(), "Desktop", "jspro-photos");

const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// collect image files at any depth under `dir`, skipping the _done folder
function walkImages(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    if (e === "_done" || e.startsWith(".")) continue;
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkImages(full));
    else if (IMG.test(e)) out.push(full);
  }
  return out;
}

const payload = await getPayload({ config });

if (!existsSync(BASE)) {
  console.log(`Folder not found: ${BASE}`);
  console.log(`Create it, then add subfolders named by category and drop photos in.`);
  process.exit(0);
}

// map slug -> area
const areasRes = await payload.find({ collection: "areas", limit: 100, depth: 0 });
const bySlug = new Map<string, any>();
for (const a of areasRes.docs as any[]) bySlug.set(a.slug, a);

const subdirs = readdirSync(BASE).filter((d) => {
  try { return statSync(join(BASE, d)).isDirectory() && !d.startsWith("_"); } catch { return false; }
});

let totalUploaded = 0;
for (const dir of subdirs) {
  const slug = slugify(dir);
  const area = bySlug.get(slug);
  if (!area) { console.log(`⚠ no matching category for folder "${dir}" (slug: ${slug}) — skipped`); continue; }

  const folder = join(BASE, dir);
  const files = walkImages(folder);
  if (!files.length) { console.log(`(${dir}) no images`); continue; }

  const newIds: number[] = [];
  const doneDir = join(folder, "_done");
  for (const full of files) {
    const base = full.split("/").pop() as string;
    try {
      const media = await payload.create({
        collection: "media",
        filePath: full,
        data: { alt: String(area.name ?? dir) },
      } as never);
      newIds.push((media as any).id);
      if (!existsSync(doneDir)) mkdirSync(doneDir);
      let dest = join(doneDir, base);
      let n = 1;
      while (existsSync(dest)) dest = join(doneDir, `${n++}-${base}`);
      renameSync(full, dest); // move so re-runs don't duplicate
      totalUploaded++;
      console.log(`  uploaded ${dir}/${base}`);
    } catch (e) {
      console.log(`  ✗ failed ${dir}/${base}: ${(e as Error).message}`);
    }
  }

  if (newIds.length) {
    const existing = Array.isArray(area.gallery)
      ? area.gallery.map((g: any) => (g && typeof g === "object" ? g.id : g))
      : [];
    const gallery = [...existing, ...newIds];
    const data: Record<string, unknown> = { gallery };
    if (!area.cover) data.cover = newIds[0]; // set a cover if none
    await payload.update({ collection: "areas", id: area.id, data: data as never });
    console.log(`✓ ${dir}: +${newIds.length} photos (now ${gallery.length})`);
  }
}

console.log(`\ndone — uploaded ${totalUploaded} photos.`);
process.exit(0);
