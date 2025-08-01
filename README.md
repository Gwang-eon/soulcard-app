# 🔮 AI Tarot Card App

머신러닝과 AI가 융합된 현대적인 타로카드 모바일 앱

## ✨ 주요 기능

- **🎯 지능형 카드 해석**: 실시간으로 생성되는 무한에 가까운 조합 해석
- **🔄 다양한 스프레드**: 1장부터 켈틱크로스(10장)까지 지원
- **🧠 질문 분석**: AI가 질문을 분석하여 최적의 스프레드 추천
- **📊 조합 분석**: 카드 간 시너지와 패턴을 자동으로 인식
- **🎨 텍스트 기반 카드**: 실제 이미지 없이도 아름다운 카드 표시

## 🏗️ 프로젝트 구조

```
card/
├── src/                    # 메인 소스 코드
├── data/                   # 데이터 파일들
│   ├── cards/             # 수트별 카드 데이터
│   ├── enums.json         # 열거형 정의
│   └── cardCombinations.json
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수들
├── services/              # 핵심 서비스들
├── demo/                  # 사용 예시와 데모
├── tests/                 # 테스트 파일들
└── docs/                  # 문서들
```

## 🚀 빠른 시작

### 설치

```bash
# 의존성 설치
npm install

# TypeScript 컴파일
npm run build
```

### 실행

```bash
# 개발 모드 실행
npm run dev

# 전체 데모 실행
npm run demo

# 빠른 시작 (초기화 + 예시)
npm start
```

### 사용법

```typescript
import { initializeTarotApp, tarotReading, cardLoader } from './src';

// 1. 앱 초기화
await initializeTarotApp();

// 2. 단일 카드 리딩
const reading = await tarotReading.performSingleCardReading('오늘의 운세는?');
console.log(reading.interpretation);

// 3. 3카드 스프레드
const threeCards = await tarotReading.performThreeCardReading(
  '내 연애운은?', 
  'love'
);

// 4. 관계 상담 (5카드)
const relationship = await tarotReading.performRelationshipReading(
  '이 사람과의 관계는?'
);

// 5. 켈틱 크로스 (10카드)
const celtic = await tarotReading.performCelticCrossReading(
  '내 인생의 방향은?'
);
```

## 📊 데이터베이스 현황

- **총 카드**: 9/78장 완성 (11.5%)
- **메이저 아르카나**: 5/22장
- **마이너 아르카나**: 4/56장 (각 수트 에이스)
- **조합 시스템**: ∞ 무한 조합 지원

## 🎮 데모 실행

```bash
# 기본 사용법 데모
npm run demo

# 또는 코드에서
import { TarotAppDemo } from './demo/usage';

// 전체 데모
await TarotAppDemo.runAllDemos();

// 개별 데모
await TarotAppDemo.basicUsageDemo();
await TarotAppDemo.advancedFeaturesDemo();  
await TarotAppDemo.performanceDemo();
```

## 🔧 개발 명령어

```bash
# 개발
npm run dev              # 개발 모드 실행
npm run build           # TypeScript 컴파일
npm run typecheck       # 타입 체크

# 테스트
npm test                # 테스트 실행
npm run test:watch      # 테스트 감시 모드

# 코드 품질
npm run lint            # ESLint 실행
npm run lint:fix        # 자동 수정

# 정리
npm run clean           # 빌드 파일 삭제
```

## 🎯 핵심 시스템

### 1. 카드 로더 (CardLoader)
- 분산된 JSON 파일에서 카드 데이터 로드
- 싱글톤 패턴으로 효율적인 메모리 관리
- 점성학적 정보 통합

### 2. 조합 엔진 (CombinationEngine)  
- 실시간 조합 강도 계산
- 특별 패턴 인식 (all_aces, sequence 등)
- 동적 해석 생성

### 3. 리딩 서비스 (TarotReadingService)
- 다양한 스프레드 지원
- 질문 분석 및 추천
- 완전한 리딩 경험 제공

### 4. 카드 렌더러 (CardRenderer)
- 텍스트 기반 아름다운 카드 표시
- 다양한 레이아웃 지원
- 모바일 앱용 데이터 생성

## 📈 조합의 수학

타로 카드 조합의 경우의 수:

- **3카드**: 76,076가지
- **5카드**: 25,357,464가지  
- **10카드**: 1,635,934,166,136가지 (1조 6천억)

우리의 지능형 시스템은 이 모든 조합을 실시간으로 해석합니다! 🎉

## 🎨 카드 표시 예시

```
🔮 선택된 카드
══════════════════════════════════════════════════
┌──────────────────────┐
│ 0                    │
│ 바보                 │
│ The Fool             │
│ 🌟                   │
│ ⬆️                   │
│                      │
└──────────────────────┘
══════════════════════════════════════════════════
```

## 🤝 기여하기

1. 더 많은 카드 데이터 추가
2. 조합 해석 알고리즘 개선
3. 새로운 스프레드 패턴 추가
4. 모바일 앱 UI 구현

## 📝 라이선스

MIT License

---

**🔮 Let the cards reveal your destiny! 🔮**