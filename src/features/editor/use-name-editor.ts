import turndownService from "@/lib/turndown";
import type { TaskInfoKeyType } from "@/types/task";
import Bold from "@tiptap/extension-bold";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import type { Extensions } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import clsx from "clsx";
import { marked } from "marked";
import type { Dispatch, SetStateAction } from "react";
import { useFormState } from "react-hook-form";
import CustomCode from "./extensions/code";
import CustomDocument from "./extensions/document";
import FloatingLinkEditor from "./extensions/floating-link-editor";
import CustomLink from "./extensions/link";

type UseNameEditorProps = {
  focusingField: TaskInfoKeyType | null;
  setFocusingField: Dispatch<SetStateAction<TaskInfoKeyType | null>>;
  name: string;
  setName: (name: string) => void;
};

const nameEditorExtensions: Extensions = [
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
    openOnClick: "whenNotEditable",
    HTMLAttributes: {
      class: clsx(
        "text-display-primary-idle-tint underline",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "hover:text-display-accent-primary-tint",
        "focus:text-display-accent-primary-tint",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "active:text-display-accent-primary-tint",
      ),
    },
  }),
  Strike,
  // Functionality
  Dropcursor,
  FloatingLinkEditor,
  Gapcursor,
  History,
  Placeholder.configure({
    emptyEditorClass:
      "first:before:pointer-events-none first:before:float-left first:before:h-0 first:before:text-display-tertiary-idle-tint first:before:content-[attr(data-placeholder)]",
    emptyNodeClass: "",
    placeholder: "Task name",
  }),
];

export default function useNameEditor({
  focusingField,
  setFocusingField,
  name,
  setName,
}: UseNameEditorProps) {
  const { isSubmitted, isSubmitting, isValid } = useFormState();

  const nameEditor = useEditor({
    content: marked.parse(name),
    extensions: nameEditorExtensions,
    autofocus: focusingField === "name" && "end",
    editorProps: {
      attributes: {
        class: clsx(
          "focus-visible:outline-none",
          "[&>:first-child]:mt-0",
          "[&>:last-child]:mb-0",
        ),
      },
      handleDOMEvents: {
        focus() {
          setFocusingField("name");
        },
      },
      handleKeyDown(_, e) {
        if (e.key !== "Enter") {
          return;
        }

        const isDisabled = isSubmitted || isSubmitting || !isValid;
        if (isDisabled) {
          return;
        }

        const target = e.target;
        if (!(target instanceof Element)) {
          return;
        }

        const form = target.closest("form");
        form?.requestSubmit();
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const mark = turndownService.turndown(html);
      setName(mark);
    },
    immediatelyRender: false,
  });

  return nameEditor;
}
