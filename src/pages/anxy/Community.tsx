import CheerUpPost, { CheerPostType } from "@/components/anxy/CheerUpPost";
import { useState } from "react";

export default function Community({ scrollTop }: { scrollTop?: number }) {
  const mockList = Array(20)
    .fill([
      {
        contents: `지난 주에 비해 불안 지수를 ‘20점’ 낮췄어요. `,
        nickname: "oooooo",
        isHighlight: true,
      },
      {
        contents: `‘불안할 때 내가 하는 행동’ 을 재밌게 들었어요.`,
        nickname: "adcfa",
      },
      {
        contents: ` Anxy와의 즐거운 불안 관리 여정을 시작해요.`,
        nickname: "dfgb",
      },
      {
        contents: ` ‘30분 간’ 온몸을 이완하고 평온함을 되찾았어요.`,
        nickname: "csadd",
      },
      {
        contents: `‘프로젝트’로 생긴 불안함을 잘 객관화 했어요.`,
        nickname: "asx",
      },
      {
        contents: `‘3주’ 만에 심함에서 중간으로 불안 지수를 낮췄어요.`,
        nickname: "dsgf",
        isHighlight: true,
      },
    ])
    .flat()
    .map((each, index) => ({
      ...each,
      cheerId: `${index}`,
    }));

  const [availableCheerList, setAvailableCheerList] =
    useState<CheerPostType[]>(mockList);

  // const [scrollTop, setScrollTop] = useState<number>(0);

  return (
    // <AppScreen backgroundColor="#F1EEEB" setScrollTop={setScrollTop}>
    <div style={{ padding: "20px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "15px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {availableCheerList
            .filter((e, i) => i % 2 === 0)
            .map(({ cheerId, contents, nickname, isHighlight }) => (
              <CheerUpPost
                key={`post${cheerId}`}
                cheerId={cheerId}
                contents={contents}
                nickname={nickname}
                isHighlight={isHighlight}
                setAvailableCheerList={setAvailableCheerList}
                scrollTop={scrollTop}
              />
            ))}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {availableCheerList
            .filter((e, i) => i % 2 === 1)
            .map(({ cheerId, contents, nickname, isHighlight }) => (
              <CheerUpPost
                key={`post${cheerId}`}
                cheerId={cheerId}
                contents={contents}
                nickname={nickname}
                isHighlight={isHighlight}
                setAvailableCheerList={setAvailableCheerList}
                scrollTop={scrollTop}
              />
            ))}
        </div>
      </div>
    </div>
    // </AppScreen>
  );
}
