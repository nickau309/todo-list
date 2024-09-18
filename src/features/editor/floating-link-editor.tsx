import { Delete2Icon24 } from "@/assets";
import {
  FloatingFocusManager,
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
import { useEditorState } from "@tiptap/react";
import clsx from "clsx";
import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  FLOATING_LINK_EDITOR_INIT_STATE,
  FLOATING_LINK_EDITOR_META_KEYS,
  FLOATING_LINK_EDITOR_PLUGIN_KEY,
} from "./constants/floating-link-editor";

type EditorProps = {
  editor: Editor;
};

export default function FloatingLinkEditor({ editor }: EditorProps) {
  const { isOpen } = useEditorState({
    editor,
    selector: ({ editor }) => {
      return (
        FLOATING_LINK_EDITOR_PLUGIN_KEY.getState(editor.state) ??
        FLOATING_LINK_EDITOR_INIT_STATE
      );
    },
  });

  const [inputUrl, setInputUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const onOpenChange = useCallback(
    (open: boolean) => {
      editor.commands.setIsFloatingLinkEditorOpen(open);
    },
    [editor],
  );

  const { context, floatingStyles, refs } = useFloating({
    placement: "top",
    open: isOpen,
    onOpenChange,
    middleware: [inline(), offset(2.4), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0 },
  });

  useEffect(() => {
    const handleTransaction = ({
      editor,
      transaction,
    }: EditorEvents["transaction"]) => {
      const isOpen = transaction.getMeta(
        FLOATING_LINK_EDITOR_META_KEYS.IS_OPEN,
      ) as unknown;
      if (typeof isOpen !== "boolean" || !isOpen) {
        return;
      }

      const href = editor.getAttributes("link").href as unknown;
      const defaultUrl = typeof href === "string" ? href : "";
      setInputUrl(defaultUrl);
      setLinkUrl(defaultUrl);

      const { ranges } = editor.state.selection;
      const from = Math.min(...ranges.map((range) => range.$from.pos));
      const to = Math.max(...ranges.map((range) => range.$to.pos));
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

    editor.on("transaction", handleTransaction);
    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor, refs]);

  if (!isMounted) {
    return null;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isValid) {
      const newHref = inputUrl.includes(":") ? inputUrl : "https://" + inputUrl;
      editor
        .chain()
        .focus()
        .setIsFloatingLinkEditorOpen(false)
        .setLink({ href: newHref })
        .run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().setIsFloatingLinkEditorOpen(false).unsetLink().run();
  };

  const hasHref = linkUrl !== "";
  const isValid = inputUrl !== linkUrl && inputUrl !== "";

  return (
    <FloatingPortal id="root">
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-40"
          {...getFloatingProps()}
        >
          <div
            style={styles}
            className={clsx(
              "box-content flex h-9 w-[300px] overflow-hidden rounded-[5px] border border-input-idle",
              "bg-background-base-primary shadow-[0_2px_8px_rgba(0,0,0,.12)]",
              "focus-within:border-input-focus",
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="flex h-full min-w-0 flex-1 items-center"
            >
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="Paste or type a link"
                value={inputUrl}
                className={clsx(
                  "flex-1 px-2.5 font-sans text-sm/[18.4px] text-actionable-tertiary-idle-tint",
                  "placeholder:text-display-tertiary-idle-tint",
                  "focus-visible:outline-none",
                )}
              />
              {isValid && (
                <button
                  type="submit"
                  aria-disabled={false}
                  className={clsx(
                    "mr-0.5 flex h-8 select-none items-center rounded-[5px] border border-transparent px-3",
                    "text-actionable-tertiary-idle-tint",
                    "transition-colors duration-300",
                    "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-tertiary-disabled-tint",
                    "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                    "custom-hocus:bg-actionable-tertiary-hover-fill custom-hocus:text-actionable-tertiary-hover-tint",
                  )}
                >
                  <span className="truncate text-[13px]/8 font-semibold">
                    Apply
                  </span>
                </button>
              )}
            </form>
            {hasHref && (
              <div className="relative flex">
                <div className="absolute top-1/2 h-6 w-px -translate-y-1/2 bg-divider-secondary" />
                <button
                  type="button"
                  aria-disabled={false}
                  aria-label="Remove link"
                  onClick={removeLink}
                  className={clsx(
                    "relative grid h-9 w-8 place-items-center rounded-r-[5px] border border-transparent",
                    "text-actionable-quaternary-idle-tint",
                    "transition-colors duration-300",
                    "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                    "custom-hocus:bg-actionable-tertiary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
                  )}
                >
                  <Delete2Icon24 />
                </button>
              </div>
            )}
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}
