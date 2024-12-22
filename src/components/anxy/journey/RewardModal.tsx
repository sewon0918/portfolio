import { motion } from "framer-motion";

import ModalTemplate from "../common/modal/ModalTemplate";
import { Text15 } from "../common/Text";
import Lottie from "@/components/common/Lottie";
import reward_twinkle from "@/assets/anxy/journey/reward_twinkle.json";
import reward_gain from "@/assets/anxy/journey/reward_gain.json";

export function RewardModal({
  isModalVisible,
  setModalVisible,
  isRewardGained,
  action,
  dismissAction,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isRewardGained: boolean;
  action: () => void;
  dismissAction: () => void;
}) {
  return (
    <ModalTemplate
      isModalVisible={isModalVisible}
      setIsModalVisible={setModalVisible}
      title={!isRewardGained ? "상자를 발견했어요" : "받은 씨앗"}
      buttonText={!isRewardGained ? "열어보기" : "확인"}
      content={
        <div
          css={{
            padding: "0 25px",
          }}
        >
          <div css={{ height: "36px", textAlign: "center" }}>
            {!isRewardGained ? (
              <Text15 customCss={{ opacity: 0.6 }}>
                상자를 열어 씨앗을 발견해보세요
              </Text15>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                css={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontWeight: 700,
                }}
              >
                {/* {`${seedData?.seedCount}개`} */}
                {`1개`}
              </motion.div>
            )}
          </div>
          <div css={{ width: "140px", height: "140px", margin: "0 auto" }}>
            <Lottie
              lottieData={!isRewardGained ? reward_twinkle : reward_gain}
              autoplay
              loop={!isRewardGained}
              width={"100%"}
              height={"100%"}
              renderer={"canvas"}
            />
          </div>
        </div>
      }
      action={() => {
        action();
      }}
      dismissAction={() => {
        dismissAction();
      }}
    />
  );
}
