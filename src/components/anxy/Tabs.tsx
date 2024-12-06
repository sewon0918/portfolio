import homeTypeAtom from "@/recoil/anxy/home/atom";
import { addAlpha } from "@/utils/helpers";
import { useTheme } from "@emotion/react";
import { useRecoilState } from "recoil";
import { AnxyIcon, WorryIcon } from "./TabIcons";
import styled from "@emotion/styled";

export default function Tabs() {
  const theme = useTheme();
  const orange = theme.anxy.colors.orange;
  const oat = theme.anxy.colors.oat;

  const [homeType, setHomeType] = useRecoilState(homeTypeAtom);

  const GradientBackground = styled.div({
    position: "fixed",
    bottom: 0,
    paddingBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 10,
    background: `linear-gradient(to top, ${oat}, ${addAlpha(oat, 0)})`,
  });

  const ButtonContainer = styled.div({
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    margin: "auto",
    borderRadius: "20px",
    padding: "8px",
    boxShadow: "0px 12px 32px -4px rgba(0, 0, 0, 0.1)",
  });

  const IconButton = styled.div<{ bgColor: string }>`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ bgColor }) => bgColor};
  `;

  return (
    <GradientBackground>
      <ButtonContainer>
        <IconButton
          bgColor={addAlpha(orange, homeType === "wori" ? 0.1 : 0)}
          onClick={() => setHomeType("wori")}
        >
          <WorryIcon selected={homeType === "wori"} />
        </IconButton>
        <IconButton
          bgColor={addAlpha(orange, homeType === "anxy" ? 0.1 : 0)}
          onClick={() => setHomeType("anxy")}
        >
          <AnxyIcon selected={homeType === "anxy"} />
        </IconButton>
      </ButtonContainer>
    </GradientBackground>
  );
}
