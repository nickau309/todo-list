export type TextOverflow = "truncate";

export default function getTextOverflow(textOverflow?: TextOverflow) {
  switch (textOverflow) {
    case "truncate":
      return "truncate";
    default:
      return textOverflow;
  }
}
