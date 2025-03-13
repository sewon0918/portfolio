import { DragWorryScoreSOS } from "@/components/anxy/grounding/DragWorryScoreSOS";
import { useEffect, useState } from "react";
import { Wori } from "@/components/anxy/wori/Wori";
import { css } from "@emotion/react";
import { ActionButton } from "@/components/anxy/common/button/ActionButton";
import { useNavigate } from "react-router";
import { Text24 } from "@/components/anxy/common/Text";
import { useRecoilValue } from "recoil";
import woriAtom from "@/recoil/anxy/wori/atom";

export default function WoriTab() {
  const navigate = useNavigate();
  const { prevScore, score } = useRecoilValue(woriAtom);

  const [woriScore, setWoriScore] = useState(prevScore);
  const [showWoriAnimation, setShowWoriAnimation] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setWoriScore(score);
      setShowWoriAnimation(true);
    }, 5000);
  }, [score]);
  // const [score] = useState<number>(50);

  const goWorryNote = () => {
    navigate("/anxy/worry-note");
  };
  return (
    <div
      css={css({
        padding: "0 20px",
      })}
    >
      <Text24 customCss={{ paddingTop: "12px" }}>최근 나의 불안</Text24>
      <div
        css={css({
          margin: "0 auto",
          width: "fit-content",
          marginBottom: "10px",
          marginTop: "20px",
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
