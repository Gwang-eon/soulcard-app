# 🚀 타로카드 서비스 개발/운영 환경 분리 아키텍처

## 📋 목차
1. [환경 구성 개요](#환경-구성-개요)
2. [개발 환경 (Development)](#개발-환경-development)
3. [스테이징 환경 (Staging)](#스테이징-환경-staging)
4. [운영 환경 (Production)](#운영-환경-production)
5. [배포 파이프라인](#배포-파이프라인)
6. [환경별 설정 관리](#환경별-설정-관리)
7. [모니터링 및 로깅](#모니터링-및-로깅)

## 🏗️ 환경 구성 개요

### 전체 인프라 구조
```
┌─────────────────────────────────────────────────────────────┐
│                      Git Repository                         │
│                    (GitHub/GitLab)                         │
└─────────────────┬───────────────┬──────────────┬──────────┘
                  │               │              │
                  ▼               ▼              ▼
┌─────────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Development       │ │    Staging        │ │   Production      │
│   Environment       │ │   Environment     │ │   Environment     │
├─────────────────────┤ ├──────────────────┤ ├──────────────────┤
│ • Feature 개발      │ │ • 통합 테스트     │ │ • 실 서비스       │
│ • Unit Testing      │ │ • UAT 환경        │ │ • 고가용성        │
│ • Local DB          │ │ • Prod-like DB    │ │ • 클러스터링      │
│ • Mock Services     │ │ • 성능 테스트     │ │ • Auto-scaling    │
└─────────────────────┘ └──────────────────┘ └──────────────────┘
```

### 환경별 주요 특징
| 환경 | 목적 | 접근 권한 | 데이터 | 배포 방식 |
|------|------|-----------|--------|-----------|
| Development | 기능 개발 및 테스트 | 개발팀 전체 | 테스트 데이터 | 자동 (Push 시) |
| Staging | 운영 환경 시뮬레이션 | 개발팀 + QA | 운영 유사 데이터 | 수동 승인 |
| Production | 실제 서비스 운영 | 제한적 접근 | 실 데이터 | 승인 후 배포 |

## 💻 개발 환경 (Development)

### 개발 서버 구성
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  # Frontend 개발 서버
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - REACT_APP_API_URL=http://localhost:8000
      - REACT_APP_ENV=development
    command: npm run dev

  # Backend API 서버
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      - ENV=development
      - DATABASE_URL=postgresql://dev:dev@db:5432/tarot_dev
      - REDIS_URL=redis://redis:6379
      - DEBUG=True
    depends_on:
      - db
      - redis

  # 개발용 데이터베이스
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=tarot_dev
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=dev
    volumes:
      - dev_postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # 캐시 서버
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # 개발용 관리자 도구
  adminer:
    image: adminer
    ports:
      - "8080:8080"

volumes:
  dev_postgres_data:
```

### 개발 환경 특징
- **Hot Reload**: 코드 변경 시 자동 재시작
- **Debug Mode**: 상세한 에러 메시지 및 스택 트레이스
- **Mock Services**: 외부 API 모킹 (결제, SMS 등)
- **Test Data**: Seed 데이터 자동 생성
- **개발자 도구**: Swagger UI, GraphQL Playground

### 개발 워크플로우
```mermaid
graph LR
    A[Feature Branch] --> B[Local Development]
    B --> C[Unit Tests]
    C --> D[Integration Tests]
    D --> E[Code Review]
    E --> F[Merge to Develop]
    F --> G[Deploy to Dev Server]
```

## 🧪 스테이징 환경 (Staging)

### 스테이징 서버 구성
```yaml
# kubernetes/staging/deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tarot-app-staging
  namespace: staging
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tarot-app
      env: staging
  template:
    metadata:
      labels:
        app: tarot-app
        env: staging
    spec:
      containers:
      - name: frontend
        image: tarot-app/frontend:staging-latest
        ports:
        - containerPort: 80
        env:
        - name: REACT_APP_ENV
          value: "staging"
        - name: REACT_APP_API_URL
          value: "https://api-staging.tarot-app.com"
        
      - name: backend
        image: tarot-app/backend:staging-latest
        ports:
        - containerPort: 8000
        env:
        - name: ENV
          value: "staging"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: staging-secrets
              key: database-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
```

### 스테이징 환경 특징
- **운영 환경 미러링**: 동일한 인프라 구성
- **성능 테스트**: 부하 테스트 및 스트레스 테스트
- **통합 테스트**: E2E 테스트 자동화
- **UAT 환경**: 사용자 승인 테스트
- **보안 스캔**: 취약점 점검

## 🚀 운영 환경 (Production)

### 운영 서버 구성
```yaml
# kubernetes/production/deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tarot-app-production
  namespace: production
spec:
  replicas: 5  # Auto-scaling 설정
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: tarot-app
      env: production
  template:
    metadata:
      labels:
        app: tarot-app
        env: production
    spec:
      containers:
      - name: frontend
        image: tarot-app/frontend:v1.2.3
        ports:
        - containerPort: 80
        env:
        - name: REACT_APP_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        
      - name: backend
        image: tarot-app/backend:v1.2.3
        ports:
        - containerPort: 8000
        env:
        - name: ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: production-secrets
              key: database-url
        resources:
          requests:
            memory: "1Gi"
            cpu: "1000m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 8000
          initialDelaySeconds: 45
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 5
```

### 운영 환경 인프라
```
┌─────────────────────────────────────────────────┐
│                   CDN (CloudFlare)              │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              Load Balancer (AWS ALB)            │
└─────────┬───────────────────────┬───────────────┘
          │                       │
┌─────────▼──────────┐  ┌────────▼───────────┐
│   Web Server       │  │   Web Server       │
│   (Nginx)          │  │   (Nginx)          │
├────────────────────┤  ├────────────────────┤
│   App Server       │  │   App Server       │
│   (Gunicorn)       │  │   (Gunicorn)      │
└─────────┬──────────┘  └────────┬───────────┘
          │                       │
          └───────────┬───────────┘
                      │
        ┌─────────────▼──────────────┐
        │     Database Cluster       │
        │   (PostgreSQL Primary)     │
        │            │               │
        │    ┌───────┴────────┐     │
        │    │   Replica 1    │     │
        │    └────────────────┘     │
        │    ┌────────────────┐     │
        │    │   Replica 2    │     │
        │    └────────────────┘     │
        └────────────────────────────┘
```

### 운영 환경 특징
- **고가용성**: Multi-AZ 배포, Auto-scaling
- **보안**: WAF, DDoS 방어, SSL/TLS
- **백업**: 자동 백업 및 재해 복구
- **모니터링**: 24/7 모니터링 및 알림
- **성능**: CDN, 캐싱, 최적화

## 🔄 배포 파이프라인

### CI/CD 파이프라인
```yaml
# .github/workflows/deploy.yml
name: Deploy Pipeline

on:
  push:
    branches:
      - develop
      - staging
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Tests
        run: |
          npm test
          npm run test:e2e
      
      - name: Security Scan
        run: |
          npm audit
          docker scan .

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker Image
        run: |
          docker build -t tarot-app:${{ github.sha }} .
          
      - name: Push to Registry
        run: |
          docker push tarot-app:${{ github.sha }}

  deploy-dev:
    if: github.ref == 'refs/heads/develop'
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Development
        run: |
          kubectl set image deployment/tarot-app \
            tarot-app=tarot-app:${{ github.sha }} \
            -n development

  deploy-staging:
    if: github.ref == 'refs/heads/staging'
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        run: |
          kubectl set image deployment/tarot-app \
            tarot-app=tarot-app:${{ github.sha }} \
            -n staging

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        run: |
          kubectl set image deployment/tarot-app \
            tarot-app=tarot-app:${{ github.sha }} \
            -n production
```

### 배포 프로세스
```mermaid
graph TD
    A[Code Push] --> B{Branch?}
    B -->|develop| C[Dev Deploy]
    B -->|staging| D[Staging Deploy]
    B -->|main| E[Production Deploy]
    
    C --> F[Automated Tests]
    D --> G[Manual Approval]
    E --> H[Production Checks]
    
    G --> I[Performance Tests]
    H --> J[Canary Deploy]
    J --> K[Full Deploy]
```

## ⚙️ 환경별 설정 관리

### 설정 파일 구조
```
config/
├── base.py          # 공통 설정
├── development.py   # 개발 환경
├── staging.py       # 스테이징 환경
└── production.py    # 운영 환경
```

### 환경 변수 관리
```python
# config/base.py
import os
from dotenv import load_dotenv

class BaseConfig:
    # 공통 설정
    APP_NAME = "Tarot Master"
    API_VERSION = "v1"
    
    # 환경별 오버라이드 가능
    DEBUG = False
    TESTING = False
    
    # 데이터베이스
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    # Redis
    REDIS_URL = os.getenv('REDIS_URL')
    
    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_EXPIRATION_DELTA = 3600  # 1 hour
    
    # AWS
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_REGION = os.getenv('AWS_REGION', 'ap-northeast-2')

# config/development.py
class DevelopmentConfig(BaseConfig):
    DEBUG = True
    DATABASE_URL = "postgresql://dev:dev@localhost:5432/tarot_dev"
    REDIS_URL = "redis://localhost:6379/0"
    
    # 개발용 Mock 설정
    USE_MOCK_PAYMENT = True
    USE_MOCK_SMS = True

# config/production.py
class ProductionConfig(BaseConfig):
    DEBUG = False
    
    # 운영 환경 보안 설정
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    
    # 성능 최적화
    CACHE_TYPE = "RedisCache"
    CACHE_DEFAULT_TIMEOUT = 300
```

### Kubernetes ConfigMap/Secret
```yaml
# kubernetes/base/configmap.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tarot-app-config
data:
  APP_NAME: "Tarot Master"
  API_VERSION: "v1"
  LOG_LEVEL: "INFO"

---
# kubernetes/production/secrets.yml
apiVersion: v1
kind: Secret
metadata:
  name: production-secrets
type: Opaque
data:
  database-url: <base64-encoded-value>
  jwt-secret: <base64-encoded-value>
  aws-access-key: <base64-encoded-value>
  aws-secret-key: <base64-encoded-value>
```

## 📊 모니터링 및 로깅

### 모니터링 스택
```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3001:3000"

  elasticsearch:
    image: elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
    volumes:
      - es_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"

  kibana:
    image: kibana:8.8.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"

  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "14268:14268"

volumes:
  prometheus_data:
  grafana_data:
  es_data:
```

### 로깅 전략
```python
# logging_config.py
import logging
import json
from pythonjsonlogger import jsonlogger

def setup_logging(env):
    log_level = logging.DEBUG if env == 'development' else logging.INFO
    
    # JSON 포맷터 설정
    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(
        fmt='%(asctime)s %(name)s %(levelname)s %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    logHandler.setFormatter(formatter)
    
    # 루트 로거 설정
    logger = logging.getLogger()
    logger.addHandler(logHandler)
    logger.setLevel(log_level)
    
    # 환경별 추가 설정
    if env == 'production':
        # CloudWatch 로그 전송
        import watchtower
        logger.addHandler(watchtower.CloudWatchLogHandler())
    
    return logger
```

### 알림 설정
```yaml
# alerting-rules.yml
groups:
  - name: tarot-app-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 5% for 5 minutes"
      
      - alert: DatabaseDown
        expr: up{job="postgresql"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Database is down"
      
      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"
```

## 🔒 보안 고려사항

### 환경별 보안 설정
```nginx
# nginx/production.conf
server {
    listen 443 ssl http2;
    server_name api.tarot-app.com;
    
    # SSL 설정
    ssl_certificate /etc/ssl/certs/tarot-app.crt;
    ssl_certificate_key /etc/ssl/private/tarot-app.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # 보안 헤더
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
    
    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 시크릿 관리
```bash
# AWS Secrets Manager 사용 예시
aws secretsmanager create-secret \
    --name tarot-app/production/database \
    --secret-string '{"username":"tarot_user","password":"secure_password","host":"db.tarot-app.com"}'

# Kubernetes에서 시크릿 사용
kubectl create secret generic production-db \
    --from-literal=username=$(aws secretsmanager get-secret-value --secret-id tarot-app/production/database --query SecretString --output text | jq -r .username) \
    --from-literal=password=$(aws secretsmanager get-secret-value --secret-id tarot-app/production/database --query SecretString --output text | jq -r .password)
```

## 📈 성능 최적화

### 환경별 최적화 전략
| 환경 | 최적화 포커스 | 구현 방법 |
|------|--------------|-----------|
| Development | 빠른 개발 속도 | Hot reload, 최소 캐싱 |
| Staging | 운영 환경 시뮬레이션 | 운영과 동일한 설정 |
| Production | 최대 성능 | CDN, 캐싱, 압축, 최적화 |

### 운영 환경 최적화
```python
# production_optimizations.py
from functools import lru_cache
import redis
from flask_caching import Cache

# Redis 캐싱 설정
cache = Cache(config={
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': os.getenv('REDIS_URL'),
    'CACHE_DEFAULT_TIMEOUT': 300
})

# 데이터베이스 쿼리 최적화
@cache.memoize(timeout=3600)
def get_tarot_cards():
    return db.session.query(TarotCard).all()

# API 응답 캐싱
@app.route('/api/daily-card')
@cache.cached(timeout=3600, key_prefix='daily_card')
def get_daily_card():
    return generate_daily_card()
```

## 🚦 Health Check

### 헬스체크 엔드포인트
```python
# health_check.py
from flask import Blueprint, jsonify
import psycopg2
import redis

health_bp = Blueprint('health', __name__)

@health_bp.route('/health')
def health_check():
    """기본 헬스체크"""
    return jsonify({"status": "healthy"}), 200

@health_bp.route('/ready')
def readiness_check():
    """서비스 준비 상태 체크"""
    checks = {
        "database": check_database(),
        "redis": check_redis(),
        "storage": check_storage()
    }
    
    if all(checks.values()):
        return jsonify({"status": "ready", "checks": checks}), 200
    else:
        return jsonify({"status": "not ready", "checks": checks}), 503

def check_database():
    try:
        db.session.execute('SELECT 1')
        return True
    except:
        return False

def check_redis():
    try:
        r = redis.from_url(os.getenv('REDIS_URL'))
        r.ping()
        return True
    except:
        return False
```

## 📝 결론

이러한 개발/운영 환경 분리 구조를 통해:

1. **안정성**: 운영 환경에 영향 없이 개발 및 테스트 가능
2. **효율성**: 각 환경에 최적화된 설정으로 성능 극대화
3. **보안성**: 환경별 접근 제어 및 시크릿 관리
4. **확장성**: 필요에 따라 환경 추가 및 스케일링 가능
5. **자동화**: CI/CD 파이프라인을 통한 안전한 배포

이 구조는 타로카드 서비스가 성장함에 따라 유연하게 확장 가능하며, 안정적인 서비스 운영을 보장합니다.