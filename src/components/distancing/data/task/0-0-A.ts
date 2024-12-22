import {
  Instruction,
  InstructionWithTextarea,
  InstructionWithImage,
} from "../BlockComponent";
import { LastCardWithTextarea } from "./common";

export const Content_0_0_A = () => {
  return [
    Instruction("typography_3_0_0"),
    Instruction("typography_4_0_0"),
    InstructionWithImage("typography_5_0_0", "v3_2"),
    Instruction("typography_6_0_0"),
    Instruction("typography_7_0_0"),
    InstructionWithImage("typography_8_0_0", "v3_3"),
    Instruction("typography_9_0_0"),
    Instruction("typography_10_0_0"),
    InstructionWithImage("typography_11_0_0", "v3_4"),
    Instruction("typography_12_0_0"),
    Instruction("typography_13_0_0"),
    Instruction("typography_14_0_0"),
    Instruction("typography_15_0_0"),
    InstructionWithImage("typography_16_0_0", "v3_5"),
    Instruction("typography_17_0_0"),
    InstructionWithImage("typography_18_0_0", "v3_6"),
    InstructionWithImage("typography_19_0_0", "v3_7"),

    Instruction("typography_20_0_0"),
    Instruction("typography_21_0_0"),
    Instruction("typography_22_0_0"),
    Instruction("typography_23_0_0"),

    InstructionWithTextarea("typography_24_0_0", { id: "nickname" }),

    Instruction("typography_26_0_0"),
    // ...LastCard,
    ...LastCardWithTextarea,
  ];
};
