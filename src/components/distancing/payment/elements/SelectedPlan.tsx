import { Typography } from "@mui/joy";
import { planData } from "./SubscriptionPlan";

export default function SelectedPlan() {
  const selectedPlan = planData.find(
    (element) => element.productId === "subscription2"
  );

  return (
    <Typography>
      <Typography level="body-sm" sx={{ fontWeight: 600, opacity: 0.5 }}>
        {`${selectedPlan?.price} / ${selectedPlan?.duration}`}
      </Typography>
      {selectedPlan?.label && (
        <Typography level="body-sm" color="primary" sx={{ fontWeight: 600 }}>
          {` (${selectedPlan?.label})`}
        </Typography>
      )}
    </Typography>
  );
}
