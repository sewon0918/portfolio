import React, { useEffect } from "react";
import { AnxyTravel } from "./AnxyTravel";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";
import { Text24 } from "../common/Text";
import { useRecoilState, useRecoilValue } from "recoil";
import programAtom from "@/recoil/anxy/program/atom";
import { usePrevious } from "@toss/react";
import journeyAtom from "@/recoil/anxy/journey/atom";
import Seed from "../store/Seed";

const AnxyJourney = () => {
  const navigate = useNavigate();

  const dailyProgramDetail_raw = useRecoilValue(programAtom);
  const [dailyProgramDetail, setDailyProgramDetail] =
    useRecoilState(journeyAtom);

  const previousDailyProgramDetail = usePrevious(dailyProgramDetail);

  useEffect(() => {
    setDailyProgramDetail((state) => ({
      ...state,
      activityList: dailyProgramDetail_raw.activityList,
    }));
  }, [dailyProgramDetail_raw]);

  interface ActivityType {
    activityId: string;
    progressRate: number;
    isLock: boolean;
  }

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
      setDailyActivityList(dailyProgramDetail?.activityList);
    }
  }, [dailyProgramDetail]);

  return (
    <div css={{ width: "100%" }}>
      {/* 씨앗 */}
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
              <div
                css={{
                  width: "100%",
                  height: "50px",
                  border: "1px solid black",
                }}
                onClick={() => {
                  navigate("/anxy/worry-note");
                }}
              ></div>
              {/* <DailyProgram activityList={dailyActivityList} /> */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnxyJourney);
