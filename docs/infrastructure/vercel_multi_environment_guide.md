# 🚀 Vercel 멀티 환경 구성 가이드

## 📋 목차
1. [Vercel 환경 구성 개요](#vercel-환경-구성-개요)
2. [개발 환경 (Development)](#개발-환경-development)
3. [테스트 환경 (Staging)](#테스트-환경-staging)
4. [운영 환경 (Production)](#운영-환경-production)
5. [관리자 환경 (Admin)](#관리자-환경-admin)
6. [배포 자동화 설정](#배포-자동화-설정)
7. [환경별 설정 관리](#환경별-설정-관리)
8. [모니터링 및 관리](#모니터링-및-관리)

## 🏗️ Vercel 환경 구성 개요

### 전체 아키텍처
```
┌─────────────────────────────────────────────────────┐
│                    GitHub/GitLab                    │
│  ├── main branch        → Production               │
│  ├── staging branch     → Staging                  │
│  ├── develop branch     → Development              │
│  └── admin branch       → Admin Dashboard          │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                    Vercel Projects                  │
├─────────────────────────────────────────────────────┤
│  📱 tarot-app          (Production)                 │
│  🧪 tarot-app-staging  (Staging)                    │
│  💻 tarot-app-dev      (Development)                │
│  🛠️ tarot-app-admin    (Admin)                      │
└─────────────────────────────────────────────────────┘
```

### 환경별 도메인 구조
```yaml
Production:
  - https://tarot-app.com (커스텀 도메인)
  - https://tarot-app.vercel.app (기본 도메인)

Staging:
  - https://staging.tarot-app.com
  - https://tarot-app-staging.vercel.app

Development:
  - https://dev.tarot-app.com
  - https://tarot-app-dev.vercel.app

Admin:
  - https://admin.tarot-app.com
  - https://tarot-app-admin.vercel.app

Preview:
  - https://tarot-app-[branch]-[hash].vercel.app
```

## 💻 개발 환경 (Development)

### 1. 프로젝트 생성 및 설정
```bash
# 개발 환경 프로젝트 생성
vercel link --project tarot-app-dev

# vercel.json 설정
cat > vercel.json << EOF
{
  "name": "tarot-app-dev",
  "buildCommand": "npm run build:dev",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "NEXT_PUBLIC_ENV": "development",
    "NEXT_PUBLIC_API_URL": "@dev_api_url",
    "NEXT_PUBLIC_SUPABASE_URL": "@dev_supabase_url"
  },
  "build": {
    "env": {
      "NODE_ENV": "development",
      "ENABLE_DEBUG": "true"
    }
  }
}
EOF
```

### 2. 개발 환경 특징
```typescript
// next.config.js
const isDev = process.env.NEXT_PUBLIC_ENV === 'development';

module.exports = {
  // 개발 환경 전용 설정
  reactStrictMode: true,
  swcMinify: !isDev,
  
  // 개발 도구 활성화
  productionBrowserSourceMaps: isDev,
  
  // 환경별 리다이렉트
  async redirects() {
    if (isDev) {
      return [
        {
          source: '/admin',
          destination: 'https://admin.tarot-app.com',
          permanent: false,
        },
      ];
    }
    return [];
  },
  
  // 개발 환경 헤더
  async headers() {
    if (isDev) {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Environment',
              value: 'development',
            },
          ],
        },
      ];
    }
    return [];
  },
};
```

### 3. 로컬 개발 연동
```bash
# .env.development.local
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
XAI_API_KEY=xai-dev-key
ENABLE_DEBUG=true
SHOW_DEV_TOOLS=true

# 개발 서버 실행
npm run dev

# Vercel CLI로 개발 환경 동기화
vercel dev
```

## 🧪 테스트 환경 (Staging)

### 1. Staging 프로젝트 설정
```bash
# Staging 프로젝트 생성
vercel link --project tarot-app-staging

# staging 브랜치에서 자동 배포 설정
vercel git --prod staging
```

### 2. Staging 환경 구성
```json
{
  "name": "tarot-app-staging",
  "buildCommand": "npm run build:staging",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "NEXT_PUBLIC_ENV": "staging",
    "NEXT_PUBLIC_API_URL": "@staging_api_url",
    "NEXT_PUBLIC_SUPABASE_URL": "@staging_supabase_url"
  },
  "build": {
    "env": {
      "NODE_ENV": "production",
      "ANALYZE": "true"
    }
  },
  "functions": {
    "api/tarot-reading.js": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/test-daily",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### 3. Staging 테스트 자동화
```yaml
# .github/workflows/staging-tests.yml
name: Staging Tests

on:
  push:
    branches: [staging]

jobs:
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Wait for Vercel Preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 600
          
      - name: Run E2E Tests
        run: |
          npm install
          STAGING_URL="${{ steps.waitForVercel.outputs.url }}" \
          npm run test:e2e
          
      - name: Run Performance Tests
        run: |
          npm run lighthouse:ci -- \
            --collect.url="${{ steps.waitForVercel.outputs.url }}"
```

## 🚀 운영 환경 (Production)

### 1. Production 설정
```json
{
  "name": "tarot-app",
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["icn1", "hnd1"],
  "env": {
    "NEXT_PUBLIC_ENV": "production",
    "NEXT_PUBLIC_API_URL": "@prod_api_url",
    "NEXT_PUBLIC_SUPABASE_URL": "@prod_supabase_url"
  },
  "build": {
    "env": {
      "NODE_ENV": "production",
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.tarot-app.com/:path*"
    }
  ]
}
```

### 2. Production 보안 설정
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Production 환경 보안 헤더
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );
    
    // CSP 설정
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self'; connect-src 'self' *.supabase.co *.x.ai vitals.vercel-insights.com"
    );
  }
  
  return response;
}

export const config = {
  matcher: '/:path*',
};
```

### 3. Production 배포 프로세스
```bash
# Production 배포 체크리스트 스크립트
#!/bin/bash
# deploy-production.sh

echo "🚀 Production 배포 시작..."

# 1. 테스트 실행
echo "📋 테스트 실행 중..."
npm run test
if [ $? -ne 0 ]; then
  echo "❌ 테스트 실패!"
  exit 1
fi

# 2. 빌드 검증
echo "🔨 Production 빌드 중..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패!"
  exit 1
fi

# 3. 번들 크기 확인
echo "📊 번들 크기 분석..."
npm run analyze

# 4. 배포 확인
read -p "Production에 배포하시겠습니까? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  vercel --prod
  echo "✅ Production 배포 완료!"
else
  echo "❌ 배포 취소됨"
fi
```

## 🛠️ 관리자 환경 (Admin)

### 1. Admin 프로젝트 구성
```bash
# 별도의 Admin 프로젝트 생성
npx create-next-app@latest tarot-app-admin
cd tarot-app-admin

# Vercel 프로젝트 연결
vercel link --project tarot-app-admin
```

### 2. Admin 환경 설정
```json
{
  "name": "tarot-app-admin",
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "NEXT_PUBLIC_ENV": "admin",
    "NEXT_PUBLIC_API_URL": "@admin_api_url",
    "NEXT_PUBLIC_SUPABASE_URL": "@prod_supabase_url",
    "ADMIN_SECRET": "@admin_secret"
  },
  "functions": {
    "api/**/*.js": {
      "maxDuration": 60
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}
```

### 3. Admin 접근 제어
```typescript
// middleware.ts (Admin)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Admin 권한 체크
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();
    
  if (profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
```

## 🔄 배포 자동화 설정

### 1. Git 브랜치 전략
```yaml
브랜치 구조:
  main:       → Production 자동 배포
  staging:    → Staging 자동 배포  
  develop:    → Development 자동 배포
  admin:      → Admin 자동 배포
  feature/*:  → Preview 배포
  hotfix/*:   → Preview 배포
```

### 2. GitHub Actions 통합
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, staging, develop, admin]
  pull_request:
    types: [opened, synchronize, reopened]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set Environment Variables
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_PROD }}" >> $GITHUB_ENV
            echo "ENVIRONMENT=production" >> $GITHUB_ENV
          elif [[ "${{ github.ref }}" == "refs/heads/staging" ]]; then
            echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_STAGING }}" >> $GITHUB_ENV
            echo "ENVIRONMENT=staging" >> $GITHUB_ENV
          elif [[ "${{ github.ref }}" == "refs/heads/develop" ]]; then
            echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_DEV }}" >> $GITHUB_ENV
            echo "ENVIRONMENT=development" >> $GITHUB_ENV
          elif [[ "${{ github.ref }}" == "refs/heads/admin" ]]; then
            echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_ADMIN }}" >> $GITHUB_ENV
            echo "ENVIRONMENT=admin" >> $GITHUB_ENV
          else
            echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_DEV }}" >> $GITHUB_ENV
            echo "ENVIRONMENT=preview" >> $GITHUB_ENV
          fi
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
        
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=${{ env.ENVIRONMENT }} --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build Project Artifacts
        run: |
          if [[ "${{ env.ENVIRONMENT }}" == "production" ]]; then
            vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel build --token=${{ secrets.VERCEL_TOKEN }}
          fi
          
      - name: Deploy to Vercel
        id: deploy
        run: |
          if [[ "${{ env.ENVIRONMENT }}" == "production" ]]; then
            vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
          fi
```

### 3. 환경별 배포 스크립트
```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:dev": "NEXT_PUBLIC_ENV=development next build",
    "build:staging": "NEXT_PUBLIC_ENV=staging next build",
    "build:admin": "NEXT_PUBLIC_ENV=admin next build",
    "start": "next start",
    "deploy:dev": "vercel --env development",
    "deploy:staging": "vercel --env staging",
    "deploy:prod": "vercel --prod",
    "deploy:admin": "vercel --project tarot-app-admin",
    "env:pull:dev": "vercel env pull .env.development.local --environment development",
    "env:pull:staging": "vercel env pull .env.staging.local --environment staging",
    "env:pull:prod": "vercel env pull .env.production.local --environment production"
  }
}
```

## ⚙️ 환경별 설정 관리

### 1. 환경 변수 구조
```bash
# Vercel CLI로 환경 변수 설정
# Development
vercel env add NEXT_PUBLIC_API_URL development
vercel env add DATABASE_URL development
vercel env add XAI_API_KEY development

# Staging  
vercel env add NEXT_PUBLIC_API_URL staging
vercel env add DATABASE_URL staging
vercel env add XAI_API_KEY staging

# Production
vercel env add NEXT_PUBLIC_API_URL production
vercel env add DATABASE_URL production
vercel env add XAI_API_KEY production
```

### 2. 환경별 설정 파일
```typescript
// config/index.ts
interface Config {
  api: {
    url: string;
    timeout: number;
  };
  features: {
    enableDebug: boolean;
    enableAnalytics: boolean;
    enableMockData: boolean;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
}

const configs: Record<string, Config> = {
  development: {
    api: {
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      timeout: 30000,
    },
    features: {
      enableDebug: true,
      enableAnalytics: false,
      enableMockData: true,
    },
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  },
  staging: {
    api: {
      url: process.env.NEXT_PUBLIC_API_URL || 'https://staging-api.tarot-app.com',
      timeout: 15000,
    },
    features: {
      enableDebug: true,
      enableAnalytics: true,
      enableMockData: false,
    },
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  },
  production: {
    api: {
      url: process.env.NEXT_PUBLIC_API_URL || 'https://api.tarot-app.com',
      timeout: 10000,
    },
    features: {
      enableDebug: false,
      enableAnalytics: true,
      enableMockData: false,
    },
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  },
};

export const config = configs[process.env.NEXT_PUBLIC_ENV || 'development'];
```

### 3. 도메인 설정
```bash
# Production 도메인
vercel domains add tarot-app.com --project tarot-app

# Staging 도메인
vercel domains add staging.tarot-app.com --project tarot-app-staging

# Development 도메인
vercel domains add dev.tarot-app.com --project tarot-app-dev

# Admin 도메인
vercel domains add admin.tarot-app.com --project tarot-app-admin
```

## 📊 모니터링 및 관리

### 1. Vercel Analytics 설정
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
  
  return (
    <html lang="ko">
      <body>
        {children}
        {isProduction && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
```

### 2. 환경별 로깅
```typescript
// lib/logger.ts
const logLevels = {
  development: ['debug', 'info', 'warn', 'error'],
  staging: ['info', 'warn', 'error'],
  production: ['warn', 'error'],
  admin: ['info', 'warn', 'error'],
};

class Logger {
  private env: string;
  
  constructor() {
    this.env = process.env.NEXT_PUBLIC_ENV || 'development';
  }
  
  private shouldLog(level: string): boolean {
    const allowedLevels = logLevels[this.env as keyof typeof logLevels];
    return allowedLevels.includes(level);
  }
  
  debug(...args: any[]) {
    if (this.shouldLog('debug')) {
      console.log('[DEBUG]', ...args);
    }
  }
  
  info(...args: any[]) {
    if (this.shouldLog('info')) {
      console.info('[INFO]', ...args);
    }
  }
  
  warn(...args: any[]) {
    if (this.shouldLog('warn')) {
      console.warn('[WARN]', ...args);
    }
  }
  
  error(...args: any[]) {
    if (this.shouldLog('error')) {
      console.error('[ERROR]', ...args);
      
      // Production에서는 Sentry로 전송
      if (this.env === 'production') {
        // Sentry.captureException(args[0]);
      }
    }
  }
}

export const logger = new Logger();
```

### 3. 환경별 모니터링 대시보드
```typescript
// pages/api/health/[env].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { env } = req.query;
  
  const healthChecks = {
    environment: env,
    timestamp: new Date().toISOString(),
    checks: {
      database: await checkDatabase(),
      api: await checkAPI(),
      storage: await checkStorage(),
    },
    build: {
      version: process.env.VERCEL_GIT_COMMIT_SHA,
      deployment: process.env.VERCEL_URL,
    },
  };
  
  const allHealthy = Object.values(healthChecks.checks).every(
    (check) => check === 'healthy'
  );
  
  res.status(allHealthy ? 200 : 503).json(healthChecks);
}

async function checkDatabase(): Promise<string> {
  try {
    // Supabase 연결 체크
    const { error } = await supabase.from('health').select('*').limit(1);
    return error ? 'unhealthy' : 'healthy';
  } catch {
    return 'unhealthy';
  }
}

async function checkAPI(): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
    return response.ok ? 'healthy' : 'unhealthy';
  } catch {
    return 'unhealthy';
  }
}

async function checkStorage(): Promise<string> {
  try {
    // Storage 체크 로직
    return 'healthy';
  } catch {
    return 'unhealthy';
  }
}
```

## 🔒 보안 및 접근 제어

### 1. 환경별 접근 제어
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const env = process.env.NEXT_PUBLIC_ENV;
  const { pathname } = request.nextUrl;
  
  // Development 환경 접근 제한
  if (env === 'development' && !isDevelopmentAllowed(request)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  
  // Staging 환경 Basic Auth
  if (env === 'staging') {
    const basicAuth = request.headers.get('authorization');
    
    if (!basicAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Staging Environment"',
        },
      });
    }
    
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');
    
    if (user !== 'staging' || pwd !== process.env.STAGING_PASSWORD) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }
  
  return NextResponse.next();
}

function isDevelopmentAllowed(request: NextRequest): boolean {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || [];
  const clientIP = request.ip || request.headers.get('x-forwarded-for');
  
  return allowedIPs.includes(clientIP || '');
}
```

### 2. 환경별 보안 헤더
```typescript
// security-headers.ts
export const securityHeaders = {
  development: {
    'X-Environment': 'development',
    'X-Robots-Tag': 'noindex, nofollow',
  },
  staging: {
    'X-Environment': 'staging',
    'X-Robots-Tag': 'noindex, nofollow',
    'X-Frame-Options': 'DENY',
  },
  production: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },
  admin: {
    'X-Environment': 'admin',
    'X-Robots-Tag': 'noindex, nofollow',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store, max-age=0',
  },
};
```

## 📋 운영 체크리스트

### 개발 환경 체크리스트
- [ ] 개발 브랜치 생성 (develop)
- [ ] Vercel 프로젝트 연결
- [ ] 환경 변수 설정
- [ ] 자동 배포 설정
- [ ] 개발자 도구 활성화

### 스테이징 환경 체크리스트
- [ ] 스테이징 브랜치 생성 (staging)
- [ ] Basic Auth 설정
- [ ] 테스트 자동화 구성
- [ ] 모니터링 설정
- [ ] 성능 테스트 도구 연동

### 운영 환경 체크리스트
- [ ] 도메인 연결
- [ ] SSL 인증서 확인
- [ ] 보안 헤더 설정
- [ ] 모니터링 및 알림
- [ ] 백업 정책 수립

### 관리자 환경 체크리스트
- [ ] 별도 프로젝트 생성
- [ ] 접근 권한 설정
- [ ] 관리자 인증 구현
- [ ] 로그 및 감사 추적
- [ ] 비상 연락망 구성

## 🚀 마이그레이션 가이드

### 기존 프로젝트에서 멀티 환경으로 전환
```bash
# 1. 기존 프로젝트 백업
git checkout -b backup/before-multi-env

# 2. 환경별 브랜치 생성
git checkout -b develop
git checkout -b staging
git checkout -b admin

# 3. Vercel 프로젝트 분리
vercel link --project tarot-app-dev
vercel link --project tarot-app-staging
vercel link --project tarot-app-admin

# 4. 환경 변수 마이그레이션
vercel env pull
# 각 환경별로 환경 변수 재설정

# 5. 배포 테스트
vercel --env development
vercel --env staging
vercel --prod
```

## 💡 Best Practices

1. **환경 분리 원칙**
   - 각 환경은 독립적으로 운영
   - 환경 간 데이터 공유 최소화
   - 환경별 권한 엄격히 관리

2. **배포 전략**
   - Development: 자동 배포 (모든 커밋)
   - Staging: 자동 배포 (PR 머지 시)
   - Production: 수동 승인 후 배포
   - Admin: 별도 승인 프로세스

3. **모니터링**
   - 환경별 대시보드 구성
   - 에러 추적 도구 연동
   - 성능 메트릭 수집

4. **보안**
   - 환경별 접근 제어
   - 시크릿 관리 철저
   - 정기적 보안 점검

이 가이드를 통해 Vercel에서 안전하고 효율적인 멀티 환경을 구성할 수 있습니다.