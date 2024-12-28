import { TypographySystem } from "@mui/joy";

export type levelType = keyof TypographySystem;

export type celltype =
  | "typography" //translation
  | "image"
  | "textarea"
  | "select" //translation
  | "buttongroup"; //translation

export interface ElementType {
  width?: number;
  opacity?: number;
  level?: levelType;

  id?: string;
  value?: string;
  optional?: boolean;
  editorKey?: string;

  coach?: boolean;
  readonly?: boolean;
  translationKey?: string;

  isHidden?: boolean;
}

export interface TypographyType extends ElementType {
  text?: string;
  variant?: "soft";
  italic?: boolean;
  color?: string;
  labelIndex?: number;
  prefixLabelIndex?: number;
  isLabel?: boolean;
}

export interface TextareaType extends ElementType {
  placeholder?: string;
  htmlString?: string;
}

export interface ImageType extends ElementType {
  imageUrl: string;
}

export interface OptionType {
  translationKey?: string;
  subjectiveOption?: { optional?: boolean; id?: string; placeholder?: string };
  additionalContent?: CellType[][];
}

export interface SingleSelectionType extends ElementType {
  options?: OptionType[];
  selectedIndex?: number;
}

export type ContentType =
  | TypographyType
  | TextareaType
  | ImageType
  | SingleSelectionType
  | ElementType;

export interface CellType {
  type: celltype;
  content: ContentType;
}

export function Typography(
  translationKey: string,
  arg?: TypographyType
): { type: "typography"; content: TypographyType } {
  return {
    type: "typography",
    content: {
      translationKey: translationKey,
      ...(arg && arg),
    },
  };
}

export function Textarea(arg?: TextareaType): {
  type: "textarea";
  content: TextareaType;
} {
  return {
    type: "textarea",
    content: { ...(arg && arg) },
  };
}

export function Image(url: string): { type: "image"; content: ImageType }[] {
  return [
    {
      type: "image",
      content: { imageUrl: url },
    },
  ];
}

export function ButtonGroup(
  options: OptionType[],
  arg?: SingleSelectionType
  // width?: number
): { type: "buttongroup"; content: SingleSelectionType } {
  return {
    type: "buttongroup",
    content: {
      options: options,
      ...(arg && arg),
    },
  };
}

export function TypographyLine(
  text: string,
  arg?: TypographyType
): { type: "typography"; content: TypographyType }[] {
  return [Typography(text, arg)];
}
export function TypographyLineWithValue(
  text: string,
  arg?: TypographyType
): { type: "typography"; content: TypographyType }[] {
  return [
    {
      type: "typography",
      content: {
        value: text,
        ...(arg && arg),
      },
    },
  ];
}
export function TextareaLine(arg?: TextareaType): {
  type: "textarea";
  content: TextareaType;
}[] {
  return [Textarea(arg)];
}

export function Label(
  translationKey: string,
  type: "solid" | "dimmed",
  arg?: TypographyType
) {
  return Typography(translationKey, {
    level: "title-sm",
    isLabel: true,
    ...(type === "solid" && { color: "primary.solid" }),
    ...(type === "dimmed" && { opacity: 0.5 }),
    ...(arg && arg),
  });
}

export function SolidLabelLine(translationKey: string, arg?: TypographyType) {
  return [Label(translationKey, "solid", { ...(arg && arg) })];
}
export function DimmedLabelLine(translationKey: string, arg?: TypographyType) {
  return [Label(translationKey, "dimmed", { ...(arg && arg) })];
}

export function LineWithSolidLabel(
  translationKey: string,
  line: CellType[],
  arg?: TypographyType
): {
  type: celltype;
  content: ContentType;
}[][] {
  return [SolidLabelLine(translationKey, arg), line];
}

export function LineWithDimmedLabel(
  translationKey: string,
  line: CellType[],
  arg?: TypographyType
): {
  type: celltype;
  content: ContentType;
}[][] {
  return [DimmedLabelLine(translationKey, arg), line];
}
