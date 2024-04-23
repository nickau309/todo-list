import { forgetPasswordImage } from "@/assets";
import ForgetPasswordForm from "@/components/auth/forget-password-form";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Can't sign in? Forgot your password?",
};

export default function Page() {
  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-[400px] flex-col gap-4 pb-8">
        <h1 className="font-reactist text-[32px]/[40.8px] font-bold">
          Forgot your password?
        </h1>
        <div className="p-1" />
        <ForgetPasswordForm />
        <div className="p-1" />
        <hr className="border-divider-secondary" />
        <div className="text-center text-[13px]/[16.8px]">
          <Link href="/auth/login" className="underline">
            Go to login
          </Link>
        </div>
      </div>
      <div className="hidden items-start min-[992px]:flex">
        <Image
          src={forgetPasswordImage}
          alt="forget password image"
          width={450}
        />
      </div>
    </div>
  );
}
