import { useNavigate } from "react-router";
import { Text17 } from "../common/Text";
import SeedImage from "./SeedImage";
import customizingAtom from "@/recoil/anxy/customizing/atom";
import { useRecoilValue } from "recoil";
import { Store } from "../journey/Asset";

export default function Seed() {
  const navigate = useNavigate();

  const { seedCount } = useRecoilValue(customizingAtom);

  return (
    <div
      css={{
        width: "100%",
        height: "44px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {seedCount !== undefined && (
        <div
          css={{
            width: "fit-content",
            backgroundColor: "white",
            borderRadius: "40px",
            padding: "3px 12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onClick={() => {
            navigate("/anxy/store");
          }}
        >
          <Store />
          <div
            css={{
              width: "1px",
              height: "13px",
              borderRadius: "1px",
              backgroundColor: "black",
              opacity: "0.1",
            }}
          />
          <div css={{ display: "flex", gap: "2px" }}>
            <SeedImage />
            <Text17 customCss={{ fontWeight: 700 }}>{`${seedCount}`}</Text17>
          </div>
        </div>
      )}
    </div>
  );
}
