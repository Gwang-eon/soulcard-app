# 🎯 Figma Make 생성 앱 → 백엔드 연결 가이드

## 🌐 현재 상황
- ✅ Figma Make 앱 생성 완료: https://soulcard.figma.site/
- ✅ Supabase 데이터베이스 연결: `soulcard-db`
- ✅ 기존 백엔드 API: `/api/reading/*` 준비됨
- ✅ Vercel 배포 환경: 완전 구성됨

---

## 🔄 통합 전략

### 1. Figma Make 코드 추출 및 이전

#### A. 현재 Figma Make 사이트에서 코드 추출
```bash
# 1. Figma Make에서 코드 다운로드
# 2. 프로젝트 구조 확인
# 3. 주요 컴포넌트 식별
```

#### B. Vercel 프로젝트로 통합
```
/Volumes/PROJECT/apps/card/
├── frontend/                    # 새로 생성할 프론트엔드 폴더
│   ├── components/              # Figma Make 컴포넌트들
│   │   ├── ui/                  # 기본 UI 컴포넌트
│   │   ├── screens/             # 화면 컴포넌트들
│   │   └── layouts/             # 레이아웃 컴포넌트들
│   ├── pages/                   # Next.js 페이지 라우팅
│   ├── lib/                     # Supabase 클라이언트 등
│   ├── styles/                  # CSS/Tailwind 스타일
│   └── utils/                   # 유틸리티 함수들
└── api/                         # 기존 백엔드 API (유지)
```

### 2. API 연결 포인트 매핑

#### A. 화면별 API 연결점
```typescript
// 홈 화면 → 일일 카드 API
/home → /api/reading/single (오늘의 카드)

// 상담 선택 → 상담 타입 API  
/consultation → /api/reading/[type]

// 카드 선택 → 카드 데이터
/card-selection → 기존 카드 데이터 + /api/reading/*

// 결과 화면 → AI 해석 + Supabase 저장
/result → /api/reading/* + Supabase readings 테이블

// 토큰 관리 → Supabase 토큰 시스템
/tokens → Supabase token_transactions + user_profiles

// 프로필 → Supabase 사용자 관리
/profile → Supabase user_profiles + user_settings
```

#### B. 실시간 기능 연결
```typescript
// 토큰 실시간 업데이트
const { data: tokens } = useSupabaseRealtime('user_profiles', userId)

// 상담 진행 상태
const { data: progress } = useSupabaseRealtime('readings', readingId)

// 알림 시스템  
const { data: notifications } = useSupabaseRealtime('notifications', userId)
```

### 3. 코드 수정 가이드

#### A. Supabase 클라이언트 설정
```typescript
// lib/supabase.ts (Figma Make 프로젝트에 추가)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의들
export interface UserProfile {
  id: string
  username: string
  tokens: number
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface Reading {
  id: string
  user_id: string
  consultation_type: string
  question: string
  interpretation: any
  created_at: string
}
```

#### B. 기존 API 래퍼 함수
```typescript
// utils/api.ts (Figma Make 프로젝트에 추가)
export class TarotAPI {
  private static baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://soulcard-app.vercel.app' 
    : 'http://localhost:3000'

  // 기존 백엔드 API 호출 함수들
  static async getSingleCard(question: string) {
    const response = await fetch(`${this.baseURL}/api/reading/single`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    return response.json()
  }

  static async getThreeCardReading(question: string, selectedCards: number[]) {
    const response = await fetch(`${this.baseURL}/api/reading/three-card`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, selectedCards })
    })
    return response.json()
  }

  static async analyzeQuestion(question: string, category: string) {
    const response = await fetch(`${this.baseURL}/api/analyze-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category })
    })
    return response.json()
  }
}
```

#### C. 하이브리드 데이터 플로우
```typescript
// components/screens/ConsultationScreen.tsx
export default function ConsultationScreen() {
  const [user] = useUser() // Supabase 인증
  const [consultationData, setConsultationData] = useState({})

  const handleConsultationComplete = async () => {
    try {
      // 1. 기존 API로 AI 해석 생성
      const interpretation = await TarotAPI.getThreeCardReading(
        consultationData.question,
        consultationData.selectedCards
      )

      // 2. Supabase에 결과 저장  
      const { data: reading } = await supabase
        .from('readings')
        .insert({
          user_id: user?.id,
          consultation_type: consultationData.type,
          question: consultationData.question,
          selected_cards: consultationData.selectedCards,
          interpretation: interpretation,
          token_cost: getTokenCost(consultationData.type)
        })
        .select()
        .single()

      // 3. 토큰 차감 (Supabase 함수 호출)
      await supabase.rpc('deduct_user_tokens', {
        user_id: user?.id,
        amount: getTokenCost(consultationData.type),
        reading_id: reading.id
      })

      // 4. 결과 화면으로 이동
      router.push(`/reading/${reading.id}`)

    } catch (error) {
      console.error('상담 처리 실패:', error)
    }
  }

  return (
    <div className="consultation-screen">
      {/* Figma Make 생성 UI 컴포넌트들 */}
    </div>
  )
}
```

### 4. 환경 설정 통합

#### A. package.json 의존성 추가
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/auth-helpers-react": "^0.4.2",
    "react": "^18.0.0",
    "react-dom": "^18.0.0", 
    "next": "^14.0.0"
  }
}
```

#### B. 환경변수 설정
```env
# Supabase (이미 Vercel에서 설정됨)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# 기존 API (유지)
OPENAI_API_KEY=sk-...
OLLAMA_HOST=your-ollama-host

# Figma Make 앱 설정
NEXT_PUBLIC_APP_URL=https://soulcard-app.vercel.app
```

### 5. 배포 전략

#### A. 점진적 통합 방식
```
Phase 1: 정적 페이지 통합
├── 홈 화면 (일일 카드)
├── 소개 페이지들  
└── 기본 레이아웃

Phase 2: 동적 기능 통합
├── 사용자 인증 (Supabase Auth)
├── 상담 플로우 (기존 API + Supabase)
└── 토큰 시스템 (Supabase)

Phase 3: 고급 기능
├── 실시간 업데이트
├── 알림 시스템
└── 결제 연동
```

#### B. 배포 설정
```javascript
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*' // 기존 API 유지
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/figma-site',
        destination: 'https://soulcard.figma.site/',
        permanent: false
      }
    ]
  }
}
```

### 6. 테스트 및 검증

#### A. 통합 테스트 체크리스트
```
UI 테스트:
- [ ] 모든 Figma Make 화면 정상 렌더링
- [ ] 반응형 디자인 유지
- [ ] 애니메이션 및 인터랙션 작동

기능 테스트:
- [ ] Supabase 인증 연동
- [ ] 기존 API 호출 정상
- [ ] 데이터 저장/조회 정상
- [ ] 실시간 업데이트 작동

성능 테스트:
- [ ] 페이지 로딩 속도
- [ ] API 응답 시간
- [ ] 메모리 사용량
- [ ] 모바일 성능
```

#### B. 최종 검증 스크립트
```javascript
// scripts/integration-test.js
const testEndpoints = [
  '/api/test-database',      // Supabase 연결
  '/api/status',             // 기존 API 상태
  '/api/reading/single',     // AI 타로 서비스
]

async function runIntegrationTests() {
  for (const endpoint of testEndpoints) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}${endpoint}`)
      const data = await response.json()
      console.log(`✅ ${endpoint}: ${data.success ? 'PASS' : 'FAIL'}`)
    } catch (error) {
      console.log(`❌ ${endpoint}: ERROR - ${error.message}`)
    }
  }
}
```

---

## 🎯 최종 목표

### 완성된 아키텍처
```
📱 Figma Make UI (React/TypeScript)
    ↕️
🔥 Supabase (Auth + Database + Realtime)  
    ↕️
🎯 기존 백엔드 API (AI 타로 로직)
    ↕️ 
🤖 AI 서비스 (OpenAI + 커스텀 엔진)
    ↕️
☁️ Vercel (통합 배포 플랫폼)
```

### 사용자 경험 플로우
```
1. 사용자 → Figma Make UI
2. 인증 → Supabase Auth
3. 상담 요청 → 기존 AI API
4. 결과 저장 → Supabase Database  
5. 실시간 업데이트 → Supabase Realtime
6. 결과 표시 → Figma Make UI
```

이제 **완전히 기능하는 프로덕션 준비 완료 타로 앱**을 만들 수 있습니다! 🚀