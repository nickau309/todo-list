export type LineHeight =
  | "12.8px"
  | "15.2px"
  | "16px"
  | "16.8px"
  | "17.6px"
  | "18.4px"
  | "20px"
  | "23px"
  | "24px"
  | "24.8px"
  | "28px"
  | "32px"
  | "35px"
  | 1.5
  | 1.65
  | (string & NonNullable<unknown>);

export default function getLineHeight(lineHeight?: LineHeight) {
  switch (lineHeight) {
    case "12.8px":
      return "leading-[12.8px]";
    case "15.2px":
      return "leading-[15.2px]";
    case "16px":
      return "leading-4";
    case "16.8px":
      return "leading-[16.8px]";
    case "17.6px":
      return "leading-[17.6px]";
    case "18.4px":
      return "leading-[18.4px]";
    case "20px":
      return "leading-5";
    case "23px":
      return "leading-[23px]";
    case "24px":
      return "leading-6";
    case "24.8px":
      return "leading-[24.8px]";
    case "28px":
      return "leading-7";
    case "32px":
      return "leading-8";
    case "35px":
      return "leading-[35px]";
    case 1.5:
      return "leading-normal";
    case 1.65:
      return "leading-[1.65]";
    default:
      return lineHeight;
  }
}
