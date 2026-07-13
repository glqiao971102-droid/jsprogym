import HomeContent from "@/components/HomeContent";
import { getReviews } from "@/lib/reviews";

// Content comes from Payload, so render fresh each request (admin edits show up).
export const dynamic = "force-dynamic";

export default async function Page() {
  const rv = await getReviews();
  return <HomeContent rv={rv} />;
}
