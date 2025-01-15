import { useStore } from "@/contexts/store-context";
import {
  EditorContent,
  FloatingLinkEditor,
  FloatingNameToolbar,
  useNameEditor,
} from "@/features/editor";
import type { TaskInfoKeyType } from "@/types/task";
import type { Dispatch, SetStateAction } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { EditorRef } from "./type";

type NameProps = {
  focusingField: TaskInfoKeyType | null;
  setFocusingField: Dispatch<SetStateAction<TaskInfoKeyType | null>>;
  isSubmitDisabled?: boolean;
};

const Name = forwardRef<EditorRef, NameProps>(function Name(
  { focusingField, setFocusingField, isSubmitDisabled = false },
  ref,
) {
  const { name, setName } = useStore((state) => ({
    name: state.quickAddForm.inputValues.name,
    setName: state.quickAddForm.setName,
  }));

  const nameEditor = useNameEditor({
    isSubmitDisabled,
    focusingField,
    setFocusingField,
    name,
    setName,
  });

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        nameEditor?.commands.focus();
      },
      // select: () => {
      //   nameEditor?.commands.selectAll();
      // },
    };
  }, [nameEditor]);

  return (
    <div className="flex items-center">
      <EditorContent
        editor={nameEditor}
        className="min-w-0 flex-1 font-sans text-xl/tight font-semibold"
      />
      {nameEditor !== null && (
        <>
          <FloatingLinkEditor editor={nameEditor} />
          <FloatingNameToolbar editor={nameEditor} />
        </>
      )}
    </div>
  );
});

export default Name;
