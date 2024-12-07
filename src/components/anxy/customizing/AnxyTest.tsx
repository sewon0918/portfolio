import Anxy, { anxyStateType } from "@/components/anxy/customizing/Anxy";
import React, { useState } from "react";

const AnxyTest = () => {
  const [state, setState] = useState<anxyStateType>("standup");
  return (
    <>
      <div
        css={{
          display: "flex",
          gap: "10px",
          marginLeft: "20px",
          paddingTop: "12px",
        }}
      >
        {["standup", "walking", "jumping", "sitdown"].map((each) => (
          <div
            key={each}
            css={{
              width: "fit-content",
              padding: "5px",
              border: "1px solid black",
              borderRadius: "5px",
              pointerEvents: "auto",
            }}
            onClick={() => {
              console.log(each);
              setState(each as anxyStateType);
            }}
          >
            {each}
          </div>
        ))}
      </div>
      <Anxy
        state={state}
        itemList={[
          "backpack_a",
          "badge_a",
          "hat_a",
          "scarf_a",
          "shoes_a",
          "sunglasses_a",
        ]}
        height={300}
        loop
        autoplay
      />
    </>
  );
};
export default React.memo(AnxyTest);
