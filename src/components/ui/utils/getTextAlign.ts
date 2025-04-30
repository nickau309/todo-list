export type TextAlign = "left";

export default function getTextAlign(textAlign?: TextAlign) {
  switch (textAlign) {
    case "left":
      return "text-left";
    default:
      return textAlign;
  }
}
