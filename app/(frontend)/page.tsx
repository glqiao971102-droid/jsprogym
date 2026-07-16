import { getPayload } from "payload";
import config from "@payload-config";
import HomeContent, { type AreaCover } from "@/components/HomeContent";
import { getReviews } from "@/lib/reviews";
import type { Lang } from "@/lib/i18n";

// Content comes from Payload, so render fresh each request (admin edits show up).
export const dynamic = "force-dynamic";

async function loadAreaCovers(): Promise<AreaCover[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "areas",
      locale: "all",
      depth: 1,
      sort: "order",
      limit: 20,
    });
    return res.docs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((a: any) => {
        const cover = a.cover as { url?: string } | undefined;
        const gallery = Array.isArray(a.gallery) ? a.gallery : [];
        const firstUrl =
          (cover && typeof cover === "object" && cover.url) ||
          (gallery[0] && typeof gallery[0] === "object" && (gallery[0] as { url?: string }).url) ||
          null;
        return {
          slug: String(a.slug ?? ""),
          name: (a.name ?? {}) as Partial<Record<Lang, string>>,
          cover: firstUrl ? String(firstUrl) : null,
          count: gallery.length,
        };
      })
      .filter((a): a is AreaCover => !!a.cover);
  } catch {
    return [];
  }
}

export default async function Page() {
  const [rv, areas] = await Promise.all([getReviews(), loadAreaCovers()]);
  return <HomeContent rv={rv} areas={areas} />;
}
