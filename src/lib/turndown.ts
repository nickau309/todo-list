import TurndownService from "turndown";

const turndownService = new TurndownService();

turndownService.addRule("strikethrough", {
  filter: "s",
  replacement(content) {
    return "~~" + content + "~~";
  },
});

export default turndownService;
