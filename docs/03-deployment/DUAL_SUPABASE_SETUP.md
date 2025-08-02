# 🔄 이중 Supabase 환경 관리 가이드

## 📋 현재 상황 정리

```
📱 Figma Make → 🔥 Supabase A (삭제됨) ❌
☁️ Vercel → 🔥 Supabase B (soulcard-db) ✅
```

### 기존 구조:
- **Figma Supabase**: Figma Make UI 전용 (삭제됨)
- **Vercel Supabase**: 백엔드 API + 데이터저장 (정상 작동)

---

## 🎯 해결 전략 옵션

### 옵션 1: Figma 전용 새 Supabase 생성 (분리 유지)

#### A. 새 Figma 전용 Supabase 생성
```
Organization: soulcard
Project name: SoulCard Figma
Database name: soulcard-figma
Region: Northeast Asia (Seoul)
용도: Figma Make UI 전용
```

#### B. 최소한의 스키마 (UI 전용)
```sql
-- Figma용 간단한 스키마
CREATE TABLE ui_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  component_name VARCHAR(100),
  props JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 샘플 데이터 테이블
CREATE TABLE sample_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type VARCHAR(50),
  sample_content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### C. 샘플 데이터 삽입
```sql
-- 토큰 패키지 샘플 (UI 표시용)
INSERT INTO sample_data (data_type, sample_content) VALUES
('token_packages', '[
  {"id": "1", "name": "기본 패키지", "tokens": 10, "price": 2900, "featured": false},
  {"id": "2", "name": "인기 패키지", "tokens": 30, "price": 5900, "featured": true},
  {"id": "3", "name": "프리미엄 패키지", "tokens": 100, "price": 19900, "featured": false}
]'::jsonb);

-- 사용자 프로필 샘플
INSERT INTO sample_data (data_type, sample_content) VALUES
('user_profile', '{
  "name": "김타로",
  "tokens": 15,
  "level": "intermediate",
  "consultations": 157,
  "satisfaction": 94
}'::jsonb);

-- 상담 기록 샘플
INSERT INTO sample_data (data_type, sample_content) VALUES
('recent_readings', '[
  {"type": "연애", "date": "어제", "cards": 3},
  {"type": "직장", "date": "3일전", "cards": 1},
  {"type": "건강", "date": "1주전", "cards": 10}
]'::jsonb);
```

### 옵션 2: 단일 Supabase 통합 (권장)

#### A. 기존 Vercel Supabase를 Figma에도 연결
```
Figma → Vercel의 soulcard-db 동일하게 사용
장점: 데이터 일관성, 관리 단순화
단점: 개발/프로덕션 혼재 가능성
```

#### B. Figma에서 기존 Supabase 연결
```
1. Figma Dev Mode 진입
2. Database → Connect to Supabase
3. 기존 soulcard-db 프로젝트 정보 입력:
   - URL: https://xxx.supabase.co (Vercel과 동일)
   - Anon Key: eyJhbGciOiJIUzI1NiIs... (Vercel과 동일)
```

### 옵션 3: 환경별 분리 (프로덕션 권장)

#### A. 환경별 Supabase 프로젝트
```
🎨 Figma/개발: soulcard-dev
🧪 Vercel 스테이징: soulcard-staging  
🚀 Vercel 프로덕션: soulcard-prod
```

#### B. 각 환경별 설정
```bash
# 개발 환경 (Figma용)
NEXT_PUBLIC_SUPABASE_URL_DEV=https://dev-xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV=...

# 프로덕션 환경 (Vercel용)
NEXT_PUBLIC_SUPABASE_URL=https://prod-xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 🛠️ 권장 해결 방법: 옵션 2 (단일 통합)

### Step 1: Figma 캐시 초기화
```bash
1. 브라우저 캐시 완전 삭제
2. Figma 로그아웃/재로그인
3. 프로젝트 새로고침
```

### Step 2: 기존 Vercel Supabase 정보 확인
```bash
# Vercel Dashboard → Environment Variables에서 확인
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### Step 3: Figma에서 동일한 Supabase 연결
```
1. Figma 프로젝트 열기
2. Dev Mode (</> 아이콘)
3. Database → Connect to Supabase
4. Vercel과 동일한 URL/Key 입력
5. 연결 테스트
```

### Step 4: 테이블 접근 확인
```sql
-- Figma에서 이 테이블들이 보여야 함
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- 예상 결과:
- user_profiles
- user_settings  
- readings
- daily_cards
- token_transactions
- token_packages
```

---

## 🧪 연결 테스트 방법

### A. Vercel Supabase 상태 확인
```bash
curl https://soulcard-app.vercel.app/api/test-database
# ✅ 정상 응답 확인
```

### B. Figma에서 데이터 접근 테스트
```
1. Figma Dev Mode
2. Database panel에서 테이블 목록 확인
3. token_packages 테이블 클릭
4. 데이터 조회 확인 (4개 패키지 보여야 함)
```

### C. 실시간 연결 테스트
```sql
-- Supabase SQL Editor에서 실행
INSERT INTO token_packages (name, token_amount, price_krw, is_active) 
VALUES ('테스트 패키지', 5, 1000, true);

-- Figma에서 즉시 새 데이터 보이는지 확인
```

---

## 📊 각 옵션별 비교

| 구분 | 옵션 1 (분리) | 옵션 2 (통합) | 옵션 3 (환경별) |
|------|---------------|---------------|-----------------|
| **복잡도** | 중간 | 낮음 | 높음 |
| **관리 용이성** | 보통 | 높음 | 낮음 |
| **데이터 일관성** | 낮음 | 높음 | 높음 |
| **개발 속도** | 보통 | 빠름 | 느림 |
| **프로덕션 안정성** | 보통 | 보통 | 높음 |
| **비용** | 높음 | 낮음 | 높음 |

## 🎯 추천: 현재 상황에서는 **옵션 2 (통합)**

### 이유:
1. **가장 빠른 해결**: 기존 Vercel Supabase 그대로 사용
2. **데이터 일관성**: Figma와 백엔드가 같은 데이터 사용
3. **관리 단순**: 하나의 Supabase만 관리
4. **비용 효율**: 무료 티어 하나만 사용

---

## 🚀 즉시 실행 가능한 단계

### 1단계: 기존 Supabase 정보 수집
```bash
# Vercel Dashboard에서 복사
echo "NEXT_PUBLIC_SUPABASE_URL: [복사]"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY: [복사]"
```

### 2단계: Figma 연결
```
1. 브라우저 캐시 삭제
2. Figma 재로그인
3. Dev Mode → Database → Connect
4. 위 정보 입력
```

### 3단계: 연결 확인
```
Figma Database panel에서:
✅ user_profiles 테이블 확인
✅ token_packages 테이블 확인  
✅ readings 테이블 확인
```

이 방법으로 하면 **10분 내에 문제 해결** 가능합니다! 🎉

어떤 옵션으로 진행해보시겠어요?