# 🎨 AI 타로카드 마스터 - 스타일 가이드

## 🌈 컬러 시스템

### 프라이머리 컬러
```css
/* 메인 브랜드 컬러 */
--primary-50: #f0f4ff
--primary-100: #e0e7ff  
--primary-200: #c7d2fe
--primary-300: #a5b4fc
--primary-400: #818cf8
--primary-500: #6366f1  /* 메인 */
--primary-600: #4f46e5
--primary-700: #4338ca
--primary-800: #3730a3
--primary-900: #312e81

/* 액센트 컬러 */
--accent-purple: #a855f7
--accent-pink: #ec4899
--accent-gold: #f59e0b
```

### 세컨더리 컬러
```css
/* 기능별 컬러 */
--love-color: #ec4899      /* 연애 */
--career-color: #3b82f6    /* 직장 */
--money-color: #10b981     /* 재정 */
--health-color: #ef4444    /* 건강 */
--spiritual-color: #8b5cf6 /* 영성 */
```

### 뉴트럴 컬러
```css
/* 그레이스케일 */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827

/* 다크모드 배경 */
--dark-bg-primary: #0f0f23
--dark-bg-secondary: #1a1a2e
--dark-bg-tertiary: #16213e
```

### 시스템 컬러
```css
/* 상태 컬러 */
--success: #10b981
--warning: #f59e0b  
--error: #ef4444
--info: #3b82f6

/* 투명도 */
--overlay-light: rgba(255, 255, 255, 0.9)
--overlay-dark: rgba(15, 15, 35, 0.85)
--card-shadow: rgba(102, 126, 234, 0.25)
```

## ✍️ 타이포그래피

### 폰트 패밀리
```css
/* 기본 폰트 */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

/* 대체 폰트 */
font-family-en: 'Inter', 'Helvetica Neue', sans-serif;
font-family-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

### 텍스트 스케일
```css
/* 헤딩 */
--text-6xl: 60px / 1.1 / -0.025em  /* 대형 타이틀 */
--text-5xl: 48px / 1.1 / -0.025em  /* 페이지 타이틀 */
--text-4xl: 36px / 1.2 / -0.025em  /* 섹션 타이틀 */
--text-3xl: 30px / 1.3 / -0.025em  /* 서브 타이틀 */
--text-2xl: 24px / 1.3 / -0.025em  /* 카드 타이틀 */
--text-xl: 20px / 1.4 / -0.025em   /* 중요 텍스트 */

/* 바디 */
--text-lg: 18px / 1.5 / 0em        /* 큰 본문 */
--text-base: 16px / 1.6 / 0em      /* 기본 본문 */  
--text-sm: 14px / 1.5 / 0em        /* 작은 텍스트 */
--text-xs: 12px / 1.4 / 0.025em    /* 캡션 */
```

### 폰트 웨이트
```css
--font-thin: 100
--font-light: 300
--font-normal: 400    /* 기본 */
--font-medium: 500    /* 강조 */
--font-semibold: 600  /* 제목 */
--font-bold: 700      /* 중요 */
--font-extrabold: 800 /* 타이틀 */
```

## 🃏 타로카드 디자인 시스템

### 카드 사이즈
```css
/* 기본 카드 비율 */
--card-ratio: 5:8 (0.625)

/* 사이즈 variants */
--card-xs: 40px × 64px    /* 썸네일 */
--card-sm: 60px × 96px    /* 작은 카드 */
--card-md: 80px × 128px   /* 기본 카드 */
--card-lg: 120px × 192px  /* 큰 카드 */
--card-xl: 160px × 256px  /* 상세 보기 */
```

### 카드 스타일
```css
/* 카드 배경 */
--card-bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--card-border: 2px solid rgba(255, 255, 255, 0.2)
--card-border-radius: 12px

/* 카드 상태 */
--card-normal: transform: scale(1)
--card-hover: transform: scale(1.05) rotate(2deg)
--card-selected: transform: scale(1.1) rotate(5deg)
--card-flip: transform: rotateY(180deg)
```

### 카드 애니메이션
```css
/* 기본 트랜지션 */
--transition-fast: 0.15s ease-out
--transition-normal: 0.3s ease-out  
--transition-slow: 0.5s ease-out

/* 카드 효과 */
--card-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--flip-transition: transform 0.6s preserve-3d
--glow-animation: 0 0 20px rgba(102, 126, 234, 0.4)
```

## 🎭 컴포넌트 스타일

### 버튼 스타일
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 500;
}

/* Ghost Button */
.btn-ghost {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
}
```

### 입력 필드
```css
.input-field {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}
```

### 카드 컨테이너
```css
.card-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## 🌟 아이콘 시스템

### 아이콘 스타일
```css
/* 아이콘 사이즈 */
--icon-xs: 16px
--icon-sm: 20px
--icon-md: 24px  /* 기본 */
--icon-lg: 32px
--icon-xl: 48px

/* 아이콘 컬러 */
--icon-primary: #4f46e5
--icon-secondary: #6b7280
--icon-accent: #ec4899
--icon-white: #ffffff
```

### 카테고리별 아이콘
```
💕 연애: heart, couple, ring
💼 직장: briefcase, trending-up, target
💰 재정: dollar-sign, piggy-bank, trending-up
🏥 건강: heart-pulse, shield-check, activity
🔮 영성: sparkles, moon, star
⭐ 즐겨찾기: star, bookmark, heart
🔔 알림: bell, clock, calendar
⚙️ 설정: settings, user, cog
```

## 🎨 그라데이션 & 패턴

### 브랜드 그라데이션
```css
/* 메인 그라데이션 */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-secondary: linear-gradient(135deg, #a855f7 0%, #ec4899 100%)
--gradient-accent: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)

/* 배경 그라데이션 */
--gradient-dark: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)
--gradient-light: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)

/* 카드 그라데이션 */
--gradient-card: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
```

### 패턴 & 텍스처
```css
/* 별자리 패턴 */
--pattern-stars: radial-gradient(2px 2px at 20px 30px, #fff, transparent),
                 radial-gradient(2px 2px at 40px 70px, #fff, transparent);

/* 노이즈 텍스처 */
--texture-noise: url('data:image/svg+xml;base64,...') /* 미세한 노이즈 */

/* 카드 텍스처 */
--texture-card: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
```

## 📐 레이아웃 & 간격

### 컨테이너 시스템
```css
/* 페이지 컨테이너 */
.container {
  max-width: 393px;  /* iPhone 14 Pro 기준 */
  margin: 0 auto;
  padding: 0 20px;
}

/* 섹션 간격 */
.section {
  margin-bottom: 32px;
}

/* 카드 그리드 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}
```

### Z-index 시스템
```css
--z-dropdown: 1000
--z-sticky: 1020
--z-fixed: 1030
--z-modal-backdrop: 1040
--z-modal: 1050
--z-popover: 1060
--z-tooltip: 1070
--z-toast: 1080
```

## 🌙 다크모드 대응

### 다크모드 컬러
```css
@media (prefers-color-scheme: dark) {
  --bg-primary: #0f0f23
  --bg-secondary: #1a1a2e
  --text-primary: #ffffff
  --text-secondary: #a0a3bd
  --border-color: rgba(255, 255, 255, 0.1)
  
  /* 카드 다크모드 */
  --card-bg-dark: rgba(255, 255, 255, 0.05)
  --card-border-dark: rgba(255, 255, 255, 0.1)
}
```

## 📱 반응형 가이드

### 브레이크포인트
```css
/* Mobile First */
@media (min-width: 375px) { /* 작은 모바일 */ }
@media (min-width: 414px) { /* 큰 모바일 */ }
@media (min-width: 768px) { /* 태블릿 */ }
@media (min-width: 1024px) { /* 데스크톱 */ }
```

### 적응형 타이포그래피
```css
/* 모바일 */
--text-scale-mobile: 0.9

/* 태블릿 */
--text-scale-tablet: 1.0

/* 데스크톱 */
--text-scale-desktop: 1.1
```

## ♿ 접근성 가이드

### 컬러 대비율
- **일반 텍스트**: 최소 4.5:1
- **큰 텍스트**: 최소 3:1  
- **UI 요소**: 최소 3:1
- **그래픽**: 최소 3:1

### 터치 타겟
- **최소 크기**: 44px × 44px
- **권장 크기**: 48px × 48px
- **간격**: 최소 8px

### 키보드 네비게이션
- **포커스 표시**: 명확한 아웃라인
- **탭 순서**: 논리적 흐름
- **Skip Link**: 메인 콘텐츠로 바로가기