import { Button } from "@mui/joy";
export default function DoneButton({
  taskKey,
  size,
}: {
  taskKey: string;
  size?: "sm" | "lg";
}) {
  return (
    <Button
      size={size}
      onClick={() => {
        alert("done");
      }}
    >
      {`마치기`}
    </Button>
  );
}
