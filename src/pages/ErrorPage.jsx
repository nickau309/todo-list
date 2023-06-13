import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { ErrorComponent } from "@components";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex h-full flex-col items-center gap-5 overflow-y-auto overflow-x-hidden bg-base-primary text-default">
      <ErrorComponent errorText={error.statusText || error.message} />
      <Link
        to="/"
        className="rounded-[3px] border border-transparent bg-primary-fill px-3 pb-[7px] pt-1.5 text-[13px]/[17px] text-white"
      >
        Back to Home view
      </Link>
    </div>
  );
}
