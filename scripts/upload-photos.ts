import { getPayload } from "payload";
import fs from "fs";
import path from "path";
import config from "../payload.config";

const WEB =
  "/private/tmp/claude-501/-Users-gohkheehao-Downloads-led-signboard-website/59ca4250-b138-4741-8da1-57cc9ef6c1fc/scratchpad/web";

const AREAS = [
  { slug: "personal-training", order: 1, en: "Personal Training", zhHans: "私人教练", zhHant: "私人教練", ms: "Latihan Peribadi" },
  { slug: "ladies-area", order: 2, en: "Ladies Area", zhHans: "女士专区", zhHant: "女士專區", ms: "Kawasan Wanita" },
  { slug: "chest", order: 3, en: "Chest", zhHans: "胸部", zhHant: "胸部", ms: "Dada" },
  { slug: "back", order: 4, en: "Back", zhHans: "背部", zhHant: "背部", ms: "Belakang" },
  { slug: "leg", order: 5, en: "Leg", zhHans: "腿部", zhHant: "腿部", ms: "Kaki" },
  { slug: "cardio", order: 6, en: "Cardio", zhHans: "有氧区", zhHant: "有氧區", ms: "Kardio" },
  { slug: "level-2-dumbbell", order: 7, en: "Level 2 Dumbbell", zhHans: "二楼哑铃区", zhHant: "二樓啞鈴區", ms: "Dumbbell Tingkat 2" },
  { slug: "hyrox", order: 8, en: "Hyrox", zhHans: "Hyrox", zhHant: "Hyrox", ms: "Hyrox" },
];

const payload = await getPayload({ config });

for (const a of AREAS) {
  const dir = path.join(WEB, a.slug);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
    : [];

  // upload photos to the media library (S3)
  const mediaIds: number[] = [];
  for (const f of files) {
    const doc = await payload.create({
      collection: "media",
      data: { alt: `${a.en} — JSPROGYM` },
      filePath: path.join(dir, f),
    });
    mediaIds.push(doc.id as number);
  }

  // create the area (English), then translate the name
  const area = await payload.create({
    collection: "areas",
    locale: "en",
    data: {
      name: a.en,
      slug: a.slug,
      order: a.order,
      cover: mediaIds[0] ?? null,
      gallery: mediaIds,
    } as never,
  });
  for (const [loc, name] of [
    ["zh-Hans", a.zhHans],
    ["zh-Hant", a.zhHant],
    ["ms", a.ms],
  ] as const) {
    await payload.update({ collection: "areas", id: area.id, locale: loc, data: { name } as never });
  }

  console.log(`${a.slug}: ${mediaIds.length} photos uploaded + linked`);
}

console.log("done");
process.exit(0);
