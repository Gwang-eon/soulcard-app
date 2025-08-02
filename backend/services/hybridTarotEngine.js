/**
 * ML + AI 하이브리드 타로 해석 엔진
 * 머신러닝 패턴 분석 + AI 자연어 생성 결합
 */

const OpenAI = require('openai');

class HybridTarotEngine {
  constructor() {
    // xAI Grok API 설정
    this.openai = new OpenAI({
      apiKey: process.env.XAI_API_KEY || '',
      baseURL: 'https://api.x.ai/v1'
    });
    this.learningData = [];
    this.patternAnalysisModel = new PatternAnalyzer(); // 단순한 패턴 분석기
    this.init();
  }

  async init() {
    this.initLearningSystem();
    console.log('🤖 하이브리드 엔진 초기화 완료');
  }

  /**
   * 메인 해석 생성 함수 - ML과 AI 동시 활용
   */
  async generateReading(cards, question, spread, category = 'general', mode = 'pure_ai') {
    console.log(`🔮 하이브리드 시스템 시작: ${spread} 스프레드`);
    console.log(`📋 입력 카드 수: ${cards.length}개`);
    console.log(`❓ 질문: ${question}`);
    
    try {
      // 1. ML 모델로 패턴 분석 및 품질 예측
      console.log(`🧠 ML 패턴 분석 시작...`);
      const mlAnalysis = await this.analyzeWithML(cards, question, spread);
      console.log(`✅ ML 분석 완료:`, mlAnalysis);
      
      // 2. 구조화된 카드 데이터 준비
      console.log(`📊 구조화된 카드 데이터 준비...`);
      const structuredData = this.getStructuredCardMeanings(cards);
      console.log(`✅ 구조화 완료: ${structuredData.length}개 카드`);
      
      // 3. AI로 자연스러운 해석 생성
      console.log(`🤖 AI 해석 생성 시작... (모드: ${mode})`);
      const aiInterpretation = await this.generateWithAI(
        cards, question, spread, category, mlAnalysis, structuredData, mode
      );
      console.log(`✅ AI 해석 생성 완료`);
      
      // 4. ML + AI 결과 융합
      console.log(`🔗 결과 융합 시작...`);
      const hybridResult = this.fuseResults(mlAnalysis, aiInterpretation, structuredData);
      console.log(`✅ 융합 완료`);
      
      // 5. 학습 데이터로 저장
      this.storeLearningData(cards, question, spread, hybridResult);
      
      return hybridResult;
    } catch (error) {
      console.error(`❌ 하이브리드 엔진 오류:`, error);
      throw error;
    }
  }

  /**
   * 패턴 분석을 통한 해석 가이드 생성
   */
  async analyzeWithML(cards, question, spread) {
    try {
      // 단순한 패턴 분석 (추후 ML 확장 가능)
      const analysis = this.patternAnalysisModel.analyze(cards, question, spread);
      
      return {
        qualityScore: analysis.qualityScore,
        emotionalTone: analysis.emotionalTone,
        complexityLevel: analysis.complexityLevel,
        recommendedLength: analysis.recommendedLength,
        keyThemes: analysis.keyThemes,
        cardSynergy: analysis.cardSynergy,
        userSatisfactionPrediction: analysis.userSatisfactionPrediction
      };
    } catch (error) {
      console.log('패턴 분석 실패, 기본값 사용:', error.message);
      return this.getDefaultMLAnalysis();
    }
  }

  /**
   * AI를 통한 자연스러운 해석 생성
   */
  async generateWithAI(cards, question, spread, category, mlAnalysis, structuredData, mode = 'hybrid') {
    if (mode === 'pure_ai') {
      return await this.generatePureAI(cards, question, spread, category, mlAnalysis, structuredData);
    } else {
      return await this.generateTrueHybrid(cards, question, spread, category, mlAnalysis, structuredData);
    }
  }

  /**
   * 100% xAI 모드
   */
  async generatePureAI(cards, question, spread, category, mlAnalysis, structuredData) {
    const prompt = this.buildAIPrompt(cards, question, spread, category, mlAnalysis, structuredData);
    
    // 재시도 로직 추가
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`🚀 100% xAI 모드 - API 호출 시작 (시도 ${attempt}/2)`);
        console.log(`📤 프롬프트 길이: ${prompt.length}자`);
        
        const completion = await Promise.race([
          this.openai.chat.completions.create({
            model: "grok-3-fast",
            messages: [
              {
                role: "system", 
                content: `당신은 전문 타로 상담사입니다. 
                - 자연스럽고 따뜻한 대화체 사용
                - 질문에 구체적이고 실용적인 조언 제공
                - 카드 조합의 미묘한 의미 해석
                - 반복 표현 피하고 독창적 표현 사용
                - 목표 해석 길이: ${Math.min(mlAnalysis.recommendedLength, 4000)}자
                - 감정 톤: ${mlAnalysis.emotionalTone}
                - 복잡도: ${mlAnalysis.complexityLevel}`
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.8,
            max_tokens: 8000,
            timeout: 120000  // 2분 타임아웃
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('xAI API 타임아웃 (120초)')), 120000)
          )
        ]);

        console.log(`📥 xAI API 응답 수신 완료 (시도 ${attempt})`);
        console.log(`🔍 completion 객체:`, JSON.stringify(completion, null, 2));
        
        const generatedContent = completion.choices[0].message.content;
        console.log(`📏 생성된 콘텐츠 길이: ${generatedContent.length}자`);
        console.log(`📝 콘텐츠 미리보기: ${generatedContent.substring(0, 200)}...`);
        console.log(`📝 콘텐츠 끝부분: ...${generatedContent.substring(Math.max(0, generatedContent.length - 200))}`);
        
        return {
          mainInterpretation: generatedContent,
          generationMetadata: {
            model: "grok-3-fast-pure-ai",
            temperature: 0.8,
            predictedQuality: mlAnalysis.qualityScore,
            actualLength: generatedContent.length,
            attempts: attempt
          }
        };
      } catch (error) {
        console.error(`❌ AI 생성 실패 (시도 ${attempt}/2):`, error.message);
        
        if (attempt === 2) {
          // 마지막 시도 실패 시 Fallback 사용
          console.log('🔄 Fallback 해석 생성 중...');
          const fallbackContent = this.generateFallbackInterpretation(cards, question, spread, category, mlAnalysis);
          
          return {
            mainInterpretation: fallbackContent,
            generationMetadata: {
              model: "fallback",
              temperature: 0.8,
              predictedQuality: mlAnalysis.qualityScore,
              actualLength: fallbackContent.length,
              fallbackReason: error.message,
              attempts: attempt
            }
          };
        }
        
        // 첫 번째 시도 실패 시 잠시 대기 후 재시도
        console.log('⏳ 3초 후 재시도...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  /**
   * 진짜 하이브리드 모드 (ML 구조 + xAI 다듬기)
   */
  async generateTrueHybrid(cards, question, spread, category, mlAnalysis, structuredData) {
    try {
      console.log(`🔄 진짜 하이브리드 모드 시작`);
      
      // 1. ML 기반 구조화된 해석 생성
      const mlInterpretation = this.generateMLBasedInterpretation(cards, question, spread, category, mlAnalysis, structuredData);
      console.log(`📊 ML 구조화 해석 완료: ${mlInterpretation.length}자`);
      
      // 2. xAI로 자연스럽게 다듬기 (토큰 절약)
      const refinedContent = await this.refineWithAI(mlInterpretation, mlAnalysis);
      console.log(`✨ xAI 다듬기 완료: ${refinedContent.length}자`);
      
      return {
        mainInterpretation: refinedContent,
        generationMetadata: {
          model: "true-hybrid-ml-ai",
          temperature: 0.7,
          predictedQuality: mlAnalysis.qualityScore,
          actualLength: refinedContent.length,
          mlBaseLength: mlInterpretation.length
        }
      };
    } catch (error) {
      console.error('하이브리드 생성 실패:', error);
      // ML 해석만으로도 충분히 좋음
      const mlInterpretation = this.generateMLBasedInterpretation(cards, question, spread, category, mlAnalysis, structuredData);
      return {
        mainInterpretation: mlInterpretation,
        generationMetadata: {
          model: "ml-only-fallback",
          actualLength: mlInterpretation.length,
          fallbackReason: error.message
        }
      };
    }
  }

  /**
   * ML 기반 구조화된 해석 생성
   */
  generateMLBasedInterpretation(cards, question, spread, category, mlAnalysis, structuredData) {
    const cardNames = cards.map(card => card.name || card.card?.name);
    const themes = mlAnalysis.keyThemes;
    const synergy = mlAnalysis.cardSynergy;
    const tone = mlAnalysis.emotionalTone;
    
    let interpretation = `**${question}**에 대한 타로 해석\n\n`;
    
    // 카드별 의미 분석
    interpretation += `뽑힌 카드: ${cardNames.join(', ')}\n\n`;
    
    if (spread === '3카드') {
      interpretation += this.generate3CardMLStructure(cards, question, category, mlAnalysis);
    } else if (spread === '관계상담') {
      interpretation += this.generateRelationshipMLStructure(cards, question, mlAnalysis);
    } else if (spread === '켈틱크로스') {
      interpretation += this.generateCelticCrossMLStructure(cards, question, mlAnalysis);
    } else {
      interpretation += this.generateSingleCardMLStructure(cards[0], question, category, mlAnalysis);
    }
    
    // 종합 조언
    interpretation += `\n**종합 분석**\n`;
    interpretation += `카드 조합의 시너지: ${synergy > 0.7 ? '매우 높음' : synergy > 0.5 ? '양호' : '보통'}\n`;
    interpretation += `핵심 테마: ${themes.join(', ')}\n`;
    interpretation += `감정적 톤: ${this.getToneDescription(tone)}\n\n`;
    
    interpretation += this.generateAdviceSection(category, mlAnalysis, synergy);
    
    return interpretation;
  }

  /**
   * xAI로 자연스럽게 다듬기 (토큰 절약용)
   */
  async refineWithAI(mlContent, mlAnalysis) {
    const refinementPrompt = `다음 타로 해석을 자연스럽고 따뜻한 대화체로 다듬어주세요. 구조와 내용은 유지하되, 표현을 부드럽게 만들어주세요:

${mlContent}`;

    try {
      const completion = await Promise.race([
        this.openai.chat.completions.create({
          model: "grok-3-fast",
          messages: [
            {
              role: "system",
              content: "당신은 타로 해석을 자연스럽게 다듬는 전문가입니다. 주어진 해석의 구조와 내용은 그대로 유지하면서 표현만 부드럽고 따뜻하게 만들어주세요."
            },
            {
              role: "user",
              content: refinementPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000  // 토큰 절약
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('다듬기 API 타임아웃 (60초)')), 60000)
        )
      ]);

      return completion.choices[0].message.content;
    } catch (error) {
      console.log('xAI 다듬기 실패, ML 해석 그대로 사용:', error.message);
      return mlContent;
    }
  }

  // ML 구조 생성 헬퍼 메서드들
  generate3CardMLStructure(cards, question, category, mlAnalysis) {
    return `**과거-현재-미래 흐름**
- 과거: ${cards[0].name} - 현재 상황의 배경과 원인
- 현재: ${cards[1].name} - 지금 당신이 마주한 상황  
- 미래: ${cards[2].name} - 앞으로 전개될 가능성

이 카드 조합은 ${category === 'career' ? '직업적 측면에서' : '전반적으로'} 균형잡힌 에너지를 보여줍니다.`;
  }

  generateSingleCardMLStructure(card, question, category, mlAnalysis) {
    return `**${card.name}의 메시지**
${card.isReversed ? '역방향으로 나타난 이 카드는' : '정방향의 이 카드는'} 당신의 질문에 대해 구체적인 답을 제시합니다.
핵심 에너지와 조언을 담고 있으며, ${mlAnalysis.complexityLevel === 'complex' ? '복합적인 상황' : '명확한 방향성'}을 나타냅니다.`;
  }

  generateRelationshipMLStructure(cards, question, mlAnalysis) {
    return `**관계 상담 분석**
- 당신의 상태: ${cards[0].name}
- 상대방의 상태: ${cards[1].name}  
- 관계의 현재: ${cards[2].name}
- 도전과제: ${cards[3].name}
- 미래 전망: ${cards[4].name}

관계의 에너지 흐름과 발전 가능성을 종합적으로 보여주는 조합입니다.`;
  }

  generateCelticCrossMLStructure(cards, question, mlAnalysis) {
    return `**켈틱 크로스 종합 분석**
현재 상황부터 최종 결과까지의 전체적인 흐름을 10장의 카드가 상세히 보여줍니다.
핵심은 ${cards[0].name}이며, 이를 둘러싼 다양한 영향요소들이 복합적으로 작용하고 있습니다.`;
  }

  generateAdviceSection(category, mlAnalysis, synergy) {
    let advice = `**실용적 조언**\n`;
    
    if (category === 'career') {
      advice += `직업적 측면에서는 ${synergy > 0.6 ? '적극적인 행동' : '신중한 접근'}이 권장됩니다.\n`;
    } else if (category === 'love') {
      advice += `관계에서는 ${mlAnalysis.emotionalTone === 'supportive' ? '인내와 이해' : '열린 소통'}이 중요합니다.\n`;
    }
    
    advice += `현재 시점에서 가장 중요한 것은 ${mlAnalysis.keyThemes[0] || '균형'}입니다.`;
    
    return advice;
  }

  getToneDescription(tone) {
    const descriptions = {
      'encouraging': '격려와 희망',
      'supportive': '지지와 위로', 
      'neutral': '균형과 안정',
      'cautious': '신중함과 주의'
    };
    return descriptions[tone] || '중립적';
  }

  /**
   * Fallback 해석 생성 (API 오류 시 사용)
   */
  generateFallbackInterpretation(cards, question, spread, category, mlAnalysis) {
    const cardNames = cards.map(card => card.name || card.card?.name).join(', ');
    const themes = mlAnalysis.keyThemes.join(', ');
    
    return `**${question}**에 대한 ${spread} 타로 해석

뽑힌 카드: ${cardNames}

이번 질문에 대해 카드들이 전하는 메시지를 종합해보면, ${themes} 관련하여 중요한 시사점을 제공하고 있습니다.

현재 상황을 살펴보면, 당신이 고민하고 있는 ${category === 'career' ? '직업적인 측면' : '상황'}에서 새로운 변화와 기회가 기다리고 있을 것으로 보입니다. 

카드들의 조합은 ${mlAnalysis.cardSynergy > 0.7 ? '매우 조화로운' : '균형잡힌'} 에너지를 보여주며, 이는 당신의 결정이 긍정적인 결과를 가져올 가능성이 높다는 것을 의미합니다.

구체적인 조언:
1. 현재 준비된 상태라면 시작하기에 좋은 시기입니다
2. 계획을 세우고 단계적으로 접근하는 것이 중요합니다  
3. 주변의 지원과 조언을 적극 활용하세요
4. 초기의 어려움은 성장의 과정으로 받아들이세요

전체적으로 볼 때, 당신의 질문에 대한 답은 긍정적이며, 적절한 준비와 실행이 뒷받침된다면 좋은 결과를 기대할 수 있을 것입니다.

(이 해석은 ML 패턴 분석을 기반으로 한 구조화된 해석입니다)`;
  }

  /**
   * ML + AI 결과 융합
   */
  fuseResults(mlAnalysis, aiInterpretation, structuredData) {
    return {
      // AI 생성 메인 콘텐츠
      mainContent: aiInterpretation.mainInterpretation,
      
      // ML 분석 메타데이터
      qualityMetrics: {
        predictedQuality: mlAnalysis.qualityScore,
        emotionalTone: mlAnalysis.emotionalTone,
        complexity: mlAnalysis.complexityLevel,
        expectedSatisfaction: mlAnalysis.userSatisfactionPrediction
      },
      
      // 구조화된 카드 정보 (필요시 참조용)
      cardDetails: structuredData,
      
      // 학습 개선을 위한 메타데이터
      metadata: {
        generatedAt: new Date().toISOString(),
        model: aiInterpretation.generationMetadata?.model || 'hybrid-ml-ai-v1',
        keyThemes: mlAnalysis.keyThemes,
        cardSynergy: mlAnalysis.cardSynergy,
        ...aiInterpretation.generationMetadata
      }
    };
  }

  /**
   * AI 프롬프트 구성
   */
  buildAIPrompt(cards, question, spread, category, mlAnalysis, structuredData) {
    const cardDescriptions = cards.map((card, index) => {
      const structured = structuredData[index];
      return `${index + 1}. ${card.name} (${card.isReversed ? '역방향' : '정방향'}): ${structured.basicMeaning}`;
    }).join('\n');

    return `
질문: "${question}"
스프레드: ${spread}
카테고리: ${category}

뽑힌 카드들:
${cardDescriptions}

ML 분석 결과:
- 추천 감정 톤: ${mlAnalysis.emotionalTone}
- 복잡도 수준: ${mlAnalysis.complexityLevel}
- 핵심 테마: ${mlAnalysis.keyThemes.join(', ')}
- 카드 시너지: ${mlAnalysis.cardSynergy}

다음 조건을 만족하는 전문가급 타로 해석을 생성해주세요:
1. 질문과 카드의 연관성을 구체적으로 설명
2. 카드들 간의 스토리텔링과 흐름 중시
3. 실용적이고 구체적인 조언 포함
4. 자연스럽고 개인적인 대화체 사용
5. 템플릿적 표현 완전 배제
6. 한국 문화와 정서에 맞는 해석

해석을 시작해주세요.`;
  }

  /**
   * 학습 데이터 수집 시스템
   */
  storeLearningData(cards, question, spread, result) {
    const learningEntry = {
      timestamp: Date.now(),
      input: {
        cards: cards.map(c => ({ name: c.name, isReversed: c.isReversed })),
        question,
        spread,
        questionCategory: this.categorizeQuestion(question)
      },
      output: {
        interpretation: result.mainContent,
        predictedQuality: result.qualityMetrics.predictedQuality,
        actualLength: result.mainContent.length,
        keyThemes: result.metadata.keyThemes
      },
      feedback: null // 사용자 피드백은 별도 수집
    };

    this.learningData.push(learningEntry);
    
    // 100개 데이터마다 모델 재훈련 검토
    if (this.learningData.length % 100 === 0) {
      this.scheduleModelRetraining();
    }
  }

  /**
   * 사용자 피드백을 통한 지속적 학습
   */
  async updateFromFeedback(sessionId, feedback) {
    const entry = this.learningData.find(e => e.sessionId === sessionId);
    if (entry) {
      entry.feedback = {
        satisfaction: feedback.satisfaction, // 1-5 점수
        accuracy: feedback.accuracy,
        naturalness: feedback.naturalness,
        usefulness: feedback.usefulness,
        comments: feedback.comments
      };
      
      console.log(`📈 피드백 수집: 만족도 ${feedback.satisfaction}/5`);
    }
  }

  /**
   * 카드 벡터화 (ML 입력용)
   */
  vectorizeCards(cards) {
    // 78장 카드를 원-핫 벡터로 변환 + 역방향 정보
    const vector = new Array(78 * 2).fill(0);
    cards.forEach(card => {
      const cardIndex = this.getCardIndex(card.name);
      vector[cardIndex] = 1;
      if (card.isReversed) {
        vector[78 + cardIndex] = 1;
      }
    });
    return vector;
  }

  vectorizeQuestion(question) {
    // 질문을 주요 키워드 벡터로 변환
    const keywords = ['사랑', '연애', '결혼', '직업', '취업', '사업', '돈', '건강', '가족', '친구'];
    return keywords.map(keyword => 
      question.includes(keyword) ? 1 : 0
    );
  }

  vectorizeSpread(spread) {
    const spreads = ['단일카드', '3카드', '관계상담', '켈틱크로스'];
    return spreads.map(s => s === spread ? 1 : 0);
  }

  getDefaultMLAnalysis() {
    return {
      qualityScore: 0.7,
      emotionalTone: 'neutral',
      complexityLevel: 'medium',
      recommendedLength: 2500,
      keyThemes: ['성장', '변화'],
      cardSynergy: 0.6,
      userSatisfactionPrediction: 0.65
    };
  }

  // 유틸리티 메서드들
  getCardIndex(cardName) {
    // 78장 타로카드 인덱스 매핑
    const cardMap = {
      '바보': 0, '마법사': 1, '여교황': 2, '여황제': 3, '황제': 4,
      '교황': 5, '연인': 6, '전차': 7, '힘': 8, '은둔자': 9,
      '운명의수레바퀴': 10, '정의': 11, '매달린사람': 12, '죽음': 13, '절제': 14,
      '악마': 15, '탑': 16, '별': 17, '달': 18, '태양': 19, '심판': 20, '세계': 21,
      // 소아르카나는 간소화
      '완드 에이스': 22, '완드 2': 23, '완드 3': 24, '완드 기사': 25,
      // ... 나머지 카드들
    };
    return cardMap[cardName] || 0;
  }

  categorizeQuestion(question) {
    if (question.includes('사랑') || question.includes('연애')) return 'love';
    if (question.includes('직업') || question.includes('취업') || question.includes('부업')) return 'career';
    if (question.includes('돈') || question.includes('재정')) return 'money';
    return 'general';
  }

  mapToEmotionalTone(value) {
    if (value < 0.3) return 'supportive';
    if (value < 0.7) return 'neutral';
    return 'encouraging';
  }

  mapToComplexity(value) {
    if (value < 0.4) return 'simple';
    if (value < 0.7) return 'medium';
    return 'complex';
  }

  extractKeyThemes(themeVector) {
    const themes = ['성장', '변화', '도전', '기회', '관계', '성공'];
    return themes.filter((theme, index) => themeVector[index] > 0.5);
  }

  async scheduleModelRetraining() {
    console.log('🔄 ML 모델 재훈련 예약됨');
    // 백그라운드에서 모델 재훈련 로직
  }

  initLearningSystem() {
    console.log('📚 학습 시스템 초기화 완료');
  }

  getStructuredCardMeanings(cards) {
    // 기존 structuredTarotEngine에서 카드 의미 가져오기
    return cards.map(card => ({
      name: card.name,
      isReversed: card.isReversed,
      basicMeaning: '확장과 전망의 에너지', // 실제로는 DB에서 가져옴
      keywords: ['성장', '기회', '확장']
    }));
  }
}

/**
 * 단순한 패턴 분석기 클래스
 * 추후 실제 ML 모델로 대체 가능
 */
class PatternAnalyzer {
  analyze(cards, question, spread) {
    // 카드 조합 분석
    const cardSynergy = this.calculateCardSynergy(cards);
    const questionComplexity = this.analyzeQuestionComplexity(question);
    const spreadComplexity = this.getSpreadComplexity(spread);
    
    // 감정 톤 결정
    const emotionalTone = this.determineEmotionalTone(cards, question);
    
    // 추천 길이 계산
    const baseLength = this.getBaseLength(spread);
    const adjustedLength = baseLength + (cardSynergy * 500) + (questionComplexity * 300);
    
    // 핵심 테마 추출
    const keyThemes = this.extractKeyThemes(cards, question);
    
    return {
      qualityScore: Math.min(0.8 + (cardSynergy * 0.2), 0.95),
      emotionalTone,
      complexityLevel: this.mapComplexity(spreadComplexity + questionComplexity),
      recommendedLength: Math.floor(adjustedLength),
      keyThemes,
      cardSynergy,
      userSatisfactionPrediction: 0.7 + (cardSynergy * 0.2)
    };
  }
  
  calculateCardSynergy(cards) {
    // 카드들 간의 조화도 계산 (0-1)
    if (cards.length === 1) return 0.6;
    
    let synergyScore = 0;
    const suits = cards.map(c => this.getCardSuit(c.name));
    const elements = cards.map(c => this.getCardElement(c.name));
    
    // 같은 수트나 원소가 많으면 시너지 증가
    const suitVariety = new Set(suits).size;
    const elementVariety = new Set(elements).size;
    
    synergyScore = 1 - (suitVariety + elementVariety) / (cards.length * 2);
    return Math.max(0.2, Math.min(0.9, synergyScore));
  }
  
  analyzeQuestionComplexity(question) {
    // 질문의 복잡도 분석 (0-1)
    const complexKeywords = ['왜', '어떻게', '언제', '관계', '미래', '과거'];
    const matches = complexKeywords.filter(keyword => question.includes(keyword)).length;
    return Math.min(matches / complexKeywords.length, 1);
  }
  
  getSpreadComplexity(spread) {
    const complexityMap = {
      '단일카드': 0.2,
      '3카드': 0.5,
      '관계상담': 0.7,
      '켈틱크로스': 0.9
    };
    return complexityMap[spread] || 0.5;
  }
  
  determineEmotionalTone(cards, question) {
    // 감정 톤 결정 로직
    const positiveCards = ['태양', '별', '세계', '완드 에이스'];
    const challengingCards = ['탑', '죽음', '소드 3', '펜타클 5'];
    
    const hasPositive = cards.some(c => positiveCards.includes(c.name));
    const hasChallenging = cards.some(c => challengingCards.includes(c.name));
    
    if (hasPositive && !hasChallenging) return 'encouraging';
    if (hasChallenging && !hasPositive) return 'supportive';
    return 'neutral';
  }
  
  getBaseLength(spread) {
    const baseLengths = {
      '단일카드': 2000,
      '3카드': 2800,
      '관계상담': 3200,
      '켈틱크로스': 4000
    };
    return baseLengths[spread] || 2500;
  }
  
  extractKeyThemes(cards, question) {
    const themes = [];
    
    // 질문 기반 테마
    if (question.includes('사랑') || question.includes('연애')) themes.push('사랑');
    if (question.includes('직업') || question.includes('부업')) themes.push('커리어');
    if (question.includes('돈') || question.includes('재정')) themes.push('재정');
    
    // 카드 기반 테마
    const cardThemes = {
      '완드': '열정',
      '컵': '감정',
      '소드': '도전',
      '펜타클': '현실'
    };
    
    cards.forEach(card => {
      Object.keys(cardThemes).forEach(suit => {
        if (card.name.includes(suit)) {
          themes.push(cardThemes[suit]);
        }
      });
    });
    
    return [...new Set(themes)].slice(0, 3); // 중복 제거 후 최대 3개
  }
  
  mapComplexity(score) {
    if (score < 0.4) return 'simple';
    if (score < 0.7) return 'medium';
    return 'complex';
  }
  
  getCardSuit(cardName) {
    if (cardName.includes('완드')) return 'wands';
    if (cardName.includes('컵')) return 'cups';
    if (cardName.includes('소드')) return 'swords';
    if (cardName.includes('펜타클')) return 'pentacles';
    return 'major';
  }
  
  getCardElement(cardName) {
    const suitElements = {
      'wands': 'fire',
      'cups': 'water', 
      'swords': 'air',
      'pentacles': 'earth',
      'major': 'spirit'
    };
    return suitElements[this.getCardSuit(cardName)] || 'spirit';
  }
}

module.exports = HybridTarotEngine;