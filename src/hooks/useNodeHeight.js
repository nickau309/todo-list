import { useCallback, useEffect } from "react";
import { useWidth } from "@/contexts";

export default function useNodeHeight(ref, height) {
  const width = useWidth();

  const setHeight = useCallback(() => {
    const node = ref.current;
    if (node) {
      const lineHeight = height;
      node.style.height = 0;
      node.style.height =
        Math.round(node.scrollHeight / lineHeight) * lineHeight + "px";
    }
  }, [ref, height]);

  useEffect(() => {
    setHeight();
  }, [width, setHeight]);

  return { setHeight };
}
