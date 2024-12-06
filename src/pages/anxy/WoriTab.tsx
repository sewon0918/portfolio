import { DragWorryScoreSOS } from "@/components/anxy/DragWorryScoreSOS";
import { useState } from "react";
import { Wori } from "@/components/anxy/Wori";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";
import { TestLink } from "@/components/common/TestLink";

export default function WoriTab() {
  const navigate = useNavigate();

  const [woriScore, setWoriScore] = useState(50);
  const [showWoriAnimation, setShowWoriAnimation] = useState<boolean>(false);
  const [score] = useState<number>(50);

  return (
    <div
      css={css({
        padding: "0 20px",
      })}
    >
      <TestLink
        onClick={() => {
          navigate("/anxy/community");
        }}
      >
        커뮤니티
      </TestLink>
      <TestLink
        onClick={() => {
          alert("go leave");
        }}
      >
        구독 취소
      </TestLink>
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
    </div>
  );
}
