# 🎨 Figma 환경 설정 가이드

## 📱 프로젝트 기본 설정

### 캔버스 설정
- **캔버스 크기**: 1920 x 1080px (작업 영역)
- **디바이스 프레임**: iPhone 14 Pro (393 x 852px)  
- **세이프 에어리어**: 상단 47px, 하단 34px
- **상태바 높이**: 44px
- **탭바 높이**: 83px

### 그리드 시스템
```
기본 그리드:
├── 컬럼: 12개
├── 거터: 16px
├── 마진: 20px (좌우)
└── 베이스라인: 4px
```

### 반응형 브레이크포인트
- **Mobile**: 375px ~ 414px (기본)
- **Tablet**: 768px ~ 1024px (확장)
- **Desktop**: 1200px+ (관리자)

## 🎯 디자인 토큰 설정

### 스페이싱 시스템
- **xs**: 4px
- **sm**: 8px  
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### 보더 반경
- **none**: 0px
- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **2xl**: 24px
- **full**: 9999px

### 그림자 시스템
```css
/* 카드 그림자 */
card-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)

/* 버튼 그림자 */
button-shadow: 0 2px 8px rgba(0, 0, 0, 0.12)

/* 모달 그림자 */
modal-shadow: 0 8px 32px rgba(0, 0, 0, 0.24)

/* 타로카드 그림자 */
tarot-shadow: 0 6px 20px rgba(102, 126, 234, 0.25)
```

## 🔧 Figma 플러그인 권장사항

### 필수 플러그인
1. **Auto Layout**: 반응형 레이아웃
2. **Component Variants**: 상태별 컴포넌트
3. **Content Reel**: 더미 데이터 생성
4. **Iconify**: 아이콘 라이브러리
5. **Color Palettes**: 색상 관리

### 디자인 최적화
1. **Stark**: 접근성 검사
2. **Figma to Code**: 개발 코드 생성
3. **Design Tokens**: 토큰 관리
4. **Figma Mirror**: 실기기 미리보기

## 📐 컴포넌트 네이밍 규칙

### 페이지 구조
```
🔮 AI Tarot Master/
├── 01_Onboarding/
│   ├── Splash_Screen
│   ├── Welcome_Step1  
│   ├── Features_Step2
│   └── Notifications_Step3
├── 02_Authentication/
│   ├── Login_Options
│   ├── Demo_Mode
│   └── Sign_Up
├── 03_Main_Home/
│   ├── Home_Dashboard
│   ├── Daily_Card
│   └── Quick_Menu
├── 04_Consultation/
│   ├── Type_Selection
│   ├── Question_Input
│   ├── Card_Selection
│   └── Result_Display
└── 05_Profile_Settings/
    ├── My_Profile
    ├── Subscription
    └── Support
```

### 컴포넌트 네이밍
- **Button**: `Button/Primary`, `Button/Secondary`
- **Card**: `Card/Tarot`, `Card/Info`, `Card/Result`
- **Input**: `Input/Text`, `Input/TextArea`, `Input/Select`
- **Modal**: `Modal/Alert`, `Modal/Confirm`, `Modal/Info`

## 🎨 에셋 관리

### 이미지 포맷
- **타로카드**: PNG 512x512px (투명 배경)
- **아이콘**: SVG 24x24px ~ 48x48px
- **일러스트**: PNG/SVG 고해상도
- **배경**: JPG/PNG 최적화

### 파일 네이밍
```
Assets/
├── Icons/
│   ├── ic_heart_24.svg
│   ├── ic_star_32.svg
│   └── ic_moon_48.svg
├── Tarot_Cards/
│   ├── major_fool.png
│   ├── major_magician.png
│   └── minor_ace_cups.png
└── Illustrations/
    ├── onboarding_welcome.png
    ├── empty_state_history.png
    └── success_payment.png
```

## 📋 작업 플로우

### 디자인 단계
1. **와이어프레임**: 기본 구조 설계
2. **UI 디자인**: 비주얼 디자인 적용
3. **프로토타입**: 인터랙션 추가
4. **피드백**: 스테이크홀더 리뷰
5. **개발 전달**: 스펙 문서 작성

### 버전 관리
- **v1.0**: 초기 디자인
- **v1.1**: 마이너 수정
- **v2.0**: 메이저 업데이트
- **Daily**: 일일 작업 백업

## 🚀 개발 전달 체크리스트

### 스펙 문서 포함사항
- [ ] 컴포넌트 상태 정의
- [ ] 인터랙션 명세서
- [ ] 애니메이션 가이드
- [ ] 에셋 익스포트 완료
- [ ] 반응형 브레이크포인트
- [ ] 접근성 가이드라인
- [ ] 색상/타이포그래피 토큰
- [ ] 개발자 핸드오프 노트

### 품질 검수
- [ ] 일관성 검사 (색상, 폰트, 간격)
- [ ] 접근성 검증 (대비율, 터치 영역)
- [ ] 반응형 테스트 (다양한 화면 크기)
- [ ] 사용성 검토 (플로우, 네비게이션)
- [ ] 브랜드 가이드 준수

## 🔄 업데이트 및 유지보수

### 정기 업데이트 항목
- 디자인 시스템 업데이트
- 새로운 기능 추가
- 사용자 피드백 반영
- 트렌드 반영 및 개선
- 성능 최적화

### 문서화 관리
- 변경사항 로그 작성
- 스타일 가이드 업데이트
- 컴포넌트 라이브러리 관리
- 디자인 결정 사유 기록