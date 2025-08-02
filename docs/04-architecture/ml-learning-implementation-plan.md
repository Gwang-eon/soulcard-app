# 머신러닝 학습 시스템 구현 계획

## 📋 현재 상황 분석

### 기존 구조
- ✅ **하이브리드 엔진**: ML 패턴 분석 + xAI 생성 결합
- ✅ **학습 데이터 수집**: `storeLearningData()` 함수 구현됨
- ✅ **피드백 시스템**: `updateFromFeedback()` 준비됨
- ✅ **패턴 분석기**: `PatternAnalyzer` 클래스 (현재 룰 기반)

### 현재 한계점
- 🔴 **패턴 분석**: 룰 기반 → 실제 ML 모델 필요
- 🔴 **학습 데이터**: 수집만 함 → 실제 훈련 필요
- 🔴 **모델 업데이트**: 100개마다 예약 → 실제 재훈련 로직 필요

## 🎯 단계별 구현 계획

### **Phase 1: 데이터 수집 및 전처리 (1-2주)**

#### 1.1 학습 데이터 구조 최적화
```javascript
const learningEntry = {
  // 입력 데이터
  input: {
    cards: [{ name: '마법사', isReversed: false, position: 0 }],
    question: '새로운 시작이 가능할까요?',
    questionVector: [0,0,1,0,0,0,0,0,0,0], // 키워드 벡터화
    spread: '단일카드',
    category: 'career',
    cardVector: [0,1,0,0,0...], // 78차원 원-핫 벡터
    contextFeatures: {
      timeOfDay: 'morning',
      season: 'spring',
      userHistory: {...}
    }
  },
  
  // 출력 데이터
  output: {
    interpretation: '마법사 카드가 나왔네요...',
    predictedQuality: 0.92,
    actualLength: 2450,
    keyThemes: ['시작', '의지력', '창조'],
    emotionalTone: 'encouraging',
    userSatisfaction: null // 피드백 대기
  },
  
  // 피드백 데이터 (사후 수집)
  feedback: {
    satisfaction: 4.2, // 1-5 점수
    accuracy: 4.0,
    naturalness: 4.5,
    usefulness: 3.8,
    actualReadTime: 180, // 초
    userRetention: true
  },
  
  timestamp: 1753896133149,
  sessionId: 'web_1753896133149'
};
```

#### 1.2 데이터베이스 설계
```sql
-- 학습 데이터 테이블
CREATE TABLE ml_training_data (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255),
  cards_vector JSON,
  question_vector JSON,
  context_features JSON,
  output_features JSON,
  feedback_scores JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 모델 성능 추적
CREATE TABLE model_performance (
  id SERIAL PRIMARY KEY,
  model_version VARCHAR(50),
  accuracy_score FLOAT,
  user_satisfaction FLOAT,
  training_samples INTEGER,
  created_at TIMESTAMP
);
```

### **Phase 2: ML 모델 개발 (2-3주)**

#### 2.1 품질 예측 모델
**목표**: 카드 조합 + 질문 → 해석 품질 예측

```python
# 모델 아키텍처
class TarotQualityPredictor(nn.Module):
    def __init__(self):
        super().__init__()
        # 카드 임베딩 (78장 카드 + 역방향)
        self.card_embedding = nn.Embedding(156, 64)
        
        # 질문 벡터 처리
        self.question_encoder = nn.Linear(10, 32)
        
        # 컨텍스트 처리
        self.context_encoder = nn.Linear(20, 16)
        
        # 융합 레이어
        self.fusion = nn.Sequential(
            nn.Linear(64 + 32 + 16, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
    
    def forward(self, cards, question, context):
        card_emb = self.card_embedding(cards).mean(dim=1)
        question_emb = self.question_encoder(question)
        context_emb = self.context_encoder(context)
        
        combined = torch.cat([card_emb, question_emb, context_emb], dim=1)
        quality_score = self.fusion(combined)
        return quality_score
```

#### 2.2 감정 톤 분류 모델
```python
class EmotionalToneClassifier(nn.Module):
    def __init__(self, num_classes=4):  # encouraging, supportive, neutral, cautious
        super().__init__()
        self.feature_encoder = nn.Linear(112, 64)  # 같은 입력 차원
        self.classifier = nn.Sequential(
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, num_classes),
            nn.Softmax(dim=1)
        )
    
    def forward(self, features):
        encoded = self.feature_encoder(features)
        tone_probs = self.classifier(encoded)
        return tone_probs
```

#### 2.3 추천 길이 회귀 모델
```python
class InterpretationLengthPredictor(nn.Module):
    def __init__(self):
        super().__init__()
        self.regressor = nn.Sequential(
            nn.Linear(112, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
    
    def forward(self, features):
        length = self.regressor(features)
        return torch.clamp(length, 1000, 5000)  # 1000-5000자 제한
```

### **Phase 3: 실시간 학습 시스템 (1-2주)**

#### 3.1 온라인 학습 파이프라인
```javascript
class MLLearningPipeline {
  constructor() {
    this.modelUpdateThreshold = 50; // 50개 피드백마다 업데이트
    this.minDatasetSize = 200; // 최소 학습 데이터
    this.modelVersions = new Map();
  }

  async collectTrainingBatch() {
    // 피드백이 있는 최신 데이터 수집
    const trainData = await this.database.getUnprocessedData();
    
    if (trainData.length >= this.modelUpdateThreshold) {
      await this.triggerModelUpdate(trainData);
    }
  }

  async triggerModelUpdate(data) {
    console.log(`🔄 모델 업데이트 시작: ${data.length}개 샘플`);
    
    // 1. 데이터 전처리
    const processedData = this.preprocessData(data);
    
    // 2. 모델 훈련 (Python 스크립트 호출)
    const modelPath = await this.trainModel(processedData);
    
    // 3. 모델 검증
    const performance = await this.validateModel(modelPath);
    
    // 4. 성능이 좋으면 프로덕션 배포
    if (performance.accuracy > 0.85) {
      await this.deployModel(modelPath);
      console.log(`✅ 모델 업데이트 완료: 정확도 ${performance.accuracy}`);
    }
  }
}
```

#### 3.2 A/B 테스트 시스템
```javascript
class ABTestManager {
  constructor() {
    this.experiments = new Map();
  }

  shouldUseNewModel(userId) {
    // 사용자 ID 기반 일관된 A/B 분할
    const hash = this.hashUserId(userId);
    return hash % 100 < 30; // 30% 새 모델, 70% 기존 모델
  }

  async logExperimentResult(userId, model, results) {
    // A/B 테스트 결과 로깅
    await this.database.saveExperimentData({
      userId,
      modelVersion: model,
      satisfaction: results.feedback.satisfaction,
      timestamp: Date.now()
    });
  }
}
```

### **Phase 4: 고급 기능 (3-4주)**

#### 4.1 개인화 추천 시스템
```python
class PersonalizedTarotModel:
    def __init__(self):
        self.user_embeddings = nn.Embedding(10000, 32)  # 사용자 임베딩
        self.base_model = TarotQualityPredictor()
        
    def forward(self, cards, question, context, user_id):
        base_prediction = self.base_model(cards, question, context)
        user_emb = self.user_embeddings(user_id)
        
        # 개인화 조정
        personalized = base_prediction + torch.tanh(user_emb.sum())
        return torch.clamp(personalized, 0, 1)
```

#### 4.2 설명 가능한 AI (XAI)
```python
def explain_prediction(model, cards, question, context):
    """SHAP을 사용한 예측 설명"""
    import shap
    
    explainer = shap.DeepExplainer(model, background_data)
    shap_values = explainer.shap_values([cards, question, context])
    
    return {
        'card_importance': shap_values[0],
        'question_importance': shap_values[1],
        'context_importance': shap_values[2],
        'top_factors': get_top_contributing_factors(shap_values)
    }
```

## 🛠 기술 스택

### ML/AI 프레임워크
- **Python**: PyTorch, scikit-learn, pandas
- **JavaScript**: TensorFlow.js (클라이언트 측 추론용)
- **데이터베이스**: PostgreSQL + TimescaleDB
- **모델 서빙**: FastAPI + Redis

### 배포 및 모니터링
- **모델 저장**: MLflow
- **실험 추적**: Weights & Biases
- **모니터링**: Grafana + Prometheus
- **A/B 테스트**: 자체 구현

## 📊 성공 지표

### 정량적 지표
- **모델 정확도**: >85%
- **사용자 만족도**: >4.0/5.0
- **응답 시간**: <3초 (ML 추론)
- **모델 업데이트 주기**: 주 1회

### 정성적 지표
- **해석 품질 일관성**: 같은 조합에 대해 유사한 품질
- **개인화 효과**: 재방문 사용자 만족도 증가
- **학습 효과**: 시간에 따른 전체 품질 향상

## 🚀 구현 순서

### Week 1-2: 데이터 인프라
1. ✅ 학습 데이터 수집 구조 개선
2. ✅ 데이터베이스 설정 및 마이그레이션
3. ✅ 피드백 UI 추가

### Week 3-4: 기본 ML 모델
1. 🔄 품질 예측 모델 훈련
2. 🔄 감정 톤 분류 모델 구현
3. 🔄 추천 길이 모델 개발

### Week 5-6: 통합 및 테스트
1. 📝 실시간 학습 파이프라인 구축
2. 📝 A/B 테스트 시스템 구현
3. 📝 성능 모니터링 대시보드

### Week 7-8: 고급 기능
1. 📝 개인화 시스템 구현
2. 📝 설명 가능한 AI 기능
3. 📝 최종 통합 테스트

---

**최종 업데이트**: 2025-07-30  
**담당자**: AI Assistant  
**다음 마일스톤**: 데이터 수집 구조 개선 및 DB 설정