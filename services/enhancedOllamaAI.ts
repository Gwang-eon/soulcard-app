/**
 * 고도화된 Ollama AI 서비스
 * v2.1 - 전문가급 타로 해석 생성 엔진
 */

export interface EnhancedContext {
  userEmotionalState: 'anxious' | 'hopeful' | 'confused' | 'seeking_clarity' | 'hurt' | 'excited';
  questionDepth: 'surface' | 'moderate' | 'deep' | 'spiritual';
  timeContext: 'morning' | 'afternoon' | 'evening' | 'night';
  relationshipStatus?: 'single' | 'relationship' | 'complicated' | 'unknown';
  careerStage?: 'student' | 'early_career' | 'mid_career' | 'senior' | 'transition';
}

export class EnhancedOllamaAI {
  private static enhancedInstance: EnhancedOllamaAI;
  private baseURL = 'http://localhost:11434';
  
  private constructor() {}
  
  public static getInstance(): EnhancedOllamaAI {
    if (!EnhancedOllamaAI.enhancedInstance) {
      EnhancedOllamaAI.enhancedInstance = new EnhancedOllamaAI();
    }
    return EnhancedOllamaAI.enhancedInstance;
  }

  /**
   * 컨텍스트 분석을 통한 질문자 상태 파악
   */
  private analyzeQuestionContext(question: string, category: string): EnhancedContext {
    const lowerQ = question.toLowerCase();
    
    // 감정 상태 분석 (더 정교하게)
    let emotionalState: EnhancedContext['userEmotionalState'] = 'seeking_clarity';
    if (lowerQ.includes('불안') || lowerQ.includes('걱정') || lowerQ.includes('두렵')) {
      emotionalState = 'anxious';
    } else if (lowerQ.includes('상처') || lowerQ.includes('힘들') || lowerQ.includes('아프')) {
      emotionalState = 'hurt';
    } else if (lowerQ.includes('기대') || lowerQ.includes('희망') || lowerQ.includes('기다려')) {
      emotionalState = 'hopeful';
    } else if (lowerQ.includes('헷갈') || lowerQ.includes('모르겠')) {
      emotionalState = 'confused';
    } else if (lowerQ.includes('설레') || lowerQ.includes('기뻐') || lowerQ.includes('좋아져')) {
      emotionalState = 'excited';
    }

    // 질문 깊이 분석
    let questionDepth: EnhancedContext['questionDepth'] = 'moderate';
    if (lowerQ.includes('영혼') || lowerQ.includes('운명') || lowerQ.includes('사명') || lowerQ.includes('깨달음')) {
      questionDepth = 'spiritual';
    } else if (lowerQ.includes('왜') || lowerQ.includes('어떻게') || lowerQ.includes('진짜') || lowerQ.includes('진정')) {
      questionDepth = 'deep';
    } else if (lowerQ.includes('오늘') || lowerQ.includes('이번주') || lowerQ.includes('언제')) {
      questionDepth = 'surface';
    }

    // 시간 컨텍스트 (현재 시간 기준)
    const hour = new Date().getHours();
    let timeContext: EnhancedContext['timeContext'] = 'afternoon';
    if (hour >= 5 && hour < 12) timeContext = 'morning';
    else if (hour >= 12 && hour < 18) timeContext = 'afternoon';
    else if (hour >= 18 && hour < 22) timeContext = 'evening';
    else timeContext = 'night';

    // 관계 상태 추정 (love 카테고리일 때)
    let relationshipStatus: EnhancedContext['relationshipStatus'] = 'unknown';
    if (category === 'love') {
      if (lowerQ.includes('남자친구') || lowerQ.includes('여자친구') || lowerQ.includes('연인')) {
        relationshipStatus = 'relationship';
      } else if (lowerQ.includes('짝사랑') || lowerQ.includes('솔로') || lowerQ.includes('혼자')) {
        relationshipStatus = 'single';
      } else if (lowerQ.includes('복잡') || lowerQ.includes('애매') || lowerQ.includes('헷갈')) {
        relationshipStatus = 'complicated';
      }
    }

    return {
      userEmotionalState: emotionalState,
      questionDepth,
      timeContext,
      relationshipStatus,
      careerStage: category === 'career' ? 'mid_career' : undefined
    };
  }

  /**
   * 전문가급 단일 카드 해석 생성
   */
  async generateProfessionalSingleCardInterpretation(
    cardName: string,
    isReversed: boolean,
    question: string,
    category: string,
    baseInterpretation: string
  ): Promise<string> {
    console.log(`🎯 전문가급 AI 해석 시작: ${cardName} (${question})`);
    
    try {
      const context = this.analyzeQuestionContext(question, category);
      const orientation = isReversed ? '역방향' : '정방향';
      
      const professionalPrompt = this.buildProfessionalPrompt(
        cardName, orientation, question, category, baseInterpretation, context
      );

      const aiResponse = await this.callOllama(professionalPrompt);
      console.log(`✅ 전문가급 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('전문가급 AI 해석 실패, 고급 fallback 사용:', error);
      return this.generateAdvancedFallback(cardName, isReversed, question, category, baseInterpretation);
    }
  }

  /**
   * 전문가급 프롬프트 구성
   */
  private buildProfessionalPrompt(
    cardName: string,
    orientation: string,
    question: string,
    category: string,
    baseInterpretation: string,
    context: EnhancedContext
  ): string {
    const emotionalApproach = this.getEmotionalApproach(context.userEmotionalState);
    const depthLevel = this.getDepthLevelInstruction(context.questionDepth);
    const timeWisdom = this.getTimeWisdom(context.timeContext);
    
    return `당신은 20년 경력의 전문 타로 리더입니다. 깊이 있는 상담과 실용적 조언을 제공합니다.

**질문자 상황 분석**
- 질문: "${question}"
- 감정 상태: ${context.userEmotionalState}
- 질문 깊이: ${context.questionDepth}
- 시간대: ${context.timeContext}
- 관계 상황: ${context.relationshipStatus || '미상'}

**선택된 카드**
- 카드명: ${cardName} (${orientation})
- 분야: ${category}
- 기본 의미: ${baseInterpretation}

**해석 지침**
${emotionalApproach}
${depthLevel}
${timeWisdom}

위 모든 요소를 종합하여, 질문자에게 진정으로 도움이 되는 타로 해석을 450-500자로 작성해주세요. 
다음 구조를 따라주세요:

1. 카드가 전하는 핵심 메시지 (100자)
2. 현재 상황에 대한 구체적 분석 (150자)  
3. 실용적이고 구체적인 조언 (150자)
4. 희망적 마무리와 실천 방안 (100자)

따뜻하지만 전문적인 톤으로, 일반적인 조언이 아닌 이 질문자만을 위한 맞춤형 해석을 제공해주세요.`;
  }

  /**
   * 감정 상태별 접근법
   */
  private getEmotionalApproach(emotionalState: EnhancedContext['userEmotionalState']): string {
    const approaches = {
      anxious: '불안한 마음을 안정시키고 실질적인 해결책을 제시하는 방향으로 해석하세요. 걱정보다는 가능성에 초점을 맞춰주세요.',
      hopeful: '긍정적 에너지를 인정하되, 현실적 조언도 균형있게 포함시켜주세요. 기대감을 지혜롭게 관리할 방법을 제시하세요.',
      confused: '혼란스러운 상황을 명확히 정리해주고, 단계별 접근법을 제시하세요. 복잡함 속에서 핵심을 찾아주세요.',
      seeking_clarity: '진실을 드러내고 명확한 방향을 제시하세요. 모호함을 해소하고 구체적 행동 지침을 포함하세요.',
      hurt: '상처받은 마음을 공감하되, 치유와 성장의 관점에서 해석하세요. 위로와 함께 앞으로 나아갈 힘을 전해주세요.',
      excited: '긍정적 감정을 축하하되, 지속가능한 발전 방향을 제시하세요. 열정을 현명하게 활용할 방법을 알려주세요.'
    };
    return approaches[emotionalState];
  }

  /**
   * 질문 깊이별 지침
   */
  private getDepthLevelInstruction(depth: EnhancedContext['questionDepth']): string {
    const instructions = {
      surface: '일상적이고 실용적인 조언에 중점을 두세요. 즉시 적용할 수 있는 구체적 방법을 제시하세요.',
      moderate: '현재 상황과 가까운 미래에 대한 통찰을 제공하세요. 실용성과 깊이의 균형을 맞춰주세요.',
      deep: '근본적인 원인과 패턴을 다루세요. 내면의 성장과 변화에 대한 깊이 있는 통찰을 제공하세요.',
      spiritual: '영적 관점과 인생의 더 큰 의미를 다루세요. 영혼의 여정과 성장에 대한 지혜를 전해주세요.'
    };
    return instructions[depth];
  }

  /**
   * 시간대별 지혜
   */
  private getTimeWisdom(timeContext: EnhancedContext['timeContext']): string {
    const wisdom = {
      morning: '새로운 시작과 가능성의 에너지를 반영하세요. 하루를 어떻게 시작할지에 대한 조언을 포함하세요.',
      afternoon: '진행 중인 상황과 현재의 에너지를 다루세요. 지금 당장 취할 수 있는 행동에 초점을 맞춰주세요.',
      evening: '하루를 마무리하며 성찰하는 시간의 의미를 담으세요. 내일을 위한 준비와 오늘의 교훈을 포함하세요.',
      night: '깊은 성찰과 내면의 목소리에 귀 기울이는 시간임을 반영하세요. 잠재의식과 꿈의 메시지도 고려하세요.'
    };
    return wisdom[timeContext];
  }

  /**
   * 고급 fallback 해석 생성
   */
  private generateAdvancedFallback(
    cardName: string,
    isReversed: boolean,
    question: string,
    category: string,
    baseInterpretation: string
  ): string {
    const context = this.analyzeQuestionContext(question, category);
    const orientation = isReversed ? '역방향' : '정방향';
    
    const coreMessage = this.generateCoreMessage(cardName, isReversed, context);
    const situationAnalysis = this.generateSituationAnalysis(question, category, context);
    const practicalAdvice = this.generatePracticalAdvice(cardName, isReversed, category, context);
    const hopefulClosing = this.generateHopefulClosing(context);

    return `**${cardName} ${orientation}이 전하는 메시지**

${coreMessage}

**현재 상황 분석**
"${question}"

${situationAnalysis}

**구체적 조언**
${practicalAdvice}

**희망의 메시지**
${hopefulClosing}

---
💫 타로는 가능성을 보여주며, 최종 선택은 당신의 지혜에 달려있습니다.`;
  }

  private generateCoreMessage(cardName: string, isReversed: boolean, context: EnhancedContext): string {
    // 카드별 핵심 메시지 (더 정교하게)
    const coreMessages: { [key: string]: { upright: string[], reversed: string[] } } = {
      '마법사': {
        upright: ['당신 안에 모든 가능성이 있습니다. 지금이 시작할 때입니다.', '의지와 행동이 만나는 순간, 기적이 일어납니다.'],
        reversed: ['내면의 힘을 재발견할 때입니다. 자신을 믿어보세요.', '잠재력이 막혀있지만, 곧 흘러나올 것입니다.']
      },
      '여사제': {
        upright: ['직감의 목소리에 귀 기울여야 할 때입니다.', '침묵 속에서 진정한 답을 찾을 수 있습니다.'],
        reversed: ['내면의 목소리를 외면하고 있는 것은 아닌지 돌아보세요.', '직감과 이성의 균형을 찾아야 할 때입니다.']
      }
      // ... 더 많은 카드 추가 가능
    };

    const cardMessages = coreMessages[cardName];
    if (cardMessages) {
      const messages = isReversed ? cardMessages.reversed : cardMessages.upright;
      return messages[Math.floor(Math.random() * messages.length)];
    }

    // 기본 메시지 (카드별 특화 메시지가 없을 경우)
    if (isReversed) {
      return `${cardName} 역방향은 내면을 돌아보고 새로운 관점을 찾을 때임을 알려줍니다.`;
    } else {
      return `${cardName}은 지금 당신에게 필요한 에너지와 방향을 제시하고 있습니다.`;
    }
  }

  private generateSituationAnalysis(question: string, category: string, context: EnhancedContext): string {
    const baseAnalyses = {
      anxious: '현재 느끼고 있는 불안감은 변화의 전조일 수 있습니다. 두려움 뒤에 숨은 기회를 발견해보세요.',
      hopeful: '긍정적인 기대감이 좋은 에너지를 만들고 있습니다. 이 마음가짐을 유지하되 현실적 준비도 함께하세요.',
      confused: '혼란스러운 상황 속에서도 한 가지 확실한 것이 있습니다. 당신의 내면은 이미 답을 알고 있다는 것입니다.',
      seeking_clarity: '명확함을 찾으려는 당신의 노력이 이미 첫 걸음입니다. 인내심을 갖고 단계별로 접근해보세요.',
      hurt: '상처는 성장의 기회로 변할 수 있습니다. 지금의 아픔이 헛되지 않도록 의미를 찾아보세요.',
      excited: '이 설렘과 에너지를 현명하게 활용한다면 놀라운 결과를 만들어낼 수 있습니다.'
    };

    return baseAnalyses[context.userEmotionalState];
  }

  private generatePracticalAdvice(cardName: string, isReversed: boolean, category: string, context: EnhancedContext): string {
    const categoryAdvices = {
      general: '일상에서 작은 변화부터 시작해보세요. 매일 조금씩 실천하는 것이 큰 변화를 만듭니다.',
      love: '진정한 사랑은 자신을 사랑하는 것부터 시작됩니다. 먼저 자신과의 관계를 돌아보세요.',
      career: '현재의 경험이 미래의 기반이 됩니다. 목표를 명확히 하고 단계별 계획을 세워보세요.',
      money: '현명한 재정 관리는 미래의 자유를 위한 투자입니다. 장기적 관점을 가져보세요.',
      health: '몸과 마음의 균형이 무엇보다 중요합니다. 휴식과 활동의 조화를 찾아보세요.',
      spiritual: '내면의 목소리에 귀 기울이는 시간을 정기적으로 가져보세요. 명상이나 성찰의 시간이 도움이 됩니다.'
    };

    return categoryAdvices[category as keyof typeof categoryAdvices] || categoryAdvices.general;
  }

  private generateHopefulClosing(context: EnhancedContext): string {
    const closings = {
      morning: '새로운 하루가 새로운 가능성을 가져올 것입니다. 희망을 품고 시작해보세요.',
      afternoon: '지금 이 순간의 선택이 미래를 만듭니다. 믿음을 갖고 앞으로 나아가세요.',
      evening: '하루의 끝에서 새로운 깨달음을 얻었습니다. 내일은 더 나은 하루가 될 것입니다.',
      night: '고요한 밤, 당신의 내면에서 답을 찾을 것입니다. 꿈속에서도 메시지가 올 수 있습니다.'
    };

    return closings[context.timeContext];
  }

  /**
   * Ollama API 호출 (타임아웃 포함)
   */
  private async callOllama(prompt: string, model: string = 'llama3.1:latest'): Promise<string> {
    console.log(`🚀 Enhanced Ollama API 호출 시작: ${model}, 프롬프트 길이: ${prompt.length}`);
    
    // AbortController를 사용한 타임아웃 처리
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('❌ Enhanced AI 45초 타임아웃 발생');
      abortController.abort();
    }, 45000); // 45초로 증가

    try {
      const requestBody = {
        model,
        prompt,
        stream: false
      };
      
      console.log(`📡 Enhanced fetch 요청 시작: ${this.baseURL}/api/generate`);
      
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: abortController.signal
      });

      clearTimeout(timeoutId);
      console.log('✅ Enhanced HTTP 응답 수신:', response.status);

      if (!response.ok) {
        throw new Error(`Enhanced Ollama API error: ${response.status}`);
      }

      console.log('📄 Enhanced JSON 파싱 시작...');
      const data = await response.json();
      console.log(`⏱️ Enhanced Ollama 응답 시간: ${data.total_duration ? Math.round(data.total_duration / 1000000) : '?'}ms`);
      console.log('📝 Enhanced 응답 내용 길이:', data.response?.length);
      return data.response;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Enhanced Ollama API 호출 실패:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Enhanced Ollama 응답 시간 초과 (15초)');
      }
      
      throw new Error('Enhanced AI 해석 생성에 실패했습니다.');
    }
  }
}

export const enhancedOllamaAI = EnhancedOllamaAI.getInstance();