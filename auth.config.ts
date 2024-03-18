import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) {
        if (nextUrl.pathname.startsWith("/auth")) {
          return NextResponse.redirect(new URL("/todo-list", nextUrl));
        }
      } else {
        if (/^\/(app|todo-list)(\/|$)/.test(nextUrl.pathname)) {
          return false;
        }
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
