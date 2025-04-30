export type FontSize =
  | "10px"
  | "12px"
  | "13px"
  | "14px"
  | "16px"
  | "20px"
  | "26px"
  | (string & NonNullable<unknown>);

export default function getFontSize(fontSize?: FontSize) {
  switch (fontSize) {
    case "10px":
      return "text-[10px]";
    case "12px":
      return "text-xs";
    case "13px":
      return "text-[13px]";
    case "14px":
      return "text-sm";
    case "16px":
      return "text-base";
    case "20px":
      return "text-xl";
    case "26px":
      return "text-[26px]";
    default:
      return fontSize;
  }
}
