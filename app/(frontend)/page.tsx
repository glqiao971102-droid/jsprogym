import HomeContent from "@/components/HomeContent";
import { getReviews } from "@/lib/reviews";

export default async function Page() {
  const rv = await getReviews();
  return <HomeContent rv={rv} />;
}
