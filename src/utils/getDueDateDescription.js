export default function getDueDateDescription(dueDate) {
  let description = "";
  if (dueDate) {
    const now = new Date();
    const timeDiff = dueDate - now;

    if (dueDate.getFullYear() !== now.getFullYear()) {
      description = dueDate.toLocaleString("en-HK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else if (timeDiff <= -2 * 24 * 60 * 60 * 1000) {
      description = dueDate.toLocaleString("en-HK", {
        day: "numeric",
        month: "short",
      });
    } else if (timeDiff <= -24 * 60 * 60 * 1000) {
      description = "Yesterday";
    } else if (timeDiff <= 0) {
      description = "Today";
    } else if (timeDiff <= 24 * 60 * 60 * 1000) {
      description = "Tomorrow";
    } else if (timeDiff <= 7 * 24 * 60 * 60 * 1000) {
      description = dueDate.toLocaleString("en-HK", { weekday: "long" });
    } else {
      description = dueDate.toLocaleString("en-HK", {
        day: "numeric",
        month: "short",
      });
    }
  }
  return description;
}
