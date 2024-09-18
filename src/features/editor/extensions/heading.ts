import { mergeAttributes } from "@tiptap/core";
import type { Level } from "@tiptap/extension-heading";
import Heading from "@tiptap/extension-heading";
import clsx from "clsx";

const headingClasses = {
  1: clsx(
    "mt-7 text-[1.35em]/[1.35] font-semibold",
    "[&+:not(h2)]:mt-[7px] [&+h2]:mt-[21px]",
  ),
  2: clsx(
    "mt-[21px] text-[1.2em]/[1.45] font-semibold",
    "[&+:not(h3)]:mt-[7px] [&+h3]:mt-[21px]",
  ),
  3: clsx("mt-3.5 font-semibold", "[&+h4]:mt-[21px]"),
  4: clsx("mt-3.5 font-semibold", "[&+h5]:mt-[21px]"),
  5: clsx("mt-3.5 font-semibold", "[&+h6]:mt-[21px]"),
  6: "mt-3.5 font-semibold",
} as const;

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level as Level;
    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, {
        class: headingClasses[level],
      }),
      0,
    ];
  },
});

export default CustomHeading;
