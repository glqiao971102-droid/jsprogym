import { NextResponse, type NextRequest } from "next/server";
import { UNLOCK_COOKIE, UNLOCK_TOKEN } from "./lib/site-lock";

// Site-wide maintenance gate (Next.js 16 "proxy" convention, formerly middleware).
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow the gate itself and its unlock endpoint.
  if (pathname === "/maintenance" || pathname === "/api/unlock") {
    return NextResponse.next();
  }

  // Unlocked visitors pass through.
  if (req.cookies.get(UNLOCK_COOKIE)?.value === UNLOCK_TOKEN) {
    return NextResponse.next();
  }

  // Everyone else sees the maintenance gate (URL unchanged).
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|woff2?)).*)",
  ],
};
