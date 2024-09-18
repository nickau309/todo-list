import { PluginKey } from "@tiptap/pm/state";

export const FLOATING_LINK_EDITOR_INIT_STATE = {
  isOpen: false,
};

export const FLOATING_LINK_EDITOR_META_KEYS = {
  IS_OPEN: "IS_FLOATING_LINK_EDITOR_OPEN",
};

type FloatingLinkEditorState = typeof FLOATING_LINK_EDITOR_INIT_STATE;

export const FLOATING_LINK_EDITOR_PLUGIN_KEY =
  new PluginKey<FloatingLinkEditorState>("floatingLinkEditor");
