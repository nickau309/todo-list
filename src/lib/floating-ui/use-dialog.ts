import type { FloatingRootContext } from "@floating-ui/react";
import {
  useClick,
  useDismiss,
  useInteractions,
  useRole,
} from "@floating-ui/react";

type UseDialogProps = {
  enabled?: boolean;
};

export default function useDialog(
  context: FloatingRootContext,
  props?: UseDialogProps,
) {
  const click = useClick(context, { enabled: props?.enabled });
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  return useInteractions([click, role, dismiss]);
}
