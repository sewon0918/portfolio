import React, { useEffect } from "react";
import { AnxyTravel } from "./AnxyTravel";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Text24 } from "../common/Text";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import programAtom, { ActivityType } from "@/recoil/anxy/program/atom";
import { usePrevious } from "@toss/react";
import journeyAtom from "@/recoil/anxy/journey/atom";
import Seed from "../store/Seed";
import { DailyProgram } from "../program/DailyProgram";
import homeTypeAtom from "@/recoil/anxy/home/atom";

const AnxyJourney = () => {
  const homeType = useRecoilValue(homeTypeAtom);
  const isFocused = homeType === "anxy";
  const dailyProgramDetail_raw = useRecoilValue(programAtom);
  const [dailyProgramDetail, setDailyProgramDetail] =
    useRecoilState(journeyAtom);

  const previousDailyProgramDetail = usePrevious(dailyProgramDetail);

  useEffect(() => {
    if (isFocused) {
      setDailyProgramDetail((state) => ({
        ...state,
        activityList: dailyProgramDetail_raw.activityList,
      }));
    }
  }, [isFocused, dailyProgramDetail_raw]);

  const [dailyActivityList, setDailyActivityList] = useLocalStorage<
    ActivityType[]
  >("dailyActivityList", []);

  const [completedActivitiesCount, setCompletedActivitiesCount] = useState<
    number | undefined
  >(undefined);

  const [
    previousCompletedActivitiesCount,
    setPreviousCompletedActivitiesCount,
  ] = useState<number | undefined>(undefined);

  const getDoneActivityNum = (activityList: ActivityType[]) => {
    return activityList?.filter((element) => element.progressRate === 100)
      .length;
  };

  useEffect(() => {
    if (dailyProgramDetail) {
      setCompletedActivitiesCount(
        getDoneActivityNum(dailyProgramDetail?.activityList)
      );
      setPreviousCompletedActivitiesCount(
        getDoneActivityNum(previousDailyProgramDetail?.activityList)
      );
      const changedList = dailyProgramDetail.activityList
        ? dailyProgramDetail.activityList.slice()
        : [];
      if (dailyActivityList) {
        dailyActivityList.forEach((beforeItem) => {
          changedList.forEach((afterItem) => {
            if (beforeItem.activityId === afterItem.activityId) {
              const updatedAfterItem = {
                ...afterItem,
                isFirstUnlocked: beforeItem.isLock && !afterItem.isLock,
                isFirstComplete:
                  (beforeItem.progressRate || 0) < 100 &&
                  afterItem.progressRate === 100,
                prevProgressRate: beforeItem.progressRate,
              };
              changedList[changedList.indexOf(afterItem)] = updatedAfterItem;
            }
          });
        });
      }
      setDailyActivityList(changedList);
    }
  }, [dailyProgramDetail]);

  // const resetProgramState = useResetRecoilState(programAtom);
  // const resetJourneyState = useResetRecoilState(journeyAtom);

  return (
    <div css={{ width: "100%" }}>
      {/* 씨앗 */}
      {/* <div
        onClick={() => {
          resetProgramState();
          resetJourneyState();
        }}
      >
        reset
      </div> */}
      <div
        css={{
          paddingLeft: "20px",
        }}
      >
        <Seed />
      </div>

      <div
        css={{
          padding: "0 20px",
        }}
      >
        <Text24>오늘의 여정</Text24>
      </div>
      <div>
        <div style={{ marginBottom: "60px", marginTop: "12px" }}>
          {completedActivitiesCount !== undefined && (
            <AnxyTravel
              bridgeNum={dailyActivityList && dailyActivityList.length}
              completedActivitiesCount={completedActivitiesCount}
              previousCompletedActivitiesCount={
                previousCompletedActivitiesCount
              }
              seedData={dailyProgramDetail && dailyProgramDetail.seedBox}
            />
          )}
          {completedActivitiesCount !== undefined && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              transition={{
                duration:
                  previousCompletedActivitiesCount === undefined ? 0.2 : 0,
                delay: previousCompletedActivitiesCount === undefined ? 1.5 : 0,
              }}
              css={{
                padding: "0 20px",
                marginTop: "15px",
                overflow: "hidden",
              }}
            >
              <DailyProgram activityList={dailyActivityList} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnxyJourney);
