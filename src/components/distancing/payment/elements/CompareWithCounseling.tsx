import { Box, Stack, Typography } from "@mui/joy";

export default function CompareWithCounseling({
  type,
}: {
  type: "quantity" | "cost";
}) {
  const data = {
    quantity: [
      { title: "심리상담", amount: "200분", width: "33%" },
      {
        title: "디스턴싱",
        amount: "600분",
        width: "100%",
        isHighlight: true,
        label: "3x",
      },
    ],
    cost: [
      { title: "심리상담", amount: "120만원", width: "100%" },
      {
        title: "디스턴싱",
        amount: "24만원",
        width: "20%",
        isHighlight: true,
        label: "1/5x",
      },
    ],
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={"10px"} alignItems="center">
      {data[type].map(({ title, amount, width, isHighlight, label }) => (
        <Stack spacing="4px" sx={{ width: "100%" }}>
          <Box
            sx={{
              width: width,
              height: "10px",
              borderRadius: "10px",
              ...(isHighlight
                ? { backgroundColor: "primary.solid" }
                : { backgroundColor: "common.black", opacity: 0.4 }),
            }}
          ></Box>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Typography
              level="body-sm"
              fontWeight={600}
              sx={{
                ...(isHighlight
                  ? { color: "primary.solid" }
                  : { color: "common.black", opacity: 0.6 }),
              }}
            >
              {title}
            </Typography>
            {label && (
              <Typography
                level="title-md"
                fontWeight={700}
                sx={{ color: "primary.solid" }}
              >
                {label}
              </Typography>
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
