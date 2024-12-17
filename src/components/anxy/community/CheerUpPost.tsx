/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import highfive_twinkle from "@/assets/anxy/community/highfive_twinkle.json";
import highfive_particle from "@/assets/anxy/community/highfive_particle.json";
import { PressedEffect } from "../../common/PressedEffect";
import Lottie from "../../common/Lottie";
import { getImageUrl } from "@/utils/helpers";

export interface CheerPostType {
  cheerId: string;
  contents: string;
  nickname: string;
  isHighlight?: boolean;
}

function PostContents({
  contents,
  nickname,
  isHighlight,
}: {
  contents: string;
  nickname: string;
  isHighlight?: boolean;
}) {
  function maskNickname(nickname: string): string {
    return nickname.charAt(0) + "*".repeat(nickname.length - 1);
  }
  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "17px",
          lineHeight: "24px",
          marginBottom: "24px",

          ...(isHighlight && { color: "#ffffff" }),
        }}
      >
        {contents}
      </div>

      <div
        style={{
          fontSize: "15px",
          lineHeight: "21px",
          opacity: 0.6,
          ...(isHighlight && { color: "#ffffff" }),
        }}
      >
        {maskNickname(nickname)}
      </div>
    </div>
  );
}

export default function CheerUpPost({
  cheerId,
  contents,
  nickname,
  isHighlight,
  setAvailableCheerList,
  scrollTop,
}: {
  cheerId: string;
  contents: string;
  nickname: string;
  isHighlight?: boolean;
  setAvailableCheerList: React.Dispatch<React.SetStateAction<CheerPostType[]>>;
  scrollTop?: number;
}) {
  const postRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [highfived, setHighfived] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  function getRandomGraphicIndex() {
    const graphicIdx =
      Math.random() < 0.33 ? Math.floor(Math.random() * 3) : undefined;
    return graphicIdx;
  }

  const [graphicIdx] = useState<number | undefined>(getRandomGraphicIndex());

  const orange = "#D66418";
  useEffect(() => {
    if (isEnded) {
      console.log("isEnded", cheerId);
      setAvailableCheerList((availableCheerList) =>
        availableCheerList.filter((element) => element.cheerId !== cheerId)
      );
    }
  }, [isEnded]);

  const [position, setPosition] = useState<{
    left: number;
    top: number;
    height: number;
  } | null>(null);

  function setCurrentPosition() {
    if (postRef.current) {
      const rect = postRef.current.getBoundingClientRect();
      setPosition({ left: rect.left, top: rect.top, height: rect.height });
    }
  }

  // useEffect(() => {
  //   setCurrentPosition();
  //   window.addEventListener("scroll", setCurrentPosition);

  //   return () => {
  //     window.removeEventListener("scroll", setCurrentPosition);
  //   };
  // }, []);

  useEffect(() => {
    setCurrentPosition();
  }, [scrollTop]);

  return (
    <motion.div
      animate={{
        height: clicked ? 0 : "auto",
      }}
      style={{
        marginBottom: clicked ? 0 : 20,
        display: "flex",
        flexDirection: "column",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {/* 클릭 해제 위한 배경 */}
      {clicked && (
        <motion.div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            backgroundColor: "white",
            opacity: 0,
            zIndex: 100,
          }}
          onClick={() => {
            setClicked(false);
          }}
        />
      )}

      {/* 하이파이브 카드 모션 */}
      <motion.div
        onAnimationComplete={(definition: any) => {
          if (definition.scale === 3) {
            setIsEnded(true);
            setCurrentPosition();
          }
        }}
        animate={{
          position: "fixed",
          scale: highfived ? 3 : 1,
          width: clicked
            ? `${window.innerWidth - 40}px`
            : `${(window.innerWidth - 60) / 2}px`,
          ...(position && {
            top: clicked ? "50%" : `${position.top}px`,
            left: clicked ? "20px" : `${position.left}px`,
            translateY: clicked ? `${-(position.height + 270) / 2}px` : "0px",
          }),
          opacity: clicked && !highfived ? 1 : 0,
          visibility: clicked ? "visible" : "hidden",
        }}
        transition={{
          type: "spring",
          stiffness: 860,
          damping: 79,
          mass: 5.1,
          top: { ease: "easeInOut" },
          scale: { delay: 0.2, duration: 0.2 },
          opacity: { delay: highfived ? 0.2 : 0, duration: 0.2 },
        }}
        style={{
          zIndex: 100,
          filter: "drop-shadow(0 5px 30px rgba(0, 0, 0, 0.35))",
          position: "fixed",
          pointerEvents: clicked ? "auto" : "none",
          opacity: clicked ? 1 : 0,
          width: `${(window.innerWidth - 60) / 2}px`,
          height: "100px",
        }}
        onClick={() => {
          console.log("HIGHFIVE!");
          setHighfived(true);
        }}
      >
        {/* 하이파이브 카드 */}
        <div
          style={{
            // width: "100%",
            borderRadius: "24px",
            backgroundColor: isHighlight ? orange : "white",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "20px",
            paddingRight: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* twinkle 로띠 */}
          <motion.div
            animate={{ opacity: clicked ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              width: "100vw",
              left: "-20px",
              top: "170px",
              transform: "translateY(-50%)",
            }}
          >
            <Lottie lottieData={highfive_twinkle} autoplay loop />
          </motion.div>
          {/* highfive 로띠 */}
          <div
            style={{
              position: "absolute",
              width: "312px",
              height: "312px",
              top: "50px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {highfived && (
              <Lottie lottieData={highfive_particle} autoplay delay={0} />
            )}
          </div>

          {/* 하이파이브 후 소멸 */}
          <motion.div
            animate={{
              scale: highfived ? [1, 1.2, 1.2, 0] : clicked ? [1, 0.85, 1] : 1,
              opacity: highfived ? 0 : 1,
            }}
            transition={{
              duration: clicked && !highfived ? 0.5 : 0.5,
              ease: "easeInOut",
              times: highfived
                ? [0, 0.1, 0.4, 0.7]
                : clicked
                ? [0, 0.3, 1]
                : "",
              ...(clicked && !highfived && { repeat: Infinity }),
              repeatDelay: 0.1,
            }}
            style={{
              transform: "scale(1)",
              position: "relative",
            }}
          >
            {/* 등장 시 확대 */}
            <motion.div
              animate={{
                width: clicked ? 245 : 0,
                height: clicked ? 245 : 0,
                marginBottom: clicked ? 24 : 0,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              style={{
                width: "0",
                height: "0",
                margin: "0 auto",
                transform: "scale(1)",
              }}
            >
              <img
                src={getImageUrl(
                  "../../../assets/anxy/community/highfive.png",
                  import.meta.url
                )}
                alt={"highfive"}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </motion.div>

          <PostContents
            contents={contents}
            nickname={nickname}
            isHighlight={isHighlight}
          />
        </div>
      </motion.div>

      {/* 카드 */}
      <motion.div
        animate={{ opacity: clicked ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        ref={postRef}
      >
        <PressedEffect
          element={
            <div
              style={{
                borderRadius: "20px",
                backgroundColor: isHighlight ? orange : "white",
                paddingTop: "40px",
                paddingBottom: "40px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <PostContents
                contents={contents}
                nickname={nickname}
                isHighlight={isHighlight}
              />
              {/* <div style={{ position: "absolute" }}>{position?.top}</div> */}
            </div>
          }
          action={() => {
            setClicked((clicked) => !clicked);
          }}
        />
      </motion.div>

      {graphicIdx !== undefined && (
        <motion.img
          src={getImageUrl(
            `../../../assets/anxy/community/graphic${graphicIdx + 1}.png`,
            import.meta.url
          )}
          animate={{ opacity: clicked ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "50px",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
    </motion.div>
  );
}
