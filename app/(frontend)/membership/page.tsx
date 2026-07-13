import type { Metadata } from "next";
import MembershipContent from "@/components/MembershipContent";

export const metadata: Metadata = {
  title: "JSPROGYM — Membership Packages",
  description:
    "JSPROGYM membership packages and pricing — 1, 3, 6 and 12-month plans, registration fee, walk-in rate and operational hours.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <MembershipContent />;
}
