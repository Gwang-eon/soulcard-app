/**
 * 종합적 타로 해석 엔진
 * v2.1 - 실제 상담사 수준의 깊이 있는 해석 (2,000-4,000자)
 */

import { SelectedCard, Category } from '../types/tarot';
import { enhancedOllamaAI, EnhancedContext } from './enhancedOllamaAI';

export interface ComprehensiveReadingStructure {
  // 1단계: 초기 상황 분석 (400-500자)
  initialAnalysis: {
    energyReading: string;           // 전체적인 에너지 흐름
    emotionalLandscape: string;      // 감정적 배경 분석
    spiritualContext: string;        // 영적 맥락
  };
  
  // 2단계: 개별 카드 심층 분석 (각 카드당 300-400자)
  detailedCardAnalysis: Array<{
    cardName: string;
    position: string;
    coreMessage: string;             // 핵심 메시지
    hiddenMeaning: string;           // 숨겨진 의미
    practicalImplication: string;    // 실생활 적용
    shadowAspect: string;            // 그림자 측면
  }>;
  
  // 3단계: 카드 간 상호작용 분석 (400-500자)
  cardInteractions: {
    synergies: string;               // 시너지 효과
    tensions: string;                // 긴장/갈등 요소
    evolutionPath: string;           // 발전/변화 경로
  };
  
  // 4단계: 심층 통찰 (500-600자)
  deepInsights: {
    rootCause: string;               // 근본 원인 분석
    unconsciousPattern: string;      // 무의식적 패턴
    soulLesson: string;              // 영혼의 교훈
    transformationPath: string;      // 변화의 길
  };
  
  // 5단계: 구체적 행동 지침 (400-500자)
  actionGuidance: {
    immediateSteps: string[];        // 즉시 할 수 있는 일
    weeklyPractice: string[];        // 일주일 실천사항
    monthlyGoals: string[];          // 한 달 목표
    longTermVision: string;          // 장기적 비전
  };
  
  // 6단계: 개인적 메시지 (300-400자)
  personalMessage: {
    encouragement: string;           // 격려의 말
    warning: string;                 // 주의사항
    blessing: string;                // 축복의 메시지
  };
}

export class ComprehensiveTarotEngine {
  private static instance: ComprehensiveTarotEngine;
  
  public static getInstance(): ComprehensiveTarotEngine {
    if (!ComprehensiveTarotEngine.instance) {
      ComprehensiveTarotEngine.instance = new ComprehensiveTarotEngine();
    }
    return ComprehensiveTarotEngine.instance;
  }

  /**
   * 실제 상담사 수준의 종합적 해석 생성 (2,500-4,000자)
   */
  async generateComprehensiveReading(
    cards: SelectedCard[],
    question: string,
    category: Category,
    spreadType: 'single' | 'three_card' | 'relationship' | 'celtic_cross'
  ): Promise<string> {
    console.log(`🔮 종합적 타로 상담 시작: ${spreadType} - ${question}`);
    
    try {
      const structure = await this.buildComprehensiveStructure(cards, question, category, spreadType);
      return this.formatComprehensiveReading(structure, question, spreadType);
      
    } catch (error) {
      console.error('종합적 해석 실패, 고급 fallback 사용:', error);
      return this.generateAdvancedFallback(cards, question, category, spreadType);
    }
  }

  /**
   * 종합적 해석 구조 생성
   */
  private async buildComprehensiveStructure(
    cards: SelectedCard[],
    question: string,
    category: Category,
    spreadType: string
  ): Promise<ComprehensiveReadingStructure> {
    
    // 1단계: 초기 상황 분석
    const initialAnalysis = await this.generateInitialAnalysis(cards, question, category);
    
    // 2단계: 개별 카드 심층 분석
    const detailedCardAnalysis = await this.generateDetailedCardAnalysis(cards, question, category, spreadType);
    
    // 3단계: 카드 간 상호작용 분석
    const cardInteractions = await this.generateCardInteractions(cards, question, category);
    
    // 4단계: 심층 통찰
    const deepInsights = await this.generateDeepInsights(cards, question, category);
    
    // 5단계: 구체적 행동 지침
    const actionGuidance = await this.generateActionGuidance(cards, question, category);
    
    // 6단계: 개인적 메시지
    const personalMessage = await this.generatePersonalMessage(cards, question, category);

    return {
      initialAnalysis,
      detailedCardAnalysis,
      cardInteractions,
      deepInsights,
      actionGuidance,
      personalMessage
    };
  }

  /**
   * 1단계: 초기 상황 분석
   */
  private async generateInitialAnalysis(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<ComprehensiveReadingStructure['initialAnalysis']> {
    
    const cardNames = cards.map(card => `${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}`).join(', ');
    
    const prompt = `당신은 30년 경력의 전문 타로 리더입니다. 다음 상황에 대한 초기 에너지 분석을 해주세요.

질문: "${question}"
분야: ${category}
선택된 카드들: ${cardNames}

다음 3가지 관점에서 각각 120-150자씩 분석해주세요:

1. **전체적인 에너지 흐름**: 카드들이 만들어내는 전반적인 에너지의 특성과 방향성
2. **감정적 배경 분석**: 질문자의 내면 상태와 감정적 맥락
3. **영적 맥락**: 이 상황이 질문자의 영적 성장에 주는 의미

각 항목을 구분해서 작성해주세요.`;

    try {
      const response = await this.callOllama(prompt);
      return this.parseInitialAnalysis(response);
    } catch (error) {
      return this.getDefaultInitialAnalysis(cards, question, category);
    }
  }

  /**
   * 2단계: 개별 카드 심층 분석
   */
  private async generateDetailedCardAnalysis(
    cards: SelectedCard[],
    question: string,
    category: Category,
    spreadType: string
  ): Promise<ComprehensiveReadingStructure['detailedCardAnalysis']> {
    
    const analyses: ComprehensiveReadingStructure['detailedCardAnalysis'] = [];
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const position = this.getPositionName(i, spreadType);
      const cardName = card.card.koreanName;
      const orientation = card.isReversed ? '역방향' : '정방향';
      
      const prompt = `전문 타로 리더로서 다음 카드에 대한 심층 분석을 해주세요.

카드: ${cardName} (${orientation})
위치: ${position}
질문: "${question}"
분야: ${category}

다음 4가지 측면에서 각각 70-80자씩 분석해주세요:

1. **핵심 메시지**: 이 카드가 전하는 가장 중요한 메시지
2. **숨겨진 의미**: 표면적으로 보이지 않는 깊은 의미
3. **실생활 적용**: 일상에서 어떻게 적용할 수 있는지
4. **그림자 측면**: 주의해야 할 부정적 측면이나 도전

각 항목을 명확히 구분해서 작성해주세요.`;

      try {
        const response = await this.callOllama(prompt);
        const analysis = this.parseCardAnalysis(response, cardName, position);
        analyses.push(analysis);
      } catch (error) {
        analyses.push(this.getDefaultCardAnalysis(card, position));
      }
    }
    
    return analyses;
  }

  /**
   * 3단계: 카드 간 상호작용 분석
   */
  private async generateCardInteractions(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<ComprehensiveReadingStructure['cardInteractions']> {
    
    const cardNames = cards.map(card => `${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}`).join(', ');
    
    const prompt = `전문 타로 리더로서 카드들 간의 상호작용을 분석해주세요.

질문: "${question}"
카드들: ${cardNames}

다음 3가지 관점에서 각각 130-150자씩 분석해주세요:

1. **시너지 효과**: 카드들이 함께 만들어내는 긍정적 상호작용과 강화 효과
2. **긴장/갈등 요소**: 카드들 사이의 모순이나 긴장, 해결해야 할 갈등
3. **발전/변화 경로**: 카드들이 제시하는 성장과 변화의 순서와 방향

각 항목을 구분해서 작성해주세요.`;

    try {
      const response = await this.callOllama(prompt);
      return this.parseCardInteractions(response);
    } catch (error) {
      return this.getDefaultCardInteractions(cards);
    }
  }

  /**
   * 4단계: 심층 통찰 생성
   */
  private async generateDeepInsights(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<ComprehensiveReadingStructure['deepInsights']> {
    
    const cardNames = cards.map(card => `${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}`).join(', ');
    
    const prompt = `심층 심리학과 융 이론을 바탕으로 다음 상황에 대한 깊은 통찰을 제공해주세요.

질문: "${question}"
카드들: ${cardNames}
분야: ${category}

다음 4가지 관점에서 각각 120-140자씩 분석해주세요:

1. **근본 원인 분석**: 현재 상황의 뿌리가 되는 근본적 원인
2. **무의식적 패턴**: 반복되는 무의식적 행동 패턴이나 믿음
3. **영혼의 교훈**: 이 경험을 통해 배워야 할 영적 교훈
4. **변화의 길**: 진정한 변화와 성장을 위한 내적 여정

각 항목을 구분해서 작성해주세요.`;

    try {
      const response = await this.callOllama(prompt);
      return this.parseDeepInsights(response);
    } catch (error) {
      return this.getDefaultDeepInsights(cards, question);
    }
  }

  /**
   * 5단계: 구체적 행동 지침
   */
  private async generateActionGuidance(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<ComprehensiveReadingStructure['actionGuidance']> {
    
    const cardNames = cards.map(card => `${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}`).join(', ');
    
    const prompt = `실용적인 관점에서 구체적인 행동 지침을 제공해주세요.

질문: "${question}"
카드들: ${cardNames}
분야: ${category}

다음과 같이 구체적인 실천 방안을 제시해주세요:

1. **오늘부터 할 수 있는 3가지 즉시 행동**
2. **이번 주 동안 실천할 3가지 주간 과제**
3. **한 달 안에 달성할 2가지 월간 목표**
4. **장기적 비전 (100-120자)**: 6개월-1년 후 도달하고 싶은 상태

각 항목을 명확히 구분하고, 실천 가능한 구체적 내용으로 작성해주세요.`;

    try {
      const response = await this.callOllama(prompt);
      return this.parseActionGuidance(response);
    } catch (error) {
      return this.getDefaultActionGuidance(cards, category);
    }
  }

  /**
   * 6단계: 개인적 메시지
   */
  private async generatePersonalMessage(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<ComprehensiveReadingStructure['personalMessage']> {
    
    const cardNames = cards.map(card => `${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}`).join(', ');
    
    const prompt = `따뜻하고 개인적인 메시지를 전해주세요.

질문: "${question}"
카드들: ${cardNames}

다음 3가지 관점에서 각각 100-120자씩 진심어린 메시지를 작성해주세요:

1. **격려의 말**: 질문자에게 용기와 희망을 주는 격려
2. **주의사항**: 신중하게 접근해야 할 부분에 대한 따뜻한 경고
3. **축복의 메시지**: 질문자의 앞길에 대한 축복과 기원

각 항목을 구분해서, 마치 오랜 친구가 전하는 것 같은 따뜻한 톤으로 작성해주세요.`;

    try {
      const response = await this.callOllama(prompt);
      return this.parsePersonalMessage(response);
    } catch (error) {
      return this.getDefaultPersonalMessage(cards, question);
    }
  }

  /**
   * 종합적 해석 포맷팅
   */
  private formatComprehensiveReading(
    structure: ComprehensiveReadingStructure,
    question: string,
    spreadType: string
  ): string {
    const spreadName = this.getSpreadDisplayName(spreadType);
    
    return `# 🔮 ${spreadName} 종합 타로 상담

**질문**: "${question}"

---

## 🌟 **1단계: 전체적 상황 분석**

### ⚡ **에너지 흐름**
${structure.initialAnalysis.energyReading}

### 💭 **감정적 배경**
${structure.initialAnalysis.emotionalLandscape}

### ✨ **영적 맥락**
${structure.initialAnalysis.spiritualContext}

---

## 🎴 **2단계: 개별 카드 심층 분석**

${structure.detailedCardAnalysis.map((card, index) => `
### ${index + 1}. **${card.cardName}** (${card.position})

**🎯 핵심 메시지**
${card.coreMessage}

**🔍 숨겨진 의미**
${card.hiddenMeaning}

**🏃‍♀️ 실생활 적용**
${card.practicalImplication}

**⚠️ 그림자 측면**
${card.shadowAspect}
`).join('\n')}

---

## 🔗 **3단계: 카드 간 상호작용**

### 🤝 **시너지 효과**
${structure.cardInteractions.synergies}

### ⚔️ **긴장/갈등 요소**
${structure.cardInteractions.tensions}

### 🚀 **발전 경로**
${structure.cardInteractions.evolutionPath}

---

## 🧠 **4단계: 심층 통찰**

### 🌱 **근본 원인**
${structure.deepInsights.rootCause}

### 🔄 **무의식적 패턴**
${structure.deepInsights.unconsciousPattern}

### 📿 **영혼의 교훈**
${structure.deepInsights.soulLesson}

### 🦋 **변화의 길**
${structure.deepInsights.transformationPath}

---

## 🎯 **5단계: 구체적 행동 지침**

### 📅 **오늘부터 즉시**
${structure.actionGuidance.immediateSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

### 📝 **이번 주 실천사항**
${structure.actionGuidance.weeklyPractice.map((practice, i) => `${i + 1}. ${practice}`).join('\n')}

### 🎯 **한 달 목표**
${structure.actionGuidance.monthlyGoals.map((goal, i) => `${i + 1}. ${goal}`).join('\n')}

### 🌈 **장기적 비전**
${structure.actionGuidance.longTermVision}

---

## 💝 **6단계: 개인적 메시지**

### 🌟 **격려의 말**
${structure.personalMessage.encouragement}

### 🛡️ **주의사항**
${structure.personalMessage.warning}

### 🙏 **축복의 메시지**
${structure.personalMessage.blessing}

---

**🕐 예상 상담 시간**: 20-25분 정도의 내용입니다.
**💫 타로는 가능성을 보여주며, 최종 선택과 행동은 당신의 지혜에 달려있습니다.**

*이 해석은 종합적인 관점에서 작성되었으며, 개인의 상황에 따라 다르게 적용될 수 있습니다.*`;
  }

  // 파싱 및 기본값 메서드들
  private parseInitialAnalysis(response: string): ComprehensiveReadingStructure['initialAnalysis'] {
    // AI 응답을 파싱하여 구조화
    const parts = response.split(/\d+\.\s*\*\*|###|\n\n/).filter(part => part.trim());
    
    return {
      energyReading: parts[1] || '전체적으로 변화와 성장의 에너지가 흐르고 있습니다.',
      emotionalLandscape: parts[2] || '감정적으로 새로운 깨달음을 받아들일 준비가 되어있습니다.',
      spiritualContext: parts[3] || '영적 성장의 중요한 전환점에 서 있습니다.'
    };
  }

  private parseCardAnalysis(response: string, cardName: string, position: string): ComprehensiveReadingStructure['detailedCardAnalysis'][0] {
    const parts = response.split(/\d+\.\s*\*\*|###|\n\n/).filter(part => part.trim());
    
    return {
      cardName,
      position,
      coreMessage: parts[1] || `${cardName}이 전하는 핵심 메시지입니다.`,
      hiddenMeaning: parts[2] || '표면 아래 숨겨진 깊은 의미가 있습니다.',
      practicalImplication: parts[3] || '일상에서 실천할 수 있는 구체적 방법입니다.',
      shadowAspect: parts[4] || '주의깊게 살펴봐야 할 측면입니다.'
    };
  }

  private parseCardInteractions(response: string): ComprehensiveReadingStructure['cardInteractions'] {
    const parts = response.split(/\d+\.\s*\*\*|###|\n\n/).filter(part => part.trim());
    
    return {
      synergies: parts[1] || '카드들 간의 조화로운 에너지가 흐르고 있습니다.',
      tensions: parts[2] || '해결해야 할 내적 갈등이나 선택의 순간이 있습니다.',
      evolutionPath: parts[3] || '단계적 성장과 발전의 길을 제시하고 있습니다.'
    };
  }

  private parseDeepInsights(response: string): ComprehensiveReadingStructure['deepInsights'] {
    const parts = response.split(/\d+\.\s*\*\*|###|\n\n/).filter(part => part.trim());
    
    return {
      rootCause: parts[1] || '현재 상황의 근본적 원인을 이해하는 것이 중요합니다.',
      unconsciousPattern: parts[2] || '무의식적으로 반복하는 패턴을 인식할 때입니다.',
      soulLesson: parts[3] || '영혼의 성장을 위한 중요한 교훈이 담겨있습니다.',
      transformationPath: parts[4] || '진정한 변화를 위한 내적 여정이 시작됩니다.'
    };
  }

  private parseActionGuidance(response: string): ComprehensiveReadingStructure['actionGuidance'] {
    const parts = response.split(/\d+\.\s*\*\*|###|\*\*/).filter(part => part.trim());
    
    return {
      immediateSteps: [
        '마음을 열고 새로운 관점 받아들이기',
        '현재 상황을 객관적으로 정리하기',
        '직감의 목소리에 귀 기울이기'
      ],
      weeklyPractice: [
        '매일 10분 명상이나 성찰 시간 갖기',
        '새로운 경험이나 학습 시도하기',
        '소중한 사람들과 깊은 대화 나누기'
      ],
      monthlyGoals: [
        '구체적인 변화 계획 수립하고 실행하기',
        '새로운 인맥이나 환경 탐색하기'
      ],
      longTermVision: '6개월 후에는 더 성숙하고 지혜로운 자신의 모습을 발견하게 될 것입니다.'
    };
  }

  private parsePersonalMessage(response: string): ComprehensiveReadingStructure['personalMessage'] {
    const parts = response.split(/\d+\.\s*\*\*|###|\n\n/).filter(part => part.trim());
    
    return {
      encouragement: parts[1] || '당신은 이미 충분히 강하고 지혜롭습니다. 자신을 믿어보세요.',
      warning: parts[2] || '급하게 결정하지 말고 충분히 생각할 시간을 가져보세요.',
      blessing: parts[3] || '앞으로의 여정에 지혜와 용기, 그리고 사랑이 함께하기를 기원합니다.'
    };
  }

  // 기본값 메서드들
  private getDefaultInitialAnalysis(cards: SelectedCard[], question: string, category: Category): ComprehensiveReadingStructure['initialAnalysis'] {
    return {
      energyReading: '현재 변화와 성장의 강한 에너지가 흐르고 있습니다. 새로운 가능성들이 열리고 있는 시기입니다.',
      emotionalLandscape: '감정적으로는 새로운 깨달음을 받아들일 준비가 되어있는 상태입니다. 내면의 목소리에 귀 기울일 때입니다.',
      spiritualContext: '영적 성장의 중요한 전환점에 서 있습니다. 이 경험을 통해 더 깊은 자아를 발견하게 될 것입니다.'
    };
  }

  private getDefaultCardAnalysis(card: SelectedCard, position: string): ComprehensiveReadingStructure['detailedCardAnalysis'][0] {
    const cardName = card.card.koreanName;
    const orientation = card.isReversed ? '역방향' : '정방향';
    
    return {
      cardName: `${cardName} ${orientation}`,
      position,
      coreMessage: `${cardName}이 전하는 핵심 메시지는 새로운 시작과 가능성입니다.`,
      hiddenMeaning: '표면적으로 보이는 것 이상의 깊은 변화와 성장의 기회가 숨어있습니다.',
      practicalImplication: '일상에서 작은 변화부터 시작하여 점진적으로 발전시켜 나가세요.',
      shadowAspect: '너무 성급하게 진행하지 말고 충분한 준비와 신중함이 필요합니다.'
    };
  }

  private getDefaultCardInteractions(cards: SelectedCard[]): ComprehensiveReadingStructure['cardInteractions'] {
    return {
      synergies: '선택된 카드들이 함께 만들어내는 조화로운 에너지가 당신의 성장을 돕고 있습니다.',
      tensions: '현재 상황에서 균형을 찾아야 할 서로 다른 요소들이 존재하지만, 이는 성장의 기회입니다.',
      evolutionPath: '과거의 경험을 바탕으로 현재를 이해하고, 미래를 위한 현명한 선택을 할 수 있는 길이 열려있습니다.'
    };
  }

  private getDefaultDeepInsights(cards: SelectedCard[], question: string): ComprehensiveReadingStructure['deepInsights'] {
    return {
      rootCause: '현재 상황의 근본적 원인은 내면의 성장 욕구와 변화에 대한 두려움 사이의 갈등입니다.',
      unconsciousPattern: '무의식적으로 안전함을 추구하면서도 동시에 새로운 도전을 갈망하는 패턴이 반복되고 있습니다.',
      soulLesson: '이 경험을 통해 진정한 용기란 두려움이 없는 것이 아니라, 두려움을 인정하면서도 앞으로 나아가는 것임을 배우게 됩니다.',
      transformationPath: '자신의 내면과 정직하게 마주하고, 진정한 욕구를 인정할 때 진정한 변화가 시작됩니다.'
    };
  }

  private getDefaultActionGuidance(cards: SelectedCard[], category: Category): ComprehensiveReadingStructure['actionGuidance'] {
    return {
      immediateSteps: [
        '현재 상황을 정직하게 돌아보고 감정을 인정하기',
        '신뢰할 수 있는 사람과 솔직한 대화 나누기',
        '하루 10분 조용한 성찰 시간 갖기'
      ],
      weeklyPractice: [
        '매일 감사 일기 쓰기',
        '새로운 시각으로 문제 바라보기 연습',
        '작은 변화 하나씩 실천해보기'
      ],
      monthlyGoals: [
        '구체적인 변화 계획 세우고 실행하기',
        '새로운 학습이나 경험 도전하기'
      ],
      longTermVision: '6개월 후에는 현재보다 더 성숙하고 지혜로운 모습으로 성장해 있을 것입니다. 이 과정에서 얻은 통찰은 평생의 자산이 될 것입니다.'
    };
  }

  private getDefaultPersonalMessage(cards: SelectedCard[], question: string): ComprehensiveReadingStructure['personalMessage'] {
    return {
      encouragement: '당신은 이미 충분히 강하고 지혜로운 사람입니다. 지금까지 잘 견뎌왔듯이, 앞으로도 잘 해낼 수 있을 것입니다.',
      warning: '모든 것을 한 번에 바꾸려 하지 마세요. 천천히, 한 걸음씩, 자신의 속도로 나아가는 것이 중요합니다.',
      blessing: '당신의 앞길에 지혜와 용기, 그리고 사랑이 항상 함께하기를 진심으로 기원합니다. 모든 경험이 당신을 더 나은 사람으로 성장시킬 것입니다.'
    };
  }

  // 유틸리티 메서드들
  private getPositionName(index: number, spreadType: string): string {
    const positions: { [key: string]: string[] } = {
      single: ['현재 상황'],
      three_card: ['과거', '현재', '미래'],
      relationship: ['당신의 마음', '상대방의 마음', '관계의 현재', '장애물', '가능한 결과'],
      celtic_cross: [
        '현재 상황', '장애물/도전', '과거', '미래',
        '가능한 결과', '최근 영향', '당신의 접근',
        '외부 영향', '희망과 두려움', '최종 결과'
      ]
    };
    
    return positions[spreadType]?.[index] || `${index + 1}번째 위치`;
  }

  private getSpreadDisplayName(spreadType: string): string {
    const names: { [key: string]: string } = {
      single: '1카드',
      three_card: '3카드 스프레드',
      relationship: '관계상담',
      celtic_cross: '켈틱크로스'
    };
    
    return names[spreadType] || '타로';
  }

  private generateAdvancedFallback(
    cards: SelectedCard[],
    question: string,
    category: Category,
    spreadType: string
  ): string {
    // 고급 fallback 구현
    const structure = {
      initialAnalysis: this.getDefaultInitialAnalysis(cards, question, category),
      detailedCardAnalysis: cards.map((card, index) => 
        this.getDefaultCardAnalysis(card, this.getPositionName(index, spreadType))
      ),
      cardInteractions: this.getDefaultCardInteractions(cards),
      deepInsights: this.getDefaultDeepInsights(cards, question),
      actionGuidance: this.getDefaultActionGuidance(cards, category),
      personalMessage: this.getDefaultPersonalMessage(cards, question)
    };
    
    return this.formatComprehensiveReading(structure, question, spreadType);
  }

  /**
   * Ollama API 호출
   */
  private async callOllama(prompt: string, model: string = 'llama3.1:latest'): Promise<string> {
    try {
      const requestBody = {
        model,
        prompt,
        stream: false
      };
      
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(20000) // 좀 더 긴 타임아웃
      });

      if (!response.ok) {
        throw new Error(`Comprehensive Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      throw new Error('Comprehensive AI 해석 생성에 실패했습니다.');
    }
  }
}

export const comprehensiveTarotEngine = ComprehensiveTarotEngine.getInstance();