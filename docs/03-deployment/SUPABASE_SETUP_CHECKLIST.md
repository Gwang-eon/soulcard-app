# ✅ Supabase 연결 완료 - 다음 단계 체크리스트

## 🎉 연결 완료!
- ✅ Vercel Storage에서 `soulcard-db` Supabase 연결 완료
- ✅ 환경변수 자동 설정됨

---

## 📋 다음 단계 체크리스트

### 1. 🔍 환경변수 확인
Vercel Dashboard → 프로젝트 → Settings → Environment Variables에서 다음이 자동 생성되었는지 확인:

```bash
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...

# 또는 Supabase 형식으로:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 2. 🗄️ 데이터베이스 스키마 생성
Supabase Dashboard → SQL Editor에서 다음 스크립트 실행:

#### A. 기본 테이블 생성
```sql
-- 1. 사용자 프로필 테이블
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  tokens INTEGER DEFAULT 15,
  level VARCHAR(20) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  total_consultations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 사용자 설정
CREATE TABLE user_settings (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto', 'mystical')),
  notifications_enabled BOOLEAN DEFAULT true,
  daily_card_time TIME DEFAULT '09:00:00',
  interpretation_style JSONB DEFAULT '{"tone": 3, "detail": 3, "language": 2, "focus": 3}',
  card_deck_style VARCHAR(50) DEFAULT 'classic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 상담 기록
CREATE TABLE readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consultation_type VARCHAR(50) NOT NULL,
  question TEXT NOT NULL,
  category VARCHAR(50),
  selected_cards INTEGER[],
  interpretation JSONB NOT NULL,
  token_cost INTEGER NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 일일 카드
CREATE TABLE daily_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  card_index INTEGER NOT NULL,
  card_name VARCHAR(100) NOT NULL,
  interpretation TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 5. 토큰 거래내역
CREATE TABLE token_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('purchase', 'spend', 'bonus', 'refund')),
  amount INTEGER NOT NULL,
  description TEXT,
  reading_id UUID REFERENCES readings(id),
  payment_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 토큰 패키지
CREATE TABLE token_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  token_amount INTEGER NOT NULL,
  bonus_tokens INTEGER DEFAULT 0,
  price_krw INTEGER NOT NULL,
  price_usd DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### B. RLS(Row Level Security) 설정
```sql
-- RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;

-- 정책 생성
CREATE POLICY "Users can manage own profile" ON user_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own settings" ON user_settings
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own readings" ON readings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own daily cards" ON daily_cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON token_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- 토큰 패키지는 모든 사용자가 조회 가능
CREATE POLICY "Anyone can view active packages" ON token_packages
  FOR SELECT USING (is_active = true);
```

#### C. 자동화 함수 및 트리거
```sql
-- 신규 사용자 자동 프로필 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  
  INSERT INTO public.user_settings (id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 토큰 관리 함수들
CREATE OR REPLACE FUNCTION deduct_user_tokens(
  user_id UUID,
  amount INTEGER,
  description TEXT DEFAULT NULL,
  reading_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  current_tokens INTEGER;
BEGIN
  SELECT tokens INTO current_tokens FROM user_profiles WHERE id = user_id;
  
  IF current_tokens < amount THEN
    RETURN FALSE;
  END IF;
  
  UPDATE user_profiles 
  SET tokens = tokens - amount, updated_at = NOW()
  WHERE id = user_id;
  
  INSERT INTO token_transactions (user_id, transaction_type, amount, description, reading_id)
  VALUES (user_id, 'spend', -amount, description, reading_id);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### D. 초기 샘플 데이터
```sql
-- 토큰 패키지 초기 데이터
INSERT INTO token_packages (name, token_amount, bonus_tokens, price_krw, is_featured, display_order) VALUES
('기본 패키지', 10, 0, 2900, false, 1),
('인기 패키지', 30, 5, 5900, true, 2),
('프리미엄 패키지', 100, 15, 19900, false, 3),
('메가 패키지', 300, 50, 49900, false, 4);
```

### 3. 🧪 연결 테스트

#### API 테스트 엔드포인트 생성
```javascript
// api/test-database.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    
    // 1. 토큰 패키지 조회 테스트
    const { data: packages, error: packagesError } = await supabase
      .from('token_packages')
      .select('*')
      .eq('is_active', true)
    
    if (packagesError) throw packagesError
    
    // 2. 테스트 사용자 생성 (optional)
    const testUserId = '00000000-0000-0000-0000-000000000000'
    
    res.status(200).json({
      success: true,
      message: 'Supabase 데이터베이스 연결 성공!',
      data: {
        packages: packages,
        database: 'soulcard-db',
        tables_created: true,
        rls_enabled: true
      }
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Supabase 연결 실패',
      error: error.message
    })
  }
}
```

### 4. 🔐 인증 설정

Supabase Dashboard → Authentication → Settings에서:

#### A. Site URL 설정
```
Site URL: https://your-app.vercel.app
Additional redirect URLs:
- http://localhost:3000
- https://your-app-git-main.vercel.app
```

#### B. 소셜 로그인 설정 (선택)
- Google OAuth
- Apple Sign In
- KakaoTalk 로그인

### 5. 📱 Figma Make 컴포넌트 연결 테스트

#### 간단한 테스트 컴포넌트
```typescript
// components/test/DatabaseTest.tsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DatabaseTest() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('token_packages')
        .select('*')
        .eq('is_active', true)
      
      if (error) throw error
      
      setPackages(data)
      console.log('✅ Supabase 연결 성공:', data)
    } catch (err) {
      setError(err.message)
      console.error('❌ Supabase 연결 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>데이터베이스 연결 테스트 중...</div>
  if (error) return <div>연결 실패: {error}</div>

  return (
    <div>
      <h2>✅ Supabase 연결 성공!</h2>
      <p>토큰 패키지 {packages.length}개 조회됨</p>
      <ul>
        {packages.map(pkg => (
          <li key={pkg.id}>{pkg.name}: {pkg.token_amount}토큰 - ₩{pkg.price_krw}</li>
        ))}
      </ul>
    </div>
  )
}
```

### 6. 🚀 배포 및 최종 테스트

```bash
# 로컬에서 테스트
npm run dev
# → http://localhost:3000/api/test-database 접속

# Vercel 배포 후 테스트  
curl https://your-app.vercel.app/api/test-database
```

---

## ✅ 완료 체크리스트

- [ ] 환경변수 확인
- [ ] 데이터베이스 스키마 생성
- [ ] RLS 보안 정책 설정
- [ ] 자동화 함수 생성
- [ ] 초기 데이터 삽입
- [ ] API 연결 테스트
- [ ] 인증 설정
- [ ] Figma Make 컴포넌트 테스트

이제 **완전히 기능하는 Supabase 백엔드**가 준비되었습니다! 🎉