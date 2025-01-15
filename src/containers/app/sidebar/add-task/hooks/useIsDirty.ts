import { useStore } from "@/contexts/store-context";
import equal from "fast-deep-equal";

export default function useIsDirty() {
  const { defaultValues, inputValues } = useStore((state) => ({
    defaultValues: state.quickAddForm.defaultValues,
    inputValues: state.quickAddForm.inputValues,
  }));

  return !equal(defaultValues, inputValues);
}
