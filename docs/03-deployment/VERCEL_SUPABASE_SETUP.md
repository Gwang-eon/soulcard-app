# 🚀 Vercel-Supabase 연결 설정 가이드

## 📋 추천 데이터베이스 이름

### Production
```
Database Name: soulcard-db
Project Name: SoulCard App
Region: Northeast Asia (ap-northeast-1) - 한국 사용자 최적화
```

### Staging/Development
```
Staging: soulcard-db-staging
Development: soulcard-db-dev
```

---

## 🔧 1. Supabase 프로젝트 생성

### Step 1: Supabase 대시보드
1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 설정:
   ```
   Organization: (본인 계정)
   Name: SoulCard App
   Database Name: soulcard-db
   Password: [강력한 비밀번호 생성]
   Region: Northeast Asia (ap-northeast-1)
   ```

### Step 2: 프로젝트 URL 및 키 확인
```
Project URL: https://xxx.supabase.co
Anon Public Key: eyJhbGciOiJIUzI1NiIsInR...
Service Role Key: eyJhbGciOiJIUzI1NiIsInR... (서버 전용)
```

---

## 🌐 2. Vercel 환경 변수 설정

### Vercel Dashboard에서:
1. 프로젝트 → Settings → Environment Variables
2. 다음 변수들 추가:

```bash
# Production 환경
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR...

# 기존 API 키들도 유지
OPENAI_API_KEY=sk-...
OLLAMA_HOST=your-ollama-host
```

### 환경별 설정:
```bash
# Development
NEXT_PUBLIC_SUPABASE_URL_DEV=https://dev-xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV=...

# Staging  
NEXT_PUBLIC_SUPABASE_URL_STAGING=https://staging-xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_STAGING=...
```

---

## 🗄️ 3. 데이터베이스 스키마 생성

### Supabase SQL Editor에서 실행:

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
  payment_id VARCHAR(255), -- 결제 시스템 연동용
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

-- 7. 알림 설정
CREATE TABLE notification_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  schedule_time TIME,
  schedule_days INTEGER[], -- 0=일요일, 1=월요일, ...
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, notification_type)
);
```

---

## 🔒 4. Row Level Security (RLS) 설정

```sql
-- RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- 정책 생성: 사용자는 자신의 데이터만 접근 가능
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own settings" ON user_settings
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own readings" ON readings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own daily cards" ON daily_cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON token_transactions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications" ON notification_settings
  FOR ALL USING (auth.uid() = user_id);

-- 토큰 패키지는 모든 사용자가 조회 가능
CREATE POLICY "Anyone can view active packages" ON token_packages
  FOR SELECT USING (is_active = true);
```

---

## 🎯 5. 트리거 및 함수 생성

```sql
-- 사용자 생성 시 자동으로 프로필 및 설정 생성
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

-- 트리거 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 토큰 차감 함수
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
  -- 현재 토큰 확인
  SELECT tokens INTO current_tokens 
  FROM user_profiles 
  WHERE id = user_id;
  
  -- 토큰 부족 시 실패
  IF current_tokens < amount THEN
    RETURN FALSE;
  END IF;
  
  -- 토큰 차감
  UPDATE user_profiles 
  SET tokens = tokens - amount, 
      updated_at = NOW()
  WHERE id = user_id;
  
  -- 거래 기록 추가
  INSERT INTO token_transactions (user_id, transaction_type, amount, description, reading_id)
  VALUES (user_id, 'spend', -amount, description, reading_id);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 토큰 추가 함수
CREATE OR REPLACE FUNCTION add_user_tokens(
  user_id UUID,
  amount INTEGER,
  description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  -- 토큰 추가
  UPDATE user_profiles 
  SET tokens = tokens + amount,
      updated_at = NOW()
  WHERE id = user_id;
  
  -- 거래 기록 추가
  INSERT INTO token_transactions (user_id, transaction_type, amount, description)
  VALUES (user_id, 'purchase', amount, description);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📦 6. 초기 데이터 삽입

```sql
-- 토큰 패키지 초기 데이터
INSERT INTO token_packages (name, token_amount, bonus_tokens, price_krw, is_featured, display_order) VALUES
('기본 패키지', 10, 0, 2900, false, 1),
('인기 패키지', 30, 5, 5900, true, 2),
('프리미엄 패키지', 100, 15, 19900, false, 3),
('메가 패키지', 300, 50, 49900, false, 4);

-- 업데이트된 시간 자동 설정을 위한 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 모든 테이블에 updated_at 트리거 추가
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_readings_updated_at BEFORE UPDATE ON readings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔄 7. Vercel 배포 설정

### vercel.json 업데이트
```json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  },
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
    }
  }
}
```

### package.json에 Supabase 의존성 추가
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/auth-helpers-react": "^0.4.2"
  }
}
```

---

## ✅ 8. 연결 테스트

### 테스트 API 엔드포인트 생성
```javascript
// api/test-supabase.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
  
  try {
    // 데이터베이스 연결 테스트
    const { data, error } = await supabase
      .from('token_packages')
      .select('*')
      .limit(1)
    
    if (error) throw error
    
    res.status(200).json({
      success: true,
      message: 'Supabase 연결 성공',
      data
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

---

## 🎯 다음 단계

1. ✅ **데이터베이스 이름 결정**: `soulcard-db`
2. 🔄 **Supabase 프로젝트 생성** 
3. 🔄 **Vercel 환경변수 설정**
4. 🔄 **스키마 생성 및 RLS 설정**
5. 🔄 **연결 테스트**

이제 **soulcard-db**로 Supabase 프로젝트를 생성하고 위 가이드대로 설정하면 됩니다! 🚀