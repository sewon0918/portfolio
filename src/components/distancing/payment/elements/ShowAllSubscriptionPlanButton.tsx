import Link from "../../common/Link";
import { useState } from "react";
import SubscriptionPlanOptionModal from "./SubscriptionPlanOptionModal";

export default function ShowAllSubscriptionPlanButton() {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);

  return (
    <>
      <SubscriptionPlanOptionModal
        isOpen={isPlanOpen}
        setIsOpen={setIsPlanOpen}
      />

      <Link
        text={"모든 이용권 보기"}
        onClick={() => {
          setIsPlanOpen(true);
        }}
      />
    </>
  );
}
