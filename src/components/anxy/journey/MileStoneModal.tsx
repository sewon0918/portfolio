import ModalTemplate from "../common/modal/ModalTemplate";
import { Text15 } from "../common/Text";
import {
  getDateByToday,
  getRemainigTime,
  getRemainigTimeString,
} from "@/utils/helpers";
import { useState } from "react";
import { useInterval } from "@toss/react";

export function MileStoneModal({
  isModalVisible,
  setModalVisible,
  action,
  dismissAction,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  action: () => void;
  dismissAction: () => void;
}) {
  const tomorrow = getDateByToday(1);
  const [remainingTime, setRemainingTime] = useState(getRemainigTime(tomorrow));

  useInterval(() => {
    setRemainingTime(getRemainigTime(tomorrow));
  }, 1000);

  return (
    <ModalTemplate
      isModalVisible={isModalVisible}
      setIsModalVisible={setModalVisible}
      title={"오늘은 여기까지 해요"}
      text={"매일 꾸준히 해나가는 것이 중요해요"}
      buttonText={"확인"}
      content={
        <div
          css={{
            width: "100%",
            borderRadius: "16px",
            padding: "22px 20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Text15 customCss={{ opacity: 0.6 }}>내일 여정 시작까지</Text15>
          <p
            css={{
              fontSize: "30px",
              lineHeight: "36px",
              fontWeight: "bold",
              color: "black",
              whiteSpace: "nowrap",
            }}
          >
            {getRemainigTimeString(remainingTime)}
          </p>
        </div>
      }
      action={action}
      dismissAction={dismissAction}
    />
  );
}
