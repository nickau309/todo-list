import { signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/auth/login">Log in</Link>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Log out</button>
      </form>
    </>
  );
}
