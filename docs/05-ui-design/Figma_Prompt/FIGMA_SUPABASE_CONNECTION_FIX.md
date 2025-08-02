# 🔧 Figma-Supabase 연결 오류 해결 가이드

## 😅 문제 상황
- ✅ Figma에서 Supabase 연결했음
- ❌ Supabase에서 실수로 프로젝트 삭제
- ❌ Figma가 삭제된 Supabase를 계속 찾음
- ❌ 새로운 Supabase 프로젝트 생성 안됨

---

## 🛠️ 해결 방법들

### 방법 1: Figma 캐시 및 연결 초기화 (가장 효과적)

#### A. Figma 브라우저 캐시 완전 삭제
```bash
# Chrome/Edge 기준
1. 브라우저 설정 → 개인정보 보호 및 보안
2. 인터넷 사용 기록 삭제
3. "전체 기간" 선택
4. ✅ 쿠키 및 기타 사이트 데이터
5. ✅ 캐시된 이미지 및 파일
6. ✅ 사이트 설정
7. "데이터 삭제" 클릭
```

#### B. Figma 로그아웃 후 재로그인
```
1. Figma 완전 로그아웃
2. 브라우저 재시작
3. Figma 재로그인
4. 프로젝트 다시 열기
```

#### C. Figma Dev Mode에서 연결 해제
```
1. Figma 프로젝트 열기
2. Dev Mode 진입 (우상단 </> 아이콘)
3. Plugins → Ready for dev
4. Database connections → Disconnect all
5. 기존 연결 모두 제거
```

### 방법 2: 새로운 Figma 프로젝트로 시작

#### A. 프로젝트 복제
```
1. 현재 Figma 프로젝트에서 "Duplicate"
2. 새 이름: "SoulCard App v2" 
3. 새 프로젝트에서 Supabase 연결 시도
```

#### B. 컴포넌트만 복사
```
1. 기존 프로젝트에서 모든 컴포넌트 선택 (Ctrl+A)
2. 복사 (Ctrl+C)
3. 새 Figma 프로젝트 생성
4. 붙여넣기 (Ctrl+V)
5. 새 프로젝트에서 Supabase 연결
```

### 방법 3: Supabase 프로젝트 재생성

#### A. 동일한 이름으로 새 프로젝트 생성
```
Organization: soulcard
Project name: SoulCard App  
Database name: soulcard-db-v2  # 새로운 이름
Region: Northeast Asia (Seoul)
```

#### B. 기존 스키마 그대로 재생성
```sql
-- 이전에 작성한 모든 스키마를 그대로 실행
-- docs/deployment/SUPABASE_SETUP_CHECKLIST.md 참조

-- 1. 테이블 생성
CREATE TABLE user_profiles (...);
CREATE TABLE user_settings (...);
CREATE TABLE readings (...);
-- ... 전체 스키마

-- 2. RLS 설정
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- ... 전체 정책

-- 3. 함수 및 트리거
CREATE OR REPLACE FUNCTION handle_new_user() ...;
-- ... 전체 함수
```

### 방법 4: Vercel에서 Supabase 연결 재설정

#### A. Vercel Storage 연결 삭제
```
1. Vercel Dashboard
2. 프로젝트 → Storage 탭
3. 기존 soulcard-db 연결 삭제
4. "Remove Integration" 클릭
```

#### B. 새 Supabase로 재연결
```
1. Add Storage → Supabase
2. 새로 생성한 Supabase 프로젝트 선택
3. Database name: soulcard-db-v2
4. 환경변수 자동 설정 확인
```

---

## 🔄 단계별 복구 절차 (권장)

### Step 1: 완전 초기화
```bash
# 1. 브라우저 캐시 완전 삭제
# 2. Figma 로그아웃
# 3. 브라우저 재시작
# 4. Figma 재로그인
```

### Step 2: 새 Supabase 프로젝트 생성
```
Database name: soulcard-db-v2
Password: [새로운 강력한 비밀번호]
Region: Northeast Asia (Seoul)
```

### Step 3: Vercel 재연결
```
1. 기존 Storage 연결 제거
2. 새 Supabase 프로젝트로 재연결
3. 환경변수 확인
```

### Step 4: Figma에서 새 연결
```
1. Dev Mode 진입
2. Database → Connect to Supabase
3. 새 프로젝트 URL 및 키 입력
4. 연결 테스트
```

### Step 5: 스키마 재생성
```sql
-- Supabase SQL Editor에서 전체 스키마 실행
-- 기존 docs/deployment/SUPABASE_SETUP_CHECKLIST.md 내용
```

---

## 🧪 연결 테스트

### A. Supabase 연결 확인
```javascript
// 브라우저 콘솔에서 테스트
const { createClient } = supabase
const client = createClient('YOUR_NEW_URL', 'YOUR_NEW_ANON_KEY')

client.from('token_packages').select('*').then(console.log)
// 결과가 나오면 연결 성공
```

### B. Figma 연결 상태 확인
```
1. Figma Dev Mode
2. Database panel 확인
3. "Connected to Supabase" 표시 확인
4. Tables 목록 정상 표시 확인
```

### C. API 테스트
```bash
# 새로운 환경변수로 테스트
curl https://soulcard-app.vercel.app/api/test-database

# 성공 응답 확인:
{
  "success": true,
  "message": "Supabase 데이터베이스 연결 성공! 🎉"
}
```

---

## 🛡️ 향후 방지 대책

### 1. 백업 환경변수 보관
```bash
# .env.backup 파일 생성
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
DATABASE_PASSWORD=your_secure_password
```

### 2. 스키마 백업
```sql
-- schema-backup.sql 파일로 저장
-- 정기적으로 백업 업데이트
```

### 3. 개발/프로덕션 분리
```
개발: soulcard-db-dev
스테이징: soulcard-db-staging  
프로덕션: soulcard-db-prod
```

### 4. Figma 프로젝트 백업
```
1. 정기적인 프로젝트 복제
2. 버전 히스토리 활용
3. 팀 라이브러리 백업
```

---

## 🚨 긴급 복구 체크리스트

- [ ] 브라우저 캐시 완전 삭제
- [ ] Figma 로그아웃/재로그인
- [ ] 새 Supabase 프로젝트 생성 (soulcard-db-v2)
- [ ] Vercel Storage 재연결
- [ ] 환경변수 업데이트 확인
- [ ] 데이터베이스 스키마 재생성
- [ ] Figma Dev Mode에서 새 DB 연결
- [ ] API 연결 테스트 (/api/test-database)
- [ ] Figma Make 재생성 테스트

---

## 💡 문제 해결 팁

### 연결이 안 될 때:
1. **시크릿 브라우징 모드**에서 시도
2. **다른 브라우저**에서 시도 (Chrome → Firefox)
3. **VPN 연결 해제** 후 시도
4. **Figma Desktop 앱** 사용

### 데이터베이스 문제:
1. **Supabase 대시보드**에서 프로젝트 상태 확인
2. **SQL Editor**에서 테이블 존재 여부 확인
3. **API Settings**에서 URL/Key 재확인

### Figma 문제:
1. **Dev Mode 새로고침** (F5)
2. **플러그인 비활성화** 후 재시도
3. **Figma 앱 재시작**

대부분의 경우 **방법 1 (캐시 초기화) + 방법 3 (새 Supabase 프로젝트)**으로 해결됩니다! 🎯

어떤 방법부터 시도해보시겠어요?