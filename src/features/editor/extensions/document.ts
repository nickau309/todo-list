import Document from "@tiptap/extension-document";

type CustomDocumentType = {
  multiline: boolean;
};

/**
 * Custom extension that extends the built-in `Document` extension to define a schema for multiline
 * or singleline rich-text documents (as opposed to the multiple block nodes by default).
 *
 * @see https://github.com/Doist/typist/blob/v6.0.8/src/extensions/rich-text/rich-text-document.ts
 */
const CustomDocument = Document.extend<CustomDocumentType>({
  addOptions() {
    return {
      multiline: true,
    };
  },
  content() {
    if (this.options.multiline) {
      return "block+";
    }
    return "block";
  },
});

export default CustomDocument;
