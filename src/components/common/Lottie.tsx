import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieProps {
  lottieData?: object; // Lottie 애니메이션 데이터
  path?: string;
  loop?: boolean; // 루프 여부
  autoplay?: boolean; // 자동 재생 여부
  width?: string | number; // 컨테이너 너비
  height?: string | number; // 컨테이너 높이
  playing?: boolean; // 재생 중인지 여부
  currentTime?: number; // 특정 시점에서 재생/정지
  renderer?: "svg" | "canvas" | "html"; // 렌더링 방식
  delay?: number; // 지연 시간 (초 단위)
  reload?: boolean; // 재로드 트리거
}

function Lottie({
  lottieData,
  path,
  loop = false,
  autoplay = false,
  width,
  height,
  playing,
  renderer = "svg",
  reload,
}: LottieProps) {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    animationInstance.current = lottie.loadAnimation({
      container: lottieContainer.current as Element,
      renderer,
      loop,
      autoplay,
      ...(lottieData ? { animationData: lottieData } : { path: path }),
    });

    return () => {
      animationInstance.current?.destroy();
    };
  }, [lottieData, path, reload]);

  useEffect(() => {
    if (animationInstance.current && playing !== undefined) {
      if (playing) {
        animationInstance.current.play();
      } else {
        animationInstance.current.stop();
        // animationInstance.current.goToAndStop(0, false);
      }
    }
  }, [playing]);

  return <div css={{ width, height }} ref={lottieContainer} />;
}

export default React.memo(Lottie);
