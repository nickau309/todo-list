export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | (string & NonNullable<unknown>);

export default function getTextColor(textColor?: TextColor) {
  switch (textColor) {
    case "primary":
      return "text-display-primary-idle-tint";
    case "secondary":
      return "text-display-secondary-idle-tint";
    case "tertiary":
      return "text-display-tertiary-idle-tint";
    default:
      return textColor;
  }
}
