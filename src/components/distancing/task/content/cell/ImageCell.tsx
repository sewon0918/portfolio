import { memo } from "react";
import { getTaskIdFromTaskKey } from "../../../logic/logics";
import { getImageUrl } from "@/utils/helpers";

function ImageCell({ taskKey, url }: { taskKey: string; url: string }) {
  const locale = "ko";
  return (
    <img
      style={{ borderRadius: "6px", width: "100%" }}
      alt={"empty"}
      src={getImageUrl(
        `../../../../../assets/distancing/activity/${getTaskIdFromTaskKey(
          `${taskKey}`
        )}/${url}_${locale}.png`,
        import.meta.url
      )}
    />
  );
}

export default memo(ImageCell);
