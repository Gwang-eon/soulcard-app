# 🔐 인증 화면 Figma 제작 가이드

## 🎭 2.1 로그인 방식 선택

### Figma 제작 프롬프트
```
Design a premium login selection screen for mystical tarot app:

LAYOUT:
- Frame: iPhone 14 Pro (393×852px)  
- Status bar included (44px height)
- Safe area margins: 20px left/right
- Centered content with proper spacing

HEADER SECTION:
- App logo/icon: 🔮 (48×48px) with subtle glow
- App title: "🔮 로그인" (28px, bold, #1f2937)
- Subtitle: "신비로운 타로 여행을 시작하세요" (16px, #6b7280)

MAIN CONTENT (Login Options):
1. DEMO MODE CARD:
   - Large card (353×80px) with premium styling
   - Icon: 🎭 (24×24px)
   - Title: "데모 체험" (18px, semibold)
   - Subtitle: "3회 무료 상담" (14px, #10b981)
   - Background: Subtle gradient with sparkle pattern
   - Border: 1px solid rgba(102, 126, 234, 0.2)

2. EMAIL LOGIN:
   - Standard button style (353×52px)
   - Icon: 📧 (20×20px)  
   - Text: "이메일로 시작하기" (16px, medium)
   - Background: White with subtle shadow

3. GOOGLE LOGIN:
   - Same size as email button
   - Google "G" icon (20×20px)
   - Text: "구글로 시작하기" (16px, medium)
   - Background: #4285f4 with proper branding

FOOTER:
- Sign up link: "아직 계정이 없으신가요? 회원가입" (14px)
- Underlined "회원가입" in brand color (#667eea)

VISUAL ELEMENTS:
- Subtle mystical background pattern
- Floating card silhouettes (low opacity)
- Soft shadows and subtle animations
- Professional spiritual aesthetic

STYLE NOTES:
- Prominent demo option to encourage trials
- Clear visual hierarchy
- Accessible touch targets (min 44px height)
- Consistent with onboarding design system
```

### 특별 강조 요소
- **데모 모드**: 가장 눈에 띄는 옵션으로 배치
- **무료 체험**: 그린 컬러로 "3회 무료" 텍스트 강조
- **소셜 로그인**: 브랜드 가이드라인 준수
- **회원가입 유도**: 자연스럽고 부담없는 링크

---

## 🎪 2.2 데모 모드 안내

### Figma 제작 프롬프트
```
Create an engaging demo mode explanation screen:

LAYOUT:
- Modal-style overlay design
- Dark backdrop with blur effect
- Centered content card (333×400px)
- Rounded corners (20px) with premium styling

HEADER:
- Close button (×) in top-right corner
- Demo icon: 🎭 (40×40px) with subtle animation
- Title: "데모 모드 안내" (24px, bold, #1f2937)

CONTENT SECTIONS:

1. BENEFITS (What you GET):
   - ✅ "3회 무료 상담" (18px, #10b981, checkmark icon)
   - ✅ "모든 기능 체험" (18px, #10b981)  
   - ✅ "AI 해석 확인" (18px, #10b981)
   - Clean list layout with proper spacing

2. LIMITATIONS (What you DON'T get):
   - ❌ "기록 저장 불가" (16px, #ef4444, X icon)
   - ❌ "알림 설정 불가" (16px, #ef4444)
   - ❌ "개인화 기능 제한" (16px, #ef4444)

3. UPGRADE INCENTIVE:
   - Highlighted box with gradient border
   - Text: "🔄 체험 후 회원가입시 추가 토큰 5개 증정!"
   - Background: Subtle gradient (#f0f4ff to #e0e7ff)
   - Border: 2px solid #667eea

ACTION BUTTONS:
- Primary: "시작하기" (full width, gradient background)
- Secondary: "뒤로" (outline style, secondary color)
- Proper spacing between buttons (12px)

VISUAL ELEMENTS:
- Soft box shadow around modal
- Subtle background pattern
- Icon consistency throughout
- Premium glass morphism effects
- Smooth entrance animation ready

ACCESSIBILITY:
- High contrast ratios
- Clear visual hierarchy  
- Proper touch targets
- Screen reader friendly structure
```

### 사용자 경험 고려사항
- **명확한 가치 제시**: 무료로 받을 수 있는 것들 강조
- **투명한 제한사항**: 제한사항도 솔직하게 표시
- **업그레이드 동기**: 회원가입 시 추가 혜택 제공
- **부담없는 진입**: "일단 써보기" 쉽게 만들기

---

## 👤 2.3 회원가입 화면

### Figma 제작 프롬프트
```
Design a user-friendly sign-up form for tarot app:

LAYOUT:
- Full screen form layout
- Sticky header with back button
- Scrollable content area
- Fixed bottom action button

HEADER:
- Back arrow (left, 24×24px)
- Title: "👤 회원가입" (20px, semibold, centered)
- Progress indicator: Step 1 of 2 (optional)

FORM FIELDS:

1. EMAIL INPUT:
   - Label: "📧 이메일" (16px, medium, #374151)
   - Input field: Full width, 52px height
   - Placeholder: "your@email.com"
   - Validation states: normal, error, success
   - Helper text area for error messages

2. PASSWORD INPUT:
   - Label: "🔐 비밀번호" (16px, medium)
   - Input with show/hide toggle (eye icon)
   - Password strength indicator bar
   - Requirements text: "8자 이상, 숫자 포함"

3. PASSWORD CONFIRM:
   - Label: "🔐 비밀번호 확인"
   - Same styling as password
   - Real-time matching validation

4. BIRTHDATE (Optional):
   - Label: "🎂 생년월일 (선택)" 
   - Date picker input
   - Helper: "더 정확한 점성 분석을 위해"
   - Clearly marked as optional

AGREEMENTS:
- Checkbox list with proper spacing:
  ☑️ "이용약관 동의 (필수)" - with link to terms
  ☑️ "개인정보 처리방침 동의 (필수)" - with link
  ☐ "마케팅 정보 수신 동의 (선택)" - with benefits

BOTTOM SECTION:
- Primary button: "가입하기" (full width, disabled until required fields filled)
- Alternative: "이미 계정이 있으신가요? 로그인"
- Social sign-up options: "또는 소셜 계정으로 빠르게"

VALIDATION & STATES:
- Real-time field validation
- Error states with clear messages
- Success states with green indicators
- Loading state for submit button
- Network error handling UI

STYLE ELEMENTS:
- Consistent input field styling
- Proper form spacing (16px between fields)
- Clear visual hierarchy
- Accessible color contrast
- Touch-friendly interactive elements
```

### 폼 디자인 원칙
- **점진적 공개**: 필수 정보부터 차례대로 입력
- **실시간 피드백**: 입력 중 즉시 유효성 검사
- **명확한 안내**: 각 필드의 요구사항 명시
- **선택 강조**: 필수/선택 항목 명확히 구분

---

## 🔓 2.4 로그인 화면

### Figma 제작 프롬프트
```
Create a clean and trustworthy login screen:

LAYOUT:
- Minimalist design approach
- Focused on essential elements only
- Comfortable spacing and typography

HEADER:
- Simple back button
- Title: "로그인" (24px, semibold)
- Optional app logo (small, 32×32px)

LOGIN FORM:
1. EMAIL FIELD:
   - Clean input styling (52px height)
   - Icon: 📧 (internal, left side)
   - Placeholder: "이메일 주소"
   - Auto-complete support
   - Error state design

2. PASSWORD FIELD:
   - Same styling as email
   - Icon: 🔐 (internal, left side)  
   - Show/hide password toggle (right side)
   - Forgot password link (below field, right-aligned)

LOGIN BUTTON:
- Primary button: "로그인" (full width)
- Loading state with spinner
- Success animation ready

ALTERNATIVE OPTIONS:
- Divider: "또는" with horizontal lines
- Social login: Google button (consistent with signup)
- Demo mode: Quick access link

FOOTER LINKS:
- "비밀번호를 잊으셨나요?" (prominent link)
- "아직 계정이 없으신가요? 회원가입" (standard link)

ERROR HANDLING:
- Invalid credentials message
- Network error states  
- Rate limiting feedback
- Clear error recovery paths

SECURITY ELEMENTS:
- Remember me checkbox (optional)
- Secure connection indicator
- Biometric login option (Face ID/Touch ID)

ACCESSIBILITY:
- Proper form labels
- Keyboard navigation support
- Screen reader optimizations
- High contrast mode support
```

### 보안 및 사용성
- **자동완성 지원**: 브라우저/앱의 자동완성 활용
- **생체인증**: Face ID, Touch ID 옵션 제공
- **에러 메시지**: 구체적이지만 보안에 해롭지 않은 메시지
- **비밀번호 재설정**: 쉽고 명확한 복구 경로

---

## 🎨 공통 디자인 요소

### 인증 컴포넌트 라이브러리
```
Components/Auth/:
├── Forms/
│   ├── Input_Email
│   ├── Input_Password
│   ├── Input_Date
│   └── Checkbox_Agreement
├── Buttons/
│   ├── Login_Primary
│   ├── Social_Google
│   ├── Demo_Special
│   └── Link_Secondary
├── Cards/
│   ├── Login_Option_Card
│   ├── Demo_Info_Modal
│   └── Feature_Highlight
└── States/
    ├── Loading_Spinner
    ├── Success_Check
    ├── Error_Message
    └── Validation_Feedback
```

### 폼 상태 시스템
```css
/* 입력 필드 상태 */
.input-normal {
  border: 1px solid #d1d5db;
  background: #ffffff;
}

.input-focus {
  border: 2px solid #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-error {
  border: 2px solid #ef4444;
  background: #fef2f2;
}

.input-success {
  border: 2px solid #10b981;
  background: #f0fdf4;
}

/* 버튼 상태 */
.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.button-loading {
  position: relative;
  color: transparent;
}

.button-loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}
```

### 애니메이션 가이드
- **화면 전환**: 부드러운 슬라이드 애니메이션
- **폼 피드백**: 실시간 유효성 검사 표시
- **버튼 상호작용**: 탭 피드백과 상태 변화
- **에러 표시**: 부드러운 쉐이크 효과

### 다국어 대응
- **텍스트 길이**: 다양한 언어의 텍스트 길이 고려
- **RTL 레이아웃**: 아랍어 등 우→좌 언어 지원
- **현지화 요소**: 지역별 소셜 로그인 옵션
- **문화적 배려**: 생년월일 입력 등 민감한 정보 처리

## 📱 반응형 고려사항

### 화면 크기별 최적화
- **작은 화면**: 폼 요소 크기 조정, 스크롤 최적화
- **큰 화면**: 2컬럼 레이아웃, 여백 활용
- **태블릿**: 중앙 정렬된 최대 너비 설정
- **가로 모드**: 레이아웃 재배치

### 키보드 대응
- **키보드 표시**: 입력 필드가 키보드에 가려지지 않도록
- **탭 순서**: 논리적인 포커스 이동
- **완료 버튼**: 키보드의 "완료" 버튼 동작
- **자동 포커스**: 첫 번째 입력 필드 자동 포커스

## 📋 검토 체크리스트

### 사용성 검증
- [ ] 모든 폼 필드 접근 가능
- [ ] 에러 메시지 명확하고 도움이 됨
- [ ] 성공 플로우 부드럽게 진행
- [ ] 뒤로가기 동작 자연스러움

### 보안 검토
- [ ] 비밀번호 필드 적절히 마스킹
- [ ] 민감한 정보 자동완성 비활성화
- [ ] HTTPS 연결 표시
- [ ] 에러 메시지에 보안 정보 노출 없음

### 접근성 확인
- [ ] 스크린 리더 호환성
- [ ] 키보드 네비게이션 완전 지원
- [ ] 색상 대비 충족
- [ ] 터치 타겟 크기 적절