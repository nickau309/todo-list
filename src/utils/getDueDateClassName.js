export default function getDueDateClassName(dueDate) {
  let className;
  if (dueDate) {
    const timeDiff = dueDate - new Date();

    if (timeDiff <= -24 * 60 * 60 * 1000) {
      className = "text-date-overdue-tint";
    } else if (timeDiff <= 0) {
      className = "text-date-today-tint";
    } else if (timeDiff <= 24 * 60 * 60 * 1000) {
      className = "text-date-tomorrow-tint";
    } else if (timeDiff <= 7 * 24 * 60 * 60 * 1000) {
      className = "text-date-next-week-tint";
    } else {
      className = "text-content-secondary";
    }
  }
  return className;
}
