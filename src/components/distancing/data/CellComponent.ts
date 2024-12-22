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

export interface OptionType {
  dataMapping?: DataMappingType;
  translationKey?: string;
  translationKey_additional?: string;
  text?: string;
  hideFromId?: string;
  showFromId?: string;
  blockIdForBranch?: string;
  hideBlockIdList?: string[];
  showBlockIdList?: string[];
  subjectiveOption?: { optional?: boolean; id?: string; placeholder?: string };
  additionalContent?: CellType[][];
}

export interface TextareaType extends ElementType {
  placeholder?: string;
  htmlString?: string;
}

export interface AiCommentType extends ElementType {
  aiCommentKey: string;
  aiCommentValue: string;
}

export interface PercentageType extends TextareaType {
  percentage?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface SingleSelectionType extends ElementType {
  options?: OptionType[];
  selectedIndex?: number;
}

export interface MultipleSelectionType extends ElementType {
  options?: OptionType[];
  selectedIndices?: number[];
  requiredSelectionCount?: number;
}
export interface DataMappingType {
  [key: string]: {
    taskId?: string;
    id?: string;
    index?: number;
    additional?: boolean;
    value?: string;
  };
}

export interface TypographyFromDataType extends TypographyType {
  dataMapping?: DataMappingType;
}

export interface ImageType extends ElementType {
  imageUrl: string;
}

export type ContentType =
  | TypographyType
  | TextareaType
  | SingleSelectionType
  | MultipleSelectionType
  | ImageType
  | TypographyFromDataType
  | PercentageType
  | AiCommentType
  | ElementType;

export interface CellType {
  type: celltype;
  content: ContentType;
}

export function DateSelect(arg?: ElementType): {
  type: "date";
  content: ElementType;
} {
  return {
    type: "date",
    content: {
      ...(arg && arg),
    },
  };
}
export function TimeSelect(arg?: ElementType): {
  type: "time";
  content: ElementType;
} {
  return {
    type: "time",
    content: {
      ...(arg && arg),
    },
  };
}
export function Date(value: string): {
  type: "dateHeader";
  content: ElementType;
} {
  return {
    type: "dateHeader",
    content: {
      value: value,
    },
  };
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

export function TypographyFromData(
  dataMapping: DataMappingType,
  translationKey: string,
  arg?: TypographyFromDataType
): { type: "typographyFromData"; content: TypographyFromDataType } {
  return {
    type: "typographyFromData",
    content: {
      dataMapping: dataMapping,
      translationKey: translationKey,
      ...(arg && arg),
    },
  };
}

export function Percentage(arg?: PercentageType): {
  type: "percentage";
  content: PercentageType;
} {
  return {
    type: "percentage",
    content: { ...(arg && arg) },
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

export function Select(
  options: OptionType[],
  arg?: SingleSelectionType
): { type: "select"; content: SingleSelectionType } {
  return {
    type: "select",
    content: {
      options: options,

      ...(arg && arg),
    },
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
