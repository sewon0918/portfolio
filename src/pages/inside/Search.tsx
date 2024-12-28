import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import counselorSearchWizardQ, {
  CounselorSearchWizardQType,
  NestedCounselorSearchWizardQType,
} from "../../data/inside/counselorSearchWizardQ";
import SingleSelectTemplate from "@/components/inside/counselorSearchWizard/SingleSelectTemplate";
import MultipleSelectTemplate from "@/components/inside/counselorSearchWizard/MultipleSelectTemplate";
import { counselorSearchWizardAtom } from "@/recoil/inside/counselor-search-wizard/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { Text24 } from "@/components/common/Text";

export default function Search() {
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState<string>("crc-1");
  const [question, setQuestion] = useState<CounselorSearchWizardQType>(
    counselorSearchWizardQ.find(
      (element) => element.id === currentId
    ) as CounselorSearchWizardQType
  );

  const [answer, setAnswer] = useRecoilState(counselorSearchWizardAtom);

  useEffect(() => {
    if (currentId === "goNext") {
      setTimeout(() => {
        navigate("/inside/analysis", { replace: true });
      }, 500);
    }
    if (currentId === "crc-2") {
      const crc1Answer = answer?.find((element) => element.id === "crc-1")
        ?.answer as string;
      const category = (
        counselorSearchWizardQ.find(
          (element) => element.id === "crc-1"
        ) as CounselorSearchWizardQType
      )?.options.find((option) => option.id === crc1Answer)?.text;

      if (category) {
        if (
          (
            counselorSearchWizardQ.find(
              (element) => element.id === currentId
            ) as NestedCounselorSearchWizardQType
          )?.category?.[category]
        ) {
          setQuestion(
            (
              counselorSearchWizardQ.find(
                (element) => element.id === currentId
              ) as NestedCounselorSearchWizardQType
            )?.category?.[category] as CounselorSearchWizardQType
          );
        } else {
          if (isBackward) {
            goPrevious();
          } else {
            goNext();
          }
        }
      }
    } else {
      setQuestion(
        counselorSearchWizardQ.find(
          (element) => element.id === currentId
        ) as CounselorSearchWizardQType
      );
    }
  }, [currentId]);

  function goNext() {
    const currentIndex = counselorSearchWizardQ.findIndex(
      (q) => q.id === currentId
    );
    if (
      currentIndex !== -1 &&
      currentIndex < counselorSearchWizardQ.length - 1
    ) {
      const nextId = counselorSearchWizardQ[currentIndex + 1].id;
      setCurrentId(nextId);
    }
    if (currentIndex === counselorSearchWizardQ.length - 1) {
      setCurrentId("goNext");
    }
  }
  function goPrevious() {
    const currentIndex = counselorSearchWizardQ.findIndex(
      (q) => q.id === currentId
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      const previousId = counselorSearchWizardQ[currentIndex - 1].id;
      setCurrentId(previousId);
    }
  }

  const [mousedownY, setMousedownY] = useState<number>();
  const [isBackward, setIsBackward] = useState<boolean>(false);

  useEffect(() => {
    if (isBackward) {
      goPrevious();
    }
  }, [isBackward]);

  const onMouseDown = (e: MouseEvent) => {
    setMousedownY(e.clientY);
  };
  const onTouchStart = (e: TouchEvent) => {
    setMousedownY(e.changedTouches[0].clientY);
  };
  const onScrollEnd = () => {
    setMousedownY(undefined);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (mousedownY && e.clientY - mousedownY > 100) {
      setIsBackward(true);
    }
  };
  const onTouchMove = (e: TouchEvent) => {
    if (mousedownY && e.changedTouches[0].clientY - mousedownY > 100) {
      setIsBackward(true);
    }
  };
  useEffect(() => {
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onScrollEnd);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onScrollEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onScrollEnd);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onScrollEnd);
    };
  }, [mousedownY]);

  const singleSelectOnClick = (id: string) => {
    setAnswer((prev) => {
      const newAnswer = [
        ...(prev?.filter((element) => element.id !== currentId) || []),
        { id: currentId, answer: id },
      ];

      return newAnswer;
    });
  };

  const multipleSelectOnClick = (id: string) => {
    setAnswer((prev) => {
      const currentAnswer = (prev?.find((element) => element.id === currentId)
        ?.answer || []) as string[];
      const newAnswer = currentAnswer.includes(id)
        ? currentAnswer.filter((answerId) => answerId !== id) // id가 존재하면 제거
        : [...currentAnswer, id]; // id가 없으면 추가

      return [
        ...(prev?.filter((element) => element.id !== currentId) || []),
        { id: currentId, answer: newAnswer },
      ];
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "0 20px ",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          color: "white",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        <AnimatePresence
          onExitComplete={() => {
            setIsBackward(false);
          }}
        >
          <motion.div
            key={currentId}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            initial={{ y: isBackward ? -300 : 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isBackward ? 300 : -300, opacity: 0 }}
            css={{ position: "absolute", bottom: "24px" }}
          >
            {question && (
              <>
                <Text24
                  customCss={{
                    color: "white",
                    marginBottom: "30px",
                  }}
                >
                  {question.title}
                </Text24>
                {question.type === "select" ? (
                  <SingleSelectTemplate
                    questionId={question.id}
                    question={question.options}
                    selected={
                      answer?.find((element) => element.id === currentId)
                        ?.answer as string
                    }
                    onClick={singleSelectOnClick}
                    onAnimationComplete={goNext}
                  />
                ) : (
                  <MultipleSelectTemplate
                    questionId={question.id}
                    question={question.options}
                    selected={
                      answer?.find((element) => element.id === currentId)
                        ?.answer as string[]
                    }
                    onClick={multipleSelectOnClick}
                    onArrowClick={goNext}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
