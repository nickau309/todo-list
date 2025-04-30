export type FontFamily =
  | "reactist"
  | "sans"
  | "monospace"
  | (string & NonNullable<unknown>);

export default function getFontFamily(fontFamily?: FontFamily) {
  switch (fontFamily) {
    case "reactist":
      return "font-reactist";
    case "sans":
      return "font-sans";
    case "monospace":
      return "font-monospace";
    default:
      return fontFamily;
  }
}
