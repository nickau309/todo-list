import { deleteAccountImage } from "@/assets";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-[400px] flex-col gap-4 pb-8">
        <h1 className="font-reactist text-[32px]/[40.8px] font-bold">
          Account deleted
        </h1>
        <p className="text-sm/[17.6px] font-bold">
          Your account has been deleted.
        </p>
        <p className="text-sm/[17.6px]">
          Thanks for trying Todoist, help us improve by{" "}
          <span className="inline-block">providing feedback</span>.
        </p>
      </div>
      <div className="hidden items-start min-[992px]:flex">
        <Image
          src={deleteAccountImage}
          alt="delete account image"
          width={479.29}
        />
      </div>
    </div>
  );
}
