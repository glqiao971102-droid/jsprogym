import { getPayload } from "payload";
import config from "../payload.config";

const DEFAULTS = [
  { name: "Chest", nameZh: "胸部", nameMs: "Dada", slug: "chest", order: 1 },
  { name: "Back", nameZh: "背部", nameMs: "Belakang", slug: "back", order: 2 },
  { name: "Shoulders", nameZh: "肩部", nameMs: "Bahu", slug: "shoulders", order: 3 },
  { name: "Arms", nameZh: "手臂", nameMs: "Lengan", slug: "arms", order: 4 },
  { name: "Legs", nameZh: "腿部", nameMs: "Kaki", slug: "legs", order: 5 },
  { name: "Glutes", nameZh: "臀部", nameMs: "Punggung", slug: "glutes", order: 6 },
  { name: "Core", nameZh: "核心", nameMs: "Teras", slug: "core", order: 7 },
  { name: "Full Body", nameZh: "全身", nameMs: "Seluruh Badan", slug: "full-body", order: 8 },
  { name: "Cardio", nameZh: "有氧", nameMs: "Kardio", slug: "cardio", order: 9 },
];

const payload = await getPayload({ config });

for (const a of DEFAULTS) {
  const existing = await payload.find({
    collection: "areas",
    where: { slug: { equals: a.slug } },
    limit: 1,
  });
  if (existing.docs.length) {
    console.log(`skip (exists): ${a.slug}`);
    continue;
  }
  await payload.create({ collection: "areas", data: a });
  console.log(`created: ${a.slug} — ${a.name}`);
}

console.log("done");
process.exit(0);
