import ModalTemplate from "@/components/anxy/common/modal/ModalTemplate";
import { ButtonStateType } from "../common/button/ActionButton";
import { ItemType } from "@/recoil/anxy/customizing/atom";
import { getImageUrl } from "@/utils/helpers";

export default function PurchaseConfirmModal({
  isModalVisible,
  setModalVisible,
  buttonState,
  title,
  subtitle,
  itemId,
  action,
  dismissAction,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  buttonState: ButtonStateType;
  title: string;
  subtitle: string;
  itemId: ItemType;
  action: () => void;
  dismissAction: () => void;
}) {
  return (
    <ModalTemplate
      isModalVisible={isModalVisible}
      setIsModalVisible={setModalVisible}
      buttonState={buttonState}
      title={title}
      text={subtitle}
      buttonText={"구매하기"}
      content={
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={getImageUrl(
              `../../../assets/anxy/customizing/store/${itemId}.png`,
              import.meta.url
            )}
            css={{ width: "104px", height: "104px" }}
          />
        </div>
      }
      action={action}
      dismissAction={dismissAction}
    />
  );
}
