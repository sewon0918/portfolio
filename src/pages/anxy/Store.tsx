import { useEffect, useState } from "react";
import { useRef } from "react";
import { addAlpha } from "@/utils/helpers";
import { useColorTheme } from "@/hooks/useColorTheme";
import Anxy from "@/components/anxy/customizing/Anxy";
import { useLocalStorage } from "@uidotdev/usehooks";
import AppScreen from "@/components/common/AppScreen";
import { Text15, Text17 } from "@/components/anxy/common/Text";
import Seed from "@/components/anxy/store/Seed";
import Item from "@/components/anxy/store/Item";
import customizingAtom, {
  addItemSelector,
  ItemType,
  subtractSeedSelector,
} from "@/recoil/anxy/customizing/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import SeedLackModal from "@/components/anxy/store/SeedLackModal";
import PurchaseConfirmModal from "@/components/anxy/store/PurchaseConfirmModal";
import { Interpolation } from "@emotion/react";
import { Theme } from "@emotion/react";

export interface StoreItemType {
  itemId: ItemType;
  seedCountRequired: number;
}

export type ItemCategoryType =
  | "sunglasses"
  | "backpack"
  | "badge"
  | "hat"
  | "scarf"
  | "shoes";

const mappingData = {
  sunglasses: { name: "선글라스", text: "동글동글 귀여운 선글라스" },
  badge: { name: "뱃지", text: "반짝반짝 탐험가 뱃지" },
  hat: { name: "모자", text: "뜨거운 땡볕에서도 거뜬한 모자" },
  scarf: { name: "스카프", text: "칼바람에도 체온 보전 스카프" },
  shoes: { name: "신발", text: "푹신한 쿠션의 운동화" },
  backpack: { name: "배낭", text: "모두 들어가는 만물상 배낭" },
};

const storeItemList: StoreItemType[] = [
  {
    itemId: "backpack_a",
    seedCountRequired: 5,
  },
  {
    itemId: "badge_a",
    seedCountRequired: 5,
  },
  {
    itemId: "hat_a",
    seedCountRequired: 5,
  },
  {
    itemId: "scarf_a",
    seedCountRequired: 5,
  },
  {
    itemId: "shoes_a",
    seedCountRequired: 5,
  },
  {
    itemId: "sunglasses_a",
    seedCountRequired: 5,
  },
];

export default function Store() {
  const colorPalette = useColorTheme({ type: "anxy" });
  const anxyContainerRef = useRef<HTMLDivElement>(null);

  const [anxyHeight, setAnxyHeight] = useLocalStorage("store-anxy-height", 0);

  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [isLackModalVisible, setIsLackModalVisible] = useState(false);

  const [tryOnItemList, setTryOnItemList] = useState<ItemType[]>([]);
  const [purchaseTriedItem, setPurchaseTriedItem] = useState<StoreItemType>();

  const { itemList, seedCount } = useRecoilValue(customizingAtom);
  const addItem = useSetRecoilState(addItemSelector);
  const subtractSeed = useSetRecoilState(subtractSeedSelector);

  useEffect(() => {
    if (anxyContainerRef.current) {
      setAnxyHeight(anxyContainerRef.current.offsetHeight);
    }
  }, [anxyContainerRef.current]);

  const tryOn = (item: StoreItemType) => {
    if (tryOnItemList.includes(item.itemId)) {
      setTryOnItemList((tryOnItemList) =>
        tryOnItemList.filter((each) => each !== item.itemId)
      );
    } else {
      setTryOnItemList((tryOnItemList) => tryOnItemList.concat([item.itemId]));
    }
  };

  const tryPurchase = (item: StoreItemType) => {
    setPurchaseTriedItem(item);
    setIsPurchaseModalVisible(true);
  };

  const validateAndPurchase = () => {
    setIsPurchaseModalVisible(false);
    if (purchaseTriedItem) {
      if (purchaseTriedItem.seedCountRequired > seedCount) {
        setIsLackModalVisible(true);
      } else {
        purchase(purchaseTriedItem);
      }
    }
  };

  const purchase = (item: StoreItemType) => {
    addItem([item.itemId]);
    setTryOnItemList((itemList) =>
      itemList.filter((element) => element !== item.itemId)
    );
    subtractSeed(item.seedCountRequired);
  };

  const initialize = () => {
    setPurchaseTriedItem(undefined);
  };

  const styles: { [key: string]: Interpolation<Theme> } = {
    container: {
      height: "100%",
      paddingTop: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    },
    anxyContainer: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    bottomSheetContainer: {
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      height: "300px",
      width: "100%",
      backgroundColor: "white",
      padding: "24px",
      paddingBottom: "60px",
      overflow: "auto",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "16px",
      borderBottom: `1px solid ${addAlpha(colorPalette.black, 0.05)}`,
    },
    itemContainer: {
      marginTop: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
    },
  };

  return (
    <AppScreen backgroundColor="#F1EEEB">
      <div css={styles.container}>
        {purchaseTriedItem && (
          <>
            <PurchaseConfirmModal
              isModalVisible={isPurchaseModalVisible}
              setModalVisible={setIsPurchaseModalVisible}
              buttonState={
                purchaseTriedItem &&
                itemList.includes(purchaseTriedItem?.itemId)
                  ? "DONE"
                  : "ACTIVE"
              }
              title={`${
                mappingData[
                  purchaseTriedItem?.itemId.split("_")[0] as ItemCategoryType
                ]?.name
              }를 구매할까요?`}
              subtitle={
                mappingData[
                  purchaseTriedItem?.itemId.split("_")[0] as ItemCategoryType
                ]?.text
              }
              itemId={purchaseTriedItem?.itemId}
              action={validateAndPurchase}
              dismissAction={initialize}
            />
            <SeedLackModal
              isModalVisible={isLackModalVisible}
              setModalVisible={setIsLackModalVisible}
              lackSeedCount={purchaseTriedItem.seedCountRequired - seedCount}
              action={() => {
                initialize();
              }}
              dismissAction={initialize}
            />
          </>
        )}

        <div css={styles.anxyContainer} ref={anxyContainerRef}>
          <Anxy
            state={"walking"}
            itemList={itemList.concat(tryOnItemList)}
            height={anxyHeight}
          />
        </div>
        <div css={styles.bottomSheetContainer}>
          <div css={styles.titleContainer}>
            <Text15 customCss={{ fontWeight: 600 }}>나의 씨앗</Text15>
            <div css={{ display: "flex", alignItems: "center" }}>
              <Seed containerSize={25} />
              <Text17 customCss={{ fontWeight: 700 }}>{`${seedCount}`}</Text17>
            </div>
          </div>
          <div css={styles.itemContainer}>
            {storeItemList.map((item: StoreItemType) => (
              <Item
                isPurchased={itemList.includes(item.itemId)}
                isSelected={tryOnItemList.includes(item.itemId)}
                item={item}
                tryPurchaseAction={() => {
                  tryPurchase(item);
                }}
                tryOnAction={() => {
                  tryOn(item);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AppScreen>
  );
}
