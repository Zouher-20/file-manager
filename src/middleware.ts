import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, origin } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(`${origin}/auth/signin`));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/my-files"],
};
