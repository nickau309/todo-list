import { useImperativeHandle } from "react";

export default function useTextareaControl(ref, textareaRef) {
  useImperativeHandle(ref, () => {
    return {
      focus() {
        const node = textareaRef.current;
        node.focus();
        node.selectionStart = node.value.length;
      },
    };
  });
}
