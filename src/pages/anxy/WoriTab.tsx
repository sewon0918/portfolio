import { DragWorryScoreSOS } from "@/components/anxy/DragWorryScoreSOS";
import { useState } from "react";
import { Wori } from "@/components/anxy/Wori";
import { css } from "@emotion/react";
import { ActionButton } from "@/components/anxy/common/button/ActionButton";
import { useNavigate } from "react-router";

export default function WoriTab() {
  const navigate = useNavigate();
  const [woriScore, setWoriScore] = useState(50);
  const [showWoriAnimation, setShowWoriAnimation] = useState<boolean>(false);
  const [score] = useState<number>(50);

  const goWorryNote = () => {
    navigate("/anxy/worry-note");
  };
  return (
    <div
      css={css({
        padding: "0 20px",
      })}
    >
      <div
        css={css({
          margin: "0 auto",
          width: "fit-content",
          marginBottom: "10px",
        })}
      >
        <Wori score={woriScore} showWoriAnimation={showWoriAnimation} />
      </div>

      <DragWorryScoreSOS
        score={score}
        setScore={setWoriScore}
        setShowWoriAnimation={setShowWoriAnimation}
      />
      <div css={{ position: "relative", paddingTop: "12px" }}>
        <ActionButton state={"ACTIVE"} text={"기록하기"} action={goWorryNote} />
      </div>
    </div>
  );
}
