import styled from "@emotion/styled";
import Title from "@/components/Title";
import ScreenShotCarousel from "./ScreenShotCarousel";

export default function Project({
  name,
  devDuration,
  techStack,
  screenshots,
  description,
}: {
  name: string;
  devDuration: string;
  techStack: string;
  screenshots: string[];
  description: string[];
}) {
  const Description = styled.div({
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "24px",
    wordBreak: "keep-all",
  });

  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <div
        css={{
          flex: 1,
          minWidth: "300px",
          padding: "20px 20px",
        }}
      >
        <ScreenShotCarousel
          srcList={screenshots?.map((each) => `../../${each}`) || []}
        />
      </div>
      <div css={{ flex: 1, minWidth: "300px", padding: "20px 40px" }}>
        <Title title={name} />
        <Description>{devDuration}</Description>
        <Description>{techStack}</Description>
        <Description>
          {description.map((each, index) => (
            <div key={index}>{`∙ ${each}`}</div>
          ))}
        </Description>
      </div>
    </div>
  );
}
