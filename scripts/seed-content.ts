import { getPayload } from "payload";
import config from "../payload.config";
import { translations } from "../lib/i18n";

const T = translations;
const OTHER = ["zh-Hans", "zh-Hant", "ms"] as const;

const allKeys = Object.keys(T.en);
const isChampionKey = (k: string) =>
  k.startsWith("cpage.") || k.startsWith("hall") || k.startsWith("board.");

const homepageKeys = allKeys.filter((k) => !isChampionKey(k));
const championKeys = allKeys.filter(isChampionKey);

const homepageImages = [
  "hero.video", "hero.poster", "about.panel",
  "exp.1", "exp.2", "exp.3", "exp.4",
  "blog.1", "blog.2", "blog.3",
  "ig.1", "ig.2", "ig.3", "ig.4", "ig.5", "ig.6",
];
const championImages = ["cotm.photo", "hall.1", "hall.2", "hall.3"];

const payload = await getPayload({ config });

async function seedGlobal(slug: "homepage" | "champion", keys: string[], imageKeys: string[]) {
  const enData = {
    strings: keys.map((k) => ({ key: k, value: T.en[k] ?? "" })),
    images: imageKeys.map((k) => ({ key: k })),
  };
  await payload.updateGlobal({ slug, data: enData as never, depth: 0 });

  const base: any = await payload.findGlobal({ slug, locale: "en", depth: 0 });
  const sIds = (base.strings ?? []).map((r: any) => r.id);
  const iIds = (base.images ?? []).map((r: any) => r.id);

  for (const loc of OTHER) {
    const data = {
      strings: keys.map((k, i) => ({
        id: sIds[i],
        key: k,
        value: (T as any)[loc][k] ?? T.en[k] ?? "",
      })),
      images: imageKeys.map((k, i) => ({ id: iIds[i], key: k })),
    };
    await payload.updateGlobal({ slug, data: data as never, locale: loc, depth: 0 });
  }
  console.log(`seeded ${slug}: ${keys.length} strings, ${imageKeys.length} image slots`);
}

await seedGlobal("homepage", homepageKeys, homepageImages);
await seedGlobal("champion", championKeys, championImages);

await payload.updateGlobal({
  slug: "settings",
  data: { whatsapp: "60137111613", instagramHandle: "jsprogym" } as never,
});
console.log("seeded settings");

console.log("done");
process.exit(0);
