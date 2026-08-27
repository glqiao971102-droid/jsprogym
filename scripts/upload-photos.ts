import { getPayload } from "payload";
import config from "../payload.config";
import { readdirSync, statSync, mkdirSync, renameSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";
import { tmpdir } from "os";
import os from "os";

// Drop photos/videos into ~/Desktop/jspro-photos/<category>/ and run this.
// <category> can be the area name or slug, e.g. "Environment",
// "Personal Trainer Class", "Chest", "Ladies Area".
const BASE = join(os.homedir(), "Desktop", "jspro-photos");

const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
const VID = /\.(mov|mp4|m4v)$/i;
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// collect image + video files at any depth under `dir`, skipping _done
function walkMedia(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    if (e === "_done" || e.startsWith(".")) continue;
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkMedia(full));
    else if (IMG.test(e) || VID.test(e)) out.push(full);
  }
  return out;
}

// videos: convert .mov/.m4v to a web-friendly H.264 720p mp4; pass .mp4 through
let convCount = 0;
function toUploadable(full: string): string {
  if (!VID.test(full) || /\.mp4$/i.test(full)) return full;
  const out = join(tmpdir(), `jspro-conv-${convCount++}.mp4`);
  execFileSync("/usr/bin/avconvert", ["-p", "Preset1280x720", "-s", full, "-o", out], { stdio: "ignore" });
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
// index by slug AND by the (slugified) display name, so a folder named
// "Group Class" matches even though its slug is "hyrox"
for (const a of areasRes.docs as any[]) {
  bySlug.set(a.slug, a);
  if (a.name) bySlug.set(slugify(String(a.name)), a);
}

const subdirs = readdirSync(BASE).filter((d) => {
  try { return statSync(join(BASE, d)).isDirectory() && !d.startsWith("_"); } catch { return false; }
});

let totalUploaded = 0;
for (const dir of subdirs) {
  const slug = slugify(dir);
  const area = bySlug.get(slug);
  if (!area) { console.log(`⚠ no matching category for folder "${dir}" (slug: ${slug}) — skipped`); continue; }

  const folder = join(BASE, dir);
  const files = walkMedia(folder);
  if (!files.length) { console.log(`(${dir}) no media`); continue; }

  const newIds: number[] = [];
  const doneDir = join(folder, "_done");
  for (const full of files) {
    const base = full.split("/").pop() as string;
    try {
      const uploadPath = toUploadable(full); // convert .mov -> .mp4 if needed
      const media = await payload.create({
        collection: "media",
        filePath: uploadPath,
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
