import { loginImage } from "@/assets";
import LoginForm from "@/components/auth/login-form";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in to Todoist",
};

export default function Page() {
  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-[400px] flex-col gap-4 pb-8">
        <h1 className="font-reactist text-[32px]/[40.8px] font-bold">Log in</h1>
        <div className="p-1" />
        <div className="flex flex-col gap-3">
          {new Array(3).fill(null).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg border border-divider-tertiary"
            ></div>
          ))}
        </div>
        <hr className="border-divider-tertiary" />
        <LoginForm />
        <div className="flex">
          <Link
            href="/auth/password"
            className="text-[13px]/[16.8px] underline"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="text-[13px]/[16.8px]">
          This is a clone of the Todoist app. DO NOT enter the email address or
          password of your actual Todoist account.
        </div>
        <hr className="border-divider-tertiary" />
        <div className="text-center text-[13px]/[16.8px]">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
      <div className="hidden items-center min-[992px]:flex">
        <Image src={loginImage} alt="login image" width={450} />
      </div>
    </div>
  );
}
