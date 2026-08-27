import type { Metadata } from "next";
import MembershipContent from "@/components/MembershipContent";

export const metadata: Metadata = {
  title: "JSPROGYM — Membership Packages",
  description:
    "JSPROGYM membership packages and pricing — 1, 3, 6 and 12-month plans, registration fee, walk-in rate and operational hours.",
};

export const revalidate = 60; // ISR: cache the page, refresh from the CMS at most once a minute

export default function Page() {
  return <MembershipContent />;
}
