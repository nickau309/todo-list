import { Provider } from "@/components/app";
import ClientComponent from "@/components/client-component";
import LoadingComponent from "@/components/loading-component";
import Sidebar from "@/containers/app/sidebar";
import { StoreProvider } from "@/contexts/store-context";
import { getUser } from "@/lib/data";
import Link from "next/link";
import { type ReactNode } from "react";
import ThemeWrapper from "./theme-wrapper";
import UpdateLocalSettings from "./update-local-settings";
import "./app.css";

type LayoutProps = {
  children: ReactNode;
  dialog: ReactNode;
  task: ReactNode;
};

export default async function Layout({ children, dialog, task }: LayoutProps) {
  const user = await getUser();

  return (
    <StoreProvider>
      <Provider user={user}>
        <UpdateLocalSettings theme={user.theme} />
        <ThemeWrapper>
          <div className="flex h-dvh items-center justify-center">
            <ClientComponent fallback={<LoadingComponent />}>
              <Sidebar />
              <div className="h-full min-w-0 flex-1">{children}</div>
              {dialog}
              {task}
            </ClientComponent>
          </div>
        </ThemeWrapper>
      </Provider>
    </StoreProvider>
  );
}
