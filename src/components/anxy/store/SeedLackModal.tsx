import ModalTemplate from "@/components/anxy/common/modal/ModalTemplate";
import { SeedWithShadow } from "@/components/anxy/store/Seed";

export default function SeedLackModal({
  isModalVisible,
  setModalVisible,
  lackSeedCount,
  action,
  dismissAction,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  lackSeedCount: number;
  action: () => void;
  dismissAction: () => void;
}) {
  return (
    <ModalTemplate
      isModalVisible={isModalVisible}
      setIsModalVisible={setModalVisible}
      title={`씨앗 ${lackSeedCount}개가 부족해요`}
      buttonText={"확인"}
      content={
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SeedWithShadow />
        </div>
      }
      action={action}
      dismissAction={dismissAction}
    />
  );
}
