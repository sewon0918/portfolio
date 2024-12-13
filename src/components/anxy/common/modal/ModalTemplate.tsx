import React, { memo } from "react";
import { ActionButton, ButtonStateType } from "../button/ActionButton";
import { PopupModalTemplate } from "./PopupModalTemplate";
import { Text15, Text18 } from "../Text";

interface ModalTemplateProps {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  title: string;
  text?: string;
  content?: React.ReactNode;
  buttonText: string;
  buttonState?: ButtonStateType;
  action: () => void;
  dismissAction?: () => void;
  buttonStyle?: "RED";
}
const ModalTemplate: React.FC<ModalTemplateProps> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  text,
  content,
  buttonText,
  buttonState,
  action,
  dismissAction,
}) => {
  return (
    <PopupModalTemplate
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      content={
        <div>
          <div
            css={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  textAlign: "center",
                }}
              >
                <Text18>{title}</Text18>
                {text && <Text15>{text}</Text15>}
              </div>
              {content}
            </div>

            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "24px",
              }}
            >
              <ActionButton
                state={buttonState || "ACTIVE"}
                text={buttonText}
                action={() => {
                  action();
                }}
              />
            </div>
          </div>
        </div>
      }
      dismissAction={dismissAction}
      bgColor={"#ffffff"}
    />
  );
};

export default memo(ModalTemplate);
