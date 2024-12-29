import { isMobile } from "react-device-detect";
export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      css={{
        width: "100%",
        height: "calc(var(--vh,1vh) * 100)",
        overflow: "hidden",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: isMobile ? "20px 0 0 0" : "40px 0 60px 0",
      }}
    >
      <div css={{ fontWeight: 600, textAlign: "center" }}>PORTFOLIO</div>
      {children}
    </div>
  );
}
