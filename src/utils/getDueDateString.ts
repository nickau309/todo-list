import dayjs from "@/lib/dayjs";

export default function getDueDateString(dueDate: Date) {
  const date = dayjs(dueDate);

  if (date.isToday()) {
    return "Today";
  } else if (date.isTomorrow()) {
    return "Tomorrow";
  } else if (date.isYesterday()) {
    return "Yesterday";
  }

  const today = dayjs();
  const nextWeek = today.add(1, "week");
  if (date.isBetween(today, nextWeek, "day", "[]")) {
    return date.format("dddd");
  }

  if (date.isSame(today, "year")) {
    return date.format("D MMM");
  }

  return date.format("D MMM YYYY");
}
