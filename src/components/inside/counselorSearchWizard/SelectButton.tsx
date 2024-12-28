import { Text15 } from "@/components/common/Text";

const CheckIcon = ({ isClicked }: { isClicked: boolean }) => {
  return (
    <div>
      <svg
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.51435 3.14647C1.21289 2.8624 0.738226 2.8765 0.454158 3.17796C0.17009 3.47942 0.184189 3.95408 0.485649 4.23815L1.51435 3.14647ZM5.57143 8L5.05708 8.54584C5.34595 8.81805 5.7969 8.81805 6.08578 8.54584L5.57143 8ZM13.5144 1.54584C13.8158 1.26177 13.8299 0.787109 13.5458 0.485649C13.2618 0.184189 12.7871 0.17009 12.4856 0.454158L13.5144 1.54584ZM0.485649 4.23815L5.05708 8.54584L6.08578 7.45416L1.51435 3.14647L0.485649 4.23815ZM6.08578 8.54584L13.5144 1.54584L12.4856 0.454158L5.05708 7.45416L6.08578 8.54584Z"
          fill={isClicked ? `#2C4BEC` : "#FFFFFF"}
        />
      </svg>
    </div>
  );
};
export default function SelectButton({
  text,
  isClicked,
  hasCheck,
}: {
  text: string;
  isClicked: boolean;
  hasCheck?: boolean;
}) {
  const px = text.length <= 3 ? "30px" : "18px";

  return (
    <div
      css={{
        backgroundColor: isClicked ? "#FFFFFF" : "rgba(0,0,0,0.2)",
        color: isClicked ? "#2C4BEC" : "#FFFFFF",
        transitionDuration: "0.2s",
        padding: `14px ${px}`,
        borderRadius: "100px",
        width: "content-fit",
        display: "flex",
        gap: "8px",
      }}
    >
      {hasCheck && <CheckIcon isClicked={isClicked} />}
      <Text15>{text}</Text15>
    </div>
  );
}
