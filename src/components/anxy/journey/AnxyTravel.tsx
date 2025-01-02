import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/utils/helpers";
import Anxy, { anxyStateType } from "../customizing/Anxy";
import {
  Bridge,
  Ground,
  GroundWithFlag,
  Reward,
  RewardState,
} from "./TravelElements";
import { RewardModal } from "./RewardModal";
import { MileStoneModal } from "./MileStoneModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import customizingAtom, {
  addSeedSelector,
} from "@/recoil/anxy/customizing/atom";
import {
  isMileStoneClickedSelector,
  isRewardGainedSelector,
} from "@/recoil/anxy/journey/atom";

interface AnxyTravelProps {
  completedActivitiesCount: number;
  previousCompletedActivitiesCount?: number;
  bridgeNum: number;
  seedData?: {
    seedCount: number;
    message: string;
    seedBoxId: string;
    rewardType: string;
  };
}

export type AnxyTravelStateType =
  | "WAIT"
  | "ONPROGRESS"
  | "ONREWARD"
  | "DONE"
  | "REST";

export const AnxyTravel: React.FC<AnxyTravelProps> = ({
  completedActivitiesCount,
  previousCompletedActivitiesCount,
  bridgeNum,
  seedData,
}) => {
  const [currentStage, setCurrentStage] = useState<number>(
    completedActivitiesCount
  );
  const [previousStage, setPreviousStage] = useState<number | undefined>(
    previousCompletedActivitiesCount
  );

  useEffect(() => {
    setCurrentStage(completedActivitiesCount);
    setPreviousStage(previousCompletedActivitiesCount);
  }, [completedActivitiesCount, previousCompletedActivitiesCount]);

  const [bridgeWidth, setBridgeWidth] = useState<number>(0);
  const [showMileStonePopup, setShowMilestonePopup] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const [focusMilestone, setFocusMilestone] = useState(false);
  const [focusReward, setFocusReward] = useState(false);
  const [rewardState, setRewardState] = useState<RewardState>("LOCKED");

  const { itemList } = useRecoilValue(customizingAtom);

  const [isRewardGained, setRewardGained] = useRecoilState(
    isRewardGainedSelector
  );
  const [isMileStoneClicked, setIsMileStoneClicked] = useRecoilState(
    isMileStoneClickedSelector
  );

  useEffect(() => {
    if (bridgeNum) {
      setBridgeWidth((brokenWidth - bridgeGap * (bridgeNum - 1)) / bridgeNum);
    }
  }, [bridgeNum]);

  const [state, setState] = useState<AnxyTravelStateType | undefined>(
    undefined
  );
  const [previousState, setPreviousState] = useState<
    AnxyTravelStateType | undefined
  >(undefined);

  const [anxyState, setAnxyState] = useState<anxyStateType>("walking");

  useEffect(() => {
    if (state === "ONREWARD") {
      setFocusReward(true);
    } else if (state === "DONE") {
      setFocusMilestone(true);
    }
  }, [state]);

  const getStateByStage = (currentStage: number, previousStage?: number) => {
    if (currentStage !== undefined && bridgeNum > 0) {
      if (currentStage === 0) {
        if (previousStage === undefined) {
          return "WAIT";
        } else {
          return "ONPROGRESS";
        }
      } else if (currentStage === bridgeNum) {
        if (isMileStoneClicked) {
          return "REST";
        } else if (isRewardGained) {
          return "DONE";
        } else if (
          previousStage !== undefined &&
          previousStage < currentStage
        ) {
          return "ONPROGRESS";
        } else {
          return "ONREWARD";
        }
      } else {
        return "ONPROGRESS";
      }
    }
  };

  useEffect(() => {
    if (currentStage !== undefined && bridgeNum > 0) {
      if (currentStage < bridgeNum) {
        setFocusMilestone(false);
      }
      setState(getStateByStage(currentStage, previousStage));
      if (previousStage !== undefined) {
        setPreviousState(getStateByStage(previousStage, previousStage));
      }
    }
  }, [currentStage, previousStage, bridgeNum]);

  useEffect(() => {
    if (state !== previousState || currentStage !== previousStage) {
      setAnxyWalking(true);
    }
  }, [state]);

  const [anxyWalking, setAnxyWalking] = useState(false);
  const mileStoneWidth = 124;
  const anxyWidth = 85;
  const brokenWidth = 160;
  const bridgeGap = 4;

  const beforeMileStoneOffset =
    (window.innerWidth - mileStoneWidth) / 2 - mileStoneWidth / 5;
  const afterMileStoneOffset =
    (window.innerWidth - mileStoneWidth) / 2 + (2 * mileStoneWidth) / 3;
  const beforeBridgeOffset =
    window.innerWidth + (window.innerWidth - brokenWidth) / 2 - anxyWidth;

  const positionData = (stage: number) => [
    { state: "WAIT", backgroundX: 0, anxyX: afterMileStoneOffset },
    {
      state: "ONPROGRESS",
      backgroundX: -window.innerWidth,
      anxyX: beforeBridgeOffset + (bridgeWidth + 4) * stage,
    },
    {
      state: "ONREWARD",
      backgroundX: -window.innerWidth,
      anxyX: beforeBridgeOffset + (bridgeWidth + 4) * (bridgeNum + 1),
    },
    {
      state: "DONE",
      backgroundX: -2 * window.innerWidth,
      anxyX: 2 * window.innerWidth + beforeMileStoneOffset,
    },
    {
      state: "REST",
      backgroundX: -2 * window.innerWidth,
      anxyX: 2 * window.innerWidth + afterMileStoneOffset,
      delay: 1,
    },
  ];

  const currentStatePositionData =
    currentStage !== undefined
      ? positionData(currentStage).find((element) => element.state === state)
      : undefined;

  const previousStatePositionData = previousState
    ? positionData(previousStage || 0).find(
        (element) => element.state === previousState
      )
    : undefined;

  useEffect(() => {
    if (state === "WAIT") {
      setAnxyState("standup");
    } else if (state === "ONPROGRESS" && previousState === "WAIT") {
      setAnxyState("walking");
    } else if (state === "ONREWARD" && previousState === "ONPROGRESS") {
      // setAnxyState("jumping");
    } else if (state === "DONE" && previousState === "ONREWARD") {
      setAnxyState("walking");
    } else if (state === "REST" && previousState === "REST") {
      setAnxyState("standup");
    }
  }, [state]);

  useEffect(() => {
    if (showMileStonePopup) {
      setFocusMilestone(false);
    }
  }, [showMileStonePopup]);

  const milestoneClickAction = () => {
    setShowMilestonePopup(true);
  };
  const addSeed = useSetRecoilState(addSeedSelector);
  const rewardModalAction = () => {
    if (!isRewardGained) {
      setRewardGained(true);
    } else {
      setFocusReward(false);
      setShowRewardPopup(false);
      setRewardState("GAINED");
      addSeed(1);
      setTimeout(() => {
        setState("DONE");
      }, 300);
    }
  };

  const rewardModalDismissAction = () => {
    if (!isRewardGained) {
      setFocusReward(true);
    }
  };

  const milestoneModalAction = () => {
    setState("REST");
    setShowMilestonePopup(false);
    setIsMileStoneClicked(true);
  };

  return (
    <div css={{ width: "100vw", height: "156px" }}>
      {/* <Text15 customCss={{ position: "absolute" }}>
        {`${currentStage} ${previousStage} ${state} ${previousState} ${anxyState} ${anxyWalking}`}
      </Text15> */}

      <RewardModal
        isModalVisible={showRewardPopup}
        setModalVisible={setShowRewardPopup}
        isRewardGained={isRewardGained}
        action={rewardModalAction}
        dismissAction={rewardModalDismissAction}
      />

      <MileStoneModal
        isModalVisible={showMileStonePopup}
        setModalVisible={setShowMilestonePopup}
        action={milestoneModalAction}
        dismissAction={milestoneModalAction}
      />
      {/* 배경 */}
      {state && (
        <div css={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <motion.div
            initial={{
              x: previousStatePositionData
                ? previousStatePositionData?.backgroundX
                : currentStatePositionData?.backgroundX,
            }}
            animate={{
              x: currentStatePositionData?.backgroundX,
            }}
            transition={{
              duration: 2,
              delay: currentStatePositionData?.delay || 0.2,
            }}
            css={{ width: "300vw", height: "content-fit", overflow: "hidden" }}
          >
            <div
              css={{
                width: "calc(100% + 100px)",
                height: "130px",
                backgroundImage: `url(${getImageUrl(
                  "../../../assets/anxy/journey/mountain.png",
                  import.meta.url
                )})`,
                backgroundSize: "auto 100%",
                backgroundRepeat: "repeat-x",
                transform: "translateX(-100px)",
              }}
            ></div>

            <div
              css={{
                display: "flex",
                width: "fit-content",
                position: "relative",
              }}
            >
              {/* anxy */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  width: "85px",
                  height: "153px",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
                transition={{
                  delay: 0.2,
                  duration: 1,
                }}
                initial={{
                  x: previousStatePositionData
                    ? previousStatePositionData?.anxyX
                    : currentStatePositionData?.anxyX,
                }}
                animate={{
                  x: currentStatePositionData?.anxyX,
                }}
                onAnimationComplete={() => {
                  if (state === "ONPROGRESS" || state === "DONE") {
                    setAnxyWalking(false);
                  }
                  if (
                    state === "ONPROGRESS" &&
                    completedActivitiesCount === bridgeNum
                  ) {
                    setState("ONREWARD");
                    setPreviousStage(bridgeNum);
                  } else if (state === "ONREWARD") {
                    setAnxyState("jumping");
                    setPreviousState("ONREWARD");
                  } else if (state === "DONE") {
                    setPreviousState("DONE");
                  } else if (state === "REST" && previousState === "DONE") {
                    setAnxyState("sitdown");
                  }
                }}
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={`${anxyState}`}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration:
                          state === "WAIT" || state === previousState ? 0 : 1,
                      },
                    }}
                    css={{ position: "absolute", width: "100%" }}
                  >
                    <Anxy
                      state={anxyState}
                      itemList={itemList}
                      loop={anxyState === "walking"}
                      autoplay={anxyWalking}
                      playing={anxyWalking}
                      onAnimationComplete={() => {
                        setAnxyWalking(false);
                        if (anxyState == "standup") {
                          setState("ONPROGRESS");
                          setPreviousState("WAIT");
                        } else if (anxyState == "sitdown") {
                          setAnxyState("standup");
                        }
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <GroundWithFlag
                focused={focusMilestone}
                onClick={milestoneClickAction}
                clickable={completedActivitiesCount === bridgeNum}
              />
              <div css={{ width: "100vw", display: "flex", gap: "4px" }}>
                <div css={{ flex: 1 }}>
                  <Ground rightRoundBorder />
                </div>
                <div
                  css={{
                    width: `${brokenWidth}px`,
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  {Array.from({ length: bridgeNum }, (v, i) => i).map((i) => (
                    <div key={`bridge${i}`} css={{ flex: 1 }}>
                      {i <= currentStage - 1 && (
                        <Bridge
                          key={`bridge${i}`}
                          isFirstAppear={
                            previousStage !== undefined &&
                            previousStage < currentStage &&
                            i > previousStage &&
                            i <= currentStage
                          }
                        />
                      )}
                      {/* <div css={{ position: "absolute", zIndex: 100, top: 0 }}>
                        {`${
                          previousStage !== undefined &&
                          previousStage <
                            currentStage &&
                          i > previousStage &&
                          i <= currentStage
                        }`}
                      </div> */}
                    </div>
                  ))}
                </div>
                <div css={{ flex: 1, position: "relative" }}>
                  <Ground leftRoundBorder />
                  <div
                    css={{
                      position: "absolute",
                      bottom: "15px",
                      left: "5px",
                      zIndex: 20,
                    }}
                  >
                    <Reward
                      focused={focusReward}
                      onClick={() => {
                        setFocusReward(false);
                        setShowRewardPopup(true);
                      }}
                      clickable={
                        completedActivitiesCount === bridgeNum &&
                        seedData !== null
                      }
                      state={rewardState}
                    />
                  </div>
                </div>
              </div>
              <GroundWithFlag
                focused={focusMilestone}
                onClick={milestoneClickAction}
                clickable={completedActivitiesCount === bridgeNum}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
