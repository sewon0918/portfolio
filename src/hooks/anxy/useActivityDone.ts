import { useSetRecoilState } from "recoil";
import programAtom from "@/recoil/anxy/program/atom";

export default function useActivityDone() {
  const setProgram = useSetRecoilState(programAtom);

  const completeActivity = (activityId: string) => {
    setProgram((prev) => {
      let currentIndex = 0;
      const updatedActivityList = prev.activityList.map((activity, index) => {
        if (activity.activityId === activityId) {
          currentIndex = index;
          return { ...activity, progressRate: 100 };
        }
        return activity;
      });

      if (currentIndex < prev.activityList.length - 1) {
        updatedActivityList[currentIndex + 1] = {
          ...updatedActivityList[currentIndex + 1],
          isLock: false,
        };
      }

      return { ...prev, activityList: updatedActivityList };
    });
  };

  return completeActivity;
}
