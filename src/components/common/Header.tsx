import { useNavigate } from "react-router";

export const isInIframe = window.self !== window.top; // iframe 안에 있는지 확인

export default function Header() {
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
        // ...(isInIframe && { paddingTop: "var(--notch-height)" }),
        // paddingTop: notchHeight,
        backgroundColor: "transparent",
        width: "100%",
      }}
    >
      <div
        style={{ height: "var(--header-height)" }}
        onClick={() => {
          goBack();
        }}
      >
        <div>
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
