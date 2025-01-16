export default function getPriorityTextColor(priority: number) {
  if (priority === 1) {
    return "text-priority-1";
  }

  if (priority === 2) {
    return "text-priority-2";
  }

  if (priority === 3) {
    return "text-priority-3";
  }

  return "text-priority-4";
}
