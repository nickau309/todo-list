import type { NextAuthConfig } from "next-auth";
import {} from "next-auth/jwt";

const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user, trigger }) {
      if (trigger) {
        token.uid = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.uid = token.uid;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
