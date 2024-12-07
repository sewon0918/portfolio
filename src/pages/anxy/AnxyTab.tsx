import Community from "./Community";
import AnxyTest from "@/components/anxy/customizing/AnxyTest";

export default function AnxyTab({ scrollTop }: { scrollTop: number }) {
  return (
    <>
      <AnxyTest />
      <Community scrollTop={scrollTop} />
    </>
  );
}
