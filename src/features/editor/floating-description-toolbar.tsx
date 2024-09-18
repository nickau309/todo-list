import {
  BoldIcon24,
  BulletListIcon24,
  CodeIcon24,
  Heading1Icon24,
  Heading2Icon24,
  ItalicIcon24,
  Link2Icon24,
  OrderedListIcon24,
  QuoteIcon24,
} from "@/assets";
import {
  FloatingPortal,
  autoUpdate,
  inline,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import type { Editor, EditorEvents } from "@tiptap/react";
import { isTextSelection, useEditorState } from "@tiptap/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FLOATING_LINK_EDITOR_PLUGIN_KEY } from "./constants/floating-link-editor";

type ToolbarProps = {
  editor: Editor;
};

export default function FloatingDescriptionToolbar({ editor }: ToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isBold,
    isItalic,
    isHeading1,
    isHeading2,
    isQuote,
    isCode,
    isBulletList,
    isOrderedList,
  } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isHeading1: editor.isActive("heading", { level: 1 }),
      isHeading2: editor.isActive("heading", { level: 2 }),
      isQuote: editor.isActive("blockquote"),
      isCode: editor.isActive("code"),
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
    }),
  });

  const { context, floatingStyles, refs } = useFloating({
    placement: "top",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [inline(), offset(2.4), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0 },
  });

  useEffect(() => {
    const handleSelectionUpdate = ({
      editor,
      transaction,
    }: EditorEvents["selectionUpdate"]) => {
      const pointer = transaction.getMeta("pointer") as unknown;
      if (typeof pointer === "boolean" && pointer) {
        setIsOpen(false);
        return;
      }

      const state = FLOATING_LINK_EDITOR_PLUGIN_KEY.getState(editor.state);
      if (state?.isOpen) {
        setIsOpen(false);
        return;
      }

      const doc = editor.state.doc;
      const selection = editor.state.selection;
      const { ranges, empty } = selection;
      const from = Math.min(...ranges.map((range) => range.$from.pos));
      const to = Math.max(...ranges.map((range) => range.$to.pos));
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(selection);

      if (empty || isEmptyTextBlock) {
        setIsOpen(false);
        return;
      }

      setIsOpen(true);

      const fromDom = editor.view.domAtPos(from);
      const toDom = editor.view.domAtPos(to);
      const range = document.createRange();
      range.setStart(fromDom.node, fromDom.offset);
      range.setEnd(toDom.node, toDom.offset);
      refs.setReference({
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      });
    };

    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, refs]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (!editor.isFocused) {
        return;
      }

      const state = FLOATING_LINK_EDITOR_PLUGIN_KEY.getState(editor.state);
      if (state?.isOpen) {
        setIsOpen(false);
        return;
      }

      const doc = editor.state.doc;
      const selection = editor.state.selection;
      const { ranges, empty } = selection;
      const from = Math.min(...ranges.map((range) => range.$from.pos));
      const to = Math.max(...ranges.map((range) => range.$to.pos));
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(selection);

      if (empty || isEmptyTextBlock) {
        setIsOpen(false);
        return;
      }

      setIsOpen(true);

      const fromDom = editor.view.domAtPos(from);
      const toDom = editor.view.domAtPos(to);
      const range = document.createRange();
      range.setStart(fromDom.node, fromDom.offset);
      range.setEnd(toDom.node, toDom.offset);
      refs.setReference({
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      });
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [editor, refs]);

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal id="root">
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="z-40"
        {...getFloatingProps()}
      >
        <div
          onClick={() => {
            editor.commands.focus();
          }}
          style={styles}
          className="flex max-w-[350px] overflow-hidden rounded-[5px]"
        >
          <div
            className={clsx(
              "flex divide-x divide-divider-on-dark overflow-auto",
              "bg-background-raised-quaternary text-display-primary-on-dark-tint",
            )}
          >
            <div className="flex gap-1 px-2 py-1.5">
              <button
                type="button"
                aria-disabled="false"
                aria-label="Bold"
                aria-pressed={isBold}
                onClick={() => {
                  editor.chain().focus().toggleBold().run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <BoldIcon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Italic"
                aria-pressed={isItalic}
                onClick={() => {
                  editor.chain().focus().toggleItalic().run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <ItalicIcon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Heading 1"
                aria-pressed={isHeading1}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <Heading1Icon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Heading 2"
                aria-pressed={isHeading2}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <Heading2Icon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Quote"
                aria-pressed={isQuote}
                onClick={() => {
                  editor.chain().focus().toggleBlockquote().run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <QuoteIcon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Code"
                aria-pressed={isCode}
                onClick={() => {
                  editor.chain().focus().toggleCode().run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <CodeIcon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Bulleted list"
                aria-pressed={isBulletList}
                onClick={() => {
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <BulletListIcon24 />
              </button>
              <button
                type="button"
                aria-disabled="false"
                aria-label="Numbered list"
                aria-pressed={isOrderedList}
                onClick={() => {
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={clsx(
                  "grid size-6 select-none place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "aria-pressed:bg-selectable-primary-on-dark-selected-fill",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <OrderedListIcon24 />
              </button>
            </div>
            <div className="flex gap-1 px-2 py-1.5">
              <button
                type="button"
                aria-disabled="false"
                aria-label="Add link"
                onClick={() => {
                  setIsOpen(false);
                  editor.commands.setIsFloatingLinkEditorOpen(true);
                }}
                className={clsx(
                  "flex h-6 select-none items-center rounded-[5px] pr-1",
                  "transition-colors duration-300",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-primary-on-dark-hover-fill",
                )}
              >
                <span>
                  <Link2Icon24 />
                </span>
                <span className="truncate text-[13px]/8 font-semibold">
                  Link
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FloatingPortal>
  );
}
