import { Anton, Barlow } from "next/font/google";

// Display — bold, uppercase, athletic
export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--f-anton",
  display: "swap",
});

// Body / UI
export const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--f-barlow",
  display: "swap",
});

export const fontVars = `${anton.variable} ${barlow.variable}`;
