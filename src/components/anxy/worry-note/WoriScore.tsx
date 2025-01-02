import { Text24 } from "@/components/anxy/common/Text";
import { Wori } from "@/components/anxy/wori/Wori";
import { DragWorryScore } from "@/components/anxy/worry-note/DragWorryScore";
import { useEffect, useRef, useState } from "react";
import Toast from "../common/Toast";

export default function WoriScore({
  score,
  setScore,
}: {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showToast, setShowToast] = useState<boolean>(false);
  const woriContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (score === 0) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [score]);
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
      <Toast
        text={"불안하지 않으면 기록하지 않아도 돼요"}
        showToast={showToast}
        setShowToast={setShowToast}
      />
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
