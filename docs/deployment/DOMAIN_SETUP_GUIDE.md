# 🌐 SoulCard.app 도메인 설정 가이드

## 📅 도메인 정보
- **메인 도메인**: soulcard.app
- **구매일**: 2025년 8월 1일
- **등록기관**: (도메인 등록기관 정보)
- **만료일**: (1년 후)

## 🚀 Vercel 도메인 연결 단계

### 1단계: Vercel 프로젝트 생성
```bash
# 메인 프로젝트 (운영)
vercel --name soulcard-app

# 개발 프로젝트  
vercel --name soulcard-app-dev

# 스테이징 프로젝트
vercel --name soulcard-app-staging

# 관리자 프로젝트
vercel --name soulcard-app-admin
```

### 2단계: 도메인 연결
```bash
# 메인 도메인 연결 (운영)
vercel domains add soulcard.app --project soulcard-app

# www 서브도메인 (운영으로 리다이렉트)
vercel domains add www.soulcard.app --project soulcard-app

# 개발 서브도메인
vercel domains add dev.soulcard.app --project soulcard-app-dev

# 스테이징 서브도메인  
vercel domains add staging.soulcard.app --project soulcard-app-staging

# 관리자 서브도메인
vercel domains add admin.soulcard.app --project soulcard-app-admin
```

### 3단계: DNS 설정
도메인 등록기관에서 다음 DNS 레코드 추가:

```dns
# A 레코드 (메인 도메인)
Type: A
Name: @
Value: 76.76.19.61 (Vercel IP)

# CNAME 레코드 (www)
Type: CNAME  
Name: www
Value: cname.vercel-dns.com

# CNAME 레코드 (서브도메인들)
Type: CNAME
Name: dev
Value: cname.vercel-dns.com

Type: CNAME
Name: staging  
Value: cname.vercel-dns.com

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

## 🌍 최종 도메인 구조

### 환경별 URL
```yaml
Production (운영):
  - https://soulcard.app (메인)
  - https://www.soulcard.app (리다이렉트)

Development (개발):
  - https://dev.soulcard.app
  - 백업: https://soulcard-app-dev.vercel.app

Staging (테스트):
  - https://staging.soulcard.app  
  - 백업: https://soulcard-app-staging.vercel.app

Admin (관리자):
  - https://admin.soulcard.app
  - 백업: https://soulcard-app-admin.vercel.app
```

### SSL 인증서
- ✅ 자동 생성 (Let's Encrypt via Vercel)
- ✅ 자동 갱신
- ✅ 모든 서브도메인 지원
- ✅ HTTPS 강제 리다이렉트

## ⚙️ 환경별 설정 업데이트

### package.json 업데이트
```json
{
  "name": "soulcard-app",
  "description": "SoulCard - AI 영혼 타로카드 서비스",
  "homepage": "https://soulcard.app",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/soulcard-app.git"
  }
}
```

### 환경 변수 설정
```bash
# Production
NEXT_PUBLIC_SITE_URL=https://soulcard.app
NEXT_PUBLIC_API_URL=https://soulcard.app/api

# Staging  
NEXT_PUBLIC_SITE_URL=https://staging.soulcard.app
NEXT_PUBLIC_API_URL=https://staging.soulcard.app/api

# Development
NEXT_PUBLIC_SITE_URL=https://dev.soulcard.app  
NEXT_PUBLIC_API_URL=https://dev.soulcard.app/api
```

## 🔧 설정 파일 업데이트

### vercel.json (운영)
```json
{
  "name": "soulcard-app",
  "alias": ["soulcard.app", "www.soulcard.app"],
  "redirects": [
    {
      "source": "https://www.soulcard.app/(.*)",
      "destination": "https://soulcard.app/$1",
      "permanent": true
    }
  ]
}
```

### Meta 태그 및 SEO
```html
<!-- 기본 메타 태그 -->
<title>SoulCard - AI 영혼 타로카드</title>
<meta name="description" content="AI가 해석하는 영혼의 타로카드. 당신의 내면을 들여다보는 신비로운 경험을 시작하세요.">
<meta name="keywords" content="타로카드, AI타로, 영혼, 점술, 미래예측, SoulCard">

<!-- Open Graph -->
<meta property="og:title" content="SoulCard - AI 영혼 타로카드">
<meta property="og:description" content="AI가 해석하는 영혼의 타로카드">
<meta property="og:url" content="https://soulcard.app">
<meta property="og:site_name" content="SoulCard">

<!-- 파비콘 -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## 📊 도메인 모니터링

### 설정 확인 명령어
```bash
# DNS 확인
nslookup soulcard.app
nslookup dev.soulcard.app
nslookup staging.soulcard.app

# SSL 인증서 확인
curl -I https://soulcard.app
curl -I https://dev.soulcard.app
curl -I https://staging.soulcard.app

# Vercel 도메인 상태 확인
vercel domains ls
```

### 모니터링 체크리스트
```yaml
설정 후 확인사항:
□ 메인 도메인 접속 확인 (soulcard.app)
□ www 리다이렉트 확인 (www.soulcard.app → soulcard.app)
□ SSL 인증서 정상 적용
□ 서브도메인 접속 확인 (dev, staging, admin)
□ 모바일에서 접속 확인
□ 다양한 브라우저에서 테스트
```

## 🎯 다음 단계

### 즉시 실행
1. **DNS 설정**: 도메인 등록기관에서 DNS 레코드 추가
2. **Vercel 연결**: 각 환경별 도메인 연결
3. **SSL 확인**: 자동 인증서 발급 확인

### 1주일 내
1. **SEO 최적화**: 메타 태그 및 구조화 데이터 추가
2. **성능 최적화**: 도메인별 캐싱 설정
3. **모니터링 설정**: 업타임 및 성능 모니터링

### 1개월 내  
1. **CDN 최적화**: 글로벌 성능 향상
2. **보안 강화**: CSP, HSTS 등 보안 헤더
3. **분석 도구**: Google Analytics, Search Console 연동

---

**SoulCard.app으로 전문적인 서비스가 완성됩니다!** ✨

*설정 완료 예상 시간: 2-3시간*  
*도메인 전파 시간: 24-48시간*