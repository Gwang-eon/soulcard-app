# 🌐 웹 인터페이스 가이드

AI 타로카드 앱의 웹 인터페이스 구현 및 사용 가이드

## 📋 목차

1. [웹 서버 구조](#웹-서버-구조)
2. [API 엔드포인트](#api-엔드포인트)
3. [프론트엔드 구현](#프론트엔드-구현)
4. [실행 방법](#실행-방법)
5. [사용법](#사용법)

## 🏗️ 웹 서버 구조

### 서버 파일: `server/app.ts`

Express.js 기반의 RESTful API 서버

```typescript
// 주요 구성 요소
- Express 서버 설정
- CORS 지원
- JSON 파싱
- 정적 파일 서빙
- 타로 리딩 API 엔드포인트
```

### 디렉토리 구조

```
card/
├── server/
│   └── app.ts              # 웹 서버 메인 파일
├── public/
│   └── index.html          # 웹 인터페이스
├── utils/
│   └── cardRenderer.ts     # 카드 표시 유틸리티
└── services/
    └── tarotReading.ts     # 리딩 서비스
```

## 🔌 API 엔드포인트

### 1. 상태 확인
```
GET /api/status
```
**응답:**
```json
{
  "status": "ok",
  "initialized": true,
  "stats": {
    "totalCards": 7,
    "completionRate": "9.0%",
    "majorArcana": 5,
    "minorArcana": 2
  }
}
```

### 2. 단일 카드 리딩
```
POST /api/reading/single
```
**요청:**
```json
{
  "question": "오늘의 운세는?",
  "category": "general"
}
```

**응답:**
```json
{
  "id": "uuid",
  "question": "오늘의 운세는?",
  "category": "general",
  "cards": [...],
  "interpretation": "해석 내용",
  "cardDisplay": {
    "id": 22,
    "name": "Ace of Wands",
    "koreanName": "완드 에이스",
    "displayInfo": {
      "suitSymbol": "🔥",
      "orientationSymbol": "⬆️",
      "backgroundColor": "#EF4444"
    }
  },
  "createdAt": "2025-07-28T13:55:00.000Z"
}
```

### 3. 3카드 스프레드
```
POST /api/reading/three-card
```
**요청:**
```json
{
  "question": "내 연애운은?",
  "category": "love",
  "spreadType": "past_present_future"
}
```

### 4. 관계 상담 (5카드)
```
POST /api/reading/relationship
```
**요청:**
```json
{
  "question": "이 사람과의 관계는?"
}
```

### 5. 켈틱 크로스 (10카드)
```
POST /api/reading/celtic-cross
```
**요청:**
```json
{
  "question": "내 인생의 방향은?",
  "category": "general"
}
```

### 6. 질문 분석
```
POST /api/analyze-question
```
**요청:**
```json
{
  "question": "사랑에 대한 고민이 있어요"
}
```

**응답:**
```json
{
  "suggestedCategory": "love",
  "suggestedSpread": "relationship",
  "keywords": ["사랑", "고민"],
  "emotion": "anxious",
  "urgency": "medium"
}
```

## 🎨 프론트엔드 구현

### HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- 메타 정보 및 스타일 -->
</head>
<body>
    <div class="container">
        <div class="header">...</div>
        <div class="status-bar">...</div>
        <div class="main-content">
            <div class="question-panel">...</div>
            <div class="results-panel">...</div>
        </div>
    </div>
</body>
</html>
```

### CSS 디자인 특징

1. **그라데이션 배경**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
2. **반응형 디자인**: 모바일 친화적 레이아웃
3. **카드 애니메이션**: 호버 효과 및 회전 애니메이션
4. **수트별 색상**:
   - 메이저: `#8B5CF6` (보라색)
   - 완드: `#EF4444` (빨간색)
   - 컵: `#3B82F6` (파란색)
   - 소드: `#6B7280` (회색)
   - 펜타클: `#10B981` (초록색)

### JavaScript 기능

1. **상태 관리**: 서버 초기화 상태 추적
2. **API 통신**: Fetch API를 이용한 비동기 통신
3. **동적 렌더링**: 카드 결과를 동적으로 표시
4. **사용자 경험**: 로딩 상태, 에러 처리

## 🚀 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 웹 서버 실행
```bash
npm run web
```

### 3. 브라우저 접속
```
http://localhost:3000
```

### 4. 다른 실행 옵션들
```bash
# 개발 모드 (콘솔)
npm run dev

# 데모 실행 (콘솔)
npm run demo

# 빌드
npm run build

# 테스트
npm test
```

## 💻 사용법

### 1. 기본 사용 과정

1. **웹 브라우저 열기**: `http://localhost:3000` 접속
2. **상태 확인**: 초기화 완료 메시지 확인
3. **질문 입력**: 질문 텍스트 영역에 질문 작성
4. **카테고리 선택**: 드롭다운에서 적절한 카테고리 선택
5. **리딩 방식 선택**: 4가지 버튼 중 하나 클릭
6. **결과 확인**: 카드와 해석 내용 확인

### 2. 리딩 방식별 특징

#### 🌟 단일 카드
- **용도**: 간단한 질문, 오늘의 운세
- **카드 수**: 1장
- **적합한 질문**: "오늘 하루는?", "이 결정은?"

#### 📚 3카드 스프레드
- **용도**: 과거-현재-미래 흐름 파악
- **카드 수**: 3장
- **적합한 질문**: "내 연애는 어떻게 될까?", "이 상황의 진행은?"

#### 💕 관계 상담
- **용도**: 인간관계 전문 상담
- **카드 수**: 5장 (당신-상대방-관계현재-도전과제-미래)
- **적합한 질문**: "이 사람과의 관계는?", "연인과의 미래는?"

#### ✨ 켈틱 크로스
- **용도**: 복합적이고 심도 있는 상담
- **카드 수**: 10장
- **적합한 질문**: "내 인생의 방향은?", "중요한 결정을 내려야 할 때"

### 3. 질문 분석 기능

**"질문 분석하기"** 버튼을 클릭하면:
- AI가 질문을 분석하여 최적의 카테고리 추천
- 적합한 스프레드 방식 제안
- 질문자의 감정 상태 파악
- 긴급도 측정
- 핵심 키워드 추출

## 🎯 카드 표시 시스템

### 카드 디자인 요소

```css
.tarot-card {
    width: 150px;
    height: 250px;
    border-radius: 12px;
    /* 수트별 배경색 자동 적용 */
}
```

### 카드 정보 표시

1. **카드 번호**: 좌상단
2. **방향 표시**: 우상단 (⬆️ 정방향, 🔄 역방향)
3. **한글 이름**: 중앙 상단
4. **영문 이름**: 중앙 하단
5. **수트 심볼**: 우하단 (🌟🔥💧⚔️🪙)

### 역방향 카드 표시

```css
.tarot-card.reversed {
    transform: rotate(180deg);
}
```

## 🔧 커스터마이징

### 1. 새로운 API 엔드포인트 추가

```typescript
// server/app.ts에 추가
app.post('/api/reading/custom', async (req, res) => {
  // 커스텀 리딩 로직
});
```

### 2. 프론트엔드 기능 확장

```javascript
// public/index.html의 script 태그 내부에 추가
async function customReading() {
  // 새로운 리딩 기능
}
```

### 3. 스타일 수정

```css
/* public/index.html의 style 태그 내부에 추가 */
.custom-card {
  /* 커스텀 카드 스타일 */
}
```

## 📱 모바일 최적화

### 반응형 브레이크포인트

```css
@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr; /* 세로 배치 */
    }
    
    .tarot-card {
        width: 120px;
        height: 200px; /* 작은 화면용 크기 */
    }
}
```

### 터치 친화적 버튼

```css
.btn {
    min-height: 44px; /* iOS 터치 가이드라인 */
    font-size: 16px; /* 확대 방지 */
}
```

## 🚨 에러 처리

### 서버 측 에러

```typescript
try {
  const reading = await tarotReading.performSingleCardReading(question, category);
  res.json(reading);
} catch (error) {
  res.status(500).json({ 
    error: '리딩 실행 중 오류가 발생했습니다', 
    details: error 
  });
}
```

### 클라이언트 측 에러

```javascript
try {
  const response = await fetch('/api/reading/single', {...});
  const reading = await response.json();
  displayReading(reading);
} catch (error) {
  document.getElementById('results').innerHTML = `
    <div class="loading">
      <i class="fas fa-exclamation-triangle"></i>
      <p>오류가 발생했습니다: ${error.message}</p>
    </div>
  `;
}
```

## 🔮 실행 결과 예시

웹 서버 실행 시 콘솔 출력:
```
🌐 타로 카드 웹 앱이 http://localhost:3000 에서 실행 중입니다
🔮 데이터 초기화 중...
🔮 타로 앱 서버 초기화 완료
✨ 모든 준비 완료! 브라우저에서 확인해보세요
```

브라우저에서 확인할 수 있는 내용:
- 🎨 아름다운 그라데이션 배경의 웹 인터페이스
- 🔮 실시간 상태 표시 바
- 📝 직관적인 질문 입력 폼
- 🎯 4가지 리딩 방식 버튼
- 🃏 시각적인 타로 카드 표시
- 📜 상세한 해석 결과

---

**🌐 이제 브라우저에서 `http://localhost:3000`에 접속하여 아름다운 웹 인터페이스를 통해 AI 타로 카드를 경험할 수 있습니다! 🔮**