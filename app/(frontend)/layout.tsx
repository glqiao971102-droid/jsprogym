import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { fontVars } from "./fonts";
import { LanguageProvider } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";
import "./globals.css";
import "./premium/premium.css";

export const metadata: Metadata = {
  title: "JSPROGYM — Fitness for Everyone",
  description:
    "JSPROGYM — a premium gym in Malaysia. World-class coaching, 60+ weekly classes and a community that shows up.",
};

const LOCALES: Lang[] = ["en", "zh-Hans", "zh-Hant", "ms"];

type Strings = { key?: string; value?: unknown }[];
type Images = { key?: string; image?: unknown }[];

async function loadContent() {
  const overrides: Record<Lang, Record<string, string>> = {
    en: {},
    "zh-Hans": {},
    "zh-Hant": {},
    ms: {},
  };
  const images: Record<string, string> = {};
  try {
    const payload = await getPayload({ config });
    const [hp, cp] = await Promise.all([
      payload.findGlobal({ slug: "homepage", locale: "all", depth: 1 }),
      payload.findGlobal({ slug: "champion", locale: "all", depth: 1 }),
    ]);
    for (const g of [hp, cp] as { strings?: Strings; images?: Images }[]) {
      for (const row of g?.strings ?? []) {
        if (!row?.key) continue;
        const v = row.value as Record<string, string> | string | undefined;
        for (const loc of LOCALES) {
          const val =
            v && typeof v === "object" ? v[loc] : typeof v === "string" ? v : undefined;
          if (val != null && val !== "") overrides[loc][row.key] = val;
        }
      }
      for (const row of g?.images ?? []) {
        if (!row?.key) continue;
        const im = row.image as { url?: string } | undefined;
        if (im && typeof im === "object" && im.url) images[row.key] = im.url;
      }
    }
  } catch (err) {
    console.error("[layout] failed to load CMS content, using built-in text:", err);
  }
  return { overrides, images };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { overrides, images } = await loadContent();
  return (
    <html lang="en">
      <body className={fontVars}>
        <LanguageProvider overrides={overrides} images={images}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
