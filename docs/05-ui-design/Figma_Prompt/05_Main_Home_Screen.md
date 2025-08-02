# 🏠 메인 홈 화면 Figma 제작 가이드

## 🌅 3.1 홈 대시보드 메인

### Figma 제작 프롬프트
```
Design a premium home dashboard for mystical tarot app:

LAYOUT:
- Frame: iPhone 14 Pro (393×852px)
- Status bar: 44px with time, battery, signal
- Header: 60px height with branding and status
- Main content: Scrollable sections
- Bottom tab bar: 83px height

HEADER SECTION:
- Left: App logo "🔮" (24×24px) + "타로마스터" (18px, bold)
- Center: Welcome message "안녕하세요, 김타로님" (16px, medium)
- Right: Notification icon 🔔 + Token count "💰 15" (tap target)

DAILY CARD SECTION (Primary Feature):
- Section title: "🌅 오늘의 카드" (20px, semibold)
- Large card container (353×200px):
  - Background: Mystical gradient with subtle pattern
  - Card image: The Sun tarot card (120×192px aspect)
  - Card name: "태양 (The Sun)" (18px, bold, white)
  - Brief message: "밝고 희망찬 하루가 될 것입니다" (14px, white)
  - Subtle glow/aura effect around card
  - "자세히 보기" button (subtle, bottom-right)

QUICK CONSULTATION MENU:
- Section title: "💫 빠른 상담 메뉴" (18px, semibold)
- 2×2 grid layout with 16px gaps:
  
  Top row:
  - Love card (165×120px): 💕 icon, "연애" title, subtle pink accent
  - Career card (165×120px): 💼 icon, "직장" title, blue accent
  
  Bottom row:  
  - Money card (165×120px): 💰 icon, "재정" title, gold accent
  - Health card (165×120px): 🏥 icon, "건강" title, green accent

Each quick menu card:
- Rounded corners (12px)
- Glass morphism background
- Category icon (32×32px) at top
- Category name (16px, medium)
- Subtle hover/press states
- Light border (1px, rgba(255,255,255,0.2))

RECENT HISTORY PREVIEW:
- Section title: "📚 최근 상담 기록" (18px, semibold)
- List of 3 recent consultations:
  • "어제: 연애운 상담 💕 3카드 스프레드"
  • "3일전: 취업 관련 💼 단일카드"  
  • "1주전: 건강 상담 🏥 켈틱크로스"
- "전체 기록 보기" link at bottom

MAIN CTA:
- Prominent button: "더 자세한 상담하기" (full width)
- Gradient background (#667eea to #764ba2)
- Subtle animation/glow effect
- 52px height for comfortable tapping

BOTTOM TAB BAR:
- 5 tabs with icons and labels:
  🏠 홈 (active state) | 📊 기록 | 🔮 상담 | 💰 토큰 | 👤 내정보
- Active tab: Purple accent color with indicator
- Inactive tabs: Gray color
- Badge on 📊 (red dot for new results)

VISUAL EFFECTS:
- Subtle parallax scrolling
- Smooth section transitions
- Micro-interactions on tap
- Loading skeleton states ready
- Pull-to-refresh indicator

STYLE NOTES:
- Maintain mystical but modern aesthetic
- Consistent card styling throughout
- Proper spacing and visual hierarchy
- Touch-friendly interface elements
- Premium glass morphism effects
```

### 핵심 디자인 원칙
- **일일 카드 우선**: 메인 화면의 주요 컨텐츠로 배치
- **빠른 접근**: 자주 사용하는 상담 유형을 홈에서 바로 접근
- **개인화**: 사용자 이름과 맞춤 메시지로 친근함 조성
- **상태 표시**: 토큰 개수, 알림 등 중요 정보 상시 표시

---

## 🎴 3.2 오늘의 카드 상세

### Figma 제작 프롬프트
```
Create an expanded daily card detail modal/screen:

LAYOUT:
- Modal overlay or full-screen presentation
- Dark backdrop with blur effect (if modal)
- Centered content with premium styling

HEADER:
- Close/back button (top-left)
- Share button (top-right) 
- Title: "오늘의 카드" (24px, bold, centered)

MAIN CARD DISPLAY:
- Large tarot card (240×384px) - maintain 5:8 ratio
- Card image: High-quality, detailed artwork
- Subtle drop shadow and glow effect
- Card flip animation ready
- Floating particles/sparkles around card

CARD INFORMATION:
- Card name: "태양 (The Sun)" (28px, bold, gradient text)
- Card number: "XIX - Major Arcana" (14px, secondary color)
- Keywords: "희망, 성공, 기쁨, 활력" (16px, comma-separated)
- Each keyword in a subtle pill/badge style

DAILY INTERPRETATION:
- Section title: "📖 오늘의 해석" (20px, semibold)
- Main message (18px, line-height 1.6):
  "오늘은 밝고 긍정적인 에너지가 가득한 하루가 될 것입니다. 
   새로운 기회가 찾아올 수 있으니 열린 마음으로 받아들이세요."
- Detailed interpretation (16px, lighter color)
- Advice section: "💡 오늘의 조언" with actionable tips

PERSONAL MESSAGE:
- User-specific fortune based on profile data
- Time-sensitive advice (morning/afternoon/evening)
- Lucky color, number, or direction for today

ACTION BUTTONS:
- "더 자세한 상담받기" (primary button)
- "카드 저장하기" (secondary button)  
- "SNS 공유하기" (tertiary button)

ADDITIONAL FEATURES:
- Card meaning explanation (expandable)
- Related spread suggestions
- Historical significance (optional)
- Meditation/reflection prompt

VISUAL ENHANCEMENTS:
- Gradient backgrounds
- Subtle animations on scroll
- Interactive card (can zoom/rotate)
- Beautiful typography with proper hierarchy
- Mystical but readable design
```

### 상호작용 요소
- **카드 확대**: 터치로 카드 크게 보기
- **텍스트 복사**: 해석 내용 클립보드 복사
- **음성 읽기**: TTS로 해석 내용 읽어주기
- **저장/즐겨찾기**: 특별한 카드는 별도 저장

---

## ⚡ 3.3 빠른 상담 메뉴 확장

### Figma 제작 프롬프트
```
Design expanded quick consultation interface:

LAYOUT:
- Grid expansion from 2×2 to full category list
- Search/filter functionality at top
- Categorized consultation types

HEADER SECTION:
- Search bar: "어떤 고민이 있으신가요?" (placeholder)
- Filter chips: "전체", "인기", "추천", "새로운" 
- Voice input button (microphone icon)

CATEGORY GRID (Extended):
Main Categories (2×2):
- 💕 연애/관계 (pink theme)
- 💼 직장/진로 (blue theme)  
- 💰 재정/투자 (gold theme)
- 🏥 건강/생활 (green theme)

Additional Categories (2×3):
- 🏠 가족/친구 (orange theme)
- 🎓 학업/교육 (purple theme)
- ✈️ 여행/이사 (cyan theme)  
- 💍 결혼/임신 (rose theme)
- 🎯 목표/성취 (indigo theme)
- 🔮 영성/성장 (violet theme)

Each category card:
- 165×100px size for main categories
- 108×80px size for additional categories
- Gradient background matching theme
- Icon (28×28px for main, 24×24px for additional)
- Title and subtitle
- Consultation count badge ("142회")
- Recent update indicator (if applicable)

POPULAR QUESTIONS SECTION:
- "자주 묻는 질문들" (18px, semibold)
- Scrollable horizontal list:
  • "그와의 미래는?"
  • "이직해도 될까요?"
  • "투자 타이밍은?"
  • "건강 상태 괜찮나요?"
- Each as tappable pill/bubble (quick start)

CONSULTATION TYPES:
For each category, show available spread types:
- 단일카드 (💰1) - 빠른 답변
- 3카드 (💰3) - 과거현재미래  
- 관계상담 (💰5) - 5카드 심층분석
- 종합분석 (💰10) - 10카드 완전해석

SPECIAL FEATURES:
- "오늘의 추천 상담" highlighted section
- Limited-time discount indicators
- New feature badges
- User's consultation history hints

INTERACTION STATES:
- Hover/press feedback on all cards
- Loading states for dynamic content
- Empty states for new categories
- Error states for network issues

ACCESSIBILITY:
- Screen reader support for all cards
- Keyboard navigation ready
- High contrast mode variants
- Voice control integration points
```

### 개인화 요소
- **추천 시스템**: 사용자 기록 기반 카테고리 추천
- **시간별 적응**: 아침/점심/저녁별 다른 추천
- **계절별 테마**: 계절에 맞는 상담 주제 강조
- **통계 기반**: "이 시간에 많이 찾는 상담" 표시

---

## 📱 3.4 상단 네비게이션 상세

### Figma 제작 프롬프트
```
Design detailed header navigation system:

MAIN HEADER STATES:
1. DEFAULT STATE:
   - Logo area: 🔮 + "타로마스터" (left-aligned)
   - User greeting: "안녕하세요, [이름]님" (center)
   - Status icons: 🔔 알림 + 💰15 토큰 (right)

2. SCROLLED STATE:
   - Condensed header (50px instead of 60px)
   - Logo only (text hidden)
   - User name abbreviated to first name
   - Status icons remain full

3. SEARCH STATE:
   - Search bar takes full width
   - Cancel button (right side)
   - Voice input option
   - Recent searches dropdown

NOTIFICATION ICON:
- Default: 🔔 (gray)
- New notifications: 🔔 (purple) + red badge with count
- Tap interaction: Slide-down notification panel
- Badge animations: Pulse effect for new items

TOKEN DISPLAY:
- Format: "💰 15" with proper spacing
- Low balance warning: Orange color when <5 tokens
- Critical warning: Red color when 0 tokens
- Tap interaction: Direct to token purchase
- Animation: Count-up effect when tokens added

USER GREETING VARIATIONS:
- Morning: "좋은 아침이에요, [이름]님" (6-12시)
- Afternoon: "안녕하세요, [이름]님" (12-18시)
- Evening: "저녁 인사드려요, [이름]님" (18-22시)
- Night: "늦은 시간이네요, [이름]님" (22-6시)

PROFILE QUICK ACCESS:
- User name tap: Quick profile menu
- Profile picture (small, 32×32px) option
- Level indicator (beginner/intermediate/advanced)
- Quick settings access

RESPONSIVE BEHAVIOR:
- Text truncation for long names
- Priority-based hiding (greeting hides first)
- Minimum touch targets maintained
- Smooth transitions between states

SPECIAL STATES:
- Loading: Skeleton placeholders
- Error: Retry buttons for failed data
- Offline: Appropriate offline indicators
- Premium: Special styling for premium users
```

### 마이크로 인터랙션
- **토큰 증가**: 숫자가 카운트업되는 애니메이션
- **알림 도착**: 벨 아이콘이 살짝 흔들리는 효과
- **레벨업**: 사용자 이름 옆에 축하 이펙트
- **시간 변화**: 인사말이 부드럽게 변경

---

## 🎨 홈 화면 컴포넌트 시스템

### 컴포넌트 라이브러리
```
Components/Home/:
├── Header/
│   ├── Main_Header
│   ├── Scrolled_Header
│   ├── Search_Header
│   └── User_Greeting
├── Cards/
│   ├── Daily_Card_Large
│   ├── Daily_Card_Compact
│   ├── Category_Card_Main
│   ├── Category_Card_Small
│   └── History_Item
├── Navigation/
│   ├── Quick_Menu_Grid
│   ├── Category_Filter
│   └── Bottom_Tab_Bar
└── Sections/
    ├── Daily_Card_Section
    ├── Quick_Menu_Section
    ├── History_Section
    └── CTA_Section
```

### 반응형 레이아웃
```css
/* 작은 화면 (iPhone SE) */
@media (max-width: 375px) {
  .quick-menu-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .daily-card {
    height: 180px; /* 축소 */
  }
}

/* 큰 화면 (iPhone 14 Pro Max) */
@media (min-width: 414px) {
  .quick-menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .container {
    padding: 0 24px; /* 여백 증가 */
  }
}

/* 태블릿 */
@media (min-width: 768px) {
  .home-layout {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .quick-menu-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 데이터 상태 관리
```typescript
interface HomeDashboardData {
  user: {
    name: string;
    tokens: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    unreadNotifications: number;
  };
  
  dailyCard: {
    card: TarotCard;
    interpretation: string;
    personalizedMessage: string;
    isViewed: boolean;
  };
  
  quickMenu: {
    categories: CategoryType[];
    popularQuestions: string[];
    recommendations: CategoryType[];
  };
  
  recentHistory: {
    items: ConsultationRecord[];
    hasMore: boolean;
  };
}
```

### 로딩 및 에러 상태
- **스켈레톤 로딩**: 각 섹션별 스켈레톤 UI
- **순차 로딩**: 중요 콘텐츠부터 우선 로딩
- **오프라인 모드**: 캐시된 데이터 표시
- **에러 복구**: 새로고침 및 재시도 옵션

## 📊 성능 최적화

### 이미지 최적화
- **지연 로딩**: 스크롤 시 이미지 로드
- **WebP 포맷**: 최신 이미지 포맷 사용
- **반응형 이미지**: 디바이스별 적절한 크기
- **캐싱 전략**: 타로카드 이미지 적극적 캐싱

### 애니메이션 최적화
- **GPU 가속**: transform, opacity 사용
- **reduced-motion**: 접근성을 위한 애니메이션 축소
- **배터리 고려**: 과도한 애니메이션 방지
- **60fps 유지**: 부드러운 사용자 경험

## 📋 완성도 체크리스트

### 기능 완성도
- [ ] 모든 탭/버튼 동작 정의
- [ ] 로딩 상태 디자인 완료
- [ ] 에러 상태 처리 방안
- [ ] 빈 상태 (empty state) 디자인

### 사용성 검증
- [ ] 한 손 사용 가능성 확인
- [ ] 주요 기능 3탭 내 접근
- [ ] 시각적 계층 구조 명확
- [ ] 일관된 상호작용 패턴

### 접근성 확인
- [ ] 스크린 리더 호환성
- [ ] 충분한 색상 대비
- [ ] 적절한 터치 타겟 크기
- [ ] 키보드 네비게이션 지원

### 브랜드 일관성
- [ ] 컬러 시스템 준수
- [ ] 타이포그래피 일관성
- [ ] 아이콘 스타일 통일
- [ ] 전체적인 톤앤매너 유지