import { IconButton } from "@mui/joy";
import { useNavigate } from "react-router";
export default function BackButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <IconButton onClick={goBack} variant="plain" color="neutral" size="sm">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5.5L5.5 12L12 18.5"
          stroke="#2E2B2B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
}
