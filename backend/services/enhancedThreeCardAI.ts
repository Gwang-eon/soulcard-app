/**
 * 3카드 스프레드 전용 고도화 AI 서비스
 * v2.1 - 과거-현재-미래 맥락을 깊이 이해하는 전문가급 해석
 */

import { SelectedCard, Category } from '../types/tarot';
import { enhancedOllamaAI, EnhancedContext } from './enhancedOllamaAI';

export interface ThreeCardContext {
  timeline: 'past_present_future' | 'situation_action_outcome';
  cardNames: string[];
  cardOrientations: boolean[];
  narrativeFlow: 'linear' | 'cyclical' | 'transformative';
  dominantEnergy: 'positive' | 'challenging' | 'balanced';
}

export class EnhancedThreeCardAI {
  private static instance: EnhancedThreeCardAI;
  
  public static getInstance(): EnhancedThreeCardAI {
    if (!EnhancedThreeCardAI.instance) {
      EnhancedThreeCardAI.instance = new EnhancedThreeCardAI();
    }
    return EnhancedThreeCardAI.instance;
  }

  /**
   * 전문가급 3카드 스프레드 해석 생성
   */
  async generateProfessionalThreeCardInterpretation(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<string> {
    console.log(`🎯 전문가급 3카드 해석 시작: ${question}`);
    
    try {
      const context = this.analyzeThreeCardContext(cards, question, category);
      const professionalPrompt = this.buildThreeCardPrompt(cards, question, category, context);

      const aiResponse = await this.callOllama(professionalPrompt);
      console.log(`✅ 전문가급 3카드 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('전문가급 3카드 AI 해석 실패, 고급 fallback 사용:', error);
      return this.generateAdvancedThreeCardFallback(cards, question, category);
    }
  }

  /**
   * 3카드 컨텍스트 분석
   */
  private analyzeThreeCardContext(cards: SelectedCard[], question: string, category: Category): ThreeCardContext {
    const cardNames = cards.map(card => card.card.koreanName);
    const cardOrientations = cards.map(card => !card.isReversed); // true = upright, false = reversed
    
    // 내러티브 플로우 분석
    let narrativeFlow: ThreeCardContext['narrativeFlow'] = 'linear';
    const reversedCount = cardOrientations.filter(upright => !upright).length;
    
    if (reversedCount === 0) {
      narrativeFlow = 'linear'; // 순조로운 발전
    } else if (reversedCount === 3) {
      narrativeFlow = 'transformative'; // 큰 변화/전환
    } else {
      narrativeFlow = 'cyclical'; // 복잡한 패턴
    }

    // 지배적 에너지 분석
    let dominantEnergy: ThreeCardContext['dominantEnergy'] = 'balanced';
    if (reversedCount === 0) {
      dominantEnergy = 'positive';
    } else if (reversedCount >= 2) {
      dominantEnergy = 'challenging';
    }

    return {
      timeline: 'past_present_future',
      cardNames,
      cardOrientations,
      narrativeFlow,
      dominantEnergy
    };
  }

  /**
   * 전문가급 3카드 프롬프트 구성
   */
  private buildThreeCardPrompt(
    cards: SelectedCard[],
    question: string,
    category: Category,
    context: ThreeCardContext
  ): string {
    const cardDetails = cards.map((card, index) => {
      const position = ['과거', '현재', '미래'][index];
      const orientation = card.isReversed ? '역방향' : '정방향';
      const interpretation = card.isReversed 
        ? card.card.interpretations.reversed[category]
        : card.card.interpretations.upright[category];
      
      return `${position}: ${card.card.koreanName} (${orientation})
의미: ${interpretation}`;
    }).join('\n\n');

    const flowInstruction = this.getFlowInstruction(context.narrativeFlow);
    const energyGuidance = this.getEnergyGuidance(context.dominantEnergy);

    return `당신은 20년 경력의 전문 타로 리더입니다. 3카드 스프레드의 시간적 흐름과 카드 간의 상호작용을 깊이 이해합니다.

**질문자 상황**
질문: "${question}"
분야: ${category}
해석 유형: 과거-현재-미래 스프레드

**선택된 카드들**
${cardDetails}

**패턴 분석**
내러티브 흐름: ${context.narrativeFlow}
지배적 에너지: ${context.dominantEnergy}

**해석 지침**
${flowInstruction}
${energyGuidance}

위 정보를 바탕으로 다음 구조로 600-700자의 전문적인 해석을 작성해주세요:

1. **과거의 영향** (150자)
   - 첫 번째 카드가 보여주는 과거의 경험과 현재에 미치는 영향

2. **현재의 상황** (200자)  
   - 두 번째 카드를 통해 본 현재 상황의 핵심과 에너지

3. **미래의 가능성** (200자)
   - 세 번째 카드가 제시하는 미래의 방향과 잠재적 결과

4. **통합적 조언** (150자)
   - 세 카드의 메시지를 종합한 실질적 행동 지침

카드들 사이의 연결고리와 시간적 흐름을 중시하며, 질문자에게 명확한 방향성을 제시해주세요.`;
  }

  private getFlowInstruction(flow: ThreeCardContext['narrativeFlow']): string {
    const instructions = {
      linear: '순조로운 발전 과정으로 해석하세요. 과거의 기반 위에 현재가 구축되고, 미래로 자연스럽게 이어지는 흐름을 강조하세요.',
      cyclical: '복잡한 패턴과 순환을 다루세요. 과거의 패턴이 현재에 반복되고 있는지, 어떤 학습이 필요한지 분석하세요.',
      transformative: '큰 변화와 전환의 시기임을 강조하세요. 과거의 종료, 현재의 변화, 미래의 새로운 시작을 다루세요.'
    };
    return instructions[flow];
  }

  private getEnergyGuidance(energy: ThreeCardContext['dominantEnergy']): string {
    const guidance = {
      positive: '긍정적인 에너지 흐름을 축하하되, 지속가능한 발전을 위한 지혜도 전해주세요.',
      challenging: '도전적인 상황을 성장의 기회로 재해석하고, 구체적인 해결책과 희망을 제시하세요.',
      balanced: '균형 잡힌 관점으로 현실적이면서도 희망적인 메시지를 전달하세요.'
    };
    return guidance[energy];
  }

  /**
   * 고급 3카드 fallback 해석
   */
  private generateAdvancedThreeCardFallback(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): string {
    const context = this.analyzeThreeCardContext(cards, question, category);
    
    const pastAnalysis = this.generatePositionAnalysis(cards[0], '과거', category);
    const presentAnalysis = this.generatePositionAnalysis(cards[1], '현재', category);
    const futureAnalysis = this.generatePositionAnalysis(cards[2], '미래', category);
    
    const integratedAdvice = this.generateIntegratedAdvice(cards, context, category);

    return `**3카드 스프레드 해석: 과거-현재-미래**

"${question}"

**🔮 과거의 영향**
${pastAnalysis}

**⚡ 현재의 상황**  
${presentAnalysis}

**🌟 미래의 가능성**
${futureAnalysis}

**💫 통합적 조언**
${integratedAdvice}

---
세 장의 카드가 보여주는 시간의 흐름 속에서 당신의 여정을 발견하세요. 과거는 교훈을, 현재는 힘을, 미래는 희망을 줍니다.`;
  }

  private generatePositionAnalysis(card: SelectedCard, position: string, category: Category): string {
    const cardName = card.card.koreanName;
    const orientation = card.isReversed ? '역방향' : '정방향';
    const interpretation = card.isReversed 
      ? card.card.interpretations.reversed[category]
      : card.card.interpretations.upright[category];

    const positionMeanings = {
      '과거': `${cardName} ${orientation}은 과거의 경험이 현재에 미치는 영향을 보여줍니다. ${interpretation}`,
      '현재': `${cardName} ${orientation}은 지금 당신이 직면한 상황의 핵심을 나타냅니다. ${interpretation}`,
      '미래': `${cardName} ${orientation}은 앞으로 전개될 가능성을 제시합니다. ${interpretation}`
    };

    return positionMeanings[position as keyof typeof positionMeanings] || interpretation;
  }

  private generateIntegratedAdvice(
    cards: SelectedCard[],
    context: ThreeCardContext,
    category: Category
  ): string {
    const flowAdvice = {
      linear: '순조로운 흐름을 유지하되, 각 단계에서 충분히 경험을 소화하며 나아가세요.',
      cyclical: '반복되는 패턴을 인식하고, 이번에는 다른 선택을 통해 새로운 결과를 만들어보세요.',
      transformative: '변화의 시기를 두려워하지 마세요. 새로운 당신으로 거듭날 때입니다.'
    };

    const energyAdvice = {
      positive: '긍정적인 흐름을 믿고 한 걸음씩 전진하세요.',
      challenging: '도전을 성장의 기회로 받아들이며 인내심을 가지세요.',
      balanced: '균형감을 유지하며 신중하게 접근하세요.'
    };

    return `${flowAdvice[context.narrativeFlow]} ${energyAdvice[context.dominantEnergy]} 세 카드가 함께 만드는 조화로운 메시지를 마음에 새기고 실천해보세요.`;
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
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      throw new Error('Enhanced 3카드 AI 해석 생성에 실패했습니다.');
    }
  }
}

export const enhancedThreeCardAI = EnhancedThreeCardAI.getInstance();