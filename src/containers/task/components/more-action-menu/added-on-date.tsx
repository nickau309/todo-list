import dayjs from "@/lib/dayjs";
import { useOptimisticTask } from "../../contexts/optimistic-task-context";

export default function AddedOnDate() {
  const { addedAt } = useOptimisticTask();

  const addedAtDate = dayjs(addedAt);
  const today = dayjs();

  const addedAtDateString = addedAtDate.isSame(today, "year")
    ? addedAtDate.format("D MMM")
    : addedAtDate.format("D MMM YYYY");

  const addedAtTimeString = addedAtDate.format("HH:mm");

  return (
    <div className="px-3 py-2 text-[13px]/[16.8px] text-display-secondary-idle-tint">
      Added on {addedAtDateString} · {addedAtTimeString}
    </div>
  );
}
