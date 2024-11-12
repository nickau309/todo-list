import type { CSSProperties, ReactNode } from "react";
import { useSettingsDialog } from "./settings-dialog";

type LabelProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function SettingsDialogLabel({
  children,
  className,
  style,
}: LabelProps) {
  const { labelId } = useSettingsDialog("SettingsDialogLabel");

  return (
    <h1 id={labelId} className={className} style={style}>
      {children}
    </h1>
  );
}
