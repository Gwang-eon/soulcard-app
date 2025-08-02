# 💰 토큰 구매 시스템 Figma 제작 가이드

## 💳 5.1 토큰 패키지 선택 화면

### Figma 제작 프롬프트
```
Design a compelling token purchase screen with premium feel:

LAYOUT:
- Frame: iPhone 14 Pro (393×852px)
- Header with current balance and navigation
- Card-based package layout with clear value proposition
- Trust signals and secure payment indicators

HEADER SECTION:
- Back button (left) + "💰 토큰 충전" title (center)
- Current balance display: "현재 보유: 💰 5개" (prominent)
- Balance state indicator (low/critical warning colors)
- "사용 내역" link (top-right, secondary)

PACKAGE CARDS:

1. BASIC PACKAGE:
   - Card size: 353×120px
   - Background: Clean white with subtle border
   - Icon: 🥉 bronze medal (24×24px, top-left)
   - Title: "기본 패키지" (18px, semibold)
   - Token amount: "토큰 10개" (16px, prominent)
   - Price: "₩2,900" (20px, bold, primary color)
   - Value indicator: No discount label
   - Best for: "가벼운 상담용" subtitle

2. POPULAR PACKAGE (Featured):
   - Card size: 353×140px (larger for emphasis)
   - Background: Gradient border + "인기" badge
   - Icon: 🥈 silver medal (28×28px)
   - Title: "인기 패키지" (20px, bold)
   - Token amount: "토큰 30개" (18px, prominent)
   - Original price: "₩8,700" (crossed out, 14px)
   - Sale price: "₩5,900" (24px, bold, sale color)
   - Discount badge: "32% 할인!" (red background, white text)
   - Best for: "정기적 상담용" subtitle
   - "가장 많이 선택" indicator

3. PREMIUM PACKAGE:
   - Card size: 353×120px
   - Background: Luxury gradient (gold accents)
   - Icon: 🥇 gold medal (24×24px)
   - Title: "프리미엄 패키지" (18px, semibold)
   - Token amount: "토큰 100개" (16px, prominent)
   - Original price: "₩29,000" (crossed out)
   - Sale price: "₩19,900" (20px, bold)
   - Discount badge: "31% 할인!"
   - Best for: "헤비 유저용" subtitle
   - Bonus: "+5개 보너스" highlight

PACKAGE COMPARISON:
- Value per token calculation: "개당 ₩197"
- Savings amount: "₩2,800 절약!"
- Usage duration estimate: "약 2개월 사용 가능"

SELECTION STATES:
- Default: Subtle border and shadow
- Selected: Strong brand color border + checkmark
- Best value: Animated "추천" badge with pulse
- Limited time: Countdown timer for special offers

TRUST ELEMENTS:
- Security icons: 🔒 "안전한 결제"
- Payment methods: Card, Phone, KakaoPay icons
- "100% 환불 보장" text
- "24시간 고객지원" indicator

SPECIAL OFFERS:
- Limited time banner: "📅 8월 특가! 3일 남음"
- First purchase bonus: "첫 구매 시 10% 추가 할인"
- Referral bonus: "친구 초대 시 토큰 증정"
- Bundle deals: "상담 + 토큰 패키지"

BOTTOM ACTION:
- Selected package summary: "인기 패키지 (30개) - ₩5,900"
- Primary button: "결제하기" (full width, prominent)
- Terms link: "구매 약관 및 환불 정책"

SOCIAL PROOF:
- Customer reviews: "★★★★★ 4.8/5.0"
- Purchase count: "오늘 247명이 구매했어요"
- Satisfaction rate: "만족도 98%"

VISUAL ENHANCEMENTS:
- Coin/token illustrations
- Subtle animations on selection
- Value highlight effects
- Premium color gradients for higher tiers
```

### 구매 전환 최적화 전략
- **가격 앵커링**: 가장 비싼 옵션을 먼저 보여주고 중간 옵션 강조
- **손실 회피**: "놓치기 전에" 등의 한정성 메시지
- **사회적 증명**: 다른 사용자들의 구매 패턴 표시
- **가치 강조**: 할인율과 절약 금액 명확히 표시

---

## 💳 5.2 결제 화면

### Figma 제작 프롬프트
```
Create a trustworthy and secure payment interface:

LAYOUT:
- Clean, minimal design focused on trust
- Progressive disclosure of payment information
- Clear order summary and pricing

HEADER:
- Back button with "패키지 선택" return option
- Title: "💳 결제하기" (20px, semibold)
- Progress indicator: "2/3단계" (결제 정보 입력)
- SSL security indicator

ORDER SUMMARY CARD:
- Selected package: "🥈 인기 패키지"
- Token amount: "토큰 30개" (prominent)
- Original price: "₩8,700" (crossed out)
- Discount: "-₩2,800 (32% 할인)"
- Final price: "₩5,900" (large, bold)
- Taxes: "VAT 포함" (small text)

PAYMENT METHOD SELECTION:
- Section title: "결제 방법 선택" (18px, medium)
- Radio button options:

  1. ☑️ 신용/체크카드:
     - Icon: 💳 (24×24px)
     - Text: "카드 결제" (16px)
     - Supported cards: Visa, MasterCard, BC icons
     - "가장 빠른 결제" badge

  2. ○ 휴대폰 결제:
     - Icon: 📱 (24×24px)  
     - Text: "휴대폰 결제"
     - Carriers: SKT, KT, LG icons
     - "간편 결제" badge

  3. ○ 계좌이체:
     - Icon: 🏦 (24×24px)
     - Text: "무통장 입금"
     - "수수료 없음" badge

  4. ○ 카카오페이:
     - Icon: KakaoPay logo (24×24px)
     - Text: "카카오페이"
     - "1초 결제" badge

CARD INFORMATION FORM (When card selected):
- Card number input:
  - Label: "카드번호" (16px, medium)
  - Input: Masked format (0000-0000-0000-0000)
  - Card type detection with icons
  - Real-time validation feedback

- Expiry & CVC row:
  - Expiry: "MM/YY" format (half width)
  - CVC: "CVC" input (half width)
  - Security tooltip for CVC explanation

- Cardholder name:
  - Label: "카드 소유자명" (optional field)
  - Input: Text field with validation

BILLING INFORMATION:
- Email for receipt: "영수증 받을 이메일"
- Auto-fill from user profile
- "영수증 불필요" checkbox option

SECURITY FEATURES:
- SSL certificate display: "🔒 SSL 암호화 통신"
- PCI compliance badge
- "개인정보 안전 보장" text
- Security logos (VISA Secure, MasterCard SecureCode)

AGREEMENT CHECKBOXES:
- ☑️ "구매 조건에 동의합니다" (required)
  - Link to full terms and conditions
- ☑️ "개인정보 처리방침에 동의합니다" (required)
- ☐ "프로모션 정보 수신 동의" (optional)
  - "추가 할인 혜택 받기" subtitle

FINAL PAYMENT BUTTON:
- Large button: "₩5,900 결제하기" (full width)
- Loading state with spinner
- Success state with checkmark
- Disabled state until all required fields filled

ERROR HANDLING:
- Field validation errors (red border + message)
- Payment failure scenarios
- Network timeout handling
- Card decline recovery options

TRUST SIGNALS:
- "안전한 결제" header with lock icon
- "128bit SSL 보안" text
- "PG사: 이니시스" provider info
- Customer service contact: "결제 문의: 1588-0000"

ALTERNATIVE OPTIONS:
- "다른 패키지 선택" link
- "결제 없이 무료 체험" option
- "가족/친구와 공유 구매" feature
```

### 결제 보안 및 신뢰성
- **투명한 가격**: 숨겨진 비용 없음, VAT 포함 명시
- **보안 인증**: SSL, PCI 준수 등 보안 배지 표시
- **환불 정책**: 명확한 환불 조건과 절차 안내
- **고객 지원**: 24시간 지원 연락처 표시

---

## 🎉 5.3 결제 완료 화면

### Figma 제작 프롬프트
```
Design a celebratory purchase success screen:

LAYOUT:
- Full-screen celebration design
- Clear confirmation and next steps
- Positive reinforcement for purchase decision

SUCCESS ANIMATION AREA:
- Large checkmark icon ✅ (80×80px)
- Success animation: Scale up with gentle bounce
- Confetti/sparkle particle effects
- Celebratory color scheme (greens and golds)

CONFIRMATION MESSAGE:
- Main title: "🎉 결제가 완료되었습니다!" (24px, bold)
- Subtitle: "토큰이 성공적으로 충전되었어요" (16px, medium)
- Purchase details summary in card format

PURCHASE SUMMARY CARD:
- Package: "인기 패키지" with icon
- Tokens received: "토큰 30개 충전 완료!"
- Amount paid: "₩5,900"
- Transaction ID: "TXN-20240801-001234"
- Payment method: "신용카드 (****1234)"
- Date/time: "2024.08.01 15:24"

TOKEN BALANCE UPDATE:
- Before/after comparison:
  "이전: 💰 5개 → 현재: 💰 35개"
- Balance increase animation
- "충전 완료!" success badge

BONUS NOTIFICATIONS:
- "🎁 첫 구매 보너스 +3개 추가!"
- "⭐ VIP 등급 달성! 특별 혜택 해제"
- "🔔 다음 할인 알림 설정됨"

IMMEDIATE ACTIONS:
- Primary CTA: "지금 상담 받기" (prominent button)
- Secondary: "영수증 이메일 전송"
- Tertiary: "구매 내역 보기"

RECEIPT OPTIONS:
- "📧 영수증을 이메일로 받기"
- "📱 카카오톡으로 영수증 받기"  
- "💾 앱 내 구매내역에 저장됨"

SHARING & SOCIAL:
- "친구에게 추천하고 토큰 받기"
- Social sharing: "타로 상담 받는 중!"
- Referral code: "TAROT2024" (자동 생성)

NEXT STEPS GUIDE:
- "💡 이렇게 사용해보세요"
- Quick tips for token usage
- Popular consultation recommendations
- "처음 사용자 가이드" link

CUSTOMER SUPPORT:
- "궁금한 점이 있으신가요?"
- FAQ link: "자주 묻는 질문"
- Contact options: "1:1 문의하기"
- Rating prompt: "구매 경험을 평가해주세요"

UPSELL OPPORTUNITIES (Gentle):
- "정기 구독으로 더 절약하기"
- "프리미엄 해석 서비스 체험"
- "전문가 1:1 상담 예약"

VISUAL ELEMENTS:
- Success color scheme (greens, golds)
- Subtle animation effects
- Token coin illustrations
- Positive imagery and icons
- Celebration particles/effects
```

### 구매 후 경험 최적화
- **즉시 만족**: 구매 즉시 토큰 사용 가능
- **추가 가치**: 보너스 토큰이나 특별 혜택 제공
- **재구매 유도**: 다음 구매를 위한 할인 쿠폰 제공
- **커뮤니티 연결**: 다른 사용자들과의 연결 기회

---

## 📊 5.4 토큰 사용 내역 및 관리

### Figma 제작 프롬프트
```
Create a comprehensive token management dashboard:

LAYOUT:
- Tab-based interface for different views
- Clear balance and usage overview
- Detailed transaction history

HEADER WITH BALANCE:
- Current balance: "💰 27개" (large, prominent)
- Balance trend: "이번 달 +15개" (green up arrow)
- Quick refill button: "충전하기" (top-right)
- Balance alerts: "토큰 부족 알림 ON"

TAB NAVIGATION:
- Active tab: "사용 내역" (underlined)
- Other tabs: "구매 내역", "설정"
- Smooth tab switching animation

USAGE OVERVIEW CARDS:
- Today: "오늘 사용: 3개"
- This week: "이번 주: 8개"  
- This month: "이번 달: 15개"
- Most used: "가장 많이: 3카드 분석"

TRANSACTION HISTORY LIST:
Each transaction item (353×60px):
- Left: Service icon (💕 연애, 💼 직장, etc.)
- Center: 
  - Service name: "3카드 연애 상담"
  - Date/time: "2024.08.01 14:23"
  - Question preview: "그와의 미래는..."
- Right:
  - Token cost: "-3개" (red)
  - Remaining balance: "24개"

TRANSACTION CATEGORIES:
- Filter options: "전체", "상담", "구매", "보너스"
- Date range picker: "최근 7일" dropdown
- Search functionality: "거래 내역 검색"

PURCHASE HISTORY (Tab 2):
- Purchase cards showing:
  - Package type and icon
  - Tokens purchased
  - Amount paid
  - Date/time
  - Payment method
  - Receipt download option

USAGE ANALYTICS:
- Monthly usage chart (simple bar chart)
- Category breakdown (pie chart):
  "연애 40%, 직장 30%, 재정 20%, 기타 10%"
- Peak usage times: "주로 저녁 시간 이용"
- Usage pattern insights

TOKEN MANAGEMENT SETTINGS (Tab 3):
- Auto-refill options:
  "토큰 5개 이하시 자동 충전"
  - Enable/disable toggle
  - Package selection for auto-refill
  - Payment method selection

- Spending controls:
  "일일 사용 한도: 5개"
  "월 사용 한도: 50개"
  - Warning thresholds
  - Parental controls (if applicable)

- Notifications:
  "토큰 부족 알림"
  "충전 완료 알림"  
  "사용 내역 주간 리포트"

INSIGHTS & RECOMMENDATIONS:
- "💡 이용 패턴 분석"
- Usage efficiency tips
- Package recommendations based on usage
- Seasonal usage patterns

EXPORT & SHARING:
- "내역 내보내기" (Excel/PDF)
- "가계부 앱으로 전송"
- Usage summary sharing options

ERROR STATES:
- Empty history: "아직 사용 내역이 없어요"
- Network error: "내역을 불러올 수 없습니다"
- Loading states: Skeleton UI

ACCESSIBILITY:
- Screen reader support for all transactions
- High contrast mode for better readability
- Large text option for detailed view
- Voice-over friendly transaction descriptions
```

### 사용자 행동 인사이트
- **사용 패턴 분석**: 언제, 어떤 상담을 많이 받는지 분석
- **절약 제안**: 더 효율적인 패키지 추천
- **예산 관리**: 월별 사용 한도 설정 기능
- **투명성**: 모든 거래 내역 상세 표시

---

## 🎨 토큰 시스템 공통 요소

### 컴포넌트 라이브러리
```
Components/TokenSystem/:
├── Balance/
│   ├── Current_Balance_Display
│   ├── Balance_Trend_Indicator
│   ├── Low_Balance_Warning
│   └── Balance_Animation
├── Packages/
│   ├── Basic_Package_Card
│   ├── Popular_Package_Card
│   ├── Premium_Package_Card
│   └── Limited_Offer_Banner
├── Payment/
│   ├── Payment_Method_Selector
│   ├── Card_Input_Form
│   ├── Security_Indicators
│   └── Success_Confirmation
├── History/
│   ├── Transaction_Item
│   ├── Usage_Chart
│   ├── Category_Filter
│   └── Export_Options
└── Management/
    ├── Auto_Refill_Settings
    ├── Spending_Controls
    ├── Notification_Settings
    └── Usage_Analytics
```

### 가격 전략 시각화
```css
/* 할인 표시 애니메이션 */
.discount-badge {
  background: linear-gradient(45deg, #ef4444, #dc2626);
  animation: pulse 2s infinite;
}

/* 가격 강조 효과 */
.price-highlight {
  font-size: 24px;
  font-weight: bold;
  color: #059669;
  text-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
}

/* 토큰 카운터 애니메이션 */
.token-counter {
  animation: countUp 0.5s ease-out;
}

@keyframes countUp {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

### 심리적 가격 책정 요소
- **앵커링**: 높은 가격을 먼저 제시하고 중간 옵션 강조
- **번들링**: 여러 토큰을 묶어서 할인 제공
- **희소성**: 한정 시간 특가나 수량 제한
- **손실 회피**: "놓치면 손해" 메시지 활용

### 결제 전환율 최적화
- **신뢰 신호**: 보안 인증서, 고객 후기 표시
- **사회적 증명**: "오늘 N명이 구매" 메시지
- **위험 감소**: 환불 보장, 무료 체험 옵션
- **긴급성**: 제한 시간 할인, 재고 부족 알림

## 📱 결제 보안 및 컴플라이언스

### 보안 표준 준수
- **PCI DSS**: 카드 정보 보안 표준
- **SSL/TLS**: 데이터 전송 암호화
- **3D Secure**: 추가 인증 프로세스
- **Fraud Detection**: 이상 거래 탐지

### 개인정보 보호
- **최소 수집 원칙**: 필요한 정보만 수집
- **암호화 저장**: 민감 정보 암호화
- **접근 제어**: 권한 기반 데이터 접근
- **삭제 정책**: 보유 기간 만료 시 자동 삭제

### 국제 결제 지원
- **다중 통화**: USD, JPY, EUR 등 지원
- **현지 결제**: 국가별 인기 결제 수단
- **환율 표시**: 실시간 환율 적용
- **세금 처리**: 국가별 세금 정책 반영

## 📊 성과 측정 지표

### 전환율 지표
- **결제 전환율**: 패키지 선택 → 결제 완료
- **패키지별 선호도**: 어떤 패키지를 많이 선택하는가
- **결제 포기율**: 어느 단계에서 포기하는가
- **재구매율**: 첫 구매 후 재구매까지의 기간

### 수익 최적화
- **ARPU**: 사용자당 평균 수익
- **LTV**: 고객 생애 가치
- **패키지 믹스**: 수익성 높은 패키지 비중
- **할인 효과**: 할인율별 전환율 변화

## 📋 품질 검증 체크리스트

### 기능 테스트
- [ ] 모든 결제 수단 정상 작동
- [ ] 할인 계산 정확성
- [ ] 토큰 충전 즉시 반영
- [ ] 영수증 발행 정상

### 보안 테스트
- [ ] 카드 정보 암호화 확인
- [ ] SQL 인젝션 방어
- [ ] XSS 공격 방어
- [ ] 세션 보안 검증

### 사용성 테스트
- [ ] 직관적인 패키지 선택
- [ ] 명확한 가격 표시
- [ ] 쉬운 결제 과정
- [ ] 친화적인 오류 메시지