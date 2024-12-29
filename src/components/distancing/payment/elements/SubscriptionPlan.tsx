import { Stack, Typography } from "@mui/joy";
import Chip from "../../common/Chip";
import { Status } from "../../common/Status";
import {
  planData,
  subscriptionAtom,
} from "@/recoil/distancing/subscription/atom";
import { useRecoilState } from "recoil";

export default function SubscriptionPlan() {
  const [selectedPlan, setSelectedPlan] = useRecoilState(subscriptionAtom);
  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "rgba(0, 0, 0, 0.3) 0 1px 3px",
      }}
    >
      {planData.map(
        ({ price, duration, description, label, productId }, index) => (
          <Stack
            direction="row"
            alignItems={"center"}
            spacing="8px"
            sx={{
              p: "20px",

              ...(index === 0 && {
                borderBottomWidth: "1px",
                borderColor: "divider",
              }),
            }}
            onClick={() => {
              setSelectedPlan(planData[index]);
            }}
          >
            <Stack direction={"column"} sx={{ gap: "2px", width: "100%" }}>
              <Stack direction={"row"} alignItems={"center"} spacing="8px">
                <Typography level={"title-md"} sx={{ whiteSpace: "nowrap" }}>
                  <Typography level={"h4"} fontWeight={600}>
                    {price}
                  </Typography>
                  {` / ${duration}`}
                </Typography>
                {label && <Chip label={label} />}
              </Stack>
              <Typography level={"body-xs"} sx={{ opacity: 0.6 }}>
                {description}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexShrink: 0,
              }}
            >
              <Status isChecked={productId === selectedPlan.productId} />
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  );
}
