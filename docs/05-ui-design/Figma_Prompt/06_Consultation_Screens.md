# 🔮 상담 화면 Figma 제작 가이드

## 🎯 4.1 상담 타입 선택 화면

### Figma 제작 프롬프트
```
Design a premium consultation type selection screen:

LAYOUT:
- Frame: iPhone 14 Pro (393×852px)
- Header with back button and title
- Scrollable card-based selection interface
- Prominent pricing and feature comparison

HEADER:
- Back arrow (left, 24×24px)
- Title: "🔮 상담 선택하기" (20px, semibold, centered)
- Help icon (right, info about consultation types)

CONSULTATION TYPE CARDS:

1. SINGLE CARD (Quick Reading):
   - Card size: 353×120px
   - Background: Light gradient with sparkle pattern
   - Icon: 🌟 (32×32px, golden color)
   - Title: "단일 카드" (20px, bold)
   - Subtitle: "빠른 답변이 필요할 때" (14px, secondary)
   - Features: "• 즉시 해석 • 핵심 조언 • 간단명료"
   - Token cost: "💰 1" (prominent, top-right)
   - Duration: "~2분 소요"
   - Popularity badge: "가장 많이 선택"

2. THREE CARD SPREAD:
   - Card size: 353×140px (slightly larger for popularity)
   - Background: Premium gradient with mystical pattern
   - Icon: 📚 (32×32px, purple color)
   - Title: "3카드 분석" (20px, bold)
   - Subtitle: "과거-현재-미래 흐름 파악" (14px, secondary)
   - Features: "• 시간 흐름 분석 • 상황 배경 • 미래 전망"
   - Token cost: "💰 3" (prominent, top-right)
   - Duration: "~5분 소요"
   - Popular badge: "추천" (premium styling)

3. RELATIONSHIP READING:
   - Card size: 353×120px
   - Background: Romantic gradient (pink-purple)
   - Icon: 💕 (32×32px, pink color)
   - Title: "관계 상담" (20px, bold)
   - Subtitle: "5카드 심층 분석" (14px, secondary)
   - Features: "• 상대방 심리 • 관계 전망 • 구체적 조언"
   - Token cost: "💰 5" (prominent, top-right)
   - Duration: "~8분 소요"
   - Specialty: "연애 전문"

4. PREMIUM CELTIC CROSS:
   - Card size: 353×140px
   - Background: Luxury gradient with gold accents
   - Icon: ✨ (32×32px, gold color)
   - Title: "프리미엄 종합분석" (20px, bold)
   - Subtitle: "10카드 켈틱크로스" (14px, secondary)
   - Features: "• 완전 분석 • 모든 측면 검토 • 상세 조언"
   - Token cost: "💰 10" (prominent, top-right)
   - Duration: "~15분 소요"
   - Premium badge: "최고급" (gold styling)

SELECTION STATES:
- Normal: Subtle border and shadow
- Hover: Gentle glow effect
- Selected: Strong border and background change
- Disabled: Grayed out (insufficient tokens)

COMPARISON FEATURES:
- Feature comparison table (optional toggle)
- "어떤 상담을 선택해야 할까요?" help section
- User's consultation history hints
- Recommendation based on question type

TOKEN STATUS:
- Current balance display: "보유 토큰: 💰 15"
- Insufficient funds warning for premium options
- "토큰 구매" quick link if needed

BOTTOM SECTION:
- Selected consultation summary
- "다음: 질문 입력" button (disabled until selection)
- "도움말" link for consultation type guidance

VISUAL ENHANCEMENTS:
- Subtle card flip animations on hover
- Token cost animations (pulse/glow when selected)
- Premium feel with quality shadows and gradients
- Consistent mystical theme throughout
```

### 가격 전략 표현
- **가치 전달**: 각 상담 타입의 고유 가치 명확히 전달
- **추천 시스템**: 사용자 질문에 따른 자동 추천 표시
- **투명한 가격**: 토큰 비용과 예상 시간 명시
- **업셀링**: 프리미엄 옵션의 차별화된 가치 강조

---

## 📝 4.2 질문 입력 화면

### Figma 제작 프롬프트
```
Design an intuitive question input interface:

LAYOUT:
- Clean, focused design for thoughtful input
- Minimal distractions to encourage reflection
- Smart assistance features

HEADER:
- Back button with "상담 선택" return option
- Title: "📝 질문을 입력하세요" (20px, semibold)
- Selected consultation type indicator: "3카드 분석 선택됨"

MAIN INPUT AREA:
- Large text area (353×120px minimum, expandable)
- Placeholder text: "어떤 고민이 있으신가요?"
- Character counter: "0/500자" (bottom-right)
- Auto-expanding as user types
- Soft focus state with mystical border

SMART FEATURES:
1. VOICE INPUT:
   - Microphone button (bottom-right of text area)
   - Voice-to-text capability
   - Visual feedback during recording
   - "음성으로 말씀해주세요" prompt

2. WRITING ASSISTANCE:
   - Word suggestion chips below input
   - Grammar/spelling check (subtle underlines)
   - Automatic punctuation suggestions
   - "더 구체적으로 설명해주세요" hints

QUESTION EXAMPLES SECTION:
- Title: "💡 질문 예시" (18px, medium)
- Expandable/collapsible sections by category:

  연애/관계:
  • "이 사람과 잘 될까요?"
  • "그/그녀의 진심은 무엇인가요?"
  • "언제 좋은 사람을 만날까요?"

  직장/진로:
  • "이직을 해야 할까요?"
  • "승진 가능성은 어떤가요?"
  • "새로운 사업을 시작해도 될까요?"

  재정/투자:
  • "이 투자가 성공할까요?"
  • "재정 상황이 나아질까요?"
  • "부동산 구매 타이밍은?"

- Each example is tappable to auto-fill

CATEGORY SELECTION:
- Dropdown/picker: "카테고리 선택" (optional but helpful)
- Categories: 💕연애, 💼직장, 💰재정, 🏥건강, etc.
- Auto-suggestion based on question content
- Affects interpretation style and focus

PRIVACY & GUIDELINES:
- "🔒 모든 상담은 완전히 익명으로 처리됩니다"
- Guidelines popup: "좋은 질문을 위한 팁"
  - 구체적으로 작성하기
  - 감정보다는 상황 중심으로
  - 열린 질문 형태로 만들기

BOTTOM SECTION:
- Question quality indicator (3-star rating)
- "질문 분석하기" button (optional, shows AI analysis preview)
- Main CTA: "카드 뽑기 시작" (disabled until valid input)
- Estimated consultation time update based on question length

INPUT VALIDATION:
- Minimum length check (10 characters)
- Inappropriate content filtering
- Too vague warning ("더 구체적으로 작성해주세요")
- Too personal warning (privacy protection)

ACCESSIBILITY FEATURES:
- High contrast text area
- Screen reader optimized
- Voice control integration
- Font size adjustment options
```

### 질문 품질 향상 전략
- **AI 분석 미리보기**: 질문 입력 중 실시간 분석 제공
- **구체성 가이드**: 모호한 질문에 대한 개선 제안
- **감정 인식**: 텍스트 감정 분석으로 톤 조절
- **개인정보 보호**: 민감한 정보 입력 시 경고

---

## 🎴 4.3 카드 선택 인터페이스 (Pick-a-Card)

### Figma 제작 프롬프트
```
Create an immersive card selection experience:

LAYOUT:
- Full-screen immersive experience
- Dark, mystical background
- Centered card deck with proper spacing
- Minimal UI to maintain focus

BACKGROUND:
- Deep mystical gradient (#0a0a0a to #1a1a2e)
- Subtle animated stars/particles
- Soft ethereal glow effects
- No harsh lighting or distractions

HEADER (Minimal):
- Question preview (truncated): "그와의 미래는..." (14px, semi-transparent)
- Progress indicator: "카드 선택 (1/3)" (top-right, small)
- Back button (barely visible, top-left)

MAIN INSTRUCTION:
- Central message: "🎴 직감으로 선택하세요" (24px, bold, white)
- Subtitle: "마음을 비우고 끌리는 카드를 터치해주세요" (16px, soft white)
- Breathing space around text (40px margins)

CARD DECK DISPLAY:
- Arrangement options:
  
  Option A - Fan Layout:
  - 7 cards in fan formation (slightly overlapping)
  - Each card: 80×128px (5:8 ratio)
  - Cards tilted at slight angles (-15° to +15°)
  - Center card straight, others angled outward
  
  Option B - Grid Layout:
  - 3×3 grid with 16px gaps
  - Cards: 100×160px size
  - Perfect alignment for systematic selection
  
  Option C - Circular Layout:
  - Cards arranged in circle/arc
  - 8-10 cards evenly spaced
  - Mystical, ritual-like feeling

CARD APPEARANCE:
- Back design: Mystical pattern with app branding
- Subtle pulsing glow effect
- Soft drop shadows (0 4px 20px rgba(102, 126, 234, 0.3))
- Uniform sizing and spacing

INTERACTION STATES:
- Hover: Gentle lift (translateY(-8px)) + glow increase
- Active: Brief press effect (scale(0.95))
- Selected: Strong glow + slight rotation + scale up
- Disabled: Fade out other cards when selection made

SHUFFLE FEATURE:
- "🔄 카드 섞기" button (bottom-center)
- Shuffle animation: Cards swirl and reposition
- Haptic feedback on mobile devices
- 3-second animation with smooth transitions

SELECTION FEEDBACK:
- Selected card count: "선택된 카드: 1/3"
- Selected cards mini-preview (bottom area)
- "다음 카드 선택하기" or "결과 보기" button
- Selection confirmation with gentle animation

PROGRESS TRACKING:
- Progress bar: ■■■□□ visual indicator
- Step labels: "카드 선택 → 해석 중 → 결과"
- Estimated remaining time: "약 2분 남음"

AUDIO/HAPTIC:
- Subtle card flip sound effects
- Gentle haptic feedback on selection
- Ambient mystical background music (optional)
- Voice guidance for accessibility

SPECIAL EFFECTS:
- Particle effects on card selection
- Gentle camera shake on shuffle
- Smooth transitions between selections
- Loading spinner with mystical styling

ACCESSIBILITY:
- Screen reader descriptions for each card position
- Keyboard navigation (arrow keys + enter)
- High contrast mode with better visibility
- Voice-over integration for card selection
```

### 카드 선택 심리학
- **직관 강조**: "직감", "끌림" 등의 언어 사용
- **압박 제거**: 시간 제한 없음, 언제든 다시 선택 가능
- **신비로운 분위기**: 조명, 효과음으로 의식적 분위기 조성
- **피드백 제공**: 선택 즉시 시각적/촉각적 피드백

---

## 🌟 4.4 해석 결과 화면

### Figma 제작 프롬프트
```
Design a comprehensive tarot reading results screen:

LAYOUT:
- Scrollable full-height layout
- Section-based content organization
- Premium presentation with rich visuals

HEADER SECTION:
- Title: "🌟 당신의 카드 메시지" (28px, bold, gradient text)
- Consultation type badge: "3카드 분석 결과" (subtle pill)
- Timestamp: "2024년 8월 1일 오후 3:24" (14px, secondary)
- Save/Share buttons (top-right icons)

SELECTED CARDS DISPLAY:
- Card arrangement matching consultation type:
  
  For 3-Card Spread:
  - Horizontal layout: [과거] [현재] [미래]
  - Each card: 100×160px with proper spacing
  - Card names below: "마법사", "별", "태양"
  - Position labels: "Past", "Present", "Future" (subtle)
  
  For Single Card:
  - Large centered card: 160×256px
  - Prominent display with glowing effect
  
  For Celtic Cross:
  - Traditional cross formation
  - Smaller cards (80×128px) with numbered positions

CARD STATES:
- Front-facing with detailed artwork
- Card names in elegant typography
- Orientation indicators (upright/reversed)
- Subtle animation on scroll-in

INTERPRETATION SECTIONS:

1. OVERALL SUMMARY:
   - Title: "📖 전체 해석" (20px, semibold)
   - Main message (18px, line-height 1.6):
     "새로운 시작의 에너지가 당신을 기다리고 있습니다. 
      과거의 경험을 바탕으로 현재의 기회를 잡고, 
      밝은 미래를 향해 나아가세요."
   - Reading confidence: ★★★★☆ (4/5 stars)

2. INDIVIDUAL CARD MEANINGS:
   - Each card as expandable section
   - Card image (small, 60×96px) + name
   - Position meaning + card interpretation
   - Personal relevance explanation
   - Keywords in pill format

3. ADVICE SECTION:
   - Title: "💡 조언" (20px, semibold)  
   - Actionable advice (16px):
     "• 새로운 기회에 열린 마음으로 접근하세요
      • 과거의 실수를 반복하지 않도록 주의하세요
      • 직감을 믿고 결정을 내리세요"
   - Timeline suggestions: "이번 주", "다음 달" 등

4. NEXT STEPS:
   - Follow-up consultation suggestions
   - Related spread recommendations
   - Meditation/reflection prompts
   - Lucky elements (colors, numbers, directions)

INTERACTIVE ELEMENTS:
- Tap cards to see detailed meanings
- "더 자세한 해석" expandable sections
- Related questions suggestions
- Voice narration option (play button)

PERSONALIZATION:
- User name integration in interpretation
- Based on user profile data (birthdate, preferences)
- Previous consultation connections
- Customized advice tone

ACTIONS SECTION:
- Primary: "저장하기" (bookmark icon)
- Secondary: "다시 상담받기" (refresh icon)
- Tertiary: "공유하기" (share icon with options)
- "전문가 상담 예약" (premium upsell)

SOCIAL SHARING:
- Beautiful card image generation for social media
- Text summary with mystical styling
- Privacy options (anonymous sharing)
- Platform-specific optimizations

VISUAL ENHANCEMENTS:
- Gradient text for important messages
- Subtle animations on scroll
- Card hover effects for detailed view
- Reading progress indicator
- Beautiful typography hierarchy

ACCESSIBILITY:
- Screen reader optimization for card meanings
- High contrast text on mystical backgrounds
- Audio narration of full reading
- Adjustable text size throughout
```

### 해석 품질 요소
- **개인화**: 사용자 프로필 정보 반영
- **구체성**: 추상적이지 않은 실용적 조언
- **연관성**: 질문과 직접적으로 연결된 해석
- **행동 지향**: 단순 예측이 아닌 행동 가이드

---

## 🎨 상담 화면 공통 시스템

### 컴포넌트 라이브러리
```
Components/Consultation/:
├── Cards/
│   ├── Tarot_Card_Small
│   ├── Tarot_Card_Medium  
│   ├── Tarot_Card_Large
│   └── Card_Back_Design
├── Layouts/
│   ├── Single_Card_Layout
│   ├── Three_Card_Layout
│   ├── Celtic_Cross_Layout
│   └── Relationship_Layout
├── Selection/
│   ├── Card_Grid
│   ├── Card_Fan
│   ├── Card_Circle
│   └── Shuffle_Button
├── Input/
│   ├── Question_Textarea
│   ├── Voice_Input_Button
│   ├── Category_Selector
│   └── Example_Questions
└── Results/
    ├── Interpretation_Card
    ├── Advice_Section
    ├── Action_Buttons
    └── Share_Options
```

### 상태 관리 시스템
```typescript
interface ConsultationState {
  currentStep: 'type-selection' | 'question-input' | 'card-selection' | 'interpretation';
  selectedType: ConsultationType;
  question: string;
  category: string;
  selectedCards: TarotCard[];
  interpretation: InterpretationResult;
  isLoading: boolean;
  error: string | null;
}

interface InterpretationResult {
  id: string;
  overallMessage: string;
  cardMeanings: CardMeaning[];
  advice: string[];
  confidence: number;
  nextSteps: string[];
  createdAt: Date;
}
```

### 애니메이션 시스템
```css
/* 카드 선택 애니메이션 */
.card-select {
  animation: cardSelect 0.5s ease-out;
}

@keyframes cardSelect {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1.05) rotate(2deg); }
}

/* 결과 등장 애니메이션 */
.result-reveal {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  0% { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* 카드 뒤집기 애니메이션 */
.card-flip {
  animation: flipCard 0.8s ease-in-out;
  transform-style: preserve-3d;
}

@keyframes flipCard {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(90deg); }
  100% { transform: rotateY(0deg); }
}
```

### 오류 처리 및 복구
- **네트워크 오류**: 로컬 캐시된 해석 제공
- **AI 서비스 오류**: 기본 해석 템플릿 사용
- **카드 선택 오류**: 다시 선택 옵션 제공
- **질문 검증 실패**: 구체적인 개선 가이드

## 📱 반응형 고려사항

### 화면 크기별 적응
- **작은 화면**: 카드 크기 축소, 세로 배치
- **큰 화면**: 카드 확대, 가로 배치 활용
- **태블릿**: 카드 선택 시 더 많은 카드 표시
- **데스크톱**: 사이드바에 진행 상황 표시

### 터치 최적화
- **카드 선택**: 충분한 터치 영역 확보
- **스크롤 영역**: 부드러운 스크롤 경험
- **버튼 배치**: 엄지 도달 가능 영역
- **제스처**: 스와이프로 카드 넘기기

## 📋 품질 보증 체크리스트

### 기능 검증
- [ ] 모든 상담 타입 정상 동작
- [ ] 카드 선택 인터랙션 완벽
- [ ] 해석 결과 완전 표시
- [ ] 저장/공유 기능 작동

### 사용자 경험
- [ ] 직관적인 네비게이션
- [ ] 명확한 진행 상황 표시
- [ ] 적절한 피드백 제공
- [ ] 오류 상황 우아한 처리

### 성능 최적화
- [ ] 카드 이미지 지연 로딩
- [ ] 부드러운 애니메이션
- [ ] 빠른 해석 결과 로딩
- [ ] 메모리 사용량 최적화