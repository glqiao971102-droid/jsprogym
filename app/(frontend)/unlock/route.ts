import { NextResponse, type NextRequest } from "next/server";
import { SITE_PASSWORD, UNLOCK_COOKIE, UNLOCK_TOKEN } from "@/lib/site-lock";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  if (password === SITE_PASSWORD) {
    const res = NextResponse.redirect(new URL("/", req.url), 303);
    res.cookies.set(UNLOCK_COOKIE, UNLOCK_TOKEN, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  return NextResponse.redirect(new URL("/maintenance?error=1", req.url), 303);
}
