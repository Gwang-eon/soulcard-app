# 🚀 배포 가이드

## 환경 구성

### 🏗️ 환경별 구성
```yaml
Development (개발서버):
  - 브랜치: develop
  - 도메인: dev.soulcard.app
  - 백업: soulcard-app-dev.vercel.app
  - 용도: 기능 개발, 빠른 테스트
  - 설정: vercel.dev.json

Staging (테스트서버):
  - 브랜치: staging  
  - 도메인: staging.soulcard.app
  - 백업: soulcard-app-staging.vercel.app
  - 용도: QA 테스트, 클라이언트 데모
  - 설정: vercel.staging.json

Production (운영서버):
  - 브랜치: main
  - 도메인: soulcard.app
  - 백업: soulcard-app.vercel.app
  - 용도: 실제 서비스
  - 설정: vercel.json
```

## 🛠️ 수동 배포 방법

### 개발서버 배포
```bash
# develop 브랜치로 이동
git checkout develop

# 변경사항 커밋 & 푸시
git add .
git commit -m "feat: 새 기능 추가"
git push origin develop

# 수동 배포 (선택사항)
npm run deploy:dev
```

### 테스트서버 배포
```bash
# staging 브랜치로 이동
git checkout staging

# develop에서 변경사항 머지
git merge develop

# 푸시 (자동 배포)
git push origin staging

# 수동 배포 (선택사항)
npm run deploy:staging
```

### 운영서버 배포
```bash
# main 브랜치로 이동
git checkout main

# staging에서 변경사항 머지
git merge staging

# 푸시 (자동 배포)
git push origin main

# 수동 배포 (선택사항)
npm run deploy:prod
```

## ⚙️ Vercel 설정

### 필요한 환경 변수 (Vercel Dashboard에서 설정)
```yaml
Development:
  - XAI_API_KEY: 개발용 API 키
  - NODE_ENV: development
  - ENABLE_DEBUG: true

Staging:
  - XAI_API_KEY: 테스트용 API 키  
  - NODE_ENV: staging
  - ENABLE_DEBUG: true

Production:
  - XAI_API_KEY: 운영용 API 키
  - NODE_ENV: production
  - ENABLE_DEBUG: false
```

### GitHub Secrets 설정 (자동 배포용)
```yaml
Repository Secrets:
  - VERCEL_TOKEN: Vercel CLI 토큰
  - VERCEL_ORG_ID: Vercel 조직 ID
  - VERCEL_PROJECT_ID_DEV: 개발 프로젝트 ID
  - VERCEL_PROJECT_ID_STAGING: 스테이징 프로젝트 ID
  - VERCEL_PROJECT_ID_PROD: 운영 프로젝트 ID
```

## 🔄 자동 배포 워크플로우

### 브랜치별 자동 배포
- `develop` 푸시 → 개발서버 자동 배포
- `staging` 푸시 → 테스트서버 자동 배포  
- `main` 푸시 → 운영서버 자동 배포

### PR 미리보기
- 모든 PR → 임시 미리보기 URL 생성
- PR 코멘트에 미리보기 링크 자동 추가

## 📋 배포 체크리스트

### 개발서버 배포 전
- [ ] 로컬에서 정상 작동 확인
- [ ] 린트 검사 통과
- [ ] 타입 체크 통과
- [ ] 기본 테스트 통과

### 테스트서버 배포 전
- [ ] 개발서버에서 충분한 테스트
- [ ] 기능 완성도 확인
- [ ] 에러 핸들링 검증
- [ ] 성능 이슈 없음

### 운영서버 배포 전
- [ ] 테스트서버에서 완전한 검증
- [ ] 모든 테스트 케이스 통과
- [ ] 보안 검토 완료
- [ ] 백업 계획 수립
- [ ] 롤백 계획 준비

## 🚨 긴급 배포 (핫픽스)

```bash
# 운영 이슈 발생시
git checkout main
git checkout -b hotfix/critical-bug-fix

# 수정 작업
git add .
git commit -m "hotfix: 긴급 버그 수정"

# main에 직접 머지
git checkout main
git merge hotfix/critical-bug-fix
git push origin main

# 다른 브랜치에도 반영
git checkout develop
git merge main
git checkout staging  
git merge main
```

## 📊 모니터링

### 배포 후 확인사항
- [ ] 서비스 정상 접속 확인
- [ ] 주요 기능 동작 확인
- [ ] API 응답 확인
- [ ] 에러 로그 모니터링
- [ ] 성능 지표 확인

### 유용한 명령어
```bash
# 환경 변수 확인
vercel env ls

# 배포 로그 확인
vercel logs

# 도메인 확인
vercel domains ls

# 프로젝트 정보
vercel project ls
```