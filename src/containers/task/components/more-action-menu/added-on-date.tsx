import Text from "@/components/ui/text";
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
    <div className="px-3 py-2">
      <Text
        as="p"
        font="reactist"
        size="13px"
        height="16.8px"
        color="secondary"
      >
        Added on {addedAtDateString} · {addedAtTimeString}
      </Text>
    </div>
  );
}
