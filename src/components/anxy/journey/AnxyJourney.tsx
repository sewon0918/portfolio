import React, { useEffect } from "react";
import { AnxyTravel } from "./AnxyTravel";
import { useState } from "react";
import { motion } from "framer-motion";
import { Store } from "./Asset";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";
import { Text17, Text24 } from "../common/Text";
import Seed from "../store/Seed";
import customizingAtom from "@/recoil/anxy/customizing/atom";
import { useRecoilValue } from "recoil";

const AnxyJourney = () => {
  const navigate = useNavigate();

  const dailyProgramDetail_mock = {
    result: {
      programCurrentDate: "2024-12-12",
      programDaysLeft: 10,
      activityList: [
        {
          progressRate: 0,
          isLock: false,
          isFirstUnlocked: false,
          isFirstComplete: false,
          activityId: "1",
        },
        {
          progressRate: 0,
          isLock: false,
          isFirstUnlocked: false,
          isFirstComplete: false,
          activityId: "2",
        },
      ],
      // seedBox: {
      //   rewardType: "first",
      //   rewardAmount: 100,
      //   seedCount: 10,
      //   message: "sd",
      //   seedBoxId: "1",
      // },
    },
  };
  const dailyProgramDetail_mock2 = {
    result: {
      programCurrentDate: "2024-12-12",
      programDaysLeft: 10,
      activityList: [
        {
          progressRate: 100,
          isLock: false,
          isFirstUnlocked: false,
          isFirstComplete: false,
          activityId: "1",
        },
        {
          progressRate: 0,
          isLock: false,
          isFirstUnlocked: false,
          isFirstComplete: false,
          activityId: "2",
        },
      ],
      // seedBox: {
      //   rewardType: "first",
      //   rewardAmount: 100,
      //   seedCount: 10,
      //   message: "sd",
      //   seedBoxId: "1",
      // },
    },
  };
  const dailyProgramDetail_mock3 = {
    result: {
      programCurrentDate: "2024-12-12",
      programDaysLeft: 10,
      activityList: [
        {
          progressRate: 100,
          isLock: false,
          isFirstUnlocked: false,
          isFirstComplete: false,
          activityId: "1",
        },
        {
          progressRate: 100,
          isLock: false,
          isFirstUnlocked: false,
          isFirstComplete: false,
          activityId: "2",
        },
      ],
      // seedBox: {
      //   rewardType: "first",
      //   rewardAmount: 100,
      //   seedCount: 10,
      //   message: "sd",
      //   seedBoxId: "1",
      // },
    },
  };
  const initialData = {
    result: {
      programCurrentDate: "2024-12-12",
      programDaysLeft: 10,
      activityList: [],
    },
  };
  const [dailyProgramDetail, setDailyProgramDetail] = useState<{
    result: {
      programCurrentDate: string;
      programDaysLeft: number;
      activityList: {
        progressRate: number;
        isLock: boolean;
        isFirstUnlocked: boolean;
        isFirstComplete: boolean;
        activityId: string;
      }[];
      seedBox?: {
        rewardType: string;
        rewardAmount: number;
        seedCount: number;
        message: string;
        seedBoxId: string;
      };
    };
  }>(initialData);

  useEffect(() => {
    setTimeout(() => {
      setDailyProgramDetail(dailyProgramDetail_mock);
      setTimeout(() => {
        setDailyProgramDetail(dailyProgramDetail_mock2);
        setTimeout(() => {
          setDailyProgramDetail(dailyProgramDetail_mock3);
        }, 2000);
      }, 2000);
    }, 2000);
  }, []);

  const [dailyActivityList, setDailyActivityList] = useLocalStorage<
    { activityId: string; progressRate: number; isLock: boolean }[]
  >("dailyActivityList", []);
  const [refetchDailyProgramDetail, setRefetchDailyProgramDetail] =
    useState(false);

  const [currentStage, setCurrentStage] = useState<number | undefined>(
    undefined
  );
  const { seedCount } = useRecoilValue(customizingAtom);

  useEffect(() => {
    if (
      dailyActivityList &&
      dailyActivityList.length > 0 &&
      currentStage === dailyActivityList.length - 1
    ) {
      setTimeout(() => {
        setCurrentStage((currentStage) => (currentStage || 0) + 1);
      }, 2000);
    }
  }, [currentStage, dailyActivityList]);

  useEffect(() => {
    if (refetchDailyProgramDetail) {
      // getDailyProgramDetail();
      setRefetchDailyProgramDetail(false);
    }
  }, [refetchDailyProgramDetail]);

  useEffect(() => {
    if (dailyProgramDetail) {
      const changedList = dailyProgramDetail.result.activityList
        ? dailyProgramDetail.result.activityList.slice()
        : [];

      const isAnxyStateFirstChange =
        (dailyActivityList &&
          dailyActivityList.filter(({ progressRate }) => progressRate === 100)
            .length !==
            changedList.filter(({ progressRate }) => progressRate === 100)
              .length) ||
        false;

      setCurrentStage(
        changedList.length === 0
          ? -2
          : changedList.filter((element) => element.progressRate === 100)
              .length -
              (changedList.every((element) => element.progressRate === 100) &&
              !isAnxyStateFirstChange
                ? 0
                : 1)
      );

      if (dailyActivityList) {
        dailyActivityList.forEach((beforeItem) => {
          changedList.forEach((afterItem) => {
            if (beforeItem.activityId === afterItem.activityId) {
              if (beforeItem.isLock && afterItem.isLock === false) {
                afterItem.isFirstUnlocked = true;
              } else {
                afterItem.isFirstUnlocked = false;
              }
              if (
                beforeItem.progressRate < 100 &&
                afterItem.progressRate === 100
              ) {
                afterItem.isFirstComplete = true;
              } else {
                afterItem.isFirstComplete = false;
              }
            }
          });
        });
      }
      setDailyActivityList(changedList);
    }
  }, [dailyProgramDetail]);

  return (
    <div css={{ width: "100%" }}>
      {/* 씨앗 */}
      <div
        css={{
          zIndex: 100,
          width: "100%",
          height: "44px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
        }}
      >
        {seedCount !== undefined && (
          <div
            css={{
              width: "fit-content",
              backgroundColor: "white",
              borderRadius: "40px",
              padding: "3px 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={() => {
              navigate("/anxy/store");
            }}
          >
            <Store />
            <div
              css={{
                width: "1px",
                height: "13px",
                borderRadius: "1px",
                backgroundColor: "black",
                opacity: "0.1",
              }}
            />
            <div css={{ display: "flex", gap: "2px" }}>
              <Seed />
              <Text17 customCss={{ fontWeight: 700 }}>{`${seedCount}`}</Text17>
            </div>
          </div>
        )}
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Text24>오늘의 여정</Text24>
      </div>
      <div className={`w-full `}>
        <div className="mb-[60px] mt-[12px]">
          {currentStage !== undefined && (
            <AnxyTravel
              bridgeNum={(dailyActivityList && dailyActivityList.length) || 2}
              currentStage={currentStage}
              seedData={dailyProgramDetail && dailyProgramDetail.result.seedBox}
            />
          )}

          {currentStage !== undefined && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: currentStage === -2 ? 0 : "auto",
              }}
              transition={{
                duration: currentStage > -1 ? 0 : 0.2,
                delay: currentStage > -1 ? 0 : 1.5,
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
