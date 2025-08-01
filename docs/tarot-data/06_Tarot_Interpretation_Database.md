# 타로카드 해석 데이터베이스

> **목적**: AI 타로 앱을 위한 포괄적인 카드 해석 및 의미 데이터베이스  
> **구조**: 78장 카드별 상황별 해석 + 조합 해석 시스템  
> **활용**: 개발팀의 AI 해석 엔진 구축 및 콘텐츠 제작 참고

---

# 📚 목차

1. [데이터베이스 구조 설계](#1-데이터베이스-구조-설계)
2. [메이저 아르카나 해석 데이터](#2-메이저-아르카나-해석-데이터)
3. [마이너 아르카나 해석 데이터](#3-마이너-아르카나-해석-데이터)
4. [상황별 해석 매트릭스](#4-상황별-해석-매트릭스)
5. [카드 조합 해석 시스템](#5-카드-조합-해석-시스템)
6. [AI 해석 엔진 설계](#6-ai-해석-엔진-설계)

---

## 1. 데이터베이스 구조 설계

### 🗄️ 기본 데이터 스키마

```typescript
interface TarotCardData {
  id: number;
  name: string;
  koreanName: string;
  suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  element?: 'fire' | 'water' | 'air' | 'earth';
  
  // 기본 키워드
  uprightKeywords: string[];
  reversedKeywords: string[];
  
  // 상황별 해석
  interpretations: {
    upright: SituationalMeanings;
    reversed: SituationalMeanings;
  };
  
  // 심리적 및 영적 의미
  psychologicalMeaning: {
    upright: string;
    reversed: string;
  };
  
  // 조언 및 액션
  advice: {
    upright: string;
    reversed: string;
  };
  
  // 시간적 의미
  timing: {
    general: string;
    season?: string;
    timeFrame?: string;
  };
  
  // 상징 및 심볼리즘
  symbolism: SymbolMeaning[];
  
  // 다른 카드와의 조합
  combinations?: CardCombination[];
}

interface SituationalMeanings {
  general: string;
  love: string;
  career: string;
  money: string;
  health: string;
  spiritual: string;
}

interface SymbolMeaning {
  symbol: string;
  meaning: string;
}

interface CardCombination {
  withCard: number;
  meaning: string;
  context: string;
}
```

### 📊 질문 카테고리 매핑

```typescript
enum QuestionCategory {
  LOVE = 'love',
  CAREER = 'career', 
  MONEY = 'money',
  HEALTH = 'health',
  SPIRITUAL = 'spiritual',
  GENERAL = 'general'
}

const CATEGORY_KEYWORDS = {
  love: [
    '사랑', '연애', '남친', '여친', '남자친구', '여자친구', 
    '결혼', '만남', '이별', '재회', '짝사랑', '소개팅',
    '관계', '데이트', '고백', '프로포즈', '혼인', '배우자'
  ],
  career: [
    '직장', '일', '취업', '승진', '사업', '회사', '진로', 
    '커리어', '직업', '상사', '동료', '프로젝트', '성과',
    '이직', '창업', '면접', '업무', '근무', '직무'
  ],
  money: [
    '돈', '재정', '투자', '수입', '지출', '부자', '가난',
    '경제', '저축', '대출', '빚', '재산', '금전', '자산',
    '주식', '부동산', '사업', '수익', '손실', '예산'
  ],
  health: [
    '건강', '병', '치료', '의사', '몸', '아픈', '회복',
    '다이어트', '운동', '체중', '질병', '약', '병원',
    '수술', '검사', '건강검진', '컨디션', '체력'
  ],
  spiritual: [
    '영혼', '명상', '종교', '신', '영적', '깨달음', '성장',
    '철학', '믿음', '기도', '수행', '영성', '의식', '각성',
    '내면', '자아', '정신', '마음', '의미', '목적'
  ],
  general: [
    '인생', '미래', '운명', '행복', '고민', '결정', '선택',
    '변화', '기회', '도전', '성공', '실패', '희망', '걱정',
    '가족', '친구', '사람', '관계', '상황', '문제', '해결'
  ]
};
```

---

## 2. 메이저 아르카나 해석 데이터

### 🌟 0. The Fool (바보)

```json
{
  "id": 0,
  "name": "The Fool",
  "koreanName": "바보",
  "suit": "major",
  "uprightKeywords": ["새시작", "순수", "모험", "자유", "신뢰", "순진함"],
  "reversedKeywords": ["무모함", "경솔함", "위험", "준비부족", "어리석음"],
  
  "interpretations": {
    "upright": {
      "general": "새로운 시작과 모험이 기다리고 있습니다. 순수한 마음으로 새로운 경험을 받아들일 때입니다. 미지의 영역에 대한 두려움보다는 호기심과 신뢰를 가지고 앞으로 나아가세요.",
      "love": "새로운 사랑의 시작을 의미합니다. 순수하고 자유로운 마음으로 상대방에게 다가가세요. 기존의 관계에서는 새로운 단계로 발전할 가능성이 높습니다. 솔직하고 진실한 감정 표현이 중요합니다.",
      "career": "새로운 직업이나 프로젝트에 도전할 좋은 시기입니다. 창의적이고 혁신적인 아이디어가 성공으로 이어질 수 있습니다. 기존의 방식에 얽매이지 말고 새로운 접근법을 시도해보세요.",
      "money": "새로운 수입원이나 투자 기회가 나타날 수 있습니다. 하지만 충분한 계획 없이 성급하게 결정하지는 마세요. 기본적인 재정 관리가 필요한 시점입니다.",
      "health": "새로운 건강 관리 방법을 시작하기 좋은 때입니다. 운동이나 식단 조절에 대한 새로운 시도가 긍정적인 결과를 가져올 것입니다. 몸의 신호에 귀 기울이세요.",
      "spiritual": "영적 여정의 시작을 알립니다. 새로운 믿음이나 철학에 열린 마음을 가지세요. 명상이나 영적 수행을 시작하기 좋은 시기입니다."
    },
    "reversed": {
      "general": "성급한 결정이나 무모한 행동을 경계해야 합니다. 충분한 준비와 계획 없이 시작하면 어려움에 처할 수 있습니다. 좀 더 신중하고 현실적인 접근이 필요합니다.",
      "love": "감정에 휩쓸려 성급한 결정을 내릴 위험이 있습니다. 상대방에 대해 충분히 알아보지 않고 관계를 시작하거나, 현실적인 문제들을 간과할 수 있습니다.",
      "career": "준비가 부족한 상태에서 새로운 도전을 시작하려 하고 있습니다. 충분한 계획과 준비 없이는 실패할 가능성이 높습니다. 더 신중한 접근이 필요합니다.",
      "money": "재정 관리에 있어 무계획적이고 충동적인 모습을 보이고 있습니다. 투자나 지출에 대해 더 신중하게 생각해야 합니다.",
      "health": "건강 관리에 소홀하거나 무리한 방법을 시도하고 있을 수 있습니다. 전문가의 조언을 구하고 단계적으로 접근하는 것이 좋습니다.",
      "spiritual": "영적 성장에 있어 너무 성급하거나 현실을 도피하려는 경향이 있습니다. 균형 잡힌 접근이 필요합니다."
    }
  },
  
  "psychologicalMeaning": {
    "upright": "무의식과 순수한 잠재력을 나타냅니다. 새로운 경험에 대한 개방성과 창의적 에너지를 상징합니다.",
    "reversed": "미성숙함과 현실 도피 성향을 나타냅니다. 책임을 회피하거나 결과를 고려하지 않는 성향을 경계해야 합니다."
  },
  
  "advice": {
    "upright": "새로운 시작을 두려워하지 마세요. 순수한 마음과 열린 자세로 앞으로 나아가되, 기본적인 준비는 갖추어야 합니다.",
    "reversed": "현실적인 계획을 세우고 충분히 준비한 후에 행동하세요. 감정이나 충동에 휩쓸리지 말고 신중하게 판단하세요."
  },
  
  "timing": {
    "general": "새로운 시작의 시점, 봄철",
    "season": "봄",
    "timeFrame": "즉시 ~ 1개월 이내"
  },
  
  "symbolism": [
    {"symbol": "절벽", "meaning": "미지의 영역으로의 도약, 신뢰의 행위"},
    {"symbol": "흰 장미", "meaning": "순수함과 열정의 조화"},
    {"symbol": "작은 가방", "meaning": "과거의 경험과 지혜"},
    {"symbol": "작은 개", "meaning": "본능과 충성심, 내면의 목소리"},
    {"symbol": "산", "meaning": "앞으로의 도전과 성장"}
  ]
}
```

### 🌟 1. The Magician (마법사)

```json
{
  "id": 1,
  "name": "The Magician",
  "koreanName": "마법사",
  "suit": "major",
  "uprightKeywords": ["의지력", "창조", "능력", "집중", "목표달성", "재능"],
  "reversedKeywords": ["남용", "속임수", "집중부족", "허영", "조작"],
  
  "interpretations": {
    "upright": {
      "general": "목표를 달성할 수 있는 모든 도구와 능력을 갖추었습니다. 강한 의지력과 집중력으로 원하는 것을 현실화할 수 있는 시기입니다. 창조적 에너지가 높아져 있어 새로운 프로젝트나 계획을 실행하기 좋습니다.",
      "love": "매력적이고 카리스마 있는 모습으로 상대방을 끌어당길 수 있습니다. 적극적인 구애나 관계 발전에 주도권을 잡을 수 있는 시기입니다. 진실한 마음으로 상대방에게 다가가세요.",
      "career": "뛰어난 능력과 리더십을 발휘할 수 있는 때입니다. 프로젝트를 성공적으로 이끌거나 새로운 사업을 시작하기 좋은 시기입니다. 창의적 아이디어를 현실화할 수 있습니다.",
      "money": "재정 관리 능력이 뛰어나며, 수익을 창출할 수 있는 기회가 많습니다. 투자나 사업에서 좋은 결과를 얻을 수 있습니다. 계획적인 접근이 성공의 열쇠입니다.",
      "health": "자기 치유력이 높아져 있으며, 건강 관리에 대한 의지력이 강합니다. 새로운 치료법이나 건강 관리 방법이 효과적일 것입니다.",
      "spiritual": "높은 영적 에너지와 직관력을 가지고 있습니다. 명상이나 영적 수행에서 큰 진전을 이룰 수 있는 시기입니다."
    },
    "reversed": {
      "general": "능력을 잘못된 방향으로 사용하거나 자만심에 빠져있을 수 있습니다. 속임수나 조작적인 행동을 하고 있거나, 집중력이 분산되어 목표 달성이 어려울 수 있습니다.",
      "love": "상대방을 조종하려 하거나 거짓된 매력으로 접근하고 있을 수 있습니다. 진실하지 못한 관계나 불성실한 태도가 문제가 될 수 있습니다.",
      "career": "능력을 과시하려 하거나 부정한 방법을 사용할 위험이 있습니다. 팀워크를 무시하고 독단적으로 행동할 수 있습니다.",
      "money": "재정 관리에 있어 과신하거나 위험한 투자를 할 수 있습니다. 돈에 대한 욕심이 판단력을 흐리게 할 수 있습니다.",
      "health": "건강 관리에 있어 극단적인 방법을 시도하거나 전문가의 조언을 무시할 수 있습니다.",
      "spiritual": "영적 능력을 과시하려 하거나 잘못된 목적으로 사용할 위험이 있습니다. 겸손함이 필요합니다."
    }
  },
  
  "psychologicalMeaning": {
    "upright": "자아실현과 창조적 힘을 나타냅니다. 의식과 무의식의 조화를 통한 목표 달성을 상징합니다.",
    "reversed": "자아도취와 조작적 성향을 나타냅니다. 진정한 실력보다는 겉보기에 치중하는 성향을 경계해야 합니다."
  },
  
  "advice": {
    "upright": "가진 능력과 재능을 적극적으로 활용하세요. 명확한 목표를 설정하고 집중력을 발휘한다면 원하는 것을 얻을 수 있습니다.",
    "reversed": "진실되고 겸손한 자세를 가지세요. 단기적 이익보다는 장기적 신뢰를 쌓는 것이 중요합니다."
  },
  
  "timing": {
    "general": "의지력이 강한 시기, 수성의 영향",
    "timeFrame": "1-3개월 이내"
  },
  
  "symbolism": [
    {"symbol": "무한대 기호", "meaning": "무한한 가능성과 영원한 순환"},
    {"symbol": "완드", "meaning": "의지력과 행동력"},
    {"symbol": "컵", "meaning": "감정과 직감"},
    {"symbol": "소드", "meaning": "지성과 소통"},
    {"symbol": "펜타클", "meaning": "물질적 현실화"},
    {"symbol": "장미", "meaning": "열정과 사랑"},
    {"symbol": "백합", "meaning": "순수함과 지혜"}
  ]
}
```

### 🌟 6. The Lovers (연인)

```json
{
  "id": 6,
  "name": "The Lovers",
  "koreanName": "연인",
  "suit": "major",
  "uprightKeywords": ["사랑", "조화", "선택", "파트너십", "관계", "결합"],
  "reversedKeywords": ["갈등", "불일치", "잘못된선택", "분리", "유혹"],
  
  "interpretations": {
    "upright": {
      "general": "중요한 선택의 기로에 서 있습니다. 사랑과 조화를 바탕으로 한 관계나 파트너십이 발전할 것입니다. 가치관이 일치하는 사람들과의 만남이나 협력이 성공으로 이어질 것입니다.",
      "love": "진정한 사랑과 깊은 유대감을 경험할 수 있습니다. 결혼이나 약속과 같은 중요한 관계의 발전이 예상됩니다. 서로에 대한 이해와 조화가 깊어질 것입니다.",
      "career": "팀워크와 협력이 성공의 열쇠입니다. 파트너십이나 공동 사업이 좋은 결과를 가져올 것입니다. 인간관계가 업무 성과에 큰 영향을 미칠 것입니다.",
      "money": "공동 투자나 파트너와의 재정 계획이 성공적일 것입니다. 관계를 통한 경제적 기회가 생길 수 있습니다.",
      "health": "균형 잡힌 생활과 조화로운 관계가 건강에 긍정적 영향을 미칠 것입니다. 파트너나 가족의 지원이 회복에 도움이 됩니다.",
      "spiritual": "영적 파트너십이나 같은 믿음을 가진 사람들과의 만남이 영적 성장에 도움이 될 것입니다."
    },
    "reversed": {
      "general": "관계에서 갈등이나 불일치가 생길 수 있습니다. 잘못된 선택이나 유혹에 빠질 위험이 있습니다. 가치관의 차이로 인한 분리나 결별이 있을 수 있습니다.",
      "love": "관계에서 문제가 생기거나 갈등이 심화될 수 있습니다. 배신이나 불륜의 유혹, 또는 가치관 차이로 인한 어려움이 있을 수 있습니다.",
      "career": "동료나 파트너와의 갈등으로 어려움을 겪을 수 있습니다. 팀워크가 제대로 이루어지지 않아 프로젝트에 차질이 생길 수 있습니다.",
      "money": "재정 문제로 인한 관계 악화나 파트너십 해체가 있을 수 있습니다. 금전적 이해관계로 인한 갈등을 주의해야 합니다.",
      "health": "스트레스나 관계 문제가 건강에 악영향을 미칠 수 있습니다. 정신적 건강에 특히 주의가 필요합니다.",
      "spiritual": "영적 갈등이나 믿음의 혼란을 겪을 수 있습니다. 다른 사람들의 영향으로 자신의 신념이 흔들릴 수 있습니다."
    }
  },
  
  "psychologicalMeaning": {
    "upright": "아니마와 아니무스의 조화, 내적 통합을 나타냅니다. 선택에 있어서 마음과 이성의 균형을 의미합니다.",
    "reversed": "내적 갈등과 분열을 나타냅니다. 욕망과 도덕 사이의 갈등, 선택의 어려움을 상징합니다."
  },
  
  "advice": {
    "upright": "마음과 이성의 균형을 맞춰 현명한 선택을 하세요. 진정한 사랑과 조화를 추구하며, 상호 존중하는 관계를 만들어가세요.",
    "reversed": "관계에서의 문제를 정면으로 다루고 소통하세요. 유혹에 넘어가지 말고 올바른 선택을 위해 신중하게 생각하세요."
  },
  
  "timing": {
    "general": "중요한 선택의 시기, 쌍둥이자리의 영향",
    "season": "초여름",
    "timeFrame": "2-6개월 이내"
  },
  
  "symbolism": [
    {"symbol": "천사 라파엘", "meaning": "신의 축복과 영적 인도"},
    {"symbol": "남자와 여자", "meaning": "대립의 조화, 완전성"},
    {"symbol": "생명나무", "meaning": "생명력과 성장"},
    {"symbol": "지식나무", "meaning": "선악을 구분하는 지혜"},
    {"symbol": "산", "meaning": "영적 상승과 도전"}
  ]
}
```

---

## 3. 마이너 아르카나 해석 데이터

### 🔥 완드 (Wands) 해석 예시

#### Ace of Wands
```json
{
  "id": 22,
  "name": "Ace of Wands",
  "koreanName": "완드 에이스",
  "suit": "wands",
  "number": 1,
  "element": "fire",
  "uprightKeywords": ["창조", "영감", "새시작", "잠재력", "열정"],
  "reversedKeywords": ["지연", "좌절", "에너지부족", "창의성막힘"],
  
  "interpretations": {
    "upright": {
      "general": "새로운 창조적 에너지와 영감이 솟아오르는 시기입니다. 새로운 프로젝트나 아이디어를 시작하기에 완벽한 때입니다. 열정과 동기가 높아져 있어 무엇이든 시작할 수 있습니다.",
      "love": "새로운 연애의 시작이나 기존 관계에 새로운 열정이 불어날 것입니다. 상대방에 대한 강한 매력을 느끼거나, 관계에 새로운 활력이 생길 것입니다.",
      "career": "새로운 직업 기회나 창업 아이디어가 떠오를 것입니다. 창의적인 프로젝트나 혁신적인 접근법이 성공으로 이어질 가능성이 높습니다.",
      "money": "새로운 수입원이나 수익성 있는 투자 기회가 나타날 것입니다. 창의적인 사업 아이디어가 경제적 성공을 가져다줄 수 있습니다.",
      "health": "활력과 에너지가 넘치는 시기입니다. 새로운 운동이나 건강 관리 방법을 시작하기 좋은 때입니다.",
      "spiritual": "영적 각성이나 새로운 깨달음을 얻을 수 있는 시기입니다. 창조적 영성이나 예술적 영감을 경험할 수 있습니다."
    },
    "reversed": {
      "general": "창의적 에너지가 막혀있거나 새로운 시작이 지연되고 있습니다. 열정은 있지만 방향을 찾지 못하거나 실행에 어려움이 있을 수 있습니다.",
      "love": "연애에 대한 열정이 식어가거나 새로운 만남이 기대만큼 발전하지 않을 수 있습니다. 감정 표현에 어려움이 있을 수 있습니다.",
      "career": "새로운 프로젝트나 아이디어가 있지만 실행하지 못하고 있습니다. 창의성이 발휘되지 못하거나 동기부여가 부족할 수 있습니다.",
      "money": "투자나 새로운 사업 기회가 기대만큼 성과를 내지 못할 수 있습니다. 재정 계획에 재검토가 필요합니다.",
      "health": "에너지 부족이나 의욕 저하를 경험할 수 있습니다. 새로운 건강 관리 방법이 효과를 보지 못할 수 있습니다.",
      "spiritual": "영적 성장이 정체되어 있거나 방향을 잃었을 수 있습니다. 인내심을 가지고 기다려야 할 때입니다."
    }
  },
  
  "psychologicalMeaning": {
    "upright": "창조적 충동과 새로운 가능성에 대한 열정을 나타냅니다. 자아실현을 위한 강한 동기를 상징합니다.",
    "reversed": "창조적 좌절감과 방향성 상실을 나타냅니다. 잠재력은 있지만 표현되지 못하는 상태를 의미합니다."
  },
  
  "advice": {
    "upright": "지금이 새로운 시작을 할 완벽한 때입니다. 영감을 받았다면 즉시 행동으로 옮기세요. 열정을 잃지 말고 꾸준히 추진하세요.",
    "reversed": "서두르지 말고 때를 기다리세요. 창의적 에너지를 회복하기 위해 휴식을 취하거나 영감을 찾을 수 있는 활동을 해보세요."
  },
  
  "timing": {
    "general": "봄철, 새로운 시작의 시기",
    "season": "봄",
    "timeFrame": "즉시 ~ 3주 이내"
  }
}
```

### 💧 컵 (Cups) 해석 예시

#### Two of Cups
```json
{
  "id": 37,
  "name": "Two of Cups",
  "koreanName": "컵 투",
  "suit": "cups",
  "number": 2,
  "element": "water",
  "uprightKeywords": ["파트너십", "사랑", "연결", "협력", "조화", "상호작용"],
  "reversedKeywords": ["관계문제", "불일치", "소통부족", "분리", "갈등"],
  
  "interpretations": {
    "upright": {
      "general": "두 사람 사이의 강한 유대감과 상호 이해를 나타냅니다. 파트너십이나 협력 관계가 매우 조화롭고 균형잡혀 있습니다. 서로에 대한 존중과 평등한 관계를 의미합니다.",
      "love": "완벽한 궁합과 깊은 사랑을 의미합니다. 결혼이나 약혼 등 관계의 공식화가 이루어질 수 있습니다. 서로에게 완전히 열린 마음으로 소통하는 관계입니다.",
      "career": "동료나 비즈니스 파트너와의 훌륭한 협력을 나타냅니다. 팀 프로젝트나 공동 사업이 성공적으로 진행될 것입니다. 상호 존중하는 업무 환경입니다.",
      "money": "재정적 파트너십이나 공동 투자가 성공적일 것입니다. 재정 계획에 있어 파트너와 완전한 합의를 이룰 수 있습니다.",
      "health": "정신적, 감정적 건강이 매우 좋은 상태입니다. 사랑하는 사람들과의 관계가 건강에 긍정적 영향을 미치고 있습니다.",
      "spiritual": "영적 파트너나 소울메이트와의 만남을 의미할 수 있습니다. 같은 영적 목표를 가진 사람과의 연결이 성장에 도움이 됩니다."
    },
    "reversed": {
      "general": "관계에서 불균형이나 소통의 문제가 있을 수 있습니다. 서로 다른 목표나 가치관으로 인해 갈등이 생길 수 있습니다. 협력보다는 경쟁심이 부각될 수 있습니다.",
      "love": "관계에서 오해나 갈등이 생길 수 있습니다. 감정 표현이 부족하거나 상대방의 마음을 이해하지 못할 수 있습니다. 이별이나 관계 악화의 위험이 있습니다.",
      "career": "동료나 파트너와의 갈등으로 업무에 지장이 생길 수 있습니다. 의견 충돌이나 목표의 차이로 프로젝트가 어려워질 수 있습니다.",
      "money": "재정 문제로 인한 관계 악화나 투자 파트너십에서 의견 차이가 생길 수 있습니다.",
      "health": "관계 스트레스가 건강에 악영향을 미칠 수 있습니다. 정신적 긴장이나 감정적 불안정을 경험할 수 있습니다.",
      "spiritual": "영적 파트너와의 불일치나 믿음의 차이로 혼란을 겪을 수 있습니다."
    }
  },
  
  "psychologicalMeaning": {
    "upright": "건강한 관계성과 정서적 교류를 나타냅니다. 타인과의 진정한 연결과 상호 이해를 상징합니다.",
    "reversed": "관계에서의 의존성이나 경계의 문제를 나타냅니다. 감정적 미성숙이나 소통 능력 부족을 의미할 수 있습니다."
  },
  
  "advice": {
    "upright": "상대방과의 관계를 소중히 여기고 계속 발전시켜 나가세요. 열린 마음으로 소통하고 서로를 존중하는 자세를 유지하세요.",
    "reversed": "관계에서의 문제를 해결하기 위해 적극적으로 소통하세요. 자신의 감정을 솔직하게 표현하고 상대방의 입장도 이해하려 노력하세요."
  },
  
  "timing": {
    "general": "관계 발전의 시기, 금성의 영향",
    "timeFrame": "2주 ~ 2개월"
  }
}
```

---

## 4. 상황별 해석 매트릭스

### 📊 질문 유형별 카드 해석 가중치

```typescript
interface InterpretationWeights {
  [category: string]: {
    [cardSuit: string]: number;
  };
}

const INTERPRETATION_WEIGHTS: InterpretationWeights = {
  love: {
    cups: 1.5,      // 감정과 사랑 - 가장 높은 가중치
    major: 1.3,     // 인생의 중요한 변화
    wands: 1.1,     // 열정과 행동
    pentacles: 0.8, // 물질적 안정
    swords: 0.7     // 갈등과 소통 - 낮은 가중치
  },
  career: {
    pentacles: 1.5, // 물질적 성취와 실용성
    wands: 1.4,     // 창조성과 리더십
    swords: 1.2,    // 지성과 소통
    major: 1.1,     // 큰 변화와 전환
    cups: 0.8       // 감정보다는 실무
  },
  money: {
    pentacles: 1.6, // 재정과 물질 - 최고 가중치
    major: 1.2,     // 운명적 변화
    swords: 1.0,    // 계획과 전략
    wands: 0.9,     // 창업과 사업
    cups: 0.7       // 감정적 요소는 낮음
  },
  health: {
    major: 1.4,     // 큰 건강 변화
    cups: 1.3,      // 정신적 건강
    pentacles: 1.2, // 물리적 건강
    wands: 1.0,     // 활력과 에너지
    swords: 0.8     // 스트레스와 걱정
  },
  spiritual: {
    major: 1.6,     // 영적 여정 - 최고 가중치
    cups: 1.3,      // 직감과 감정
    swords: 1.1,    // 진리와 지혜
    wands: 1.0,     // 영적 열정
    pentacles: 0.7  // 물질적 요소는 낮음
  }
};
```

### 🎯 카드 조합별 특별 해석

```typescript
interface CardCombinationMeaning {
  cards: number[];
  meaning: string;
  context: string;
  strength: 'strong' | 'moderate' | 'weak';
}

const SPECIAL_COMBINATIONS: CardCombinationMeaning[] = [
  {
    cards: [6, 37], // The Lovers + Two of Cups
    meaning: "완벽한 사랑과 영혼의 동반자를 만날 징조입니다. 이상적인 관계나 결혼이 성사될 가능성이 매우 높습니다.",
    context: "love",
    strength: "strong"
  },
  {
    cards: [1, 22], // The Magician + Ace of Wands  
    meaning: "강력한 창조 에너지와 의지력으로 새로운 프로젝트나 사업을 성공적으로 시작할 수 있습니다. 리더십을 발휘할 때입니다.",
    context: "career",
    strength: "strong"
  },
  {
    cards: [10, 77], // Wheel of Fortune + King of Pentacles
    meaning: "운명적인 재정적 기회가 찾아올 것입니다. 큰 성공과 물질적 풍요를 얻을 수 있는 시기입니다.",
    context: "money", 
    strength: "strong"
  },
  {
    cards: [13, 20], // Death + Judgement
    meaning: "인생의 큰 전환점에서 완전한 재생과 새로운 각성을 경험할 것입니다. 과거와 완전히 결별하고 새로운 삶을 시작할 때입니다.",
    context: "general",
    strength: "strong"
  },
  {
    cards: [16, 17], // The Tower + The Star
    meaning: "큰 충격이나 변화 후에 희망과 치유가 찾아올 것입니다. 위기 이후의 새로운 가능성과 영감을 의미합니다.",
    context: "general",
    strength: "strong"
  }
];
```

---

## 5. 카드 조합 해석 시스템

### 🔮 3카드 스프레드 해석 로직

```typescript
class ThreeCardReading {
  interpretReading(cards: SelectedCard[], question: string): string {
    const category = this.categorizeQuestion(question);
    const past = cards[0];
    const present = cards[1]; 
    const future = cards[2];
    
    // 1. 개별 카드 해석
    const pastMeaning = this.getCardMeaning(past, category, 'past');
    const presentMeaning = this.getCardMeaning(present, category, 'present');
    const futureMeaning = this.getCardMeaning(future, category, 'future');
    
    // 2. 카드 간 관계 분석
    const pastPresentConnection = this.analyzeConnection(past, present);
    const presentFutureConnection = this.analyzeConnection(present, future);
    const overallFlow = this.analyzeOverallFlow(cards);
    
    // 3. 종합 해석 생성
    return this.synthesizeInterpretation({
      pastMeaning,
      presentMeaning,
      futureMeaning,
      pastPresentConnection,
      presentFutureConnection,
      overallFlow,
      category,
      question
    });
  }
  
  private analyzeConnection(card1: SelectedCard, card2: SelectedCard): string {
    // 수트 간 관계 분석
    const suitRelation = this.getSuitRelation(card1.card.suit, card2.card.suit);
    
    // 숫자 간 관계 분석 (마이너 아르카나의 경우)
    const numberRelation = this.getNumberRelation(card1.card.number, card2.card.number);
    
    // 정/역방향 관계 분석
    const orientationRelation = this.getOrientationRelation(card1.isReversed, card2.isReversed);
    
    return this.combineRelations(suitRelation, numberRelation, orientationRelation);
  }
  
  private getSuitRelation(suit1: string, suit2: string): string {
    const SUIT_RELATIONSHIPS = {
      'wands-cups': '열정과 감정의 조화로 창조적 에너지가 높아집니다.',
      'wands-swords': '행동력과 지성의 결합으로 강력한 추진력을 얻습니다.',
      'wands-pentacles': '아이디어가 현실로 구현되어 실질적 성과를 거둘 것입니다.',
      'cups-swords': '감정과 이성 사이의 갈등이나 조화가 나타납니다.',
      'cups-pentacles': '감정적 만족과 물질적 안정을 동시에 추구합니다.',
      'swords-pentacles': '계획과 실행이 조화롭게 이루어져 목표를 달성합니다.',
      'major-minor': '운명적 변화가 일상에 큰 영향을 미칠 것입니다.'
    };
    
    const key = [suit1, suit2].sort().join('-');
    return SUIT_RELATIONSHIPS[key] || '두 에너지가 상호작용하며 새로운 가능성을 만들어냅니다.';
  }
}
```

### 📈 해석 품질 향상 시스템

```typescript
interface InterpretationQuality {
  accuracy: number;      // 해석 정확도 (0-1)
  relevance: number;     // 질문과의 연관성 (0-1)
  coherence: number;     // 해석 간 일관성 (0-1)
  depth: number;         // 해석의 깊이 (0-1)
}

class InterpretationQualityChecker {
  assessQuality(interpretation: string, cards: SelectedCard[], question: string): InterpretationQuality {
    return {
      accuracy: this.checkAccuracy(interpretation, cards),
      relevance: this.checkRelevance(interpretation, question),
      coherence: this.checkCoherence(interpretation),
      depth: this.checkDepth(interpretation, cards)
    };
  }
  
  private checkAccuracy(interpretation: string, cards: SelectedCard[]): number {
    let score = 0;
    
    // 카드별 핵심 키워드가 포함되어 있는지 확인
    cards.forEach(card => {
      const keywords = card.isReversed ? card.card.reversedKeywords : card.card.uprightKeywords;
      const keywordMatches = keywords.filter(keyword => 
        interpretation.includes(keyword)).length;
      score += keywordMatches / keywords.length;
    });
    
    return Math.min(score / cards.length, 1);
  }
  
  private checkRelevance(interpretation: string, question: string): number {
    const questionCategory = this.categorizeQuestion(question);
    const categoryKeywords = CATEGORY_KEYWORDS[questionCategory];
    
    const relevantKeywords = categoryKeywords.filter(keyword =>
      interpretation.includes(keyword) || question.includes(keyword));
    
    return Math.min(relevantKeywords.length / 5, 1); // 최대 5개 키워드 기준
  }
}
```

---

## 6. AI 해석 엔진 설계

### 🤖 해석 생성 파이프라인

```typescript
class TarotInterpretationEngine {
  async generateInterpretation(
    cards: SelectedCard[],
    question: string,
    spreadType: string = 'three_card'
  ): Promise<InterpretationResult> {
    
    // 1. 질문 전처리 및 분석
    const questionAnalysis = await this.analyzeQuestion(question);
    
    // 2. 카드 데이터 로드 및 전처리
    const cardData = await this.loadCardData(cards);
    
    // 3. 컨텍스트 기반 해석 생성
    const baseInterpretation = await this.generateBaseInterpretation(
      cardData, questionAnalysis, spreadType
    );
    
    // 4. 카드 조합 분석 및 보강
    const combinationInsights = await this.analyzeCombinations(cards);
    
    // 5. 개인화 및 최종 편집
    const personalizedInterpretation = await this.personalizeInterpretation(
      baseInterpretation, combinationInsights, questionAnalysis
    );
    
    // 6. 품질 검증 및 개선
    const qualityScore = await this.assessQuality(personalizedInterpretation, cards, question);
    
    return {
      interpretation: personalizedInterpretation,
      confidence: qualityScore.accuracy,
      relevance: qualityScore.relevance,
      insights: combinationInsights,
      advice: await this.generateAdvice(cards, questionAnalysis)
    };
  }
  
  private async analyzeQuestion(question: string): Promise<QuestionAnalysis> {
    return {
      category: this.categorizeQuestion(question),
      emotion: await this.detectEmotion(question),
      urgency: this.detectUrgency(question),
      specificity: this.measureSpecificity(question),
      keywords: this.extractKeywords(question)
    };
  }
  
  private async generateBaseInterpretation(
    cardData: CardData[],
    questionAnalysis: QuestionAnalysis,
    spreadType: string
  ): Promise<string> {
    
    const templates = await this.loadInterpretationTemplates(spreadType);
    const selectedTemplate = this.selectTemplate(questionAnalysis.category, questionAnalysis.emotion);
    
    let interpretation = selectedTemplate.base;
    
    // 각 포지션별 해석 삽입
    cardData.forEach((card, index) => {
      const positionName = templates.positions[index].name;
      const cardMeaning = this.getContextualMeaning(card, questionAnalysis.category);
      
      interpretation = interpretation.replace(
        `{${positionName}}`,
        this.formatCardMeaning(cardMeaning, positionName)
      );
    });
    
    return interpretation;
  }
}

interface InterpretationResult {
  interpretation: string;
  confidence: number;
  relevance: number;
  insights: CombinationInsight[];
  advice: string;
}

interface QuestionAnalysis {
  category: QuestionCategory;
  emotion: EmotionType;
  urgency: UrgencyLevel;
  specificity: SpecificityLevel;
  keywords: string[];
}
```

### 📝 해석 템플릿 시스템

```typescript
interface InterpretationTemplate {
  id: string;
  category: QuestionCategory;
  emotion: EmotionType;
  base: string;
  connectors: string[];
  conclusion: string;
}

const INTERPRETATION_TEMPLATES: InterpretationTemplate[] = [
  {
    id: 'love_hopeful',
    category: QuestionCategory.LOVE,
    emotion: 'hopeful',
    base: `연애와 관계에 대한 당신의 질문에 카드들이 답을 주고 있습니다.

{past}는 과거 당신의 감정적 경험이 현재 상황에 어떤 영향을 미치고 있는지 보여줍니다. {present}는 현재 당신의 마음 상태와 관계의 현재 모습을 나타내며, {future}는 이 경로를 계속 걸어갈 때 나타날 가능성 있는 결과를 의미합니다.`,
    connectors: [
      '이러한 과거의 경험들이',
      '현재 상황에서는',
      '앞으로의 전망을 보면'
    ],
    conclusion: '마음을 열고 진실한 감정으로 다가간다면, 원하는 관계의 발전을 이룰 수 있을 것입니다.'
  },
  {
    id: 'career_ambitious',
    category: QuestionCategory.CAREER,
    emotion: 'ambitious',
    base: `직업과 진로에 대한 고민에 카드들이 명확한 방향을 제시하고 있습니다.

{past}는 지금까지의 경력과 경험이 현재 상황에 어떤 기반을 제공하고 있는지 보여줍니다. {present}는 현재 업무 환경과 당신의 역량 상태를 나타내며, {future}는 현재의 노력과 계획이 어떤 결과로 이어질지 예시합니다.`,
    connectors: [
      '이러한 경험들을 바탕으로',
      '현재 상황에서는',
      '미래의 가능성을 보면'
    ],
    conclusion: '목표를 명확히 하고 꾸준히 노력한다면, 원하는 성공을 거둘 수 있을 것입니다.'
  }
];
```

---

## 📋 데이터베이스 사용 가이드

### 🔧 개발팀 활용 방법

#### MVP 단계 (Phase 1)
```markdown
우선 구현할 데이터:
□ 메이저 아르카나 22장 기본 해석 (정방향만)
□ 5개 질문 카테고리별 해석
□ 기본 3카드 스프레드 해석 로직
□ 간단한 카드 조합 분석 (10-15개 조합)

데이터 구조:
- JSON 형태로 로컬 데이터 저장
- TypeScript 인터페이스로 타이핑
- 카드당 평균 200-300자 해석 텍스트
```

#### 확장 단계 (Phase 2)
```markdown
확장할 데이터:
□ 마이너 아르카나 56장 전체 해석
□ 역방향 해석 시스템
□ 고급 카드 조합 분석 (50+ 조합)
□ 다양한 스프레드 패턴 지원
□ 사용자 피드백 기반 해석 개선

고도화 기능:
- 실시간 해석 품질 분석
- 사용자 맞춤형 해석 스타일
- 머신러닝 기반 해석 개선
```

### 📊 품질 관리 체크리스트

```markdown
해석 품질 기준:
□ 각 카드의 전통적 의미 반영
□ 상황별 적절한 해석 제공
□ 긍정적이면서 현실적인 조언
□ 200-400자 적절한 길이
□ 이해하기 쉬운 한국어 표현
□ 면책조항 준수 (참고용임을 명시)

주기적 업데이트:
□ 사용자 피드백 반영
□ 해석 정확도 개선
□ 새로운 카드 조합 추가
□ 계절별 특별 해석 업데이트
```

이 데이터베이스를 활용하면 **정확하고 의미있는 AI 타로 해석 시스템**을 구축할 수 있습니다! 🔮✨