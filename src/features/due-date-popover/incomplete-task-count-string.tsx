import dayjs from "@/lib/dayjs";
import useSWR from "swr";

type StringProps = {
  inputDate: Date;
};

export default function IncompleteTaskCountString({ inputDate }: StringProps) {
  const {
    data: count,
    error,
    isLoading,
  } = useSWR<number, Error, [string, Record<string, string>]>(
    ["/api/task/count", { dueDate: dayjs(inputDate).format("YYYY-MM-DD") }],
    async ([url, obj]) => {
      const searchParams = new URLSearchParams(obj);
      const res = await fetch(`${url}?${searchParams.toString()}`);
      return res.json();
    },
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error) {
    return "Fail to fetch task count.";
  }

  if (isLoading) {
    return "...";
  }

  if (count === undefined || count === 0) {
    return "No tasks";
  }

  return count > 1 ? `${count} tasks` : "1 task";
}
