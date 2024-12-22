import {
  CellType,
  Image,
  TextareaLine,
  TextareaType,
  Typography,
  TypographyLine,
} from "./CellComponent";

export interface StructureType {
  blockId?: string;
  noBorder?: boolean;
  noArrow?: boolean;
  isEnd?: boolean;
  isShown?: boolean;
  isHidden?: boolean;
  nextBlockId?: string;
  indentation?: boolean;
  hideIfPatient?: boolean;
  hideIfCoach?: boolean;
  removable?: boolean;
  disableGoNext?: boolean;
  isHighlight?: boolean;
  isAlwaysHidden?: boolean;
  autoOpenNext?: boolean;
}
export interface ProgramContentType extends StructureType {
  lines: CellType[][];
}

export function Header1(
  translationKey: string,
  arg?: StructureType
): ProgramContentType {
  return {
    lines: [[Typography(translationKey, { level: "h3" })]],
    noBorder: true,
    noArrow: true,
    ...(arg && arg),
  };
}

export function Instruction(
  translationKey: string,
  arg?: StructureType
): ProgramContentType {
  return {
    lines: [TypographyLine(translationKey)],
    ...(arg && arg),
  };
}

export function Content(
  content: CellType[][],
  arg?: StructureType
): ProgramContentType {
  return {
    lines: [...content],
    ...(arg && arg),
  };
}

export function InstructionWithContent(
  translationKey: string,
  content: CellType[][],
  arg?: StructureType
): ProgramContentType {
  return {
    lines: [TypographyLine(translationKey), ...content],
    ...(arg && arg),
  };
}

export function InstructionWithImage(
  translationKey: string,
  url: string | string[]
): ProgramContentType {
  return InstructionWithContent(
    translationKey,
    typeof url === "string"
      ? [Image(url)]
      : [...url.map((each) => Image(each))],
    undefined
  );
}

export function InstructionWithTextarea(
  translationKey: string,
  textareaArg?: TextareaType,
  arg?: StructureType
): ProgramContentType {
  return InstructionWithContent(
    translationKey,
    [TextareaLine({ ...(textareaArg && textareaArg) })],
    arg
  );
}

export function InstructionWithTempContent(
  translationKey: string,
  content: CellType[][],
  arg?: StructureType
): ProgramContentType {
  return {
    lines: [TypographyLine(translationKey), ...content],
    ...(arg && arg),
  };
}

export function ThoughtTrap(
  title: string,
  explanation: string,
  example: string
): ProgramContentType {
  return {
    lines: [
      TypographyLine(title, { level: "title-lg" }),
      TypographyLine(explanation),
      TypographyLine(example, { color: "primary.solid" }),
    ],
  };
}

export function OptionalCard(): ProgramContentType {
  return {
    lines: [],
    removable: true,
  };
}
