import { Instruction, InstructionWithTextarea } from "../BlockComponent";

export const LastCardWithTextarea = [
  InstructionWithTextarea("common:lastCard1", { optional: true, id: "소감" }),
  Instruction("common:lastCard2"),
];
