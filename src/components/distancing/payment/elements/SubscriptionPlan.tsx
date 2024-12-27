import { Stack, Typography } from "@mui/joy";
import Chip from "../../common/Chip";
import { Status } from "../../common/Status";

export const planData = [
  {
    price: "240,000원",
    duration: "3개월",
    description: "첫 3개월 이후, 구독은 매 월 8만 원에 자동 갱신됩니다.",
    label: "환불 보장",
    productId: "subscription1",
  },
  {
    price: "80,000원",
    duration: "1개월",
    description: "구독은 매 월 8만 원에 자동 갱신됩니다.",
    productId: "subscription2",
  },
];

export default function SubscriptionPlan() {
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
              alert("플랜 변경");
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
              <Status isChecked={productId === "subscription1"} />
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  );
}
