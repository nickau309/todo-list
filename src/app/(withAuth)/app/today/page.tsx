import { createTask } from "@/lib/actions";

export default function Page() {
  return (
    <form action={createTask}>
      <button type="submit">Add task</button>
    </form>
  );
}
