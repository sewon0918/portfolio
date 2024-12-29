import { Typography } from "@mui/joy";
import { useRecoilValue } from "recoil";
import { subscriptionAtom } from "@/recoil/distancing/subscription/atom";

export default function SelectedPlan() {
  const selectedPlan = useRecoilValue(subscriptionAtom);

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
