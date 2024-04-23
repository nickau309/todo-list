"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useId } from "react";
import { useDialogPanelContext } from "./panel";

type TitleProps = ComponentPropsWithoutRef<"h2">;

export default function Title({ id: controlledId, ...props }: TitleProps) {
  const { setLabelId } = useDialogPanelContext("Dialog.Title");
  const uncontrolledId = useId();

  const id = controlledId ?? uncontrolledId;

  useEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(undefined);
    };
  }, [id, setLabelId]);

  return <h2 id={id} {...props} />;
}
