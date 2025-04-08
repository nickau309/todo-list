import useGetTaskCount from "@/hooks/task/use-get-task-count";
import dayjs from "@/lib/dayjs";

type StringProps = {
  inputDate: Date;
};

export default function IncompleteTaskCountString({ inputDate }: StringProps) {
  const {
    data: count,
    isError,
    isPending,
  } = useGetTaskCount({
    date: dayjs(inputDate).format("YYYY-MM-DD"),
  });

  if (isError) {
    return "Fail to fetch task count.";
  }

  if (isPending) {
    return "...";
  }

  if (count === 0) {
    return "No tasks";
  }

  return count > 1 ? `${count} tasks` : "1 task";
}
