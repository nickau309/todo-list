import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import { useEditor } from "@tiptap/react";
import clsx from "clsx";
import { marked } from "marked";
import CustomCode from "./extensions/code";
import CustomDocument from "./extensions/document";
import CustomLink from "./extensions/link";

type UseNameViewerProps = {
  name: string;
  isTaskCompleted: boolean;
};

export default function useNameViewerInTaskList({
  name,
  isTaskCompleted,
}: UseNameViewerProps) {
  const nameViewer = useEditor({
    content: marked.parse(name),
    extensions: [
      // Node
      CustomDocument.configure({
        multiline: false,
      }),
      Paragraph,
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
            "bg-background-base-secondary px-1 py-0.5 font-monospace text-[.875em]/[1.6] text-display-primary-idle-tint",
          ),
        },
      }),
      Italic,
      CustomLink.configure({
        HTMLAttributes: {
          class: clsx(
            isTaskCompleted
              ? "text-[#808080]"
              : "text-display-primary-idle-tint",
            "underline decoration-display-primary-idle-tint",
            !isTaskCompleted && "hover:text-display-accent-primary-tint",
            "hover:decoration-display-accent-primary-tint",
            !isTaskCompleted && "focus:text-display-accent-primary-tint",
            "focus:decoration-display-accent-primary-tint",
            !isTaskCompleted && "active:text-display-accent-primary-tint",
            "active:decoration-display-accent-primary-tint",
          ),
        },
      }),
      Strike,
    ],
    editable: false,
    editorProps: {
      attributes: {
        class: clsx(
          "line-clamp-4 break-words font-sans text-sm/normal",
          isTaskCompleted
            ? "text-[#808080] line-through"
            : "text-display-primary-idle-tint",
        ),
      },
    },
    immediatelyRender: false,
  });

  return nameViewer;
}
