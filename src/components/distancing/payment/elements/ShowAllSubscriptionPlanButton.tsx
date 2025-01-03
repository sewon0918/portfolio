import Link from "../../common/Link";
import { useState } from "react";
import SubscriptionPlanOptionModal from "./SubscriptionPlanOptionModal";
import { isMobileVersion } from "@/utils/isMobileVersion";
import ButtonWithModal from "../../common/ButtonWithModal";

export default function ShowAllSubscriptionPlanButton() {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);

  return (
    <>
      <SubscriptionPlanOptionModal
        isOpen={isPlanOpen}
        setIsOpen={setIsPlanOpen}
      />

      {isMobileVersion ? (
        <Link
          text={"모든 이용권 보기"}
          onClick={() => {
            setIsPlanOpen(true);
          }}
        />
      ) : (
        <ButtonWithModal
          title={"앱에서 진행해주세요"}
          // action={() => {}}
          render={<Link text={"모든 이용권 보기"} />}
        />
      )}
    </>
  );
}
