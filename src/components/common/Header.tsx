import { useNavigate } from "react-router";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

export default function Header() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div
      css={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto",
        color: "#8E8E93",
      }}
    >
      <div
        css={{
          fontWeight: 600,
          verticalAlign: "center",
          paddingTop: "1px",
        }}
        onClick={goHome}
      >
        PORTFOLIO
      </div>

      <CodeRoundedIcon
        css={{
          fontSize: "24px",
          color: "inherit",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          window.open("https://github.com/sewon0918/portfolio");
        }}
      />
    </div>
  );
}
