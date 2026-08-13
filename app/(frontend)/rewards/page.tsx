import type { Metadata } from "next";
import RewardsContent from "@/components/RewardsContent";

export const metadata: Metadata = {
  title: "JSPROGYM — Rewards",
  description:
    "Earn JSPROGYM reward points every time you spend and every day you train. Redeem points for real savings on anything — including your membership.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <RewardsContent />;
}
