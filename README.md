# 🔮 SoulCard.app - AI 영혼 타로카드

**AI가 해석하는 영혼의 타로카드 서비스**

## 🏗️ 프로젝트 구조

```
🔮 SoulCard.app/
├── 📁 frontend/              # 프론트엔드 (React + TypeScript)
│   ├── src/                  # React 컴포넌트 및 페이지
│   ├── public/               # 정적 자산 (이미지, CSS)
│   ├── package.json          # 프론트엔드 의존성
│   └── vite.config.ts        # 빌드 설정
├── 📁 backend/               # 백엔드 API
│   ├── api/                  # REST API 엔드포인트
│   ├── services/             # 타로 해석 엔진
│   ├── ai/                   # AI 모델 통합
│   ├── utils/                # 유틸리티 함수
│   └── package.json          # 백엔드 의존성
├── 📁 database/              # 데이터베이스
│   ├── data/                 # 타로카드 데이터 (JSON)
│   └── schemas/              # 데이터 스키마
├── 📁 server/                # 서버 설정
│   ├── app.ts                # Express 서버
│   ├── websocket-server.ts   # WebSocket 서버
│   └── configs/              # 서버 설정
├── 📁 figma-designs/         # Figma 디자인 시스템
├── 📁 docs/                  # 프로젝트 문서
│   ├── api/                  # API 문서
│   ├── deployment/           # 배포 가이드
│   └── development-guide/    # 개발 가이드
├── 📁 tests/                 # 테스트 코드
│   ├── unit/                 # 단위 테스트
│   ├── integration/          # 통합 테스트
│   └── archives/             # 테스트 아카이브
└── 📁 archives/              # 구버전 파일들
```

## 🚀 빠른 시작

### 프론트엔드 개발
```bash
cd frontend
npm install
npm run dev
```

### 백엔드 개발
```bash
cd backend
npm install
npm run dev
```

## 🌟 주요 특징

- **4가지 타로 스프레드**: 단일카드, 3카드, 관계상담, 켈틱크로스
- **AI 실시간 해석**: xAI API를 통한 고품질 타로 해석
- **78장 완전한 덱**: 메이저/마이너 아르카나 모든 카드
- **모듈화된 구조**: 프론트엔드/백엔드 분리
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원

## 🛠️ 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **Framer Motion** (애니메이션)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **WebSocket** (실시간 통신)
- **xAI API** (AI 해석)

### Database
- **JSON 파일** (타로카드 데이터)
- **향후 확장**: PostgreSQL/MongoDB

## 🌐 배포 환경

- **Production**: `https://soulcard.app`
- **Staging**: `https://staging.soulcard.app`
- **Development**: `https://dev.soulcard.app`

## 📋 개발 워크플로우

1. **Frontend 개발**: `frontend/` 디렉토리에서 React 컴포넌트 작업
2. **Backend 개발**: `backend/` 디렉토리에서 API 개발
3. **데이터 관리**: `database/` 디렉토리에서 타로카드 데이터 관리
4. **문서화**: `docs/` 디렉토리에서 프로젝트 문서 작성

## 🤝 기여하기

각 모듈별로 독립적인 개발이 가능합니다:
- Frontend: UI/UX 개선
- Backend: API 및 AI 엔진 개선
- Database: 데이터 구조 최적화
- Docs: 문서 및 가이드 작성

## 📝 라이선스

MIT License

---

**✨ Made with 🔮 by SoulCard Team**