import { useEffect, useRef } from "react";
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

export default function Lottie({
  lottieData,
  path,
  loop = false,
  autoplay = false,
  width,
  height,
  playing,
  currentTime = 0,
  renderer = "svg",
  delay,
  reload,
}: LottieProps) {
  const lottieContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: AnimationItem | undefined;

    const loadAnimation = () => {
      instance = lottie.loadAnimation({
        container: lottieContainer.current as Element,
        renderer,
        loop,
        autoplay,
        ...(lottieData ? { animationData: lottieData } : { path: path }),
      });

      if (playing !== undefined) {
        if (playing) {
          instance.goToAndPlay(currentTime * 1000, false);
        } else {
          instance.goToAndStop(currentTime * 1000, false);
        }
      }
    };

    if (delay) {
      const timeoutId = setTimeout(loadAnimation, delay * 1000);
      return () => {
        clearTimeout(timeoutId);
        if (instance) {
          instance.destroy();
        }
      };
    } else {
      loadAnimation();
    }

    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, [lottieData, playing, currentTime, delay, reload]);

  return <div css={{ width, height }} ref={lottieContainer} />;
}
