import { useNavigate } from "react-router";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

function IconButton({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      css={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#f8f8f8",
        },
        fontSize: "24px",
        color: "inherit",
      }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
}
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
      {/* <div
        css={{
          fontWeight: 600,
          verticalAlign: "center",
          paddingTop: "1px",
        }}
        onClick={goHome}
      >
        PORTFOLIO
      </div> */}

      <IconButton
        icon={<HomeRoundedIcon css={{ color: "inherit" }} />}
        onClick={goHome}
      />
      <IconButton
        // icon={<GitHubIcon css={{ color: "inherit" }} />}
        icon={
          <CodeRoundedIcon
            css={{
              color: "inherit",
            }}
          />
        }
        onClick={() => {
          window.open("https://github.com/sewon0918/portfolio");
        }}
      />
    </div>
  );
}
