import InboxProjectClientLayout from "@/containers/project/inbox-project-client-layout";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  // task: ReactNode;
};

export default function InboxProjectServerLayout({ children }: LayoutProps) {
  return (
    <InboxProjectClientLayout>
      {children}
      {/* {task} */}
    </InboxProjectClientLayout>
  );
}
