import Begin from "./Begin";
import Search from "./Search";
import { useParams } from "react-router";
import Analysis from "./Analysis";

export default function CounselorSearchWizard() {
  const { state } = useParams();
  return (
    <>
      {state === "begin" && <Begin />}
      {state === "search" && <Search />}
      {state === "analysis" && <Analysis />}
    </>
  );
}
