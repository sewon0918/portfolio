export const Link = ({
  link,
  children,
}: {
  link: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      css={{ color: "#131314", display: "block" }}
    >
      {children}
    </a>
  );
};
