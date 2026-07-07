import type { Metadata } from "next";
import { fontVars } from "./fonts";
import "./globals.css";
import "./premium/premium.css";

export const metadata: Metadata = {
  title: "JSPROGYM — Fitness for Everyone",
  description:
    "JSPROGYM — a premium gym in Malaysia. World-class coaching, 60+ weekly classes and a community that shows up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontVars}>{children}</body>
    </html>
  );
}
