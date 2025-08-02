# 타로카드 완전 가이드 - 개발자용 참고서

> **목적**: AI 타로 앱 개발을 위한 포괄적인 타로카드 데이터 및 해석 가이드  
> **대상**: 개발팀 (사용자 + 클로드)  
> **범위**: 라이더-웨이트 타로 덱 기준 78장 완전 분석

---

# 📚 목차

1. [타로카드 기본 구조](#1-타로카드-기본-구조)
2. [메이저 아르카나 (22장)](#2-메이저-아르카나-22장)
3. [마이너 아르카나 (56장)](#3-마이너-아르카나-56장)
4. [타로 스프레드 패턴](#4-타로-스프레드-패턴)
5. [해석 시스템 설계](#5-해석-시스템-설계)
6. [앱 구현을 위한 데이터 구조](#6-앱-구현을-위한-데이터-구조)

---

## 1. 타로카드 기본 구조

### 🎴 전체 구성
```
총 78장 = 메이저 아르카나 22장 + 마이너 아르카나 56장

메이저 아르카나 (Major Arcana):
- 인생의 큰 주제와 영적 여정
- 번호: 0-21
- 강력한 상징적 의미

마이너 아르카나 (Minor Arcana):
- 일상생활의 구체적 상황
- 4개 수트 × 14장 = 56장
- 수트: 완드(불), 컵(물), 소드(공기), 펜타클(흙)
```

### 🔢 카드 번호 체계
```
메이저 아르카나: 0-21 (22장)
마이너 아르카나:
- 완드(Wands): 22-35 (14장)
- 컵(Cups): 36-49 (14장) 
- 소드(Swords): 50-63 (14장)
- 펜타클(Pentacles): 64-77 (14장)
```

### ⚖️ 정방향 vs 역방향
```
정방향 (Upright): 카드의 기본적이고 긍정적인 의미
역방향 (Reversed): 막힘, 지연, 부정적 측면, 내적 의미
```

---

## 2. 메이저 아르카나 (22장)

### 🌟 영적 여정의 22단계

| 번호 | 영어명 | 한국어명 | 핵심 키워드 | 기본 의미 |
|------|--------|----------|-------------|-----------|
| 0 | The Fool | 바보 | 시작, 순수, 모험 | 새로운 시작, 순수한 마음 |
| 1 | The Magician | 마법사 | 의지, 창조, 능력 | 목표 달성을 위한 의지력 |
| 2 | The High Priestess | 여교황 | 직감, 신비, 내면 | 직관과 내면의 지혜 |
| 3 | The Empress | 여제 | 풍요, 창조, 모성 | 창조력과 풍요로움 |
| 4 | The Emperor | 황제 | 권위, 안정, 구조 | 질서와 안정적인 기반 |
| 5 | The Hierophant | 교황 | 전통, 가르침, 영성 | 전통적 가치와 가르침 |
| 6 | The Lovers | 연인 | 사랑, 선택, 조화 | 사랑과 중요한 선택 |
| 7 | The Chariot | 전차 | 의지, 승리, 통제 | 의지력으로 이루는 승리 |
| 8 | Strength | 힘 | 용기, 인내, 내적힘 | 부드러운 힘과 인내 |
| 9 | The Hermit | 은둔자 | 성찰, 지혜, 고독 | 내적 성찰과 영적 탐구 |
| 10 | Wheel of Fortune | 운명의 수레바퀴 | 운명, 변화, 순환 | 인생의 변화와 운명 |
| 11 | Justice | 정의 | 공정, 균형, 진실 | 공정함과 균형 |
| 12 | The Hanged Man | 매달린 사람 | 희생, 관점전환, 대기 | 새로운 관점과 희생 |
| 13 | Death | 죽음 | 변화, 끝, 재생 | 끝과 새로운 시작 |
| 14 | Temperance | 절제 | 조화, 균형, 절제 | 조화로운 균형 |
| 15 | The Devil | 악마 | 유혹, 속박, 물질 | 유혹과 물질적 속박 |
| 16 | The Tower | 탑 | 파괴, 충격, 해방 | 급작스러운 변화 |
| 17 | The Star | 별 | 희망, 치유, 영감 | 희망과 영적 인도 |
| 18 | The Moon | 달 | 환상, 직감, 무의식 | 무의식과 직관 |
| 19 | The Sun | 태양 | 기쁨, 성공, 활력 | 기쁨과 긍정적 에너지 |
| 20 | Judgement | 심판 | 재생, 각성, 용서 | 영적 각성과 재생 |
| 21 | The World | 세계 | 완성, 성취, 통합 | 완성과 성취 |

### 📖 메이저 아르카나 상세 해석

#### 0. The Fool (바보)
```yaml
기본 의미:
  정방향: 새로운 시작, 순수함, 모험심, 자유로운 영혼, 신뢰
  역방향: 무모함, 경솔함, 위험한 결정, 준비 부족

상황별 해석:
  연애: 새로운 만남의 시작, 순수한 사랑
  진로: 새로운 도전, 창업, 진로 변경
  재정: 새로운 투자 기회, 재정 계획의 시작
  건강: 새로운 건강 관리 시작, 치료법 모색

상징 요소:
  - 절벽 끝에 선 젊은이
  - 작은 가방 (경험)
  - 흰 장미 (순수)
  - 작은 개 (본능과 충성)
```

#### 1. The Magician (마법사)
```yaml
기본 의미:
  정방향: 의지력, 창조력, 집중, 목표 달성, 능력 발휘
  역방향: 능력 남용, 속임수, 집중력 부족, 목표 상실

상황별 해석:
  연애: 적극적인 구애, 매력 발산, 관계 주도
  진로: 능력 발휘, 리더십, 프로젝트 성공
  재정: 수익 창출, 투자 성공, 재정 관리 능력
  건강: 회복력, 치료 효과, 건강 관리 성공

4원소 도구:
  - 완드 (의지/불)
  - 컵 (감정/물)
  - 소드 (지성/공기)
  - 펜타클 (물질/흙)
```

#### 6. The Lovers (연인)
```yaml
기본 의미:
  정방향: 사랑, 조화, 선택, 파트너십, 관계
  역방향: 관계 갈등, 잘못된 선택, 불일치, 유혹

상황별 해석:
  연애: 진정한 사랑, 결혼, 완벽한 파트너
  진로: 팀워크, 협력, 중요한 선택
  재정: 공동 투자, 파트너십, 재정 조화
  건강: 균형 잡힌 생활, 관계가 건강에 미치는 영향

선택의 의미:
  - 옳고 그름의 선택
  - 마음과 이성의 갈등
  - 인생의 중요한 기로
```

---

## 3. 마이너 아르카나 (56장)

### 🔥 완드 (Wands) - 불의 원소

**테마**: 열정, 창조력, 영감, 행동, 사업, 성장

| 번호 | 카드명 | 핵심 의미 |
|------|--------|-----------|
| 에이스 | Ace of Wands | 새로운 시작, 창조적 에너지 |
| 2 | Two of Wands | 계획, 미래 전망, 개인적 힘 |
| 3 | Three of Wands | 확장, 예견, 장거리 계획 |
| 4 | Four of Wands | 축하, 조화, 안정적 기반 |
| 5 | Five of Wands | 갈등, 경쟁, 도전 |
| 6 | Six of Wands | 승리, 인정, 성공 |
| 7 | Seven of Wands | 방어, 도전 맞서기, 용기 |
| 8 | Eight of Wands | 빠른 행동, 소식, 진전 |
| 9 | Nine of Wands | 인내, 경계, 마지막 노력 |
| 10 | Ten of Wands | 부담, 책임, 과로 |
| 페이지 | Page of Wands | 열정적 소식, 학습, 탐험 |
| 나이트 | Knight of Wands | 충동적 행동, 모험, 변화 |
| 퀸 | Queen of Wands | 자신감, 활력, 창조성 |
| 킹 | King of Wands | 리더십, 비전, 영감적 리더 |

### 💧 컵 (Cups) - 물의 원소

**테마**: 감정, 관계, 사랑, 직감, 영성, 창조성

| 번호 | 카드명 | 핵심 의미 |
|------|--------|-----------|
| 에이스 | Ace of Cups | 새로운 사랑, 감정적 시작 |
| 2 | Two of Cups | 파트너십, 상호 사랑, 연결 |
| 3 | Three of Cups | 우정, 축하, 즐거움 |
| 4 | Four of Cups | 무관심, 명상, 기회 놓침 |
| 5 | Five of Cups | 실망, 슬픔, 상실 |
| 6 | Six of Cups | 향수, 과거, 순수한 기쁨 |
| 7 | Seven of Cups | 환상, 선택의 혼란, 꿈 |
| 8 | Eight of Cups | 포기, 영적 탐구, 떠남 |
| 9 | Nine of Cups | 만족, 소원 성취, 행복 |
| 10 | Ten of Cups | 가족 행복, 감정적 성취 |
| 페이지 | Page of Cups | 감성적 소식, 직감, 창조성 |
| 나이트 | Knight of Cups | 로맨스, 제안, 감정적 접근 |
| 퀸 | Queen of Cups | 직관, 감정적 성숙, 보살핌 |
| 킹 | King of Cups | 감정적 균형, 지혜, 조절 |

### ⚔️ 소드 (Swords) - 공기의 원소

**테마**: 지성, 소통, 갈등, 도전, 진실, 명확성

| 번호 | 카드명 | 핵심 의미 |
|------|--------|-----------|
| 에이스 | Ace of Swords | 새로운 아이디어, 명확성, 진실 |
| 2 | Two of Swords | 막힘, 결정 못함, 균형 |
| 3 | Three of Swords | 상심, 배신, 슬픔 |
| 4 | Four of Swords | 휴식, 명상, 회복 |
| 5 | Five of Swords | 갈등, 패배, 불공정 |
| 6 | Six of Swords | 이동, 변화, 회복 |
| 7 | Seven of Swords | 속임수, 전략, 도피 |
| 8 | Eight of Swords | 제약, 피해의식, 갇힘 |
| 9 | Nine of Swords | 불안, 걱정, 악몽 |
| 10 | Ten of Swords | 배신, 끝, 고통의 끝 |
| 페이지 | Page of Swords | 호기심, 새로운 아이디어, 감시 |
| 나이트 | Knight of Swords | 급진적 행동, 충동, 공격성 |
| 퀸 | Queen of Swords | 독립성, 명확한 소통, 객관성 |
| 킹 | King of Swords | 지적 권위, 논리, 공정성 |

### 🪙 펜타클 (Pentacles) - 흙의 원소

**테마**: 물질, 돈, 직업, 건강, 현실적 문제, 안정성

| 번호 | 카드명 | 핵심 의미 |
|------|--------|-----------|
| 에이스 | Ace of Pentacles | 새로운 기회, 물질적 시작 |
| 2 | Two of Pentacles | 균형 잡기, 다중 과업, 유연성 |
| 3 | Three of Pentacles | 팀워크, 기술, 협력 |
| 4 | Four of Pentacles | 보안, 절약, 통제 |
| 5 | Five of Pentacles | 재정 어려움, 도움 필요 |
| 6 | Six of Pentacles | 관대함, 나눔, 균형 |
| 7 | Seven of Pentacles | 평가, 인내, 투자 결과 |
| 8 | Eight of Pentacles | 기술 향상, 헌신, 장인정신 |
| 9 | Nine of Pentacles | 독립, 자립, 물질적 성공 |
| 10 | Ten of Pentacles | 가족 부, 유산, 안정성 |
| 페이지 | Page of Pentacles | 학습, 새로운 기회, 실용성 |
| 나이트 | Knight of Pentacles | 신뢰성, 근면, 꾸준함 |
| 퀸 | Queen of Pentacles | 실용성, 보살핌, 물질적 안정 |
| 킹 | King of Pentacles | 재정적 성공, 관대함, 기업가 정신 |

---

## 4. 타로 스프레드 패턴

### 🎯 주요 스프레드 패턴 (앱 구현용)

#### 1. 3카드 스프레드 (MVP 우선 구현)
```
배치: [과거] [현재] [미래]

해석 방법:
- 과거: 현재 상황에 영향을 미친 과거 요인
- 현재: 현재 상황과 에너지  
- 미래: 현재 경로를 계속 갈 때의 결과

사용 상황:
- 일반적인 질문에 가장 적합
- 시간의 흐름을 보고 싶을 때
- 빠른 인사이트가 필요할 때
```

#### 2. 상황-행동-결과 스프레드
```
배치: [상황] [행동] [결과]

해석 방법:
- 상황: 현재 처한 상황의 본질
- 행동: 취해야 할 행동이나 접근법
- 결과: 그 행동을 취했을 때의 결과

사용 상황:
- 구체적인 결정이 필요할 때
- 행동 지침이 필요할 때
- 문제 해결 방법을 찾을 때
```

#### 3. 관계 스프레드
```
배치: 
    [나의 감정]
[나]     [상대방]
    [상대 감정]
      [관계]

해석 방법:
- 나: 관계에서 내 위치와 에너지
- 상대방: 상대방의 위치와 에너지
- 나의 감정: 상대방에 대한 내 감정
- 상대 감정: 나에 대한 상대방 감정  
- 관계: 관계의 전체적 에너지와 방향

사용 상황:
- 연애/결혼 관련 질문
- 인간관계 문제
- 가족/친구 관계 이해
```

#### 4. 켈틱 크로스 (고급 기능)
```
배치:
      [4]
  [5] [1] [6]
      [2]
      [3]
  [7] [8] [9] [10]

1. 현재 상황
2. 도전/문제
3. 먼 과거/뿌리
4. 가능한 미래  
5. 최근 과거
6. 가까운 미래
7. 당신의 접근법
8. 외부 영향
9. 희망과 두려움
10. 최종 결과
```

---

## 5. 해석 시스템 설계

### 🧠 AI 해석 로직 구조

#### 1단계: 질문 분석
```typescript
enum QuestionCategory {
  LOVE = 'love',           // 연애, 결혼, 인간관계
  CAREER = 'career',       // 직업, 승진, 사업
  MONEY = 'money',         // 재정, 투자, 돈
  HEALTH = 'health',       // 건강, 치료, 웰빙
  SPIRITUAL = 'spiritual', // 영적 성장, 자아 발견
  GENERAL = 'general'      // 일반적인 인생 조언
}

// 키워드 기반 분류
const CATEGORY_KEYWORDS = {
  love: ['사랑', '연애', '남친', '여친', '결혼', '만남', '이별', '관계'],
  career: ['직장', '일', '취업', '승진', '사업', '회사', '진로', '커리어'],
  money: ['돈', '재정', '투자', '수입', '지출', '부자', '가난', '경제'],
  health: ['건강', '병', '치료', '의사', '몸', '아픈', '회복', '다이어트'],
  spiritual: ['영혼', '명상', '종교', '신', '영적', '깨달음', '성장'],
  general: ['인생', '미래', '운명', '행복', '고민', '결정', '선택']
};
```

#### 2단계: 카드 조합 분석
```typescript
interface CardCombination {
  cards: TarotCard[];
  overallEnergy: 'positive' | 'neutral' | 'challenging';
  dominantSuit: string;
  majorArcanaCount: number;
  courtCardCount: number;
  numericalPattern: number[];
}

// 카드 조합 분석 함수
function analyzeCardCombination(cards: TarotCard[]): CardCombination {
  const majorCount = cards.filter(card => card.suit === 'major').length;
  const suitCounts = countBySuit(cards);
  const dominantSuit = Object.keys(suitCounts).reduce((a, b) => 
    suitCounts[a] > suitCounts[b] ? a : b2
  );
  
  return {
    cards,
    overallEnergy: calculateOverallEnergy(cards),
    dominantSuit,
    majorArcanaCount: majorCount,
    courtCardCount: countCourtCards(cards),
    numericalPattern: extractNumbers(cards)
  };
}
```

#### 3단계: 컨텍스트 기반 해석 생성
```typescript
class InterpretationEngine {
  generateInterpretation(
    cards: TarotCard[], 
    question: string, 
    spread: SpreadType
  ): string {
    
    // 1. 질문 분석
    const category = this.categorizeQuestion(question);
    const combination = this.analyzeCardCombination(cards);
    
    // 2. 스프레드별 포지션 해석
    const positionMeanings = this.interpretPositions(cards, spread);
    
    // 3. 카드 간 상호작용 분석
    const interactions = this.analyzeCardInteractions(cards);
    
    // 4. 카테고리별 맞춤 해석
    const contextualAdvice = this.generateContextualAdvice(
      combination, category, question
    );
    
    // 5. 최종 해석 조합
    return this.synthesizeInterpretation({
      positionMeanings,
      interactions,
      contextualAdvice,
      overallMessage: this.generateOverallMessage(combination)
    });
  }
}
```

### 📝 해석 템플릿 시스템

#### 메이저 아르카나 해석 템플릿
```typescript
const MAJOR_ARCANA_TEMPLATES = {
  0: { // The Fool
    love: {
      upright: "새로운 사랑이 시작될 조짐이 보입니다. 순수한 마음으로 다가가세요.",
      reversed: "서두르지 말고 신중하게 접근하는 것이 좋겠습니다."
    },
    career: {
      upright: "새로운 기회나 프로젝트가 당신을 기다리고 있습니다.",
      reversed: "준비가 부족할 수 있으니 계획을 다시 검토해보세요."
    }
  }
  // ... 다른 카드들
};
```

#### 카드 조합 해석 템플릿
```typescript
const COMBINATION_TEMPLATES = {
  // 메이저 아르카나가 많을 때
  majorHeavy: "인생의 중요한 전환점에 서 있습니다. 운명적인 변화가 다가오고 있어요.",
  
  // 특정 수트가 우세할 때
  wandsDominant: "열정과 행동력이 필요한 시기입니다. 적극적으로 나아가세요.",
  cupsDominant: "감정과 직감을 신뢰하세요. 마음의 소리에 귀 기울여보세요.",
  swordsDominant: "명확한 사고와 소통이 중요합니다. 진실을 마주할 용기가 필요해요.",
  pentaclesDominant: "현실적이고 실용적인 접근이 필요한 때입니다."
};
```

---

## 6. 앱 구현을 위한 데이터 구조

### 💾 JSON 데이터 구조

#### 타로카드 마스터 데이터
```json
{
  "tarotDeck": {
    "name": "Rider-Waite",
    "totalCards": 78,
    "majorArcana": [
      {
        "id": 0,
        "name": "The Fool",
        "koreanName": "바보",
        "suit": "major",
        "number": 0,
        "element": null,
        "astrological": "Uranus",
        "hebrew": "Aleph",
        "uprightKeywords": ["시작", "순수", "모험", "자유", "신뢰"],
        "reversedKeywords": ["무모", "경솔", "위험", "준비부족"],
        "uprightMeaning": {
          "general": "새로운 시작과 모험을 의미합니다...",
          "love": "순수한 사랑의 시작을 나타냅니다...",
          "career": "새로운 기회와 도전을 의미합니다...",
          "money": "새로운 재정 계획의 시작을 나타냅니다...",
          "health": "새로운 건강 관리의 시작을 의미합니다..."
        },
        "reversedMeaning": {
          "general": "무모한 결정이나 준비 부족을 경고합니다...",
          "love": "성급한 사랑에 주의하라는 메시지입니다...",
          "career": "충분한 준비 없이 시작하는 것을 경계하세요...",
          "money": "위험한 투자나 무계획적 지출을 피하세요...",
          "health": "건강 관리에 더 신중하게 접근하세요..."
        },
        "symbolism": {
          "cliff": "미지의 영역으로의 도약",
          "rose": "순수함과 열정",
          "bag": "과거의 경험과 지혜",
          "dog": "본능과 충실함"
        },
        "imageUri": "assets/cards/major_00_fool.png",
        "backgroundColor": "#FFE4B5",
        "textColor": "#8B4513"
      }
    ],
    "minorArcana": {
      "wands": [
        {
          "id": 22,
          "name": "Ace of Wands",
          "koreanName": "완드 에이스",
          "suit": "wands",
          "number": 1,
          "element": "fire",
          "astrological": "Cardinals signs (Aries, Cancer, Libra, Capricorn)",
          "uprightKeywords": ["창조", "영감", "새시작", "잠재력"],
          "reversedKeywords": ["지연", "좌절", "에너지부족"],
          "uprightMeaning": {
            "general": "새로운 창조적 에너지와 시작을 의미합니다...",
            "love": "열정적인 새로운 관계의 시작...",
            "career": "새로운 프로젝트나 사업 기회...",
            "money": "수익성 있는 새로운 벤처...",
            "health": "활력과 에너지의 증가..."
          },
          "imageUri": "assets/cards/wands_01_ace.png"
        }
      ]
    }
  }
}
```

#### 스프레드 패턴 데이터
```json
{
  "spreads": [
    {
      "id": "three_card",
      "name": "3카드 스프레드",
      "description": "과거-현재-미래를 보는 기본적인 스프레드",
      "cardCount": 3,
      "positions": [
        {
          "index": 0,
          "name": "과거",
          "description": "현재 상황에 영향을 미친 과거의 요인",
          "keywords": ["영향", "원인", "배경"]
        },
        {
          "index": 1,
          "name": "현재",
          "description": "현재의 상황과 에너지",
          "keywords": ["현재", "상황", "에너지"]
        },
        {
          "index": 2,
          "name": "미래",
          "description": "현재 경로를 계속할 때의 가능한 결과",
          "keywords": ["결과", "방향", "가능성"]
        }
      ],
      "layout": {
        "type": "horizontal",
        "spacing": 20
      }
    }
  ]
}
```

### 🏗️ TypeScript 인터페이스

```typescript
interface TarotCard {
  id: number;
  name: string;
  koreanName: string;
  suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  element?: 'fire' | 'water' | 'air' | 'earth';
  astrological?: string;
  hebrew?: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightMeaning: CardMeaning;
  reversedMeaning: CardMeaning;
  symbolism?: Record<string, string>;
  imageUri: string;
  backgroundColor?: string;
  textColor?: string;
}

interface CardMeaning {
  general: string;
  love: string;
  career: string;
  money: string;
  health: string;
}

interface SpreadPosition {
  index: number;
  name: string;
  description: string;
  keywords: string[];
}

interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
  layout: {
    type: 'horizontal' | 'vertical' | 'cross' | 'custom';
    spacing: number;
  };
}

interface Reading {
  id: string;
  question: string;
  category: QuestionCategory;
  spreadId: string;
  cards: SelectedCard[];
  interpretation: string;
  createdAt: Date;
  userRating?: number;
}

interface SelectedCard {
  card: TarotCard;
  position: number;
  isReversed: boolean;
}
```

### 🎨 UI/UX 구현 가이드

#### 카드 디스플레이 규격
```typescript
const CARD_DIMENSIONS = {
  width: 120,
  height: 200,
  aspectRatio: 0.6,
  borderRadius: 8,
  shadowOffset: { width: 2, height: 4 },
  shadowOpacity: 0.3
};

const CARD_STATES = {
  normal: {
    scale: 1,
    opacity: 1,
    elevation: 2
  },
  selected: {
    scale: 1.05,
    opacity: 1,
    elevation: 8,
    borderColor: '#FF6B6B',
    borderWidth: 2
  },
  disabled: {
    scale: 1,
    opacity: 0.5,
    elevation: 1
  }
};
```

#### 색상 시스템 (수트별)
```typescript
const SUIT_COLORS = {
  major: {
    primary: '#6B46C1',    // 보라색 (신비로운)
    secondary: '#A78BFA',
    background: '#F3E8FF'
  },
  wands: {
    primary: '#DC2626',    // 빨간색 (불의 원소)
    secondary: '#FCA5A5',
    background: '#FEF2F2'
  },
  cups: {
    primary: '#2563EB',    // 파란색 (물의 원소)
    secondary: '#93C5FD',
    background: '#EFF6FF'
  },
  swords: {
    primary: '#64748B',    // 회색 (공기의 원소)
    secondary: '#CBD5E1',
    background: '#F8FAFC'
  },
  pentacles: {
    primary: '#059669',    // 초록색 (땅의 원소)
    secondary: '#6EE7B7',
    background: '#ECFDF5'
  }
};
```

---

## 📋 개발 우선순위

### Phase 1 (MVP)
```markdown
필수 구현:
□ 메이저 아르카나 22장 기본 데이터
□ 3카드 스프레드 패턴
□ 기본 해석 시스템 (정방향만)
□ 5개 질문 카테고리 분류
□ 간단한 조합 해석 로직

데이터 필요량:
- 카드당 평균 200-300자 해석
- 총 22장 × 5카테고리 = 110개 해석
- 예상 작업시간: 2-3일
```

### Phase 2 (확장)
```markdown
추가 구현:
□ 마이너 아르카나 56장 전체
□ 역방향 해석 시스템
□ 다양한 스프레드 패턴 (5-6개)
□ 고급 카드 조합 분석
□ 개인화 학습 알고리즘

데이터 필요량:
- 추가 56장 × 5카테고리 × 2방향 = 560개 해석
- 예상 작업시간: 1-2주
```

---

## ✅ 다음 단계

이 가이드를 바탕으로 다음과 같이 진행하시면 됩니다:

### 👤 사용자 작업
1. **카드 이미지 수집**: 78장 타로카드 이미지 (512x512px)
2. **디자인 컨셉**: 각 수트별 색상 테마 결정
3. **해석 톤앤매너**: 친근한/신비로운/전문적인 중 선택

### 🤖 클로드 작업
1. **데이터 구조 구현**: TypeScript 인터페이스 및 JSON 스키마
2. **기본 해석 엔진**: 22장 메이저 아르카나 해석 로직
3. **3카드 스프레드**: MVP용 기본 스프레드 구현

**준비되시면 언제든 "타로 데이터 작업 시작하자!"라고 말씀해 주세요! 🔮**