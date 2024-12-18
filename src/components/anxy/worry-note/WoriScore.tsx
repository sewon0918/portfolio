import { Text24 } from "@/components/anxy/common/Text";
import { Wori } from "@/components/anxy/Wori";
import { DragWorryScore } from "@/components/anxy/worry-note/DragWorryScore";

export default function WoriScore({
  score,
  setScore,
}: {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      css={{
        padding: "12px 0 20px 0",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text24>{"얼마나 불안했나요?"}</Text24>
      <div
        css={{
          flex: 1,
          width: "100%",
          padding: "20px 0",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          css={{
            flex: 1,
            width: "100%",
            position: "relative",
          }}
        >
          <div
            css={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: `translateX(-50%)`,
            }}
          >
            <Wori score={score} showGuide />
          </div>
        </div>
        <DragWorryScore score={score} setScore={setScore} />
      </div>
    </div>
  );
}
