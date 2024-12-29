import { useNavigate } from "react-router";
import { isInIframe } from "@/utils/isInIframe";

export default function AppHeader() {
  const notchHeight = isInIframe ? "var(--notch-height)" : "0px";
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        top: notchHeight,
        backgroundColor: "transparent",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <div style={{ height: "var(--header-height)" }}>
        <div
          style={{ width: "fit-content", pointerEvents: "auto" }}
          onClick={() => {
            goBack();
          }}
        >
          <svg
            width="52"
            height="44"
            viewBox="0 0 52 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 14L17 22L25 30"
              stroke={"#26282C"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
