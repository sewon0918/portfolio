import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import { motion } from "framer-motion";
import ScreenShotCarousel from "@/components/other-projects/ScreenShotCarousel";
import { isMobileVersion } from "@/utils/isMobileVersion";

export default function ProjectDetailTemplate({
  srcList,
  description,
}: {
  srcList: string[];
  description: { [key: string]: string[] };
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [imageHeight, setImageHeight] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      if (!isMobileVersion) {
        setImageHeight(containerRef.current?.offsetHeight);
      } else {
        setImageHeight(400);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ProjectLayout = styled.div({
    flex: 1,
    padding: isMobile ? 0 : "20px 0 20px 0",
    overflow: "hidden",
    display: "flex",
  });

  const ProjectContainer = styled.div({
    flex: 1,
    display: "flex",
    overflow: "scroll",
    flexDirection: isMobileVersion ? "column" : "row",
    // "@media (max-width: 768px)": {
    //   flexDirection: "column",
    // },
  });

  const DescriptionContainer = styled.div({
    flex: 1,
    height: isMobile ? "100%" : `${Math.min(imageHeight || 764, 764)}px`,
    maxWidth: "800px",
    overflow: "hidden",
    position: "relative",
  });
  const TopScrollIndicator = styled.div({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "40px",
    background: `linear-gradient(to bottom, #ffffff, ${addAlpha(
      "#ffffff",
      0
    )})`,
  });
  const BottomScrollIndicator = styled.div({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "80px",
    background: `linear-gradient(to top, #ffffff, ${addAlpha("#ffffff", 0)})`,
  });

  const DescriptionScrollArea = styled.div({
    width: "100%",
    height: "100%",
    padding: "20px 40px 80px 40px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  });

  const Description = styled.div({
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "24px",
    wordBreak: "keep-all",
  });

  const ScrollIndicator = () => {
    return (
      <>
        <TopScrollIndicator />
        <BottomScrollIndicator />
      </>
    );
  };

  return (
    <PageContainer>
      <ProjectLayout>
        <ProjectContainer ref={containerRef}>
          {(imageHeight || 0) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              css={{
                flex: 1,
                display: "flex",
                flexDirection: isMobileVersion ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <div
                css={{
                  position: "relative",
                  margin: "20px 40px",
                  ...(!isMobileVersion
                    ? {
                        minWidth: "375px",
                        width: "375px",
                        height: "764px",
                        opacity: imageHeight ? 1 : 0,
                        scale: Math.min((imageHeight || 0) / 764, 1),
                        transformOrigin: "center right",
                        display: "flex",
                        alignItems: "center",
                      }
                    : {
                        width: "100%",
                        padding: "0 20px",
                      }),
                }}
              >
                <ScreenShotCarousel
                  srcList={srcList?.map((each) => `../../${each}`) || []}
                  responsive={{ desktop: 1, mobile: 3 }}
                />
              </div>

              <DescriptionContainer>
                <ScrollIndicator />
                <DescriptionScrollArea>
                  {Object.entries(description).map(([key, value]) => (
                    <Description key={key}>
                      <div
                        css={{
                          textDecoration: "underline",
                          marginBottom: "10px",
                        }}
                      >
                        {key}
                      </div>
                      {value.map((each, index) => (
                        <div key={index}>{`∙ ${each}`}</div>
                      ))}
                    </Description>
                  ))}
                </DescriptionScrollArea>
              </DescriptionContainer>
            </motion.div>
          )}
        </ProjectContainer>
      </ProjectLayout>
      {/* </div> */}
    </PageContainer>
  );
}
