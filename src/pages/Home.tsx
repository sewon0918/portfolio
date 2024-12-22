import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import Button from "@/components/common/Button";
import { isInIframe } from "@/utils/isInIframe";

export default function Home() {
  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const navigate = useNavigate();

  const goAnxy = () => {
    navigate("/project/anxy");
  };
  const goDistancing = () => {
    navigate("/project/distancing");
  };

  useEffect(() => {
    if (path) {
      navigate(path, { replace: true });
    }
  }, [path]);

  return isInIframe ? (
    <></>
  ) : (
    <div
      css={css({
        backgroundColor: "white",
        padding: "20px 60px",
        minHeight: "100%",
        overflow: "hidden",
      })}
    >
      <Button buttonText="Anxy" onClick={goAnxy} />
      <Button buttonText="Distancing" onClick={goDistancing} />
    </div>
  );
}
