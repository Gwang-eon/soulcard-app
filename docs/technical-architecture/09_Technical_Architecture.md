# 🏗️ 기술 아키텍처 문서

AI 타로카드 앱의 전체 기술 구조 및 설계 원칙

## 📋 목차

1. [전체 시스템 아키텍처](#전체-시스템-아키텍처)
2. [핵심 컴포넌트](#핵심-컴포넌트)
3. [데이터 구조](#데이터-구조)
4. [API 설계](#api-설계)
5. [성능 최적화](#성능-최적화)
6. [확장성 설계](#확장성-설계)

## 🎯 전체 시스템 아키텍처

### 계층형 아키텍처

```
┌─────────────────────────────────────────┐
│              프레젠테이션 계층                │
│  ┌─────────────┐  ┌─────────────────┐    │
│  │ Web Client  │  │ Mobile App      │    │
│  │ (HTML/CSS/JS)│  │ (React Native) │    │
│  └─────────────┘  └─────────────────┘    │
└────────────┬────────────────────────────┘
             │ HTTP/REST API
┌────────────▼────────────────────────────┐
│               서비스 계층                   │
│  ┌─────────────────┐ ┌─────────────────┐ │
│  │ Express Server  │ │ Tarot Reading   │ │
│  │ (API Gateway)   │ │ Service         │ │
│  └─────────────────┘ └─────────────────┘ │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│               비즈니스 로직 계층               │
│ ┌─────────────┐ ┌─────────────────────┐  │
│ │Combination  │ │ Card Loader        │   │
│ │Engine       │ │ (Singleton)        │   │
│ └─────────────┘ └─────────────────────┘  │
│ ┌─────────────┐ ┌─────────────────────┐  │
│ │Card         │ │ Question Analyzer  │   │
│ │Renderer     │ │ (AI/ML)           │   │
│ └─────────────┘ └─────────────────────┘  │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│              데이터 접근 계층                │
│ ┌─────────────┐ ┌─────────────────────┐  │
│ │JSON Files   │ │ TypeScript Types   │   │
│ │(Static Data)│ │ (Schema)          │   │
│ └─────────────┘ └─────────────────────┘  │
└─────────────────────────────────────────┘
```

### 핵심 설계 원칙

1. **단일 책임 원칙 (SRP)**: 각 클래스와 모듈은 하나의 책임만 가짐
2. **의존성 역전 원칙 (DIP)**: 고수준 모듈이 저수준 모듈에 의존하지 않음
3. **싱글톤 패턴**: 데이터 로더와 엔진들은 싱글톤으로 구현
4. **팩토리 패턴**: 카드와 리딩 객체 생성
5. **전략 패턴**: 다양한 스프레드 방식 구현

## 🔧 핵심 컴포넌트

### 1. CardLoader (데이터 로더)

```typescript
export class CardLoader {
  private static instance: CardLoader;
  private allCards: TarotCard[] = [];
  private isLoaded = false;

  // 싱글톤 패턴
  public static getInstance(): CardLoader {
    if (!CardLoader.instance) {
      CardLoader.instance = new CardLoader();
    }
    return CardLoader.instance;
  }

  // 지연 로딩
  public async loadAllCards(): Promise<void> {
    if (this.isLoaded) return;
    // 파일 시스템 또는 fetch를 통한 데이터 로드
  }
}
```

**주요 기능:**
- 📁 분산된 JSON 파일에서 카드 데이터 로드
- 💾 메모리 효율적인 싱글톤 관리
- 🔄 환경별 로딩 전략 (Node.js vs Browser)
- 📊 실시간 통계 제공

### 2. CombinationEngine (조합 분석 엔진)

```typescript
export class CombinationEngine {
  // 실시간 조합 강도 계산
  public calculateCombinationStrength(cards: TarotCard[]): Strength {
    let strengthScore = 0;
    
    // 메이저 아르카나 가중치
    const majorCount = cards.filter(card => card.suit === 'major').length;
    strengthScore += majorCount * 3;
    
    // 특별 패턴 보너스
    const specialBonus = this.getSpecialCombinationBonus(cards);
    strengthScore += specialBonus;
    
    // 강도 분류 알고리즘
    return this.classifyStrength(strengthScore);
  }
}
```

**핵심 알고리즘:**
- 🎯 원소 분석 (Element Analysis)
- 🔢 수치 패턴 인식 (Numerical Pattern Recognition)
- 🌟 특별 조합 감지 (Special Pattern Detection)
- 📈 동적 강도 계산 (Dynamic Strength Calculation)

### 3. TarotReadingService (리딩 서비스)

```typescript
export class TarotReadingService {
  // 질문 분석 AI
  public analyzeQuestion(question: string): QuestionAnalysis {
    const lowerQuestion = question.toLowerCase();
    
    // 카테고리 분석
    let suggestedCategory: Category = 'general';
    if (lowerQuestion.includes('사랑') || lowerQuestion.includes('연애')) {
      suggestedCategory = 'love';
    }
    // ... 추가 분석 로직
    
    return {
      suggestedCategory,
      suggestedSpread,
      keywords: this.extractKeywords(question),
      emotion: this.analyzeEmotion(question),
      urgency: this.analyzeUrgency(question)
    };
  }
}
```

**AI/ML 기능:**
- 🧠 자연어 처리 (NLP)
- 🎭 감정 분석 (Sentiment Analysis)
- 🔍 키워드 추출 (Keyword Extraction)
- 📊 카테고리 분류 (Category Classification)

### 4. CardRenderer (카드 렌더링)

```typescript
export class CardRenderer {
  // ASCII 아트 카드 생성
  private static createCardBox(card: TarotCard, isReversed: boolean): string {
    const orientation = isReversed ? '🔄' : '⬆️';
    const suitSymbol = this.getSuitSymbol(card.suit);
    
    return [
      '┌' + '─'.repeat(22) + '┐',
      `│ ${card.number || 0}`.padEnd(23, ' ') + '│',
      `│ ${card.koreanName}`.padEnd(23, ' ') + '│',
      // ... 카드 구조 생성
      '└' + '─'.repeat(22) + '┘'
    ].join('\n');
  }
}
```

**렌더링 기능:**
- 🎨 ASCII 아트 카드 생성
- 📱 모바일 앱용 데이터 변환
- 🎭 다양한 레이아웃 지원
- 🌈 수트별 색상 시스템

## 📊 데이터 구조

### 분산 파일 시스템

```
data/
├── cards/
│   ├── majorArcana.json     # 22장 (메이저 아르카나)
│   ├── wands.json          # 14장 (완드)
│   ├── cups.json           # 14장 (컵)
│   ├── swords.json         # 14장 (소드)
│   └── pentacles.json      # 14장 (펜타클)
├── enums.json              # 열거형 정의
├── majorArcanaElements.json # 점성학적 정보
└── cardCombinations.json   # 특별 조합 데이터
```

### TypeScript 타입 시스템

```typescript
// 핵심 타입 정의
export interface TarotCard {
  id: number;
  name: string;
  koreanName: string;
  suit: Suit;
  number?: number;
  element: Element;
  uprightKeywords: string[];
  reversedKeywords: string[];
  interpretations: {
    upright: CardInterpretations;
    reversed: CardInterpretations;
  };
  timing: CardTiming;
  advice: {
    upright: CardAdvice;
    reversed: CardAdvice;
  };
  symbolism: Symbol[];
  imageUrl: string;
}

// 강타입 열거형
export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
export type Element = 'fire' | 'water' | 'air' | 'earth' | null;
export type Category = 'general' | 'love' | 'career' | 'money' | 'health' | 'spiritual';
```

### 데이터 무결성 보장

```typescript
// 런타임 타입 체크
export class TarotError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'TarotError';
  }
}

export class CardNotFoundError extends TarotError {
  constructor(cardId: number) {
    super(`Card with ID ${cardId} not found`, 'CARD_NOT_FOUND');
  }
}
```

## 🚀 API 설계

### RESTful API 원칙

```typescript
// Express.js 라우터 구조
app.post('/api/reading/single', singleCardHandler);
app.post('/api/reading/three-card', threeCardHandler);
app.post('/api/reading/relationship', relationshipHandler);
app.post('/api/reading/celtic-cross', celticCrossHandler);
app.post('/api/analyze-question', questionAnalysisHandler);
app.get('/api/status', statusHandler);
```

### 응답 형식 표준화

```typescript
// 성공 응답
interface SuccessResponse<T> {
  data: T;
  status: 'success';
  timestamp: string;
}

// 에러 응답
interface ErrorResponse {
  error: string;
  details?: any;
  status: 'error';
  timestamp: string;
}
```

### 요청/응답 검증

```typescript
// 미들웨어를 통한 입력 검증
app.use('/api/reading/*', validateReadingRequest);

function validateReadingRequest(req: Request, res: Response, next: NextFunction) {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({
      error: '질문은 필수 입력 사항입니다',
      status: 'error'
    });
  }
  next();
}
```

## ⚡ 성능 최적화

### 1. 메모리 관리

```typescript
// 싱글톤 패턴으로 메모리 효율성 확보
export class CardLoader {
  private static instance: CardLoader;
  private allCards: TarotCard[] = []; // 한 번만 로드
  
  // 지연 로딩
  public async loadAllCards(): Promise<void> {
    if (this.isLoaded) return; // 중복 로딩 방지
    // ...
  }
}
```

### 2. 캐싱 전략

```typescript
// 조합 결과 캐싱
class CombinationCache {
  private cache = new Map<string, string>();
  
  public get(key: string): string | undefined {
    return this.cache.get(key);
  }
  
  public set(key: string, value: string): void {
    // LRU 캐시 구현
    if (this.cache.size > 1000) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```

### 3. 비동기 처리

```typescript
// Promise.all을 이용한 병렬 로딩
public async loadAllCards(): Promise<void> {
  const [majorData, wandsData, cupsData, swordsData, pentaclesData] = 
    await Promise.all([
      this.loadCardFile('/data/cards/majorArcana.json'),
      this.loadCardFile('/data/cards/wands.json'),
      this.loadCardFile('/data/cards/cups.json'),
      this.loadCardFile('/data/cards/swords.json'),
      this.loadCardFile('/data/cards/pentacles.json')
    ]);
}
```

### 4. 번들 최적화

```typescript
// 동적 import로 코드 스플리팅
const performDemo = async () => {
  const { TarotAppDemo } = await import('../demo/usage');
  await TarotAppDemo.runAllDemos();
};
```

## 🔧 확장성 설계

### 1. 플러그인 아키텍처

```typescript
// 확장 가능한 스프레드 시스템
interface SpreadStrategy {
  name: string;
  cardCount: number;
  positions: string[];
  interpret(cards: SelectedCard[]): string;
}

class CustomSpreadStrategy implements SpreadStrategy {
  name = 'custom-spread';
  cardCount = 7;
  positions = ['pos1', 'pos2', ...];
  
  interpret(cards: SelectedCard[]): string {
    // 커스텀 해석 로직
    return 'Custom interpretation';
  }
}
```

### 2. 다국어 지원 준비

```typescript
// 국제화 준비
interface LocalizedCard {
  [lang: string]: {
    name: string;
    interpretations: CardInterpretations;
    keywords: string[];
  };
}

// 사용 예시
const card = {
  id: 0,
  localizations: {
    'ko': { name: '바보', ... },
    'en': { name: 'The Fool', ... },
    'ja': { name: '愚者', ... }
  }
};
```

### 3. 데이터베이스 연동 준비

```typescript
// Repository 패턴으로 데이터 소스 추상화
interface CardRepository {
  findById(id: number): Promise<TarotCard | null>;
  findAll(): Promise<TarotCard[]>;
  findBySuit(suit: Suit): Promise<TarotCard[]>;
}

class JSONCardRepository implements CardRepository {
  // JSON 파일 기반 구현
}

class DatabaseCardRepository implements CardRepository {
  // 데이터베이스 기반 구현 (향후)
}
```

### 4. 마이크로서비스 준비

```typescript
// 서비스 분리 준비
interface ReadingService {
  performReading(request: ReadingRequest): Promise<Reading>;
}

interface AnalysisService {
  analyzeQuestion(question: string): Promise<QuestionAnalysis>;
}

interface CardService {
  getCard(id: number): Promise<TarotCard>;
  getRandomCards(count: number): Promise<TarotCard[]>;
}
```

## 🛡️ 보안 및 에러 처리

### 1. 입력 검증

```typescript
// 타입 가드를 이용한 런타임 검증
function isValidCategory(category: any): category is Category {
  return ['general', 'love', 'career', 'money', 'health', 'spiritual']
    .includes(category);
}

// 사용
if (!isValidCategory(req.body.category)) {
  throw new ValidationError('Invalid category');
}
```

### 2. 에러 처리 전략

```typescript
// 계층별 에러 처리
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
  }
}

// 글로벌 에러 핸들러
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = error;
  
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});
```

### 3. 로깅 시스템

```typescript
// 구조화된 로깅
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: any;
}

class Logger {
  static info(message: string, context?: any) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context
    }));
  }
}
```

## 📈 모니터링 및 분석

### 1. 성능 메트릭

```typescript
// 응답 시간 측정
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.info(`${req.method} ${req.path} - ${duration}ms`);
  });
  
  next();
});
```

### 2. 사용 통계

```typescript
// API 호출 통계
interface ApiStats {
  endpoint: string;
  count: number;
  avgResponseTime: number;
  errorRate: number;
}

class StatsCollector {
  private stats = new Map<string, ApiStats>();
  
  record(endpoint: string, responseTime: number, isError: boolean) {
    // 통계 수집 로직
  }
}
```

## 🔮 아키텍처 장점

### 1. 확장성 (Scalability)
- 📁 **모듈화된 구조**: 각 컴포넌트 독립적 확장 가능
- 🔄 **싱글톤 패턴**: 메모리 효율적 리소스 관리
- 🎯 **전략 패턴**: 새로운 스프레드 방식 쉽게 추가

### 2. 유지보수성 (Maintainability)
- 🏗️ **계층형 아키텍처**: 관심사의 분리
- 📝 **강타입 시스템**: 컴파일 타임 에러 감지
- 🧪 **테스트 친화적**: 의존성 주입으로 테스트 용이

### 3. 성능 (Performance)
- ⚡ **지연 로딩**: 필요한 시점에만 데이터 로드
- 💾 **메모리 최적화**: 싱글톤으로 메모리 사용량 최소화
- 🔄 **비동기 처리**: Promise.all로 병렬 처리

### 4. 안정성 (Reliability)
- 🛡️ **타입 안전성**: TypeScript로 런타임 에러 방지
- 🚨 **에러 처리**: 계층별 체계적 에러 관리
- 📊 **로깅 시스템**: 문제 추적 및 디버깅 지원

---

**🏗️ 이 아키텍처는 현재 9장의 카드로 시작하여 78장 완성까지, 그리고 향후 모바일 앱과 고급 AI 기능까지 확장 가능한 견고한 기반을 제공합니다! 🔮**