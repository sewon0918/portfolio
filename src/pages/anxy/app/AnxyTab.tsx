import AnxyJourney from "@/components/anxy/journey/AnxyJourney";
import Community from "../../../components/anxy/community/Community";

export default function AnxyTab({ scrollTop }: { scrollTop: number }) {
  return (
    <>
      <AnxyJourney />
      <Community scrollTop={scrollTop} />
    </>
  );
}
