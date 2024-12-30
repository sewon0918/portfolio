import { Text24 } from "@/components/anxy/common/Text";
import { Wori } from "@/components/anxy/Wori";
import { DragWorryScore } from "@/components/anxy/worry-note/DragWorryScore";
import { useRef } from "react";

export default function WoriScore({
  score,
  setScore,
}: {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const woriContainerRef = useRef<HTMLDivElement>(null);
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
          ref={woriContainerRef}
        >
          <div
            css={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: `translateX(-50%)`,
              scale: (woriContainerRef.current?.offsetHeight || 0) / 378,
              transformOrigin: "bottom left",
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
