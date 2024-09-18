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

export default function useNameViewer({
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
      Paragraph.configure({
        HTMLAttributes: {
          class: "my-3.5",
        },
      }),
      Text,
      // Mark
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold",
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

  return nameViewer;
}
