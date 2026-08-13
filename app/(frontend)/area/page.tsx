import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import AreaContent, { type AreaData } from "@/components/AreaContent";

export const metadata: Metadata = {
  title: "Our Gym — JSPROGYM",
  description: "Explore every training zone at JSPROGYM — photo gallery by area.",
};

export const dynamic = "force-dynamic";

async function loadAreas(): Promise<AreaData[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "areas",
      locale: "all",
      depth: 1,
      sort: "order",
      limit: 50,
    });
    return res.docs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((a: any) => {
        const gallery = Array.isArray(a.gallery) ? a.gallery : [];
        const photos = (gallery as unknown[])
          .map((m) =>
            m && typeof m === "object" && "url" in m
              ? { url: String((m as { url?: string }).url ?? ""), alt: String((m as { alt?: string }).alt ?? "") }
              : null
          )
          .filter((p): p is { url: string; alt: string } => !!p && !!p.url);
        return {
          slug: String(a.slug ?? ""),
          name: (a.name ?? {}) as AreaData["name"],
          group: String(a.group ?? ""),
          photos,
        };
      })
      // Personal Training has its own dedicated landing page (/personal-training)
      .filter((a) => a.photos.length > 0 && a.slug !== "personal-training");
  } catch (err) {
    console.error("[area] failed to load areas:", err);
    return [];
  }
}

export default async function Page() {
  const areas = await loadAreas();
  return <AreaContent areas={areas} />;
}
