# Portfolio

이전 작업들을 정리한 포트폴리오입니다. 프로젝트 별로 직접 경험할 수 있는 데모를 포함하여, 다양한 인터랙션과 애니메이션 요소를 체험할 수 있도록 구성했습니다.

## 목차

- [기술 스택](#기술-스택)
- [프로젝트](#프로젝트)
  - [Distancing](#Distancing)
  - [Anxy](#Anxy)
  - [Inside](#Inside)

## 기술 스택

- **코어**: TypeScript, React
- **스타일링**: Emotion, Framer-motion
- **빌드 도구**: Vite
- **패키지 매니저**: Yarn
- **CI/CD**: Vercel

## 프로젝트

### Distancing

- 활동지: 사용자가 블록을 하나씩 탐색하며 집중력을 유지할 수 있도록 설계했습니다. 화면을 클릭하거나 엔터 키를 누르면 다음 블록이 순차적으로 나타납니다.

| 모바일 | 데스크탑 |
|:-----:|:-----:|
| <img src="https://github.com/user-attachments/assets/500b8921-76f5-4b74-ac50-5d638a745a8d" alt="디스턴싱 모바일 GIF" width="200" /> | <img src="https://github.com/user-attachments/assets/b98fd0cb-5cda-40d4-a8c7-12655e9852a6" alt="디스턴싱 데스크탑 GIF" width="600" /> | 



### Anxy

- 걱정기록: select button 과 input 를 컴포넌트화하여 걱정을 기록할 수 있도록 구현했습니다.
- 회고: 브라우저의 user-select 동작을 본떠, 형광펜으로 텍스트를 강조하는 듯한 직관적인 인터랙션을 개발했습니다.
- 여정: 매일 제공되는 프로그램의 진행 상황을 Anxy의 여행 애니메이션으로 시각화했습니다. Lottie와 Framer Motion을 활용했으며, 부드러운 애니메이션을 위해 컴포넌트가 마운트되기 전에 Lottie 파일을 캐싱했습니다.
- 상점: 사용자가 여정을 통해 획득한 씨앗을 아이템으로 교환할 수 있는 상점 기능을 구현했습니다.
- 응원: 함께하는 사람들의 여정을 응원할 때, 하이파이브를 하는 듯한 인터랙션을 개발했습니다. 카드의 현재 위치에서 자연스럽게 화면의 중앙으로 확대될 수 있도록 했습니다.
- 그라운딩: 불안을 즉각적으로 완화하는 '그라운딩' 도구를 사용할 때, '밀어서 잠금 해제'와 유사한 직관적이고 즉각적인 인터랙션을 추가했습니다.

| 걱정기록 | 회고 | 여정 | 상점 | 응원 | 그라운딩 |
|:-----:|:-----:|:-----:|:-----:|:-----:| :-----:| 
| <img src="https://github.com/user-attachments/assets/d5fd9dcc-abab-4f79-9ebc-f3c8f1267db8" alt="걱정기록 GIF" width="200" /> | <img src="https://github.com/user-attachments/assets/debb9c03-6d53-406c-a8fe-88f422324401" alt="회고 GIF" width="200" /> | <img src="https://github.com/user-attachments/assets/d5bba4eb-896f-4d63-bf44-504a94f38277" alt="여정 GIF" width="200" /> | <img src="https://github.com/user-attachments/assets/c8b4e5a4-d2e4-43b2-982b-666e49052ca9" alt="상점 GIF" width="200" /> |<img src="https://github.com/user-attachments/assets/96f02143-8a97-49f1-80e6-4a74194045ad" alt="응원 GIF" width="200"/>|<img src="https://github.com/user-attachments/assets/d973f97e-b4e9-4e3f-90a1-ee5de6df290e" alt="그라운딩 GIF" width="200"/>|

### Inside

- 상담사 찾기 마법사: 사용자가 몰입감 있게 상담사를 탐색할 수 있도록 단일 페이지 내 스크롤 기반 인터랙션을 구현했습니다.

| 상담사 찾기 마법사 |
|:-----:| 
| <img src="https://github.com/user-attachments/assets/3d1ec58e-2d80-4ab7-bc1c-d7819111f11c" alt="상담사 찾기 마법사 GIF" width="200" /> | 

