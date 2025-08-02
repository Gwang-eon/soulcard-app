# 🌐 SoulCard.app DNS 설정 체크리스트

## 📅 현황 분석 (2025.08.01)

### ✅ 확인된 현재 설정
- **도메인**: soulcard.app (구매 완료)
- **네임서버**: Vercel DNS 사용 중
  - ns1.vercel-dns.com
  - ns2.vercel-dns.com
- **기존 레코드**: ALIAS 및 CAA 레코드 설정됨

## 🎯 필요한 DNS 레코드 설정

### 1. 메인 도메인 (soulcard.app)
```dns
Type: A
Name: @ (또는 비워둠)
Value: 76.76.21.21
TTL: 60
Comment: Main domain for SoulCard.app
```

### 2. WWW 서브도메인
```dns
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 60
Comment: Redirect www to main domain
```

### 3. 개발 환경 (dev.soulcard.app)
```dns
Type: CNAME
Name: dev
Value: cname.vercel-dns.com
TTL: 60
Comment: Development environment
```

### 4. 스테이징 환경 (staging.soulcard.app)
```dns
Type: CNAME
Name: staging
Value: cname.vercel-dns.com
TTL: 60
Comment: Staging environment for testing
```

### 5. 관리자 환경 (admin.soulcard.app) - 선택사항
```dns
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 60
Comment: Admin dashboard (future use)
```

## 📋 설정 단계별 가이드

### Step 1: Vercel 프로젝트 생성
```bash
# 메인 프로젝트
vercel --name soulcard-app

# 개발 프로젝트
vercel --name soulcard-app-dev

# 스테이징 프로젝트
vercel --name soulcard-app-staging
```

### Step 2: Vercel에서 도메인 연결
```bash
# 메인 도메인
vercel domains add soulcard.app --project soulcard-app

# 서브도메인들
vercel domains add www.soulcard.app --project soulcard-app
vercel domains add dev.soulcard.app --project soulcard-app-dev
vercel domains add staging.soulcard.app --project soulcard-app-staging
```

### Step 3: DNS 레코드 추가 (현재 화면에서)
1. **Add** 버튼 클릭
2. 위의 DNS 레코드들을 하나씩 추가

## 🚨 중요 주의사항

### DNS 전파 시간
- **일반적**: 1-4시간
- **최대**: 24-48시간
- **확인 방법**: `nslookup soulcard.app`

### SSL 인증서
- **자동 발급**: Let's Encrypt (이미 CAA 레코드 설정됨)
- **발급 시간**: 5-10분
- **갱신**: 자동

### 현재 화면에서 할 일
```yaml
우선순위 1 (필수):
□ @ (메인) A 레코드 → 76.76.21.21
□ www CNAME 레코드 → cname.vercel-dns.com

우선순위 2 (개발용):
□ dev CNAME 레코드 → cname.vercel-dns.com
□ staging CNAME 레코드 → cname.vercel-dns.com

우선순위 3 (선택사항):
□ admin CNAME 레코드 → cname.vercel-dns.com
```

## 🔍 설정 확인 방법

### 1. DNS 전파 확인
```bash
# 메인 도메인 확인
nslookup soulcard.app

# 서브도메인 확인
nslookup dev.soulcard.app
nslookup staging.soulcard.app
```

### 2. 웹 접속 테스트
```yaml
예상 결과:
- https://soulcard.app → 메인 서비스
- https://www.soulcard.app → 메인으로 리다이렉트
- https://dev.soulcard.app → 개발 환경
- https://staging.soulcard.app → 스테이징 환경
```

### 3. SSL 인증서 확인
```bash
# SSL 상태 확인
curl -I https://soulcard.app

# 인증서 정보 확인
openssl s_client -connect soulcard.app:443 -servername soulcard.app
```

## 📊 현재 진행 상황

### ✅ 완료된 항목
- [x] 도메인 구매 (soulcard.app)
- [x] Vercel 네임서버 설정
- [x] 기본 ALIAS 레코드 설정
- [x] CAA 레코드 설정 (SSL용)

### 🚧 진행 중인 항목
- [ ] 메인 도메인 A 레코드 추가
- [ ] 서브도메인 CNAME 레코드 추가
- [ ] Vercel 프로젝트와 도메인 연결

### ⏳ 대기 중인 항목
- [ ] DNS 전파 대기 (1-4시간)
- [ ] SSL 인증서 자동 발급
- [ ] 도메인 접속 테스트

## 🎯 다음 단계

### 즉시 실행 (현재 화면에서)
1. **@ A 레코드** 추가: `76.76.21.21`
2. **www CNAME 레코드** 추가: `cname.vercel-dns.com`
3. **dev CNAME 레코드** 추가: `cname.vercel-dns.com`

### 1시간 후 확인
- DNS 전파 상태 확인
- 도메인 접속 테스트
- SSL 인증서 발급 확인

### 완료 후 테스트
```bash
# 접속 테스트
curl -I https://soulcard.app
curl -I https://dev.soulcard.app
curl -I https://staging.soulcard.app
```

---

**🌟 DNS 설정이 완료되면 soulcard.app으로 정식 서비스 시작!** ✨

*설정 완료 예상 시간: 30분 + DNS 전파 대기 1-4시간*