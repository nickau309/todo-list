import React from "react";
import { Link } from "react-router-dom";
import { CommentIcon24 } from "@assets";

export default function ProjectCommentButton() {
  return (
    <Link
      to="comment"
      aria-label="Comments"
      className="flex items-center rounded-[3px] text-content-secondary hover:bg-base-secondary-hover hover:text-base-primary"
    >
      <CommentIcon24 />
      <span className="ml-[3px] mr-1.5 text-xs max-[1055px]:hidden">
        Comments
      </span>
    </Link>
  );
}
