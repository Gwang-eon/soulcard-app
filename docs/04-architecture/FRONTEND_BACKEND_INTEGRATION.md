# 🔗 Figma Make TSX → 백엔드 API 연결 가이드

## 📋 현재 백엔드 API 현황

### 사용 가능한 API 엔드포인트
```typescript
// 기존 구축된 API들
/api/status                    // 서버 상태 확인
/api/analyze-question         // 질문 분석
/api/reading/single          // 단일 카드 리딩
/api/reading/three-card      // 3카드 스프레드
/api/reading/celtic-cross    // 켈틱크로스
/api/reading/[type]          // 동적 상담 타입
```

---

## 🎯 주요 화면별 API 연결 방법

### 1. 홈 화면 (Home Dashboard)
```typescript
// Figma Make 생성: HomeScreen.tsx
import { useState, useEffect } from 'react';

interface DailyCard {
  card: {
    name: string;
    image: string;
    meaning: string;
  };
  interpretation: string;
}

export default function HomeScreen() {
  const [dailyCard, setDailyCard] = useState<DailyCard | null>(null);
  const [userTokens, setUserTokens] = useState(0);

  // 오늘의 카드 가져오기
  useEffect(() => {
    fetch('/api/reading/single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: "오늘의 운세",
        type: "daily"
      })
    })
    .then(res => res.json())
    .then(data => setDailyCard(data));
  }, []);

  return (
    <div className="home-container">
      {/* Figma Make 생성 UI */}
      <DailyCardSection card={dailyCard} />
      <TokenDisplay tokens={userTokens} />
      <QuickMenuGrid />
    </div>
  );
}
```

### 2. 상담 타입 선택 화면
```typescript
// Figma Make 생성: ConsultationTypeScreen.tsx
interface ConsultationType {
  id: string;
  name: string;
  description: string;
  tokenCost: number;
  duration: string;
}

export default function ConsultationTypeScreen() {
  const consultationTypes: ConsultationType[] = [
    {
      id: 'single',
      name: '단일 카드',
      description: '빠른 답변이 필요할 때',
      tokenCost: 1,
      duration: '~2분 소요'
    },
    {
      id: 'three-card',
      name: '3카드 분석',
      description: '과거-현재-미래 흐름 파악',
      tokenCost: 3,
      duration: '~5분 소요'
    },
    {
      id: 'celtic-cross',
      name: '켈틱크로스',
      description: '10카드 완전 분석',
      tokenCost: 10,
      duration: '~15분 소요'
    }
  ];

  const handleTypeSelect = (type: ConsultationType) => {
    // 선택된 상담 타입으로 다음 단계 진행
    router.push(`/consultation/question?type=${type.id}`);
  };

  return (
    <div className="consultation-types">
      {consultationTypes.map(type => (
        <ConsultationCard 
          key={type.id}
          type={type}
          onSelect={() => handleTypeSelect(type)}
        />
      ))}
    </div>
  );
}
```

### 3. 질문 입력 화면
```typescript
// Figma Make 생성: QuestionInputScreen.tsx
export default function QuestionInputScreen() {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const { type } = router.query;

  const handleQuestionSubmit = async () => {
    setIsAnalyzing(true);
    
    try {
      // 1. 질문 분석 API 호출
      const analysisResponse = await fetch('/api/analyze-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, category })
      });
      
      const analysis = await analysisResponse.json();
      
      // 2. 분석 결과를 카드 선택 화면으로 전달
      router.push({
        pathname: '/consultation/card-selection',
        query: { 
          type, 
          question, 
          category,
          analysis: JSON.stringify(analysis)
        }
      });
      
    } catch (error) {
      console.error('질문 분석 실패:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="question-input">
      <QuestionTextarea 
        value={question}
        onChange={setQuestion}
        placeholder="어떤 고민이 있으신가요?"
      />
      
      <CategorySelector 
        value={category}
        onChange={setCategory}
      />
      
      <ExampleQuestions onSelect={setQuestion} />
      
      <SubmitButton 
        onClick={handleQuestionSubmit}
        disabled={question.length < 10}
        loading={isAnalyzing}
      />
    </div>
  );
}
```

### 4. 카드 선택 화면
```typescript
// Figma Make 생성: CardSelectionScreen.tsx
export default function CardSelectionScreen() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);
  const router = useRouter();
  const { type, question, analysis } = router.query;

  // 카드 선택 개수 결정
  const getRequiredCards = (type: string) => {
    switch(type) {
      case 'single': return 1;
      case 'three-card': return 3;
      case 'celtic-cross': return 10;
      default: return 1;
    }
  };

  const handleCardSelect = (cardIndex: number) => {
    const required = getRequiredCards(type as string);
    
    if (selectedCards.length < required) {
      setSelectedCards([...selectedCards, cardIndex]);
    }
    
    // 필요한 카드 수 달성 시 자동으로 리딩 시작
    if (selectedCards.length + 1 === required) {
      startReading([...selectedCards, cardIndex]);
    }
  };

  const startReading = async (cardIndices: number[]) => {
    setIsReading(true);
    
    try {
      const response = await fetch(`/api/reading/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question as string,
          selectedCards: cardIndices,
          analysis: analysis ? JSON.parse(analysis as string) : null
        })
      });
      
      const reading = await response.json();
      
      // 결과 화면으로 이동
      router.push({
        pathname: '/consultation/result',
        query: { 
          readingId: reading.id,
          result: JSON.stringify(reading)
        }
      });
      
    } catch (error) {
      console.error('카드 리딩 실패:', error);
    }
  };

  return (
    <div className="card-selection">
      <ProgressIndicator 
        current={selectedCards.length} 
        total={getRequiredCards(type as string)} 
      />
      
      <CardDeck 
        onCardSelect={handleCardSelect}
        selectedCards={selectedCards}
        isReading={isReading}
      />
      
      <ShuffleButton onClick={() => setSelectedCards([])} />
    </div>
  );
}
```

### 5. 결과 화면
```typescript
// Figma Make 생성: ResultScreen.tsx
interface ReadingResult {
  id: string;
  cards: Array<{
    name: string;
    image: string;
    position: string;
    meaning: string;
  }>;
  interpretation: {
    overall: string;
    advice: string[];
    nextSteps: string[];
  };
  timestamp: string;
}

export default function ResultScreen() {
  const [result, setResult] = useState<ReadingResult | null>(null);
  const router = useRouter();
  const { readingId, result: resultData } = router.query;

  useEffect(() => {
    if (resultData) {
      setResult(JSON.parse(resultData as string));
    }
  }, [resultData]);

  const handleSaveReading = async () => {
    // 로컬 스토리지 또는 사용자 계정에 저장
    localStorage.setItem(`reading-${result?.id}`, JSON.stringify(result));
  };

  const handleShareReading = () => {
    // 소셜 공유 기능
    const shareData = {
      title: 'AI 타로카드 리딩 결과',
      text: result?.interpretation.overall,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    }
  };

  return (
    <div className="reading-result">
      <ResultHeader 
        timestamp={result?.timestamp}
        onSave={handleSaveReading}
        onShare={handleShareReading}
      />
      
      <CardDisplay cards={result?.cards} />
      
      <InterpretationSection 
        interpretation={result?.interpretation}
      />
      
      <ActionButtons 
        onNewReading={() => router.push('/consultation')}
        onViewHistory={() => router.push('/history')}
      />
    </div>
  );
}
```

---

## 🔧 공통 유틸리티 함수들

### API 요청 래퍼
```typescript
// utils/api.ts
export class TarotAPI {
  private static baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.vercel.app' 
    : 'http://localhost:3000';

  static async analyzeQuestion(question: string, category: string) {
    const response = await fetch(`${this.baseURL}/api/analyze-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category })
    });
    return response.json();
  }

  static async getReading(type: string, question: string, selectedCards: number[]) {
    const response = await fetch(`${this.baseURL}/api/reading/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, selectedCards })
    });
    return response.json();
  }

  static async checkStatus() {
    const response = await fetch(`${this.baseURL}/api/status`);
    return response.json();
  }
}
```

### 상태 관리 (Context)
```typescript
// context/TarotContext.tsx
interface TarotContextType {
  userTokens: number;
  setUserTokens: (tokens: number) => void;
  currentReading: any;
  setCurrentReading: (reading: any) => void;
  readingHistory: any[];
  addToHistory: (reading: any) => void;
}

export const TarotContext = createContext<TarotContextType | null>(null);

export function TarotProvider({ children }: { children: React.ReactNode }) {
  const [userTokens, setUserTokens] = useState(15); // 기본 토큰
  const [currentReading, setCurrentReading] = useState(null);
  const [readingHistory, setReadingHistory] = useState([]);

  const addToHistory = (reading: any) => {
    setReadingHistory(prev => [reading, ...prev]);
    localStorage.setItem('tarot-history', JSON.stringify([reading, ...readingHistory]));
  };

  return (
    <TarotContext.Provider value={{
      userTokens, setUserTokens,
      currentReading, setCurrentReading,
      readingHistory, addToHistory
    }}>
      {children}
    </TarotContext.Provider>
  );
}
```

---

## 📦 패키지 의존성 요구사항

Figma Make 생성 컴포넌트들이 제대로 작동하려면:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^14.0.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

---

## 🚀 배포 및 통합 전략

### 1. 개발 환경 설정
```bash
# 프론트엔드 폴더 생성 (선택적)
mkdir frontend && cd frontend
npx create-next-app@latest . --typescript --tailwind

# 또는 현재 프로젝트에 React 추가
npm install react react-dom next
npm install -D @types/react @types/react-dom
```

### 2. Figma Make 컴포넌트 통합
```
frontend/
├── components/
│   ├── ui/              # Figma Make 기본 컴포넌트들
│   ├── screens/         # Figma Make 화면 컴포넌트들
│   └── common/          # 공통 컴포넌트들
├── pages/
│   ├── api/             # 기존 API 연결점
│   └── [screen].tsx     # 동적 라우팅
└── utils/
    ├── api.ts           # API 래퍼 함수들
    └── types.ts         # TypeScript 타입들
```

### 3. 점진적 통합 방법
1. **Phase 1**: 정적 화면부터 시작 (홈, 소개)
2. **Phase 2**: API 연결이 필요한 화면 (상담 플로우)
3. **Phase 3**: 고급 기능 (결제, 히스토리)

이렇게 하면 Figma Make에서 생성된 TSX 컴포넌트들을 현재 구축된 백엔드 API와 완벽하게 연결할 수 있습니다!