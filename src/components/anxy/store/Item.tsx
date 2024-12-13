import { addAlpha, getImageUrl } from "@/utils/helpers";
import { PressedEffect } from "@/components/common/PressedEffect";
import { useColorTheme } from "@/hooks/useColorTheme";
import { ActionButton } from "@/components/anxy/common/button/ActionButton";
import { Text15 } from "@/components/anxy/common/Text";
import Seed from "@/components/anxy/store/Seed";
import { StoreItemType } from "@/pages/anxy/Store";

export default function Item({
  isPurchased,
  isSelected,
  item,
  tryPurchaseAction,
  tryOnAction,
}: {
  isPurchased: boolean;
  isSelected: boolean;
  item: StoreItemType;
  tryPurchaseAction: () => void;
  tryOnAction: () => void;
}) {
  const colorPalette = useColorTheme({ type: "anxy" });

  return (
    <PressedEffect
      disable={isPurchased}
      element={
        <div
          css={{
            width: "100%",
            padding: "16px",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            boxShadow: `inset 0 0 0 ${isSelected ? 2 : 1}px ${
              isSelected
                ? colorPalette.orange
                : addAlpha(colorPalette.black, 0.15)
            }`,
          }}
        >
          <div
            css={{
              maxWidth: "50px",
              borderRadius: "50%",
              backgroundColor: colorPalette.oat,
              overflow: "hidden",
              padding: "4px",
            }}
          >
            <img
              src={getImageUrl(
                `../../../assets/anxy/customizing/store/${item.itemId}.png`,
                import.meta.url
              )}
              css={{ width: "100%" }}
            />
          </div>
          <ActionButton
            state={isPurchased ? "DONE" : "ACTIVE"}
            text={
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Seed containerSize={19} />
                <Text15
                  customCss={{ color: "#ffffff", fontWeight: 700 }}
                >{`${item.seedCountRequired}`}</Text15>
              </div>
            }
            action={tryPurchaseAction}
            size="small"
          />
        </div>
      }
      action={tryOnAction}
    />
  );
}
