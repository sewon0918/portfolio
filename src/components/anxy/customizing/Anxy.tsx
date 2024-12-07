import React from "react";
import { CSSObject } from "@emotion/react";
import Lottie from "@/components/common/Lottie";
import { getImageUrl } from "@/utils/helpers";

export type itemType =
  | "badge_a"
  | "sunglasses_a"
  | "hat_a"
  | "hat_b"
  | "shoes_a"
  | "backpack_a"
  | "scarf_a";

export type anxyStateType = "standup" | "walking" | "jumping" | "sitdown";
interface AnxyProps {
  state?: anxyStateType;
  itemList?: itemType[];
  autoplay?: boolean;
  height?: number;
  loop?: boolean;
  reload?: boolean;
  playing?: boolean;
  css?: CSSObject;
}

const Anxy: React.FC<AnxyProps> = ({
  state,
  itemList,
  autoplay,
  loop,
  reload,
  playing,
  css,
}) => {
  function EachLottie({ path, zIndex }: { path: string; zIndex?: number }) {
    return (
      <div
        css={{
          position: "absolute",
          height: "100%",
          bottom: 0,
          left: 0,
          zIndex: zIndex,
          ...css,
        }}
      >
        <Lottie
          path={path}
          loop={loop}
          autoplay={autoplay}
          width={"100%"}
          height={"100%"}
          reload={reload}
          playing={playing}
        />
      </div>
    );
  }

  const zIndexMapping = {
    backpack_back: 1,
    hat_b: 2,
    body: 3,
    shoes: 4,
    backpack_front: 5,
    badge: 6,
    scarf: 7,
    hat_a: 8,
    arms: 9,
    sunglasses: 10,
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        position: "relative",
        height: 153,
      }}
    >
      {itemList?.map((each) => (
        <div key={each}>
          {each.includes("backpack") ? (
            <>
              <EachLottie
                path={getImageUrl(
                  `../../../assets/anxy/customizing/${state}/item/${each}_back.json`,
                  import.meta.url
                )}
                zIndex={zIndexMapping["backpack_back"]}
              />
              <EachLottie
                path={getImageUrl(
                  `../../../assets/anxy/customizing/${state}/item/${each}_front.json`,
                  import.meta.url
                )}
                zIndex={zIndexMapping["backpack_front"]}
              />
            </>
          ) : (
            <EachLottie
              path={getImageUrl(
                `../../../assets/anxy/customizing/${state}/item/${each}.json`,
                import.meta.url
              )}
              zIndex={
                zIndexMapping[each as "hat_a" | "hat_b"] ||
                zIndexMapping[
                  each.split("_")[0] as
                    | "shoes"
                    | "badge"
                    | "scarf"
                    | "sunglasses"
                ]
              }
            />
          )}
        </div>
      ))}

      <EachLottie
        path={getImageUrl(
          `../../../assets/anxy/customizing/${state}/body.json`,
          import.meta.url
        )}
        zIndex={zIndexMapping["body"]}
      />
      <EachLottie
        path={getImageUrl(
          `../../../assets/anxy/customizing/${state}/arms${
            !itemList?.some((element) => element.includes("backpack"))
              ? "_straight"
              : ""
          }.json`,
          import.meta.url
        )}
        zIndex={zIndexMapping["arms"]}
      />
    </div>
  );
};

export default React.memo(Anxy);
