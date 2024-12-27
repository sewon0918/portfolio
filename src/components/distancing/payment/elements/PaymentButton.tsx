import { Button } from "@mui/joy";
import { useState } from "react";

export default function PaymentButton({
  color = "primary",
  size = "lg",
}: {
  color?: "primary" | "white";
  size?: "sm" | "lg";
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestPayment = () => {
    setIsLoading(true);
  };

  return (
    <Button
      loading={isLoading}
      onClick={requestPayment}
      size={size}
      color={color}
      sx={{ width: "100%" }}
    >
      {"무료 체험 시작하기"}
    </Button>
  );
}
