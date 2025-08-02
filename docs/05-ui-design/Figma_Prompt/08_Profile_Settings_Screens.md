# 👤 프로필 및 설정 화면 Figma 제작 가이드

## 🏠 8.1 마이페이지 메인

### Figma 제작 프롬프트
```
Design a comprehensive user profile dashboard:

LAYOUT:
- Frame: iPhone 14 Pro (393×852px)
- Header with profile overview
- Card-based feature sections
- Clean, organized information hierarchy

PROFILE HEADER SECTION:
- Background: Subtle gradient or user's preferred theme
- Profile picture placeholder: 80×80px circular frame
  - Default: Mystical avatar with user initials
  - Upload option: Camera icon overlay on hover
  - Achievement border: Gold/silver ring for VIP users

- User information:
  - Name: "김타로님" (24px, bold, white/dark text)
  - Join date: "2024년 1월부터 함께하고 있어요" (14px, secondary)
  - User level: "🔮 타로 중급자" with progress bar
  - Streak: "연속 방문 7일차 🔥" (achievement highlight)

- Quick stats (horizontal row):
  - Total consultations: "총 157회 상담"
  - Favorite category: "주로 💕 연애 상담"
  - Success rate: "만족도 94%"

MAIN FEATURE CARDS:

1. ACCOUNT OVERVIEW CARD:
   - Title: "📊 내 활동 현황" (18px, semibold)
   - Content (in grid):
     • Current tokens: "💰 15개 보유"
     • This month consultations: "이번 달 12회"
     • Member since: "가입 후 218일"
     • Current streak: "연속 방문 7일"
   - Quick action: "상세 통계 보기" link

2. SUBSCRIPTION STATUS CARD:
   - Title: "💎 구독 관리" (18px, semibold) 
   - Current plan: "🥈 프리미엄 플랜" badge
   - Benefits list:
     ✓ "월 무제한 상담"
     ✓ "프리미엄 해석"
     ✓ "광고 없는 경험"
   - Renewal: "다음 결제일: 2024.08.15"
   - Actions: "플랜 변경" | "구독 관리"

3. ACHIEVEMENTS SECTION:
   - Title: "🏆 획득 배지" (18px, semibold)
   - Badge grid (3×2 layout):
     🥉 "첫 상담 완료"
     🥈 "일주일 연속 방문" 
     🥇 "100회 상담 달성"
     🏆 "타로 마스터"
     ⭐ "5성 리뷰어"
     🎯 "정확도 킹"
   - "모든 배지 보기" link

4. PERSONALIZATION CARD:
   - Title: "🎨 개인화 설정" (18px, semibold)
   - Quick toggles:
     • Dark mode: ON/OFF toggle
     • Notifications: ON/OFF toggle  
     • Auto-save readings: ON/OFF toggle
   - Theme preview: Small swatches showing current theme
   - "상세 설정" link

5. SUPPORT & HELP CARD:
   - Title: "🛠️ 도움말 & 지원" (18px, semibold)
   - Quick access buttons:
     • "자주 묻는 질문"
     • "1:1 문의하기"  
     • "앱 사용법"
     • "피드백 보내기"
   - App version: "v2.1.0" (bottom-right, small)

QUICK ACTIONS ROW:
- Floating action buttons at bottom:
  • "설정" (gear icon)
  • "알림" (bell icon) 
  • "공유" (share icon)
  • "로그아웃" (exit icon)

PERSONALIZATION TOUCHES:
- Greeting based on time: "좋은 저녁이에요, 김타로님!"
- Seasonal themes: Subtle background changes
- Achievement highlights: Recent badges with animation
- Usage insights: "오늘은 평소보다 일찍 방문하셨네요!"

VISUAL ENHANCEMENTS:
- Card-based layout with consistent spacing
- Subtle shadows and rounded corners
- Icon consistency throughout
- Smooth hover/tap interactions
- Progress bars for achievements and level

ACCESSIBILITY FEATURES:
- High contrast mode compatibility
- Screen reader optimization
- Large text support
- Voice-over friendly labels
```

### 개인화 요소
- **개인 테마**: 사용자 선호 색상이나 테마 반영
- **맞춤 인사**: 시간대와 사용 패턴에 맞는 메시지
- **성취 강조**: 최근 획득한 배지나 달성한 목표 하이라이트
- **개인 통계**: 사용자만의 고유한 사용 패턴 분석

---

## ⚙️ 8.2 설정 메인 화면

### Figma 제작 프롬프트
```
Create a comprehensive settings interface:

LAYOUT:
- Grouped settings with clear categories
- Search functionality at top
- Hierarchical information architecture

HEADER:
- Back button (left) + "⚙️ 설정" title (center)
- Search icon (right): "설정 검색" functionality  
- User avatar (small, 32×32px) in corner

SEARCH BAR (Expandable):
- Placeholder: "설정 항목 검색..."
- Recent searches: "알림", "테마", "계정"
- Quick suggestions based on popular settings

SETTINGS CATEGORIES:

1. ACCOUNT SECTION:
   - Header: "👤 계정 관리" (16px, semibold)
   - Items:
     • "개인정보 수정" (name, email, birthdate)
     • "비밀번호 변경" (security icon)
     • "연결된 계정" (Google, Apple, KakaoTalk)
     • "계정 탈퇴" (danger color, warning icon)

2. PREFERENCES SECTION:
   - Header: "🎨 앱 설정" (16px, semibold)
   - Items:
     • "테마 설정" → "다크 모드" toggle + "자동"
     • "언어 설정" → "한국어" (current)
     • "폰트 크기" → Slider (작게 ← → 크게)
     • "카드 덱 스타일" → "클래식" | "모던" | "전통"
     • "해석 스타일" → "직관적" ↔ "논리적" slider

3. CONSULTATION SETTINGS:
   - Header: "🔮 상담 설정" (16px, semibold)
   - Items:
     • "기본 상담 타입" → "3카드 분석" dropdown
     • "질문 자동저장" → ON toggle
     • "결과 자동공유" → OFF toggle
     • "AI 상세도" → "표준" | "간단" | "상세"
     • "음성 해설" → ON/OFF + 속도 조절

4. NOTIFICATIONS SECTION:
   - Header: "🔔 알림 설정" (16px, semibold)
   - Items:
     • "푸시 알림" → Master toggle
     • "오늘의 카드" → ON + time picker (9:00 AM)
     • "상담 완료" → ON toggle
     • "토큰 부족" → ON toggle  
     • "프로모션" → OFF toggle
     • "주간 리포트" → ON toggle
   - Each with preview: "💰 토큰이 부족합니다" sample

5. PRIVACY & SECURITY:
   - Header: "🔒 개인정보 & 보안" (16px, semibold)
   - Items:
     • "생체인증" → Face ID ON toggle
     • "자동 로그인" → ON toggle
     • "데이터 분석 동의" → ON toggle
     • "개인정보 처리방침" → External link
     • "쿠키 설정" → "필수만" | "전체"

6. DATA & STORAGE:
   - Header: "💾 데이터 관리" (16px, semibold)
   - Items:
     • "캐시 정리" → "324MB 사용 중" + "정리" button
     • "오프라인 저장" → "최근 10개 상담" setting
     • "자동 백업" → iCloud ON toggle
     • "데이터 내보내기" → "JSON" | "PDF" options
     • "모든 데이터 삭제" → Danger zone

7. SUPPORT & INFO:
   - Header: "🛠️ 지원 및 정보" (16px, semibold)
   - Items:
     • "도움말" → In-app guide
     • "문의하기" → Contact form
     • "버그 신고" → Report form
     • "평가하기" → App Store link
     • "앱 정보" → Version, licenses, credits

SETTING ITEM DESIGN:
- Standard height: 52px per item
- Left: Icon (24×24px) + Title (16px, medium)
- Right: Current value/toggle + Arrow (if navigates)
- Divider lines between sections
- Subtle press feedback

TOGGLE DESIGN:
- iOS-style switches for ON/OFF settings
- Immediate feedback without confirmation
- Disabled state for dependent settings
- Group toggles (turning off push disables all notifications)

DANGER ZONES:
- Red color coding for destructive actions
- Confirmation dialogs for critical changes
- "Are you sure?" patterns
- Recovery information when appropriate

SEARCH FUNCTIONALITY:
- Real-time filtering as user types
- Highlight matching text in results
- Category headers remain for context
- "No results" state with suggestions

VISUAL HIERARCHY:
- Clear section grouping with spacing
- Consistent iconography
- Appropriate use of color for status
- Loading states for network-dependent settings
```

### 설정 사용성 원칙
- **논리적 그룹핑**: 관련 설정들을 함께 배치
- **즉시 피드백**: 설정 변경 시 즉시 반영
- **되돌리기 가능**: 중요한 변경사항은 복구 가능
- **상황별 도움말**: 복잡한 설정에는 설명 제공

---

## 🔔 8.3 알림 설정 상세

### Figma 제작 프롬프트
```
Design a comprehensive notification management system:

LAYOUT:
- Notification type categorization
- Time-based scheduling interface
- Preview functionality for each notification type

HEADER:
- Back to settings + "🔔 알림 설정" title
- Master toggle: "모든 알림 ON/OFF" (affects all below)
- "알림 테스트" button (sends sample notification)

NOTIFICATION CATEGORIES:

1. DAILY NOTIFICATIONS:
   - Section header: "📅 정기 알림" (expandable/collapsible)
   
   • Daily Card:
     - Toggle: ON + "매일 오늘의 카드" 
     - Time picker: "🕘 오전 9:00" (wheel picker)
     - Preview: "🔮 오늘의 카드가 도착했어요!"
     - Days selector: M T W T F S S (multi-select)
     - Sound: "Default" | "Mystical" | "Silent"
   
   • Weekly Fortune:
     - Toggle: OFF + "주간 운세 알림"
     - Day picker: "월요일 아침" dropdown
     - Preview: "📊 이번 주 운세를 확인하세요"
     - Customization: "간단히" | "상세히"

2. CONSULTATION NOTIFICATIONS:
   - Section header: "🔮 상담 관련 알림"
   
   • Reading Complete:
     - Toggle: ON + "상담 결과 완료"
     - Preview: "✨ 타로 해석이 완료되었습니다"
     - Delay: "즉시" | "5분 후" | "10분 후"
   
   • Interpretation Ready:
     - Toggle: ON + "AI 해석 준비 완료" 
     - Preview: "🤖 더 상세한 해석이 준비되었어요"
     - Priority: "높음" | "보통" | "낮음"

3. ACCOUNT NOTIFICATIONS:
   - Section header: "💰 계정 및 토큰"
   
   • Token Low Warning:
     - Toggle: ON + "토큰 부족 경고"
     - Threshold: "5개 이하일 때" dropdown (1,3,5,10)
     - Preview: "💰 토큰이 부족합니다 (3개 남음)"
     - Urgency: "중요" color coding
   
   • Token Refill Complete:
     - Toggle: ON + "토큰 충전 완료"
     - Preview: "💰 토큰 30개가 충전되었습니다"
     - Celebration: Confetti animation option
   
   • Subscription Renewal:
     - Toggle: ON + "구독 갱신 알림"
     - Timing: "3일 전" | "1일 전" | "당일"
     - Preview: "💎 구독이 3일 후 갱신됩니다"

4. PROMOTIONAL NOTIFICATIONS:
   - Section header: "🎉 프로모션 및 이벤트"
   
   • Special Offers:
     - Toggle: OFF + "특가 이벤트 알림"
     - Frequency: "즉시" | "주 1회" | "월 1회"
     - Preview: "🔥 50% 할인! 놓치지 마세요"
   
   • New Features:
     - Toggle: ON + "새 기능 소개"
     - Preview: "✨ 새로운 타로 덱이 추가되었어요"

5. SMART NOTIFICATIONS:
   - Section header: "🧠 스마트 알림" (AI-powered)
   
   • Mood Detection:
     - Toggle: OFF + "감정 상태 감지"
     - Description: "텍스트 패턴으로 스트레스 감지 시 힐링 알림"
     - Preview: "🧘 힘든 하루였나요? 위로의 카드를 확인해보세요"
     - Privacy note: "개인정보는 안전하게 보호됩니다"
   
   • Pattern Recognition:
     - Toggle: OFF + "패턴 기반 추천"
     - Description: "상담 패턴 분석으로 맞춤 알림"
     - Preview: "💡 평소 이 시간에 연애 상담을 받으셨어요"

NOTIFICATION SCHEDULING:

Time Picker Interface:
- Visual clock picker for precise timing
- Multiple time slots: "오전 9시, 오후 6시" (add/remove)
- Time zone display: "GMT+9 (서울)"
- Sunrise/sunset relative timing: "일출 후 1시간"

Do Not Disturb:
- Quiet hours: "밤 10시 ~ 오전 8시" range slider
- Weekend mode: "주말에는 알림 안함" toggle
- Meeting integration: "캘린더 일정 중 알림 안함"

NOTIFICATION PREVIEW SYSTEM:
- "미리보기" button for each notification type
- Full notification appearance simulation
- Sound testing capability
- Vibration pattern testing (mobile)

DELIVERY METHOD OPTIONS:
- Push notification (default)
- Email notification (as backup)
- In-app badge only
- SMS (for critical alerts only)

ADVANCED SETTINGS:
- Notification grouping: "같은 종류 알림 묶기"
- Badge count: "앱 아이콘에 숫자 표시"
- Lock screen: "잠금화면에 표시"
- Notification history: "받은 알림 기록 보기"

ACCESSIBILITY:
- VoiceOver descriptions for all toggles
- High contrast notification previews
- Large text support in notifications
- Haptic feedback alternatives for hearing impaired
```

### 알림 개인화 전략
- **행동 기반**: 사용자의 앱 사용 패턴에 맞춘 알림 시간
- **컨텍스트 인식**: 위치, 시간, 요일 등을 고려한 스마트 알림
- **점진적 개인화**: 사용할수록 더 정확해지는 추천 시스템
- **선택권 보장**: 모든 알림에 대해 완전한 제어권 제공

---

## 🎨 8.4 테마 및 개인화 설정

### Figma 제작 프롬프트
```
Create a rich personalization and theming interface:

LAYOUT:
- Visual theme previews
- Live customization with instant feedback
- Accessibility considerations

HEADER:
- Back button + "🎨 개인화 설정" title
- "기본값 복원" link (right side)
- Current theme indicator

THEME SELECTION:

Visual Theme Previews (Card-based):
1. LIGHT THEME:
   - Preview card: 200×150px mockup showing app in light mode
   - Name: "라이트 모드" 
   - Description: "깔끔하고 밝은 테마"
   - Selection radio button
   - "기본" badge

2. DARK THEME:
   - Preview card: Shows dark interface
   - Name: "다크 모드"
   - Description: "눈이 편한 어두운 테마"
   - Battery saver note: "배터리 절약 효과"

3. AUTO THEME:
   - Preview card: Split light/dark
   - Name: "자동 (시간별)"
   - Description: "시간에 따라 자동 변경"
   - Schedule: "일몰 후 다크모드 적용"

4. MYSTICAL THEME (Premium):
   - Preview card: Purple/gold gradient theme
   - Name: "미스티컬 테마" 
   - Description: "신비로운 보라색 테마"
   - Premium badge: "💎 프리미엄 전용"

CARD DECK CUSTOMIZATION:
- Section title: "🎴 카드 덱 스타일"
- Grid layout (2×2):

  Classic Deck:
  - Card preview: Traditional Rider-Waite style
  - Name: "클래식 타로"
  - Description: "전통적인 타로 카드"
  - Free badge

  Modern Deck:
  - Card preview: Minimalist, geometric design
  - Name: "모던 타로"
  - Description: "현대적이고 세련된 디자인"
  - Premium feature

  Korean Traditional:
  - Card preview: Traditional Korean art style
  - Name: "한국 전통 덱"
  - Description: "한국 전통 미술 스타일"
  - Special edition badge

  Anime Style:
  - Card preview: Anime/manga inspired
  - Name: "애니메이션 덱"
  - Description: "귀여운 애니메이션 스타일"
  - Popular badge

INTERPRETATION STYLE SETTINGS:
- Section title: "🗣️ 해석 스타일 맞춤화"

- Tone Slider:
  직관적 ●●●○○ 논리적
  "감정 중심" ← → "사실 중심"

- Detail Level:
  간단 ○○●○○ 상세
  "핵심만" ← → "모든 내용"

- Language Style:
  친근함 ●●○○○ 격식
  "친구 같은" ← → "전문가 같은"

- Advice Focus:
  정신적 ○●●○○ 실용적
  "마음챙김" ← → "행동지침"

TYPOGRAPHY SETTINGS:
- Font size: Slider (80% ← 100% → 120%)
- Font weight: "보통" | "굵게" | "가늘게"
- Line spacing: "좁게" | "보통" | "넓게"
- Text contrast: "표준" | "높음" | "최고"

COLOR CUSTOMIZATION (Advanced):
- Primary color picker: Color wheel + hex input
- Accent color: Secondary color selection
- Background preference: "단색" | "그라데이션" | "패턴"
- Card border style: "없음" | "얇게" | "굵게"

ANIMATION PREFERENCES:
- Animation level: "없음" | "최소" | "보통" | "풍부"
- Transition speed: "빠르게" | "보통" | "느리게" 
- Card flip duration: Slider (0.3s ← 0.8s → 2.0s)
- Particle effects: ON/OFF toggle

ACCESSIBILITY ENHANCEMENTS:
- High contrast mode: ON/OFF
- Reduce motion: ON/OFF (respects system setting)
- Large text support: ON/OFF
- Voice descriptions: ON/OFF
- Screen reader optimization: ON/OFF

LIVE PREVIEW SECTION:
- Mini app preview: 200×300px live mockup
- Shows current selections in real-time
- Interactive elements work in preview
- "전체화면 미리보기" button

CUSTOM THEME CREATION (Premium):
- "나만의 테마 만들기" section
- Color palette editor
- Background image upload
- Theme name input
- Save and share options
- Community theme gallery

SEASONAL THEMES:
- Auto-changing seasonal backgrounds
- Holiday special themes
- Limited-time collaborative artist themes
- Weather-responsive themes (if location enabled)

RESET AND BACKUP:
- "기본값으로 초기화" with confirmation
- "설정 내보내기" (backup to cloud)
- "설정 불러오기" (restore from backup)
- "다른 기기와 동기화" (if signed in)
```

### 개인화 심리학
- **자기표현**: 사용자가 자신만의 스타일로 앱을 커스터마이징
- **소유감 증대**: 개인화된 경험으로 앱에 대한 애착 형성
- **사용성 향상**: 개인 선호에 맞춘 인터페이스로 편의성 증대
- **접근성 보장**: 다양한 능력과 선호를 가진 사용자 모두 고려

---

## 🎨 프로필 화면 공통 시스템

### 컴포넌트 라이브러리
```
Components/Profile/:
├── Headers/
│   ├── Profile_Header_Card
│   ├── Stats_Overview
│   ├── Achievement_Banner
│   └── Settings_Header
├── Cards/
│   ├── Feature_Card
│   ├── Subscription_Card
│   ├── Achievement_Badge
│   └── Quick_Action_Card
├── Settings/
│   ├── Setting_Item
│   ├── Toggle_Switch
│   ├── Slider_Control
│   └── Time_Picker
├── Notifications/
│   ├── Notification_Preview
│   ├── Schedule_Picker
│   ├── Category_Section
│   └── Test_Button
└── Themes/
    ├── Theme_Preview_Card
    ├── Color_Picker
    ├── Font_Adjuster
    └── Live_Preview
```

### 데이터 구조
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  joinDate: Date;
  level: 'beginner' | 'intermediate' | 'advanced';
  statistics: {
    totalConsultations: number;
    monthlyConsultations: number;
    favoriteCategory: string;
    satisfactionRate: number;
    currentStreak: number;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto' | 'mystical';
    cardDeck: string;
    interpretationStyle: {
      tone: number; // 1-5 scale
      detail: number;
      language: number;
      focus: number;
    };
    notifications: NotificationSettings;
  };
  subscription: {
    plan: 'free' | 'premium' | 'master';
    renewalDate?: Date;
    features: string[];
  };
  achievements: Achievement[];
}
```

### 상태 관리 패턴
```typescript
// 설정 변경 시 즉시 반영
const updateSetting = (key: string, value: any) => {
  // Local state 업데이트
  setSettings(prev => ({ ...prev, [key]: value }));
  
  // 서버 동기화 (debounced)
  debouncedSync(key, value);
  
  // 로컬 스토리지 백업
  localStorage.setItem('userSettings', JSON.stringify(settings));
};

// 테마 변경 시 실시간 적용
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```

### 접근성 고려사항
- **키보드 네비게이션**: Tab 순서와 포커스 관리
- **스크린 리더**: 의미있는 라벨과 설명
- **색상 대비**: WCAG 2.1 AA 기준 준수
- **모션 감소**: 사용자 설정에 따른 애니메이션 제어

## 🔄 설정 동기화 및 백업

### 클라우드 동기화
- **자동 백업**: 설정 변경 시 자동으로 클라우드 저장
- **기기 간 동기화**: 여러 기기에서 일관된 경험
- **충돌 해결**: 다른 기기에서 변경된 설정 우선순위
- **오프라인 지원**: 네트워크 없을 때도 로컬 설정 유지

### 개인데이터 보호
- **암호화**: 민감한 설정 정보 암호화 저장
- **최소 수집**: 꼭 필요한 정보만 서버에 저장
- **삭제 권리**: 사용자 요청 시 모든 데이터 완전 삭제
- **투명성**: 어떤 데이터가 어디에 저장되는지 명확히 안내

### 마이그레이션 전략
- **버전 호환성**: 앱 업데이트 시 설정 호환성 보장
- **기본값 처리**: 새로운 설정에 대한 합리적 기본값
- **점진적 마이그레이션**: 한 번에 모든 설정을 바꾸지 않음
- **복구 옵션**: 설정 문제 시 이전 상태로 복구

## 📊 사용자 행동 분석

### 설정 사용 패턴
- **인기 설정**: 사용자들이 가장 많이 변경하는 설정
- **포기율 분석**: 어떤 설정에서 사용자가 포기하는가
- **개인화 수준**: 얼마나 많은 설정을 개인화하는가
- **만족도 상관관계**: 개인화 수준과 앱 만족도 관계

### A/B 테스트 기회
- **기본 테마**: 라이트 vs 다크 기본값 비교
- **설정 그룹핑**: 다른 방식의 설정 분류 테스트
- **온보딩**: 초기 개인화 설정 과정 최적화
- **UI 패턴**: 토글 vs 드롭다운 등 인터페이스 비교

## 📋 품질 보증 체크리스트

### 기능 완성도
- [ ] 모든 설정이 정상 작동
- [ ] 실시간 미리보기 정확성
- [ ] 설정 저장/복원 완벽
- [ ] 기본값 복원 정상

### 사용자 경험
- [ ] 직관적인 설정 분류
- [ ] 명확한 설정 설명
- [ ] 즉시 피드백 제공
- [ ] 오류 상황 우아한 처리

### 성능 최적화
- [ ] 설정 변경 시 지연 없음
- [ ] 메모리 사용량 적정
- [ ] 배터리 소모 최소화
- [ ] 네트워크 사용 효율적

### 보안 및 개인정보
- [ ] 민감 정보 암호화
- [ ] 권한 최소화 원칙
- [ ] 투명한 데이터 사용
- [ ] 안전한 백업/복원