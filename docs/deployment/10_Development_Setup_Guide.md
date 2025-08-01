# 🛠️ 개발 환경 설정 가이드

AI 타로카드 앱 개발을 위한 완전한 환경 설정 및 개발 가이드

## 📋 목차

1. [시스템 요구사항](#시스템-요구사항)
2. [설치 및 설정](#설치-및-설정)
3. [개발 도구](#개발-도구)
4. [프로젝트 구조](#프로젝트-구조)
5. [개발 워크플로](#개발-워크플로)
6. [테스트 가이드](#테스트-가이드)
7. [배포 가이드](#배포-가이드)

## 💻 시스템 요구사항

### 필수 요구사항

```bash
# Node.js 버전
Node.js >= 18.0.0
npm >= 8.0.0

# 권장 사양
메모리: 4GB RAM 이상
디스크: 2GB 여유 공간
OS: macOS, Windows, Linux
```

### 권장 개발 도구

```bash
# 에디터
Visual Studio Code (권장)
WebStorm
Sublime Text

# 브라우저
Chrome (개발자 도구 최적화)
Firefox Developer Edition
Safari (macOS 테스트용)

# 터미널
iTerm2 (macOS)
Windows Terminal (Windows)
Hyper (크로스 플랫폼)
```

## 🚀 설치 및 설정

### 1. 저장소 클론

```bash
# 프로젝트 클론 (GitHub 저장소가 있는 경우)
git clone https://github.com/your-username/ai-tarot-card-app.git
cd ai-tarot-card-app

# 또는 기존 프로젝트 디렉토리에서
cd /Volumes/PROJECT/apps/card
```

### 2. 의존성 설치

```bash
# npm 의존성 설치
npm install

# 설치 확인
npm list --depth=0
```

**주요 의존성:**
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@types/uuid": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 3. TypeScript 컴파일 확인

```bash
# TypeScript 컴파일
npm run build

# 컴파일 성공 시 dist/ 폴더 생성 확인
ls -la dist/
```

### 4. 실행 테스트

```bash
# 콘솔 앱 실행
npm start

# 웹 서버 실행
npm run web

# 데모 실행
npm run demo
```

## 🔧 개발 도구

### 1. VS Code 설정

**추천 익스텐션:**
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

**`.vscode/settings.json`:**
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  }
}
```

**`.vscode/launch.json` (디버깅 설정):**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Node.js App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/dist/src/index.js",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Web Server",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceFolder}/server/app.ts"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### 2. Git 설정

**`.gitignore`:**
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp

# OS generated files
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Logs
logs/
*.log

# TypeScript
*.tsbuildinfo
```

**Git Hooks (선택사항):**
```bash
# Husky 설치 (커밋 전 자동 검사)
npm install --save-dev husky
npx husky init
echo "npm run lint && npm test" > .husky/pre-commit
```

### 3. ESLint 및 Prettier 설정

**`.eslintrc.js`:**
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': 'off', // 데모와 로깅을 위해 허용
    '@typescript-eslint/no-explicit-any': 'warn',
    'max-len': ['warn', { code: 120 }],
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
};
```

**`.prettierrc`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 📁 프로젝트 구조

### 디렉토리 구조 상세

```
ai-tarot-card-app/
├── 📁 src/                     # 메인 소스 코드
│   └── index.ts               # 앱 진입점
├── 📁 server/                  # 웹 서버
│   └── app.ts                 # Express 서버
├── 📁 data/                    # 데이터 파일들
│   ├── cards/                 # 카드 데이터
│   │   ├── majorArcana.json   # 메이저 아르카나 22장
│   │   ├── wands.json         # 완드 14장
│   │   ├── cups.json          # 컵 14장
│   │   ├── swords.json        # 소드 14장
│   │   └── pentacles.json     # 펜타클 14장
│   ├── enums.json            # 열거형 정의
│   ├── majorArcanaElements.json # 점성학적 정보
│   └── cardCombinations.json  # 조합 데이터
├── 📁 types/                   # TypeScript 타입 정의
│   └── tarot.ts               # 타로 관련 타입들
├── 📁 utils/                   # 유틸리티 함수들
│   ├── cardLoader.ts          # 카드 데이터 로더
│   ├── cardRenderer.ts        # 카드 렌더링
│   └── combinationEngine.ts   # 조합 분석 엔진
├── 📁 services/               # 비즈니스 로직
│   └── tarotReading.ts        # 타로 리딩 서비스
├── 📁 demo/                   # 사용 예시
│   └── usage.ts               # 데모 코드
├── 📁 tests/                  # 테스트 파일들
│   ├── setup.ts              # 테스트 설정
│   └── basic.test.ts         # 기본 테스트
├── 📁 public/                 # 웹 정적 파일들
│   └── index.html            # 웹 인터페이스
├── 📁 docs/                   # 문서들
│   ├── 00_AI_Tarot_App_Proposal.md
│   ├── 01_App_Store_Deployment_Guide.md
│   ├── 02_MVP_Development_Guide.md
│   ├── 03_Tarot_Cards_Reference_Guide.md
│   ├── 04_Midjourney_Prompts_Minor_Arcana.md
│   ├── 05_Midjourney_Prompts_Major_Arcana.md
│   ├── 06_Tarot_Interpretation_Database.md
│   ├── 07_Complete_Tarot_Interpretation_Database.md
│   ├── 08_Web_Interface_Guide.md
│   ├── 09_Technical_Architecture.md
│   └── 10_Development_Setup_Guide.md (현재 파일)
├── 📁 dist/                   # 컴파일된 JavaScript 파일들
├── 📄 package.json           # npm 설정 및 의존성
├── 📄 tsconfig.json          # TypeScript 설정
├── 📄 jest.config.js         # Jest 테스트 설정
├── 📄 .eslintrc.js          # ESLint 설정
├── 📄 .gitignore            # Git 무시 파일 목록
└── 📄 README.md             # 프로젝트 개요
```

### 파일 명명 규칙

```typescript
// 파일명 규칙
- 컴포넌트: PascalCase (CardLoader.ts)
- 유틸리티: camelCase (cardRenderer.ts)  
- 테스트: *.test.ts
- 타입 정의: *.types.ts 또는 types/*.ts
- 설정 파일: kebab-case (.eslintrc.js)

// 변수명 규칙
- 함수/변수: camelCase (performReading)
- 상수: SNAKE_CASE (MAX_CARDS)
- 클래스: PascalCase (TarotReadingService)
- 인터페이스: PascalCase with I prefix (ITarotCard) - 선택사항
```

## 🔄 개발 워크플로

### 1. 일반적인 개발 사이클

```bash
# 1. 기능 브랜치 생성
git checkout -b feature/new-spread-type

# 2. 코드 작성 및 테스트
npm run dev          # 개발 모드 실행
npm run test:watch   # 테스트 감시 모드

# 3. 코드 품질 검사
npm run lint         # ESLint 검사
npm run typecheck    # 타입 체크
npm test            # 전체 테스트 실행

# 4. 빌드 확인
npm run build       # 프로덕션 빌드

# 5. 커밋 및 푸시
git add .
git commit -m "feat: add new spread type"
git push origin feature/new-spread-type
```

### 2. 개발 환경별 실행

**개발 환경:**
```bash
# 핫 리로드 개발 모드
npm run dev

# 웹 개발 서버 (자동 재시작)
npx nodemon server/app.ts

# 테스트 감시 모드
npm run test:watch
```

**프로덕션 환경:**
```bash
# 빌드 및 실행
npm run build
npm start

# 웹 서버 실행
npm run web
```

### 3. 디버깅 가이드

**VS Code 디버깅:**
1. `F5` 키 또는 디버그 패널에서 "Debug Node.js App" 선택
2. 브레이크포인트 설정
3. 단계별 실행으로 문제 지점 추적

**콘솔 디버깅:**
```typescript
// 개발용 로깅
console.log('🔮 Debug:', { cardId, isReversed });

// 조건부 디버깅
if (process.env.NODE_ENV === 'development') {
  console.log('Development info:', data);
}
```

**성능 프로파일링:**
```typescript
// 실행 시간 측정
const start = Date.now();
await performReading();
console.log(`⏱️ 실행 시간: ${Date.now() - start}ms`);
```

## 🧪 테스트 가이드

### 1. 테스트 구조

```typescript
// tests/basic.test.ts
describe('타로 카드 앱 기본 기능 테스트', () => {
  beforeAll(async () => {
    await cardLoader.loadAllCards();
  });

  describe('CardLoader', () => {
    test('카드 데이터가 정상적으로 로드되어야 함', () => {
      const stats = cardLoader.getStats();
      expect(stats.totalCards).toBeGreaterThan(0);
    });
  });

  describe('CombinationEngine', () => {
    test('2카드 조합 해석이 생성되어야 함', () => {
      // 테스트 로직
    });
  });
});
```

### 2. 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 감시 모드
npm run test:watch

# 커버리지 리포트
npm test -- --coverage

# 특정 파일 테스트
npm test -- cardLoader.test.ts
```

### 3. 테스트 작성 가이드

**유닛 테스트:**
```typescript
describe('CardLoader', () => {
  test('should load cards successfully', async () => {
    // Given
    const loader = CardLoader.getInstance();
    
    // When
    await loader.loadAllCards();
    
    // Then
    expect(loader.isDataLoaded()).toBe(true);
    expect(loader.getAllCards().length).toBeGreaterThan(0);
  });
});
```

**통합 테스트:**
```typescript
describe('TarotReading Integration', () => {
  test('should perform complete reading workflow', async () => {
    // Given
    const question = '테스트 질문';
    const category = 'general';
    
    // When
    const reading = await tarotReading.performSingleCardReading(question, category);
    
    // Then
    expect(reading.question).toBe(question);
    expect(reading.cards).toHaveLength(1);
    expect(reading.interpretation).toBeDefined();
  });
});
```

## 🚀 배포 가이드

### 1. 로컬 배포

```bash
# 프로덕션 빌드
npm run build

# PM2를 이용한 프로세스 관리 (선택사항)
npm install -g pm2
pm2 start dist/server/app.js --name "tarot-app"
pm2 status
pm2 logs tarot-app
```

### 2. Docker 배포 (선택사항)

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  tarot-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**실행:**
```bash
docker-compose up -d
```

### 3. 환경 변수

**`.env` 파일:**
```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

**환경별 설정:**
```typescript
// config/index.ts
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
};
```

## 🔧 문제 해결

### 자주 발생하는 문제들

**1. TypeScript 컴파일 에러**
```bash
# 문제: Module not found 에러
# 해결: tsconfig.json의 paths 설정 확인
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**2. 카드 데이터 로딩 실패**
```bash
# 문제: 파일 경로 오류
# 해결: 절대 경로 사용 확인
const fullPath = require('path').join(__dirname, '..', path);
```

**3. 웹 서버 포트 충돌**
```bash
# 문제: EADDRINUSE 에러
# 해결: 포트 변경 또는 프로세스 종료
lsof -ti:3000 | xargs kill -9
# 또는 환경 변수로 포트 변경
PORT=3001 npm run web
```

**4. 메모리 부족**
```bash
# 문제: JavaScript heap out of memory
# 해결: Node.js 메모리 제한 증가
node --max-old-space-size=4096 dist/src/index.js
```

### 디버깅 체크리스트

```markdown
□ Node.js 버전 확인 (>=18.0.0)
□ npm 의존성 재설치 (rm -rf node_modules && npm install)
□ TypeScript 컴파일 성공 확인 (npm run build)
□ 포트 충돌 확인 (lsof -i :3000)
□ 파일 권한 확인 (chmod +x scripts/*)
□ 환경 변수 설정 확인 (.env 파일)
□ 로그 파일 확인 (logs/ 디렉토리)
```

## 📚 추가 리소스

### 학습 자료

**TypeScript:**
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

**Node.js:**
- [Node.js 가이드](https://nodejs.org/en/guides/)
- [Express.js 문서](https://expressjs.com/)

**테스팅:**
- [Jest 문서](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### 커뮤니티

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **Discussions**: 일반적인 질문 및 토론
- **Wiki**: 추가 문서 및 튜토리얼

### 기여 가이드

```markdown
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request
```

---

**🛠️ 이 가이드를 따라하면 AI 타로카드 앱의 개발 환경을 완벽하게 구축하고, 효율적인 개발 워크플로를 구축할 수 있습니다! 🔮**