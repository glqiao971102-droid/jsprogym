import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import PTContent from "@/components/PTContent";

export const metadata: Metadata = {
  title: "Personal Training — JSPROGYM",
  description:
    "1-on-1 personal training at JSPROGYM — personalised coaching, nutrition and bodybuilding competition prep. Book a free consultation.",
};

export const dynamic = "force-dynamic";

async function loadPT(): Promise<{ photos: { url: string; alt: string }[]; cover: string | null }> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "areas",
      where: { slug: { equals: "personal-training" } },
      depth: 1,
      limit: 1,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a: any = res.docs[0];
    const gallery = Array.isArray(a?.gallery) ? a.gallery : [];
    const photos = (gallery as unknown[])
      .map((m) =>
        m && typeof m === "object" && "url" in m
          ? { url: String((m as { url?: string }).url ?? ""), alt: String((m as { alt?: string }).alt ?? "") }
          : null
      )
      .filter((p): p is { url: string; alt: string } => !!p && !!p.url);
    const cover =
      (a?.cover && typeof a.cover === "object" && a.cover.url) || photos[0]?.url || null;
    return { photos, cover: cover ? String(cover) : null };
  } catch {
    return { photos: [], cover: null };
  }
}

export default async function Page() {
  const { photos, cover } = await loadPT();
  return <PTContent photos={photos} cover={cover} />;
}
