/**
 * 고급 자연어 처리 엔진
 * v2.0 Phase 1.1 - NLP 기본 구조
 */

export interface QuestionAnalysis {
  intent: QuestionIntent;
  emotion: EmotionState;
  complexity: ComplexityLevel;
  keywords: string[];
  entities: ExtractedEntity[];
  sentiment: SentimentScore;
  urgency: UrgencyLevel;
  timeframe: TimeframeContext;
  personalityMarkers: PersonalityMarker[];
}

export interface QuestionIntent {
  primary: IntentType;
  secondary?: IntentType;
  confidence: number;
  category: IntentCategory;
}

export interface EmotionState {
  primary: EmotionType;
  secondary?: EmotionType;
  intensity: number; // 0-1
  stability: number; // 0-1 (감정 안정성)
  progression: EmotionProgression;
}

export interface ExtractedEntity {
  text: string;
  type: EntityType;
  confidence: number;
  context: string;
}

export interface SentimentScore {
  polarity: number; // -1 to 1
  subjectivity: number; // 0 to 1
  confidence: number;
  aspects: AspectSentiment[];
}

export interface PersonalityMarker {
  trait: PersonalityTrait;
  strength: number; // 0-1
  evidence: string[];
}

export type IntentType = 
  | 'prediction' | 'guidance' | 'validation' | 'decision_support'
  | 'relationship_analysis' | 'self_understanding' | 'problem_solving'
  | 'emotional_support' | 'spiritual_guidance' | 'life_direction';

export type IntentCategory = 
  | 'personal_growth' | 'relationships' | 'career' | 'health' 
  | 'spirituality' | 'finances' | 'family' | 'creativity';

export type EmotionType = 
  | 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust'
  | 'anxiety' | 'hope' | 'confusion' | 'excitement' | 'calm'
  | 'frustration' | 'curiosity' | 'longing' | 'contentment';

export type EmotionProgression = 
  | 'stable' | 'escalating' | 'diminishing' | 'fluctuating' | 'transitioning';

export type ComplexityLevel = 'simple' | 'moderate' | 'complex' | 'multi_layered';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type TimeframeContext = 'past' | 'present' | 'future' | 'timeless';

export type EntityType = 
  | 'person' | 'relationship' | 'emotion' | 'goal' | 'fear' | 'desire'
  | 'place' | 'time' | 'event' | 'concept' | 'value';

export type PersonalityTrait = 
  | 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism'
  | 'optimism' | 'pessimism' | 'impulsivity' | 'analytical' | 'intuitive';

export interface AspectSentiment {
  aspect: string;
  sentiment: number;
  confidence: number;
}

/**
 * 고급 NLP 처리기 클래스
 */
export class AdvancedNLPProcessor {
  private readonly intentPatterns: Map<IntentType, RegExp[]>;
  private readonly emotionPatterns: Map<EmotionType, RegExp[]>;
  private readonly personalityIndicators: Map<PersonalityTrait, string[]>;
  private readonly entityPatterns: Map<EntityType, RegExp[]>;

  constructor() {
    this.intentPatterns = this.initializeIntentPatterns();
    this.emotionPatterns = this.initializeEmotionPatterns();
    this.personalityIndicators = this.initializePersonalityIndicators();
    this.entityPatterns = this.initializeEntityPatterns();
  }

  /**
   * 질문을 종합 분석
   */
  public async analyzeQuestion(question: string): Promise<QuestionAnalysis> {
    const cleanedQuestion = this.preprocessText(question);
    
    // 병렬 분석 실행
    const [
      intent,
      emotion,
      complexity,
      keywords,
      entities,
      sentiment,
      urgency,
      timeframe,
      personalityMarkers
    ] = await Promise.all([
      this.analyzeIntent(cleanedQuestion),
      this.analyzeEmotion(cleanedQuestion),
      this.analyzeComplexity(cleanedQuestion),
      this.extractKeywords(cleanedQuestion),
      this.extractEntities(cleanedQuestion),
      this.analyzeSentiment(cleanedQuestion),
      this.analyzeUrgency(cleanedQuestion),
      this.analyzeTimeframe(cleanedQuestion),
      this.analyzePersonality(cleanedQuestion)
    ]);

    return {
      intent,
      emotion,
      complexity,
      keywords,
      entities,
      sentiment,
      urgency,
      timeframe,
      personalityMarkers
    };
  }

  /**
   * 의도 분석
   */
  private async analyzeIntent(text: string): Promise<QuestionIntent> {
    const intentScores = new Map<IntentType, number>();
    
    // 패턴 매칭을 통한 의도 분석
    for (const [intent, patterns] of this.intentPatterns) {
      let score = 0;
      for (const pattern of patterns) {
        const matches = text.match(pattern);
        if (matches) {
          score += matches.length * 0.2;
        }
      }
      if (score > 0) {
        intentScores.set(intent, Math.min(score, 1.0));
      }
    }

    // 가장 높은 점수의 의도 찾기
    const sortedIntents = Array.from(intentScores.entries())
      .sort((a, b) => b[1] - a[1]);

    const primary = sortedIntents[0]?.[0] || 'guidance';
    const secondary = sortedIntents[1]?.[0];
    const confidence = sortedIntents[0]?.[1] || 0.5;

    return {
      primary,
      secondary,
      confidence,
      category: this.categorizeIntent(primary)
    };
  }

  /**
   * 감정 분석
   */
  private async analyzeEmotion(text: string): Promise<EmotionState> {
    const emotionScores = new Map<EmotionType, number>();
    
    // 감정 패턴 매칭
    for (const [emotion, patterns] of this.emotionPatterns) {
      let score = 0;
      for (const pattern of patterns) {
        const matches = text.match(pattern);
        if (matches) {
          score += matches.length * 0.15;
        }
      }
      if (score > 0) {
        emotionScores.set(emotion, Math.min(score, 1.0));
      }
    }

    // 감정 강도 계산
    const totalEmotionScore = Array.from(emotionScores.values())
      .reduce((sum, score) => sum + score, 0);
    const intensity = Math.min(totalEmotionScore, 1.0);

    // 주요 감정 추출
    const sortedEmotions = Array.from(emotionScores.entries())
      .sort((a, b) => b[1] - a[1]);

    const primary = sortedEmotions[0]?.[0] || 'curiosity';
    const secondary = sortedEmotions[1]?.[0];

    // 안정성 분석 (감정어의 일관성)
    const stability = this.calculateEmotionalStability(text, emotionScores);
    
    // 감정 진행 패턴
    const progression = this.analyzeEmotionProgression(text);

    return {
      primary,
      secondary,
      intensity,
      stability,
      progression
    };
  }

  /**
   * 복잡성 분석
   */
  private async analyzeComplexity(text: string): Promise<ComplexityLevel> {
    let complexityScore = 0;
    
    // 문장 길이
    if (text.length > 100) complexityScore += 0.2;
    if (text.length > 200) complexityScore += 0.2;
    
    // 접속사 사용
    const connectors = /그런데|하지만|그러나|그리고|또한|그래서|따라서|만약|만일/g;
    const connectorCount = (text.match(connectors) || []).length;
    complexityScore += Math.min(connectorCount * 0.1, 0.3);
    
    // 추상적 개념
    const abstractConcepts = /사랑|행복|성공|운명|미래|과거|인생|삶|마음|영혼/g;
    const abstractCount = (text.match(abstractConcepts) || []).length;
    complexityScore += Math.min(abstractCount * 0.1, 0.3);
    
    // 다중 질문
    const questionCount = (text.match(/\?/g) || []).length;
    if (questionCount > 1) complexityScore += 0.2;

    if (complexityScore < 0.3) return 'simple';
    if (complexityScore < 0.6) return 'moderate';
    if (complexityScore < 0.9) return 'complex';
    return 'multi_layered';
  }

  /**
   * 키워드 추출
   */
  private async extractKeywords(text: string): Promise<string[]> {
    // 한국어 불용어 제거
    const stopWords = new Set([
      '이', '가', '을', '를', '에', '에서', '로', '으로', '와', '과', '의', '은', '는',
      '하다', '되다', '있다', '없다', '같다', '다르다', '좋다', '나쁘다',
      '그', '이', '저', '그것', '이것', '저것', '무엇', '누구', '어디', '언제', '왜', '어떻게'
    ]);

    // 단어 추출 및 필터링
    const words = text
      .replace(/[^\w가-힣\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1 && !stopWords.has(word))
      .map(word => word.toLowerCase());

    // 빈도수 계산
    const frequency = new Map<string, number>();
    for (const word of words) {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    }

    // 상위 키워드 반환
    return Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  /**
   * 엔티티 추출
   */
  private async extractEntities(text: string): Promise<ExtractedEntity[]> {
    const entities: ExtractedEntity[] = [];

    for (const [entityType, patterns] of this.entityPatterns) {
      for (const pattern of patterns) {
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          entities.push({
            text: match[0],
            type: entityType,
            confidence: 0.8,
            context: this.extractContext(text, match.index || 0, match[0].length)
          });
        }
      }
    }

    return entities;
  }

  /**
   * 감정 분석 (감정 점수)
   */
  private async analyzeSentiment(text: string): Promise<SentimentScore> {
    // 긍정/부정 단어 패턴
    const positivePatterns = /좋|행복|기쁘|희망|사랑|성공|만족|즐거|평화|감사/g;
    const negativePatterns = /나쁘|슬프|걱정|불안|두려|실패|화|짜증|답답|힘들/g;

    const positiveCount = (text.match(positivePatterns) || []).length;
    const negativeCount = (text.match(negativePatterns) || []).length;

    const totalCount = positiveCount + negativeCount;
    const polarity = totalCount === 0 ? 0 : (positiveCount - negativeCount) / totalCount;

    // 주관성 분석 (개인적 감정 표현의 정도)
    const subjectivePatterns = /느끼|생각|바라|원하|싶|같|것 같|마음|기분/g;
    const subjectiveCount = (text.match(subjectivePatterns) || []).length;
    const subjectivity = Math.min(subjectiveCount / 10, 1.0);

    const confidence = Math.min((totalCount + subjectiveCount) / 10, 1.0);

    return {
      polarity,
      subjectivity,
      confidence,
      aspects: [] // 추후 구현
    };
  }

  /**
   * 긴급도 분석
   */
  private async analyzeUrgency(text: string): Promise<UrgencyLevel> {
    const urgentPatterns = /급하|빨리|당장|지금|즉시|긴급|중요|심각/g;
    const urgentCount = (text.match(urgentPatterns) || []).length;

    const timePatterns = /오늘|내일|이번주|곧|빨리/g;
    const timeCount = (text.match(timePatterns) || []).length;

    const totalUrgency = urgentCount + timeCount;

    if (totalUrgency >= 3) return 'critical';
    if (totalUrgency >= 2) return 'high';
    if (totalUrgency >= 1) return 'medium';
    return 'low';
  }

  /**
   * 시간 맥락 분석
   */
  private async analyzeTimeframe(text: string): Promise<TimeframeContext> {
    const pastPatterns = /과거|예전|전에|했던|이전|옛날/g;
    const presentPatterns = /현재|지금|요즘|오늘|이번|최근/g;
    const futurePatterns = /미래|앞으로|나중에|될|할|예정|계획/g;

    const pastCount = (text.match(pastPatterns) || []).length;
    const presentCount = (text.match(presentPatterns) || []).length;
    const futureCount = (text.match(futurePatterns) || []).length;

    const maxCount = Math.max(pastCount, presentCount, futureCount);

    if (maxCount === 0) return 'timeless';
    if (futureCount === maxCount) return 'future';
    if (presentCount === maxCount) return 'present';
    return 'past';
  }

  /**
   * 성격 분석
   */
  private async analyzePersonality(text: string): Promise<PersonalityMarker[]> {
    const markers: PersonalityMarker[] = [];

    for (const [trait, indicators] of this.personalityIndicators) {
      let strength = 0;
      const evidence: string[] = [];

      for (const indicator of indicators) {
        if (text.includes(indicator)) {
          strength += 0.2;
          evidence.push(indicator);
        }
      }

      if (strength > 0) {
        markers.push({
          trait,
          strength: Math.min(strength, 1.0),
          evidence
        });
      }
    }

    return markers.sort((a, b) => b.strength - a.strength);
  }

  // ===== 헬퍼 메소드들 =====

  private preprocessText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w가-힣\s\?!.]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private categorizeIntent(intent: IntentType): IntentCategory {
    const categoryMap: Record<IntentType, IntentCategory> = {
      'prediction': 'personal_growth',
      'guidance': 'personal_growth',
      'validation': 'personal_growth',
      'decision_support': 'personal_growth',
      'relationship_analysis': 'relationships',
      'self_understanding': 'personal_growth',
      'problem_solving': 'personal_growth',
      'emotional_support': 'personal_growth',
      'spiritual_guidance': 'spirituality',
      'life_direction': 'personal_growth'
    };
    
    return categoryMap[intent] || 'personal_growth';
  }

  private calculateEmotionalStability(text: string, emotions: Map<EmotionType, number>): number {
    // 감정의 일관성을 측정 (여러 상반된 감정이 동시에 나타나면 불안정)
    const positiveEmotions = ['joy', 'hope', 'excitement', 'contentment', 'calm'];
    const negativeEmotions = ['sadness', 'anger', 'fear', 'anxiety', 'frustration'];

    let positiveScore = 0;
    let negativeScore = 0;

    for (const [emotion, score] of emotions) {
      if (positiveEmotions.includes(emotion)) {
        positiveScore += score;
      } else if (negativeEmotions.includes(emotion)) {
        negativeScore += score;
      }
    }

    // 감정이 한 쪽으로 치우칠수록 안정적
    const totalScore = positiveScore + negativeScore;
    if (totalScore === 0) return 0.5;

    const imbalance = Math.abs(positiveScore - negativeScore) / totalScore;
    return imbalance;
  }

  private analyzeEmotionProgression(text: string): EmotionProgression {
    // 감정 변화 패턴 분석
    if (text.includes('점점') || text.includes('더욱') || text.includes('갈수록')) {
      return 'escalating';
    }
    if (text.includes('줄어') || text.includes('사라') || text.includes('가라앉')) {
      return 'diminishing';
    }
    if (text.includes('바뀌') || text.includes('변하') || text.includes('달라')) {
      return 'transitioning';
    }
    if (text.includes('때로는') || text.includes('가끔') || text.includes('오락가락')) {
      return 'fluctuating';
    }
    return 'stable';
  }

  private extractContext(text: string, startIndex: number, length: number): string {
    const contextStart = Math.max(0, startIndex - 20);
    const contextEnd = Math.min(text.length, startIndex + length + 20);
    return text.substring(contextStart, contextEnd);
  }

  // ===== 패턴 초기화 메소드들 =====

  private initializeIntentPatterns(): Map<IntentType, RegExp[]> {
    return new Map([
      ['prediction', [/될까|될지|될 것|예상|예측|전망/gi]],
      ['guidance', [/어떻게|방법|조언|도움|가이드|알려|추천/gi]],
      ['validation', [/맞나|옳나|괜찮|확신|검증|판단/gi]],
      ['decision_support', [/선택|결정|고민|망설|어느|선택지/gi]],
      ['relationship_analysis', [/관계|사이|상대방|연인|친구|가족/gi]],
      ['self_understanding', [/나는|내가|자신|정체성|성격|특징/gi]],
      ['problem_solving', [/문제|해결|방법|답|해법|풀어/gi]],
      ['emotional_support', [/힘들|어려|슬프|우울|외로|지쳐/gi]],
      ['spiritual_guidance', [/영적|정신적|종교|신앙|깨달음|의미/gi]],
      ['life_direction', [/인생|삶|진로|목표|꿈|방향|미래/gi]]
    ]);
  }

  private initializeEmotionPatterns(): Map<EmotionType, RegExp[]> {
    return new Map([
      ['joy', [/기쁘|즐거|행복|좋|만족|감사|웃/gi]],
      ['sadness', [/슬프|우울|눈물|아프|상심|낙담/gi]],
      ['anger', [/화|짜증|분노|억울|열받|답답/gi]],
      ['fear', [/두렵|무서|걱정|불안|공포|떨/gi]],
      ['anxiety', [/불안|초조|조급|걱정|긴장|스트레스/gi]],
      ['hope', [/희망|기대|바라|원하|꿈|소망/gi]],
      ['confusion', [/헷갈|모르겠|애매|불분명|혼란|잘 모르/gi]],
      ['excitement', [/설레|흥미|신나|열정|기대/gi]],
      ['calm', [/평온|차분|안정|고요|평화/gi]],
      ['frustration', [/답답|막막|갑갑|짜증|지쳐/gi]],
      ['curiosity', [/궁금|알고 싶|관심|흥미/gi]],
      ['longing', [/그리|보고 싶|그립|리운/gi]]
    ]);
  }

  private initializePersonalityIndicators(): Map<PersonalityTrait, string[]> {
    return new Map([
      ['openness', ['새로운', '창의적', '상상', '예술', '문화', '경험']],
      ['conscientiousness', ['계획', '조직적', '꼼꼼', '성실', '책임감', '목표']],
      ['extraversion', ['사람들', '모임', '사교적', '활발', '에너지', '외향']],
      ['agreeableness', ['친절', '배려', '이해', '협력', '도움', '착한']],
      ['neuroticism', ['불안', '걱정', '스트레스', '예민', '변덕', '감정적']],
      ['optimism', ['긍정적', '희망적', '밝은', '좋을 것', '잘 될']],
      ['pessimism', ['부정적', '걱정', '안 될', '실패', '나쁠']],
      ['analytical', ['분석', '논리적', '이성적', '체계적', '객관적']],
      ['intuitive', ['직감', '느낌', '감각', '본능적', '마음']]
    ]);
  }

  private initializeEntityPatterns(): Map<EntityType, RegExp[]> {
    return new Map([
      ['person', [/남자친구|여자친구|연인|배우자|가족|친구|동료|상사|부모|자식/gi]],
      ['emotion', [/사랑|행복|슬픔|분노|두려움|기쁨|불안|희망/gi]],
      ['goal', [/목표|꿈|계획|야망|소망|바람/gi]],
      ['time', [/오늘|내일|다음주|다음달|내년|과거|미래|현재/gi]],
      ['place', [/집|회사|학교|직장|고향|서울|부산/gi]]
    ]);
  }
}

export const nlpProcessor = new AdvancedNLPProcessor();