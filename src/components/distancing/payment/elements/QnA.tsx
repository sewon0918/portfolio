import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/joy";
import { ReactElement } from "react";

function AccordianTemplate({
  summary,
  details,
  noBorder,
}: {
  summary: string;
  details: (string | ReactElement) | (string | ReactElement)[];
  noBorder?: boolean;
}) {
  return (
    <Accordion
      sx={{
        px: "0px",
        py: "10px",
        pt: "0px",
        ...(noBorder && { borderBottomWidth: "0px" }),
      }}
    >
      <AccordionSummary sx={{ p: 0, m: 0 }}>
        <Typography level="body-md" sx={{ fontWeight: 700 }}>
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default function QnA() {
  return (
    <AccordionGroup sx={{ display: "flex" }}>
      <Stack gap="10px">
        <AccordianTemplate
          summary={"3개월 이후에도 계속 이용할 수 있나요?"}
          details={
            "네. 프로그램을 마치기까지 보통 3개월 정도 걸리지만, 개인에 따라 달라질 수 있어요. 3개월 안에 진행하지 못한 부분이 있더라도 이어서 진행하실 수 있습니다.\n첫 3개월 이후, 구독은 매월 8만원으로 자동 갱신됩니다."
          }
        />
        <AccordianTemplate
          summary={"코치 선생님이 도와준다고요?"}
          details={
            "코치는 매일 해야할 활동을 안내하고 프로그램을 리드해 나갈 거예요. 코치는 전문 수련 과정을 마친 심리치료 전문가로 구성되어 있어요. 코치와는 익명으로 프로그램 진행이 가능해요."
          }
        />
        <AccordianTemplate
          summary={"누가 도움 받을 수 있나요?"}
          details={[
            "우울함, 수치심, 무기력, 폭식을 비롯한 식이장애, 불안감, 강박적인 걱정, 공황장애, 사회공포증, 발표불안, 자기 파괴적 완벽주의, 업무에 대한 부담감, 수면 문제 그리고 이외 복합적인 정서 문제에 도움이 될 수 있어요.",
            <br />,
            "환청, 환각, 자살사고 등 시급한 의료적 접근이 필요한 분들의 경우 당장의 도움이 될 수 없어요. 단, 의료적 접근을 통해 위 문제들이 안정화가 된 상태에서는 보다 장기적이고 지속적인 변화를 위해 디스턴싱을 시작해봐도 괜찮아요.",
          ]}
        />
        <AccordianTemplate
          summary={"디스턴싱은 심리 상담과 무엇이 다른가요?"}
          details={[
            "디스턴싱은 일주일에 한 번 진행되는 심리 상담과 달리 매일 진행되는 프로그램으로, 일상 속에서 자신의 마음을 돌볼 수 있도록 돕습니다. 최신 인지과학에 기반한 접근 방식을 통해 자기 주도적으로 인지 구조를 파악하고, 스스로 변화를 이끌 수 있도록 합니다.",
          ]}
        />
        <AccordianTemplate
          summary={"이런 경우 환불해드려요"}
          details={[
            "결제 후 서비스를 이용하지 않은 경우 언제든 환불이 가능해요. 결제 후 1회 이상 서비스를 이용한 경우 환불 금액은 판매자에게 문의해주세요.",
            <br />,
            "서버 문제, 개발 오류 등 회사의 사정으로 인해 일주일을 초과하는 기간 동안 서비스가 원활하게 전개되지 않는 경우에는, 문제 발생 21일 전부터 문제 발생 시점까지 진행된 결제 건에 대해 모두 환불해드려요.",
            <br />,
            "매주 3회 이상 활동을 성실히 수행하였음에도 3개월 후 변화를 느끼지 못하실 경우, 전액 환불해드려요.",
          ]}
          noBorder
        />
      </Stack>
    </AccordionGroup>
  );
}
