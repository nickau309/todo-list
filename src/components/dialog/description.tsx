"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useId } from "react";
import { useDialogPanelContext } from "./panel";

type DescriptionProps = ComponentPropsWithoutRef<"p">;

export default function Description({
  id: controlledId,
  ...props
}: DescriptionProps) {
  const { setDescriptionId } = useDialogPanelContext("Dialog.Description");
  const uncontrolledId = useId();

  const id = controlledId ?? uncontrolledId;

  useEffect(() => {
    setDescriptionId(id);
    return () => {
      setDescriptionId(undefined);
    };
  }, [id, setDescriptionId]);

  return <p id={id} {...props} />;
}
