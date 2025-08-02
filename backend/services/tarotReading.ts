import { TarotCard, Category, SpreadType, Reading, SelectedCard } from '../types/tarot';
import { cardLoader } from '../utils/cardLoader';
import { combinationEngine } from '../utils/combinationEngine';
import { aiNarrativeEngine } from './aiNarrativeEngine';
import { v4 as uuidv4 } from 'uuid';

/**
 * 타로 리딩 서비스
 * 실제 타로 점을 위한 통합 서비스
 */
export class TarotReadingService {
  private static instance: TarotReadingService;

  private constructor() {}

  public static getInstance(): TarotReadingService {
    if (!TarotReadingService.instance) {
      TarotReadingService.instance = new TarotReadingService();
    }
    return TarotReadingService.instance;
  }

  /**
   * 단일 카드 리딩
   */
  public async performSingleCardReading(
    question: string,
    category: Category = 'general'
  ): Promise<Reading> {
    // 질문 유효성 검증
    const validation = this.validateQuestion(question);
    if (!validation.isValid) {
      return {
        id: uuidv4(),
        question,
        category,
        spreadType: 'past_present_future',
        cards: [],
        interpretation: `**질문을 다시 확인해주세요**\n\n${validation.suggestion}\n\n타로는 진정한 마음의 질문에 응답합니다. 정말로 궁금하신 것을 자연스럽게 물어보세요.`,
        createdAt: new Date()
      };
    }

    await cardLoader.loadAllCards();
    
    const selectedCard = cardLoader.getIntuitiveCard(question, category);
    const isReversed = this.determineCardOrientation(question, selectedCard.id); // 의도적 방향 결정
    
    const card: SelectedCard = {
      card: selectedCard,
      position: 0,
      isReversed
    };

    // AI 기반 자연스러운 단일 카드 해석 (고급 감정 분석 통합)
    const interpretation = await aiNarrativeEngine.generateSingleCardNarrative(card, question, category);

    return {
      id: uuidv4(),
      question,
      category,
      spreadType: 'past_present_future', // 단일 카드는 일반적으로 현재 상황
      cards: [card],
      interpretation,
      createdAt: new Date()
    };
  }

  /**
   * 3카드 스프레드 리딩 (과거-현재-미래)
   */
  public async performThreeCardReading(
    question: string,
    category: Category = 'general',
    spreadType: SpreadType = 'past_present_future'
  ): Promise<Reading> {
    // 질문 유효성 검증
    const validation = this.validateQuestion(question);
    if (!validation.isValid) {
      return {
        id: uuidv4(),
        question,
        category,
        spreadType,
        cards: [],
        interpretation: `**질문을 다시 확인해주세요**\n\n${validation.suggestion}\n\n타로는 진정한 마음의 질문에 응답합니다. 정말로 궁금하신 것을 자연스럽게 물어보세요.`,
        createdAt: new Date()
      };
    }

    await cardLoader.loadAllCards();
    
    const selectedCards = cardLoader.getIntuitiveCards(3, question, category);
    const cards: SelectedCard[] = selectedCards.map((card, index) => ({
      card,
      position: index,
      isReversed: this.determineCardOrientation(question + index, card.id) // 의도적 방향 결정
    }));

    // AI 기반 자연스러운 3카드 해석  
    const interpretation = await aiNarrativeEngine.generateThreeCardNarrative(cards, question, category);
    const combinations = this.findRelevantCombinations(selectedCards);

    return {
      id: uuidv4(),
      question,
      category,
      spreadType,
      cards,
      interpretation,
      combinations,
      createdAt: new Date()
    };
  }

  /**
   * 관계 상담용 스프레드 (5카드)
   */
  public async performRelationshipReading(
    question: string
  ): Promise<Reading> {
    // 질문 유효성 검증
    const validation = this.validateQuestion(question);
    if (!validation.isValid) {
      return {
        id: uuidv4(),
        question,
        category: 'love',
        spreadType: 'relationship',
        cards: [],
        interpretation: `**질문을 다시 확인해주세요**\n\n${validation.suggestion}\n\n타로는 진정한 마음의 질문에 응답합니다. 특히 관계에 대한 진심어린 고민을 들려주세요.`,
        createdAt: new Date()
      };
    }

    await cardLoader.loadAllCards();
    
    const selectedCards = cardLoader.getIntuitiveCards(5, question, 'love');
    const cards: SelectedCard[] = selectedCards.map((card, index) => ({
      card,
      position: index,
      isReversed: this.determineCardOrientation(question + index, card.id) // 의도적 방향 결정
    }));

    // AI 기반 자연스러운 관계 상담 해석
    const interpretation = await aiNarrativeEngine.generateRelationshipNarrative(cards, question);
    const combinations = this.findRelevantCombinations(selectedCards);

    return {
      id: uuidv4(),
      question,
      category: 'love',
      spreadType: 'relationship',
      cards,
      interpretation,
      combinations,
      createdAt: new Date()
    };
  }

  /**
   * 켈틱 크로스 스프레드 (10카드)
   */
  public async performCelticCrossReading(
    question: string,
    category: Category = 'general'
  ): Promise<Reading> {
    // 질문 유효성 검증
    const validation = this.validateQuestion(question);
    if (!validation.isValid) {
      return {
        id: uuidv4(),
        question,
        category,
        spreadType: 'celtic_cross',
        cards: [],
        interpretation: `**질문을 다시 확인해주세요**\n\n${validation.suggestion}\n\n켈틱 크로스는 깊이 있는 질문에 가장 잘 응답합니다. 진정으로 고민하고 계신 것을 구체적으로 물어보세요.`,
        createdAt: new Date()
      };
    }

    await cardLoader.loadAllCards();
    
    const selectedCards = cardLoader.getIntuitiveCards(10, question, category);
    const cards: SelectedCard[] = selectedCards.map((card, index) => ({
      card,
      position: index,
      isReversed: this.determineCardOrientation(question + index, card.id) // 의도적 방향 결정
    }));

    // AI 기반 자연스러운 해석 생성
    const interpretation = await aiNarrativeEngine.generateCelticCrossNarrative(cards, question, category);
    const combinations = this.findRelevantCombinations(selectedCards);

    return {
      id: uuidv4(),
      question,
      category,
      spreadType: 'celtic_cross',
      cards,
      interpretation,
      combinations,
      createdAt: new Date()
    };
  }

  /**
   * 질문 유효성 검증
   */
  public validateQuestion(question: string): {
    isValid: boolean;
    reason?: string;
    suggestion?: string;
  } {
    if (!question || question.trim().length === 0) {
      return {
        isValid: false,
        reason: 'empty',
        suggestion: '진정으로 궁금한 것을 질문해주세요.'
      };
    }

    const trimmed = question.trim();
    
    // 너무 짧은 질문 (2글자 이하)
    if (trimmed.length <= 2) {
      return {
        isValid: false,
        reason: 'too_short',
        suggestion: '좀 더 구체적인 질문을 해주세요. 예: "새로운 직장에서 성공할 수 있을까요?"'
      };
    }

    // 의미없는 반복 문자나 기호들
    const meaninglessPatterns = [
      /^[.]{2,}$/,        // 점만 반복
      /^[0-9.]{2,}$/,     // 숫자와 점만
      /^[ㄱ-ㅎㅏ-ㅣ]{2,}$/, // 자음/모음만
      /^[가-힣]{1,4}[.]{2,}$/, // 한글 1-4글자 + 점들
      /^[a-zA-Z.]{1,3}$/,  // 영문자 짧은 것들
      /^[!@#$%^&*()]{2,}$/, // 특수문자만
      /^(.)\1{4,}$/,       // 같은 글자 5번 이상 반복
    ];

    if (meaninglessPatterns.some(pattern => pattern.test(trimmed))) {
      return {
        isValid: false,
        reason: 'meaningless',
        suggestion: '진심으로 궁금한 것을 자연스럽게 질문해주세요. 타로는 진정한 고민에 답해드립니다.'
      };
    }

    // 순차적 한글 나열 감지 (가나다라, 아버지 등)
    const koreanSequences = ['가나다라', '가나다', '나다라마', '아버지', '어머니', '하하하', '호호호'];
    if (koreanSequences.some(seq => trimmed.includes(seq))) {
      return {
        isValid: false,
        reason: 'sequential_korean',
        suggestion: '진심으로 궁금한 것을 자연스럽게 질문해주세요. 타로는 진정한 고민에 답해드립니다.'
      };
    }

    // 무작위 키보드 입력 감지 (자음/모음/한글이 무의미하게 섞임)
    const randomInputPatterns = [
      /[ㄱ-ㅎㅏ-ㅣ]{3,}/,  // 자음/모음이 3개 이상 연속
      /[;]{2,}/,            // 세미콜론 반복
      /[,]{3,}/,            // 쉼표 3개 이상
      /[ㄱ-ㅎ][가-힣][ㄱ-ㅎ]/,  // 자음-한글-자음 패턴
      /[ㅏ-ㅣ][가-힣][ㅏ-ㅣ]/,  // 모음-한글-모음 패턴
      /[ㄱ-ㅎㅏ-ㅣ].*[;].*[ㄱ-ㅎㅏ-ㅣ]/,  // 자음/모음 + 세미콜론 + 자음/모음
    ];

    if (randomInputPatterns.some(pattern => pattern.test(trimmed))) {
      return {
        isValid: false,
        reason: 'random_input',
        suggestion: '키보드를 무작위로 누르신 것 같습니다. 진정으로 궁금한 것을 정성스럽게 질문해주세요.'
      };
    }

    // 자음/모음과 한글의 비율 검사 (전체 길이의 25% 이상이 자음/모음이면 무효)
    const consonantVowelCount = (trimmed.match(/[ㄱ-ㅎㅏ-ㅣ]/g) || []).length;
    const totalLength = trimmed.length;
    if (totalLength > 4 && consonantVowelCount / totalLength > 0.25) {
      return {
        isValid: false,
        reason: 'too_many_consonants_vowels',
        suggestion: '완전한 한글로 자연스럽게 질문해주세요. 타로는 진심어린 고민에 답해드립니다.'
      };
    }

    // 특수 패턴 감지 (숫자+한글, 영문+한글 등 이상한 조합)
    const weirdCombinations = [
      /[0-9]+[가-힣]+[0-9]+/,  // 숫자-한글-숫자
      /[a-zA-Z]+[가-힣]/,      // 영문-한글 조합
      /^[가-힣]{1,2}[.]{3,}/,   // 짧은 한글 + 많은 점
      /^[!]+[가-힣]+[!]+$/,     // 느낌표로 감싼 단어
      /^[하나둘셋넷다섯여섯일곱여덟아홉열]+$/,  // 숫자 나열
      /^qwerty|asdf|키보드$/,   // 키보드 패턴
      /^[가-힣]([.]?[가-힣]){2,}[.]$/,  // 점으로 분리된 글자들 (안.녕.하.세.요.)
    ];

    if (weirdCombinations.some(pattern => pattern.test(trimmed))) {
      return {
        isValid: false,
        reason: 'weird_combination',
        suggestion: '자연스러운 한글 질문을 해주세요. 타로는 진심어린 고민에 답해드립니다.'
      };
    }

    // 단어의 의미성 검사 (연속된 한글이 의미 있는 단어인지)
    const koreanWords = trimmed.match(/[가-힣]{2,}/g) || [];
    const hasSemanticPattern = koreanWords.some(word => 
      // 일반적인 의미있는 패턴들
      /^(사랑|연애|직업|일|돈|건강|미래|과거|현재|관계|결정|선택|성공|실패|행복|슬픔|고민|걱정|희망|꿈)/.test(word) ||
      // 질문형 어미들
      /^.*(할까|될까|까요|어요|습니다|인가|은가|나요)$/.test(word)
    );
    
    // 5글자 이상이면서 의미있는 패턴이 없고 자음/모음이 있으면 무효
    if (totalLength > 5 && !hasSemanticPattern && consonantVowelCount > 0) {
      return {
        isValid: false,
        reason: 'no_semantic_meaning',
        suggestion: '의미있는 질문을 해주세요. 예: "새로운 연애가 시작될까요?", "직장에서 승진할 수 있을까요?"'
      };
    }

    // 테스트용으로 보이는 질문들
    const testPatterns = [
      /^test$/i,
      /^테스트$/,
      /^123+$/,
      /^aaa+$/i,
      /^ㅋㅋㅋ+$/,
      /^하하하+$/,
    ];

    if (testPatterns.some(pattern => pattern.test(trimmed))) {
      return {
        isValid: false,
        reason: 'test_input',
        suggestion: '실제로 고민하고 계신 것을 질문해주세요. 타로는 진정한 마음에 응답합니다.'
      };
    }

    return { isValid: true };
  }

  /**
   * 맞춤형 질문 분석 및 추천 스프레드
   */
  public analyzeQuestion(question: string): {
    isValid: boolean;
    validationMessage?: string;
    suggestedCategory: Category;
    suggestedSpread: SpreadType;
    keywords: string[];
    emotion: string;
    urgency: string;
  } {
    // 먼저 질문 유효성 검증
    const validation = this.validateQuestion(question);
    if (!validation.isValid) {
      return {
        isValid: false,
        validationMessage: validation.suggestion,
        suggestedCategory: 'general',
        suggestedSpread: 'past_present_future',
        keywords: [],
        emotion: 'neutral',
        urgency: 'medium'
      };
    }
    const lowerQuestion = question.toLowerCase();
    
    // 카테고리 분석
    let suggestedCategory: Category = 'general';
    if (lowerQuestion.includes('사랑') || lowerQuestion.includes('연애') || lowerQuestion.includes('관계')) {
      suggestedCategory = 'love';
    } else if (lowerQuestion.includes('일') || lowerQuestion.includes('직장') || lowerQuestion.includes('취업')) {
      suggestedCategory = 'career';
    } else if (lowerQuestion.includes('돈') || lowerQuestion.includes('재정') || lowerQuestion.includes('투자')) {
      suggestedCategory = 'money';
    } else if (lowerQuestion.includes('건강') || lowerQuestion.includes('몸')) {
      suggestedCategory = 'health';
    } else if (lowerQuestion.includes('영적') || lowerQuestion.includes('깨달음')) {
      suggestedCategory = 'spiritual';
    }

    // 스프레드 추천
    let suggestedSpread: SpreadType = 'past_present_future';
    if (lowerQuestion.includes('관계') || lowerQuestion.includes('상대방')) {
      suggestedSpread = 'relationship';
    } else if (lowerQuestion.includes('복잡') || lowerQuestion.includes('자세히')) {
      suggestedSpread = 'celtic_cross';
    }

    // 키워드 추출
    const keywords = this.extractKeywords(question);
    
    // 감정 분석
    const emotion = this.analyzeEmotion(question);
    
    // 긴급도 분석
    const urgency = this.analyzeUrgency(question);

    return {
      isValid: true,
      suggestedCategory,
      suggestedSpread,
      keywords,
      emotion,
      urgency
    };
  }

  /**
   * 단일 카드 해석 (질문 맞춤형)
   */
  private interpretSingleCard(card: TarotCard, isReversed: boolean, category: Category, question?: string): string {
    const orientation = isReversed ? 'reversed' : 'upright';
    const baseInterpretation = card.interpretations[orientation][category];
    const advice = card.advice[orientation];
    
    // 질문이 있으면 맞춤형 해석 생성
    if (question) {
      const customInterpretation = this.generateCustomInterpretation(card, isReversed, category, question, baseInterpretation);
      
      return `**${card.koreanName} (${card.name})** ${isReversed ? '역방향' : '정방향'}

${customInterpretation}

**조언**: ${advice.action}
**주의사항**: ${advice.avoid}
**집중할 점**: ${advice.focus}`;
    }
    
    // 질문이 없으면 기본 해석
    return `**${card.koreanName} (${card.name})** ${isReversed ? '역방향' : '정방향'}

${baseInterpretation}

**조언**: ${advice.action}
**주의사항**: ${advice.avoid}
**집중할 점**: ${advice.focus}`;
  }

  /**
   * 3카드 스프레드 해석
   */
  private interpretThreeCardSpread(
    cards: SelectedCard[], 
    category: Category, 
    spreadType: SpreadType
  ): string {
    const cardData = cards.map(c => c.card) as [TarotCard, TarotCard, TarotCard];
    const result = combinationEngine.interpretThreeCardSpread(cardData, spreadType, category);
    
    const positions = spreadType === 'past_present_future' 
      ? ['과거', '현재', '미래']
      : ['상황', '행동', '결과'];

    let interpretation = `## ${positions.join('-')} 스프레드\n\n`;
    
    cards.forEach((selectedCard, index) => {
      const orientation = selectedCard.isReversed ? 'reversed' : 'upright';
      const cardInterpretation = selectedCard.card.interpretations[orientation][category];
      
      interpretation += `### ${positions[index]}: ${selectedCard.card.koreanName} ${selectedCard.isReversed ? '(역방향)' : '(정방향)'}\n`;
      interpretation += `${cardInterpretation}\n\n`;
    });

    interpretation += `### 전체적인 메시지\n${result.overall}\n\n`;
    interpretation += `### 조언\n${result.advice}`;

    return interpretation;
  }

  /**
   * 관계 스프레드 해석 (5카드)
   */
  private interpretRelationshipSpread(cards: SelectedCard[]): string {
    const positions = ['당신의 현재 상태', '상대방의 현재 상태', '관계의 현재', '도전과 과제', '관계의 미래'];
    
    let interpretation = `## 관계 상담 스프레드\n\n`;
    
    cards.forEach((selectedCard, index) => {
      const orientation = selectedCard.isReversed ? 'reversed' : 'upright';
      const cardInterpretation = selectedCard.card.interpretations[orientation]['love'];
      
      interpretation += `### ${positions[index]}: ${selectedCard.card.koreanName} ${selectedCard.isReversed ? '(역방향)' : '(정방향)'}\n`;
      interpretation += `${cardInterpretation}\n\n`;
    });

    // 전체적인 관계 분석
    const overallAdvice = this.generateRelationshipAdvice(cards);
    interpretation += `### 관계에 대한 전체적인 조언\n${overallAdvice}`;

    return interpretation;
  }

  /**
   * 켈틱 크로스 해석 (10카드)
   */
  private interpretCelticCross(cards: SelectedCard[], category: Category): string {
    const positions = [
      '현재 상황', '도전과 과제', '먼 과거', '가까운 과거',
      '가능한 미래', '가까운 미래', '당신의 접근', '외부 영향',
      '희망과 두려움', '최종 결과'
    ];
    
    let interpretation = `## 켈틱 크로스 스프레드\n\n`;
    
    cards.forEach((selectedCard, index) => {
      const orientation = selectedCard.isReversed ? 'reversed' : 'upright';
      const cardInterpretation = selectedCard.card.interpretations[orientation][category];
      
      interpretation += `### ${index + 1}. ${positions[index]}: ${selectedCard.card.koreanName} ${selectedCard.isReversed ? '(역방향)' : '(정방향)'}\n`;
      interpretation += `${cardInterpretation}\n\n`;
    });

    return interpretation;
  }

  /**
   * 관련 조합 찾기
   */
  private findRelevantCombinations(cards: TarotCard[]): any[] {
    // 현재는 간단한 2카드 조합만 체크
    const combinations = [];
    
    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        const interpretation = combinationEngine.interpretTwoCards(cards[i], cards[j]);
        const strength = combinationEngine.calculateCombinationStrength([cards[i], cards[j]]);
        
        combinations.push({
          id: `${cards[i].id}_${cards[j].id}`,
          cards: [cards[i].id, cards[j].id],
          cardNames: [cards[i].koreanName, cards[j].koreanName],
          type: cards[i].suit === 'major' && cards[j].suit === 'major' ? 'major_major' : 
                cards[i].suit === 'major' || cards[j].suit === 'major' ? 'major_minor' : 'minor_minor',
          strength,
          meaning: interpretation,
          keywords: [...cards[i].uprightKeywords.slice(0, 3), ...cards[j].uprightKeywords.slice(0, 3)]
        });
      }
    }
    
    return combinations.filter(c => c.strength !== 'weak').slice(0, 3); // 상위 3개만
  }

  /**
   * 유틸리티 메서드들
   */
  private extractKeywords(text: string): string[] {
    // 간단한 키워드 추출 (실제로는 더 정교한 NLP 필요)
    const keywords = text.match(/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]+/g) || [];
    return keywords.filter(word => word.length > 1).slice(0, 5);
  }

  private analyzeEmotion(text: string): string {
    const positiveWords = ['좋', '행복', '기쁨', '희망'];
    const negativeWords = ['걱정', '불안', '힘들', '어려움'];
    const anxiousWords = ['불안', '걱정', '두려움'];
    
    if (anxiousWords.some(word => text.includes(word))) return 'anxious';
    if (positiveWords.some(word => text.includes(word))) return 'hopeful';
    if (negativeWords.some(word => text.includes(word))) return 'negative';
    return 'neutral';
  }

  private analyzeUrgency(text: string): string {
    const urgentWords = ['급', '빨리', '지금', '당장'];
    const casualWords = ['언제', '나중', '천천히'];
    
    if (urgentWords.some(word => text.includes(word))) return 'high';
    if (casualWords.some(word => text.includes(word))) return 'low';
    return 'medium';
  }

  private generateRelationshipAdvice(cards: SelectedCard[]): string {
    // 관계 조언 생성 로직
    return '서로의 입장을 이해하고 솔직한 소통을 통해 관계를 발전시켜 나가세요.';
  }

  /**
   * 질문에 맞춤화된 카드 해석 생성
   */
  private generateCustomInterpretation(
    card: TarotCard, 
    isReversed: boolean, 
    category: Category, 
    question: string, 
    baseInterpretation: string
  ): string {
    const lowerQuestion = question.toLowerCase();
    const orientation = isReversed ? 'reversed' : 'upright';
    const keywords = card[orientation === 'upright' ? 'uprightKeywords' : 'reversedKeywords'];
    
    // 질문의 핵심 키워드 추출
    const questionContext = this.extractQuestionContext(lowerQuestion);
    
    // 맞춤형 해석 시작
    let customInterpretation = `"${question}"에 대한 답변입니다.\n\n`;
    
    // 카드의 핵심 메시지를 질문에 연결
    if (questionContext.timeframe) {
      customInterpretation += this.generateTimeBasedInterpretation(card, isReversed, questionContext.timeframe);
    } else if (questionContext.decision) {
      customInterpretation += this.generateDecisionBasedInterpretation(card, isReversed, keywords);
    } else if (questionContext.relationship) {
      customInterpretation += this.generateRelationshipBasedInterpretation(card, isReversed, questionContext.relationship);
    } else {
      customInterpretation += this.generateGeneralCustomInterpretation(card, isReversed, category, lowerQuestion);
    }
    
    // 기본 해석과 연결
    customInterpretation += `\n\n${baseInterpretation}`;
    
    return customInterpretation;
  }

  /**
   * 질문의 맥락 추출
   */
  private extractQuestionContext(question: string): {
    timeframe?: 'future' | 'present' | 'past';
    decision?: boolean;
    relationship?: string;
    emotion?: string;
  } {
    const context: any = {};
    
    // 시간 관련
    if (question.includes('미래') || question.includes('앞으로') || question.includes('될까') || question.includes('될지')) {
      context.timeframe = 'future';
    } else if (question.includes('현재') || question.includes('지금') || question.includes('요즘')) {
      context.timeframe = 'present';
    } else if (question.includes('과거') || question.includes('예전') || question.includes('했던')) {
      context.timeframe = 'past';
    }
    
    // 결정/선택 관련
    if (question.includes('해야') || question.includes('선택') || question.includes('결정') || question.includes('할까')) {
      context.decision = true;
    }
    
    // 관계 관련
    if (question.includes('사람과') || question.includes('연인') || question.includes('친구') || question.includes('가족')) {
      context.relationship = 'personal';
    } else if (question.includes('직장') || question.includes('상사') || question.includes('동료')) {
      context.relationship = 'professional';
    }
    
    return context;
  }

  /**
   * 시간 기반 해석 생성
   */
  private generateTimeBasedInterpretation(card: TarotCard, isReversed: boolean, timeframe: string): string {
    const cardName = card.koreanName;
    
    if (timeframe === 'future') {
      if (isReversed) {
        return `${cardName} 역방향이 나타내는 미래는 현재의 방향을 재검토해야 할 시기임을 의미합니다.`;
      } else {
        return `${cardName}이 보여주는 미래는 긍정적인 변화와 새로운 가능성이 펼쳐질 것임을 시사합니다.`;
      }
    } else if (timeframe === 'present') {
      return `현재 상황에서 ${cardName}은 당신이 처한 상황의 핵심을 보여줍니다.`;
    } else {
      return `과거와 관련하여 ${cardName}은 지나간 경험이 현재에 미치는 영향을 나타냅니다.`;
    }
  }

  /**
   * 결정 기반 해석 생성
   */
  private generateDecisionBasedInterpretation(card: TarotCard, isReversed: boolean, keywords: string[]): string {
    const cardName = card.koreanName;
    const relevantKeywords = keywords.slice(0, 3).join(', ');
    
    if (isReversed) {
      return `${cardName} 역방향은 이 결정에 있어 신중함이 필요함을 알려줍니다. ${relevantKeywords}와 관련된 측면을 더 깊이 고려해보세요.`;
    } else {
      return `${cardName}은 이 결정이 ${relevantKeywords}의 에너지와 연결되어 있음을 보여줍니다. 긍정적인 결과를 기대할 수 있을 것 같습니다.`;
    }
  }

  /**
   * 관계 기반 해석 생성
   */
  private generateRelationshipBasedInterpretation(card: TarotCard, isReversed: boolean, relationshipType: string): string {
    const cardName = card.koreanName;
    
    if (relationshipType === 'personal') {
      if (isReversed) {
        return `개인적 관계에서 ${cardName} 역방향은 소통의 어려움이나 오해가 있을 수 있음을 나타냅니다.`;
      } else {
        return `개인적 관계에서 ${cardName}은 따뜻하고 긍정적인 에너지가 흐르고 있음을 보여줍니다.`;
      }
    } else {
      if (isReversed) {
        return `직장 관계에서 ${cardName} 역방향은 조심스러운 접근이 필요함을 의미합니다.`;
      } else {
        return `직장 관계에서 ${cardName}은 협력과 상호 이해를 통한 발전 가능성을 시사합니다.`;
      }
    }
  }

  /**
   * 일반적 맞춤 해석 생성
   */
  private generateGeneralCustomInterpretation(card: TarotCard, isReversed: boolean, category: Category, question: string): string {
    const cardName = card.koreanName;
    
    // 카테고리별 접근
    if (category === 'love') {
      return `사랑과 관련된 질문에 ${cardName}${isReversed ? ' 역방향' : ''}이 나온 것은 감정의 흐름에 주목하라는 메시지입니다.`;
    } else if (category === 'career') {
      return `직업과 관련된 고민에 ${cardName}${isReversed ? ' 역방향' : ''}이 나타난 것은 당신의 능력과 잠재력에 대한 중요한 통찰을 제공합니다.`;
    } else if (category === 'money') {
      return `재정 문제에 대해 ${cardName}${isReversed ? ' 역방향' : ''}이 나온 것은 현재 당신의 경제적 상황에 대한 명확한 지침을 보여줍니다.`;
    } else {
      return `이 질문에 대해 ${cardName}${isReversed ? ' 역방향' : ''}이 선택된 것은 우연이 아닙니다. 카드가 전하는 메시지에 주의깊게 귀 기울여보세요.`;
    }
  }

  /**
   * 질문과 카드 ID를 기반으로 의도적으로 카드 방향을 결정합니다
   */
  private determineCardOrientation(input: string, cardId: number): boolean {
    // 질문과 카드 ID를 조합하여 일관성 있는 해시 생성
    const combinedInput = input + cardId.toString();
    let hash = 0;
    
    for (let i = 0; i < combinedInput.length; i++) {
      const char = combinedInput.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit 정수로 변환
    }
    
    // 절댓값으로 변환하고 모듈로 연산으로 확률 결정
    const probability = Math.abs(hash) % 100;
    
    // 역방향 확률을 25%로 설정 (전통적 타로에서 적절한 비율)
    return probability < 25;
  }
}

// 싱글톤 인스턴스 익스포트
export const tarotReading = TarotReadingService.getInstance();