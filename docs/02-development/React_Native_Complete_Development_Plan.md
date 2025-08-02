# 🚀 SoulCard React Native 완전 개발 계획서

## 📋 문서 정보
**작성일**: 2025년 8월 2일  
**버전**: v1.0 최종 계획서  
**기술 스택**: React Native + Vercel + Supabase  
**목표**: 프로덕션 레벨 iOS/Android 타로카드 앱

---

## 🏗️ **전체 아키텍처 개요**

### **기술 스택 확정**
```
📱 클라이언트: React Native (Expo)
☁️  백엔드: Supabase (PostgreSQL + Edge Functions)
🚀 배포: Vercel (API Routes + Web Dashboard)
🎨 UI: React Native Reanimated + Gesture Handler
🔒 인증: Supabase Auth (소셜 로그인)
💳 결제: Expo Payments (인앱결제)
```

### **아키텍처 다이어그램**
```
┌─────────────────────────────────┐
│     React Native App           │
│  (iOS + Android + Tablet)      │
├─────────────────────────────────┤
│ • 반응형 UI/UX                  │
│ • 3D 카드 애니메이션             │
│ • 실시간 제스처 인터랙션          │
│ • 오프라인 캐싱                 │
└─────────────┬───────────────────┘
              │ HTTP/WebSocket
              ▼
┌─────────────────────────────────┐
│         Vercel Edge             │
│     (API + Web Dashboard)       │
├─────────────────────────────────┤
│ • AI 처리 엔드포인트             │
│ • 관리자 웹 대시보드             │
│ • 글로벌 CDN                   │
│ • 서버리스 Functions            │
└─────────────┬───────────────────┘
              │ SQL + Realtime
              ▼
┌─────────────────────────────────┐
│        Supabase Cloud           │
│  (Database + Auth + Storage)    │
├─────────────────────────────────┤
│ • PostgreSQL (타로 데이터)       │
│ • 실시간 구독 (진행상태)         │
│ • 사용자 인증 + 세션 관리        │
│ • 카드 이미지 스토리지           │
│ • Row Level Security           │
└─────────────────────────────────┘
```

---

## 📁 **필수 파일 구조 및 용도**

### **🏗️ 프로젝트 루트 구조**
```
SoulCard/
├── 📱 mobile/                     # React Native 앱
├── 🌐 web/                       # Vercel 웹 대시보드  
├── 📊 supabase/                   # Supabase 설정
├── 🤖 ai-engine/                  # AI 처리 로직
├── 📚 docs/                       # 프로젝트 문서
├── 🧪 testing/                    # 테스트 파일
└── 🚀 deployment/                 # 배포 스크립트
```

### **📱 React Native 앱 구조**
```
mobile/
├── 📄 app.json                    # Expo 앱 설정
├── 📄 package.json                # 의존성 관리
├── 📄 babel.config.js             # Babel 설정
├── 📄 metro.config.js             # Metro 번들러 설정
├── 📄 tsconfig.json               # TypeScript 설정
├── 📄 .env                        # 환경 변수
├── 📁 src/
│   ├── 📁 components/             # 재사용 컴포넌트
│   │   ├── 🃏 cards/              # 타로카드 관련
│   │   │   ├── TarotCard.tsx      # 개별 카드 컴포넌트
│   │   │   ├── CardDeck.tsx       # 카드덱 관리
│   │   │   ├── CardAnimation.tsx  # 3D 애니메이션
│   │   │   └── CardSelector.tsx   # 카드 선택 UI
│   │   ├── 🎨 ui/                 # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx         # 커스텀 버튼
│   │   │   ├── Modal.tsx          # 모달 컴포넌트
│   │   │   ├── LoadingSpinner.tsx # 로딩 인디케이터
│   │   │   └── ProgressBar.tsx    # 진행률 표시
│   │   └── 🔄 animations/         # 애니메이션 컴포넌트
│   │       ├── FadeIn.tsx         # 페이드 인 효과
│   │       ├── SlideUp.tsx        # 슬라이드 업 효과
│   │       └── ParticleEffect.tsx # 파티클 효과
│   ├── 📁 screens/                # 화면 컴포넌트
│   │   ├── 🏠 home/               # 홈 관련 화면
│   │   │   ├── HomeScreen.tsx     # 메인 홈
│   │   │   ├── DailyCardScreen.tsx # 오늘의 카드
│   │   │   └── QuickReadingScreen.tsx # 빠른 리딩
│   │   ├── 🔮 consultation/       # 상담 화면
│   │   │   ├── CategoryScreen.tsx  # 카테고리 선택
│   │   │   ├── QuestionScreen.tsx  # 질문 입력
│   │   │   ├── CardSelectionScreen.tsx # 카드 선택
│   │   │   └── ResultScreen.tsx    # 결과 화면
│   │   ├── 🔐 auth/               # 인증 화면
│   │   │   ├── LoginScreen.tsx    # 로그인
│   │   │   ├── SignupScreen.tsx   # 회원가입
│   │   │   └── OnboardingScreen.tsx # 온보딩
│   │   ├── 👤 profile/            # 프로필 화면
│   │   │   ├── ProfileScreen.tsx  # 프로필 메인
│   │   │   ├── SettingsScreen.tsx # 설정
│   │   │   └── HistoryScreen.tsx  # 상담 기록
│   │   └── 💳 payment/            # 결제 화면
│   │       ├── TokenScreen.tsx    # 토큰 구매
│   │       ├── SubscriptionScreen.tsx # 구독 관리
│   │       └── PaymentScreen.tsx  # 결제 처리
│   ├── 📁 navigation/             # 네비게이션 설정
│   │   ├── AppNavigator.tsx       # 메인 네비게이터
│   │   ├── AuthNavigator.tsx      # 인증 네비게이터
│   │   ├── TabNavigator.tsx       # 탭 네비게이터
│   │   └── StackNavigator.tsx     # 스택 네비게이터
│   ├── 📁 services/               # 서비스 레이어
│   │   ├── 🔗 api/                # API 연동
│   │   │   ├── supabase.ts        # Supabase 클라이언트
│   │   │   ├── tarotApi.ts        # 타로 API
│   │   │   ├── authApi.ts         # 인증 API
│   │   │   └── paymentApi.ts      # 결제 API
│   │   ├── 💾 storage/            # 로컬 스토리지
│   │   │   ├── AsyncStorage.ts    # 비동기 저장소
│   │   │   ├── SecureStorage.ts   # 보안 저장소
│   │   │   └── CacheManager.ts    # 캐시 관리
│   │   └── 🔔 notifications/      # 알림 서비스
│   │       ├── PushNotifications.ts # 푸시 알림
│   │       └── LocalNotifications.ts # 로컬 알림
│   ├── 📁 hooks/                  # 커스텀 훅
│   │   ├── useAuth.ts             # 인증 훅
│   │   ├── useTarotReading.ts     # 타로 리딩 훅
│   │   ├── useRealtimeUpdates.ts  # 실시간 업데이트
│   │   └── useDeviceInfo.ts       # 디바이스 정보
│   ├── 📁 store/                  # 상태 관리
│   │   ├── authStore.ts           # 인증 상태
│   │   ├── tarotStore.ts          # 타로 상태
│   │   ├── uiStore.ts             # UI 상태
│   │   └── settingsStore.ts       # 설정 상태
│   ├── 📁 types/                  # TypeScript 타입
│   │   ├── auth.ts                # 인증 타입
│   │   ├── tarot.ts               # 타로 타입
│   │   ├── api.ts                 # API 응답 타입
│   │   └── navigation.ts          # 네비게이션 타입
│   ├── 📁 utils/                  # 유틸리티 함수
│   │   ├── validation.ts          # 입력 검증
│   │   ├── formatting.ts          # 데이터 포맷팅
│   │   ├── constants.ts           # 상수 정의
│   │   └── helpers.ts             # 헬퍼 함수
│   ├── 📁 styles/                 # 스타일 정의
│   │   ├── colors.ts              # 컬러 팔레트
│   │   ├── typography.ts          # 타이포그래피
│   │   ├── spacing.ts             # 간격 시스템
│   │   └── themes.ts              # 테마 정의
│   └── 📁 assets/                 # 정적 리소스
│       ├── 🖼️ images/             # 이미지 파일
│       ├── 🎵 sounds/             # 사운드 파일
│       ├── 🎨 icons/              # 아이콘 파일
│       └── 🔤 fonts/              # 폰트 파일
└── 📁 ios/                        # iOS 네이티브 코드
└── 📁 android/                    # Android 네이티브 코드
```

### **🌐 Vercel 웹 대시보드 구조**
```
web/
├── 📄 package.json                # 웹 의존성
├── 📄 next.config.js              # Next.js 설정
├── 📄 tailwind.config.js          # Tailwind CSS 설정
├── 📄 vercel.json                 # Vercel 배포 설정
├── 📁 pages/
│   ├── 📄 index.tsx               # 관리자 대시보드 메인
│   ├── 📁 api/                    # API 엔드포인트
│   │   ├── tarot/
│   │   │   ├── reading.ts         # 타로 리딩 API
│   │   │   └── interpretation.ts  # 해석 생성 API
│   │   ├── auth/
│   │   │   ├── login.ts           # 관리자 로그인
│   │   │   └── verify.ts          # 토큰 검증
│   │   ├── analytics/
│   │   │   ├── users.ts           # 사용자 분석
│   │   │   └── readings.ts        # 리딩 통계
│   │   └── payments/
│   │       ├── webhook.ts         # 결제 웹훅
│   │       └── validate.ts        # 영수증 검증
│   ├── 📁 dashboard/              # 관리자 페이지
│   │   ├── users.tsx              # 사용자 관리
│   │   ├── analytics.tsx          # 분석 대시보드
│   │   ├── content.tsx            # 콘텐츠 관리
│   │   └── settings.tsx           # 시스템 설정
│   └── 📁 auth/
│       └── admin-login.tsx        # 관리자 로그인
├── 📁 components/                 # 웹 컴포넌트
│   ├── Dashboard.tsx              # 대시보드 레이아웃
│   ├── UserTable.tsx              # 사용자 테이블
│   ├── AnalyticsChart.tsx         # 분석 차트
│   └── ContentEditor.tsx          # 콘텐츠 편집기
└── 📁 lib/
    ├── supabase-admin.ts          # Supabase 관리자 클라이언트
    ├── ai-processor.ts            # AI 처리 로직
    └── analytics.ts               # 분석 유틸리티
```

### **📊 Supabase 설정 구조**
```
supabase/
├── 📄 config.toml                 # Supabase 설정
├── 📁 migrations/                 # 데이터베이스 마이그레이션
│   ├── 001_create_users.sql       # 사용자 테이블
│   ├── 002_create_tarot_cards.sql # 타로카드 테이블
│   ├── 003_create_readings.sql    # 리딩 기록 테이블
│   ├── 004_create_payments.sql    # 결제 기록 테이블
│   └── 005_create_rls.sql         # Row Level Security
├── 📁 functions/                  # Edge Functions
│   ├── ai-interpretation/         # AI 해석 생성
│   │   ├── index.ts               # 메인 함수
│   │   └── deno.json              # Deno 설정
│   ├── payment-webhook/           # 결제 웹훅 처리
│   │   ├── index.ts               # 웹훅 핸들러
│   │   └── deno.json              # Deno 설정
│   └── realtime-progress/         # 실시간 진행상태
│       ├── index.ts               # 실시간 업데이트
│       └── deno.json              # Deno 설정
├── 📁 seed/                       # 초기 데이터
│   ├── tarot_cards.sql            # 78장 타로카드 데이터
│   ├── consultation_types.sql     # 상담 유형 데이터
│   └── sample_users.sql           # 테스트 사용자 데이터
└── 📁 types/                      # 데이터베이스 타입
    └── database.ts                # 자동 생성된 타입
```

### **🤖 AI 엔진 구조**
```
ai-engine/
├── 📄 package.json                # AI 의존성
├── 📁 src/
│   ├── 📁 engines/                # AI 처리 엔진
│   │   ├── comprehensiveTarotEngine.ts # 종합 타로 엔진
│   │   ├── aiNarrativeEngine.ts   # 스토리텔링 엔진
│   │   ├── emotionAnalyzer.ts     # 감정 분석
│   │   └── psychologyAnalyzer.ts  # 심리 분석
│   ├── 📁 models/                 # AI 모델 관리
│   │   ├── cardMeanings.ts        # 카드 의미 데이터
│   │   ├── spreadLayouts.ts       # 스프레드 레이아웃
│   │   └── interpretationRules.ts # 해석 규칙
│   ├── 📁 services/               # AI 서비스
│   │   ├── ollamaClient.ts        # Ollama LLM 클라이언트
│   │   ├── xaiClient.ts           # xAI API 클라이언트
│   │   └── fallbackEngine.ts     # 대체 엔진
│   └── 📁 utils/                  # AI 유틸리티
│       ├── textProcessor.ts       # 텍스트 처리
│       ├── promptBuilder.ts       # 프롬프트 생성
│       └── responseFormatter.ts   # 응답 포맷팅
└── 📁 tests/                      # AI 엔진 테스트
    ├── engine.test.ts             # 엔진 테스트
    ├── interpretation.test.ts     # 해석 테스트
    └── performance.test.ts        # 성능 테스트
```

---

## 🎯 **프론트엔드 디테일 개발 순서**

### **Phase 1: 개발 환경 구축 (1주차)**

#### **Day 1-2: 프로젝트 초기화**
```bash
# 1. Expo 프로젝트 생성
npx create-expo-app@latest SoulCard --template blank-typescript
cd SoulCard

# 2. 핵심 의존성 설치
npx expo install react-native-reanimated
npx expo install react-native-gesture-handler
npx expo install @react-navigation/native
npx expo install @react-navigation/stack
npx expo install @react-navigation/bottom-tabs
npx expo install react-native-safe-area-context
npx expo install react-native-screens

# 3. UI 라이브러리
npx expo install @react-native-blur/blur
npx expo install react-native-linear-gradient
npx expo install lottie-react-native
npx expo install react-native-svg

# 4. 백엔드 연동
npx expo install @supabase/supabase-js
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-url-polyfill

# 5. 개발 도구
npm install --save-dev @types/react
npm install --save-dev prettier eslint
```

#### **Day 3-4: 기본 구조 설정**
```typescript
// 1. 프로젝트 구조 생성
src/
├── components/
├── screens/
├── navigation/
├── services/
├── hooks/
├── store/
├── types/
├── utils/
├── styles/
└── assets/

// 2. TypeScript 설정 강화
// tsconfig.json 업데이트
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/screens/*": ["src/screens/*"],
      "@/services/*": ["src/services/*"]
    }
  }
}

// 3. 절대 경로 import 설정
// babel.config.js 업데이트
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
```

#### **Day 5-7: 디자인 시스템 구축**
```typescript
// 1. 컬러 시스템 정의
// src/styles/colors.ts
export const colors = {
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    500: '#6366F1',
    600: '#4F46E5',
    900: '#312E81',
  },
  secondary: {
    500: '#A855F7',
    600: '#7C3AED',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    900: '#171717',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  }
};

// 2. 타이포그래피 시스템
// src/styles/typography.ts
export const typography = {
  heading: {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  },
  body: {
    large: { fontSize: 18, fontWeight: '400', lineHeight: 28 },
    medium: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    small: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  }
};

// 3. 간격 시스템
// src/styles/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 4. 기본 컴포넌트 생성
// src/components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  onPress: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onPress,
  children
}) => {
  // 구현
};
```

### **Phase 2: 핵심 UI 컴포넌트 (2주차)**

#### **Day 8-10: 타로카드 컴포넌트**
```typescript
// 1. 기본 카드 컴포넌트
// src/components/cards/TarotCard.tsx
interface TarotCardProps {
  card: TarotCardData;
  size: number;
  isRevealed: boolean;
  onPress: () => void;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  card,
  size,
  isRevealed,
  onPress
}) => {
  const rotateY = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotateY.value}deg` }
    ]
  }));
  
  useEffect(() => {
    rotateY.value = withTiming(isRevealed ? 180 : 0, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)
    });
  }, [isRevealed]);
  
  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.card, animatedStyle, { width: size, height: size * 1.5 }]}>
        {/* 카드 앞면/뒷면 구현 */}
      </Animated.View>
    </Pressable>
  );
};

// 2. 카드 덱 관리자
// src/components/cards/CardDeck.tsx
export const CardDeck: React.FC = () => {
  const [cards, setCards] = useState<TarotCardData[]>([]);
  const [shuffling, setShuffling] = useState(false);
  
  const shuffleCards = useCallback(() => {
    setShuffling(true);
    // 셔플 애니메이션 구현
    setTimeout(() => {
      setCards(prev => [...prev].sort(() => Math.random() - 0.5));
      setShuffling(false);
    }, 1500);
  }, []);
  
  return (
    <View style={styles.deckContainer}>
      {/* 카드 덱 렌더링 */}
    </View>
  );
};

// 3. 카드 선택 그리드
// src/components/cards/CardSelector.tsx
export const CardSelector: React.FC = () => {
  const device = useDeviceInfo();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  
  const gridConfig = useMemo(() => {
    if (device.isTablet) {
      return { columns: 5, cardSize: 120 };
    } else if (device.orientation === 'landscape') {
      return { columns: 6, cardSize: 80 };
    } else {
      return { columns: 3, cardSize: 100 };
    }
  }, [device]);
  
  return (
    <FlatList
      numColumns={gridConfig.columns}
      data={availableCards}
      renderItem={({ item }) => (
        <TarotCard
          card={item}
          size={gridConfig.cardSize}
          isRevealed={selectedCards.includes(item.id)}
          onPress={() => handleCardSelect(item.id)}
        />
      )}
    />
  );
};
```

#### **Day 11-14: 애니메이션 시스템**
```typescript
// 1. 공통 애니메이션 훅
// src/hooks/useAnimations.ts
export const useCardFlip = () => {
  const rotateY = useSharedValue(0);
  
  const flipCard = useCallback((shouldFlip: boolean) => {
    rotateY.value = withSpring(shouldFlip ? 180 : 0, {
      damping: 15,
      stiffness: 100
    });
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }]
  }));
  
  return { flipCard, animatedStyle };
};

// 2. 제스처 핸들러
// src/components/cards/InteractiveCard.tsx
export const InteractiveCard: React.FC = ({ card, onSelect }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  
  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 50) {
        runOnJS(onSelect)(card.id);
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });
    
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ]
  }));
  
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        <TarotCard card={card} />
      </Animated.View>
    </GestureDetector>
  );
};

// 3. 파티클 효과
// src/components/animations/ParticleEffect.tsx
export const ParticleEffect: React.FC = () => {
  const particles = useRef<ParticleData[]>([]);
  
  useEffect(() => {
    // 파티클 시스템 초기화
    particles.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: Math.random(),
      speed: Math.random() * 2 + 1
    }));
  }, []);
  
  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      {/* 파티클 렌더링 */}
    </Canvas>
  );
};
```

### **Phase 3: 화면 구현 (3주차)**

#### **Day 15-17: 인증 화면**
```typescript
// 1. 온보딩 플로우
// src/screens/auth/OnboardingScreen.tsx
export const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const steps = [
    {
      title: "환영합니다",
      description: "AI와 함께하는 타로 여행",
      image: require('@/assets/onboarding1.png')
    },
    // 추가 스텝들...
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <OnboardingStep step={steps[currentStep]} />
      </Animated.View>
      <OnboardingNavigation 
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={() => setCurrentStep(prev => prev + 1)}
        onPrev={() => setCurrentStep(prev => prev - 1)}
      />
    </SafeAreaView>
  );
};

// 2. 로그인 화면
// src/screens/auth/LoginScreen.tsx
export const LoginScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  
  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setIsLoading(true);
      await signIn(provider);
    } catch (error) {
      Alert.alert('로그인 실패', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🔮</Text>
        <Text style={styles.title}>SoulCard</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <SocialLoginButton
          provider="google"
          onPress={() => handleSocialLogin('google')}
          disabled={isLoading}
        />
        {Platform.OS === 'ios' && (
          <SocialLoginButton
            provider="apple"
            onPress={() => handleSocialLogin('apple')}
            disabled={isLoading}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
```

#### **Day 18-21: 상담 화면 플로우**
```typescript
// 1. 카테고리 선택
// src/screens/consultation/CategoryScreen.tsx
export const CategoryScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation();
  
  const categories = [
    { id: 'love', name: '연애', icon: '💕', color: colors.love },
    { id: 'career', name: '직업', icon: '💼', color: colors.career },
    // 추가 카테고리들...
  ];
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>어떤 분야가 궁금하신가요?</Text>
      <View style={styles.categoryGrid}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={() => setSelectedCategory(category.id)}
            animationDelay={index * 100}
          />
        ))}
      </View>
      
      {selectedCategory && (
        <Button
          variant="primary"
          onPress={() => navigation.navigate('Question', { category: selectedCategory })}
        >
          다음 단계로
        </Button>
      )}
    </ScrollView>
  );
};

// 2. 질문 입력
// src/screens/consultation/QuestionScreen.tsx
export const QuestionScreen: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [suggestions] = useState([
    "현재 연인과의 관계는 어떻게 발전할까요?",
    "새로운 직장에서 성공할 수 있을까요?",
    // 추가 제안들...
  ]);
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>구체적인 질문을 입력해주세요</Text>
      
      <TextInput
        style={styles.questionInput}
        value={question}
        onChangeText={setQuestion}
        placeholder="궁금한 것을 자유롭게 질문해보세요..."
        multiline
        maxLength={200}
      />
      
      <Text style={styles.counter}>{question.length}/200</Text>
      
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>💡 질문 예시</Text>
        {suggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            text={suggestion}
            onPress={() => setQuestion(suggestion)}
          />
        ))}
      </View>
      
      <Button
        variant="primary"
        disabled={question.trim().length < 10}
        onPress={() => navigation.navigate('CardSelection', { question })}
      >
        카드 선택하기
      </Button>
    </KeyboardAvoidingView>
  );
};

// 3. 카드 선택
// src/screens/consultation/CardSelectionScreen.tsx
export const CardSelectionScreen: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(true);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [availableCards, setAvailableCards] = useState<TarotCardData[]>([]);
  const { consultationType } = useRoute().params;
  
  useEffect(() => {
    // 카드 셔플 애니메이션
    setTimeout(() => {
      const shuffled = shuffleArray(ALL_TAROT_CARDS);
      setAvailableCards(shuffled.slice(0, 12));
      setIsShuffling(false);
    }, 2000);
  }, []);
  
  if (isShuffling) {
    return <ShufflingAnimation />;
  }
  
  return (
    <View style={styles.container}>
      <ProgressIndicator 
        current={selectedCards.length} 
        total={consultationType.cardCount} 
      />
      
      <Text style={styles.instruction}>
        직감에 따라 {consultationType.cardCount}장의 카드를 선택해주세요
      </Text>
      
      <CardSelector
        cards={availableCards}
        selectedCards={selectedCards}
        maxSelection={consultationType.cardCount}
        onCardSelect={handleCardSelect}
      />
    </View>
  );
};
```

### **Phase 4: 백엔드 연동 (4주차)**

#### **Day 22-24: Supabase 연동**
```typescript
// 1. Supabase 클라이언트 설정
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 2. 인증 서비스
// src/services/authService.ts
export class AuthService {
  static async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'soulcard://auth/callback'
      }
    });
    
    if (error) throw error;
    return data;
  }
  
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
  
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}

// 3. 타로 서비스
// src/services/tarotService.ts
export class TarotService {
  static async createReading(data: CreateReadingRequest) {
    const { data: reading, error } = await supabase
      .from('readings')
      .insert({
        user_id: data.userId,
        category: data.category,
        question: data.question,
        consultation_type: data.consultationType,
        status: 'pending'
      })
      .select()
      .single();
      
    if (error) throw error;
    return reading;
  }
  
  static async getReadingResult(readingId: string) {
    const { data, error } = await supabase
      .from('readings')
      .select('*')
      .eq('id', readingId)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  static subscribeToReading(readingId: string, callback: (data: any) => void) {
    return supabase
      .channel(`reading:${readingId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'readings',
        filter: `id=eq.${readingId}`
      }, callback)
      .subscribe();
  }
}
```

#### **Day 25-28: 실시간 기능 구현**
```typescript
// 1. 실시간 진행상태 훅
// src/hooks/useRealtimeReading.ts
export const useRealtimeReading = (readingId: string) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [result, setResult] = useState<ReadingResult | null>(null);
  
  useEffect(() => {
    if (!readingId) return;
    
    const subscription = TarotService.subscribeToReading(
      readingId,
      (payload) => {
        const newData = payload.new;
        setProgress(newData.progress || 0);
        setCurrentStep(newData.current_step || '');
        
        if (newData.status === 'completed') {
          setResult(newData.result);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [readingId]);
  
  return { progress, currentStep, result };
};

// 2. 진행상태 UI 컴포넌트
// src/components/ui/ReadingProgress.tsx
export const ReadingProgress: React.FC<{ readingId: string }> = ({ readingId }) => {
  const { progress, currentStep } = useRealtimeReading(readingId);
  
  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>{currentStep}</Text>
      
      <View style={styles.progressBar}>
        <Animated.View 
          style={[
            styles.progressFill,
            { width: `${progress}%` }
          ]}
        />
      </View>
      
      <Text style={styles.percentText}>{progress}%</Text>
      
      {progress < 100 && <LoadingSpinner />}
    </View>
  );
};

// 3. AI 처리 요청
// src/services/aiService.ts
export class AIService {
  static async requestInterpretation(readingData: ReadingData) {
    try {
      const response = await fetch('/api/ai/interpretation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAccessToken()}`
        },
        body: JSON.stringify(readingData)
      });
      
      if (!response.ok) {
        throw new Error('AI 처리 실패');
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI 서비스 오류:', error);
      throw error;
    }
  }
}
```

---

## 🔧 **백엔드 디테일 개발 순서**

### **Phase 1: Supabase 데이터베이스 설계 (1주차)**

#### **Day 1-3: 데이터베이스 스키마 설계**
```sql
-- 1. 사용자 프로필 테이블
-- supabase/migrations/001_create_user_profiles.sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_type TEXT DEFAULT 'free' CHECK (subscription_type IN ('free', 'premium', 'pro')),
  tokens_remaining INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 타로카드 마스터 데이터
-- supabase/migrations/002_create_tarot_cards.sql
CREATE TABLE tarot_cards (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  suit TEXT NOT NULL CHECK (suit IN ('major', 'cups', 'wands', 'swords', 'pentacles')),
  number INTEGER,
  keywords TEXT[],
  meanings JSONB NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 상담 카테고리
-- supabase/migrations/003_create_consultation_categories.sql
CREATE TABLE consultation_categories (
  id TEXT PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 4. 상담 타입
-- supabase/migrations/004_create_consultation_types.sql
CREATE TABLE consultation_types (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES consultation_categories(id),
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  card_count INTEGER NOT NULL,
  estimated_duration INTEGER, -- 분 단위
  is_popular BOOLEAN DEFAULT false,
  token_cost INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true
);

-- 5. 리딩 기록
-- supabase/migrations/005_create_readings.sql
CREATE TABLE readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  category_id TEXT REFERENCES consultation_categories(id),
  consultation_type_id TEXT REFERENCES consultation_types(id),
  question TEXT NOT NULL,
  selected_cards JSONB NOT NULL,
  interpretation JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0,
  current_step TEXT,
  tokens_used INTEGER DEFAULT 1,
  processing_start_time TIMESTAMP WITH TIME ZONE,
  processing_end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 결제 기록
-- supabase/migrations/006_create_payments.sql
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  product_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  transaction_id TEXT NOT NULL,
  receipt_data TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'KRW',
  tokens_purchased INTEGER,
  subscription_months INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Day 4-7: Row Level Security (RLS) 설정**
```sql
-- supabase/migrations/007_setup_rls.sql

-- 1. RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 2. 사용자 프로필 정책
CREATE POLICY "Users can view own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON user_profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. 리딩 기록 정책
CREATE POLICY "Users can view own readings" 
ON readings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own readings" 
ON readings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 4. 결제 기록 정책
CREATE POLICY "Users can view own payments" 
ON payments FOR SELECT 
USING (auth.uid() = user_id);

-- 5. 공개 데이터 정책 (타로카드, 카테고리 등)
CREATE POLICY "Anyone can view tarot cards" 
ON tarot_cards FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view consultation categories" 
ON consultation_categories FOR SELECT 
USING (true);

-- 6. 관리자 정책
CREATE POLICY "Admins can manage all data" 
ON readings FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND email = ANY(ARRAY['admin@soulcard.app'])
  )
);
```

### **Phase 2: Supabase Edge Functions (2주차)**

#### **Day 8-10: AI 해석 엔진 Edge Function**
```typescript
// supabase/functions/ai-interpretation/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface ReadingRequest {
  readingId: string;
  question: string;
  selectedCards: Array<{
    id: string;
    position: string;
    isReversed: boolean;
  }>;
  category: string;
  consultationType: string;
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { readingId, question, selectedCards, category }: ReadingRequest = await req.json();
    
    // Supabase 클라이언트 초기화
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 진행상태 업데이트: 0%
    await updateProgress(supabase, readingId, 0, '질문 분석 중...');

    // 1. 질문 분석
    const questionAnalysis = await analyzeQuestion(question, category);
    await updateProgress(supabase, readingId, 25, '카드 해석 중...');

    // 2. 개별 카드 해석
    const cardInterpretations = await interpretCards(selectedCards, questionAnalysis);
    await updateProgress(supabase, readingId, 50, '전체 스토리 구성 중...');

    // 3. 전체 스토리 생성
    const overallInterpretation = await generateOverallStory(
      question,
      cardInterpretations,
      category
    );
    await updateProgress(supabase, readingId, 75, '조언 생성 중...');

    // 4. 조언 및 마무리
    const advice = await generateAdvice(overallInterpretation, category);
    await updateProgress(supabase, readingId, 90, '결과 저장 중...');

    // 5. 최종 결과 저장
    const finalResult = {
      question,
      selectedCards,
      cardInterpretations,
      overallInterpretation,
      advice,
      timestamp: new Date().toISOString()
    };

    await supabase
      .from('readings')
      .update({
        interpretation: finalResult,
        status: 'completed',
        progress: 100,
        current_step: '완료',
        processing_end_time: new Date().toISOString()
      })
      .eq('id', readingId);

    return new Response(JSON.stringify({ success: true, result: finalResult }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('AI 처리 오류:', error);
    
    // 오류 상태 업데이트
    if (readingId) {
      await supabase
        .from('readings')
        .update({
          status: 'failed',
          current_step: '처리 실패'
        })
        .eq('id', readingId);
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// 헬퍼 함수들
async function updateProgress(supabase: any, readingId: string, progress: number, step: string) {
  await supabase
    .from('readings')
    .update({
      progress,
      current_step: step,
      updated_at: new Date().toISOString()
    })
    .eq('id', readingId);
}

async function analyzeQuestion(question: string, category: string) {
  // 질문 감정 분석, 키워드 추출 등
  const emotionalTone = await detectEmotionalTone(question);
  const keywords = extractKeywords(question);
  
  return {
    emotionalTone,
    keywords,
    category,
    questionType: categorizeQuestion(question)
  };
}

async function interpretCards(selectedCards: any[], questionAnalysis: any) {
  const interpretations = [];
  
  for (const card of selectedCards) {
    const cardData = await getCardData(card.id);
    const interpretation = await generateCardInterpretation(
      cardData,
      card.position,
      card.isReversed,
      questionAnalysis
    );
    
    interpretations.push({
      card: cardData,
      position: card.position,
      isReversed: card.isReversed,
      interpretation
    });
  }
  
  return interpretations;
}

async function generateOverallStory(question: string, cardInterpretations: any[], category: string) {
  // xAI API 또는 로컬 LLM을 사용하여 전체 스토리 생성
  const prompt = buildStoryPrompt(question, cardInterpretations, category);
  
  try {
    // xAI API 호출
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('XAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      })
    });
    
    const result = await response.json();
    return result.choices[0].message.content;
    
  } catch (error) {
    console.error('xAI API 오류:', error);
    // 폴백: 룰 기반 해석
    return generateRuleBasedInterpretation(cardInterpretations);
  }
}
```

#### **Day 11-14: 결제 웹훅 처리**
```typescript
// supabase/functions/payment-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    const body = await req.text();
    
    // 웹훅 서명 검증
    const isValid = await verifyWebhookSignature(body, signature);
    if (!isValid) {
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(supabase, event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        await handleSubscriptionPayment(supabase, event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCancellation(supabase, event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('웹훅 처리 오류:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

async function handlePaymentSuccess(supabase: any, paymentIntent: any) {
  const { customer, amount, metadata } = paymentIntent;
  
  // 결제 기록 업데이트
  await supabase
    .from('payments')
    .update({
      status: 'completed',
      verified_at: new Date().toISOString()
    })
    .eq('transaction_id', paymentIntent.id);

  // 사용자 토큰 추가
  if (metadata.tokens) {
    await supabase.rpc('add_user_tokens', {
      user_id: metadata.user_id,
      token_amount: parseInt(metadata.tokens)
    });
  }

  // 구독 업데이트
  if (metadata.subscription_type) {
    await supabase
      .from('user_profiles')
      .update({
        subscription_type: metadata.subscription_type
      })
      .eq('id', metadata.user_id);
  }
}
```

### **Phase 3: Vercel API 백엔드 (3주차)**

#### **Day 15-17: API Routes 구현**
```typescript
// web/pages/api/tarot/reading.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // JWT 토큰 검증
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = await verifyJWT(token);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { category, consultationType, question } = req.body;

    // Supabase 클라이언트
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 사용자 토큰 확인
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('tokens_remaining, subscription_type')
      .eq('id', user.id)
      .single();

    if (!userProfile || userProfile.tokens_remaining < 1) {
      return res.status(402).json({ 
        error: 'Insufficient tokens',
        tokensRemaining: userProfile?.tokens_remaining || 0
      });
    }

    // 리딩 생성
    const { data: reading, error } = await supabase
      .from('readings')
      .insert({
        user_id: user.id,
        category_id: category,
        consultation_type_id: consultationType,
        question,
        status: 'pending',
        processing_start_time: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // 토큰 차감
    await supabase
      .from('user_profiles')
      .update({
        tokens_remaining: userProfile.tokens_remaining - 1
      })
      .eq('id', user.id);

    // AI 처리 Edge Function 호출
    const aiResponse = await fetch(`${process.env.SUPABASE_URL}/functions/v1/ai-interpretation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        readingId: reading.id,
        question,
        category,
        consultationType
      })
    });

    if (!aiResponse.ok) {
      throw new Error('AI 처리 요청 실패');
    }

    res.status(200).json({
      success: true,
      readingId: reading.id,
      message: 'AI 해석 처리가 시작되었습니다.'
    });

  } catch (error) {
    console.error('API 오류:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

// web/pages/api/auth/verify.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // 사용자 프로필 조회
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profile
      }
    });

  } catch (error) {
    console.error('토큰 검증 오류:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

#### **Day 18-21: 관리자 대시보드**
```typescript
// web/pages/dashboard/analytics.tsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReadings: 0,
    revenue: 0,
    activeSubscriptions: 0
  });
  
  const [chartData, setChartData] = useState({
    dailyReadings: {},
    categoryBreakdown: {},
    revenueByMonth: {}
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 기본 통계
    const [usersCount, readingsCount, paymentsSum, subscriptionsCount] = await Promise.all([
      supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
      supabase.from('readings').select('id', { count: 'exact', head: true }),
      supabase.from('payments').select('amount_cents').eq('status', 'completed'),
      supabase.from('user_profiles').select('id', { count: 'exact', head: true }).neq('subscription_type', 'free')
    ]);

    setStats({
      totalUsers: usersCount.count || 0,
      totalReadings: readingsCount.count || 0,
      revenue: paymentsSum.data?.reduce((sum, p) => sum + p.amount_cents, 0) || 0,
      activeSubscriptions: subscriptionsCount.count || 0
    });

    // 차트 데이터 fetch
    await fetchChartData(supabase);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">분석 대시보드</h1>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="총 사용자" value={stats.totalUsers} icon="👥" />
        <StatCard title="총 리딩" value={stats.totalReadings} icon="🔮" />
        <StatCard title="매출" value={`₩${(stats.revenue / 100).toLocaleString()}`} icon="💰" />
        <StatCard title="구독자" value={stats.activeSubscriptions} icon="⭐" />
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">일별 리딩 수</h3>
          <Line data={chartData.dailyReadings} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">카테고리별 분포</h3>
          <Doughnut data={chartData.categoryBreakdown} />
        </div>
      </div>
    </div>
  );
}

// web/pages/dashboard/users.tsx
export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 50 });

  const fetchUsers = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        readings:readings(count),
        payments:payments(count)
      `)
      .range(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit - 1
      )
      .order('created_at', { ascending: false });

    if (!error) {
      setUsers(data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">사용자 관리</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                사용자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                구독
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                토큰
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                리딩 수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                가입일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={user.avatar_url || '/default-avatar.png'} 
                        alt="" 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.full_name || '이름 없음'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.subscription_type === 'free' 
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.subscription_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.tokens_remaining}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.readings?.[0]?.count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### **Phase 4: 배포 및 운영 (4주차)**

#### **Day 22-24: 배포 설정**
```yaml
# deployment/docker-compose.yml
version: '3.8'

services:
  mobile-app:
    build:
      context: ./mobile
      dockerfile: Dockerfile.expo
    ports:
      - "19000:19000"
      - "19001:19001"
      - "19002:19002"
    environment:
      - EXPO_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - EXPO_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    volumes:
      - ./mobile:/app
      - /app/node_modules
    command: npm start

  web-dashboard:
    build:
      context: ./web
      dockerfile: Dockerfile.nextjs
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - XAI_API_KEY=${XAI_API_KEY}
    depends_on:
      - mobile-app

# deployment/vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/web/pages/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/web/$1"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key",
    "XAI_API_KEY": "@xai-api-key"
  },
  "functions": {
    "web/pages/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### **Day 25-28: 모니터링 및 알림 시스템**
```typescript
// web/lib/monitoring.ts
import { createClient } from '@supabase/supabase-js';

export class MonitoringService {
  private static supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  static async trackEvent(eventName: string, userId?: string, metadata?: any) {
    try {
      await this.supabase
        .from('analytics_events')
        .insert({
          event_name: eventName,
          user_id: userId,
          metadata,
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      console.error('이벤트 추적 실패:', error);
    }
  }

  static async checkSystemHealth() {
    const checks = {
      database: await this.checkDatabase(),
      aiService: await this.checkAIService(),
      paymentSystem: await this.checkPaymentSystem()
    };

    const overallHealth = Object.values(checks).every(check => check.status === 'healthy');

    if (!overallHealth) {
      await this.sendAlert('시스템 상태 이상', checks);
    }

    return checks;
  }

  private static async checkDatabase() {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('id')
        .limit(1);

      return {
        service: 'database',
        status: error ? 'unhealthy' : 'healthy',
        response_time: Date.now(),
        error: error?.message
      };
    } catch (error) {
      return {
        service: 'database',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  private static async sendAlert(title: string, details: any) {
    // Slack, Discord, 이메일 등으로 알림 발송
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 ${title}`,
          attachments: [{
            color: 'danger',
            text: JSON.stringify(details, null, 2)
          }]
        })
      });
    }
  }
}

// deployment/monitoring/health-check.ts
export const healthCheckHandler = async () => {
  const health = await MonitoringService.checkSystemHealth();
  
  return {
    timestamp: new Date().toISOString(),
    status: Object.values(health).every(check => check.status === 'healthy') ? 'healthy' : 'unhealthy',
    services: health
  };
};
```

---

## 📊 **최종 배포 체크리스트**

### **🔐 보안 체크리스트**
- [ ] 모든 API 키 환경변수 처리
- [ ] Row Level Security (RLS) 설정 완료
- [ ] JWT 토큰 검증 구현
- [ ] SQL Injection 방지
- [ ] XSS 방지 설정
- [ ] HTTPS 강제 설정
- [ ] 민감한 정보 로깅 방지

### **📱 모바일 앱 체크리스트**
- [ ] iOS 앱스토어 빌드 테스트
- [ ] Android Play Store 빌드 테스트
- [ ] 다양한 디바이스 테스트 (폰/태블릿)
- [ ] 오프라인 모드 테스트
- [ ] 메모리 누수 검사
- [ ] 배터리 소모 최적화
- [ ] 네트워크 오류 처리

### **🌐 백엔드 체크리스트**
- [ ] API 응답 시간 최적화 (< 2초)
- [ ] 동시 사용자 부하 테스트
- [ ] 데이터베이스 인덱싱 최적화
- [ ] 에러 처리 및 로깅
- [ ] 백업 및 복구 계획
- [ ] 모니터링 대시보드 설정
- [ ] 알림 시스템 구축

### **💳 결제 시스템 체크리스트**
- [ ] 인앱결제 테스트 (iOS/Android)
- [ ] 영수증 검증 시스템
- [ ] 환불 처리 플로우
- [ ] 구독 관리 시스템
- [ ] 결제 실패 처리
- [ ] 보안 PCI DSS 준수
- [ ] 세금 계산 로직

---

## 🎯 **성공 지표 (KPI)**

### **사용자 관련**
- DAU (일간 활성 사용자): 목표 1,000명
- MAU (월간 활성 사용자): 목표 10,000명
- 사용자 유지율: 목표 70% (1개월)
- 앱 평점: 목표 4.5+ (iOS/Android)

### **비즈니스 관련**
- 무료→유료 전환율: 목표 15%
- 월간 매출: 목표 1,000만원
- 평균 구매 단가: 목표 15,000원
- 고객 생애 가치 (LTV): 목표 50,000원

### **기술 관련**
- API 응답 시간: 목표 < 2초
- 앱 크래시율: 목표 < 0.5%
- 시스템 가동률: 목표 99.9%
- AI 해석 정확도: 목표 85%+ (사용자 만족도)

---

이 문서는 **완전한 프로덕션 레벨 타로카드 앱**을 구축하기 위한 상세한 로드맵을 제공합니다. 각 단계별로 구체적인 코드 예시와 구현 방법을 포함하여, 실제 개발 시 바로 활용할 수 있도록 작성되었습니다.

**다음 단계**: 이 계획서를 바탕으로 React Native 프로젝트를 즉시 시작할 수 있습니다! 🚀