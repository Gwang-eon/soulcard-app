# 🧩 컴포넌트 라이브러리 Figma 구축 가이드

## 📚 Design System 개요

### 컴포넌트 라이브러리 구조
```
🔮 AI 타로카드 마스터 Design System/
├── 01_Foundations/
│   ├── Colors
│   ├── Typography  
│   ├── Spacing
│   ├── Shadows
│   └── Icons
├── 02_Atoms/
│   ├── Buttons
│   ├── Inputs
│   ├── Labels
│   ├── Badges
│   └── Dividers
├── 03_Molecules/
│   ├── Form_Groups
│   ├── Card_Headers
│   ├── Navigation_Items
│   ├── Progress_Indicators
│   └── Toast_Messages
├── 04_Organisms/
│   ├── Headers
│   ├── Forms
│   ├── Card_Layouts
│   ├── Lists
│   └── Modals
└── 05_Templates/
    ├── Page_Layouts
    ├── Screen_Templates
    └── Flow_Patterns
```

---

## 🎨 01. Foundations (기초 요소)

### Colors 컴포넌트
```
컴포넌트명: Color/Primary_Palette
설명: 메인 브랜드 컬러 시스템

Variants:
- Primary_50 (#f0f4ff)
- Primary_100 (#e0e7ff)
- Primary_200 (#c7d2fe)
- Primary_300 (#a5b4fc)
- Primary_400 (#818cf8)
- Primary_500 (#6366f1) [Base]
- Primary_600 (#4f46e5)
- Primary_700 (#4338ca)
- Primary_800 (#3730a3)
- Primary_900 (#312e81)

Properties:
- Color: Color value
- Usage: Text description
- Contrast_Ratio: Number
```

### Typography 컴포넌트
```
컴포넌트명: Text/Heading_System
설명: 일관된 텍스트 스타일 시스템

Variants:
- Display_Large (60px/1.1/-0.025em)
- Display_Medium (48px/1.1/-0.025em)
- Heading_Large (36px/1.2/-0.025em)
- Heading_Medium (30px/1.3/-0.025em)
- Heading_Small (24px/1.3/-0.025em)
- Body_Large (18px/1.5/0em)
- Body_Medium (16px/1.6/0em)
- Body_Small (14px/1.5/0em)
- Caption (12px/1.4/0.025em)

Properties:
- Text: String
- Color: Color token
- Weight: Font weight (400, 500, 600, 700)
```

### Spacing 컴포넌트
```
컴포넌트명: Spacing/Token_System
설명: 일관된 간격 시스템

Variants:
- XS (4px)
- SM (8px)  
- MD (16px)
- LG (24px)
- XL (32px)
- 2XL (48px)
- 3XL (64px)

사용법:
- Padding: 컴포넌트 내부 간격
- Margin: 컴포넌트 외부 간격
- Gap: Grid/Flex 아이템 간 간격
```

---

## ⚛️ 02. Atoms (원자 컴포넌트)

### Button 컴포넌트 시스템

#### Primary Button
```
컴포넌트명: Button/Primary
설명: 주요 행동을 위한 버튼

Figma 제작 프롬프트:
Create a primary button component with these specifications:

BASE PROPERTIES:
- Size: 353×52px (full width) | 160×52px (standard) | 120×52px (compact)
- Border radius: 8px
- Background: Linear gradient (#667eea to #764ba2)
- Text: 16px, medium weight, white color
- Icon support: 24×24px icon + 8px gap from text

STATES:
- Default: Full opacity, subtle shadow
- Hover: Slight scale (1.02), increased shadow
- Active: Scale (0.98), reduced shadow  
- Disabled: 50% opacity, no interactions
- Loading: Spinner overlay, text hidden

VARIANTS:
- Size: Large (52px) | Medium (44px) | Small (36px)
- Width: Full | Fixed | Auto
- Icon: None | Left | Right | Only
- Type: Gradient | Solid | With_Shadow

Properties to expose:
- Text: String
- Size: Large/Medium/Small
- Width: Full/Fixed/Auto  
- Icon: Icon component
- Icon_Position: Left/Right/None
- Disabled: Boolean
- Loading: Boolean
```

#### Secondary Button
```
컴포넌트명: Button/Secondary
설명: 보조 행동을 위한 버튼

BASE PROPERTIES:
- Same sizes as Primary
- Background: Transparent
- Border: 2px solid #4f46e5
- Text: 16px, medium weight, #4f46e5 color
- Hover: Background becomes #4f46e5, text becomes white

STATES:
- Default: Transparent background, colored border
- Hover: Filled background, white text
- Active: Slightly darker fill
- Disabled: Gray border and text
- Loading: Border spinner animation

Properties:
- Text: String
- Size: Large/Medium/Small
- Icon: Icon component
- Icon_Position: Left/Right/None
- Disabled: Boolean
```

#### Ghost Button
```
컴포넌트명: Button/Ghost
설명: 최소한의 스타일 버튼

BASE PROPERTIES:
- Transparent background
- No border
- Text color matches context
- Subtle hover background (rgba(255,255,255,0.1))
- Used for navigation, secondary actions

States & Properties similar to other buttons
```

### Input 컴포넌트 시스템

#### Text Input
```
컴포넌트명: Input/Text_Field
설명: 기본 텍스트 입력 필드

Figma 제작 프롬프트:
Design a comprehensive text input component:

BASE STRUCTURE:
- Container: 353×52px (full width)
- Background: rgba(255,255,255,0.1) with backdrop blur
- Border: 1px solid rgba(255,255,255,0.2)
- Border radius: 8px
- Padding: 12px 16px

LABEL SYSTEM:
- Floating label animation
- Label: 14px, medium weight
- Default position: Inside input, vertically centered
- Focus position: Above input, smaller (12px)
- Error state: Red color (#ef4444)

INPUT AREA:
- Text: 16px, normal weight
- Placeholder: 16px, 50% opacity
- Cursor: Brand color
- Selection: Brand color background

STATES:
- Default: Subtle border, no focus ring
- Focus: Brand color border (2px), glow effect
- Error: Red border, error icon, error message below
- Disabled: 50% opacity, no interaction
- Success: Green accent, checkmark icon

VARIANTS:
- Type: Text | Email | Password | Number | Search
- Size: Large (52px) | Medium (44px) | Small (36px)
- Width: Full | Fixed
- Icon: None | Left | Right
- Label: Floating | Fixed | None

Properties:
- Placeholder: String
- Label: String
- Value: String
- Type: Input type
- Error_Message: String
- Success_Message: String
- Disabled: Boolean
- Required: Boolean
- Left_Icon: Icon component
- Right_Icon: Icon component
```

#### Textarea
```
컴포넌트명: Input/Textarea
설명: 멀티라인 텍스트 입력

Similar structure to Text Input but:
- Height: Auto-expanding (min 100px, max 200px)
- Resize: Vertical only
- Character counter: Bottom-right corner
- Scrollbar: Custom styled for consistency
```

### Badge 컴포넌트
```
컴포넌트명: Badge/Status_Indicator
설명: 상태나 카테고리 표시

BASE STRUCTURE:
- Height: 24px (compact) | 32px (standard)
- Padding: 4px 8px (compact) | 6px 12px (standard)
- Border radius: 12px (pill shape)
- Text: 12px (compact) | 14px (standard), medium weight

VARIANTS:
- Style: Filled | Outlined | Subtle
- Color: Primary | Secondary | Success | Warning | Error | Info
- Size: Compact | Standard | Large
- Icon: None | Left | Only

COLOR SYSTEM:
- Primary: Brand gradient background, white text
- Success: Green background (#10b981), white text
- Warning: Orange background (#f59e0b), white text
- Error: Red background (#ef4444), white text
- Info: Blue background (#3b82f6), white text

Properties:
- Text: String
- Style: Filled/Outlined/Subtle
- Color: Color variant
- Size: Compact/Standard/Large
- Icon: Icon component
```

---

## 🧬 03. Molecules (분자 컴포넌트)

### Form Group
```
컴포넌트명: Form/Field_Group
설명: 라벨, 입력, 도움말을 포함한 완전한 폼 필드

STRUCTURE:
- Label (top): 16px, medium weight, required indicator
- Input field: Any input atom component
- Helper text (bottom): 14px, secondary color
- Error message (bottom): 14px, error color
- Spacing: 8px between elements

STATES:
- Normal: All elements in default state
- Focus: Input focused, label highlighted
- Error: Error state propagated, error message shown
- Disabled: All elements disabled

Properties:
- Label: String
- Required: Boolean
- Helper_Text: String
- Error_Message: String
- Input_Component: Input atom
```

### Card Header
```
컴포넌트명: Card/Header_Section
설명: 카드 상단 제목과 액션 영역

STRUCTURE:
- Container: Full width, 60px height
- Left area: Icon (24×24px) + Title (18px, semibold)
- Right area: Action buttons or badges
- Bottom border: 1px solid divider color

VARIANTS:
- Style: Simple | With_Actions | With_Badge
- Size: Compact (48px) | Standard (60px) | Large (72px)

Properties:
- Title: String
- Icon: Icon component
- Action: Button component
- Badge: Badge component
```

### Progress Indicator
```
컴포넌트명: Progress/Step_Indicator
설명: 단계별 진행 상황 표시

STRUCTURE:
- Dots: 8×8px circles with 16px spacing
- Active dot: Brand color, larger (12×12px)
- Inactive dot: Gray color, standard size
- Completed dot: Brand color with checkmark
- Connecting lines: 1px solid, between dots

VARIANTS:
- Style: Dots | Numbers | Progress_Bar
- Steps: 3 | 4 | 5 | Custom
- Orientation: Horizontal | Vertical

Properties:
- Total_Steps: Number
- Current_Step: Number
- Completed_Steps: Array
- Style: Dots/Numbers/Bar
```

---

## 🏗️ 04. Organisms (유기체 컴포넌트)

### App Header
```
컴포넌트명: Header/App_Navigation
설명: 앱 상단 네비게이션 헤더

Figma 제작 프롬프트:
Create a comprehensive app header component:

STRUCTURE:
- Container: 393×60px (full width, status bar safe)
- Background: Translucent with backdrop blur
- Border bottom: 1px solid divider (optional)

LAYOUT AREAS:
- Left (80px): Back button or logo
- Center (233px): Title or search bar  
- Right (80px): Action buttons (notifications, profile)

VARIANTS:
- Type: Default | Search | Modal | Minimalist
- Background: Solid | Translucent | Transparent
- Border: With | Without
- Height: Standard (60px) | Compact (50px) | Large (72px)

LEFT AREA OPTIONS:
- Logo: App icon + title
- Back button: Arrow + optional title
- Menu button: Hamburger icon
- Close button: X icon for modals

CENTER AREA OPTIONS:  
- Title: Screen title (20px, semibold)
- Search bar: Full input field
- Breadcrumbs: Navigation path
- Empty: For minimal designs

RIGHT AREA OPTIONS:
- Single action: One primary button/icon
- Multiple actions: 2-3 icon buttons
- Profile: Avatar + name (compact)
- Notifications: Bell icon + badge count

STATES:
- Default: Normal appearance
- Scrolled: Reduced opacity or height
- Search_Active: Search bar expanded
- Loading: Progress bar at bottom

Properties:
- Type: Default/Search/Modal/Minimalist
- Left_Content: Component
- Center_Content: Component  
- Right_Content: Component
- Background_Style: Solid/Translucent/Transparent
- Show_Border: Boolean
- Height: Standard/Compact/Large
```

### Tarot Card Component
```
컴포넌트명: Card/Tarot_Display
설명: 타로카드 표시 컴포넌트

STRUCTURE:
- Aspect ratio: 5:8 (0.625)
- Border radius: 12px
- Drop shadow: 0 4px 12px rgba(102, 126, 234, 0.25)
- Border: 2px solid rgba(255, 255, 255, 0.2)

CARD SIDES:
- Front: Card artwork + name + number
- Back: Mystical pattern + app branding
- Flip animation: 3D transform effect

SIZES:
- Thumbnail: 40×64px
- Small: 60×96px
- Medium: 80×128px  
- Large: 120×192px
- Detail: 160×256px

STATES:
- Normal: Default appearance
- Hover: Slight lift (translateY(-4px))
- Selected: Glow effect + scale(1.05)
- Flipping: 3D rotation animation
- Revealed: Front side showing

VARIANTS:
- Side: Front | Back
- Size: Thumbnail | Small | Medium | Large | Detail
- State: Normal | Hover | Selected | Disabled
- Orientation: Upright | Reversed
- Quality: Standard | Premium | Animated

Properties:
- Card_Data: Card information object
- Size: Size variant
- Show_Side: Front/Back
- Orientation: Upright/Reversed
- Interactive: Boolean
- Glow_Color: Color for selection
```

### Consultation Card
```
컴포넌트명: Card/Consultation_Type
설명: 상담 타입 선택 카드

STRUCTURE:
- Container: 353×120px (can vary by importance)
- Background: Gradient or solid with pattern
- Border radius: 16px
- Padding: 20px

CONTENT LAYOUT:
- Icon area (top-left): 32×32px category icon
- Title area: Service name (18px, semibold)
- Description: Brief explanation (14px, secondary)
- Token cost (top-right): "💰 3" format
- Features list: Bullet points of included features
- Badge area: "인기", "추천" badges

VARIANTS:
- Prominence: Standard | Featured | Premium
- Category: Love | Career | Money | Health | General
- State: Default | Selected | Disabled

STATES:
- Default: Subtle shadow, normal colors
- Hover: Lift effect, increased shadow
- Selected: Brand color border, checkmark
- Disabled: Grayed out, no interaction

Properties:
- Title: String
- Description: String
- Icon: Icon component
- Token_Cost: Number
- Features: Array of strings
- Badge: Badge component
- Category: Consultation category
- Selected: Boolean
- Disabled: Boolean
```

---

## 📄 05. Templates (템플릿)

### Screen Template
```
컴포넌트명: Template/Standard_Screen
설명: 기본 화면 레이아웃 템플릿

STRUCTURE:
- Status bar: 44px (iOS safe area)
- Header: 60px (app navigation)
- Content area: Remaining height (scrollable)
- Bottom tabs: 83px (if applicable)
- Safe area margins: 20px left/right

CONTENT AREA VARIANTS:
- Scrolling: Full height scrollable content
- Fixed: Non-scrolling content with fixed elements
- Modal: Centered content with backdrop
- Split: Two-column layout for larger screens

Properties:
- Header_Component: Header organism
- Content: Main content area
- Bottom_Component: Tab bar or actions
- Background: Background treatment
- Safe_Area: Boolean for safe area handling
```

### Modal Template
```
컴포넌트명: Template/Modal_Overlay
설명: 모달 다이얼로그 템플릿

STRUCTURE:
- Backdrop: Full screen, semi-transparent
- Modal card: Centered, max 90% screen width
- Header: Title + close button
- Content: Scrollable if needed
- Actions: Button row at bottom

VARIANTS:
- Size: Small | Medium | Large | Full_Screen
- Style: Card | Sheet | Popup
- Animation: Fade | Scale | Slide_Up

Properties:
- Title: String
- Content: Content component
- Actions: Button components
- Size: Size variant
- Dismissible: Boolean
```

---

## 🎯 컴포넌트 명명 규칙

### 네이밍 컨벤션
```
Format: Category/Component_Name

Categories:
- Foundation/ (색상, 타이포그래피, 간격)
- Atom/ (버튼, 입력, 라벨, 배지)  
- Molecule/ (폼 그룹, 카드 헤더, 리스트 아이템)
- Organism/ (헤더, 폼, 카드 레이아웃)
- Template/ (페이지 레이아웃, 화면 템플릿)

Examples:
✅ Button/Primary
✅ Input/Text_Field
✅ Card/Tarot_Display
✅ Header/App_Navigation
✅ Template/Standard_Screen

❌ PrimaryButton
❌ text-input
❌ TarotCardComponent
```

### Variant 명명
```
States: Default | Hover | Active | Disabled | Loading
Sizes: XS | SM | MD | LG | XL
Colors: Primary | Secondary | Success | Warning | Error
Types: Solid | Outline | Ghost | Link

Examples:
- Button/Primary → Size: Large, State: Hover
- Input/Text_Field → Type: Email, State: Error
- Badge/Status → Color: Success, Size: Compact
```

---

## 🔧 컴포넌트 Property 시스템

### 표준 Properties
```
모든 컴포넌트 공통:
- Visible: Boolean (표시 여부)
- Disabled: Boolean (비활성화 여부)
- Size: Variant (크기 옵션)
- Custom_CSS: String (추가 스타일링)

Interactive 컴포넌트 추가:
- On_Click: Action (클릭 이벤트)
- Loading: Boolean (로딩 상태)
- State: Variant (상호작용 상태)

Text 포함 컴포넌트 추가:
- Text: String (표시 텍스트)
- Font_Size: Number (글자 크기)
- Text_Color: Color (텍스트 색상)

Container 컴포넌트 추가:
- Width: Auto | Fixed | Full
- Height: Auto | Fixed | Full  
- Padding: Spacing token
- Margin: Spacing token
```

### Auto Layout 사용
```
모든 컴포넌트에 Auto Layout 적용:
- Direction: Horizontal | Vertical
- Alignment: Start | Center | End | Stretch
- Spacing: Spacing token values
- Padding: Consistent with design system
- Resizing: Hug | Fill | Fixed

장점:
- 반응형 레이아웃 자동 처리
- 콘텐츠 길이에 따른 자동 크기 조정
- 일관된 간격 유지
- 다국어 대응 용이
```

---

## 📚 컴포넌트 문서화

### Figma 컴포넌트 설명
```
각 컴포넌트마다 포함할 정보:

1. Description (설명):
   - 컴포넌트의 목적과 사용 시기
   - 주요 기능과 특징
   - 관련 컴포넌트와의 관계

2. Usage Guidelines (사용 가이드):
   - 언제 사용해야 하는가
   - 언제 사용하면 안 되는가
   - 대안 컴포넌트 제안

3. Anatomy (구조):
   - 컴포넌트 구성 요소
   - 각 요소의 역할
   - 필수/선택 요소 구분

4. Variants (변형):
   - 사용 가능한 모든 변형
   - 각 변형의 사용 사례
   - 조합 가능한 속성

5. States (상태):
   - 모든 인터랙션 상태
   - 상태 전환 조건
   - 애니메이션 가이드

6. Examples (예시):
   - 실제 화면에서의 사용 예
   - Do/Don't 예시
   - 다양한 컨텍스트에서의 활용
```

### 개발자 핸드오프
```
개발 전달 시 포함할 정보:

1. Technical Specs:
   - 정확한 크기와 간격
   - 색상 토큰 및 Hex 값
   - 폰트 스타일과 line-height
   - Border radius, shadow 값

2. Interactive Behavior:
   - 호버/클릭 효과
   - 애니메이션 타이밍
   - 상태 전환 로직
   - 키보드 인터랙션

3. Responsive Rules:
   - 다양한 화면 크기에서의 동작
   - 최소/최대 크기 제한
   - 텍스트 overflow 처리
   - 터치 타겟 크기

4. Accessibility:
   - Screen reader 라벨
   - ARIA 속성
   - 키보드 네비게이션
   - 색상 대비 정보

5. Performance:
   - 이미지 최적화 가이드
   - 애니메이션 성능 고려사항
   - 지연 로딩 가능 여부
```

---

## 🔄 컴포넌트 업데이트 관리

### 버전 관리
```
컴포넌트 버전 체계:
- Major (1.0.0): 호환성 깨지는 변경
- Minor (1.1.0): 새 기능 추가
- Patch (1.1.1): 버그 수정

업데이트 알림:
- Figma 팀원들에게 변경사항 알림
- 영향받는 화면 리스트 제공
- 마이그레이션 가이드 제공
- 롤백 계획 수립
```

### 품질 관리
```
컴포넌트 출시 전 체크리스트:
- [ ] 모든 Variant 및 State 포함
- [ ] Auto Layout 올바르게 설정
- [ ] Property 이름 명확하고 일관성 있음
- [ ] 접근성 가이드라인 준수
- [ ] 다양한 콘텐츠 길이로 테스트
- [ ] 다크모드 호환성 확인
- [ ] 개발자 핸드오프 준비 완료
- [ ] 사용 예제 및 문서 작성

정기 리뷰:
- 월 1회 컴포넌트 사용률 분석
- 분기 1회 전체 시스템 점검
- 연 2회 대대적인 업데이트
- 지속적인 사용자 피드백 수집
```

이 컴포넌트 라이브러리를 통해 일관되고 효율적인 디자인 시스템을 구축할 수 있으며, 개발팀과의 협업도 크게 향상될 것입니다.