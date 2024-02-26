import React from "react";
import { errorLogo, errorLogoDark } from "@/assets";
import { useTheme } from "@/contexts";

export default function ErrorComponent({ errorText }) {
  const { name } = useTheme();

  return (
    <div className="flex w-full max-w-[300px] flex-col items-center">
      <div>
        <img
          src={name === "Dark" ? errorLogoDark : errorLogo}
          alt="Error Logo"
        />
      </div>
      <div className="py-2 font-reactist text-base/5 font-semibold">
        {errorText}
      </div>
    </div>
  );
}
