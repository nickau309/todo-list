import dayjs from "@/lib/dayjs";

export default function getDueDateTextColor(dueDate: Date) {
  const date = dayjs(dueDate);

  if (date.isToday()) {
    return "text-schedule-today-tint";
  } else if (date.isTomorrow()) {
    return "text-schedule-tomorrow-tint";
  }

  const today = dayjs();
  if (date.isBefore(today, "day")) {
    return "text-schedule-overdue-tint";
  }

  const nextWeek = today.add(1, "week");
  if (date.isBetween(today, nextWeek, "day", "[]")) {
    return "text-schedule-next-week-tint";
  }

  return null;
}
