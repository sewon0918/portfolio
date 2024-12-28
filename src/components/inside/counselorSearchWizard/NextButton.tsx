import { motion } from "framer-motion";

export default function NextButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      animate={{
        opacity: !disabled ? 1 : 0.3,
      }}
      transition={{ delay: 0, duration: 0.2, ease: "easeInOut" }}
      css={{
        width: "54px",
        height: "54px",
        borderRadius: "54px",
        margin: "30px auto 0 auto",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <svg
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.75171 17.3087C7.75171 17.861 8.19942 18.3087 8.75171 18.3087C9.30399 18.3087 9.75171 17.861 9.75171 17.3087L7.75171 17.3087ZM9.75171 1C9.75171 0.447715 9.30399 2.41411e-08 8.75171 0C8.19942 -2.41411e-08 7.75171 0.447715 7.75171 1L9.75171 1ZM7.75171 1L7.75171 17.3087L9.75171 17.3087L9.75171 1L7.75171 1Z"
          fill="#2C4BEC"
        />
        <path
          d="M16 11.7517L8.75168 19L1.50336 11.7517"
          stroke="#2C4BEC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
