export type LetterSpacing = "-.15px" | (string & NonNullable<unknown>);

export default function getLetterSpacing(letterSpacing?: LetterSpacing) {
  switch (letterSpacing) {
    case "-.15px":
      return "tracking-[-.15px]";
    default:
      return letterSpacing;
  }
}
