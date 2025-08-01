# 📚 SoulCard.app 문서 가이드

## 📋 문서 구조 개요

모든 문서가 카테고리별로 체계적으로 정리되어 있습니다.

```
docs/
├── 📋 project-status/     - 프로젝트 현황 및 진행상황
├── 🚀 deployment/         - 배포 및 환경 설정
├── 🎨 branding/           - 브랜딩 및 마케팅 전략
├── 🏗️ technical-architecture/ - 시스템 아키텍처
├── 🎨 ui-design/          - UI/UX 디자인 가이드
├── 🎴 tarot-data/         - 타로카드 데이터 및 해석
├── 🔧 development-guide/  - 개발 가이드
├── 📊 reports/            - 기획서 및 제안서
├── 🗺️ roadmap/           - 로드맵 및 계획
├── 💰 payment/           - 결제 시스템
├── 🏗️ infrastructure/    - 인프라 및 호스팅
└── 🌏 up/               - 고급 분석 (한국어)
```

---

## 🚀 빠른 시작 가이드

### 🆕 새로 참여하는 개발자
1. [`project-status/PROJECT_STATUS_20250801.md`](./project-status/PROJECT_STATUS_20250801.md) - **현재 프로젝트 상황 파악**
2. [`development-guide/Quick_Start_Guide.md`](./development-guide/Quick_Start_Guide.md) - 빠른 시작 가이드
3. [`deployment/DEPLOYMENT.md`](./deployment/DEPLOYMENT.md) - 배포 환경 설정

### 🔧 배포 담당자
1. [`deployment/DOMAIN_SETUP_GUIDE.md`](./deployment/DOMAIN_SETUP_GUIDE.md) - **soulcard.app 도메인 설정**
2. [`infrastructure/vercel_multi_environment_guide.md`](./infrastructure/vercel_multi_environment_guide.md) - Vercel 멀티 환경 구성
3. [`deployment/DEPLOYMENT.md`](./deployment/DEPLOYMENT.md) - 배포 프로세스

---

## 📁 카테고리별 문서 목록

### 📋 프로젝트 현황 (`project-status/`)
- **[`PROJECT_STATUS_20250801.md`](./project-status/PROJECT_STATUS_20250801.md)** ⭐ - **2025.08.01 현재 상황 종합 보고서**
- [`11_Development_Progress_Log.md`](./project-status/11_Development_Progress_Log.md) - 개발 진행 로그
- [`13_Phase1_Completion_Report.md`](./project-status/13_Phase1_Completion_Report.md) - 1단계 완료 보고서
- [`14_Phase2_Completion_Report.md`](./project-status/14_Phase2_Completion_Report.md) - 2단계 완료 보고서
- [`14_Phase3.1_Completion_Report.md`](./project-status/14_Phase3.1_Completion_Report.md) - 3.1단계 완료 보고서

### 🚀 배포 및 환경 설정 (`deployment/`)
- **[`DEPLOYMENT.md`](./deployment/DEPLOYMENT.md)** ⭐ - **SoulCard.app 배포 가이드**
- **[`DOMAIN_SETUP_GUIDE.md`](./deployment/DOMAIN_SETUP_GUIDE.md)** ⭐ - **도메인 설정 완전 가이드**
- [`01_App_Store_Deployment_Guide.md`](./deployment/01_App_Store_Deployment_Guide.md) - 앱스토어 배포 가이드
- [`10_Development_Setup_Guide.md`](./deployment/10_Development_Setup_Guide.md) - 개발 환경 설정

### 🎨 브랜딩 및 마케팅 (`branding/`)
- **[`BRANDING_GUIDE.md`](./branding/BRANDING_GUIDE.md)** ⭐ - **SoulCard 브랜딩 전략**
- [`19_Market_Analysis_Based_Upgrade_Strategy.md`](./branding/19_Market_Analysis_Based_Upgrade_Strategy.md) - 시장 분석 기반 전략
- [`tarotcafe-analysis.md`](./branding/tarotcafe-analysis.md) - 경쟁사 분석

### 🏗️ 기술 아키텍처 (`technical-architecture/`)
- [`15_System_Architecture_v2.0.md`](./technical-architecture/15_System_Architecture_v2.0.md) - 시스템 아키텍처 v2.0
- [`16_API_WebSocket_Documentation.md`](./technical-architecture/16_API_WebSocket_Documentation.md) - API/WebSocket 문서
- [`17_Realtime_Analysis_Technical_Docs.md`](./technical-architecture/17_Realtime_Analysis_Technical_Docs.md) - 실시간 분석 기술
- [`09_Technical_Architecture.md`](./technical-architecture/09_Technical_Architecture.md) - 기술 아키텍처
- [`ml-learning-implementation-plan.md`](./technical-architecture/ml-learning-implementation-plan.md) - ML 구현 계획

### 🎨 UI/UX 디자인 (`ui-design/`)
- [`Text_Wireframe_All_Pages.md`](./ui-design/Text_Wireframe_All_Pages.md) - 전체 페이지 와이어프레임
- [`Frontend_Backend_UI_Layout_Guide.md`](./ui-design/Frontend_Backend_UI_Layout_Guide.md) - UI 레이아웃 가이드
- [`08_Web_Interface_Guide.md`](./ui-design/08_Web_Interface_Guide.md) - 웹 인터페이스 가이드
- [`20_User_Card_Selection_System.md`](./ui-design/20_User_Card_Selection_System.md) - 사용자 카드 선택 시스템
- [`Card_Selection_Implementation_Summary.md`](./ui-design/Card_Selection_Implementation_Summary.md) - 카드 선택 구현 요약
- [`user-waiting-experience-improvements.md`](./ui-design/user-waiting-experience-improvements.md) - 사용자 대기 경험 개선

### 🎴 타로카드 데이터 (`tarot-data/`)
- [`03_Tarot_Cards_Reference_Guide.md`](./tarot-data/03_Tarot_Cards_Reference_Guide.md) - 타로카드 참조 가이드
- [`06_Tarot_Interpretation_Database.md`](./tarot-data/06_Tarot_Interpretation_Database.md) - 타로 해석 데이터베이스
- [`07_Complete_Tarot_Interpretation_Database.md`](./tarot-data/07_Complete_Tarot_Interpretation_Database.md) - 완전 타로 해석 DB
- [`04_Midjourney_Prompts_Minor_Arcana.md`](./tarot-data/04_Midjourney_Prompts_Minor_Arcana.md) - 소아르카나 이미지 프롬프트
- [`05_Midjourney_Prompts_Major_Arcana.md`](./tarot-data/05_Midjourney_Prompts_Major_Arcana.md) - 대아르카나 이미지 프롬프트

### 🔧 개발 가이드 (`development-guide/`)
- [`Quick_Start_Guide.md`](./development-guide/Quick_Start_Guide.md) - 빠른 시작 가이드
- [`02_MVP_Development_Guide.md`](./development-guide/02_MVP_Development_Guide.md) - MVP 개발 가이드

### 📊 기획서 및 제안서 (`reports/`)
- [`00_AI_Tarot_App_Proposal.md`](./reports/00_AI_Tarot_App_Proposal.md) - AI 타로 앱 제안서
- [`12_Advanced_Enhancement_Proposal.md`](./reports/12_Advanced_Enhancement_Proposal.md) - 고급 기능 제안서
- [`18_Upgrade_Strategy_v2.0+.md`](./reports/18_Upgrade_Strategy_v2.0+.md) - 업그레이드 전략

### 🗺️ 로드맵 (`roadmap/`)
- [`2025_2026_complete_roadmap.md`](./roadmap/2025_2026_complete_roadmap.md) - 2025-2026 완전 로드맵

### 💰 결제 시스템 (`payment/`)
- [`in_app_purchase_guide.md`](./payment/in_app_purchase_guide.md) - 인앱결제 구현 가이드

### 🏗️ 인프라 및 호스팅 (`infrastructure/`)
- [`vercel_multi_environment_guide.md`](./infrastructure/vercel_multi_environment_guide.md) - Vercel 멀티 환경 구성
- [`dev_prod_environment_architecture.md`](./infrastructure/dev_prod_environment_architecture.md) - 개발/운영 환경 아키텍처
- [`web_hosting_services_guide.md`](./infrastructure/web_hosting_services_guide.md) - 웹 호스팅 서비스 가이드

### 🌏 고급 분석 (`up/`)
- [`tarot_app_complete_structure.md`](./up/tarot_app_complete_structure.md) - 타로 앱 완전 구조
- [`고급 타로 스프레드 분석.md`](./up/고급%20타로%20스프레드%20분석.md) - 고급 타로 스프레드 분석
- [`안드로이드 타로 앱 시장 보고서.md`](./up/안드로이드%20타로%20앱%20시장%20보고서.md) - 안드로이드 시장 보고서
- [`타로 컨텐츠 모듈 분석 보고서.md`](./up/타로%20컨텐츠%20모듈%20분석%20보고서.md) - 타로 콘텐츠 모듈 분석
- [`backend_admin_system_part1.md`](./up/backend_admin_system_part1.md) - 백엔드 관리 시스템 1부
- [`backend_admin_system_part2.md`](./up/backend_admin_system_part2.md) - 백엔드 관리 시스템 2부

---

## 🎯 역할별 추천 문서

### 👨‍💻 **개발자 (Developer)**
```yaml
필수 문서:
1. project-status/PROJECT_STATUS_20250801.md - 현재 상황 파악
2. deployment/DEPLOYMENT.md - 배포 환경 설정
3. technical-architecture/15_System_Architecture_v2.0.md - 시스템 구조
4. development-guide/Quick_Start_Guide.md - 빠른 시작

참고 문서:
- technical-architecture/16_API_WebSocket_Documentation.md
- infrastructure/vercel_multi_environment_guide.md
```

### 📊 **기획자/PM (Product Manager)**
```yaml
필수 문서:
1. project-status/PROJECT_STATUS_20250801.md - 현재 프로젝트 상황
2. roadmap/2025_2026_complete_roadmap.md - 전체 로드맵
3. branding/BRANDING_GUIDE.md - 브랜딩 전략
4. reports/00_AI_Tarot_App_Proposal.md - 초기 제안서

참고 문서:
- branding/19_Market_Analysis_Based_Upgrade_Strategy.md
- project-status/13_Phase1_Completion_Report.md
```

### 🎨 **디자이너 (Designer)**
```yaml
필수 문서:
1. branding/BRANDING_GUIDE.md - 브랜딩 가이드라인
2. ui-design/Text_Wireframe_All_Pages.md - UI 와이어프레임
3. tarot-data/04_Midjourney_Prompts_Major_Arcana.md - 카드 디자인 프롬프트
4. ui-design/Frontend_Backend_UI_Layout_Guide.md - UI 레이아웃

참고 문서:
- ui-design/20_User_Card_Selection_System.md
- tarot-data/05_Midjourney_Prompts_Minor_Arcana.md
```

### 💼 **비즈니스 (Business)**
```yaml
필수 문서:
1. project-status/PROJECT_STATUS_20250801.md - 비즈니스 현황
2. branding/BRANDING_GUIDE.md - 브랜드 전략
3. payment/in_app_purchase_guide.md - 수익 모델
4. deployment/01_App_Store_Deployment_Guide.md - 출시 계획

참고 문서:
- branding/19_Market_Analysis_Based_Upgrade_Strategy.md
- up/안드로이드 타로 앱 시장 보고서.md
```

### 🚀 **DevOps/배포 담당자**
```yaml
필수 문서:
1. deployment/DOMAIN_SETUP_GUIDE.md - 도메인 설정
2. deployment/DEPLOYMENT.md - 배포 프로세스
3. infrastructure/vercel_multi_environment_guide.md - 환경 구성
4. infrastructure/dev_prod_environment_architecture.md - 인프라 구조

참고 문서:
- infrastructure/web_hosting_services_guide.md
```

---

## 📈 문서 현황

- **총 문서 수**: 40개+
- **카테고리 수**: 11개
- **완성도**: 95% ✅
- **최종 업데이트**: 2025.08.01

---

## 🔍 빠른 검색

**현재 상황 파악**: `project-status/PROJECT_STATUS_20250801.md`  
**배포 방법**: `deployment/DEPLOYMENT.md`  
**도메인 설정**: `deployment/DOMAIN_SETUP_GUIDE.md`  
**브랜딩 가이드**: `branding/BRANDING_GUIDE.md`  
**시스템 구조**: `technical-architecture/15_System_Architecture_v2.0.md`  
**UI 디자인**: `ui-design/Text_Wireframe_All_Pages.md`  

---

**🌟 SoulCard.app - 체계적으로 정리된 완전한 문서 시스템** ✨