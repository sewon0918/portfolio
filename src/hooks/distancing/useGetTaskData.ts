import { useEffect, useState } from "react";
import useGetBlankTaskData from "./useGetBlankTaskData";
import { ProgramType } from "@/data/distancing/programData";

export default function useGetTaskData({ taskKey }: { taskKey: string }) {
  const [data, setData] = useState<ProgramType>();

  const blankTaskData = useGetBlankTaskData({ taskKey: taskKey });

  useEffect(() => {
    if (blankTaskData) {
      setData(blankTaskData as ProgramType | undefined);
    }
  }, [blankTaskData]);

  return {
    data,
  };
}
