import { useColorTheme } from "@/hooks/useColorTheme";
import { Text18 } from "@/components/anxy/common/Text";

export default function CategoryTitle({
  title,
  categoryIndex,
}: {
  title: string;
  categoryIndex: number;
}) {
  const colorPalette = useColorTheme({ type: "anxy" });
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorPalette.black, // CSS 변수를 사용하여 색상 설정
          width: "20px",
          height: "20px",
          fontSize: "15px",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
      >
        {categoryIndex + 1}
      </div>
      <Text18>{title}</Text18>
    </div>
  );
}
