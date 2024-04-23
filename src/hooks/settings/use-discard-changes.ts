import { useSetLocalSettings } from "@/contexts/local-settings-context";
import { useOptimisticUser } from "@/contexts/settings/optimistic-user-context";
import { LocalSettingsSchema } from "@/lib/zod";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export default function useDiscardChanges() {
  const setLocalSettings = useSetLocalSettings();

  const optimisticUser = useOptimisticUser();

  const { reset } = useFormContext();

  const callback = useCallback(() => {
    // Reset local settings
    const data = LocalSettingsSchema.parse(optimisticUser);
    setLocalSettings((localSettings) => ({
      ...localSettings,
      ...data,
    }));
    // Reset form
    reset();
  }, [optimisticUser, reset, setLocalSettings]);

  return callback;
}
