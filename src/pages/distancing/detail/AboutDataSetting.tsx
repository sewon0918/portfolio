import RefactoringTemplate from "@/pages/template/RefactoringTemplate";

export default function AboutDataSetting() {
  return (
    <RefactoringTemplate
      beforeCodeBlocks={[
        `// 문제점: 각 활동지마다 다른 파라미터를 개별적으로 전달해야 함
function useGetStaticTaskData(taskId: string) {
  const taskParams = useTaskParams()

  // 문제점 1: 각 함수마다 필요한 파라미터를 일일이 전달해야 함
  // 문제점 2: 새로운 파라미터가 추가될 때마다 호출 방식을 수정해야 함
  const staticTaskData: {[taskId: string]:ProgramType[]} = {
    "0-0-A":content_0_0_A(taskParams.isAiCoachProduct),
    "0-1-A":content_0_1_A,
    "0-2-A":content_0_2_A(taskParams.isPushNotificationGranted),
    ...Object.fromEntries(automaticThoughtIdList.map(id => 
    [\`0-3-A_\${each}\`, content_3_3_A(id)]
    ))
  };

  return staticTaskData[taskId];
}`,
        `// 문제점: 중첩된 조건문으로 활동지 유형 판별
function useGetInitialTaskData({ taskId }: { taskId: string }) {
  const staticTaskData = useGetStaticTaskData(taskId);

  const getStaticTaskData = () => staticTaskData;

  async function getInitialTaskData(taskId: string) {
    // 문제점 1: 새로운 활동지 추가 시 if-else 분기를 계속 추가해야 함
    // 문제점 2: 코드 가독성이 낮고 유지보수가 어려움
    // 문제점 3: 조건 체크 순서에 따라 성능 차이 발생 가능
    if (taskId === "0-4-A") {
      return await get_0_4_A_content();
    } else if (taskId === "0-5-A") {
      return await get_0_5_A_content();
    } 
    // ... 10개 이상의 if-else 분기 존재
    
    return getStaticTaskData(); // 기본 정적 데이터 
  }`,
      ]}
      afterCodeBlocks={[
        `// 개선점: 래퍼 함수로 공통 의존성을 주입하는 패턴 적용
function useGetStaticTaskData(taskId: string) {
  const withParams = useTaskWrapper()

  // 개선점 1: 모든 함수에 동일한 파라미터 세트를 전달하므로 일관성 향상
  // 개선점 2: 새로운 설정이 추가되어도 호출 방식 변경 필요 없음
  const staticTaskData: {[taskId: string]:ProgramType[]} = {
    "0-0-A":withParams(content_0_0_A)(),
    "0-1-A":withParams(content_0_1_A)(),
    "0-2-A":withParams(content_0_2_A)(),
     ...Object.fromEntries(automaticThoughtIdList.map(id => 
     [\`0-3-A_\${each}\`, withParams(content_3_3_A)(id)]
     ))
  };

  return staticTaskData[taskId];
}`,
        `// 개선점: 객체 맵을 활용한 선언적 접근법 적용
function useGetInitialTaskData({ taskId }: { taskId: string }) {
  const staticTaskData = useGetStaticTaskData(taskId);

  const getStaticTaskData = () => staticTaskData;

  async function getInitialTaskData(taskId: string) {
    // 개선점 1: 새 활동지 추가 시 객체에만 추가하면 되므로 확장성 향상
    // 개선점 2: 선언적 프로그래밍 방식으로 코드 가독성 향상
    // 개선점 3: 조건문 제거하고 객체 맵으로 처리하여 O(1) 시간 복잡도 달성
    const getter = dynamicTaskDataGetters[taskId];
    
    if (getter) {
      return await getter();
    }
    
    return getStaticTaskData();
  }
}`,
        `// 개선점: 의존성 주입을 위한 커스텀 훅과 래퍼 함수 구현
function useTaskWrapper() {
  // 개선점 1: 모든 설정 데이터를 한 번에 가져와서 재사용
  const taskParams = useTaskParams();
  
  // 개선점 2: 제네릭 타입을 활용하여 타입 안전성 확보
  // 개선점 3: 클로저를 활용한 함수형 프로그래밍 패턴 구현
  function withParams<T extends any[], R>(
    contentFn: (context: typeof taskParams, ...args: T) => R
  ): (...args: T) => R {
    return function(...args: T) {
      return contentFn(taskParams, ...args);
    };
  }
  
  return withParams;
}`,
        `// 개선점: 전처리가 필요한 활동지를 객체 맵으로 등록
const dynamicTaskDataGetters: Record<string, Function> = {
  "0-4-A": () => get_0_4_A_content(),
  "0-5-A": () => get_0_5_A_content(),
};`,
      ]}
    ></RefactoringTemplate>
  );
}
