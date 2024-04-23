"use client";

import { errorLogo, errorLogoDark } from "@/assets";
import useTheme from "@/hooks/use-theme";

import Image from "next/image";

type ErrorComponentProps = {
  text: string;
};

export default function ErrorComponent({ text }: ErrorComponentProps) {
  const { name } = useTheme();

  return (
    <div className="flex flex-col items-center">
      <div>
        <Image
          src={name === "DARK" ? errorLogoDark : errorLogo}
          alt="Error Logo"
          className="w-[294px]"
        />
      </div>
      <p className="py-2 text-lg/[23.2px] font-semibold">{text}</p>
    </div>
  );
}
