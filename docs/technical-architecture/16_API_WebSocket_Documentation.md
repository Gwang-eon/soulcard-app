# 📡 API & WebSocket 엔드포인트 문서

## 📋 문서 정보
**작성일**: 2025년 7월 29일  
**API 버전**: v2.0  
**베이스 URL**: `http://localhost:3000`

---

## 🔗 **REST API 엔드포인트**

### **1. 시스템 상태 확인**
```http
GET /api/status
```

**응답 예시:**
```json
{
  "status": "ok",
  "initialized": true,
  "stats": {
    "totalCards": 78,
    "majorArcana": 22,
    "minorArcana": 56,
    "loadedCombinations": 150,
    "lastUpdated": "2025-07-29T10:30:00Z"
  }
}
```

**응답 코드:**
- `200`: 정상 작동
- `500`: 서버 오류

---

### **2. 단일 카드 리딩**
```http
POST /api/reading/single
```

**요청 본문:**
```json
{
  "question": "오늘 나에게 필요한 조언은 무엇인가요?",
  "category": "general"  // optional: general, love, career, money, health, spiritual
}
```

**응답 예시:**
```json
{
  "id": "reading_1722247800123",
  "type": "single",
  "question": "오늘 나에게 필요한 조언은 무엇인가요?",
  "category": "general",
  "cards": [
    {
      "card": {
        "id": 0,
        "name": "The Fool",
        "koreanName": "바보",
        "suit": "major",
        "element": null,
        "uprightKeywords": ["새로운 시작", "모험", "순수함"],
        "reversedKeywords": ["경솔함", "무모함", "방향성 상실"]
      },
      "position": "present",
      "orientation": "upright"
    }
  ],
  "interpretation": "새로운 시작의 에너지가...",
  "advice": "지금은 새로운 도전을...",
  "createdAt": "2025-07-29T10:30:00.123Z",
  "cardDisplay": {
    "ascii": "┌─────────────┐\n│     🃏      │\n│  The Fool   │\n│     0       │\n└─────────────┘",
    "colors": ["#FFD700", "#87CEEB"]
  }
}
```

**응답 코드:**
- `200`: 성공
- `400`: 잘못된 요청 (질문 유효성 검사 실패)
- `500`: 서버 오류

---

### **3. 3카드 스프레드**
```http
POST /api/reading/three-card
```

**요청 본문:**
```json
{
  "question": "내 연애 상황은 어떻게 될까요?",
  "category": "love",
  "spreadType": "past_present_future"  // optional: situation_action_outcome
}
```

**응답 예시:**
```json
{
  "id": "reading_1722247800456",
  "type": "three-card",
  "spreadType": "past_present_future",
  "question": "내 연애 상황은 어떻게 될까요?",
  "category": "love",
  "cards": [
    {
      "card": { /* TarotCard 객체 */ },
      "position": "past",
      "orientation": "upright"
    },
    {
      "card": { /* TarotCard 객체 */ },
      "position": "present", 
      "orientation": "reversed"
    },
    {
      "card": { /* TarotCard 객체 */ },
      "position": "future",
      "orientation": "upright"
    }
  ],
  "interpretation": {
    "past": "과거에는...",
    "present": "현재 상황은...",
    "future": "미래에는...",
    "overall": "전체적으로..."
  },
  "advice": "종합적인 조언...",
  "createdAt": "2025-07-29T10:30:00.456Z"
}
```

---

### **4. 관계 상담 리딩**
```http
POST /api/reading/relationship
```

**요청 본문:**
```json
{
  "question": "우리 관계의 문제점과 해결책은 무엇인가요?"
}
```

**응답 예시:**
```json
{
  "id": "reading_1722247800789",
  "type": "relationship",
  "question": "우리 관계의 문제점과 해결책은 무엇인가요?",
  "cards": [
    /* 5장의 카드 배열 */
  ],
  "interpretation": {
    "yourFeelings": "당신의 감정...",
    "theirFeelings": "상대방의 감정...",
    "currentSituation": "현재 상황...",
    "challenges": "해결해야 할 과제...",
    "outcome": "관계의 전망..."
  },
  "advice": "관계 개선을 위한 구체적 조언...",
  "createdAt": "2025-07-29T10:30:00.789Z"
}
```

---

### **5. 켈틱 크로스**
```http
POST /api/reading/celtic-cross
```

**요청 본문:**
```json
{
  "question": "내 인생의 방향성에 대해 알고 싶습니다",
  "category": "general"
}
```

**응답 예시:**
```json
{
  "id": "reading_1722247801012",
  "type": "celtic-cross",
  "question": "내 인생의 방향성에 대해 알고 싶습니다",
  "category": "general",
  "cards": [
    /* 10장의 카드 배열 */
  ],
  "interpretation": {
    "presentSituation": "현재 상황...",
    "challenge": "도전 과제...",
    "distantPast": "원인...",
    "recentPast": "최근 상황...",
    "possibleOutcome": "가능한 결과...",
    "nearFuture": "가까운 미래...",
    "yourApproach": "당신의 접근법...",
    "externalInfluences": "외부 영향...",
    "hopesAndFears": "희망과 두려움...",
    "finalOutcome": "최종 결과..."
  },
  "advice": "인생 방향성에 대한 종합 조언...",
  "createdAt": "2025-07-29T10:30:01.012Z"
}
```

---

### **6. 질문 분석**
```http
POST /api/analyze-question
```

**요청 본문:**
```json
{
  "question": "내일 면접에서 좋은 결과를 얻을 수 있을까요?"
}
```

**응답 예시:**
```json
{
  "isValid": true,
  "analysis": {
    "category": "career",
    "confidence": 0.95,
    "intent": "future_prediction",
    "emotion": "anxious",
    "urgency": "high",
    "specificity": "specific",
    "keywords": ["면접", "결과", "성공"],
    "suggestedSpread": "three-card",
    "recommendations": [
      "구체적인 질문이 좋은 결과를 가져올 것입니다",
      "3카드 스프레드가 적합합니다"
    ]
  }
}
```

**실패 응답 (400):**
```json
{
  "error": "유효하지 않은 질문입니다",
  "message": "질문이 너무 짧거나 의미가 불분명합니다",
  "isValid": false,
  "suggestions": [
    "구체적인 상황을 설명해주세요",
    "감정이나 고민을 포함해서 질문해주세요"
  ]
}
```

---

## 🔌 **WebSocket 이벤트**

### **연결 설정**
```javascript
const socket = io('http://localhost:3000');
```

### **1. 세션 시작**
**클라이언트 → 서버:**
```javascript
socket.emit('session:start', {
  userContext: {
    sessionId: 'user_session_123',
    userProfile: {
      preferredLanguage: 'ko',
      experienceLevel: 'beginner'
    },
    deviceInfo: {
      type: 'desktop',
      browser: 'chrome'
    }
  },
  initialState: {
    timestamp: Date.now()
  }
});
```

**서버 → 클라이언트:**
```javascript
socket.on('session_initialized', (response) => {
  console.log(response);
  // {
  //   type: 'session_initialized',
  //   data: {
  //     sessionId: 'session_1722247801345_abc123def',
  //     sessionState: { /* 세션 상태 */ },
  //     realtimeFeatures: {
  //       typingAnalysis: true,
  //       emotionDetection: true,
  //       questionPrediction: true,
  //       instantFeedback: true
  //     }
  //   },
  //   timestamp: 1722247801345,
  //   sessionId: 'session_1722247801345_abc123def'
  // }
});
```

---

### **2. 타이핑 이벤트**
**클라이언트 → 서버:**
```javascript
socket.emit('typing:event', {
  events: [
    {
      type: 'keydown',
      key: 'a',
      timestamp: Date.now(),
      location: 0
    },
    {
      type: 'keyup', 
      key: 'a',
      timestamp: Date.now() + 50,
      location: 0
    }
  ],
  partialText: "안녕하세요",
  timestamp: Date.now()
});
```

**서버 → 클라이언트:**
```javascript
socket.on('question_prediction', (response) => {
  console.log(response);
  // {
  //   type: 'question_predicted',
  //   data: {
  //     predictedIntent: 'love_advice',
  //     confidence: 0.85,
  //     suggestedCompletion: "안녕하세요, 연애 관련 고민이 있습니다",
  //     emotionalState: 'nervous'
  //   },
  //   timestamp: 1722247801567,
  //   sessionId: 'session_123'
  // }
});
```

---

### **3. 질문 업데이트**
**클라이언트 → 서버:**
```javascript
socket.emit('question:update', {
  partialQuestion: "오늘 나에게 필요한 조언은",
  isComplete: false,
  timestamp: Date.now()
});
```

---

### **4. 사용자 활동**
**클라이언트 → 서버:**
```javascript
socket.emit('activity:update', {
  activity: {
    activityType: 'scroll',
    timestamp: Date.now(),
    duration: 2000,
    data: {
      scrollPosition: 150,
      direction: 'down'
    },
    engagement: {
      focus: 0.8,
      interaction: 1.0,
      duration: 2000
    }
  },
  context: {
    page: 'main',
    section: 'question_input'
  }
});
```

---

### **5. 실시간 피드백**
**클라이언트 → 서버:**
```javascript
socket.emit('feedback:realtime', {
  feedback: {
    type: 'satisfaction',
    value: 4,
    timestamp: Date.now(),
    context: 'card_interpretation'
  },
  immediate: true
});
```

**서버 → 클라이언트:**
```javascript
socket.on('personalized_response', (response) => {
  console.log(response);
  // {
  //   type: 'immediate_support',
  //   data: {
  //     message: "더 나은 도움을 드리고 싶어요. 어떤 부분이 아쉬우셨나요?",
  //     supportOptions: [
  //       "다른 방식으로 설명해주세요",
  //       "더 간단하게 알려주세요", 
  //       "다른 카드를 보여주세요"
  //     ]
  //   },
  //   timestamp: 1722247801789,
  //   sessionId: 'session_123'
  // }
});
```

---

### **6. 세션 종료**
**클라이언트 → 서버:**
```javascript
socket.emit('session:end', {
  reason: 'completion',  // 'completion' | 'abandonment' | 'timeout'
  finalState: {
    questionsAsked: 1,
    readingsCompleted: 1,
    totalTime: 180000
  }
});
```

**서버 → 클라이언트:**
```javascript
socket.on('session_completed', (response) => {
  console.log(response);
  // {
  //   type: 'session_summary',
  //   data: {
  //     summary: {
  //       duration: 180000,
  //       questionsAsked: 1,
  //       emotionalJourney: { /* 감정 여정 데이터 */ },
  //       finalEngagement: { attention: 0.85, satisfaction: 0.9 }
  //     },
  //     reason: 'completion',
  //     insights: [
  //       "매우 집중해서 리딩에 참여해주셨어요",
  //       "충분한 시간을 들여서 깊이 있게 탐구하셨습니다"
  //     ],
  //     recommendations: [
  //       "규칙적인 리딩이 자기 이해에 도움이 됩니다"
  //     ]
  //   },
  //   timestamp: 1722247801999,
  //   sessionId: 'session_123'
  // }
});
```

---

## 🔔 **실시간 이벤트 (서버 → 클라이언트)**

### **실시간 업데이트**
```javascript
socket.on('realtime_update', (data) => {
  switch(data.type) {
    case 'session_started':
      console.log('세션이 시작되었습니다', data.data);
      break;
      
    case 'typing_analyzed':
      console.log('타이핑 분석 결과:', data.data.analysis);
      console.log('감정 지표:', data.data.emotion);
      break;
      
    case 'question_predicted':
      console.log('질문 예측:', data.data);
      break;
      
    case 'emotional_shift':
      console.log('감정 변화 감지:', data.data.shift);
      break;
      
    case 'drop_off_risk':
      console.log('이탈 위험 감지, 개입 방법:', data.data.interventions);
      break;
  }
});
```

### **인사이트 브로드캐스트**
```javascript
socket.on('insight', (response) => {
  console.log('새로운 인사이트:', response.data);
  // 중요한 깨달음이나 패턴이 발견되었을 때
});
```

### **시스템 조정**
```javascript
socket.on('system_adjustment', (response) => {
  console.log('시스템 조정:', response.data);
  // AI가 사용자에게 맞춰 분석 방식을 조정했을 때
});
```

---

## ⚠️ **에러 처리**

### **WebSocket 에러**
```javascript
socket.on('error', (error) => {
  console.error('WebSocket 에러:', error);
  // {
  //   message: '세션 시작 실패',
  //   error: 'Invalid user context provided'
  // }
});
```

### **연결 해제**
```javascript
socket.on('disconnect', (reason) => {
  console.log('연결 해제:', reason);
  // 'transport close', 'client namespace disconnect', etc.
});
```

---

## 🔧 **개발자 도구**

### **디버깅 모드**
```javascript
// 개발 환경에서 상세 로그 활성화
localStorage.setItem('debug', 'socket.io-client:*');
```

### **연결 상태 확인**
```javascript
console.log('연결 상태:', socket.connected);
console.log('소켓 ID:', socket.id);
```

### **이벤트 리스너 확인**
```javascript
console.log('등록된 이벤트:', socket.eventNames());
```

---

## 📊 **성능 고려사항**

### **요청 빈도 제한**
- **타이핑 이벤트**: 최대 100ms 간격으로 배칭
- **질문 업데이트**: 500ms 디바운스
- **활동 추적**: 1초 간격

### **메모리 관리**
- **세션 데이터**: 24시간 후 자동 정리
- **이벤트 히스토리**: 최근 1000개 이벤트만 유지
- **WebSocket 연결**: 유휴 30분 후 자동 해제

---

## 🚀 **사용 예시**

### **완전한 WebSocket 클라이언트**
```javascript
class TarotWebSocketClient {
  constructor() {
    this.socket = io('http://localhost:3000');
    this.setupEventHandlers();
  }
  
  setupEventHandlers() {
    // 세션 초기화
    this.socket.on('session_initialized', (response) => {
      this.sessionId = response.sessionId;
      console.log('세션 시작됨:', this.sessionId);
    });
    
    // 실시간 분석 결과 처리
    this.socket.on('realtime_update', (data) => {
      this.handleRealtimeUpdate(data);
    });
    
    // 개인화된 응답 처리
    this.socket.on('personalized_response', (response) => {
      this.showPersonalizedMessage(response.data);
    });
  }
  
  startSession(userProfile) {
    this.socket.emit('session:start', {
      userContext: { userProfile },
      initialState: { timestamp: Date.now() }
    });
  }
  
  sendTypingEvent(events, partialText) {
    this.socket.emit('typing:event', {
      events,
      partialText,
      timestamp: Date.now()
    });
  }
  
  handleRealtimeUpdate(data) {
    // UI 업데이트 로직
    switch(data.type) {
      case 'typing_analyzed':
        this.updateTypingIndicator(data.data);
        break;
      case 'emotional_shift':
        this.showEmotionalIndicator(data.data);
        break;
    }
  }
}

// 사용법
const client = new TarotWebSocketClient();
client.startSession({ experienceLevel: 'beginner' });
```

---

**📝 작성자**: Claude (AI Assistant)  
**🔄 업데이트**: API 변경사항 시마다  
**📧 문의**: 개발팀 또는 AI Assistant

---

*이 문서는 AI 타로카드 앱의 모든 API 및 WebSocket 엔드포인트를 상세히 설명합니다.*