import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";
import { forwardRef, useRef } from "react";
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

type PolymorphicProps<T extends ElementType> = {
  as?: T;
};

type KeysToOmit<T extends ElementType, Props = object> =
  | keyof PolymorphicProps<T>
  | keyof Props;

export type CustomComponentProps<
  T extends ElementType,
  CustomProps = object,
> = CustomProps & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomProps>;

type PolymorphicComponentProps<
  T extends ElementType,
  CustomProps = object,
> = PolymorphicProps<T> &
  CustomComponentProps<T, PolymorphicProps<T> & CustomProps>;

// type PolymorphicComponentProps<
//   T extends ElementType,
//   Props = object,
// > = PolymorphicProps<T> &
//   Props &
//   Omit<React.ComponentPropsWithoutRef<T>, KeysToOmit<T, Props>>;

type MinWidth = "0px";

type OwnProps = {
  minWidth?: MinWidth;
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

type AllowedElementType = ElementType<
  { className: string },
  "h1" | "h2" | "h3" | "kbd" | "label" | "p" | "span"
>; // Extract<ElementType, >;

type TextProps<T extends AllowedElementType = "span"> =
  PolymorphicComponentProps<T, OwnProps>;

function getMinWidth(minWidth?: MinWidth) {
  switch (minWidth) {
    case "0px":
      return "min-w-0";
    default:
      return minWidth;
  }
}

export default function Text<T extends AllowedElementType = "span">({
  minWidth,
  overflow,
  wordBreak,
  align,
  font,
  size,
  weight,
  height,
  spacing,
  color,
  as,
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? "span";

  return (
    <Component
      className={clsx(
        // "min-w-0 truncate break-words text-left font-sans text-[13px] font-semibold leading-[17.6px] tracking-[-.15px] text-[#555]",
        getMinWidth(minWidth),
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
      {...props}
    />
  );
}
