export type FontWeight = 500 | 600 | 700 | (string & NonNullable<unknown>);

export default function getFontWeight(fontWeight?: FontWeight) {
  switch (fontWeight) {
    case 500:
      return "font-medium";
    case 600:
      return "font-semibold";
    case 700:
      return "font-bold";
    default:
      return fontWeight;
  }
}
