export type WordBreak = "break-words";

export default function getWordBreak(wordBreak?: WordBreak) {
  switch (wordBreak) {
    case "break-words":
      return "break-words";
    default:
      return wordBreak;
  }
}
