import clsx from "clsx";
import { forwardRef } from "react";
import type { CustomComponentProps } from "./text";
import getFontFamily from "./utils/getFontFamily";
import type { FontFamily } from "./utils/getFontFamily";
import getFontSize from "./utils/getFontSize";
import type { FontSize } from "./utils/getFontSize";
import getFontWeight from "./utils/getFontWeight";
import type { FontWeight } from "./utils/getFontWeight";
import getLetterSpacing from "./utils/getLetterSpacing";
import type { LetterSpacing } from "./utils/getLetterSpacing";
import getLineHeight from "./utils/getLineHeight";
import type { LineHeight } from "./utils/getLineHeight";
import getTextAlign from "./utils/getTextAlign";
import type { TextAlign } from "./utils/getTextAlign";
import getTextColor from "./utils/getTextColor";
import type { TextColor } from "./utils/getTextColor";
import getTextOverflow from "./utils/getTextOverflow";
import type { TextOverflow } from "./utils/getTextOverflow";
import getWordBreak from "./utils/getWordBreak";
import type { WordBreak } from "./utils/getWordBreak";

type OwnProps = {
  overflow?: TextOverflow;
  wordBreak?: WordBreak;
  align?: TextAlign;
  font?: FontFamily;
  size?: FontSize;
  weight?: FontWeight;
  height?: LineHeight;
  spacing?: LetterSpacing;
  color?: TextColor;
};

type Heading1Props = CustomComponentProps<"h1", OwnProps>;

const Heading1 = forwardRef<HTMLHeadingElement, Heading1Props>(
  function Heading1(props, ref) {
    const {
      overflow,
      wordBreak,
      align,
      font,
      size,
      weight,
      height,
      spacing,
      color,
      className,
      ...rest
    } = props;

    return (
      <h1
        ref={ref}
        className={clsx(
          getTextOverflow(overflow),
          getWordBreak(wordBreak),
          getTextAlign(align),
          getFontFamily(font),
          getFontSize(size),
          getFontWeight(weight),
          getLineHeight(height),
          getLetterSpacing(spacing),
          getTextColor(color),
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Heading1;
