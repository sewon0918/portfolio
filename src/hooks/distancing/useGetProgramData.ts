import { ProgramType } from "@/data/distancing/programData";
import { Content_0_0_A } from "@/data/distancing/task/0-0-A";

export default function useGetProgramData(taskId: string) {
  const programData: ProgramType[] = [
    //0-0-A
    {
      taskId: "0-0-A",
      content: Content_0_0_A(),
    },
  ];

  return programData.find((element) => element.taskId === taskId);
}
