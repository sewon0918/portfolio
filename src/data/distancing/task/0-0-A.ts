import {
  Instruction,
  InstructionWithTextarea,
  InstructionWithImage,
  InstructionWithContent,
} from "../BlockComponent";
import { ButtonGroup } from "../CellComponent";
import { LastCardWithTextarea } from "./common";

export const Content_0_0_A = () => {
  return [
    Instruction("typography_3"),
    Instruction("typography_4"),
    InstructionWithImage("typography_5", "v3_2"),
    Instruction("typography_6"),
    Instruction("typography_7"),
    InstructionWithImage("typography_8", "v3_3"),
    Instruction("typography_9"),
    Instruction("typography_10"),
    InstructionWithImage("typography_11", "v3_4"),
    Instruction("typography_12"),
    Instruction("typography_13"),
    Instruction("typography_14"),
    Instruction("typography_15"),
    InstructionWithImage("typography_16", "v3_5"),
    Instruction("typography_17"),
    InstructionWithImage("typography_18", "v3_6"),
    InstructionWithImage("typography_19", "v3_7"),

    Instruction("typography_20"),
    Instruction("typography_21"),
    Instruction("typography_22"),
    Instruction("typography_23"),

    InstructionWithTextarea("typography_24", { id: "nickname" }),
    InstructionWithContent("typography_25", [
      [
        ButtonGroup(
          [
            {
              translationKey: "buttongroup_option_0",
            },
            {
              translationKey: "buttongroup_option_1",
            },
            {
              translationKey: "buttongroup_option_2",
            },
            {
              translationKey: "buttongroup_option_3",
            },
            {
              translationKey: "buttongroup_option_4",
            },
            {
              translationKey: "buttongroup_option_5",
              subjectiveOption: {
                // optional: true,
                id: "acquisition_other",
                placeholder: "어떻게 알고 오셨는지 알려주세요",
              },
            },
          ],
          { id: "acquisition" }
        ),
      ],
    ]),

    Instruction("typography_26"),
    // ...LastCard,
    ...LastCardWithTextarea,
  ];
};
