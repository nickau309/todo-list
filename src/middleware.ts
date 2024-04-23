import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const isLoggedIn = !!request.auth?.user;

  if (isLoggedIn) {
    if (/^\/auth(\/(?!password$).*)?$/.test(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/app", request.url));
    } else if (request.nextUrl.pathname === "/app") {
      return NextResponse.redirect(new URL("/app/today", request.url));
    } else if (request.nextUrl.pathname === "/app/settings") {
      return NextResponse.redirect(
        new URL("/app/settings/account", request.url),
      );
    }
  } else {
    if (/^\/(app|todo-list)(\/|$)/.test(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
