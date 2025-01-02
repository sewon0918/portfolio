import { Text15 } from "@/components/anxy/common/Text";
export interface GroundingButtonProps {
  color: string;
  borderColor?: string;
  icon: any;
  text: string;
  action: () => void;
}

export default function GroundingButton({
  color,
  borderColor,
  icon,
  text,
  action,
}: GroundingButtonProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "85px",
          height: "85px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          backgroundColor: color,
          borderColor: borderColor || color,
        }}
        onClick={action}
      >
        {icon}
      </div>
      <Text15 customCss={{ opacity: 0.8 }}>{text}</Text15>
    </div>
  );
}
