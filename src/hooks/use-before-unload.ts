import { useEffect } from "react";

export default function useBeforeUnload(enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
        return "";
      };
      window.addEventListener("beforeunload", handler);
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }
  }, [enabled]);
}
