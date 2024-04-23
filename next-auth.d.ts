import type { User as AuthUser } from "next/auth";

declare module "next-auth" {
  export interface User extends AuthUser {
    uid?: string;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    uid?: string;
  }
}
