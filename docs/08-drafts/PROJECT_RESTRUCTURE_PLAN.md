# 🏗️ 프로젝트 재편성 계획

## 📋 현재 상황 분석

### ✅ **백업 완료**
```
/Volumes/PROJECT/apps/card/         # 현재 개발 버전
/Volumes/PROJECT/apps/card-prototype/  # 백업된 원본
```

---

## 🔍 **기존 구조 vs Figma 구조 비교**

### **기존 프로젝트 구조 (개발/테스트 중심)**
```
card/
├── api/                     # ✅ Vercel API (유지)
├── services/               # ✅ AI 엔진들 (유지)
├── data/                   # ✅ 타로카드 데이터 (유지)
├── components/             # 🔄 기존 React 컴포넌트 (재검토)
├── tests/                  # 📦 테스트 파일들 (archive)
├── docs/                   # 📚 문서들 (유지)
├── ml/                     # 🤖 ML 기능들 (유지)
├── utils/                  # 🛠️ 유틸리티 (유지)
├── server/                 # ⚙️ 서버 코드 (유지)
├── public/                 # 🌐 정적 파일 (정리)
└── styles/                 # 🎨 기존 CSS (재검토)
```

### **Figma 생성 구조 (프로덕션 중심)**
```
figma_design/
├── App.tsx                 # 🎯 메인 앱
├── components/
│   ├── design-system/      # 🎨 아토믹 디자인
│   │   ├── foundations/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── pages/             # 📱 화면 컴포넌트들
│   │   ├── onboarding/
│   │   ├── auth/
│   │   ├── main/
│   │   ├── consultation/
│   │   ├── tokens/
│   │   └── profile/
│   ├── layout/            # 📐 레이아웃
│   └── ui/                # 🧰 UI 라이브러리
├── constants/             # 📊 설정 데이터
├── hooks/                 # 🎣 커스텀 훅
├── types/                 # 📝 TypeScript 타입
├── utils/                 # 🛠️ 유틸리티
└── styles/               # 🎨 글로벌 스타일
```

---

## 🎯 **새로운 프로젝트 구조 제안**

### **하이브리드 구조 (최고의 조합)**
```
soulcard-app/
├── 📁 src/                          # 메인 소스 코드
│   ├── 📁 app/                      # Next.js 13+ App Router
│   │   ├── page.tsx                 # 홈페이지
│   │   ├── onboarding/              # 온보딩 플로우
│   │   ├── auth/                    # 인증 시스템
│   │   ├── consultation/            # 상담 플로우
│   │   ├── tokens/                  # 토큰 관리
│   │   ├── profile/                 # 프로필 관리
│   │   └── api/                     # API 라우트 (기존 유지)
│   ├── 📁 components/               # 컴포넌트 시스템
│   │   ├── 📁 design-system/        # Figma 디자인 시스템
│   │   │   ├── foundations/         # 색상, 타이포, 간격
│   │   │   ├── atoms/               # 버튼, 입력 등
│   │   │   ├── molecules/           # 폼, 카드 등
│   │   │   └── organisms/           # 헤더, 복합 컴포넌트
│   │   ├── 📁 features/             # 기능별 컴포넌트
│   │   │   ├── tarot/               # 타로 관련
│   │   │   ├── consultation/        # 상담 관련
│   │   │   ├── payment/             # 결제 관련
│   │   │   └── user/                # 사용자 관련
│   │   ├── 📁 layout/               # 레이아웃 컴포넌트
│   │   └── 📁 ui/                   # 기본 UI 컴포넌트
│   ├── 📁 lib/                      # 외부 라이브러리 설정
│   │   ├── supabase.ts              # Supabase 클라이언트
│   │   ├── api.ts                   # API 클라이언트
│   │   └── utils.ts                 # 공통 유틸리티
│   ├── 📁 hooks/                    # React 훅들
│   ├── 📁 types/                    # TypeScript 타입 정의
│   ├── 📁 constants/                # 상수 및 설정
│   └── 📁 styles/                   # 스타일 파일들
├── 📁 services/                     # 기존 AI 서비스 (유지)
│   ├── aiNarrativeEngine.ts
│   ├── tarotReading.ts
│   └── ... (모든 기존 서비스)
├── 📁 data/                         # 기존 데이터 (유지)
│   ├── cards/
│   └── ... (모든 기존 데이터)
├── 📁 utils/                        # 기존 유틸리티 (유지)
├── 📁 ml/                           # ML 기능 (유지)
├── 📁 docs/                         # 문서 (유지)
├── 📁 tests/                        # 테스트 (정리 후 유지)
└── 📁 archive/                      # 사용 안 하는 파일들
    ├── old-components/
    ├── old-tests/
    └── legacy/
```

---

## 🔄 **단계별 재편성 프로세스**

### **Phase 1: 정리 및 분석** (현재)
- [x] 기존 버전 백업 완료
- [ ] 중복 파일 식별
- [ ] 유지할 파일 vs 삭제할 파일 구분
- [ ] Figma 컴포넌트와 기존 컴포넌트 매핑

### **Phase 2: 새 구조 생성** (1일)
- [ ] Next.js 13+ 프로젝트 초기화
- [ ] 새로운 폴더 구조 생성
- [ ] 기존 중요 파일들 이전
- [ ] Figma 컴포넌트들 통합

### **Phase 3: 기능 연결** (2-3일)
- [ ] API 엔드포인트 연결
- [ ] AI 서비스 연결
- [ ] 데이터 플로우 구현
- [ ] 상태 관리 설정

### **Phase 4: 통합 테스트** (1일)
- [ ] 빌드 테스트
- [ ] 기능 테스트
- [ ] 성능 테스트
- [ ] 배포 테스트

---

## 📊 **파일 매핑 분석**

### **🟢 유지할 파일들**
```bash
# API & 서비스 (100% 유지)
api/                    → src/app/api/
services/              → services/ (그대로)
data/                  → data/ (그대로)
utils/                 → utils/ (그대로)
ml/                    → ml/ (그대로)

# 문서 (유지)
docs/                  → docs/ (그대로)

# 설정 파일들
package.json           → 새 package.json에 병합
tsconfig.json          → 업데이트
vercel.json           → 업데이트
```

### **🟡 검토 후 통합할 파일들**
```bash
# 컴포넌트 (Figma와 통합)
components/card-selection/ → src/components/features/tarot/
styles/card-selection.css → src/styles/ (통합)

# 타입 정의 (병합)
types/                 → src/types/ (Figma 타입과 병합)
```

### **🔴 Archive 할 파일들**
```bash
# 테스트 파일들 (정리 후 일부만 유지)
tests/                 → archive/old-tests/
test-*.js             → archive/
test-*.ts             → archive/

# 개발용 파일들
public-dev/           → archive/
server/               → archive/ (필요시 참조용)

# 레거시 파일들
public/index.html     → archive/
dist/                 → 삭제
```

---

## 🛠️ **기술 스택 통합**

### **프론트엔드**
```json
{
  "framework": "Next.js 14+ (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS + CSS Variables (Figma 스타일)",
  "components": "Figma 디자인 시스템 + shadcn/ui",
  "state": "React hooks + Context",
  "forms": "React Hook Form + Zod"
}
```

### **백엔드 & 데이터**
```json
{
  "api": "기존 Vercel API Functions (유지)",
  "ai": "기존 AI 서비스들 (유지)",
  "database": "Supabase (새로 연결)",
  "auth": "Supabase Auth",
  "storage": "Supabase Storage"
}
```

### **개발 & 배포**
```json
{
  "bundler": "Next.js built-in",
  "linting": "ESLint + Prettier",
  "testing": "Jest + React Testing Library",
  "deployment": "Vercel (기존 설정 유지)"
}
```

---

## 📋 **새 package.json 구조**

```json
{
  "name": "soulcard-app",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.39.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.263.0",
    "tailwindcss": "^3.0.0",
    "typescript": "^5.0.0",
    
    "// 기존 AI 서비스 의존성들": "",
    "openai": "^5.11.0",
    "uuid": "^9.0.0",
    "dotenv": "^17.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "jest": "^29.0.0"
  }
}
```

---

## 🎯 **실행 계획**

### **이번 주 목표**
1. **오늘**: 재편성 계획 확정
2. **내일**: 새 프로젝트 구조 생성
3. **모레**: 핵심 기능 통합
4. **주말**: 테스트 및 배포

### **우선순위**
1. 🥇 **핵심 기능 보존** (API, AI 서비스)
2. 🥈 **UI/UX 품질 향상** (Figma 디자인 적용)
3. 🥉 **개발 효율성** (깔끔한 구조)

---

## ❓ **결정이 필요한 사항들**

1. **Next.js App Router vs Pages Router?**
   - 추천: App Router (최신, Figma 구조와 잘 맞음)

2. **기존 API 구조 유지 vs 완전 재작성?**
   - 추천: 유지 (이미 잘 작동함)

3. **상태 관리 라이브러리?**
   - 추천: React Context + hooks (단순함)

4. **CSS 스타일링 전략?**
   - 추천: Figma CSS Variables + Tailwind

어떤 부분부터 시작해보시겠어요? 🚀