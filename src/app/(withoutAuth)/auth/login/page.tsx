import { loginImage } from "@/assets";
import LoginForm from "@/components/auth/login-form";
import { OAUTH_PROVIDERS } from "@/constants/settings";
import clsx from "clsx";
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
        <h1 className="text-[32px]/[40.8px] font-bold">Log in</h1>
        <div className="p-1" />
        <div className="flex flex-col gap-3">
          {OAUTH_PROVIDERS.map((provider) => {
            const Icon = provider.small_icon;
            return (
              <a
                key={provider.name}
                aria-describedby="agreement-footnote"
                aria-disabled="true"
                className={clsx(
                  "flex h-12 min-w-[68px] select-none items-center justify-center gap-2.5 rounded-lg border border-divider-secondary px-4",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                  "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-actionable-quaternary-hover-fill",
                )}
              >
                <span className="-ml-1.5">
                  <Icon className="size-4" />
                </span>
                <span className="truncate text-lg/loose font-semibold">
                  Continue with {provider.name}
                </span>
              </a>
            );
          })}
        </div>
        <hr className="border-divider-secondary" />
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
        <hr className="border-divider-secondary" />
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
