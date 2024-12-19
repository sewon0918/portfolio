import { useEffect, useRef, useState } from "react";
import AppScreen from "@/components/common/AppScreen";
import { useColorTheme } from "@/hooks/useColorTheme";
import { useNavigate } from "react-router";
import ContainerWithBottomButton from "@/components/common/ContainerWithBottomButton";
import { ButtonStateType } from "@/components/anxy/common/button/ActionButton";
import HighlightSentence from "@/components/anxy/retrospect/HighlightSentence";
import Lottie from "@/components/common/Lottie";
import highlight_finger_guide from "@/assets/anxy/retrospect/highlight_finger_guide.json";
import { Text18 } from "@/components/anxy/common/Text";
import { addAlpha } from "@/utils/helpers";

export default function Retrospect() {
  const colorPalette = useColorTheme({ type: "anxy" });
  const [buttonState, setButtonState] = useState<ButtonStateType>("INACTIVE");

  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const submit = () => {
    goBack();
  };

  const [selectedSentenceList, setSelectedSentenceList] = useState<string[]>(
    []
  );
  const [showFingerGuide, setShowFingerGuide] = useState(true);

  useEffect(() => {
    if (selectedSentenceList.length > 0) {
      setButtonState("ACTIVE");
      setShowFingerGuide(false);
    } else {
      setButtonState("INACTIVE");
    }
  }, [selectedSentenceList]);

  const thought =
    "팀장을 맡아서 전적으로 내가 잘해야하는 프로젝트인데 내가 잘 해낼 수 있을지 걱정된다. 내가 다 망칠 것 같다... 실력이 부족한 것 같고 좋은 생각이 떠오르지 않는다. 프로젝트가 다 망할 것 같다 내가 성공 시켰으면 좋겠다";

  const isOverflow =
    containerRef.current &&
    containerRef.current.offsetHeight < containerRef.current.scrollHeight - 60;

  function ScrollGradientIndicator({ isInvisible }: { isInvisible: boolean }) {
    return (
      <>
        <div
          style={{
            ...(isInvisible && { display: "none" }),
            position: "absolute",
            width: "100%",
            top: "0px",
            left: 0,
            height: "30px",
            pointerEvents: "none",
            background: `linear-gradient(180deg, ${
              colorPalette.green
            } 0%, ${addAlpha(colorPalette.green, 0)} 100%)`,
          }}
        />
        <div
          style={{
            ...(isInvisible && { display: "none" }),
            position: "absolute",
            width: "100%",
            bottom: "0px",
            left: 0,
            height: "30px",
            pointerEvents: "none",
            background: `linear-gradient(0deg, ${
              colorPalette.green
            } 0%, ${addAlpha(colorPalette.green, 0)} 100%)`,
          }}
        />
      </>
    );
  }
  return (
    <AppScreen backgroundColor={colorPalette.green}>
      <ContainerWithBottomButton
        backgroundColor={colorPalette.green}
        buttonState={buttonState}
        buttonText="찾았어요"
        buttonOnClick={submit}
      >
        <div
          css={{
            height: "100%",
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Text18 customCss={{ color: "#ffffff" }}>
            나쁜 일이 생길 거라 예상한 문장을 찾아주세요
          </Text18>
          <div
            css={{
              height: "300px",
              position: "relative",
            }}
          >
            <ScrollGradientIndicator isInvisible={!isOverflow} />
            <div
              ref={containerRef}
              css={{
                padding: "30px 0",
                height: "100%",
                overflow: isOverflow ? "auto" : "hidden",
                scrollbarWidth: "none",
              }}
            >
              <HighlightSentence
                text={thought}
                selectedSentenceList={selectedSentenceList}
                setSelectedSentenceList={setSelectedSentenceList}
                readonly={false}
              />
            </div>
            {showFingerGuide && (
              <div
                css={{
                  position: "absolute",
                  bottom: "-100px",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <Lottie
                  lottieData={highlight_finger_guide}
                  autoplay
                  loop
                  delay={0.5}
                  height={100}
                />
              </div>
            )}
          </div>
        </div>
      </ContainerWithBottomButton>
    </AppScreen>
  );
}
