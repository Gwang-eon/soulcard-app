# 🔗 Figma Make + Supabase + 기존 API 통합 가이드

## 🏗️ 아키텍처 구조

```
📱 Figma Make TSX Components
    ↓
🔥 Supabase (Auth + Database + Realtime)
    ↓
🎯 기존 백엔드 API (AI/타로 로직)
    ↓ 
🤖 AI 서비스 (OpenAI, 타로 해석)
```

---

## 📊 Supabase 데이터베이스 스키마 설계

### 1. 사용자 관리 테이블
```sql
-- users 테이블 (Supabase Auth 확장)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  tokens INTEGER DEFAULT 15,
  level VARCHAR(20) DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 설정
CREATE TABLE user_settings (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  theme VARCHAR(20) DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT true,
  daily_card_time TIME DEFAULT '09:00:00',
  interpretation_style JSONB DEFAULT '{"tone": 3, "detail": 3, "language": 2}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. 상담 관련 테이블
```sql
-- 상담 기록
CREATE TABLE readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  consultation_type VARCHAR(50) NOT NULL,
  question TEXT NOT NULL,
  category VARCHAR(50),
  selected_cards INTEGER[],
  interpretation JSONB,
  token_cost INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_favorite BOOLEAN DEFAULT false,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5)
);

-- 일일 카드 기록
CREATE TABLE daily_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  card_index INTEGER NOT NULL,
  card_name VARCHAR(100),
  interpretation TEXT,
  date DATE DEFAULT CURRENT_DATE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

### 3. 토큰 관리 테이블
```sql
-- 토큰 거래 내역
CREATE TABLE token_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  transaction_type VARCHAR(20) NOT NULL, -- 'purchase', 'spend', 'bonus'
  amount INTEGER NOT NULL,
  description TEXT,
  reading_id UUID REFERENCES readings(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 토큰 패키지
CREATE TABLE token_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  token_amount INTEGER NOT NULL,
  price_krw INTEGER NOT NULL,
  bonus_tokens INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);
```

---

## 🔧 Figma Make 컴포넌트에서 Supabase 연결

### 1. Supabase 클라이언트 설정
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  tokens: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Reading {
  id: string;
  user_id: string;
  consultation_type: string;
  question: string;
  interpretation: any;
  created_at: string;
  is_favorite: boolean;
}
```

### 2. 인증 컴포넌트 (Figma Make 생성)
```typescript
// components/auth/LoginScreen.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      alert(error.message)
    } else {
      // 로그인 성공 - 홈으로 이동
      window.location.href = '/home'
    }
    
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`
      }
    })
    
    if (error) alert(error.message)
  }

  return (
    <div className="login-container">
      {/* Figma Make 생성 UI */}
      <LoginForm 
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        loading={loading}
      />
      
      <SocialLoginButton 
        provider="google"
        onClick={handleGoogleLogin}
      />
      
      <GuestLoginButton 
        onClick={() => window.location.href = '/home?guest=true'}
      />
    </div>
  )
}
```

### 3. 홈 화면 - 실시간 데이터 연동
```typescript
// components/screens/HomeScreen.tsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { TarotAPI } from '@/utils/api'

export default function HomeScreen() {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [dailyCard, setDailyCard] = useState(null)
  const [recentReadings, setRecentReadings] = useState([])

  useEffect(() => {
    // 사용자 인증 상태 확인
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        loadUserData(user.id)
      }
    })

    // 실시간 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserData(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserData = async (userId: string) => {
    // 1. 사용자 프로필 로드
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    setUserProfile(profile)

    // 2. 오늘의 카드 확인
    const today = new Date().toISOString().split('T')[0]
    const { data: todayCard } = await supabase
      .from('daily_cards')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single()

    if (todayCard) {
      setDailyCard(todayCard)
    } else {
      // 오늘의 카드가 없으면 생성
      generateDailyCard(userId)
    }

    // 3. 최근 상담 기록 로드
    const { data: readings } = await supabase
      .from('readings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3)
    
    setRecentReadings(readings || [])
  }

  const generateDailyCard = async (userId: string) => {
    try {
      // 기존 API로 일일 카드 생성
      const dailyReading = await TarotAPI.getReading('single', '오늘의 운세', [])
      
      // Supabase에 저장
      const { data } = await supabase
        .from('daily_cards')
        .insert({
          user_id: userId,
          card_index: dailyReading.cards[0].index,
          card_name: dailyReading.cards[0].name,
          interpretation: dailyReading.interpretation.overall
        })
        .select()
        .single()
      
      setDailyCard(data)
    } catch (error) {
      console.error('일일 카드 생성 실패:', error)
    }
  }

  return (
    <div className="home-screen">
      {/* Figma Make 생성 컴포넌트들 */}
      <HomeHeader 
        user={userProfile}
        tokens={userProfile?.tokens || 0}
      />
      
      <DailyCardSection 
        card={dailyCard}
        onCardView={() => markDailyCardViewed(dailyCard?.id)}
      />
      
      <QuickMenuGrid />
      
      <RecentReadings 
        readings={recentReadings}
        onReadingSelect={(id) => router.push(`/reading/${id}`)}
      />
    </div>
  )
}
```

### 4. 상담 플로우 - 하이브리드 접근
```typescript
// components/screens/ConsultationFlow.tsx
export default function ConsultationFlow() {
  const [user] = useUser() // Supabase 인증
  const [currentStep, setCurrentStep] = useState('type-selection')
  const [consultationData, setConsultationData] = useState({})

  const handleConsultationComplete = async (result: any) => {
    // 1. 기존 API로 타로 해석 (AI 로직)
    const interpretation = await TarotAPI.getReading(
      consultationData.type,
      consultationData.question,
      consultationData.selectedCards
    )

    // 2. Supabase에 상담 기록 저장
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

    // 3. 토큰 차감
    await deductTokens(user?.id, getTokenCost(consultationData.type))

    // 4. 결과 화면으로 이동
    router.push(`/reading/${reading.id}`)
  }

  const deductTokens = async (userId: string, amount: number) => {
    // 토큰 차감 및 거래 기록
    await supabase.rpc('deduct_user_tokens', {
      user_id: userId,
      amount: amount,
      description: `${consultationData.type} 상담`
    })
  }

  return (
    <ConsultationFlowContainer>
      {/* 단계별 컴포넌트 렌더링 */}
    </ConsultationFlowContainer>
  )
}
```

---

## 🔄 실시간 기능 구현

### 1. 실시간 토큰 업데이트
```typescript
// hooks/useRealtimeTokens.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useRealtimeTokens(userId: string) {
  const [tokens, setTokens] = useState(0)

  useEffect(() => {
    if (!userId) return

    // 초기 토큰 로드
    loadTokens()

    // 실시간 토큰 변화 감지
    const subscription = supabase
      .channel('token-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'user_profiles',
        filter: `id=eq.${userId}`
      }, (payload) => {
        setTokens(payload.new.tokens)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  const loadTokens = async () => {
    const { data } = await supabase
      .from('user_profiles')
      .select('tokens')
      .eq('id', userId)
      .single()
    
    if (data) setTokens(data.tokens)
  }

  return tokens
}
```

### 2. 실시간 상담 진행 상태
```typescript
// components/ConsultationProgress.tsx
export function ConsultationProgress({ sessionId }: { sessionId: string }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('waiting')

  useEffect(() => {
    const subscription = supabase
      .channel(`consultation-${sessionId}`)
      .on('broadcast', { event: 'progress' }, (payload) => {
        setProgress(payload.progress)
        setStatus(payload.status)
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [sessionId])

  return (
    <div className="consultation-progress">
      <ProgressBar progress={progress} />
      <StatusMessage status={status} />
    </div>
  )
}
```

---

## 🛠️ 환경 설정

### 1. 환경 변수
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 기존 API 설정 유지
OPENAI_API_KEY=your_openai_key
OLLAMA_HOST=your_ollama_host
```

### 2. Supabase 함수 (Edge Functions)
```typescript
// supabase/functions/process-reading/index.ts
import { serve } from 'std/http/server.ts'
import { createClient } from '@supabase/supabase-js'

serve(async (req) => {
  const { question, selectedCards, userId } = await req.json()
  
  // 기존 백엔드 API 호출
  const interpretation = await fetch('https://your-app.vercel.app/api/reading/three-card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, selectedCards })
  }).then(res => res.json())
  
  // Supabase에 결과 저장
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  const { data } = await supabase
    .from('readings')
    .insert({
      user_id: userId,
      interpretation: interpretation
    })
    .select()
    .single()
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

---

## 📦 필요한 패키지

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/auth-helpers-react": "^0.4.2",
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}
```

이제 **Figma Make + Supabase + 기존 백엔드 API**가 완벽하게 통합된 아키텍처로 구성할 수 있습니다! 🚀

- **Supabase**: 인증, 사용자 데이터, 실시간 기능
- **기존 API**: AI 타로 해석 로직 (핵심 비즈니스 로직)
- **Figma Make**: 완성된 UI 컴포넌트들

어떤 부분을 더 자세히 알고 싶으신가요?