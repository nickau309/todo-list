import prisma from "@/lib/prisma";
import { CredentialSchema } from "@/lib/zod";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "../../auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "login",
      async authorize(credentials) {
        const parsedCredentials = CredentialSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              ...user,
              id: user.id.toString(),
            };
          }
        }

        return null;
      },
    }),
    Credentials({
      id: "signup",
      async authorize(credentials) {
        const parsedCredentials = CredentialSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const hashPassword = await bcrypt.hash(password, 10);

          const user = await prisma.user.create({
            data: {
              email,
              password: hashPassword,
            },
          });

          return {
            ...user,
            id: user.id.toString(),
          };
        }

        return null;
      },
    }),
  ],
});
