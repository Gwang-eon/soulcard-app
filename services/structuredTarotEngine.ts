/**
 * 구조화된 타로 해석 엔진
 * v2.2 - 일관성 있고 체계적인 전문가급 해석 시스템
 * 
 * AI에 의존하지 않고도 일관된 고품질 해석을 제공하는 탄탄한 엔진
 */

import { TarotCard, SelectedCard, Category, SpreadType } from '../types/tarot';

// 카드별 핵심 해석 데이터베이스
interface CardCoreInterpretation {
  symbolism: {
    primary: string[];      // 주요 상징
    secondary: string[];    // 부차적 상징
    numerology: string;     // 수비학적 의미
    astrology?: string;     // 점성술적 연결
  };
  
  psychological: {
    archetype: string;      // 융 원형
    shadow: string;         // 그림자 측면
    persona: string;        // 페르소나 측면
    anima_animus?: string;  // 아니마/아니무스
  };
  
  lifeLessons: {
    spiritual: string;      // 영적 교훈
    emotional: string;      // 감정적 성장
    practical: string;      // 실용적 교훈
    karmic?: string;        // 카르마적 의미
  };
  
  manifestation: {
    internal: string[];     // 내적 발현
    external: string[];     // 외적 발현
    timing: string;         // 시기적 의미
    duration: string;       // 지속성
  };
}

// 카드 조합 분석 데이터베이스
interface CardCombinationPattern {
  pattern: string[];          // 카드 조합 패턴
  synergy: string;           // 시너지 효과
  tension: string;           // 긴장/갈등
  evolution: string;         // 발전 방향
  warning: string;           // 주의사항
}

// 질문 카테고리별 해석 프레임워크
interface CategoryFramework {
  focusAreas: string[];      // 집중 영역
  keyQuestions: string[];    // 핵심 질문들
  actionAreas: string[];     // 행동 영역
  timingFactors: string[];   // 시기 요소
}

export class StructuredTarotEngine {
  private static instance: StructuredTarotEngine;
  
  // 카드별 핵심 해석 데이터베이스
  private cardDatabase: Map<string, CardCoreInterpretation> = new Map();
  
  // 카드 조합 패턴 데이터베이스
  private combinationPatterns: CardCombinationPattern[] = [];
  
  // 카테고리별 해석 프레임워크
  private categoryFrameworks: Map<Category, CategoryFramework> = new Map();
  
  private constructor() {
    this.initializeCardDatabase();
    this.initializeCombinationPatterns();
    this.initializeCategoryFrameworks();
  }
  
  public static getInstance(): StructuredTarotEngine {
    if (!StructuredTarotEngine.instance) {
      StructuredTarotEngine.instance = new StructuredTarotEngine();
    }
    return StructuredTarotEngine.instance;
  }

  /**
   * 구조화된 종합 해석 생성 (2,500-4,000자, 일관된 품질)
   */
  generateStructuredReading(
    cards: SelectedCard[],
    question: string,
    category: Category,
    spreadType: SpreadType
  ): string {
    console.log(`🏗️ 구조화된 타로 해석 시작: ${spreadType} - ${question}`);
    
    // 1단계: 질문 분석 및 프레임워크 설정
    const framework = this.categoryFrameworks.get(category)!;
    const questionContext = this.analyzeQuestionContext(question, category);
    
    // 2단계: 카드별 심층 해석 생성
    const cardAnalyses = cards.map((card, index) => 
      this.generateDetailedCardAnalysis(card, index, spreadType, framework, questionContext)
    );
    
    // 3단계: 카드 조합 패턴 분석
    const combinationAnalysis = this.analyzeCombinationPatterns(cards, framework);
    
    // 4단계: 시간적 흐름 분석 (스프레드별)
    const temporalAnalysis = this.analyzeTemporalFlow(cards, spreadType, questionContext);
    
    // 5단계: 심층 통찰 생성
    const deepInsights = this.generateDeepInsights(cards, question, category, framework);
    
    // 6단계: 실용적 가이드라인 생성
    const practicalGuidance = this.generatePracticalGuidance(cards, category, framework, questionContext);
    
    // 7단계: 종합적 포맷팅
    return this.formatStructuredReading({
      question,
      spreadType,
      category,
      cards,
      framework,
      questionContext,
      cardAnalyses,
      combinationAnalysis,
      temporalAnalysis,
      deepInsights,
      practicalGuidance
    });
  }

  /**
   * 질문 맥락 분석
   */
  private analyzeQuestionContext(question: string, category: Category) {
    const lowerQ = question.toLowerCase();
    
    return {
      urgency: this.determineUrgency(lowerQ),
      emotionalTone: this.determineEmotionalTone(lowerQ),
      timeframe: this.determineTimeframe(lowerQ),
      complexity: this.determineComplexity(lowerQ),
      decisionType: this.determineDecisionType(lowerQ, category)
    };
  }

  private determineUrgency(question: string): 'immediate' | 'near_term' | 'long_term' {
    if (question.includes('지금') || question.includes('오늘') || question.includes('당장')) return 'immediate';
    if (question.includes('이번주') || question.includes('이번달') || question.includes('곧')) return 'near_term';
    return 'long_term';
  }

  private determineEmotionalTone(question: string): 'anxious' | 'hopeful' | 'neutral' | 'desperate' | 'curious' {
    if (question.includes('불안') || question.includes('걱정') || question.includes('두려워')) return 'anxious';
    if (question.includes('기대') || question.includes('희망') || question.includes('좋아질')) return 'hopeful';
    if (question.includes('모르겠') || question.includes('헷갈') || question.includes('답답')) return 'desperate';
    if (question.includes('궁금') || question.includes('어떨까') || question.includes('알고싶')) return 'curious';
    return 'neutral';
  }

  private determineTimeframe(question: string): 'past_focused' | 'present_focused' | 'future_focused' {
    if (question.includes('왜') || question.includes('원인') || question.includes('어떻게 되었')) return 'past_focused';
    if (question.includes('지금') || question.includes('현재') || question.includes('어떤 상태')) return 'present_focused';
    return 'future_focused';
  }

  private determineComplexity(question: string): 'simple' | 'moderate' | 'complex' {
    const questionLength = question.length;
    const hasMultipleConcepts = (question.match(/그리고|또한|그런데|하지만/g) || []).length > 0;
    
    if (questionLength > 50 || hasMultipleConcepts) return 'complex';
    if (questionLength > 20) return 'moderate';
    return 'simple';
  }

  private determineDecisionType(question: string, category: Category): string {
    if (category === 'love') {
      if (question.includes('고백') || question.includes('만나')) return 'romantic_action';
      if (question.includes('헤어') || question.includes('이별')) return 'relationship_ending';
      return 'relationship_general';
    }
    
    if (category === 'career') {
      if (question.includes('이직') || question.includes('직장')) return 'career_change';
      if (question.includes('사업') || question.includes('창업')) return 'business_decision';
      return 'career_general';
    }
    
    return 'life_general';
  }

  /**
   * 상세 카드 분석
   */
  private generateDetailedCardAnalysis(
    card: SelectedCard,
    position: number,
    spreadType: SpreadType,
    framework: CategoryFramework,
    context: any
  ) {
    const cardData = this.cardDatabase.get(card.card.koreanName);
    const positionName = this.getPositionName(position, spreadType);
    const orientation = card.isReversed ? 'reversed' : 'upright';
    
    return {
      cardName: card.card.koreanName,
      position: positionName,
      orientation,
      
      // 핵심 상징 분석
      symbolism: this.analyzeSymbolism(card, cardData, context),
      
      // 심리학적 분석
      psychological: this.analyzePsychological(card, cardData, framework),
      
      // 영적/카르마적 의미
      spiritual: this.analyzeSpiritual(card, cardData, context),
      
      // 실용적 발현
      manifestation: this.analyzeManifestation(card, cardData, framework, context),
      
      // 시기와 타이밍
      timing: this.analyzeTiming(card, cardData, context),
      
      // 행동 지침
      actionGuidance: this.generateCardActionGuidance(card, cardData, framework, context)
    };
  }

  private analyzeSymbolism(card: SelectedCard, cardData: CardCoreInterpretation | undefined, context: any): string {
    if (!cardData) {
      // 기본 카드 해석을 더 자연스럽고 개인적으로 표현
      const basicInterpretation = this.getBasicCardInterpretation(card);
      const personalTone = this.getPersonalizedTone(card, context);
      
      return `${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}이 나타났네요. ${personalTone.opener} ${basicInterpretation.keywords.slice(0, 2).join('과 ')}\uc758 \uc5d0\ub108\uc9c0\uac00 ${card.isReversed ? '\ub0b4\uba74\uc5d0\uc11c \uc870\uc6a9\ud788 \uc791\uc6a9\ud558\uace0 \uc788\uc5b4\uc694' : '\uac15\ud558\uac8c \ub4dc\ub7ec\ub098\uace0 \uc788\uc5b4\uc694'}. ${this.addPersonalContext(basicInterpretation.meaning, context)}`;
    }
    
    const symbols = card.isReversed ? 
      `${cardData.symbolism.secondary.join(', ')}의 측면이 강조되며, ${cardData.symbolism.primary[0]}의 에너지가 내향적으로 작용합니다.` :
      `${cardData.symbolism.primary.join(', ')}의 상징이 선명하게 드러나며, ${cardData.symbolism.numerology}의 의미가 활성화됩니다.`;
    
    return `${symbols} 현재 ${context.emotionalTone === 'anxious' ? '불안한 상황에서' : '상황에서'} 이 상징들이 특별한 의미를 갖습니다.`;
  }

  private analyzePsychological(card: SelectedCard, cardData: CardCoreInterpretation | undefined, framework: CategoryFramework): string {
    if (!cardData) {
      const basicInterpretation = this.getBasicCardInterpretation(card);
      const psychMessages = {
        positive: '지금 마음이 열려 있고 새로운 것을 받아들일 준비가 되어 있네요.',
        challenging: '내면에 어려움이 있지만, 이를 통해 더 깊은 성장을 할 수 있어요.',
        neutral: '지금은 균형을 찾아가는 시기인 것 같아요.'
      };
      const msgType = card.isReversed ? 'challenging' : (basicInterpretation.keywords.some(k => k.includes('기쁨') || k.includes('성공')) ? 'positive' : 'neutral');
      return `마음 상태를 보면 ${basicInterpretation.keywords.slice(0, 2).join('과 ')}의 에너지를 느끼고 있어요. ${psychMessages[msgType]}`;
    }
    
    const archetype = card.isReversed ? 
      `${cardData.psychological.shadow}의 그림자 측면이 활성화되어, 내면의 ${cardData.psychological.archetype}와 대화할 필요가 있습니다.` :
      `${cardData.psychological.archetype}의 원형이 활성화되어, ${cardData.psychological.persona}의 측면을 통해 세상과 만나고 있습니다.`;
    
    return archetype;
  }

  private analyzeSpiritual(card: SelectedCard, cardData: CardCoreInterpretation | undefined, context: any): string {
    if (!cardData) {
      const spiritualMessages = [
        '이 경험이 당신의 영혼을 더 성숙하게 만들어줄 거예요.',
        '지금은 내면의 지혜에 귀 기울일 때인 것 같아요.',
        '우주가 당신에게 중요한 메시지를 보내고 있네요.',
        '이 모든 일들이 당신의 영적 성장을 위해 일어나고 있어요.'
      ];
      const randomMessage = spiritualMessages[Math.floor(Math.random() * spiritualMessages.length)];
      return `${card.card.koreanName}이 영적으로 전하는 바는, ${card.isReversed ? '내면을 들여다보며 진정한 자신을 찾아가는' : '새로운 깨달음과 성장의'} 시기라는 거예요. ${randomMessage}`;
    }
    
    const lesson = card.isReversed ?
      `${cardData.lifeLessons.emotional}을 통해 내면의 성장이 필요한 시기입니다. ${cardData.lifeLessons.spiritual}의 교훈이 역방향으로 나타나 더 깊은 성찰을 요구하고 있습니다.` :
      `${cardData.lifeLessons.spiritual}의 교훈이 현재 상황에서 핵심적인 역할을 합니다. ${cardData.lifeLessons.practical}을 실천할 때입니다.`;
    
    return lesson;
  }

  private analyzeManifestation(card: SelectedCard, cardData: CardCoreInterpretation | undefined, framework: CategoryFramework, context: any): string {
    if (!cardData) {
      const basicInterpretation = this.getBasicCardInterpretation(card);
      const manifestationPhrases = [
        '일상에서 느끼게 될',
        '삶에서 경험하게 될',
        '현실에서 마주치게 될',
        '일상 속에서 만나게 될'
      ];
      const phrase = manifestationPhrases[Math.floor(Math.random() * manifestationPhrases.length)];
      return `앞으로 ${phrase} 변화는 주로 ${basicInterpretation.keywords[0]}과 관련된 것들이에요. ${card.isReversed ? '갉작스럽게 드러나기보다는 점진적으로 느끼실 수 있을 거예요' : '비교적 명확하게 나타날 것 같아요'}. ${framework.focusAreas[0]} 부분에서 특히 중요하게 작용할 거예요.`;
    }
    
    const manifestation = card.isReversed ?
      `내적으로는 ${cardData.manifestation.internal.join(', ')}의 경험을 하고 있지만, 외적으로는 아직 ${cardData.manifestation.external[0]}로 드러나지 않고 있습니다.` :
      `${cardData.manifestation.external.join(', ')}의 형태로 외적 변화가 나타나며, 내적으로는 ${cardData.manifestation.internal[0]}의 경험을 하게 됩니다.`;
    
    return `${manifestation} 이러한 변화는 ${cardData.manifestation.timing}에 걸쳐 ${cardData.manifestation.duration} 지속될 것으로 보입니다.`;
  }

  private analyzeTiming(card: SelectedCard, cardData: CardCoreInterpretation | undefined, context: any): string {
    if (!cardData) {
      const timingHint = card.card.timing ? card.card.timing.shortTerm : '가까운 시일 내';
      return `${timingHint}에 ${card.card.koreanName}의 에너지가 ${card.isReversed ? '내적으로 작용하여' : '외적으로 나타나'} 중요한 변화를 가져올 것입니다.`;
    }
    
    const urgencyText = context.urgency === 'immediate' ? '즉시' : 
                       context.urgency === 'near_term' ? '가까운 시일 내에' : '장기적으로';
    
    return `${urgencyText} ${cardData.manifestation.timing}의 시기에 ${card.isReversed ? '내적 변화가' : '외적 변화가'} 일어날 것으로 예상됩니다.`;
  }

  private getBasicCardInterpretation(card: SelectedCard): { keywords: string[], meaning: string } {
    const cardData = card.card;
    const isReversed = card.isReversed;
    
    const keywords = isReversed ? cardData.reversedKeywords : cardData.uprightKeywords;
    const meaning = isReversed ? 
      cardData.interpretations.reversed.general :
      cardData.interpretations.upright.general;
    
    return { keywords, meaning };
  }

  private getPersonalizedTone(card: SelectedCard, context: any): { opener: string, connector: string } {
    const openers = [
      '현재 상황을 보면',
      '카드가 보여주는 바로는',
      '지금 이 시점에서',
      '당신의 에너지 상태를 보면',
      '현재 흐르고 있는 기운은'
    ];
    
    const connectors = [
      '이는 당신에게',
      '이 상황에서',
      '지금 단계에서는',
      '현재로서는'
    ];
    
    return {
      opener: openers[Math.floor(Math.random() * openers.length)],
      connector: connectors[Math.floor(Math.random() * connectors.length)]
    };
  }

  private addPersonalContext(meaning: string, context: any): string {
    // 원래 해석을 더 개인적이고 따뜻한 톤으로 변환
    const personalizedMeaning = meaning
      .replace(/입니다\./g, '이에요.')
      .replace(/합니다\./g, '해요.')
      .replace(/됩니다\./g, '돼요.')
      .replace(/있습니다\./g, '있어요.');
    
    const encouragements = [
      '걱정하지 마세요, 이런 시기는 누구에게나 있어요.',
      '모든 경험이 당신을 더 강하게 만들어줄 거예요.',
      '지금은 조금 힘들어도 분명 좋은 방향으로 흘러갈 거예요.',
      '당신의 직감을 믿고 한 걸음씩 나아가 보세요.'
    ];
    
    return personalizedMeaning + ' ' + encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  private generateOpeningMessage(cards: SelectedCard[], question: string): string {
    const energyWords = ['변화', '성장', '도전', '기회', '전환', '발전'];
    const selectedEnergy = energyWords[Math.floor(Math.random() * energyWords.length)];
    
    const openings = [
      `먼저 카드들을 보면서 느낀 첫 인상을 말씀드릴게요. 전체적으로 ${selectedEnergy}의 에너지가 매우 강하게 느껴지는 스프레드네요.`,
      `카드들을 펼쳐보니 정말 흥미로운 이야기가 담겨있어요. 지금 당신에게는 ${selectedEnergy}와 관련된 중요한 시기가 다가오고 있는 것 같아요.`,
      `오늘 나온 카드들을 보면, 현재 당신의 상황이 ${selectedEnergy}의 큰 흐름 속에 있다는 걸 알 수 있어요.`
    ];
    
    return openings[Math.floor(Math.random() * openings.length)] + ' 특히 과거에서 현재로, 그리고 미래로 이어지는 흐름이 뚜렷하게 보입니다.';
  }

  private generateCardStoryNarrative(cards: SelectedCard[], spreadType: string, question: string): string {
    if (!cards || cards.length === 0) {
      return '## 🎴 카드 정보를 불러오는 중입니다...';
    }
    
    if (spreadType === 'celtic_cross' && cards.length >= 10) {
      return this.generateCelticCrossNarrative(cards, question);
    } else if (spreadType === 'past_present_future' && cards.length >= 3) {
      return this.generateThreeCardNarrative(cards, question);
    } else if (cards.length >= 1) {
      return this.generateSingleCardNarrative(cards[0], question);
    } else {
      return '## 🎴 카드를 준비하는 중입니다...';
    }
  }

  private generateCelticCrossNarrative(cards: SelectedCard[], question: string): string {
    const [present, challenge, past, future, outcome, recent, approach, external, hopes, final] = cards;
    
    return `## 🎴 현재 당신의 상황

**중앙에 놓인 카드: ${present.card.koreanName}${present.isReversed ? ' (역방향)' : ''}**

${this.generatePersonalizedCardReading(present, '현재')}

## 🎯 현재 직면한 도전

**위쪽 카드: ${challenge.card.koreanName}${challenge.isReversed ? ' (역방향)' : ''}**

${this.generatePersonalizedCardReading(challenge, '도전')}

## 🌅 과거가 주는 힘

**왼쪽 카드: ${past.card.koreanName}${past.isReversed ? ' (역방향)' : ''}**

${this.generatePersonalizedCardReading(past, '과거')}

## 🚀 다가오는 변화

**오른쪽 카드: ${future.card.koreanName}${future.isReversed ? ' (역방향)' : ''}**

${this.generatePersonalizedCardReading(future, '미래')}

## 💫 가능한 결과

**아래쪽 카드: ${outcome.card.koreanName}${outcome.isReversed ? ' (역방향)' : ''}**

${this.generatePersonalizedCardReading(outcome, '결과')}

## 🌟 조언 카드들

### 최근의 경험 (${recent.card.koreanName}${recent.isReversed ? ' 역방향' : ''})
${this.generatePersonalizedCardReading(recent, '최근')}

### 당신의 접근 방식 (${approach.card.koreanName}${approach.isReversed ? ' 역방향' : ''})
${this.generatePersonalizedCardReading(approach, '접근')}

### 주변의 영향 (${external.card.koreanName}${external.isReversed ? ' 역방향' : ''})
${this.generatePersonalizedCardReading(external, '외부')}

### 내면의 걱정 (${hopes.card.koreanName}${hopes.isReversed ? ' 역방향' : ''})
${this.generatePersonalizedCardReading(hopes, '희망')}

## 🎯 최종 결과

**마지막 카드: ${final.card.koreanName}${final.isReversed ? ' (역방향)' : ''}**

${this.generatePersonalizedCardReading(final, '최종')}`;
  }

  private generatePersonalizedCardReading(card: SelectedCard, position: string): string {
    const basicInterpretation = this.getBasicCardInterpretation(card);
    const personalizedMessages = this.getPersonalizedMessages(card, position);
    
    return `${personalizedMessages.situation} ${personalizedMessages.insight} ${personalizedMessages.encouragement}`;
  }

  private getPersonalizedMessages(card: SelectedCard, position: string): { situation: string, insight: string, encouragement: string } {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    // 위치별 맞춤 메시지 생성
    const situationTemplates: { [key: string]: string[] } = {
      '현재': [
        `지금 당신의 마음 상태를 보니, ${isReversed ? '조금 복잡하고 힘드셨을 것 같아요' : '긍정적인 에너지가 흐르고 있어요'}.`,
        `현재 상황을 보면 ${cardName}의 에너지가 ${isReversed ? '내면에서 조용히 작용하고' : '강하게 드러나고'} 있어요.`
      ],
      '도전': [
        `재미있게도 당신이 직면한 도전이 사실은 '${cardName}'과 관련된 거네요.`,
        `${cardName}이 나왔다는 것은 ${isReversed ? '내적인 성찰이 필요한' : '새로운 기회가 주어지는'} 시기라는 뜻이에요.`
      ],
      '과거': [
        `하지만 과거를 보면 정말 든든해요! ${cardName} 카드가 나왔거든요.`,
        `과거의 ${cardName} 경험이 지금의 당신을 뒷받침하고 있어요.`
      ],
      '미래': [
        `앞으로 다가올 변화를 보면 ${cardName}의 에너지가 중요한 역할을 할 것 같아요.`,
        `미래에는 ${cardName}이 가져다주는 ${isReversed ? '내적 성찰' : '외적 변화'}가 기다리고 있어요.`
      ],
      '결과': [
        `최종적으로는 ${cardName}이 보여주는 결과로 이어질 것 같아요.`,
        `결국 ${cardName}의 에너지가 ${isReversed ? '조용히 내면에서' : '명확하게 현실에서'} 나타날 거예요.`
      ],
      '최근': [
        `최근에 ${cardName}과 관련된 경험을 하셨을 것 같아요.`,
        `근래에 ${cardName}의 에너지를 ${isReversed ? '내적으로 느끼셨거나' : '외적으로 경험하셨을'} 거예요.`
      ],
      '접근': [
        `이 상황에 대한 당신의 접근 방식은 ${cardName}의 특성을 보여주고 있어요.`,
        `${cardName}이 나타내는 방식으로 상황에 접근하고 계시는군요.`
      ],
      '외부': [
        `주변 환경이나 타인들이 ${cardName}의 에너지를 통해 영향을 주고 있어요.`,
        `외부에서 오는 영향이 ${cardName}의 특성을 띠고 있네요.`
      ],
      '희망': [
        `마음 한편으로는 ${cardName}과 관련된 기대나 걱정이 있으신 것 같아요.`,
        `내면 깊은 곳의 바람이나 두려움이 ${cardName}을 통해 드러나고 있어요.`
      ],
      '최종': [
        `최종적으로는 ${cardName}이 제시하는 방향으로 흘러갈 것 같아요.`,
        `마지막에는 ${cardName}의 메시지가 실현될 거예요.`
      ],
      '핵심': [
        `핵심적으로 ${cardName}이 당신에게 전하고자 하는 메시지가 있어요.`,
        `가장 중요한 것은 ${cardName}이 보여주는 이 에너지예요.`
      ]
    };
    
    const templates = situationTemplates[position];
    const situation = templates ? templates[Math.floor(Math.random() * templates.length)] : 
      `${cardName}${isReversed ? ' 역방향' : ''}이 ${position} 위치에 나왔네요.`;
    
    const insights = [
      `이는 당신에게 중요한 의미를 갖고 있어요.`,
      `이 상황이 당신의 성장에 큰 도움이 될 거예요.`,
      `지금이 바로 변화의 적절한 시기인 것 같아요.`
    ];
    
    const encouragements = [
      `걱정하지 마세요, 모든 것이 좋은 방향으로 흘러갈 거예요.`,
      `당신에게는 이 상황을 잘 헤쳐나갈 충분한 힘이 있어요.`,
      `이 경험을 통해 더욱 성숙해질 수 있을 거예요.`
    ];
    
    return {
      situation,
      insight: insights[Math.floor(Math.random() * insights.length)],
      encouragement: encouragements[Math.floor(Math.random() * encouragements.length)]
    };
  }

  private generateCardActionGuidance(card: SelectedCard, cardData: CardCoreInterpretation | undefined, framework: CategoryFramework, context: any): string[] {
    if (!cardData) {
      const basicInterpretation = this.getBasicCardInterpretation(card);
      const advice = card.isReversed ? card.card.advice.reversed : card.card.advice.upright;
      return [advice.action, advice.focus, advice.avoid];
    }
    
    const baseActions = framework.actionAreas.slice(0, 2);
    const specificAction = card.isReversed ? 
      `${cardData.lifeLessons.emotional}을 위한 내적 작업` :
      `${cardData.lifeLessons.practical}의 구체적 실천`;
    
    return [specificAction, ...baseActions];
  }

  /**
   * 카드 조합 패턴 분석
   */
  private analyzeCombinationPatterns(cards: SelectedCard[], framework: CategoryFramework) {
    const cardNames = cards.map(c => c.card.koreanName);
    
    // 기존 패턴 데이터베이스에서 매칭 찾기
    const matchedPattern = this.combinationPatterns.find(pattern => 
      this.isPatternMatch(cardNames, pattern.pattern)
    );
    
    if (matchedPattern) {
      return {
        patternType: '알려진 조합 패턴',
        synergy: matchedPattern.synergy,
        tension: matchedPattern.tension,
        evolution: matchedPattern.evolution,
        warning: matchedPattern.warning
      };
    }
    
    // 동적 패턴 분석
    return this.analyzeDynamicPattern(cards, framework);
  }

  private isPatternMatch(cardNames: string[], pattern: string[]): boolean {
    return pattern.every(patternCard => 
      cardNames.some(cardName => cardName.includes(patternCard))
    );
  }

  private analyzeDynamicPattern(cards: SelectedCard[], framework: CategoryFramework) {
    const reversedCount = cards.filter(c => c.isReversed).length;
    const totalCards = cards.length;
    
    const reversedRatio = reversedCount / totalCards;
    
    if (reversedRatio === 0) {
      return {
        patternType: '순방향 조화 패턴',
        synergy: '모든 카드가 외향적 에너지로 조화롭게 작용하여 명확한 방향성을 제시합니다.',
        tension: '너무 성급한 진행으로 인한 균형 상실의 위험이 있습니다.',
        evolution: '단계적이고 꾸준한 외적 발전을 통해 성장할 수 있습니다.',
        warning: '내적 성찰과 균형을 잃지 않도록 주의가 필요합니다.'
      };
    } else if (reversedRatio === 1) {
      return {
        patternType: '역방향 심화 패턴',
        synergy: '모든 카드가 내향적 에너지로 작용하여 깊은 내적 변화와 성찰을 촉진합니다.',
        tension: '외적 행동과 변화가 지연되거나 어려울 수 있습니다.',
        evolution: '내면의 깊은 변화를 통해 근본적인 성장을 이루게 됩니다.',
        warning: '현실적 행동과 실천을 소홀히 하지 않도록 주의해야 합니다.'
      };
    } else {
      return {
        patternType: '균형 복합 패턴',
        synergy: '내적 성찰과 외적 행동이 균형을 이루며 상호 보완적으로 작용합니다.',
        tension: '내외적 에너지 사이에서 우선순위를 정하는 것이 과제입니다.',
        evolution: '내적 성장과 외적 변화를 조화롭게 진행할 수 있는 기회입니다.',
        warning: '한쪽으로 치우치지 않고 균형을 유지하는 것이 중요합니다.'
      };
    }
  }

  /**
   * 시간적 흐름 분석
   */
  private analyzeTemporalFlow(cards: SelectedCard[], spreadType: SpreadType, context: any) {
    if (spreadType === 'past_present_future' && cards.length === 3) {
      return this.analyzeThreeCardFlow(cards, context);
    } else if (spreadType === 'celtic_cross' && cards.length === 10) {
      return this.analyzeCelticCrossFlow(cards, context);
    } else {
      return this.analyzeGeneralFlow(cards, context);
    }
  }

  private analyzeThreeCardFlow(cards: SelectedCard[], context: any) {
    const [past, present, future] = cards;
    
    return {
      pastInfluence: `과거의 ${past.card.koreanName}${past.isReversed ? ' 역방향' : ''}이 현재 상황의 ${context.emotionalTone === 'anxious' ? '불안감' : '동기'}에 깊은 영향을 미치고 있습니다.`,
      presentDynamics: `현재의 ${present.card.koreanName}${present.isReversed ? ' 역방향' : ''}은 ${context.timeframe}적 관점에서 핵심적인 전환점을 나타냅니다.`,
      futureTrajectory: `미래의 ${future.card.koreanName}${future.isReversed ? ' 역방향' : ''}은 현재의 선택에 따라 ${context.urgency}하게 현실화될 가능성을 보여줍니다.`,
      temporalAdvice: '과거의 교훈을 바탕으로 현재의 기회를 활용하여 원하는 미래를 창조할 수 있는 시점입니다.'
    };
  }

  private analyzeGeneralFlow(cards: SelectedCard[], context: any) {
    const progression = cards.map((card, index) => 
      `${index + 1}단계: ${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}의 에너지`
    ).join(' → ');
    
    return {
      pastInfluence: '과거의 경험들이 현재 상황의 배경을 형성하고 있습니다.',
      presentDynamics: `현재 ${progression}의 흐름으로 상황이 전개되고 있습니다.`,
      futureTrajectory: `${context.urgency}한 변화를 통해 새로운 국면을 맞이하게 될 것입니다.`,
      temporalAdvice: '각 단계별 에너지를 순차적으로 활용하며 점진적 발전을 도모하세요.'
    };
  }

  private analyzeCelticCrossFlow(cards: SelectedCard[], context: any) {
    const [situation, challenge, past, future] = cards;
    
    return {
      pastInfluence: `과거의 ${past.card.koreanName}${past.isReversed ? ' 역방향' : ''}이 현재 상황의 근본적 배경을 이루고 있습니다.`,
      presentDynamics: `현재 ${situation.card.koreanName}${situation.isReversed ? ' 역방향' : ''}의 상황에서 ${challenge.card.koreanName}${challenge.isReversed ? ' 역방향' : ''}의 도전에 직면해 있습니다.`,
      futureTrajectory: `${future.card.koreanName}${future.isReversed ? ' 역방향' : ''}으로 향하는 복합적이고 다층적인 발전 경로가 열려있습니다.`,
      temporalAdvice: '복잡한 상황의 각 층위를 이해하고 단계별로 접근하는 지혜가 필요합니다.'
    };
  }

  /**
   * 심층 통찰 생성
   */
  private generateDeepInsights(cards: SelectedCard[], question: string, category: Category, framework: CategoryFramework) {
    const cardNames = cards.map(c => c.card.koreanName);
    
    return {
      coreTheme: this.identifyCoreTheme(cards, category),
      psychologicalPattern: this.identifyPsychologicalPattern(cards, framework),
      spiritualJourney: this.identifySpiritualJourney(cards, question),
      karmaticLesson: this.identifyKarmaticLesson(cards, category),
      transformationPath: this.identifyTransformationPath(cards, framework)
    };
  }

  private identifyCoreTheme(cards: SelectedCard[], category: Category): string {
    const themes = {
      love: '관계와 감정의 깊은 이해',
      career: '자아실현과 사회적 역할의 조화',
      money: '물질과 정신의 균형',
      health: '몸과 마음의 통합',
      spiritual: '영적 성장과 깨달음',
      general: '인생의 종합적 발전'
    };
    
    const reversedCount = cards.filter(c => c.isReversed).length;
    const modifier = reversedCount > cards.length / 2 ? '내적 ' : '외적 ';
    
    return `현재 상황의 핵심 주제는 ${modifier}${themes[category]}입니다. 이는 단순한 선택이 아닌 삶의 방향성과 관련된 근본적 변화를 의미합니다.`;
  }

  private identifyPsychologicalPattern(cards: SelectedCard[], framework: CategoryFramework): string {
    const patterns = [
      '자기 수용과 성장의 패턴',
      '관계에서의 균형 찾기 패턴', 
      '창조와 표현의 패턴',
      '안정과 변화의 역동 패턴',
      '내적 지혜 발견 패턴'
    ];
    
    const patternIndex = cards.length % patterns.length;
    return `심리학적으로 ${patterns[patternIndex]}이 활성화되어 있습니다. 이는 무의식에서 의식으로 올라오는 중요한 성장의 신호입니다.`;
  }

  private identifySpiritualJourney(cards: SelectedCard[], question: string): string {
    const questionWords = question.toLowerCase();
    
    if (questionWords.includes('왜') || questionWords.includes('원인')) {
      return '영적 여정에서 "이해와 수용"의 단계에 있습니다. 과거의 경험들이 현재의 지혜로 변화하는 과정입니다.';
    } else if (questionWords.includes('어떻게') || questionWords.includes('방법')) {
      return '영적 여정에서 "실천과 체험"의 단계에 있습니다. 내적 깨달음을 현실에서 구현하는 시기입니다.';
    } else {
      return '영적 여정에서 "통합과 완성"의 단계에 있습니다. 개별적 경험들이 하나의 큰 그림으로 연결되는 시점입니다.';
    }
  }

  private identifyKarmaticLesson(cards: SelectedCard[], category: Category): string {
    const lessons = {
      love: '무조건적 사랑과 자기 사랑의 균형',
      career: '개인적 성취와 사회적 기여의 조화',
      money: '풍요로움에 대한 건강한 관점 형성',
      health: '몸과 영혼의 통합적 치유',
      spiritual: '개인적 깨달음과 집단적 봉사의 균형',
      general: '개인적 성장과 우주적 질서의 조화'
    };
    
    return `카르마적 관점에서 ${lessons[category]}을 배우는 중요한 시기입니다. 이번 경험을 통해 영혼 차원의 성숙을 이룰 수 있습니다.`;
  }

  private identifyTransformationPath(cards: SelectedCard[], framework: CategoryFramework): string {
    const reversedRatio = cards.filter(c => c.isReversed).length / cards.length;
    
    if (reversedRatio < 0.3) {
      return '외적 행동과 변화를 통한 변혁의 길을 걷고 있습니다. 적극적인 실천과 도전이 성장의 열쇠입니다.';
    } else if (reversedRatio > 0.7) {
      return '내적 성찰과 깊은 이해를 통한 변혁의 길을 걷고 있습니다. 명상과 자기 탐구가 성장의 열쇠입니다.';
    } else {
      return '내적 성찰과 외적 실천의 균형을 통한 변혁의 길을 걷고 있습니다. 사고와 행동의 조화가 성장의 열쇠입니다.';
    }
  }

  /**
   * 실용적 가이드라인 생성
   */
  private generatePracticalGuidance(cards: SelectedCard[], category: Category, framework: CategoryFramework, context: any) {
    return {
      immediateActions: this.generateImmediateActions(cards, framework, context),
      weeklyPractices: this.generateWeeklyPractices(cards, category, framework),
      monthlyGoals: this.generateMonthlyGoals(cards, category, context),
      longTermVision: this.generateLongTermVision(cards, category, framework),
      avoidanceList: this.generateAvoidanceList(cards, context),
      supportResources: this.generateSupportResources(category, framework)
    };
  }

  private generateImmediateActions(cards: SelectedCard[], framework: CategoryFramework, context: any): string[] {
    const urgencyLevel = context.urgency;
    const emotionalTone = context.emotionalTone;
    
    const baseActions = [
      '현재 상황을 객관적으로 정리하고 핵심 이슈 파악하기',
      '감정 상태를 인정하고 수용하는 시간 갖기',
      '신뢰할 수 있는 사람과 솔직한 대화 나누기'
    ];
    
    if (urgencyLevel === 'immediate') {
      baseActions.unshift('급하더라도 5분간 심호흡하며 마음 안정시키기');
    }
    
    if (emotionalTone === 'anxious') {
      baseActions.push('불안한 생각들을 종이에 써서 정리하기');
    }
    
    return baseActions.slice(0, 4);
  }

  private generateThreeCardNarrative(cards: SelectedCard[], question: string): string {
    const [past, present, future] = cards;
    
    return `## 🎴 과거 - 현재 - 미래의 흐름

### 🌅 **과거의 영향**: ${past.card.koreanName}${past.isReversed ? ' (역방향)' : ''}
${this.generatePersonalizedCardReading(past, '과거')}

### 🎯 **현재 상황**: ${present.card.koreanName}${present.isReversed ? ' (역방향)' : ''}
${this.generatePersonalizedCardReading(present, '현재')}

### 🚀 **다가올 미래**: ${future.card.koreanName}${future.isReversed ? ' (역방향)' : ''}
${this.generatePersonalizedCardReading(future, '미래')}`;
  }

  private generateSingleCardNarrative(card: SelectedCard, question: string): string {
    return `## 🎴 당신을 위한 메시지

**선택된 카드**: ${card.card.koreanName}${card.isReversed ? ' (역방향)' : ''}

${this.generatePersonalizedCardReading(card, '핵심')}`;
  }

  private generateWeeklyFlowAnalysis(cards: SelectedCard[], question: string): string {
    return `## 💡 한 달간의 전체적인 흐름

정리해드리면, 앞으로 한 달은 이런 흐름이 될 것 같아요:

**1주차**: 지금의 복잡한 감정들을 정리하는 시간. 혼자만의 시간을 가지면서 내면을 들여다보세요.

**2주차**: 새로운 아이디어나 기회가 찾아올 거예요. 창조적인 에너지가 활성화되는 시기예요.

**3주차**: 리더십을 발휘해야 하는 상황이 올 거예요. 처음에는 부담스럽지만 당신의 능력을 보여줄 좋은 기회예요.

**4주차**: 큰 변화가 완성되고, 새로운 당신으로 거듭나게 될 거예요. 주변 사람들과의 관계도 더 깊어질 거고요.`;
  }

  private generatePracticalAdviceSection(cards: SelectedCard[], category: Category): string {
    return `## 🌈 실천할 수 있는 구체적인 조언

**이번 주에 할 일:**
- 하루에 30분씩 혼자만의 시간을 가져보세요. 산책을 하거나 일기를 써보는 것도 좋아요.
- 최근에 오해가 있었던 사람이 있다면, 용기를 내서 대화를 시도해보세요.

**다음 주부터:**
- 새로운 프로젝트나 취미를 시작해보세요. 지금이 새로운 시작에 가장 좋은 시기예요.
- 다른 사람들의 의견을 듣되, 최종 결정은 당신이 내리세요.

**한 달 내내 기억할 것:**
- 변화를 두려워하지 마세요. 모든 변화는 성장의 기회예요.
- 완벽하지 않아도 괜찮아요. 중요한 건 정직하고 진실하게 행동하는 거예요.
- 도움이 필요하면 주저하지 말고 요청하세요. 당신 혼자가 아니에요.`;
  }

  private generateClosingMessage(cards: SelectedCard[], question: string): string {
    return `## 💝 마무리 인사

오늘 리딩을 통해서 느낀 건, 당신이 정말 강하고 지혜로운 분이라는 거예요. 지금은 조금 힘들고 복잡할 수 있지만, 이 모든 경험들이 더 큰 성장으로 이어질 거예요. 

특히 과거의 긍정적인 경험들이 있으신 분이니까, 다시 그런 빛나는 시기가 올 거라고 확신해요. 다만 이번에는 혼자만 빛나는 게 아니라, 주변 사람들과 함께 빛날 수 있을 거예요.

한 달 후에 다시 만나면, 지금과는 완전히 다른 모습의 당신을 볼 수 있을 것 같아요. 그때까지 건강하시고, 언제든 궁금한 게 있으면 연락주세요!

**다음 상담 권장 시기**: 4-6주 후 (변화가 안정화된 후)`;
  }

  private generateInspirationalQuote(): string {
    const quotes = [
      "변화는 두려운 것이 아니라 새로운 가능성의 문입니다. 당신에게는 그 문을 열 충분한 힘이 있어요.",
      "모든 어려움은 더 강한 당신을 만들기 위한 우주의 선물입니다.",
      "지금의 경험이 미래의 지혜가 됩니다. 모든 순간을 소중히 여기세요.",
      "당신의 직감은 가장 정확한 나침반입니다. 내면의 목소리를 믿어보세요.",
      "성장은 편안함을 벗어날 때 시작됩니다. 용기를 내어 한 걸음 더 나아가세요."
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  private generateWeeklyPractices(cards: SelectedCard[], category: Category, framework: CategoryFramework): string[] {
    const practices = {
      love: [
        '자기 자신과의 관계 점검 및 자기 돌봄 실천',
        '상대방 관점에서 상황 바라보기 연습',
        '건강한 소통 방식 연습 및 적용'
      ],
      career: [
        '현재 역량과 목표 간의 차이 분석하기',
        '새로운 스킬이나 지식 습득을 위한 학습 시간 확보',
        '업계 동향과 기회 모니터링하기'
      ],
      money: [
        '수입과 지출 패턴 상세 분석하기',
        '재정 목표와 현실적 계획 수립하기',
        '투자나 저축 관련 정보 수집 및 학습'
      ],
      health: [
        '몸의 신호에 귀 기울이고 기록하기',
        '규칙적인 운동과 휴식 패턴 만들기',
        '스트레스 관리 방법 찾고 실천하기'
      ],
      spiritual: [
        '매일 명상이나 성찰 시간 갖기',
        '자연과 연결되는 시간 늘리기',
        '영적 성장 관련 책이나 자료 탐독하기'
      ],
      general: [
        '일상 패턴 점검 및 필요한 조정하기',
        '새로운 경험이나 배움의 기회 찾기',
        '인간관계와 환경 정리 및 개선하기'
      ]
    };
    
    return practices[category] || practices.general;
  }

  private generateMonthlyGoals(cards: SelectedCard[], category: Category, context: any): string[] {
    const complexity = context.complexity;
    
    const baseGoals = [
      '구체적이고 측정 가능한 변화 목표 설정 및 실행',
      '새로운 환경이나 인맥 형성을 위한 적극적 노력'
    ];
    
    if (complexity === 'complex') {
      baseGoals.push('복잡한 상황을 단계별로 해결하는 체계적 접근법 개발');
    } else {
      baseGoals.push('현재 목표에 집중하여 성과 창출하기');
    }
    
    return baseGoals;
  }

  private generateLongTermVision(cards: SelectedCard[], category: Category, framework: CategoryFramework): string {
    const visions = {
      love: '진정한 사랑을 주고받으며 서로의 성장을 돕는 성숙한 관계를 구축하게 될 것입니다.',
      career: '자신의 재능과 가치를 충분히 발휘하며 사회에 의미있는 기여를 하는 전문가로 성장할 것입니다.',
      money: '물질적 풍요와 정신적 만족이 조화를 이루는 안정되고 풍부한 삶을 누리게 될 것입니다.',
      health: '몸과 마음이 건강하게 통합되어 생명력 넘치는 삶을 살아가게 될 것입니다.',
      spiritual: '개인적 깨달음과 집단적 기여가 하나로 연결된 의미 있는 인생을 살게 될 것입니다.',
      general: '자신만의 고유한 길을 걸으며 진정한 자아실현을 이루는 충만한 삶을 살게 될 것입니다.'
    };
    
    return `1년 후, ${visions[category]} 현재의 경험들이 모두 그 여정의 소중한 디딤돌이 될 것입니다.`;
  }

  private generateAvoidanceList(cards: SelectedCard[], context: any): string[] {
    const avoidanceItems = [
      '감정적 충동에 의한 성급한 결정',
      '다른 사람의 의견에만 의존하는 태도',
      '완벽주의로 인한 행동 지연'
    ];
    
    if (context.emotionalTone === 'anxious') {
      avoidanceItems.push('불안함을 피하기 위한 회피 행동');
    }
    
    if (context.urgency === 'immediate') {
      avoidanceItems.push('충분한 고려 없는 즉흥적 선택');
    }
    
    return avoidanceItems.slice(0, 4);
  }

  private generateSupportResources(category: Category, framework: CategoryFramework): string[] {
    const resources = {
      love: [
        '전문 상담사나 커플 테라피',
        '건전한 관계 관련 서적이나 강의',
        '신뢰할 수 있는 멘토나 선배의 조언'
      ],
      career: [
        '업계 전문가나 멘토와의 네트워킹',
        '직업 상담사나 커리어 코치',
        '전문 스킬 개발을 위한 교육 프로그램'
      ],
      money: [
        '재정 전문가나 재무 상담사',
        '투자 교육 프로그램이나 세미나',
        '재정 관리 앱이나 도구 활용'
      ],
      health: [
        '의료 전문가나 건강 상담사',
        '운동 전문가나 영양사',
        '스트레스 관리나 명상 프로그램'
      ],
      spiritual: [
        '영적 지도자나 멘토',
        '명상이나 요가 커뮤니티',
        '철학이나 영성 관련 학습 그룹'
      ],
      general: [
        '라이프 코치나 개인 상담사',
        '자기계발 관련 커뮤니티나 모임',
        '신뢰할 수 있는 가족이나 친구'
      ]
    };
    
    return resources[category] || resources.general;
  }

  /**
   * 종합적 포맷팅
   */
  private formatStructuredReading(data: any): string {
    const spreadName = this.getSpreadDisplayName(data.spreadType);
    
    return `# 🔮 ${spreadName} 타로 리딩 상담 결과

**상담일시**: ${new Date().toLocaleDateString('ko-KR')}  
**질문**: "${data.question}"  
**리딩 방식**: ${spreadName}  

---

## 🔮 타로 카드 해석 

${this.generateOpeningMessage(data.cards, data.question)}

${this.generateCardStoryNarrative(data.cards, data.spreadType, data.question)}

${this.generateWeeklyFlowAnalysis(data.cards, data.question)}

${this.generatePracticalAdviceSection(data.cards, data.category)}

${this.generateClosingMessage(data.cards, data.question)}

---

*"${this.generateInspirationalQuote()}" ✨* 
- **감정적 톤**: ${data.questionContext.emotionalTone}
- **시간적 초점**: ${data.questionContext.timeframe}
- **복잡도**: ${data.questionContext.complexity}
- **결정 유형**: ${data.questionContext.decisionType}

---

## 🎴 **2부: 카드별 전문 분석**

${data.cardAnalyses.map((analysis: any, index: number) => `
### ${index + 1}. **${analysis.cardName}** (${analysis.position}) - ${analysis.orientation}

#### 🔍 **상징적 의미**
${analysis.symbolism}

#### 🧠 **심리학적 분석**  
${analysis.psychological}

#### ✨ **영적/카르마적 의미**
${analysis.spiritual}

#### 🌍 **현실적 발현**
${analysis.manifestation}

#### ⏰ **시기와 타이밍**
${analysis.timing}

#### 💫 **행동 지침**
${analysis.actionGuidance.map((action: string, i: number) => `${i + 1}. ${action}`).join('\n')}
`).join('\n')}

---

## 🔗 **3부: 카드 조합 분석**

### 🎨 **패턴 유형**: ${data.combinationAnalysis.patternType}

#### 🤝 **시너지 효과**
${data.combinationAnalysis.synergy}

#### ⚔️ **긴장/갈등 요소**
${data.combinationAnalysis.tension}

#### 🚀 **발전 방향**
${data.combinationAnalysis.evolution}

#### ⚠️ **주의사항**
${data.combinationAnalysis.warning}

---

## ⏳ **4부: 시간적 흐름 분석**

#### 📜 **과거의 영향**
${data.temporalAnalysis.pastInfluence}

#### ⚡ **현재의 역동성**
${data.temporalAnalysis.presentDynamics}

#### 🌅 **미래의 궤적**  
${data.temporalAnalysis.futureTrajectory}

#### 🧭 **시간적 조언**
${data.temporalAnalysis.temporalAdvice}

---

## 🧠 **5부: 심층 통찰**

#### 🎯 **핵심 주제**
${data.deepInsights.coreTheme}

#### 🔄 **심리학적 패턴**
${data.deepInsights.psychologicalPattern}

#### 🛤️ **영적 여정**
${data.deepInsights.spiritualJourney}

#### 📿 **카르마적 교훈**
${data.deepInsights.karmaticLesson}

#### 🦋 **변혁의 길**
${data.deepInsights.transformationPath}

---

## 🎯 **6부: 실용적 행동 가이드**

### 📅 **즉시 실행 (오늘-내일)**
${data.practicalGuidance.immediateActions.map((action: string, i: number) => `${i + 1}. ${action}`).join('\n')}

### 📝 **주간 실천사항 (이번 주)**
${data.practicalGuidance.weeklyPractices.map((practice: string, i: number) => `${i + 1}. ${practice}`).join('\n')}

### 🎯 **월간 목표 (이번 달)**
${data.practicalGuidance.monthlyGoals.map((goal: string, i: number) => `${i + 1}. ${goal}`).join('\n')}

### 🌈 **장기적 비전 (1년 후)**
${data.practicalGuidance.longTermVision}

### ❌ **피해야 할 것들**
${data.practicalGuidance.avoidanceList.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n')}

### 🤝 **도움이 될 자원들**
${data.practicalGuidance.supportResources.map((resource: string, i: number) => `${i + 1}. ${resource}`).join('\n')}

---

## 💝 **마무리 메시지**

이 해석은 현재 상황에 대한 종합적인 관점을 제시합니다. 타로는 가능성과 잠재력을 보여주는 도구이며, 최종적인 선택과 행동은 당신의 자유의지에 달려있습니다.

**🔮 예상 문의사항**: 추가 질문이나 특정 부분에 대한 더 자세한 설명이 필요하시면 언제든 말씀해 주세요.

**✨ 재상담 권장 시기**: ${data.questionContext.urgency === 'immediate' ? '1-2주 후' : '1개월 후'} 상황 변화에 따른 점검 상담을 권장합니다.

---

*이 해석은 구조화된 타로 해석 엔진을 통해 일관된 품질로 제공되었습니다.*
*상담 시간: 약 ${25 + Math.floor(Math.random() * 10)}분 소요*`;
  }

  // 유틸리티 메서드들
  private getPositionName(index: number, spreadType: SpreadType): string {
    const positions: { [key: string]: string[] } = {
      single: ['현재 상황'],
      past_present_future: ['과거', '현재', '미래'],
      relationship: ['당신의 마음', '상대방의 마음', '관계의 현재', '장애물', '가능한 결과'],
      celtic_cross: [
        '현재 상황', '장애물/도전', '과거', '미래',
        '가능한 결과', '최근 영향', '당신의 접근',
        '외부 영향', '희망과 두려움', '최종 결과'
      ]
    };
    
    return positions[spreadType]?.[index] || `${index + 1}번째 위치`;
  }

  private getSpreadDisplayName(spreadType: SpreadType): string {
    const names: { [key: string]: string } = {
      single: '1카드',
      past_present_future: '3카드 스프레드',
      relationship: '관계상담',
      celtic_cross: '켈틱크로스'
    };
    
    return names[spreadType] || '타로';
  }

  private getCategoryDisplayName(category: Category): string {
    const names: { [key: string]: string } = {
      general: '종합운',
      love: '연애/사랑',
      career: '직업/진로',
      money: '금전/재물',
      health: '건강/치유',
      spiritual: '영성/성장'
    };
    
    return names[category] || '일반';
  }

  /**
   * 데이터베이스 초기화 메서드들
   */
  private initializeCardDatabase() {
    // 주요 카드들의 핵심 해석 데이터 등록
    // 여기서는 예시로 몇 개만 구현
    
    this.cardDatabase.set('바보', {
      symbolism: {
        primary: ['새로운 시작', '순수함', '무한한 가능성'],
        secondary: ['경험 부족', '경솔함', '모험심'],
        numerology: '0의 에너지 - 무한한 잠재력과 새로운 순환의 시작',
        astrology: '천왕성 - 변화와 혁신의 에너지'
      },
      psychological: {
        archetype: '순수한 영혼, 새로운 시작을 갈망하는 자아',
        shadow: '경솔함과 준비 없는 행동으로 인한 실패',
        persona: '순수하고 열린 마음으로 세상과 만나는 모습',
        anima_animus: '내면의 순수함과 연결된 영적 안내자'
      },
      lifeLessons: {
        spiritual: '믿음으로 도약하는 용기와 우주에 대한 신뢰',
        emotional: '두려움을 넘어서는 순수한 열정의 회복',
        practical: '계획과 직감의 균형을 통한 현명한 선택',
        karmic: '과거의 제약에서 벗어나 새로운 영혼의 여정 시작'
      },
      manifestation: {
        internal: ['내적 자유감', '새로운 관점', '창의적 영감'],
        external: ['새로운 기회', '예상치 못한 만남', '환경 변화'],
        timing: '즉시에서 3개월 이내',
        duration: '단기적이지만 강렬한 영향'
      }
    });
    
    this.cardDatabase.set('마법사', {
      symbolism: {
        primary: ['의지력', '창조력', '실현 능력'],
        secondary: ['집중력', '자신감', '리더십'],
        numerology: '1의 에너지 - 새로운 시작과 개인의 의지',
        astrology: '수성 - 의사소통과 지적 능력'
      },
      psychological: {
        archetype: '창조자, 자신의 운명을 스스로 만들어가는 자',
        shadow: '오만함과 조작으로 인한 자아 팽창',
        persona: '자신감 있고 능력 있는 모습으로 세상과 만남',
        anima_animus: '내면의 창조적 남성성과 연결'
      },
      lifeLessons: {
        spiritual: '의식과 행동의 일치를 통한 현실 창조',
        emotional: '자신의 능력에 대한 확신과 책임감',
        practical: '목표 설정과 체계적 실행을 통한 성과 달성',
        karmic: '개인의 의지를 통한 집단적 발전에 기여'
      },
      manifestation: {
        internal: ['강한 의지력', '명확한 목적의식', '창조적 에너지'],
        external: ['프로젝트 시작', '리더십 발휘', '성과 창출'],
        timing: '1-6개월',
        duration: '지속적이고 누적적인 영향'
      }
    });
    
    // ... 나머지 76장의 카드도 유사하게 정의
    // 실제 구현에서는 외부 JSON 파일에서 로드하거나 데이터베이스에서 가져올 수 있음
  }

  private initializeCombinationPatterns() {
    // 알려진 카드 조합 패턴들
    this.combinationPatterns = [
      {
        pattern: ['바보', '마법사'],
        synergy: '새로운 시작과 강한 의지력이 결합하여 놀라운 창조적 성과를 만들어냅니다.',
        tension: '충동적 행동과 계획된 실행 사이에서 균형점을 찾아야 합니다.',
        evolution: '순수한 열정을 현실적 계획으로 발전시키는 과정을 거치게 됩니다.',
        warning: '너무 성급하게 진행하지 말고 충분한 준비를 하세요.'
      },
      {
        pattern: ['여사제', '여제'],
        synergy: '직감과 창조력이 조화를 이루어 풍요로운 결실을 맺게 됩니다.',
        tension: '내적 성찰과 외적 표현 사이에서 우선순위를 정해야 합니다.',
        evolution: '깊은 지혜를 실제적 창조로 발현시키는 성숙한 단계로 진입합니다.',
        warning: '완벽주의보다는 자연스러운 흐름을 따르는 것이 중요합니다.'
      }
      // ... 더 많은 조합 패턴들
    ];
  }

  private initializeCategoryFrameworks() {
    this.categoryFrameworks.set('love', {
      focusAreas: ['감정적 소통', '상호 이해', '관계 발전', '개인적 성장'],
      keyQuestions: ['진정한 감정은 무엇인가?', '상대방의 관점은?', '관계의 방향은?', '개인적 변화가 필요한가?'],
      actionAreas: ['솔직한 대화', '자기 성찰', '관계 투자', '개인 발전'],
      timingFactors: ['감정의 성숙도', '상황의 안정성', '외부 환경', '개인적 준비']
    });
    
    this.categoryFrameworks.set('career', {
      focusAreas: ['전문성 개발', '인간관계', '기회 포착', '장기적 비전'],
      keyQuestions: ['현재 역량은?', '시장의 요구는?', '성장 가능성은?', '장기 목표는?'],
      actionAreas: ['스킬 향상', '네트워킹', '기회 모색', '전략 수립'],
      timingFactors: ['시장 상황', '개인 준비도', '기회의 창', '경쟁 환경']
    });
    
    this.categoryFrameworks.set('money', {
      focusAreas: ['재정 관리', '투자 전략', '수입 증대', '지출 최적화'],
      keyQuestions: ['현재 재정 상태는?', '목표 금액은?', '위험 허용도는?', '시간 프레임은?'],
      actionAreas: ['예산 관리', '투자 학습', '수입원 다양화', '지출 관리'],
      timingFactors: ['경제 상황', '개인 상황', '시장 동향', '금리 환경']
    });
    
    this.categoryFrameworks.set('health', {
      focusAreas: ['신체 건강', '정신 건강', '생활 습관', '예방 관리'],
      keyQuestions: ['현재 건강 상태는?', '스트레스 요인은?', '개선 영역은?', '예방 계획은?'],
      actionAreas: ['규칙적 운동', '균형잡힌 식사', '스트레스 관리', '정기 검진'],
      timingFactors: ['현재 컨디션', '계절적 요인', '생활 패턴', '의료 접근성']
    });
    
    this.categoryFrameworks.set('spiritual', {
      focusAreas: ['내적 성장', '깨달음', '영적 실천', '의미 발견'],
      keyQuestions: ['영적 갈망은?', '현재 성장 단계는?', '실천 방법은?', '궁극적 목적은?'],
      actionAreas: ['명상 실천', '자기 탐구', '봉사 활동', '학습과 성찰'],
      timingFactors: ['내적 준비도', '외적 환경', '영적 계절', '성장 단계']
    });
    
    this.categoryFrameworks.set('general', {
      focusAreas: ['종합적 발전', '균형 잡힌 성장', '다면적 접근', '통합적 관점'],
      keyQuestions: ['전체적 상황은?', '우선순위는?', '균형점은?', '통합 방향은?'],
      actionAreas: ['현황 정리', '우선순위 설정', '균형 조정', '통합적 실천'],
      timingFactors: ['생활 전반', '계절적 리듬', '인생 단계', '사회적 환경']
    });
  }
}

export const structuredTarotEngine = StructuredTarotEngine.getInstance();