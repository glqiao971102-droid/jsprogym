import { getPayload } from "payload";
import fs from "fs";
import path from "path";
import config from "../payload.config";

const WEB =
  "/private/tmp/claude-501/-Users-gohkheehao-Downloads-led-signboard-website/59ca4250-b138-4741-8da1-57cc9ef6c1fc/scratchpad/web2";

const AREAS = [
  { slug: "personal-training", order: 1, en: "Personal Training", zhHans: "私人教练", zhHant: "私人教練", ms: "Latihan Peribadi" },
  { slug: "power-lifting", order: 2, en: "Power Lifting", zhHans: "力量举", zhHant: "力量舉", ms: "Angkat Kuasa" },
  { slug: "chest", order: 3, en: "Chest", zhHans: "胸部", zhHant: "胸部", ms: "Dada" },
  { slug: "back", order: 4, en: "Back", zhHans: "背部", zhHant: "背部", ms: "Belakang" },
  { slug: "shoulder", order: 5, en: "Shoulder", zhHans: "肩部", zhHant: "肩部", ms: "Bahu" },
  { slug: "bicep-tricep", order: 6, en: "Bicep & Tricep", zhHans: "肱二头 & 肱三头", zhHant: "肱二頭 & 肱三頭", ms: "Bisep & Trisep" },
  { slug: "leg", order: 7, en: "Leg", zhHans: "腿部", zhHant: "腿部", ms: "Kaki" },
  { slug: "core", order: 8, en: "Core", zhHans: "核心", zhHant: "核心", ms: "Teras" },
  { slug: "dumbbell-area", order: 9, en: "Dumbbell Area", zhHans: "哑铃区", zhHant: "啞鈴區", ms: "Kawasan Dumbbell" },
  { slug: "cardio", order: 10, en: "Cardio", zhHans: "有氧区", zhHant: "有氧區", ms: "Kardio" },
  { slug: "accessories", order: 11, en: "Accessories", zhHans: "配件区", zhHant: "配件區", ms: "Aksesori" },
  { slug: "hyrox", order: 12, en: "Hyrox", zhHans: "Hyrox", zhHant: "Hyrox", ms: "Hyrox" },
  { slug: "ladies-area", order: 13, en: "Ladies Area", zhHans: "女士专区", zhHant: "女士專區", ms: "Kawasan Wanita" },
];

const payload = await getPayload({ config });

for (const a of AREAS) {
  const dir = path.join(WEB, a.slug);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
    : [];
  if (!files.length) {
    console.log(`${a.slug}: (no photos, skipped)`);
    continue;
  }

  const mediaIds: number[] = [];
  for (const f of files) {
    const doc = await payload.create({
      collection: "media",
      data: { alt: `${a.en} — JSPROGYM` },
      filePath: path.join(dir, f),
    });
    mediaIds.push(doc.id as number);
  }

  const area = await payload.create({
    collection: "areas",
    locale: "en",
    data: { name: a.en, slug: a.slug, order: a.order, cover: mediaIds[0], gallery: mediaIds } as never,
  });
  for (const [loc, name] of [
    ["zh-Hans", a.zhHans],
    ["zh-Hant", a.zhHant],
    ["ms", a.ms],
  ] as const) {
    await payload.update({ collection: "areas", id: area.id, locale: loc, data: { name } as never });
  }
  console.log(`${a.slug}: ${mediaIds.length} photos`);
}

console.log("done");
process.exit(0);
