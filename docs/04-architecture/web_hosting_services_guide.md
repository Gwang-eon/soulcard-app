# 🌐 타로카드 서비스 웹 호스팅 가이드

## 📋 목차
1. [호스팅 서비스 개요](#호스팅-서비스-개요)
2. [클라우드 서비스 옵션](#클라우드-서비스-옵션)
3. [AWS 구성 방법](#aws-구성-방법)
4. [Google Cloud Platform](#google-cloud-platform)
5. [Microsoft Azure](#microsoft-azure)
6. [기타 호스팅 옵션](#기타-호스팅-옵션)
7. [비용 비교 및 선택 가이드](#비용-비교-및-선택-가이드)
8. [보안 및 최적화](#보안-및-최적화)

## 🏗️ 호스팅 서비스 개요

### 호스팅 유형별 비교
| 구분 | 장점 | 단점 | 적합한 경우 |
|------|------|------|------------|
| **클라우드 호스팅** | 확장성, 유연성, 관리형 서비스 | 초기 학습 곡선, 비용 예측 어려움 | 성장 가능성이 큰 서비스 |
| **VPS 호스팅** | 가격 대비 성능, 루트 권한 | 직접 관리 필요, 제한된 확장성 | 중소규모 서비스 |
| **전용 서버** | 완전한 제어, 높은 성능 | 높은 비용, 관리 부담 | 대규모 서비스 |
| **PaaS** | 간편한 배포, 자동 관리 | 제한된 커스터마이징 | MVP, 프로토타입 |

### 타로카드 서비스 요구사항
```yaml
서비스 요구사항:
  트래픽:
    - 예상 DAU: 10,000명
    - 피크 시간 동시 접속: 1,000명
    - 월간 페이지뷰: 500만
  
  기술 스택:
    - Frontend: React (정적 파일)
    - Backend: Python/FastAPI
    - Database: PostgreSQL
    - Cache: Redis
    - Storage: 이미지 및 파일 저장소
  
  특수 요구사항:
    - WebSocket (실시간 상담)
    - AI 모델 서빙
    - 이미지 처리
    - 자동 스케일링
```

## ☁️ 클라우드 서비스 옵션

### 주요 클라우드 제공업체 비교
| 제공업체            | 장점                    | 단점         | 주요 서비스                                    |
| --------------- | --------------------- | ---------- | ----------------------------------------- |
| **AWS**         | 가장 많은 서비스, 성숙한 생태계    | 복잡한 가격 구조  | EC2, RDS, S3, CloudFront                  |
| **GCP**         | 강력한 AI/ML 서비스, 합리적 가격 | 작은 커뮤니티    | Compute Engine, Cloud SQL, Cloud Storage  |
| **Azure**       | MS 생태계 통합, 하이브리드 클라우드 | 학습 곡선      | Virtual Machines, Azure SQL, Blob Storage |
| **Naver Cloud** | 국내 서비스, 한국어 지원        | 제한된 글로벌 리전 | Server, Database, Object Storage          |

## 🔶 AWS 구성 방법

### 1. 기본 아키텍처
```
┌─────────────────────────────────────────────────────┐
│                   Route 53 (DNS)                    │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                CloudFront (CDN)                     │
└──────┬──────────────────────────────┬───────────────┘
       │                              │
       ▼                              ▼
┌─────────────┐              ┌───────────────────────┐
│  S3 Bucket  │              │   ALB (Load Balancer) │
│  (Frontend) │              └──────────┬────────────┘
└─────────────┘                         │
                               ┌────────▼────────┐
                               │   EC2 Instances │
                               │  (Auto Scaling) │
                               └────────┬────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                   ┌─────▼─────┐              ┌───────▼──────┐
                   │    RDS     │              │  ElastiCache │
                   │(PostgreSQL)│              │   (Redis)    │
                   └───────────┘              └──────────────┘
```

### 2. AWS 서비스 구성 단계

#### Step 1: VPC 설정
```bash
# VPC 생성
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=tarot-vpc}]'

# 서브넷 생성 (Multi-AZ)
# Public Subnet (Web Server)
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24 --availability-zone ap-northeast-2a
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.2.0/24 --availability-zone ap-northeast-2c

# Private Subnet (Database)
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.10.0/24 --availability-zone ap-northeast-2a
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.20.0/24 --availability-zone ap-northeast-2c
```

#### Step 2: EC2 인스턴스 설정
```yaml
# terraform/ec2.tf
resource "aws_instance" "web_server" {
  ami           = "ami-0c76973fbe0ee100c"  # Amazon Linux 2
  instance_type = "t3.medium"
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  subnet_id              = aws_subnet.public_subnet.id
  
  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker
    service docker start
    usermod -a -G docker ec2-user
    
    # Docker Compose 설치
    curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # 애플리케이션 배포
    docker-compose up -d
  EOF
  
  tags = {
    Name = "tarot-web-server"
  }
}

# Auto Scaling Group
resource "aws_launch_template" "web_template" {
  name_prefix   = "tarot-web-"
  image_id      = "ami-0c76973fbe0ee100c"
  instance_type = "t3.medium"
  
  user_data = base64encode(file("user-data.sh"))
}

resource "aws_autoscaling_group" "web_asg" {
  min_size             = 2
  max_size             = 10
  desired_capacity     = 3
  
  launch_template {
    id      = aws_launch_template.web_template.id
    version = "$Latest"
  }
  
  vpc_zone_identifier = [
    aws_subnet.public_subnet_a.id,
    aws_subnet.public_subnet_c.id
  ]
  
  target_group_arns = [aws_lb_target_group.web_tg.arn]
  
  tag {
    key                 = "Name"
    value               = "tarot-web-asg"
    propagate_at_launch = true
  }
}
```

#### Step 3: RDS 데이터베이스 설정
```yaml
# terraform/rds.tf
resource "aws_db_instance" "tarot_db" {
  identifier     = "tarot-postgres"
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.medium"
  
  allocated_storage     = 100
  storage_type          = "gp3"
  storage_encrypted     = true
  
  db_name  = "tarot_production"
  username = "tarot_admin"
  password = var.db_password  # AWS Secrets Manager 사용 권장
  
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  multi_az               = true
  deletion_protection    = true
  
  tags = {
    Name = "tarot-production-db"
  }
}

# Read Replica 생성
resource "aws_db_instance" "tarot_db_replica" {
  replicate_source_db = aws_db_instance.tarot_db.identifier
  instance_class      = "db.t3.small"
  
  tags = {
    Name = "tarot-db-replica"
  }
}
```

#### Step 4: S3 및 CloudFront 설정
```yaml
# terraform/s3_cloudfront.tf
resource "aws_s3_bucket" "frontend" {
  bucket = "tarot-app-frontend"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  
  index_document {
    suffix = "index.html"
  }
  
  error_document {
    key = "error.html"
  }
}

resource "aws_cloudfront_distribution" "frontend_cdn" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.id}"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.id}"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }
  
  price_class = "PriceClass_200"
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

### 3. AWS 비용 예상
```yaml
월간 예상 비용 (서울 리전):
  EC2:
    - t3.medium (3대): $125
    - 데이터 전송: $50
  
  RDS:
    - db.t3.medium (Multi-AZ): $150
    - 스토리지 100GB: $25
    - 백업: $10
  
  ElastiCache:
    - cache.t3.micro: $25
  
  S3 & CloudFront:
    - 스토리지 50GB: $2
    - CDN 전송 1TB: $120
  
  기타:
    - Route 53: $1
    - ALB: $25
    - CloudWatch: $10
  
  총 예상 비용: $543/월
```

## 🔷 Google Cloud Platform

### 1. GCP 아키텍처
```
┌─────────────────────────────────────────────────────┐
│                Cloud DNS                            │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                Cloud CDN                            │
└──────┬──────────────────────────────┬───────────────┘
       │                              │
       ▼                              ▼
┌─────────────┐              ┌───────────────────────┐
│Cloud Storage│              │  Load Balancer        │
│  (Frontend) │              └──────────┬────────────┘
└─────────────┘                         │
                               ┌────────▼────────┐
                               │ Compute Engine  │
                               │   (MIG)         │
                               └────────┬────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                   ┌─────▼─────┐              ┌───────▼──────┐
                   │ Cloud SQL  │              │  Memorystore │
                   │(PostgreSQL)│              │   (Redis)    │
                   └───────────┘              └──────────────┘
```

### 2. GCP 구성 스크립트
```bash
# 프로젝트 생성 및 설정
gcloud projects create tarot-app-prod
gcloud config set project tarot-app-prod

# VPC 네트워크 생성
gcloud compute networks create tarot-vpc \
    --subnet-mode=custom \
    --bgp-routing-mode=regional

# 서브넷 생성
gcloud compute networks subnets create tarot-subnet \
    --network=tarot-vpc \
    --region=asia-northeast3 \
    --range=10.0.0.0/24

# Compute Engine 인스턴스 템플릿
gcloud compute instance-templates create tarot-template \
    --machine-type=e2-medium \
    --image-family=debian-11 \
    --image-project=debian-cloud \
    --boot-disk-size=20GB \
    --network=tarot-vpc \
    --subnet=tarot-subnet \
    --tags=http-server,https-server \
    --metadata-from-file startup-script=startup.sh

# Managed Instance Group
gcloud compute instance-groups managed create tarot-mig \
    --template=tarot-template \
    --size=3 \
    --zone=asia-northeast3-a

# Cloud SQL 인스턴스
gcloud sql instances create tarot-db \
    --database-version=POSTGRES_15 \
    --tier=db-n1-standard-2 \
    --region=asia-northeast3 \
    --network=tarot-vpc \
    --availability-type=regional \
    --backup \
    --backup-start-time=03:00
```

### 3. GCP Terraform 구성
```hcl
# terraform/gcp_main.tf
provider "google" {
  project = "tarot-app-prod"
  region  = "asia-northeast3"
}

# Cloud Run (서버리스 옵션)
resource "google_cloud_run_service" "tarot_api" {
  name     = "tarot-api"
  location = "asia-northeast3"
  
  template {
    spec {
      containers {
        image = "gcr.io/tarot-app-prod/tarot-api:latest"
        
        resources {
          limits = {
            cpu    = "2"
            memory = "2Gi"
          }
        }
        
        env {
          name  = "DATABASE_URL"
          value = google_sql_database_instance.postgres.connection_name
        }
      }
    }
    
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "100"
        "autoscaling.knative.dev/minScale" = "1"
      }
    }
  }
}

# Cloud SQL
resource "google_sql_database_instance" "postgres" {
  name             = "tarot-postgres"
  database_version = "POSTGRES_15"
  region           = "asia-northeast3"
  
  settings {
    tier = "db-g1-small"
    
    database_flags {
      name  = "max_connections"
      value = "200"
    }
    
    backup_configuration {
      enabled    = true
      start_time = "03:00"
    }
    
    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc.id
    }
  }
  
  deletion_protection = true
}
```

## 🔵 Microsoft Azure

### 1. Azure 아키텍처
```
┌─────────────────────────────────────────────────────┐
│                Azure DNS                            │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                Azure CDN                            │
└──────┬──────────────────────────────┬───────────────┘
       │                              │
       ▼                              ▼
┌─────────────┐              ┌───────────────────────┐
│ Blob Storage│              │  Application Gateway  │
│  (Frontend) │              └──────────┬────────────┘
└─────────────┘                         │
                               ┌────────▼────────┐
                               │   VM Scale Set  │
                               └────────┬────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                   ┌─────▼─────┐              ┌───────▼──────┐
                   │Azure DB for│              │ Azure Cache  │
                   │ PostgreSQL │              │  for Redis   │
                   └───────────┘              └──────────────┘
```

### 2. Azure CLI 구성
```bash
# 리소스 그룹 생성
az group create --name tarot-rg --location koreacentral

# Virtual Network 생성
az network vnet create \
    --resource-group tarot-rg \
    --name tarot-vnet \
    --address-prefix 10.0.0.0/16 \
    --subnet-name tarot-subnet \
    --subnet-prefix 10.0.1.0/24

# VM Scale Set 생성
az vmss create \
    --resource-group tarot-rg \
    --name tarot-vmss \
    --image UbuntuLTS \
    --vm-sku Standard_B2s \
    --instance-count 3 \
    --vnet-name tarot-vnet \
    --subnet tarot-subnet \
    --public-ip-per-vm \
    --load-balancer tarot-lb \
    --custom-data cloud-init.yaml

# Azure Database for PostgreSQL
az postgres flexible-server create \
    --resource-group tarot-rg \
    --name tarot-postgres \
    --location koreacentral \
    --sku-name Standard_B2s \
    --tier Burstable \
    --version 15 \
    --storage-size 128 \
    --backup-retention 7 \
    --zone 1 \
    --high-availability Enabled

# Azure Cache for Redis
az redis create \
    --resource-group tarot-rg \
    --name tarot-redis \
    --location koreacentral \
    --sku Basic \
    --vm-size c0
```

## 🌍 기타 호스팅 옵션

### 1. Vercel (Frontend)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "react",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://api.tarot-app.com/api/$1"
    }
  ],
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
        }
      ]
    }
  ]
}
```

### 2. Heroku (간단한 배포)
```yaml
# heroku.yml
build:
  docker:
    web: Dockerfile
    
release:
  command:
    - python manage.py migrate
  image: web
  
run:
  web: gunicorn app:app --bind 0.0.0.0:$PORT
  worker: celery -A app worker
```

### 3. DigitalOcean App Platform
```yaml
# .do/app.yaml
name: tarot-app
region: sgp
services:
  - name: web
    dockerfile_path: Dockerfile
    source_dir: /
    http_port: 8000
    instance_count: 2
    instance_size_slug: professional-xs
    routes:
      - path: /
    envs:
      - key: DATABASE_URL
        scope: RUN_TIME
        value: ${db.DATABASE_URL}
        
databases:
  - name: db
    engine: PG
    version: "15"
    size: db-s-1vcpu-1gb
    num_nodes: 1
```

### 4. Naver Cloud Platform
```bash
# NCP CLI 설정
ncloud configure

# 서버 생성
ncloud server create \
    --server-image-product-code SPSW0LINUX000032 \
    --server-product-code SVR.VSVR.STAND.C002.M008.NET.SSD.B050.G002 \
    --server-name tarot-web-01 \
    --zone KR-1

# Load Balancer 생성
ncloud loadbalancer create \
    --load-balancer-name tarot-lb \
    --load-balancer-algorithm-type RR \
    --load-balancer-type NETWORK \
    --subnet-no-list 12345
```

## 💰 비용 비교 및 선택 가이드

### 월간 비용 비교 (중급 규모 기준)
| 서비스 | 예상 비용 | 장점 | 단점 |
|--------|-----------|------|------|
| **AWS** | $500-600 | 가장 많은 기능, 성숙한 생태계 | 복잡한 가격 구조 |
| **GCP** | $450-550 | 우수한 가격, 강력한 AI 서비스 | 작은 커뮤니티 |
| **Azure** | $480-580 | 기업 친화적, 하이브리드 클라우드 | 초기 설정 복잡 |
| **NCP** | $400-500 | 국내 지원, 간단한 가격 | 글로벌 확장 제한 |
| **DigitalOcean** | $300-400 | 간단한 구성, 투명한 가격 | 제한된 서비스 |
| **Heroku** | $250-350 | 매우 간단한 배포 | 비싼 단가, 제한사항 |

### 선택 기준
```yaml
스타트업 초기 (MVP):
  추천: Heroku, Vercel + Supabase
  이유: 빠른 개발과 배포, 낮은 초기 비용
  
성장 단계:
  추천: AWS Lightsail, DigitalOcean
  이유: 합리적인 가격, 충분한 기능
  
확장 단계:
  추천: AWS, GCP
  이유: 무제한 확장성, 다양한 서비스
  
국내 중심 서비스:
  추천: NCP, AWS (서울 리전)
  이유: 낮은 레이턴시, 한국어 지원
```

## 🔒 보안 및 최적화

### 1. 보안 체크리스트
```yaml
네트워크 보안:
  - [ ] VPC 및 서브넷 분리
  - [ ] Security Group 최소 권한
  - [ ] WAF 설정
  - [ ] DDoS 방어
  
애플리케이션 보안:
  - [ ] HTTPS 강제
  - [ ] 보안 헤더 설정
  - [ ] API Rate Limiting
  - [ ] 입력 검증
  
데이터 보안:
  - [ ] 저장 시 암호화
  - [ ] 전송 시 암호화
  - [ ] 백업 암호화
  - [ ] 접근 로깅
  
인증/권한:
  - [ ] MFA 설정
  - [ ] IAM 역할 분리
  - [ ] 최소 권한 원칙
  - [ ] 정기적 권한 검토
```

### 2. 성능 최적화
```yaml
프론트엔드:
  - CDN 활용
  - 이미지 최적화 (WebP, 지연 로딩)
  - 코드 스플리팅
  - 브라우저 캐싱
  
백엔드:
  - 데이터베이스 인덱싱
  - 쿼리 최적화
  - Redis 캐싱
  - Connection Pooling
  
인프라:
  - Auto Scaling 설정
  - Load Balancer 헬스체크
  - 모니터링 및 알림
  - 정기적 성능 테스트
```

### 3. 모니터링 설정
```bash
# CloudWatch (AWS) 알람 설정
aws cloudwatch put-metric-alarm \
    --alarm-name cpu-high \
    --alarm-description "CPU utilization over 80%" \
    --metric-name CPUUtilization \
    --namespace AWS/EC2 \
    --statistic Average \
    --period 300 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 2

# Datadog 설치 (범용)
DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

## 📋 구축 체크리스트

### Phase 1: 초기 설정
- [ ] 클라우드 계정 생성
- [ ] 결제 방법 등록
- [ ] 비용 알림 설정
- [ ] IAM 사용자 생성
- [ ] MFA 활성화

### Phase 2: 네트워크 구성
- [ ] VPC 생성
- [ ] 서브넷 구성 (Public/Private)
- [ ] Internet Gateway 설정
- [ ] NAT Gateway 설정
- [ ] Security Group 규칙

### Phase 3: 컴퓨팅 리소스
- [ ] EC2/VM 인스턴스 생성
- [ ] Auto Scaling 설정
- [ ] Load Balancer 구성
- [ ] 헬스체크 설정
- [ ] SSL 인증서 적용

### Phase 4: 데이터베이스
- [ ] RDS/Cloud SQL 생성
- [ ] 백업 정책 설정
- [ ] Read Replica 구성
- [ ] 모니터링 설정
- [ ] 파라미터 튜닝

### Phase 5: 스토리지 및 CDN
- [ ] S3/Cloud Storage 버킷 생성
- [ ] 버킷 정책 설정
- [ ] CloudFront/CDN 구성
- [ ] 도메인 연결
- [ ] 캐싱 정책 설정

### Phase 6: 배포 및 운영
- [ ] CI/CD 파이프라인 구축
- [ ] 모니터링 대시보드 설정
- [ ] 로그 수집 설정
- [ ] 알림 규칙 설정
- [ ] 재해 복구 계획

## 🎯 결론

타로카드 서비스의 웹 호스팅 선택 시 고려사항:

1. **초기 단계**: Heroku나 Vercel 같은 PaaS로 빠르게 시작
2. **성장 단계**: AWS나 GCP로 이전하여 확장성 확보
3. **최적화**: CDN, 캐싱, Auto-scaling으로 성능 개선
4. **보안**: 철저한 보안 설정과 정기적인 점검
5. **비용 관리**: 사용량 모니터링과 최적화로 비용 절감

각 단계별로 적절한 호스팅 서비스를 선택하고, 서비스 성장에 따라 유연하게 확장할 수 있는 구조를 구축하는 것이 중요합니다.