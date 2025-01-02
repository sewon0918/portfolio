import { useState } from "react";
import voice_effect from "@/assets/anxy/grounding/voice_effect.json";
import { useColorTheme } from "@/hooks/useColorTheme";
import { Text17 } from "@/components/anxy/common/Text";
import { addAlpha } from "@/utils/helpers";
import AppScreen from "@/components/common/AppScreen";
import Lottie from "@/components/common/Lottie";
import { useNavigate } from "react-router";
import {
  AnxyIcon,
  CallEndIcon,
  CallIcon,
} from "@/assets/anxy/grounding/groundingIcons";
import GroundingButton, {
  GroundingButtonProps,
} from "@/components/anxy/grounding/GroundingButton";

export default function Grounding() {
  const colorPalette = useColorTheme({ type: "anxy" });
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState(0);

  const buttonData: {
    [key: string]: GroundingButtonProps;
  } = {
    call: {
      color: colorPalette.green,
      icon: <CallIcon />,
      text: "통화하기",
      action: () => {
        setCurrentIdx(1);
      },
    },
    end: {
      color: addAlpha(colorPalette.black, 0),
      borderColor: addAlpha(colorPalette.black, 0.1),
      icon: <CallEndIcon />,
      text: "마치기",
      action: () => {
        navigate(-1);
      },
    },
  };

  const data = [
    {
      id: 0,
      text: "전화를 걸어주세요",
      buttonType: "call",
    },
    {
      id: 1,
      audio: "Start",
      text: "마치기를 눌러주세요",
      buttonType: "end",
    },
  ];

  const currentData = data.find((element) => element.id === currentIdx);

  return (
    <AppScreen backgroundColor={colorPalette.oat}>
      <div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <div
          css={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnxyIcon />

          <p
            css={{
              fontSize: "30px",
              lineHeight: "36px",
              fontWeight: "bold",
            }}
          >
            Anxy
          </p>
          <Text17>{`${currentData?.text}`}</Text17>

          <div
            css={{
              width: "85px",
              height: "85px",
              margin: "0 auto",
            }}
          >
            {currentIdx > 0 && currentData?.audio && (
              <Lottie lottieData={voice_effect} autoplay loop />
            )}
          </div>
        </div>

        <div css={{ width: "100%", height: "125px" }}>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "11px",
            }}
          >
            {currentData?.buttonType &&
              [currentData.buttonType].map((buttonType) => (
                <GroundingButton
                  key={buttonType}
                  color={buttonData[buttonType].color}
                  borderColor={buttonData[buttonType].borderColor}
                  icon={buttonData[buttonType].icon}
                  text={buttonData[buttonType].text}
                  action={buttonData[buttonType].action}
                />
              ))}
          </div>
        </div>
      </div>
    </AppScreen>
  );
}
