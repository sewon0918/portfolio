import AppScreen from "@/components/common/AppScreen";
import { ActionButton } from "@/components/anxy/common/button/ActionButton";
import { useNavigate } from "react-router";
import programAtom, {
  dailyProgramDetail_mock2,
  dailyProgramDetail_mock3,
} from "@/recoil/anxy/program/atom";
import { useSetRecoilState } from "recoil";
import { cloneDeep } from "es-toolkit";

export default function WorryNote() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const setDailyProgramDetailRAW = useSetRecoilState(programAtom);

  return (
    <AppScreen backgroundColor="#F1EEEB">
      <ActionButton
        state={"ACTIVE"}
        text={"확인"}
        action={() => {
          goBack();
          setDailyProgramDetailRAW(dailyProgramDetail_mock2);
        }}
      />
      <ActionButton
        state={"ACTIVE"}
        text={"확인"}
        action={() => {
          goBack();
          setDailyProgramDetailRAW(dailyProgramDetail_mock3);
        }}
      />
      {/* <ActionButton
        state={"ACTIVE"}
        text={"확인"}
        action={() => {
          goBack();
          setDailyProgramDetailRAW(dailyProgramDetail_mock2);
        }}
      /> */}
    </AppScreen>
  );
}
