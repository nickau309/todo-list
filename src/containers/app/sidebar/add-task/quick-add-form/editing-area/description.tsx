import { useStore } from "@/contexts/store-context";
import {
  EditorContent,
  FloatingDescriptionToolbar,
  FloatingLinkEditor,
  useDescriptionEditor,
} from "@/features/editor";
import type { TaskInfoKeyType } from "@/types/task";
import type { Dispatch, SetStateAction } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { EditorRef } from "./type";

type DescriptionProps = {
  focusingField: TaskInfoKeyType | null;
  setFocusingField: Dispatch<SetStateAction<TaskInfoKeyType | null>>;
};

const Description = forwardRef<EditorRef, DescriptionProps>(
  function Description({ focusingField, setFocusingField }, ref) {
    const { description, setDescription } = useStore((state) => ({
      description: state.quickAddForm.inputValues.description,
      setDescription: state.quickAddForm.setDescription,
    }));

    const descriptionEditor = useDescriptionEditor({
      focusingField,
      setFocusingField,
      description,
      setDescription,
    });

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          descriptionEditor?.commands.focus();
        },
      };
    }, [descriptionEditor]);

    return (
      <div className="flex items-center">
        <EditorContent
          editor={descriptionEditor}
          className="min-w-0 flex-1 font-sans text-[13px]/[1.65]"
        />
        {descriptionEditor !== null && (
          <>
            <FloatingLinkEditor editor={descriptionEditor} />
            <FloatingDescriptionToolbar editor={descriptionEditor} />
          </>
        )}
      </div>
    );
  },
);

export default Description;
