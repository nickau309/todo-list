import { Plugin, TextSelection } from "@tiptap/pm/state";
import { Extension, getMarkRange } from "@tiptap/react";
import {
  FLOATING_LINK_EDITOR_INIT_STATE,
  FLOATING_LINK_EDITOR_META_KEYS,
  FLOATING_LINK_EDITOR_PLUGIN_KEY,
} from "../constants/floating-link-editor";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    floatingLinkEditor: {
      setIsFloatingLinkEditorOpen: (open: boolean) => ReturnType;
    };
  }
}

const FloatingLinkEditor = Extension.create({
  name: "floatingLinkEditor",
  addCommands() {
    return {
      setIsFloatingLinkEditorOpen:
        (open: boolean) =>
        ({ tr }) => {
          tr.setMeta(FLOATING_LINK_EDITOR_META_KEYS.IS_OPEN, open);
          return true;
        },
    };
  },
  addProseMirrorPlugins() {
    const plugin = new Plugin({
      key: FLOATING_LINK_EDITOR_PLUGIN_KEY,
      state: {
        init: () => FLOATING_LINK_EDITOR_INIT_STATE,
        apply: (tr, value) => {
          const isOpen = tr.getMeta(
            FLOATING_LINK_EDITOR_META_KEYS.IS_OPEN,
          ) as unknown;
          if (typeof isOpen === "boolean") {
            return { isOpen };
          }
          return value;
        },
      },
      props: {
        handleClick: (view, pos, event) => {
          const target = event.target;
          if (!(target instanceof Element)) {
            return;
          }

          const anchor = target.closest("a");
          if (anchor === null) {
            return;
          }

          const markRange = getMarkRange(
            view.state.doc.resolve(pos),
            view.state.schema.marks.link,
          );
          if (!markRange) {
            return;
          }

          const newSelection = TextSelection.create(
            view.state.doc,
            markRange.from,
            markRange.to,
          );

          const transaction = view.state.tr
            .setMeta(FLOATING_LINK_EDITOR_META_KEYS.IS_OPEN, true)
            .setSelection(newSelection);
          view.dispatch(transaction);
        },
      },
    });

    return [plugin];
  },
});

export default FloatingLinkEditor;
