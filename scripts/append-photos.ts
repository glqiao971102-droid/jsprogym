import { getPayload } from "payload";
import fs from "fs";
import path from "path";
import config from "../payload.config";

// Usage: node --env-file=.env --import tsx scripts/append-photos.ts <slug> <dir>
const slug = process.argv[2];
const dir = process.argv[3];
if (!slug || !dir) {
  console.error("need <slug> <dir>");
  process.exit(1);
}

const payload = await getPayload({ config });

const res = await payload.find({ collection: "areas", where: { slug: { equals: slug } }, depth: 0, limit: 1 });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const area: any = res.docs[0];
if (!area) {
  console.error(`area '${slug}' not found`);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const newIds: number[] = [];
for (const f of files) {
  const doc = await payload.create({
    collection: "media",
    data: { alt: `${area.slug} — JSPROGYM` },
    filePath: path.join(dir, f),
  });
  newIds.push(doc.id as number);
}

const existing: number[] = (area.gallery ?? []).map((g: unknown) => (typeof g === "object" && g ? (g as { id: number }).id : g)) as number[];
const gallery = [...existing, ...newIds];
const cover = area.cover ?? newIds[0];
await payload.update({ collection: "areas", id: area.id, data: { gallery, cover } as never });

console.log(`${slug}: added ${newIds.length}, total now ${gallery.length}`);
process.exit(0);
