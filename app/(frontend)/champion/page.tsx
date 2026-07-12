import type { Metadata } from "next";
import ChampionContent from "@/components/ChampionContent";

export const metadata: Metadata = {
  title: "JSPROGYM Champions — Hall of Fame",
  description:
    "Meet the JSPROGYM Champions — our members of the month, transformation stories and monthly leaderboard.",
};

export default function Page() {
  return <ChampionContent />;
}
