import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
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
import CustomLink from "./extensions/link";

type UseDescriptionViewerInTaskListProps = {
  description: string;
  isTaskCompleted: boolean;
};

export default function useDescriptionViewerInTaskList({
  description,
  isTaskCompleted,
}: UseDescriptionViewerInTaskListProps) {
  const descriptionViewer = useEditor({
    content: marked.parse(description),
    extensions: [
      // Node
      Blockquote.configure({
        HTMLAttributes: {
          class: "inline text-display-secondary-idle-tint",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "inline list-none",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: clsx(
            "inline rounded-[5px] border border-divider-primary",
            "bg-background-base-secondary font-monospace text-[.875em]/[1.6] text-display-primary-idle-tint",
          ),
        },
      }),
      CustomDocument,
      HardBreak,
      Heading.configure({
        HTMLAttributes: {
          class: "inline",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "inline",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "inline list-none",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "inline",
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
          class: clsx(
            "rounded-[5px] border border-divider-primary",
            "bg-background-base-secondary font-monospace text-[.875em]/[1.6] text-display-primary-idle-tint",
          ),
        },
      }),
      Italic,
      CustomLink.configure({
        HTMLAttributes: {
          class: clsx(
            isTaskCompleted
              ? "text-[#808080]"
              : "text-display-secondary-idle-tint",
            "underline decoration-display-secondary-idle-tint",
            "hover:text-display-accent-secondary-tint hover:decoration-display-accent-secondary-tint",
            "focus:text-display-accent-secondary-tint focus:decoration-display-accent-secondary-tint",
            "active:text-display-accent-secondary-tint active:decoration-display-accent-secondary-tint",
          ),
        },
      }),
      Strike,
    ],
    editable: false,
    editorProps: {
      attributes: {
        class:
          "line-clamp-1 break-all font-sans text-xs/normal text-display-secondary-idle-tint",
      },
    },
    immediatelyRender: false,
  });

  return descriptionViewer;
}
