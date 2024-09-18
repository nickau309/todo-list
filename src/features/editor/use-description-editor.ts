import turndownService from "@/lib/turndown";
import type { TaskInfoKeyType } from "@/types/task";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import HardBreak from "@tiptap/extension-hard-break";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import type { Extensions } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import clsx from "clsx";
import { marked } from "marked";
import type { Dispatch, SetStateAction } from "react";
import CustomCode from "./extensions/code";
import CustomDocument from "./extensions/document";
import FloatingLinkEditor from "./extensions/floating-link-editor";
import CustomHeading from "./extensions/heading";
import CustomLink from "./extensions/link";

type UseDescriptionEditorProps = {
  focusingField: TaskInfoKeyType | null;
  setFocusingField: Dispatch<SetStateAction<TaskInfoKeyType | null>>;
  description: string;
  setDescription: (description: string) => void;
};

const descriptionEditorExtensions: Extensions = [
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
  ListKeymap,
  Placeholder.configure({
    emptyEditorClass:
      "first:before:pointer-events-none first:before:float-left first:before:h-0 first:before:text-display-tertiary-idle-tint first:before:content-[attr(data-placeholder)]",
    emptyNodeClass: "",
    placeholder: "Description",
  }),
];

export default function useDescriptionEditor({
  focusingField,
  setFocusingField,
  description,
  setDescription,
}: UseDescriptionEditorProps) {
  const descriptionEditor = useEditor({
    content: marked.parse(description),
    extensions: descriptionEditorExtensions,
    autofocus: focusingField === "description" && "end",
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
          setFocusingField("description");
        },
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const mark = turndownService.turndown(html);
      setDescription(mark);
    },
    immediatelyRender: false,
  });

  return descriptionEditor;
}
