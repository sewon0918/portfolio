import { ProgramType } from "@/components/distancing/data/programData";
import { Content_0_0_A } from "@/components/distancing/data/task/0-0-A";

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
