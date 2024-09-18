import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import { useEditor } from "@tiptap/react";
import clsx from "clsx";
import { marked } from "marked";
import CustomCode from "./extensions/code";
import CustomDocument from "./extensions/document";
import CustomHeading from "./extensions/heading";
import CustomLink from "./extensions/link";

type UseDescriptionViewerProps = {
  description: string;
  isTaskCompleted: boolean;
};

export default function useDescriptionViewer({
  description,
  isTaskCompleted,
}: UseDescriptionViewerProps) {
  const descriptionViewer = useEditor({
    content: marked.parse(description),
    extensions: [
      // Node
      Blockquote.configure({
        HTMLAttributes: {
          class: clsx(
            "relative my-3.5 px-4 text-display-secondary-idle-tint",
            "before:absolute before:inset-y-[.25em] before:left-0 before:border-l-2 before:border-divider-primary",
            "[&_:first-child]:mt-0",
          ),
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: clsx(
            "mt-[7px] list-disc pl-7",
            "[&_li::marker]:text-[.9em]",
            "[&_ol]:mt-[3.5px]",
            "[&_ul]:mt-[3.5px] [&_ul]:list-[circle]",
            "[&_ul_ul]:list-[square]",
          ),
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: clsx(
            "mt-3.5 block rounded-[5px] border border-divider-primary",
            "bg-background-base-secondary px-3.5 py-[7px] font-monospace text-[.875em]/[1.6]",
          ),
        },
      }),
      CustomDocument,
      HardBreak,
      CustomHeading,
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-3.5 border-divider-secondary",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: clsx(
            "[&+li]:mt-[3.5px]",
            "[&_p:first-child]:my-0",
            "[&_p]:my-[7px]",
          ),
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: clsx(
            "mt-[7px] list-decimal pl-7",
            "[&_li]:pl-1",
            "[&_ol]:mt-[3.5px]",
            "[&_ul]:mt-[3.5px]",
          ),
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "my-3.5",
        },
      }),
      Text,
      // Mark
      Bold.configure({
        HTMLAttributes: {
          class: "font-semibold",
        },
      }),
      CustomCode.configure({
        HTMLAttributes: {
          class:
            "rounded-[5px] border border-divider-primary bg-background-base-secondary px-1 py-0.5 font-monospace text-[.875em]/[1.6]",
        },
      }),
      Italic,
      CustomLink.configure({
        HTMLAttributes: {
          class: clsx(
            "text-display-primary-idle-tint underline",
            "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
            isTaskCompleted
              ? "hover:decoration-display-accent-primary-tint"
              : "hover:text-display-accent-primary-tint",
            isTaskCompleted
              ? "focus:decoration-display-accent-primary-tint"
              : "focus:text-display-accent-primary-tint",
            "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
            isTaskCompleted
              ? "active:decoration-display-accent-primary-tint"
              : "active:text-display-accent-primary-tint",
          ),
        },
      }),
      Strike,
    ],
    editable: false,
    editorProps: {
      attributes: {
        class: clsx(
          "focus-visible:outline-none",
          "[&>:first-child]:mt-0",
          "[&>:last-child]:mb-0",
        ),
      },
    },
    immediatelyRender: false,
  });

  return descriptionViewer;
}
