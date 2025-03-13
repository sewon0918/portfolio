import styled from "@emotion/styled";
import { isMobile } from "react-device-detect";
import PageContainer from "@/components/common/PageContainer";
import { motion } from "framer-motion";
import { isMobileVersion } from "@/utils/isMobileVersion";
import CodeBlock from "@/components/common/CodeBlock";

export default function RefactoringTemplate({
  beforeCodeBlocks,
  afterCodeBlocks,
}: {
  beforeCodeBlocks: string[];
  afterCodeBlocks: string[];
}) {
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
    alignItems: "start",
    flexDirection: isMobileVersion ? "column" : "row",
  });

  const Label = styled.div({
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "24px",
    wordBreak: "keep-all",
    textDecoration: "underline",
    marginBottom: "10px",
  });

  return (
    <PageContainer>
      <ProjectLayout>
        <ProjectContainer>
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
              gap: "40px",
              maxWidth: "100%",
              padding: "0 20px 0 20px",
            }}
          >
            <div css={{ flex: 1 }}>
              <Label>{"리팩토링 전"}</Label>
              {beforeCodeBlocks.map((codeblock) => (
                <CodeBlock code={codeblock} />
              ))}
            </div>
            <div css={{ flex: 1 }}>
              <Label>{"리팩토링 후"}</Label>
              {afterCodeBlocks.map((codeblock) => (
                <CodeBlock code={codeblock} />
              ))}
            </div>
          </motion.div>
        </ProjectContainer>
      </ProjectLayout>
      {/* </div> */}
    </PageContainer>
  );
}
