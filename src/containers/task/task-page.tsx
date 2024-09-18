import Link from "next/link";
import Header from "./header";
import MiniContent from "./mini-content";
import Overview from "./overview";
import Sidebar from "./sidebar";

export default function TaskPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-col divide-y divide-divider-primary">
      <div className="shrink-0 basis-12">
        <Header />
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden pt-4 min-[751px]:px-4">
          <div className="flex flex-col gap-2 px-4 min-[751px]:px-0">
            <Overview />
          </div>
          <div className="min-[751px]:hidden">
            <MiniContent />
          </div>
          <hr className="border-t-[6px] border-divider-secondary min-[751px]:hidden" />
          <Link href="/app/task/1">task 1</Link>
          <Link href="/app/task/2">task 2</Link>
          <Link href="/app/task/3">task 3</Link>
          <Link href="/app/task/30">task 30</Link>
          <Link href="/app/task/45">task 45</Link>
          <div className="truncate">
            .........................................................................................................................................................
          </div>
          {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> */}
          <div>scroll</div>
        </div>
        <div className="hidden min-w-0 basis-[260px] min-[751px]:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
