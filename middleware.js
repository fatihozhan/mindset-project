import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.SECRET_KEY,
  });
  if (request.nextUrl.pathname.startsWith("/user-info")) {
    if (!token?.sub) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname == "/") {
    if (token?.sub) {
      return NextResponse.redirect(new URL("/user-info", request.url));
    }
  }
}
