/**
 * Ollama AI 연동 서비스
 * 로컬 LLM을 활용한 진짜 AI 타로 해석
 */

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  total_duration?: number;
}

export class OllamaAIService {
  private static instance: OllamaAIService;
  private baseURL = 'http://localhost:11434';

  private constructor() {}

  public static getInstance(): OllamaAIService {
    if (!OllamaAIService.instance) {
      OllamaAIService.instance = new OllamaAIService();
    }
    return OllamaAIService.instance;
  }

  /**
   * Ollama API 호출 (타임아웃 포함)
   */
  private async callOllama(prompt: string, model: string = 'llama3.1:latest'): Promise<string> {
    console.log(`🚀 Ollama API 호출 시작: ${model}, 프롬프트 길이: ${prompt.length}`);
    
    // AbortController를 사용한 타임아웃 처리
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('❌ 15초 타임아웃 발생');
      abortController.abort();
    }, 15000);

    try {
      const requestBody = {
        model,
        prompt,
        stream: false
      };
      
      console.log(`📡 fetch 요청 시작: ${this.baseURL}/api/generate`);
      
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: abortController.signal
      });

      clearTimeout(timeoutId);
      console.log('✅ HTTP 응답 수신:', response.status);

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      console.log('📄 JSON 파싱 시작...');
      const data: OllamaResponse = await response.json();
      console.log(`⏱️ Ollama 응답 시간: ${data.total_duration ? Math.round(data.total_duration / 1000000) : '?'}ms`);
      console.log('📝 응답 내용 길이:', data.response?.length);
      return data.response;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Ollama API 호출 실패:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Ollama 응답 시간 초과 (15초)');
      }
      
      throw new Error('AI 해석 생성에 실패했습니다.');
    }
  }

  /**
   * 단일 카드 AI 해석 생성
   */
  async generateSingleCardInterpretation(
    cardName: string,
    isReversed: boolean,
    question: string,
    category: string,
    baseInterpretation: string
  ): Promise<string> {
    console.log(`🤖 실제 AI 해석 시작: ${cardName} (${question})`);
    
    try {
      const prompt = `"${question}"에 대해 ${cardName}${isReversed ? ' 역방향' : ''} 카드 해석:

${baseInterpretation}

위 의미를 바탕으로 질문자에게 따뜻한 조언을 300자로 작성해주세요.`;

      const aiResponse = await this.callOllama(prompt);
      console.log(`✅ AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('AI 해석 실패, fallback 사용:', error);
      
      // AI 실패시에만 fallback 사용
      const orientationText = isReversed ? ' 역방향' : '';
      const emotional_tone = this.getEmotionalTone(question);
      const advice = this.generateAdvice(cardName, isReversed, question);
      
      return `**${cardName}${orientationText}이 전하는 메시지**

"${question}" 

${emotional_tone}

**카드의 의미**
${baseInterpretation}

**당신을 위한 조언**
${advice}

**오늘의 실천 포인트**
이 카드가 나온 것은 우연이 아닙니다. 카드의 메시지를 마음에 새기고, 작은 것부터 실천해보세요. 변화는 한 걸음부터 시작됩니다.

---
💫 타로는 가능성을 제시하며, 최종 선택은 당신의 몫입니다.`;
    }
  }

  private getEmotionalTone(question: string): string {
    if (question.includes('사랑') || question.includes('연애') || question.includes('관계')) {
      return '마음의 소리에 귀 기울여보세요. 진정한 감정을 마주할 때입니다.';
    } else if (question.includes('일') || question.includes('직장') || question.includes('사업')) {
      return '새로운 기회가 문을 두드리고 있습니다. 준비된 마음으로 맞이하세요.';
    } else if (question.includes('돈') || question.includes('재정') || question.includes('투자')) {
      return '현명한 판단이 필요한 시기입니다. 신중하되 기회를 놓치지 마세요.';
    }
    return '지금 이 순간, 당신에게 꼭 필요한 메시지가 담겨 있습니다.';
  }

  private generateAdvice(cardName: string, isReversed: boolean, question: string): string {
    const advices = [
      '직감을 믿고 한 걸음 내딛어보세요.',
      '새로운 관점으로 상황을 바라보세요.',
      '내면의 목소리에 귀 기울이는 시간을 가져보세요.',
      '작은 변화부터 시작해보세요.',
      '주변 사람들과의 소통을 늘려보세요.'
    ];
    
    const randomAdvice = advices[Math.floor(Math.random() * advices.length)];
    return `${cardName} 카드가 제안하는 방향: ${randomAdvice}`;
  }

  /**
   * 3카드 스프레드 AI 해석 생성
   */
  async generateThreeCardInterpretation(
    cardNames: string,
    question: string,
    category: string,
    cardsDescription: string
  ): Promise<string> {
    console.log(`🤖 3카드 AI 해석 요청: ${question}`);
    
    try {
      const prompt = `"${question}" 질문에 대한 3카드 타로 해석:

${cardsDescription}

위 3장의 카드가 과거-현재-미래의 흐름으로 전하는 메시지를 500자 내외로 작성해주세요. 각 카드의 의미와 전체적인 흐름을 포함해주세요.`;

      const aiResponse = await this.callOllama(prompt);
      console.log(`✅ 3카드 AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('3카드 AI 해석 실패:', error);
      throw error;
    }
  }

  /**
   * 관계상담 AI 해석 생성
   */
  async generateRelationshipInterpretation(
    cardsInfo: Array<{name: string, isReversed: boolean, position: string}>,
    question: string,
    category: string
  ): Promise<string> {
    console.log(`🤖 관계상담 AI 해석 요청: ${question}`);
    
    try {
      const cardList = cardsInfo.map((card, idx) => 
        `${idx + 1}. ${card.position}: ${card.name} ${card.isReversed ? '(역방향)' : '(정방향)'}`
      ).join('\n');

      const prompt = `"${question}" 질문에 대한 관계상담 타로 해석:

${cardList}

위 5장의 카드가 관계 상황에 대해 전하는 메시지를 600자 내외로 작성해주세요. 관계의 깊이와 발전 방향을 포함해주세요.`;

      const aiResponse = await this.callOllama(prompt);
      console.log(`✅ 관계상담 AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('관계상담 AI 해석 실패:', error);
      throw error;
    }
  }

  /**
   * 켈틱크로스 AI 해석 생성
   */
  async generateCelticCrossInterpretation(
    cardsInfo: Array<{name: string, isReversed: boolean, position: string}>,
    question: string,
    category: string
  ): Promise<string> {
    console.log(`🤖 켈틱크로스 AI 해석 요청: ${question}`);
    
    try {
      const cardList = cardsInfo.map((card, idx) => 
        `${idx + 1}. ${card.position}: ${card.name} ${card.isReversed ? '(역방향)' : '(정방향)'}`
      ).join('\n');

      const prompt = `"${question}" 질문에 대한 켈틱크로스 타로 해석:

${cardList}

위 10장의 카드가 켈틱크로스 배치로 전하는 메시지를 700자 내외로 작성해주세요. 각 위치의 의미와 전체적인 메시지를 포함해주세요.`;

      const aiResponse = await this.callOllama(prompt);
      console.log(`✅ 켈틱크로스 AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('켈틱크로스 AI 해석 실패:', error);
      throw error;
    }
  }

  /**
   * Ollama 서비스 연결 상태 확인
   */
  async isConnected(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/tags`);
      return response.ok;
    } catch (error) {
      console.error('Ollama 서비스 연결 실패:', error);
      return false;
    }
  }
}

export const ollamaAI = OllamaAIService.getInstance();