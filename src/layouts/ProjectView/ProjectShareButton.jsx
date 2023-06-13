import React from "react";
import { Link } from "react-router-dom";
import { ShareOptionIcon24 } from "@assets";

export default function ProjectShareButton() {
  return (
    <Link
      to="share"
      aria-label="Share options"
      className="flex items-center rounded-[3px] text-content-secondary hover:bg-base-secondary-hover hover:text-base-primary"
    >
      <ShareOptionIcon24 />
      <span className="ml-[3px] mr-1.5 text-xs max-[1055px]:hidden">Share</span>
    </Link>
  );
}
