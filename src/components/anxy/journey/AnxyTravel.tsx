import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/utils/helpers";
import Anxy, { anxyStateType } from "../customizing/Anxy";
import {
  Bridge,
  Ground,
  GroundWithFlag,
  Reward,
  RewardState,
} from "./TravelElements";
import { usePrevious } from "@toss/react";
import { RewardModal } from "./RewardModal";
import { MileStoneModal } from "./MileStoneModal";
import { Text15 } from "../common/Text";
import { useRecoilValue } from "recoil";
import customizingAtom from "@/recoil/anxy/customizing/atom";

interface AnxyTravelProps {
  currentStage: number;
  bridgeNum: number;
  seedData?: {
    seedCount: number;
    message: string;
    seedBoxId: string;
    rewardType: string;
  };
}

export const AnxyTravel: React.FC<AnxyTravelProps> = ({
  currentStage,
  bridgeNum,
  seedData,
}) => {
  const previousStage = usePrevious(currentStage);
  const [bridgeWidth, setBridgeWidth] = useState<number>(0);
  const [showMileStonePopup, setShowMilestonePopup] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const [focusMilestone, setFocusMilestone] = useState(false);
  const [focusReward, setFocusReward] = useState(false);
  const [isRewardGained, setRewardGained] = useState(false);
  const [rewardState, setRewardState] = useState<RewardState>("LOCKED");

  const { itemList } = useRecoilValue(customizingAtom);

  useEffect(() => {
    if (bridgeNum) {
      setBridgeWidth((brokenWidth - bridgeGap * (bridgeNum - 1)) / bridgeNum);
    }
  }, [bridgeNum]);

  const [state, setState] = useState<
    "WAIT" | "ONPROGRESS" | "ONREWARD" | "DONE" | "REST" | undefined
  >(undefined);

  const previousState = usePrevious(state);

  const [anxyState, setAnxyState] = useState<anxyStateType>("walking");

  useEffect(() => {
    if (state === "ONREWARD") {
      setFocusReward(true);
    } else if (state === "DONE") {
      setFocusMilestone(true);
    }
  }, [state]);

  useEffect(() => {
    console.log("[TEST]", currentStage, previousStage);
    if (currentStage !== undefined && bridgeNum > 0) {
      if (currentStage < bridgeNum) {
        setFocusMilestone(false);
      }
      if (currentStage === -2) {
        setState("WAIT");
      } else if (currentStage === bridgeNum) {
        if (previousStage < currentStage) {
          setState("ONPROGRESS");
          setTimeout(() => {
            setState("ONREWARD");
          }, 1500);
        } else {
          setState("ONREWARD");
        }
      } else {
        setState("ONPROGRESS");
      }
    }
  }, [currentStage, bridgeNum]);

  useEffect(() => {
    if (previousState != undefined && currentStage !== undefined) {
      setAnxyWalking(true);
    }
  }, [state, currentStage]);

  const [anxyWalking, setAnxyWalking] = useState(false);
  const mileStoneWidth = 124;
  const anxyWidth = 85;
  // const brokenWidth = 175;
  const brokenWidth = 160;
  const bridgeGap = 4;

  const beforeMileStoneOffset =
    (window.innerWidth - mileStoneWidth) / 2 - mileStoneWidth / 5;
  const afterMileStoneOffset =
    (window.innerWidth - mileStoneWidth) / 2 + (2 * mileStoneWidth) / 3;
  const beforeBridgeOffset =
    window.innerWidth + (window.innerWidth - brokenWidth) / 2 - anxyWidth;

  const positionData = [
    { state: "WAIT", backgroundX: 0, anxyX: afterMileStoneOffset },
    {
      state: "ONPROGRESS",
      backgroundX: -window.innerWidth,
      anxyX: beforeBridgeOffset + (bridgeWidth + 4) * (currentStage + 1),
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

  const currentStatePositionData = positionData.find(
    (element) => element.state === state
  );

  const previousStatePositionData = previousState
    ? positionData.find((element) => element.state === previousState)
    : undefined;

  useEffect(() => {
    if (state === "WAIT") {
      setAnxyState("standup");
    } else if (state === "ONPROGRESS" && previousState === "WAIT") {
      setAnxyState("walking");
    } else if (state === "ONREWARD" && previousState === "ONPROGRESS") {
      setAnxyState("jumping");
    } else if (state === "DONE" && previousState === "ONREWARD") {
      setAnxyState("walking");
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

  const rewardModalAction = () => {
    if (!isRewardGained) {
      setRewardGained(true);
    } else {
      setFocusReward(false);
      setShowRewardPopup(false);
      setRewardState("GAINED");

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
  };

  return (
    <div css={{ width: "100vw", height: "156px" }}>
      <Text15 customCss={{ position: "absolute" }}>
        {`${currentStage} ${previousStage} ${state} ${previousState} ${anxyState} ${anxyWalking} ${currentStage}`}
      </Text15>

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
            key={state}
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
              delay: currentStatePositionData?.delay || 0.5,
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
                key={`${state}`}
                style={{
                  position: "absolute",
                  bottom: "12px",
                  width: "85px",
                  height: "153px",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
                transition={{
                  delay: 0.5,
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
                  setAnxyWalking(false);

                  if (state === "REST") {
                    setAnxyState("sitdown");
                  }
                }}
              >
                <Anxy
                  state={anxyState}
                  itemList={itemList}
                  loop={anxyState === "walking"}
                  autoplay={anxyState === "walking" ? anxyWalking : true}
                  playing={anxyWalking}
                />
              </motion.div>

              <GroundWithFlag
                focused={focusMilestone}
                onClick={milestoneClickAction}
                clickable={currentStage === bridgeNum}
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
                    <div css={{ flex: 1 }}>
                      {i <= currentStage && (
                        <Bridge
                          key={`bridge${i}`}
                          isFirstAppear={
                            previousStage < currentStage && i === currentStage
                          }
                        />
                      )}
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
                        currentStage === bridgeNum && seedData !== null
                      }
                      state={rewardState}
                    />
                  </div>
                </div>
              </div>
              <GroundWithFlag
                focused={focusMilestone}
                onClick={milestoneClickAction}
                clickable={currentStage === bridgeNum}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
