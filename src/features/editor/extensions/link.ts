import {
  InputRule,
  PasteRule,
  markInputRule,
  markPasteRule,
} from "@tiptap/core";
import Link from "@tiptap/extension-link";

const inputRegex = /(?:^|\s)\[([^\]]*)?\]\((\S+)(?:\s+["']([^)]+)["'])?\)$/;

const pasteRegex = /(?:^|\s)\[([^\]]*)?\]\((\S+)(?:\s+["']([^)]+)["'])?\)/g;

const linkInputRule: typeof markInputRule = (config) => {
  const defaultMarkInputRule = markInputRule(config);

  return new InputRule({
    find: config.find,
    handler: (props) => {
      defaultMarkInputRule.handler(props);
      props.state.tr.setMeta("preventAutolink", true);
    },
  });
};

const linkPasteRule: typeof markPasteRule = (config) => {
  const defaultMarkPasteRule = markPasteRule(config);

  return new PasteRule({
    find: config.find,
    handler: (props) => {
      defaultMarkPasteRule.handler(props);
      props.state.tr.setMeta("preventAutolink", true);
    },
  });
};

/**
 * @see https://github.com/ueberdosis/tiptap/discussions/1865
 */
const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      title: {
        default: null,
      },
    };
  },
  addInputRules() {
    const inputRule = linkInputRule({
      find: inputRegex,
      type: this.type,

      // We need to use `pop()` to remove the last capture groups from the match to
      // satisfy Tiptap's `markInputRule` expectation of having the content as the last
      // capture group in the match (this makes the attribute order important)
      getAttributes(match) {
        return {
          title: match.pop()?.trim(),
          href: match.pop()?.trim(),
        };
      },
    });
    return [inputRule];
  },
  addPasteRules() {
    const pasteRule = linkPasteRule({
      find: pasteRegex,
      type: this.type,

      // We need to use `pop()` to remove the last capture groups from the match to
      // satisfy Tiptap's `markPasteRule` expectation of having the content as the last
      // capture group in the match (this makes the attribute order important)
      getAttributes(match) {
        return {
          title: match.pop()?.trim(),
          href: match.pop()?.trim(),
        };
      },
    });
    return [pasteRule];
  },
});

export default CustomLink;
