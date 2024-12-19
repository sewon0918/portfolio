import { PressedEffect } from "@/components/common/PressedEffect";
import { useNavigate } from "react-router";
import { Text17 } from "../common/Text";
import ActivityStateIndicator from "./ActivityStateIndicator";
import { ActivityType } from "@/recoil/anxy/program/atom";

interface DailyProgramProps {
  activityList?: ActivityType[];
}

function ArrowTail() {
  return (
    <div
      css={{
        position: "absolute",
        top: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <svg
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.40202 1.5C7.55672 -0.499998 10.4435 -0.5 11.5982 1.5L17.6604 12H0.339844L6.40202 1.5Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

const activityMappingData: { [key: string]: { title: string; url: string } } = {
  "worry-note": { title: "걱정기록하기", url: "/anxy/worry-note" },
  retrospect: { title: "회고하기", url: "/anxy/retrospect" },
};

export const DailyProgram: React.FC<DailyProgramProps> = ({ activityList }) => {
  const navigate = useNavigate();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        paddingTop: "10px",
      }}
    >
      {activityList &&
        activityList.map(
          (
            {
              activityId,
              isLock,
              progressRate,
              prevProgressRate,
              isFirstComplete,
              isFirstUnlocked,
            },
            index
          ) => (
            <PressedEffect
              key={`activity${index}`}
              disable={isLock}
              element={
                <div
                  css={{
                    width: "100%",
                    borderRadius: "16px",
                    backgroundColor: "white",
                    padding: "24px 20px",
                    position: "relative",
                  }}
                >
                  {index === 0 && <ArrowTail />}
                  <div
                    css={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <ActivityStateIndicator
                      isLock={isLock}
                      isFirstUnlocked={isFirstUnlocked}
                      isCompleted={progressRate === 100}
                      isFirstComplete={isFirstComplete}
                      progressRate={progressRate}
                      prevProgressRate={prevProgressRate}
                    />
                    <Text17 customCss={{ fontWeight: 700 }}>
                      {activityMappingData[activityId]?.title}
                    </Text17>
                  </div>
                </div>
              }
              action={() => {
                navigate(activityMappingData[activityId]?.url);
              }}
            />
          )
        )}
    </div>
  );
};
