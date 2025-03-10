import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";
import { forwardRef, useRef } from "react";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
};

type KeysToOmit<T extends ElementType, Props = object> =
  | keyof PolymorphicProps<T>
  | keyof Props;

type PolymorphicComponentProps<
  T extends ElementType,
  Props = object,
> = PolymorphicProps<T> &
  Props &
  Omit<React.ComponentPropsWithoutRef<T>, KeysToOmit<T, Props>>;

type MinWidth = "0px";
type TextOverflow = "truncate";
type WordBreak = "break-words";
type TextAlign = "left";
type FontFamily =
  | "reactist"
  | "sans"
  | "monospace"
  | (string & NonNullable<unknown>);
type FontSize =
  | "10px"
  | "12px"
  | "13px"
  | "14px"
  | "16px"
  | "20px"
  | "26px"
  | (string & NonNullable<unknown>);
type FontWeight = 500 | 600 | 700 | (string & NonNullable<unknown>);
type LineHeight =
  | "12.8px"
  | "15.2px"
  | "16px"
  | "16.8px"
  | "17.6px"
  | "18.4px"
  | "20px"
  | "23px"
  | "24px"
  | "24.8px"
  | "28px"
  | "32px"
  | "35px"
  | 1.5
  | 1.65
  | (string & NonNullable<unknown>);
type LetterSpacing = "-.15px" | (string & NonNullable<unknown>);
type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | (string & NonNullable<unknown>);

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

function getTextOverflow(textOverflow?: TextOverflow) {
  switch (textOverflow) {
    case "truncate":
      return "truncate";
    default:
      return textOverflow;
  }
}

function getWordBreak(wordBreak?: WordBreak) {
  switch (wordBreak) {
    case "break-words":
      return "break-words";
    default:
      return wordBreak;
  }
}

function getTextAlign(textAlign?: TextAlign) {
  switch (textAlign) {
    case "left":
      return "text-left";
    default:
      return textAlign;
  }
}

function getFontFamily(fontFamily?: FontFamily) {
  switch (fontFamily) {
    case "reactist":
      return "font-reactist";
    case "sans":
      return "font-sans";
    case "monospace":
      return "font-monospace";
    default:
      return fontFamily;
  }
}

function getFontSize(fontSize?: FontSize) {
  switch (fontSize) {
    case "10px":
      return "text-[10px]";
    case "12px":
      return "text-xs";
    case "13px":
      return "text-[13px]";
    case "14px":
      return "text-sm";
    case "16px":
      return "text-base";
    case "20px":
      return "text-xl";
    case "26px":
      return "text-[26px]";
    default:
      return fontSize;
  }
}

function getFontWeight(fontWeight?: FontWeight) {
  switch (fontWeight) {
    case 500:
      return "font-medium";
    case 600:
      return "font-semibold";
    case 700:
      return "font-bold";
    default:
      return fontWeight;
  }
}

function getLineHeight(lineHeight?: LineHeight) {
  switch (lineHeight) {
    case "12.8px":
      return "leading-[12.8px]";
    case "15.2px":
      return "leading-[15.2px]";
    case "16px":
      return "leading-4";
    case "16.8px":
      return "leading-[16.8px]";
    case "17.6px":
      return "leading-[17.6px]";
    case "18.4px":
      return "leading-[18.4px]";
    case "20px":
      return "leading-5";
    case "23px":
      return "leading-[23px]";
    case "24px":
      return "leading-6";
    case "24.8px":
      return "leading-[24.8px]";
    case "28px":
      return "leading-7";
    case "32px":
      return "leading-8";
    case "35px":
      return "leading-[35px]";
    case 1.5:
      return "leading-normal";
    case 1.65:
      return "leading-[1.65]";
    default:
      return lineHeight;
  }
}

function getLetterSpacing(letterSpacing?: LetterSpacing) {
  switch (letterSpacing) {
    case "-.15px":
      return "tracking-[-.15px]";
    default:
      return letterSpacing;
  }
}

function getTextColor(color?: TextColor) {
  switch (color) {
    case "primary":
      return "text-display-primary-idle-tint";
    case "secondary":
      return "text-display-secondary-idle-tint";
    case "tertiary":
      return "text-display-tertiary-idle-tint";
    default:
      return color;
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
