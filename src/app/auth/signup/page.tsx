import {
  signupImage1,
  signupImage2,
  signupImage3,
  signupImage4,
} from "@/assets";
import SignupForm from "@/components/auth/signup-form";
import EnterTransition from "@/components/enter-transition";
import { CaeciliaLTStd } from "@/fonts";
import clsx from "clsx";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const items = [
  { id: 1, src: signupImage1, text1: "30 million+", text2: "app downloads" },
  { id: 2, src: signupImage2, text1: "15 years+", text2: "in business" },
  { id: 3, src: signupImage3, text1: "2 billion+", text2: "tasks completed" },
  { id: 4, src: signupImage4, text1: "1 million+", text2: "Pro users" },
];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign up for a free Todoist account",
};

export default function Page() {
  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-[400px] flex-col gap-4 pb-8">
        <h1 className="font-reactist text-[32px]/[40.8px] font-bold">
          Sign up
        </h1>
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
        <SignupForm />
        <div className="text-[13px]/[16.8px]">
          This is a clone of the Todoist app. DO NOT enter the email address or
          password of your actual Todoist account.
        </div>
        <hr className="border-divider-tertiary" />
        <div className="text-center text-[13px]/[16.8px]">
          Already signed up?{" "}
          <Link href="/auth/login" className="underline">
            Go to login
          </Link>
        </div>
      </div>
      <div className="relative hidden w-full max-w-[400px] items-center justify-center min-[992px]:flex">
        {Math.random() < 0.5 ? (
          <div className="grid grid-cols-2 gap-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-8 pb-4">
                <Image src={item.src} alt={`image ${item.id}`} />
                <div>
                  <p className="text-center text-base/5 font-bold">
                    {item.text1}
                  </p>
                  <p className="text-center text-sm/[17.6px] text-display-content-secondary">
                    {item.text2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <video
              src="/videos/signupVideo.mp4"
              poster="/images/signupVideoPoster.png"
              autoPlay
              muted
              playsInline
              width={480}
              className="absolute -left-[30px] -top-[60px] max-w-[120%]"
            />

            <EnterTransition
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              entered="[transition:.1s_left_linear]"
            >
              <div
                className={clsx(
                  "absolute left-[51px] top-[280px] w-[328px] space-y-[30px] rounded-lg bg-white p-6 text-[#282f30] shadow-[0_3px_20px_rgb(0,0,0,.15)]",
                  "min-[1250px]:left-[200px]",
                )}
              >
                <p
                  className={clsx(
                    CaeciliaLTStd.className,
                    "text-lg/[31px] font-normal italic tracking-[-.02em]",
                  )}
                >
                  Feel free to use a fake email for sign-up because there is no
                  email verification.
                </p>
                <p className="text-sm/[17.6px]">– Nick A.</p>
              </div>
            </EnterTransition>
          </>
        )}
      </div>
    </div>
  );
}
