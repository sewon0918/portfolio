import { useNavigate } from "react-router";

export default function useOpenTask(taskKey: string) {
  const navigate = useNavigate();

  const encodedTaskKey = encodeURIComponent(taskKey);
  const newPathName = `/distancing/${encodedTaskKey}`;

  function goTask() {
    console.log(newPathName);
    navigate(`${newPathName}`, {
      replace: window.location.pathname === newPathName,
    });
  }

  return goTask;
}
