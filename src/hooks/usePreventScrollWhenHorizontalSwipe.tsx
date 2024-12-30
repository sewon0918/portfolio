import { RefObject, useEffect, useRef } from "react";

export default function usePreventScrollWhenHorizontalSwipe({
  carouselRef,
}: {
  carouselRef: RefObject<HTMLDivElement>;
}) {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const isHorizontalScroll = useRef<boolean>(false);

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalScroll.current = false; // 초기화
  };

  const handleTouchMove = (e: TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const deltaX = Math.abs(currentX - startX.current);
    const deltaY = Math.abs(currentY - startY.current);

    if (deltaX > deltaY && deltaX > 10) {
      isHorizontalScroll.current = true;
    }

    if (isHorizontalScroll.current) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    carouselRef.current?.addEventListener("touchstart", handleTouchStart);
    carouselRef.current?.addEventListener("touchmove", handleTouchMove);

    return () => {
      carouselRef.current?.removeEventListener("touchstart", handleTouchStart);
      carouselRef.current?.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
}
