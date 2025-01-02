import React, { useRef } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import "./bottomSheetModal.css";

interface PopupModalTemplateProps {
  content: React.ReactNode;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  bgColor?: string;
  dismissAction?: () => void;
}

export const PopupModalTemplate: React.FC<PopupModalTemplateProps> = ({
  content,
  isModalVisible,
  setIsModalVisible,
  bgColor,
  dismissAction,
}) => {
  const ref = useRef<SheetRef>();

  return (
    <>
      <div
        css={{
          backgroundColor: "black",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 200,
          ...(isModalVisible
            ? { opacity: 0.8, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }),
        }}
        onClick={() => {
          if (dismissAction) {
            dismissAction();
          }
          setIsModalVisible(false);
        }}
      />
      <Sheet
        ref={ref}
        isOpen={isModalVisible}
        onClose={() => {
          console.log("close");
          setIsModalVisible(false);
        }}
        detent="content-height"
        css={{
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Sheet.Container>
          <Sheet.Header disableDrag={false}>
            <div
              css={{
                width: "100%",
                height: "28px",
                paddingTop: "7px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                css={{
                  width: "45px",
                  height: "5px",
                  borderRadius: "10px",
                  backgroundColor: "#D6D8DC",
                }}
              />
            </div>
          </Sheet.Header>
          <Sheet.Content disableDrag>
            <div
              css={{
                height: "100%",
                width: "100%",
                padding: "20px",
                fontSize: "15px",
                lineHeight: "18px",
                position: "relative",
                overflow: "hidden",
                paddingBottom: "20px",
                backgroundColor: bgColor ? bgColor : "",
              }}
            >
              {content}
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};
