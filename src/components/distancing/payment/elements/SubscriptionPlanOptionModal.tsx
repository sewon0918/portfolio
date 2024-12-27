import { Stack } from "@mui/joy";
import PaymentButton from "./PaymentButton";
import SubscriptionPlan from "./SubscriptionPlan";
import BottomSheet from "../../common/BottomSheet";
import { extractHexColor } from "@/utils/helpers";
import { theme } from "@/styles/theme";

export default function SubscriptionPlanOptionModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <BottomSheet
      isVisible={isOpen}
      setIsVisible={setIsOpen}
      backgrounColor={extractHexColor(theme.vars.palette.background.level1)}
    >
      <Stack
        sx={{
          width: "100%",
          px: "20px",
          pb: "20px",
        }}
        spacing={"12px"}
      >
        <SubscriptionPlan />
        <PaymentButton />
      </Stack>
    </BottomSheet>
  );
}
