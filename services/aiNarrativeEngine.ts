import { TarotCard, SelectedCard, Category, SpreadType } from '../types/tarot';
import { emotionAnalyzer, EmotionalContext } from '../ai/emotion-analyzer';
import { ollamaAI } from './ollamaAI';
import { enhancedOllamaAI } from './enhancedOllamaAI';

/**
 * AI 기반 자연스러운 타로 해석 생성 엔진
 * v2.0 Phase 1.3 - 고급 감정 분석 통합
 */
export class AINavigativeEngine {
  
  private emotionalContextCache: Map<string, EmotionalContext> = new Map();
  
  /**
   * 감정적 컨텍스트 분석 및 캐싱
   */
  private async getEmotionalContext(
    question: string, 
    category: Category
  ): Promise<EmotionalContext> {
    const cacheKey = `${question}-${category}`;
    
    if (this.emotionalContextCache.has(cacheKey)) {
      return this.emotionalContextCache.get(cacheKey)!;
    }
    
    const context = await emotionAnalyzer.analyzeEmotionalContext(question, category);
    this.emotionalContextCache.set(cacheKey, context);
    
    return context;
  }
  
  /**
   * 켈틱 크로스 전용 심화 해석 생성 (기존 방식 유지)
   */
  public async generateCelticCrossNarrative(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<string> {
    console.log(`🤖 켈틱크로스 AI 해석 시작: ${question}`);
    
    try {
      // AI로 켈틱크로스 해석 생성
      const cardsInfo = cards.map((card, index) => ({
        name: card.card.koreanName,
        isReversed: card.isReversed,
        position: this.getCelticCrossPositionName(index)
      }));

      const aiResponse = await ollamaAI.generateCelticCrossInterpretation(
        cardsInfo,
        question,
        category
      );
      
      console.log(`✅ 켈틱크로스 AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('켈틱크로스 AI 해석 실패, fallback 사용:', error);
      
      // AI 실패시 기존 방식 사용
      const analysis = this.analyzeCelticCrossPattern(cards, question);
      return this.createCelticCrossStory(cards, analysis, question, category);
    }
  }

  private getCelticCrossPositionName(index: number): string {
    const positions = [
      '현재 상황', '장애물/도전', '과거', '미래',  
      '가능한 결과', '최근 영향', '당신의 접근',
      '외부 영향', '희망과 두려움', '최종 결과'
    ];
    return positions[index] || `${index + 1}번째 위치`;
  }

  /**
   * 단일 카드 AI 해석 (진짜 AI 사용!)
   */
  public async generateSingleCardNarrative(
    card: SelectedCard,
    question: string,
    category: Category
  ): Promise<string> {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    // 기본 해석 정보 가져오기
    const orientation = isReversed ? 'reversed' : 'upright';
    const baseInterpretation = card.card.interpretations[orientation][category];
    
    try {
      // 🎯 진짜 AI로 해석 생성!
      console.log(`🤖 AI 단일카드 해석 생성 중: ${cardName} (${question})`);
      
      const aiInterpretation = await enhancedOllamaAI.generateProfessionalSingleCardInterpretation(
        cardName,
        isReversed,
        question,
        category,
        baseInterpretation
      );
      
      console.log(`✅ AI 해석 완료: ${aiInterpretation.length}자`);
      return aiInterpretation;
      
    } catch (error) {
      console.error('AI 해석 생성 실패, 기본 해석 사용:', error);
      
      // AI 실패시 기본 해석 사용 (fallback)
      return this.generateFallbackSingleCardNarrative(card, question, category);
    }
  }

  /**
   * AI 실패시 사용할 기본 해석 (기존 로직)
   */
  private generateFallbackSingleCardNarrative(
    card: SelectedCard,
    question: string,
    category: Category
  ): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation][category];
    const advice = card.card.advice[orientation];
    
    let narrative = `**${cardName}${isReversed ? ' 역방향' : ''}이 전하는 메시지**\n\n`;
    narrative += `"${question}"에 대한 답변입니다.\n\n`;
    narrative += `${interpretation}\n\n`;
    narrative += `**조언**: ${advice.action}\n\n`;
    narrative += `**주의사항**: ${advice.avoid}\n\n`;
    narrative += `**집중할 점**: ${advice.focus}\n\n`;
    narrative += `🌟 카드가 전하는 메시지를 마음깊이 새기시고, 자신을 믿고 나아가세요.`;
    
    return narrative;
  }

  /**
   * 3카드 스프레드 스토리텔링
   */
  public async generateThreeCardNarrative(
    cards: SelectedCard[],
    question: string,
    category: Category
  ): Promise<string> {
    console.log(`🤖 3카드 AI 해석 시작: ${question}`);
    
    try {
      // AI로 3카드 종합 해석 생성
      const cardsDescription = cards.map((card, index) => {
        const position = index === 0 ? '과거' : index === 1 ? '현재' : '미래';
        const orientation = card.isReversed ? '역방향' : '정방향';
        return `${position}: ${card.card.koreanName} ${orientation}`;
      }).join(', ');

      const prompt = `"${question}" 질문에 대한 3카드 타로 해석:

${cardsDescription}

위 3장의 카드가 과거-현재-미래의 흐름으로 전하는 메시지를 500자 내외로 작성해주세요. 각 카드의 의미와 전체적인 흐름을 포함해주세요.`;

      const aiResponse = await ollamaAI.generateThreeCardInterpretation(
        cards.map(c => c.card.koreanName).join(', '),
        question,
        category,
        cardsDescription
      );
      
      console.log(`✅ 3카드 AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('3카드 AI 해석 실패, fallback 사용:', error);
      
      // AI 실패시 기존 방식 사용
      const analysis = this.analyzeThreeCardFlow(cards, question);
      return this.createThreeCardStory(cards, analysis, question, category);
    }
  }

  /**
   * 관계 상담 감정적 내러티브
   */
  public async generateRelationshipNarrative(
    cards: SelectedCard[],
    question: string
  ): Promise<string> {
    console.log(`🤖 관계상담 AI 해석 시작: ${question}`);
    
    try {
      // AI로 관계상담 해석 생성
      const cardsInfo = cards.map((card, index) => ({
        name: card.card.koreanName,
        isReversed: card.isReversed,
        position: `${index + 1}번째`
      }));

      const aiResponse = await ollamaAI.generateRelationshipInterpretation(
        cardsInfo,
        question,
        'love'
      );
      
      console.log(`✅ 관계상담 AI 해석 완료: ${aiResponse.length}자`);
      return aiResponse;
      
    } catch (error) {
      console.error('관계상담 AI 해석 실패, fallback 사용:', error);
      
      // AI 실패시 기존 방식 사용
      const analysis = this.analyzeRelationshipDynamics(cards, question);
      const relationshipEmotion = this.analyzeRelationshipEmotion(question);
      return this.createRelationshipStory(cards, analysis, question, relationshipEmotion);
    }
  }

  /**
   * 켈틱 크로스 패턴 분석
   */
  private analyzeCelticCrossPattern(cards: SelectedCard[], question: string): any {
    const positions = {
      present: cards[0],           // 현재 상황
      challenge: cards[1],         // 도전과제
      distantPast: cards[2],       // 먼 과거
      recentPast: cards[3],        // 가까운 과거
      possibleFuture: cards[4],    // 가능한 미래
      nearFuture: cards[5],        // 가까운 미래
      yourApproach: cards[6],      // 당신의 접근
      externalInfluence: cards[7], // 외부 영향
      hopesAndFears: cards[8],     // 희망과 두려움
      outcome: cards[9]            // 최종 결과
    };

    // 전체적인 에너지 흐름 파악
    const overallEnergy = this.calculateOverallEnergy(cards);
    const majorArcanaCount = cards.filter(c => c.card.suit === 'major').length;
    const dominantSuit = this.findDominantSuit(cards);
    const conflictPattern = this.identifyConflictPattern(positions);
    
    return {
      positions,
      overallEnergy,
      majorArcanaCount,
      dominantSuit,
      conflictPattern,
      centralTheme: this.extractCentralTheme(positions, question)
    };
  }

  /**
   * 켈틱 크로스 스토리 생성
   */
  private createCelticCrossStory(
    cards: SelectedCard[],
    analysis: any,
    question: string,
    category: Category
  ): string {
    const { positions, overallEnergy, majorArcanaCount, dominantSuit, conflictPattern, centralTheme } = analysis;

    let narrative = '';

    // 1. 감정적 인트로 생성
    narrative += this.createEmotionalIntro(question, centralTheme, overallEnergy);
    narrative += '\n\n';

    // 2. 현재 갈등 구조 분석 (1-4번 카드)
    narrative += '**현재의 갈등과 그 원인 (1, 2, 3, 4번 카드)**\n';
    narrative += this.analyzeCurrentConflict(positions);
    narrative += '\n\n';

    // 3. 잠재력과 방향성 (5-9번 카드)
    narrative += '**당신의 잠재력과 나아갈 길 (7, 8, 9, 5, 6번 카드)**\n';
    narrative += this.analyzePotentialAndDirection(positions);
    narrative += '\n\n';

    // 4. 최종 결론과 조언 (10번 카드)
    narrative += '**최종 결론과 가장 중요한 조언 (10번 카드)**\n';
    narrative += this.createFinalGuidance(positions.outcome, question, overallEnergy);

    return narrative;
  }

  /**
   * 켈틱 크로스 감정적 인트로 생성
   */
  private createEmotionalIntro(question: string, theme: string, energy: string): string {
    const questionEmotion = this.analyzeQuestionEmotion(question);
    const themeTitle = this.generateCelticCrossEmotionalTitle(theme, questionEmotion);
    
    const emotionalIntros = {
      'confusion': [
        `"${themeTitle}"\n\n혼란스러운 마음으로 던진 깊은 질문에, 10장의 카드가 마치 지혜로운 현자처럼 차근차근 답해줍니다. 지금의 복잡함 속에 숨어있는 아름다운 진실을 함께 찾아가보세요.`,
        `"${themeTitle}"\n\n답답한 마음으로 이 자리에 앉은 당신을 보며, 켈틱 크로스의 10장 카드가 "괜찮다, 모든 것이 제자리를 찾아갈 거야"라고 다정하게 속삭입니다.`
      ],
      'anxiety': [
        `"${themeTitle}"\n\n불안한 마음을 품고 온 당신에게, 10장의 카드가 따뜻한 위로와 함께 "당신은 생각보다 훨씬 강한 사람이야"라고 말해줍니다.`,
        `"${themeTitle}"\n\n걱정으로 무거운 가슴을 안고 있는 당신을 위해, 켈틱 크로스가 희망의 이야기를 펼쳐보입니다.`
      ],
      'hope': [
        `"${themeTitle}"\n\n희망을 품고 기다리는 당신의 아름다운 마음에, 10장의 카드가 감동받아 가장 밝은 미래의 그림을 그려줍니다.`,
        `"${themeTitle}"\n\n꿈을 향한 간절한 마음으로 물은 질문에, 켈틱 크로스가 그 꿈이 현실이 되는 과정을 상세히 보여줍니다.`
      ],
      'transformation': [
        `"${themeTitle}"\n\n변화를 갈망하는 용기 있는 당신에게, 10장의 카드가 박수를 보내며 새로운 인생의 청사진을 펼쳐보입니다.`,
        `"${themeTitle}"\n\n과거를 벗어나 새로운 자신이 되고 싶은 간절함에, 켈틱 크로스가 그 변화의 여정을 단계별로 안내해줍니다.`
      ],
      'seeking': [
        `"${themeTitle}"\n\n진실을 찾으려는 당신의 순수한 마음에 깊이 감동받은 듯, 10장의 카드가 가장 정직하고 깊이 있는 답을 준비했습니다.`,
        `"${themeTitle}"\n\n인생의 의미를 묻는 당신의 철학적 질문에, 켈틱 크로스가 우주의 지혜를 담아 응답합니다.`
      ]
    };

    const intros = emotionalIntros[questionEmotion as keyof typeof emotionalIntros] || emotionalIntros['seeking'];
    const selectedIntro = intros[this.generateSeed(question) % intros.length];
    return selectedIntro;
  }

  /**
   * 켈틱 크로스 감정적 제목 생성
   */
  private generateCelticCrossEmotionalTitle(theme: string, emotion: string): string {
    const emotionalTitles = {
      'confusion': [
        '혼란 속에서 피어나는 10개의 지혜로운 빛',
        '답답한 마음이 평온으로 변하는 신성한 여정',
        '미로 같은 인생에서 찾은 10개의 안내등'
      ],
      'anxiety': [
        '불안을 용기로 바꾸는 10장의 치유 카드',
        '걱정 많은 마음에 전하는 우주의 10가지 위로',
        '두려움 너머에 기다리는 10개의 축복'
      ],
      'hope': [
        '희망의 씨앗이 만개하는 10단계 이야기',
        '꿈이 현실이 되는 10개의 신비로운 단계',
        '기다림이 기적으로 변하는 켈틱의 예언'
      ],
      'transformation': [
        '나비가 되기 위한 10개의 변화 단계',
        '과거의 나를 벗고 새롭게 태어나는 여정',
        '영혼의 진화를 보여주는 10장의 계시'
      ],
      'seeking': [
        '진실을 찾는 영혼에게 주는 10개의 열쇠',
        '인생의 의미를 밝혀주는 신성한 십자가',
        '구도자의 마음에 응답하는 켈틱의 지혜'
      ]
    };

    const titles = emotionalTitles[emotion as keyof typeof emotionalTitles] || emotionalTitles['seeking'];
    const seed = this.generateSeed(theme + emotion);
    return titles[seed % titles.length];
  }

  /**
   * 현재 갈등 분석 (1-4번 카드)
   */
  private analyzeCurrentConflict(positions: any): string {
    const present = positions.present;
    const challenge = positions.challenge;
    const distantPast = positions.distantPast;
    const recentPast = positions.recentPast;

    let analysis = '';

    // 1. 현재 상황 심화 분석
    analysis += `**1. 현재 상황: ${present.card.koreanName}${present.isReversed ? ' (역방향)' : ' (정방향)'}**\n\n`;
    
    const presentInterpretation = present.card.interpretations[present.isReversed ? 'reversed' : 'upright']['general'];
    analysis += `${presentInterpretation}\n\n`;
    
    if (present.isReversed) {
      analysis += `역방향으로 나타난 것은 현재 상황에서 내적 변화나 재검토가 필요함을 의미합니다. 겉으로는 문제가 없어 보이지만, 내면에서는 중요한 깨달음이 일어나고 있어요.\n\n`;
    } else {
      analysis += `정방향으로 나타난 것은 현재 상황이 자연스러운 흐름을 따르고 있음을 의미합니다. 지금이 행동하기에 좋은 시기일 가능성이 높아요.\n\n`;
    }

    // 2. 도전과제 분석
    analysis += `**2. 도전과제: ${challenge.card.koreanName}${challenge.isReversed ? ' (역방향)' : ' (정방향)'}**\n\n`;
    
    const challengeInterpretation = challenge.card.interpretations[challenge.isReversed ? 'reversed' : 'upright']['general'];
    analysis += `현재 당신이 마주한 핵심 과제는 다음과 같습니다: ${challengeInterpretation}\n\n`;
    
    analysis += `이 도전은 단순한 장애물이 아니라 성장을 위한 기회입니다. ${challenge.card.koreanName}이 가르쳐주는 교훈을 받아들인다면, 현재 상황을 한 단계 발전시킬 수 있을 것입니다.\n\n`;

    // 3. 과거의 영향 분석
    analysis += `**3. 과거의 뿌리**\n\n`;
    analysis += `**먼 과거 (${distantPast.card.koreanName}${distantPast.isReversed ? ' 역방향' : ''})**: `;
    const distantPastInterpretation = distantPast.card.interpretations[distantPast.isReversed ? 'reversed' : 'upright']['general'];
    analysis += `${distantPastInterpretation} 이 경험이 현재 상황의 깊은 토대를 만들었습니다.\n\n`;
    
    analysis += `**가까운 과거 (${recentPast.card.koreanName}${recentPast.isReversed ? ' 역방향' : ''})**: `;
    const recentPastInterpretation = recentPast.card.interpretations[recentPast.isReversed ? 'reversed' : 'upright']['general'];
    analysis += `${recentPastInterpretation} 최근의 이런 경험들이 현재 상황으로 이어졌습니다.`;

    return analysis;
  }

  /**
   * 잠재력과 방향성 분석
   */
  private analyzePotentialAndDirection(positions: any): string {
    const yourApproach = positions.yourApproach;
    const externalInfluence = positions.externalInfluence;
    const hopesAndFears = positions.hopesAndFears;
    const possibleFuture = positions.possibleFuture;
    const nearFuture = positions.nearFuture;

    let analysis = '';

    // 7번 카드: 당신의 접근법 - 내면의 힘과 잠재력
    const yourApproachCard = yourApproach.card;
    const yourOrientation = yourApproach.isReversed;
    const yourInterpretation = yourApproachCard.interpretations[yourOrientation ? 'reversed' : 'upright']['general'];
    
    analysis += `**7. 당신의 내면 접근법: ${yourApproachCard.koreanName}${yourOrientation ? ' 역방향' : ''}**\n\n`;
    analysis += `이 모든 어려움 속에서도, 당신의 내면에는 특별한 힘이 숨어있습니다. ${yourApproachCard.koreanName}${yourOrientation ? ' 역방향' : ''}이 보여주는 것은 바로 이것입니다.\n\n`;
    analysis += `${yourInterpretation}\n\n`;
    
    if (yourOrientation) {
      analysis += `비록 역방향으로 나왔지만, 이는 당신이 현재 이 능력을 완전히 발휘하지 못하고 있다는 의미입니다. 하지만 걱정하지 마세요. 이미 그 잠재력은 당신 안에 존재하고 있으니까요.\n\n`;
    } else {
      analysis += `정방향으로 나온 이 카드는 당신이 이미 올바른 방향으로 나아가고 있음을 보여줍니다. 자신을 더욱 믿어도 좋습니다.\n\n`;
    }
    
    // 8번 카드: 외부 영향 - 주변 환경과 도움
    const externalCard = externalInfluence.card;
    const externalOrientation = externalInfluence.isReversed;
    const externalInterpretation = externalCard.interpretations[externalOrientation ? 'reversed' : 'upright']['general'];
    
    analysis += `**8. 외부 환경과 도움: ${externalCard.koreanName}${externalOrientation ? ' 역방향' : ''}**\n\n`;
    analysis += `당신을 둘러싼 환경과 주변 사람들은 어떤 영향을 주고 있을까요? ${externalCard.koreanName}${externalOrientation ? ' 역방향' : ''}이 그 답을 줍니다.\n\n`;
    analysis += `${externalInterpretation}\n\n`;
    
    if (externalOrientation) {
      analysis += `역방향으로 나온 것은 현재 외부의 도움이 제한적이거나, 또는 주변의 에너지가 다소 복잡할 수 있음을 의미합니다. 하지만 이것 역시 당신을 더 독립적이고 강하게 만드는 과정일 수 있어요.\n\n`;
    } else {
      analysis += `정방향으로 나온 이 카드는 주변 환경이 당신에게 도움이 되는 방향으로 작용하고 있음을 보여줍니다. 주변의 도움을 받아들이는 것을 두려워하지 마세요.\n\n`;
    }
    
    // 9번 카드: 희망과 두려움 - 깊은 내면의 감정
    const hopesCard = hopesAndFears.card;
    const hopesOrientation = hopesAndFears.isReversed;
    const hopesInterpretation = hopesCard.interpretations[hopesOrientation ? 'reversed' : 'upright']['general'];
    
    analysis += `**9. 마음 깊은 곳의 희망과 두려움: ${hopesCard.koreanName}${hopesOrientation ? ' 역방향' : ''}**\n\n`;
    analysis += `당신의 마음 가장 깊은 곳에서는 무엇을 바라고, 무엇을 두려워하고 있나요? ${hopesCard.koreanName}${hopesOrientation ? ' 역방향' : ''}이 그 진실한 감정을 드러냅니다.\n\n`;
    analysis += `${hopesInterpretation}\n\n`;
    
    if (hopesOrientation) {
      analysis += `역방향으로 나온 것은 당신이 원하는 것에 대해 두려움이나 의심을 가지고 있을 수 있음을 보여줍니다. 하지만 이 두려움을 인정하는 것 자체가 성장의 첫걸음입니다.\n\n`;
    } else {
      analysis += `정방향으로 나온 이 카드는 당신의 진정한 희망이 무엇인지 명확히 보여줍니다. 이 희망을 향해 나아가는 것을 두려워하지 마세요.\n\n`;
    }
    
    // 5번, 6번 카드: 미래의 가능성들
    const possibleCard = possibleFuture.card;
    const possibleOrientation = possibleFuture.isReversed;
    const possibleInterpretation = possibleCard.interpretations[possibleOrientation ? 'reversed' : 'upright']['general'];
    
    const nearCard = nearFuture.card;
    const nearOrientation = nearFuture.isReversed;
    const nearInterpretation = nearCard.interpretations[nearOrientation ? 'reversed' : 'upright']['general'];
    
    analysis += `**미래의 두 가지 가능성**\n\n`;
    analysis += `**5. 가능한 미래: ${possibleCard.koreanName}${possibleOrientation ? ' 역방향' : ''}**\n`;
    analysis += `${possibleInterpretation}\n\n`;
    
    analysis += `**6. 가까운 미래: ${nearCard.koreanName}${nearOrientation ? ' 역방향' : ''}**\n`;
    analysis += `${nearInterpretation}\n\n`;
    
    // 종합적인 잠재력 분석
    analysis += `**🌟 당신의 진정한 잠재력**\n\n`;
    analysis += `이 다섯 장의 카드들이 보여주는 것은 당신 안에 엄청난 잠재력이 숨어있다는 것입니다. `;
    analysis += `내면의 ${yourApproachCard.koreanName}의 힘과, 외부의 ${externalCard.koreanName}의 지원, `;
    analysis += `그리고 마음 깊은 곳의 ${hopesCard.koreanName}의 진실한 바람이 모두 합쳐져서 `;
    analysis += `${possibleCard.koreanName}과 ${nearCard.koreanName}으로 이어지는 미래를 만들어가고 있습니다.\n\n`;
    
    analysis += `중요한 것은 이 모든 것이 이미 당신 안에 존재한다는 것입니다. 당신은 이미 충분히 준비되어 있어요.`;
    
    return analysis;
  }

  /**
   * 최종 가이던스 생성
   */
  private createFinalGuidance(outcome: SelectedCard, question: string, overallEnergy: string): string {
    const outcomeCard = outcome.card;
    const isReversed = outcome.isReversed;
    const interpretation = outcomeCard.interpretations[isReversed ? 'reversed' : 'upright']['general'];
    const advice = outcomeCard.advice[isReversed ? 'reversed' : 'upright'];

    let guidance = '';
    
    // 감동적인 시작 - 여정의 마무리
    guidance += `**10. 최종 결과와 운명의 메시지: ${outcomeCard.koreanName}${isReversed ? ' 역방향' : ''}**\n\n`;
    guidance += `마침내 여정의 끝에서 만난 ${outcomeCard.koreanName}${isReversed ? ' 역방향' : ''}을 보니, 가슴이 뭉클해집니다. `;
    guidance += `지금까지의 모든 과정이 이 순간을 위한 것이었다는 느낌이 들어요.\n\n`;
    
    // 카드의 핵심 메시지
    guidance += `**💫 운명이 전하는 핵심 메시지**\n\n`;
    guidance += `${interpretation}\n\n`;
    
    // 방향성에 따른 깊이 있는 해석
    if (isReversed) {
      guidance += `역방향으로 나온 것은 단순한 좌절이 아닙니다. 오히려 더 깊은 성찰과 내면의 변화가 필요하다는 우주의 지혜로운 신호예요. `;
      guidance += `때로는 겉으로 보기에 어려운 결과가 실제로는 더 큰 성장을 위한 디딤돌이 되곤 하거든요.\n\n`;
    } else {
      guidance += `정방향으로 나온 것은 정말 축복입니다! 당신의 모든 노력과 의도가 우주와 조화롭게 맞아떨어지고 있다는 증거예요. `;
      guidance += `이 길을 계속 걸어가면 분명히 원하는 목표에 도달할 수 있을 거예요.\n\n`;
    }
    
    // 질문과 연결된 개인화된 메시지
    guidance += `**🎯 "${question}"에 대한 최종 답변**\n\n`;
    
    if (question.includes('미래') || question.includes('될까')) {
      guidance += `미래에 대한 당신의 궁금증에 ${outcomeCard.koreanName}이 답해줍니다. `;
      guidance += `앞으로의 길이 어떠할지는 이미 결정되어 있는 것이 아니라, 당신의 선택과 행동에 따라 계속 만들어져 가는 것이에요.\n\n`;
    } else if (question.includes('관계') || question.includes('사랑')) {
      guidance += `관계에 대한 당신의 진심어린 질문에 ${outcomeCard.koreanName}이 따뜻한 답을 줍니다. `;
      guidance += `사랑은 완벽함이 아니라 함께 성장해가는 과정이라는 것을 기억하세요.\n\n`;
    } else if (question.includes('일') || question.includes('직장') || question.includes('취업')) {
      guidance += `일과 커리어에 대한 고민에 ${outcomeCard.koreanName}이 현실적이면서도 희망적인 답을 줍니다. `;
      guidance += `성공은 하루아침에 이루어지는 것이 아니라 꾸준한 노력의 결실이라는 것을 잊지 마세요.\n\n`;
    } else {
      guidance += `당신의 깊은 질문에 ${outcomeCard.koreanName}이 지혜로운 답을 줍니다. `;
      guidance += `인생의 모든 경험에는 의미가 있고, 지금 이 순간도 당신을 더 나은 사람으로 만들어가는 소중한 과정이에요.\n\n`;
    }
    
    // 구체적이고 실용적인 조언
    guidance += `**🌟 구체적인 행동 지침**\n\n`;
    guidance += `**해야 할 것**: ${advice.action}\n\n`;
    guidance += `**피해야 할 것**: ${advice.avoid}\n\n`;
    guidance += `**집중해야 할 점**: ${advice.focus}\n\n`;
    
    // 전체 에너지와 연결된 종합적 조언
    guidance += `**🎨 전체적인 조화와 균형**\n\n`;
    
    if (overallEnergy === 'positive') {
      guidance += `전체적으로 매우 긍정적인 에너지가 흐르고 있습니다. 자신감을 가지고 앞으로 나아가세요. `;
      guidance += `다만 겸손함을 잃지 않는 것이 중요해요. 성공의 순간에도 감사하는 마음을 잊지 마세요.\n\n`;
    } else if (overallEnergy === 'challenging') {
      guidance += `지금은 도전적인 시기이지만, 이 모든 어려움이 당신을 더 강하고 지혜롭게 만들고 있습니다. `;
      guidance += `폭풍이 지나간 후에는 더욱 맑고 아름다운 하늘이 기다리고 있어요.\n\n`;
    } else {
      guidance += `균형잡힌 에너지 속에서 차근차근 성장해가고 있습니다. `;
      guidance += `급하지 않게, 그러나 포기하지 않고 꾸준히 나아가는 것이 가장 좋은 방법이에요.\n\n`;
    }
    
    // 감동적인 마무리 - 희망과 격려의 메시지
    guidance += `**💝 마지막 축복의 메시지**\n\n`;
    guidance += `10장의 카드가 들려준 이 긴 이야기의 끝에서 가장 중요한 것은 이것입니다: `;
    guidance += `당신은 혼자가 아니에요. 우주는 항상 당신의 편이고, 모든 경험은 당신을 더 완전한 사람으로 만들어가는 귀중한 선물입니다.\n\n`;
    
    guidance += `${outcomeCard.koreanName}이 마지막으로 전하는 메시지를 가슴 깊이 새기세요: `;
    guidance += `"당신의 인생은 이미 그 자체로 완벽하고 아름다운 작품이에요. 자신을 믿고, 사랑하고, `;
    guidance += `한 걸음씩 나아가다 보면 어느새 꿈꿔왔던 모든 것들이 현실이 되어 있을 거예요."\n\n`;
    
    guidance += `🌈 **당신은 충분히 사랑받을 자격이 있고, 행복해질 자격이 있는 소중한 사람입니다.**`;
    
    return guidance;
  }

  /**
   * 질문의 감정 분석
   */
  private analyzeQuestionEmotion(question: string): string {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('답답') || lowerQ.includes('막막') || lowerQ.includes('모르겠')) {
      return 'confusion';
    } else if (lowerQ.includes('두려') || lowerQ.includes('불안') || lowerQ.includes('걱정')) {
      return 'anxiety';
    } else if (lowerQ.includes('희망') || lowerQ.includes('기대') || lowerQ.includes('꿈')) {
      return 'hope';
    } else if (lowerQ.includes('변화') || lowerQ.includes('시작') || lowerQ.includes('새로')) {
      return 'transformation';
    } else {
      return 'seeking';
    }
  }

  /**
   * 테마 제목 생성
   */
  private generateThemeTitle(theme: string, emotion: string): string {
    const titleMap: Record<string, string[]> = {
      'confusion': [
        '멈춤 속에서 길을 찾는 당신에게',
        '안개를 걷어내고 선명함을 찾는 여정',
        '혼란 속에 숨겨진 명확한 답'
      ],
      'anxiety': [
        '두려움 너머에 기다리는 새로운 가능성',
        '불안을 지혜로 바꾸는 시간',
        '걱정이 선물로 바뀌는 순간'
      ],
      'hope': [
        '희망의 씨앗이 꽃피우려는 순간',
        '꿈이 현실이 되는 길목에서',
        '기대가 확신이 되는 전환점'
      ],
      'transformation': [
        '변화의 문턱에 선 당신의 선택',
        '새로운 시작을 위한 용기의 메시지',
        '과거를 넘어 미래로 향하는 여정'
      ],
      'seeking': [
        '답을 찾는 당신에게 전하는 메시지',
        '길을 묻는 영혼에게 주는 나침반',
        '진실을 향한 당신의 여정'
      ]
    };

    const titles = titleMap[emotion] || titleMap['seeking'];
    const seed = this.generateSeed(theme + emotion);
    return titles[seed % titles.length];
  }

  /**
   * 유틸리티: 시드 생성
   */
  private generateSeed(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * 카드의 핵심 메시지 추출
   */
  private extractCoreMessage(card: SelectedCard): string {
    const coreMessages: Record<string, string> = {
      '바보': '새로운 시작',
      '마법사': '의지력과 창조',
      '여교황': '직감과 내면의 지혜',
      '여제': '풍요와 창조성',
      '황제': '안정과 질서',
      '교황': '전통과 가르침',
      '연인': '선택과 조화',
      '전차': '의지와 통제',
      '힘': '내적 용기',
      '은둔자': '내면 탐구',
      '운명의 바퀴': '변화의 순환',
      '정의': '균형과 공정',
      '매달린 사람': '관점의 전환',
      '죽음': '변화와 재생',
      '절제': '조화와 균형',
      '악마': '유혹과 속박',
      '탑': '갑작스런 변화',
      '별': '희망과 치유',
      '달': '환상과 직감',
      '태양': '성공과 기쁨',
      '심판': '각성과 용서',
      '세계': '완성과 달성'
    };

    return coreMessages[card.card.koreanName] || '변화와 성장';
  }

  /**
   * 맥락적 해석 생성
   */
  private generateContextualInterpretation(card: SelectedCard, position: string): string {
    const interpretations: Record<string, string[]> = {
      '바보': [
        '앞으로 나아가야 한다는 것을 알면서도, 무언가 끝나야 한다는 것을 느끼면서도, 두려움 때문에 낡은 것을 놓지 못하고 있어요.',
        '새로운 시작을 향한 순수한 열망이 있지만, 과거의 경험들이 발목을 잡고 있는 상황입니다.'
      ],
      '죽음': [
        '앞으로 나아가야 한다는 것을 알면서도, 무언가 끝나야 한다는 것을 느끼면서도, 두려움 때문에 낡은 것을 놓지 못하고 있어요. 성장을 위해 꼭 필요한 변화를 애써 외면하고 있는 모습입니다.',
        '변화가 필요하다는 것을 깊이 알고 있지만, 익숙한 것을 떠나는 두려움이 앞서고 있습니다.'
      ],
      '매달린 사람': [
        '현재 상황에서 어떤 행동도 취하기 어려운 정체 상태에 있습니다. 하지만 이 멈춤이 새로운 관점을 얻기 위한 필연적 과정일 수 있어요.',
        '스스로를 희생하거나 포기해야 하는 상황에 놓여 있지만, 이것이 더 큰 깨달음으로 이어질 징조입니다.'
      ]
    };

    const cardName = card.card.koreanName;
    const cardInterpretations = interpretations[cardName] || [
      `${cardName}의 에너지가 현재 상황의 핵심을 관통하고 있습니다.`
    ];

    const seed = this.generateSeed(cardName + position);
    return cardInterpretations[seed % cardInterpretations.length];
  }

  /**
   * 도전과제 내러티브 생성
   */
  private generateChallengeNarrative(challenge: SelectedCard, present: SelectedCard): string {
    const challengeCard = challenge.card.koreanName;
    const isReversed = challenge.isReversed;

    const narratives: Record<string, string> = {
      '심판': isReversed ? 
        '과거의 실수나 후회에 대한 지나친 죄책감, 스스로를 향한 날카로운 비판이 \'나는 바뀔 자격이 없어\' 또는 \'또 실패할 거야\'라며 당신의 발목을 잡고 있는 형국입니다.' :
        '내면의 목소리가 변화를 재촉하고 있지만, 그 변화의 크기에 압도되어 주저하고 있는 상황입니다.',
      '악마': isReversed ?
        '오래된 습관이나 부정적인 패턴에서 벗어나려고 노력하고 있지만, 아직 완전히 자유롭지 못한 상태입니다.' :
        '물질적 욕망이나 타인의 기대에 얽매여 진정한 자신을 표현하지 못하고 있습니다.',
      '탑': isReversed ?
        '급격한 변화를 피하려 하지만, 결국 피할 수 없는 변화의 에너지가 내적으로 축적되고 있습니다.' :
        '예상치 못한 상황이나 갑작스러운 깨달음이 기존의 안정을 흔들고 있습니다.'
    };

    return narratives[challengeCard] || `${challengeCard}의 에너지가 현재 상황에 복잡함을 더하고 있습니다.`;
  }

  /**
   * 과거 연결 내러티브
   */
  private generatePastConnectionNarrative(distantPast: SelectedCard, recentPast: SelectedCard, present: SelectedCard): string {
    const distantCard = distantPast.card.koreanName;
    const recentCard = recentPast.card.koreanName;
    
    let narrative = `당신의 먼 과거(3. ${distantCard})를 보면, `;
    
    // 먼 과거 해석
    const distantNarratives: Record<string, string> = {
      '달': '꽤 오랫동안 안개 속을 걷는 것처럼 혼란스럽고 불안정한 시간을 보내셨던 것 같네요. 무엇이 진실인지, 내가 정말 원하는 것이 무엇인지조차 헷갈리는 시기였을 수 있습니다.',
      '은둔자': '혼자만의 시간을 통해 내면을 깊이 탐구하던 시기가 있었습니다. 답을 찾기 위해 외부보다는 내면으로 향했던 때였죠.',
      '탑': '갑작스럽고 충격적인 변화를 경험했던 시기가 있었습니다. 그때의 경험이 현재까지 영향을 미치고 있는 것 같아요.'
    };

    narrative += distantNarratives[distantCard] || `${distantCard}의 영향을 받는 중요한 시기를 보냈습니다.`;
    
    // 가까운 과거와 연결
    narrative += ` 그리고 그 ${this.extractEmotionalTone(distantPast)}은 가까운 과거(4. ${recentPast.isReversed ? '역방향 ' : ''}${recentCard})에 이르러, `;
    
    const recentNarratives: Record<string, string> = {
      '완드 에이스': recentPast.isReversed ?
        '좋은 아이디어나 열정이 있어도 첫발을 떼지 못하는 무력감으로 이어졌습니다. 에너지가 꽉 막혀버린 듯한 답답함이 느껴집니다.' :
        '새로운 시작에 대한 강한 동기가 생겼지만, 그것을 현실로 옮기는 데 어려움을 겪고 있습니다.',
      '컵 에이스': recentPast.isReversed ?
        '감정적으로 메마른 시기를 겪으며 사랑이나 창조적 영감을 찾기 어려워했습니다.' :
        '새로운 감정적 시작이나 영적 각성을 경험했지만, 그것을 지속시키는 데 도전을 느끼고 있습니다.'
    };

    narrative += recentNarratives[recentCard] || `${recentCard}의 에너지와 맞닥뜨리게 되었습니다.`;

    return narrative;
  }

  /**
   * 내적 강점 내러티브
   */
  private generateInnerStrengthNarrative(yourApproach: SelectedCard): string {
    const cardName = yourApproach.card.koreanName;
    
    const narratives: Record<string, string> = {
      '마법사': '이미 모든 준비가 끝났다고 말하고 있습니다. 당신은 원하는 것을 현실로 만들 수 있는 재능, 기술, 의지력을 모두 갖추고 있습니다. 당신은 결코 무력하지 않아요.',
      '여제': '풍부한 창조적 에너지와 양육하는 힘을 가지고 있음을 보여줍니다. 당신 안에는 무언가를 아름답게 꽃피울 수 있는 능력이 충분히 있어요.',
      '힘': '진정한 용기와 인내심을 가지고 있음을 알려줍니다. 외적인 힘이 아닌 내면의 고귀한 힘으로 어려움을 극복할 수 있습니다.'
    };

    return narratives[cardName] || `${cardName}의 긍정적 에너지를 내면에 간직하고 있습니다.`;
  }

  /**
   * 외부 지원 내러티브
   */
  private generateExternalSupportNarrative(externalInfluence: SelectedCard): string {
    const cardName = externalInfluence.card.koreanName;
    
    const narratives: Record<string, string> = {
      '세계': '당신의 노력이 결실을 맺고 하나의 큰 단계를 완성할 수 있는, 더없이 좋은 시기임을 보여줍니다.',
      '태양': '모든 조건이 당신에게 유리하게 작용하고 있으며, 성공과 행복이 자연스럽게 따라올 환경입니다.',
      '별': '희망과 치유의 에너지가 주변에서 당신을 지지하고 있습니다.'
    };

    return narratives[cardName] || `${cardName}의 긍정적 영향이 당신을 둘러싸고 있습니다.`;
  }

  /**
   * 희망과 두려움 내러티브
   */
  private generateHopesFearsNarrative(hopesAndFears: SelectedCard): string {
    const cardName = hopesAndFears.card.koreanName;
    
    if (cardName === '운명의 바퀴') {
      return '희망과 두려움을 나타내는 자리에 이 카드가 있다는 것은, \'이제 정말 좋은 쪽으로 인생이 바뀌었으면 좋겠다\'는 강한 열망과 함께, \'이 기회를 놓치면 어쩌지?\'하는 약간의 두려움이 공존함을 의미합니다.';
    }
    
    return `${cardName}에 대한 복잡한 감정을 가지고 있으며, 그것이 동시에 희망이자 두려움이 되고 있습니다.`;
  }

  /**
   * 미래 흐름 내러티브
   */
  private generateFutureFlowNarrative(possibleFuture: SelectedCard, nearFuture: SelectedCard): string {
    const possibleCard = possibleFuture.card.koreanName;
    const nearCard = nearFuture.card.koreanName;
    
    let narrative = `당신은 곧 미래를 계획하고(5. ${possibleCard}) 더 큰 세상을 향해 나아갈 준비를 할 것입니다. `;
    narrative += `하지만 그 과정이 순탄하지만은 않을 수 있습니다. 가까운 미래(6. ${nearCard})는 `;
    
    if (nearCard === '완드 7') {
      narrative += '당신의 신념과 입장을 지키기 위해 고군분투해야 하는 상황을 예고합니다. 외부의 비판이나 어려움에 맞서 싸워야 할 수도 있습니다.';
    } else {
      narrative += `${nearCard}의 에너지와 마주하게 될 것임을 시사합니다.`;
    }

    return narrative;
  }

  /**
   * 최종 지혜 추출
   */
  private extractFinalWisdom(outcome: SelectedCard): string {
    const cardName = outcome.card.koreanName;
    
    const wisdoms: Record<string, string> = {
      '매달린 사람': '힘을 빼고, 관점을 바꾸라',
      '은둔자': '내면의 목소리에 귀 기울이라',
      '별': '희망을 잃지 말고 치유의 시간을 가져라',
      '세계': '완성을 향해 마지막 걸음을 내디뎌라',
      '바보': '용기를 내어 새로운 시작을 받아들이라'
    };

    return wisdoms[cardName] || '지혜로운 선택을 통해 성장하라';
  }

  /**
   * 실행 조언 생성
   */
  private generateActionAdvice(outcome: SelectedCard, question: string): string {
    const cardName = outcome.card.koreanName;
    
    if (cardName === '매달린 사람') {
      return `때로는 가장 빠른 길이 '멈추고, 기다리고, 다르게 보는 것'에 있음을 기억하세요. 이 정지의 시간이 끝나면 당신은 완전히 새로운 차원에서 인생의 다음 장을 시작하게 될 것입니다.`;
    }
    
    return `${cardName}의 지혜를 따라 행동한다면, 당신이 원하는 방향으로 상황이 전개될 것입니다.`;
  }

  /**
   * 철학적 통찰 생성
   */
  private generatePhilosophicalInsight(outcome: SelectedCard): string {
    const cardName = outcome.card.koreanName;
    
    if (cardName === '매달린 사람') {
      return `그토록 벗어나고 싶었던 정체와 싸우고, 변화를 위해 발버둥 치는 것이 오히려 당신을 더 옭아매고 있었을지도 모릅니다. 이 카드는 잠시 모든 것을 멈추고, 거꾸로 매달린 사람처럼 완전히 다른 시각으로 상황을 바라보라고 조언합니다.

'내가 놓지 못하는 것은 무엇인가?', '이 상황이 나에게 가르쳐주려는 것은 무엇인가?'를 고민하는 시간이 필요합니다. 과거의 자신을 용서하고(심판), 변화를 받아들일 때(죽음), 당신 안의 마법사는 비로소 힘을 발휘할 것입니다.`;
    }
    
    return `${cardName}은 인생의 더 깊은 의미와 진실을 보여주는 카드입니다.`;
  }

  /**
   * 유틸리티 메소드들
   */
  private identifyEmotionalTone(card: SelectedCard): string {
    // 카드의 감정적 톤 식별
    return '두려움';
  }

  private extractEmotionalTone(card: SelectedCard): string {
    // 감정적 톤 추출
    return '혼란';
  }

  private identifyChangeDirection(card: SelectedCard): string {
    return '긍정적이고 운명적인 변화';
  }

  private calculateOverallEnergy(cards: SelectedCard[]): string {
    // 전체적인 에너지 계산
    return 'transformative';
  }

  private findDominantSuit(cards: SelectedCard[]): string {
    // 지배적인 수트 찾기
    const suitCounts: Record<string, number> = {};
    cards.forEach(card => {
      suitCounts[card.card.suit] = (suitCounts[card.card.suit] || 0) + 1;
    });
    
    return Object.keys(suitCounts).reduce((a, b) => 
      suitCounts[a] > suitCounts[b] ? a : b
    );
  }

  private identifyConflictPattern(positions: any): string {
    // 갈등 패턴 식별
    return 'internal_resistance';
  }

  private extractCentralTheme(positions: any, question: string): string {
    // 중심 테마 추출
    return 'transformation_through_surrender';
  }

  /**
   * 단일 카드 감정적 제목 생성
   */
  private generateSingleCardTitle(question: string, cardName: string, isReversed: boolean): string {
    const questionEmotion = this.analyzeQuestionEmotion(question);
    
    const titleTemplates: Record<string, string[]> = {
      'confusion': [
        `혼란스러운 당신의 마음에 ${cardName}이 건네는 따뜻한 말`,
        `길을 잃은 느낌일 때, ${cardName}이 보여주는 희망의 불빛`,
        `답답한 마음 속에서 만난 ${cardName}의 위로`
      ],
      'anxiety': [
        `불안한 당신의 영혼에 ${cardName}이 전하는 용기`,
        `두려움 너머로 ${cardName}이 손을 내미는 순간`,
        `걱정 많은 당신에게 ${cardName}이 건네는 따뜻한 포옹`
      ],
      'hope': [
        `희망을 품은 당신에게 ${cardName}이 보내는 격려`,
        `꿈꾸는 당신의 마음과 만난 ${cardName}의 축복`,
        `기대에 부푼 당신에게 ${cardName}이 전하는 응원`
      ],
      'transformation': [
        `변화를 갈망하는 당신에게 ${cardName}이 주는 힘`,
        `새로운 시작을 꿈꾸는 당신과 ${cardName}의 만남`,
        `인생의 전환점에서 만난 ${cardName}의 지혜`
      ],
      'seeking': [
        `진실을 찾는 당신의 여정에 ${cardName}이 함께하며`,
        `답을 구하는 당신의 마음에 ${cardName}이 전하는 메시지`,
        `길을 묻는 당신에게 ${cardName}이 보내는 사랑`
      ]
    };
    
    const templates = titleTemplates[questionEmotion as keyof typeof titleTemplates] || titleTemplates['seeking'];
    const seed = this.generateSeed(question + cardName);
    return templates[seed % templates.length];
  }

  /**
   * 단일 카드 감정적 핵심 메시지
   */
  private generateSingleCardCoreMessage(card: SelectedCard, question: string, category: Category, context: any): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const questionEmotion = this.analyzeQuestionEmotion(question);
    
    let coreMessage = `**${cardName}이 당신에게 전하는 깊은 메시지**\n\n`;
    
    // 카드별 특별한 감정적 해석
    const emotionalInterpretation = this.generateDeepCardInterpretation(card, question, questionEmotion);
    coreMessage += emotionalInterpretation + '\n\n';
    
    // 맥락별 세부 메시지
    if (context.timeframe === 'future') {
      coreMessage += this.generateFutureMessage(card, question, category);
    } else if (context.decision) {
      coreMessage += this.generateDecisionMessage(card, question, category);
    } else if (context.relationship) {
      coreMessage += this.generateRelationshipMessage(card, question);
    } else {
      coreMessage += this.generateGeneralMessage(card, question, category);
    }
    
    return coreMessage;
  }

  /**
   * 카드별 깊이 있는 감정적 해석
   */
  private generateDeepCardInterpretation(card: SelectedCard, question: string, emotion: string): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    // 각 카드별 깊이 있는 해석 (감정에 따라 다르게)
    const deepInterpretations: Record<string, Record<string, { upright: string, reversed: string }>> = {
      '바보': {
        'confusion': {
          upright: '혼란 속에서도 당신의 순수한 마음은 새로운 시작을 향한 용기를 잃지 않았습니다. 바보는 "불확실함을 두려워하지 말라, 그것이 바로 무한한 가능성의 문이다"라고 속삭입니다.',
          reversed: '혼란스러워하는 것도 당연합니다. 하지만 바보 역방향은 "성급함 대신 지혜로운 준비를, 무모함 대신 용기 있는 계획을" 세우라고 조언합니다.'
        },
        'anxiety': {
          upright: '불안한 마음에도 바보는 "두려움은 새로운 모험의 시작을 알리는 신호일 뿐"이라며 당신의 손을 잡고 첫 발을 내딛으라고 격려합니다.',
          reversed: '걱정이 많은 당신에게 바보 역방향은 "모든 준비가 끝날 때까지 기다리면 영원히 시작할 수 없다"며 완벽하지 않아도 시작할 용기를 주려 합니다.'
        }
      },
      '마법사': {
        'confusion': {
          upright: '혼란스러운 당신에게 마법사는 "답은 이미 당신 안에 있다"고 확신에 찬 목소리로 말합니다. 당신은 원하는 현실을 창조할 모든 도구를 갖추고 있어요.',
          reversed: '마법사 역방향은 혼란의 원인이 "자신의 능력을 의심하는 마음"에 있다고 지적합니다. 당신의 재능을 믿고 한 가지씩 실행해보세요.'
        },
        'anxiety': {
          upright: '불안해하는 당신에게 마법사는 "걱정하는 에너지를 창조하는 에너지로 바꿔라"라고 말합니다. 당신의 불안도 강력한 창조의 원동력이 될 수 있어요.',
          reversed: '마법사 역방향은 "완벽하지 않아도 시작하라, 행동하면서 배우라"고 조언합니다. 불안은 준비 부족이 아니라 성장의 신호일 뿐입니다.'
        }
      },
      '죽음': {
        'confusion': {
          upright: '혼란스러운 당신에게 죽음은 "끝은 곧 새로운 시작"이라는 가장 위로가 되는 메시지를 전합니다. 지금의 혼란은 낡은 것이 떠나고 새로운 것이 오는 과도기입니다.',
          reversed: '죽음 역방향은 "변화를 받아들이는 것이 두렵다면, 그것이 정말 중요한 변화라는 뜻"이라며 당신의 저항하는 마음도 이해한다고 말합니다.'
        },
        'anxiety': {
          upright: '불안한 당신에게 죽음은 "두려워하는 그 변화가 실제로는 당신을 자유롭게 할 것"이라며 변화에 대한 새로운 관점을 제시합니다.',
          reversed: '죽음 역방향은 "급격한 변화가 무서우면 천천히, 하지만 확실하게 변해가라"고 부드럽게 조언합니다.'
        }
      }
    };
    
    const cardInterpretations = deepInterpretations[cardName];
    if (cardInterpretations && cardInterpretations[emotion]) {
      return isReversed 
        ? cardInterpretations[emotion].reversed 
        : cardInterpretations[emotion].upright;
    }
    
    // 기본 감정적 해석
    const essence = this.getCardEmotionalEssence(cardName, isReversed);
    return `${cardName}${isReversed ? ' 역방향' : ''}이 당신에게 전하는 메시지는 "${essence}"입니다. 이는 당신의 현재 상황에 꼭 필요한 에너지입니다.`;
  }

  /**
   * 단일 카드 따뜻한 조언
   */
  private generateSingleCardAdvice(card: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const advice = card.card.advice[orientation];
    const questionEmotion = this.analyzeQuestionEmotion(question);
    
    let adviceText = `**${cardName}이 당신에게 전하는 마음:**\n\n`;
    
    // 감정적 전환 문구
    const transitionPhrases = {
      'confusion': '혼란 속에서도 당신은 충분히 지혜롭습니다.',
      'anxiety': '불안한 마음도 당신의 소중한 일부입니다.',
      'hope': '당신의 희망은 이미 현실이 되고 있습니다.',
      'transformation': '변화는 당신이 준비되었을 때 자연스럽게 찾아옵니다.',
      'seeking': '답을 찾으려는 당신의 마음이 이미 반은 답을 알고 있습니다.'
    };
    
    adviceText += `${transitionPhrases[questionEmotion as keyof typeof transitionPhrases] || transitionPhrases['seeking']} ${cardName}이 당신에게 이렇게 말합니다:\n\n`;
    
    adviceText += `💝 **마음에 새길 것**: "${advice.action}"\n`;
    adviceText += `🚫 **내려놓을 것**: "${advice.avoid}"\n`;
    adviceText += `✨ **집중할 빛**: "${advice.focus}"\n\n`;
    
    adviceText += `당신은 혼자가 아닙니다. ${cardName}의 에너지가 언제나 당신과 함께 있으니, 자신을 믿고 한 걸음씩 나아가세요. 🌟`;
    
    return adviceText;
  }

  /**
   * 미래 관련 메시지
   */
  private generateFutureMessage(card: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    const coreMessage = this.extractCoreMessage(card);
    
    if (isReversed) {
      return `${cardName} 역방향이 미래에 대해 전하는 메시지는 현재의 접근 방식을 재검토해야 한다는 것입니다. ${coreMessage}의 에너지가 막혀있거나 왜곡되어 있어, 원하는 결과를 얻기 위해서는 다른 관점이나 방법이 필요합니다.`;
    } else {
      return `${cardName}이 보여주는 미래는 ${coreMessage}의 에너지가 충만하게 발현될 것임을 의미합니다. 당신이 원하는 방향으로 상황이 전개될 가능성이 높으며, 이는 자연스러운 흐름 속에서 이루어질 것입니다.`;
    }
  }

  /**
   * 결정 관련 메시지
   */
  private generateDecisionMessage(card: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const keywords = card.card[isReversed ? 'reversedKeywords' : 'uprightKeywords'];
    
    if (isReversed) {
      return `이 결정에 있어 ${cardName} 역방향은 신중함이 필요함을 알려줍니다. ${keywords.slice(0, 2).join('과 ')} 등의 요소들이 현재 명확하지 않은 상태이므로, 성급한 판단보다는 더 많은 정보를 수집하고 내면의 목소리에 귀 기울이는 시간이 필요합니다.`;
    } else {
      return `${cardName}은 이 결정이 ${keywords.slice(0, 2).join('과 ')}의 에너지와 완벽하게 조화를 이룬다고 말합니다. 당신의 직감이 옳았습니다. 이 선택은 당신의 본질적인 가치와 일치하며, 긍정적인 결과로 이어질 것입니다.`;
    }
  }

  /**
   * 관계 관련 메시지
   */
  private generateRelationshipMessage(card: SelectedCard, question: string): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    if (isReversed) {
      return `관계에서 ${cardName} 역방향이 나타난 것은 현재 소통이나 이해에 어려움이 있음을 의미합니다. 서로의 진심이 제대로 전달되지 않거나, 과거의 패턴이 건강한 관계 발전을 방해하고 있을 수 있습니다. 하지만 이는 더 깊고 진실한 관계로 나아가기 위한 과정일 수 있습니다.`;
    } else {
      return `관계에서 ${cardName}이 나온 것은 매우 긍정적인 신호입니다. 서로에 대한 이해가 깊어지고, 진정한 연결이 이루어지고 있습니다. 이 관계는 양쪽 모두에게 성장과 치유를 가져다줄 것이며, 시간이 지날수록 더욱 의미 있는 관계로 발전할 것입니다.`;
    }
  }

  /**
   * 감정적 일반 메시지
   */
  private generateGeneralMessage(card: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const interpretation = card.card.interpretations[isReversed ? 'reversed' : 'upright'][category];
    const questionEmotion = this.analyzeQuestionEmotion(question);
    
    const emotionalFraming = {
      'confusion': '혼란스러운 마음으로 묻는 당신에게',
      'anxiety': '불안한 마음을 품은 당신에게', 
      'hope': '희망을 품고 기다리는 당신에게',
      'transformation': '변화를 갈망하는 당신에게',
      'seeking': '진실을 찾는 당신에게'
    };
    
    const framing = emotionalFraming[questionEmotion as keyof typeof emotionalFraming] || emotionalFraming['seeking'];
    
    return `${framing} ${cardName}${isReversed ? ' 역방향' : ''}이 이렇게 말합니다:\n\n"${interpretation}"\n\n이 메시지를 가슴 깊이 새기면, 당신이 원하는 답이 조금씩 선명해질 것입니다.`;
  }

  /**
   * 3카드 감정적 흐름 분석
   */
  private analyzeThreeCardFlow(cards: SelectedCard[], question: string): any {
    const emotionalJourney = this.mapEmotionalJourney(cards);
    const energyTransition = this.analyzeEnergyTransition(cards);
    const timelineNarrative = this.createTimelineNarrative(cards, question);
    
    return {
      past: cards[0],
      present: cards[1], 
      future: cards[2],
      overallFlow: this.determineOverallFlow(cards),
      questionContext: this.extractQuestionContext(question.toLowerCase()),
      emotionalJourney,
      energyTransition,
      timelineNarrative
    };
  }

  /**
   * 3카드 스토리 생성
   */
  private createThreeCardStory(cards: SelectedCard[], analysis: any, question: string, category: Category): string {
    const { past, present, future, overallFlow, questionContext } = analysis;
    
    let narrative = '';
    
    // 감정적 인트로
    const themeTitle = this.generateThreeCardTitle(question, overallFlow);
    narrative += `**${themeTitle}**\n\n`;
    
    narrative += `"${question}"에 대한 답을 찾기 위해 펼쳐진 세 장의 카드가 하나의 완전한 이야기를 들려줍니다.\n\n`;
    
    // 과거 분석
    narrative += `**과거의 뿌리 (${past.card.koreanName}${past.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generatePastAnalysis(past, question, category);
    narrative += '\n\n';
    
    // 현재 상황
    narrative += `**현재의 상황 (${present.card.koreanName}${present.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generatePresentAnalysis(present, past, question, category);
    narrative += '\n\n';
    
    // 미래 전망
    narrative += `**다가올 미래 (${future.card.koreanName}${future.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generateFutureAnalysis(future, present, question, category);
    narrative += '\n\n';
    
    // 종합 조언
    narrative += `**종합적인 조언**\n`;
    narrative += this.generateThreeCardConclusion(cards, question, overallFlow);
    
    return narrative;
  }

  /**
   * 관계 감정적 역학 분석
   */
  private analyzeRelationshipDynamics(cards: SelectedCard[], question: string): any {
    const energyConnection = this.analyzeEnergyConnection(cards[0], cards[1]);
    const relationshipFlow = this.mapRelationshipFlow(cards);
    const emotionalBalance = this.assessEmotionalBalance(cards);
    
    return {
      you: cards[0],
      them: cards[1], 
      relationship: cards[2],
      challenge: cards[3],
      outcome: cards[4],
      relationshipType: this.determineRelationshipType(question),
      energyConnection,
      relationshipFlow,
      emotionalBalance
    };
  }

  /**
   * 관계 감정적 스토리 생성
   */
  private createRelationshipStory(cards: SelectedCard[], analysis: any, question: string, emotion: string): string {
    const { you, them, relationship, challenge, outcome, relationshipType, energyConnection, relationshipFlow } = analysis;
    
    let narrative = '';
    
    // 깊이 있는 감정적 인트로
    const themeTitle = this.generateRelationshipEmotionalTitle(relationshipType, emotion);
    narrative += `**${themeTitle}**\n\n`;
    
    // 공감적 시작
    narrative += this.generateRelationshipEmotionalOpening(question, emotion, relationshipType);
    narrative += '\n\n';
    
    // 에너지 연결 소개
    narrative += this.generateEnergyConnectionIntro(energyConnection, you, them);
    narrative += '\n\n';
    
    // 당신의 마음 - 깊이 있는 감정 분석
    narrative += `**당신의 진심 (${you.card.koreanName}${you.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generateDeepYourEnergyAnalysis(you, question, emotion);
    narrative += '\n\n';
    
    // 상대방의 마음 - 공감적 이해
    narrative += `**상대방의 마음 (${them.card.koreanName}${them.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generateDeepTheirEnergyAnalysis(them, question, emotion);
    narrative += '\n\n';
    
    // 관계의 현재 - 사랑의 시각
    narrative += `**두 마음이 만나는 곳 (${relationship.card.koreanName}${relationship.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generateDeepRelationshipCurrentState(relationship, you, them, emotion);
    narrative += '\n\n';
    
    // 도전과제 - 성장의 기회
    narrative += `**함께 성장할 과제 (${challenge.card.koreanName}${challenge.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generateDeepRelationshipChallenge(challenge, relationship, emotion);
    narrative += '\n\n';
    
    // 미래 전망 - 사랑의 완성
    narrative += `**사랑이 꽃피울 미래 (${outcome.card.koreanName}${outcome.isReversed ? ' 역방향' : ''})**\n`;
    narrative += this.generateDeepRelationshipOutcome(outcome, challenge, question, emotion);
    narrative += '\n\n';
    
    // 사랑의 메시지
    narrative += this.generateRelationshipHeartfeltConclusion(cards, question, relationshipType, emotion);
    
    return narrative;
  }

  // 추가 헬퍼 메소드들은 다음에 구현
  private determineOverallFlow(cards: SelectedCard[]): string {
    return 'positive_growth';
  }

  private generateThreeCardTitle(question: string, flow: string): string {
    return '과거에서 미래로 이어지는 당신의 여정';
  }

  private generatePastAnalysis(card: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation][category];
    
    let analysis = `과거의 ${cardName}${isReversed ? ' 역방향' : ''}이 현재 상황의 토대가 되었습니다.\n\n`;
    
    // 과거 카드의 구체적 의미
    analysis += `**과거의 의미**: ${interpretation}\n\n`;
    
    // 질문과 연결된 과거 분석
    const questionEmotion = this.analyzeQuestionEmotion(question);
    if (questionEmotion === 'hope') {
      analysis += `지금 희망을 품고 계신 당신의 마음을 보면, 과거 ${cardName}의 경험이 얼마나 중요한 밑거름이 되었는지 알 수 있어요. `;
    } else if (questionEmotion === 'anxiety') {
      analysis += `불안한 마음으로 질문하신 배경에는 과거 ${cardName}의 경험이 깊이 자리잡고 있습니다. `;
    } else {
      analysis += `현재 상황을 이해하려면 과거 ${cardName}의 영향을 놓칠 수 없어요. `;
    }
    
    // 카드별 과거 분석 특화
    if (isReversed) {
      analysis += `역방향으로 나타난 것은 과거의 어려움이나 잘못된 방향이 현재에 영향을 주고 있다는 의미입니다. 하지만 이것 또한 성장의 과정이었으니 자책하지 마세요.`;
    } else {
      analysis += `정방향으로 나타난 것은 과거의 긍정적 경험이 현재 상황에 든든한 기반이 되고 있다는 뜻입니다. 그 경험을 바탕으로 앞으로 나아가세요.`;
    }
    
    return analysis;
  }

  private generatePresentAnalysis(card: SelectedCard, pastCard: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation][category];
    const pastCardName = pastCard.card.koreanName;
    
    let analysis = `현재 ${cardName}${isReversed ? ' 역방향' : ''}의 에너지가 당신의 상황을 주도하고 있습니다.\n\n`;
    
    // 현재 카드의 구체적 의미
    analysis += `**현재의 핵심**: ${interpretation}\n\n`;
    
    // 과거와 현재의 연결성 분석
    analysis += `과거 ${pastCardName}에서 현재 ${cardName}으로의 흐름을 보면, `;
    
    const flowAnalysis = this.analyzeCardFlow(pastCard, card);
    analysis += `${flowAnalysis}\n\n`;
    
    // 질문별 현재 상황 맞춤 해석
    const questionContext = this.extractQuestionContext(question.toLowerCase());
    if (questionContext.timeframe === 'present') {
      analysis += `"지금 어떤 상황인지" 궁금해하시는 당신에게 ${cardName}이 명확한 답을 주고 있어요. `;
    } else if (questionContext.decision) {
      analysis += `결정을 앞둔 당신에게 ${cardName}이 현재 상황의 핵심을 보여주고 있습니다. `;
    } else {
      analysis += `현재 ${cardName}의 에너지가 당신의 질문과 직접적으로 연결되어 있어요. `;
    }
    
    // 현재 상황에 대한 구체적 조언
    if (isReversed) {
      analysis += `역방향으로 나타난 것은 현재 상황에서 조심스러운 접근이 필요하다는 의미입니다. 서두르지 말고 차근차근 진행하세요.`;
    } else {
      analysis += `정방향으로 나타난 것은 현재가 행동하기에 좋은 시기라는 긍정적 신호입니다. 자신감을 가지고 나아가세요.`;
    }
    
    return analysis;
  }

  private generateFutureAnalysis(card: SelectedCard, presentCard: SelectedCard, question: string, category: Category): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation][category];
    const presentCardName = presentCard.card.koreanName;
    
    let analysis = `미래에는 ${cardName}${isReversed ? ' 역방향' : ''}의 에너지가 펼쳐질 것입니다.\n\n`;
    
    // 미래 카드의 구체적 의미
    analysis += `**미래의 전망**: ${interpretation}\n\n`;
    
    // 현재에서 미래로의 발전 과정
    analysis += `현재 ${presentCardName}에서 미래 ${cardName}으로의 발전을 보면, `;
    
    const futureFlow = this.analyzeFutureFlow(presentCard, card, question);
    analysis += `${futureFlow}\n\n`;
    
    // 질문에 따른 미래 해석 맞춤화
    const questionEmotion = this.analyzeQuestionEmotion(question);
    if (questionEmotion === 'hope') {
      analysis += `희망을 품고 기다리시는 당신에게 ${cardName}이 가져다줄 미래는 기대 이상일 것 같아요. `;
    } else if (questionEmotion === 'anxiety') {
      analysis += `걱정스러워하시는 마음을 이해해요. 하지만 ${cardName}이 보여주는 미래는 당신이 생각하는 것보다 밝습니다. `;
    } else if (questionEmotion === 'confusion') {
      analysis += `혼란스러운 마음으로 미래를 궁금해하시는 당신에게 ${cardName}이 명확한 방향을 제시해줍니다. `;
    } else {
      analysis += `${cardName}이 그려주는 미래는 현재의 노력이 결실을 맺는 시기입니다. `;
    }
    
    // 미래에 대한 구체적 조언과 준비사항
    if (isReversed) {
      analysis += `역방향으로 나타난 것은 미래에 주의 깊은 접근이 필요하다는 의미입니다. 미리 준비하고 신중하게 행동한다면 어려움을 피할 수 있어요.`;
    } else {
      analysis += `정방향으로 나타난 것은 매우 긍정적인 미래가 기다리고 있다는 확신을 줍니다. 현재의 방향을 유지하며 꾸준히 나아가세요.`;
    }
    
    return analysis;
  }
  
  /**
   * 과거와 현재 카드 간의 흐름을 분석합니다
   */
  private analyzeCardFlow(pastCard: SelectedCard, presentCard: SelectedCard): string {
    const pastName = pastCard.card.koreanName;
    const presentName = presentCard.card.koreanName;
    
    // 메이저-메이저 조합
    if (pastCard.card.suit === 'major' && presentCard.card.suit === 'major') {
      return `인생의 중요한 전환점들이 연결되어 있습니다. ${pastName}에서 ${presentName}으로의 변화는 운명적 의미가 깊어요.`;
    }
    
    // 같은 수트 흐름
    if (pastCard.card.suit === presentCard.card.suit && pastCard.card.suit !== 'major') {
      return `같은 ${this.getSuitName(pastCard.card.suit)} 에너지가 지속되면서 발전하고 있습니다. 일관된 방향성이 느껴져요.`;
    }
    
    // 수트 변화
    if (pastCard.card.suit !== presentCard.card.suit) {
      const pastSuitMeaning = this.getSuitMeaning(pastCard.card.suit);
      const presentSuitMeaning = this.getSuitMeaning(presentCard.card.suit);
      return `${pastSuitMeaning}에서 ${presentSuitMeaning}으로 에너지가 변화했습니다. 새로운 국면을 맞이하고 있어요.`;
    }
    
    return `자연스러운 발전 과정을 거치고 있습니다.`;
  }
  
  /**
   * 현재에서 미래로의 흐름을 분석합니다
   */
  private analyzeFutureFlow(presentCard: SelectedCard, futureCard: SelectedCard, question: string): string {
    const presentName = presentCard.card.koreanName;
    const futureName = futureCard.card.koreanName;
    
    // 긍정적 발전
    if (!presentCard.isReversed && !futureCard.isReversed) {
      return `매우 긍정적인 발전 과정이 예상됩니다. 현재의 좋은 에너지가 미래에 더욱 발전된 형태로 나타날 것 같아요.`;
    }
    
    // 어려움에서 회복
    if (presentCard.isReversed && !futureCard.isReversed) {
      return `현재의 어려움이 미래에는 완전히 해결될 것입니다. 힘든 시기를 지나 밝은 변화가 찾아올 거예요.`;
    }
    
    // 주의가 필요한 변화
    if (!presentCard.isReversed && futureCard.isReversed) {
      return `현재는 좋지만 미래에 주의가 필요한 상황이 올 수 있습니다. 미리 대비한다면 충분히 극복 가능해요.`;
    }
    
    // 지속적 도전
    if (presentCard.isReversed && futureCard.isReversed) {
      return `어려운 시기가 조금 더 지속될 수 있지만, 이는 더 큰 성장을 위한 과정입니다. 포기하지 마세요.`;
    }
    
    return `의미 있는 변화가 진행되고 있습니다.`;
  }
  
  /**
   * 수트명을 한글로 반환합니다
   */
  private getSuitName(suit: string): string {
    const suitNames = {
      'wands': '완드(불)',
      'cups': '컵(물)', 
      'swords': '소드(바람)',
      'pentacles': '펜타클(땅)',
      'major': '메이저'
    };
    return suitNames[suit as keyof typeof suitNames] || suit;
  }
  
  /**
   * 수트의 의미를 반환합니다
   */
  private getSuitMeaning(suit: string): string {
    const suitMeanings = {
      'wands': '열정과 행동의 영역',
      'cups': '감정과 관계의 영역',
      'swords': '사고와 소통의 영역', 
      'pentacles': '물질과 현실의 영역',
      'major': '인생의 큰 흐름'
    };
    return suitMeanings[suit as keyof typeof suitMeanings] || '새로운 영역';
  }

  private generateThreeCardConclusion(cards: SelectedCard[], question: string, flow: string): string {
    const [past, present, future] = cards;
    const pastName = past.card.koreanName;
    const presentName = present.card.koreanName;
    const futureName = future.card.koreanName;
    
    let conclusion = `${pastName} → ${presentName} → ${futureName}으로 이어지는 이 여정은 우연이 아닙니다.\n\n`;
    
    // 전체적인 흐름 분석
    const positiveCount = cards.filter(card => !card.isReversed).length;
    if (positiveCount === 3) {
      conclusion += `**✨ 매우 긍정적인 흐름**: 과거, 현재, 미래 모든 카드가 정방향으로 나타났습니다. 이는 순조로운 발전과 성취를 의미해요.\n\n`;
    } else if (positiveCount === 2) {
      conclusion += `**🌟 균형잡힌 흐름**: 대부분 긍정적이지만 한 부분에서 주의가 필요합니다. 전체적으로는 좋은 방향으로 흘러가고 있어요.\n\n`;
    } else if (positiveCount === 1) {
      conclusion += `**🔄 전환의 흐름**: 현재는 어려운 시기지만 변화와 성장의 기회입니다. 인내심을 가지고 나아가세요.\n\n`;
    } else {
      conclusion += `**🌱 도전과 성장의 흐름**: 어려운 시기이지만 이 모든 경험이 당신을 더 강하게 만들 것입니다. 포기하지 마세요.\n\n`;
    }
    
    // 질문에 따른 맞춤 조언
    const questionEmotion = this.analyzeQuestionEmotion(question);
    if (questionEmotion === 'hope') {
      conclusion += `**💫 희망하는 당신에게**: 세 카드가 보여주는 흐름은 당신의 희망이 현실이 될 수 있음을 말해줍니다. `;
    } else if (questionEmotion === 'anxiety') {
      conclusion += `**💗 불안해하는 당신에게**: 걱정스러운 마음을 이해해요. 하지만 세 카드는 당신이 생각하는 것보다 훨씬 나은 결과를 보여주고 있어요. `;
    } else if (questionEmotion === 'confusion') {
      conclusion += `**🧭 혼란스러운 당신에게**: 복잡하게 느껴지는 상황에 명확한 방향을 제시해줍니다. `;
    } else {
      conclusion += `**🎯 구체적인 조언**: `;
    }
    
    // 실천적 조언
    if (present.isReversed) {
      conclusion += `현재 상황에서는 서두르지 말고 신중하게 접근하세요. `;
    } else {
      conclusion += `현재는 행동하기에 좋은 시기입니다. 자신감을 가지고 나아가세요. `;
    }
    
    if (future.isReversed) {
      conclusion += `미래를 위해서는 지금부터 준비하고 조심스럽게 계획을 세우는 것이 중요해요.`;
    } else {
      conclusion += `미래는 매우 밝으니 현재의 노력을 계속 이어가세요.`;
    }
    
    conclusion += `\n\n**🌈 마지막 메시지**: 이 세 장의 카드가 그려준 이야기를 마음에 새기고, 각 단계마다 카드의 지혜를 기억하며 나아가세요. 당신의 여정을 응원합니다.`;
    
    return conclusion;
  }

  private determineRelationshipType(question: string): string {
    if (question.includes('연인') || question.includes('사랑') || question.includes('연애')) {
      return 'romantic';
    }
    return 'general';
  }

  private generateYourEnergyAnalysis(card: SelectedCard, question: string): string {
    return `당신은 현재 ${card.card.koreanName}의 에너지를 가지고 있습니다.`;
  }

  private generateTheirEnergyAnalysis(card: SelectedCard, question: string): string {
    return `상대방은 ${card.card.koreanName}의 에너지를 나타내고 있습니다.`;
  }

  private generateRelationshipCurrentState(relationship: SelectedCard, you: SelectedCard, them: SelectedCard): string {
    return `두 사람의 관계는 현재 ${relationship.card.koreanName}의 상태에 있습니다.`;
  }

  private generateRelationshipChallenge(challenge: SelectedCard, relationship: SelectedCard): string {
    return `${challenge.card.koreanName}이 현재 관계의 주요 과제입니다.`;
  }

  private generateRelationshipOutcome(outcome: SelectedCard, challenge: SelectedCard, question: string): string {
    return `관계는 ${outcome.card.koreanName}의 방향으로 발전할 것입니다.`;
  }

  /**
   * 감정적 시작 메시지 생성
   */
  private generateEmotionalOpening(question: string, emotion: string, cardName: string, isReversed: boolean): string {
    const empathyPhrases = {
      'confusion': [
        '지금 당신의 마음이 얼마나 복잡하고 혼란스러운지 저도 느껴집니다.',
        '길을 잃은 듯한 그 답답함, 정말 힘드셨을 거예요.',
        '뭔가 확실한 답을 원하시는 그 간절함이 전해져 옵니다.'
      ],
      'anxiety': [
        '불안한 마음으로 이 질문을 던지신 당신의 용기가 대단합니다.',
        '걱정이 많으셨을 텐데, 답을 찾으려 하는 모습이 아름답습니다.',
        '두려움 속에서도 희망을 놓지 않으려는 당신의 마음이 느껴집니다.'
      ],
      'hope': [
        '희망을 품고 질문하신 당신의 마음이 따뜻하게 전해집니다.',
        '더 나은 내일을 꿈꾸는 당신의 마음이 정말 소중합니다.',
        '기대에 찬 당신의 에너지가 이미 긍정적 변화의 시작입니다.'
      ],
      'transformation': [
        '변화를 원하는 당신의 용기있는 마음이 존경스럽습니다.',
        '새로운 시작을 꿈꾸는 당신의 용기가 빛이 납니다.',
        '현재를 벗어나고자 하는 당신의 의지가 강하게 느껴집니다.'
      ],
      'seeking': [
        '진실을 찾으려는 당신의 진지한 마음이 깊이 와닿습니다.',
        '답을 구하는 당신의 간절함이 정말 소중합니다.',
        '진심으로 묻는 당신의 마음에 깊은 감동을 받습니다.'
      ]
    };
    
    const phrases = empathyPhrases[emotion as keyof typeof empathyPhrases] || empathyPhrases['seeking'];
    const selectedPhrase = phrases[this.generateSeed(question) % phrases.length];
    
    return `${selectedPhrase} 그런 당신에게 나타난 ${cardName}${isReversed ? ' 역방향' : ''}은 우주가 보내는 특별한 메시지입니다.`;
  }

  /**
   * 카드 선택의 감정적 의미
   */
  private generateCardChoiceEmotion(question: string, cardName: string, isReversed: boolean, emotion: string): string {
    const cardMeaning = this.getCardEmotionalEssence(cardName, isReversed);
    
    const meaningPhrases = {
      'confusion': `혼란스러운 마음으로 던진 질문에 ${cardName}이 응답한 것은, 당신의 내면 깊숙한 곳에서 이미 ${cardMeaning}을 갈망하고 있었기 때문입니다.`,
      'anxiety': `불안한 마음에도 불구하고 ${cardName}이 나타난 것은, 당신의 영혼이 ${cardMeaning}의 치유가 필요함을 알고 있다는 뜻입니다.`,
      'hope': `희망을 품은 당신에게 ${cardName}이 온 것은, 그 꿈이 ${cardMeaning}의 에너지와 완벽하게 조화를 이루기 때문입니다.`,
      'transformation': `변화를 원하는 당신에게 ${cardName}이 나타난 것은, 당신이 이미 ${cardMeaning}을 받아들일 준비가 되어있다는 신호입니다.`,
      'seeking': `진실을 찾는 당신에게 ${cardName}이 응답한 것은, 당신의 질문 자체가 이미 ${cardMeaning}의 지혜를 담고 있었기 때문입니다.`
    };
    
    return meaningPhrases[emotion as keyof typeof meaningPhrases] || meaningPhrases['seeking'];
  }

  /**
   * 위로와 희망의 메시지
   */
  private generateComfortMessage(card: SelectedCard, question: string, emotion: string): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    const comfortMessages = {
      'confusion': [
        `혼란스러웠던 시간들이 결코 헛되지 않았습니다. ${cardName}은 그 모든 방황이 당신을 더 깊은 지혜로 이끌었다고 말해줍니다.`,
        `길을 잃었다고 느꼈던 그 순간들이 실제로는 가장 중요한 길을 찾아가는 과정이었습니다. ${cardName}이 그것을 증명해주고 있어요.`,
        `답답했던 마음, 그 자체가 당신의 성장을 위한 필연적 과정이었습니다. ${cardName}이 이제 그 의미를 밝혀줄 거예요.`
      ],
      'anxiety': [
        `불안했던 마음도 당신을 보호하려는 사랑의 또 다른 형태였습니다. ${cardName}이 그 걱정을 지혜로 바꿔줄 거예요.`,
        `두려워했던 것들이 실제로는 당신의 성장을 위한 도전장이었습니다. ${cardName}이 그 용기를 북돋아줄 것입니다.`,
        `걱정 많았던 시간들이 당신을 더 깊이 있는 사람으로 만들어주었습니다. ${cardName}이 그 가치를 보여줄 거예요.`
      ],
      'hope': [
        `당신이 품었던 희망들이 결코 헛된 꿈이 아니었습니다. ${cardName}이 그 꿈들이 현실이 될 길을 보여줄 거예요.`,
        `기대했던 마음, 그 자체가 이미 변화의 씨앗이었습니다. ${cardName}이 그 씨앗을 꽃피울 방법을 알려줄 것입니다.`,
        `꿈꿔왔던 모든 것들이 당신 안에서 이미 싹틔우고 있었습니다. ${cardName}이 그 성장을 돕는 햇빛이 될 거예요.`
      ],
      'transformation': [
        `변화를 원했던 그 용기가 이미 가장 큰 변화의 시작이었습니다. ${cardName}이 그 용기에 날개를 달아줄 거예요.`,
        `현재를 벗어나고 싶었던 그 마음이 당신의 가장 큰 자산이었습니다. ${cardName}이 그 길을 환하게 밝혀줄 것입니다.`,
        `새로운 시작을 꿈꿨던 순간부터, 당신은 이미 그 새로운 인생을 살기 시작했습니다. ${cardName}이 그것을 확신시켜줄 거예요.`
      ],
      'seeking': [
        `진실을 찾으려 했던 그 간절함이 당신을 가장 소중한 답에 이르게 했습니다. ${cardName}이 그 여정의 가이드가 될 거예요.`,
        `답을 구했던 그 진심이 우주를 움직여 ${cardName}을 당신에게 보냈습니다.`,
        `의미를 찾으려 했던 모든 순간들이 당신을 더 깊은 차원의 이해로 이끌어왔습니다. ${cardName}이 그 이해를 완성시켜줄 것입니다.`
      ]
    };
    
    const messages = comfortMessages[emotion as keyof typeof comfortMessages] || comfortMessages['seeking'];
    const selectedMessage = messages[this.generateSeed(question + cardName) % messages.length];
    
    return `💫 **당신에게 전하는 위로의 말씀**\n${selectedMessage}`;
  }

  /**
   * 카드의 감정적 본질 추출
   */
  private getCardEmotionalEssence(cardName: string, isReversed: boolean): string {
    const essences: Record<string, { upright: string, reversed: string }> = {
      '바보': { upright: '순수한 시작의 용기', reversed: '무모함을 지혜로 바꾸는 학습' },
      '마법사': { upright: '창조의 무한한 가능성', reversed: '잠재력을 현실로 만드는 인내' },
      '여교황': { upright: '직관의 깊은 신뢰', reversed: '내면의 목소리를 듣는 용기' },
      '여제': { upright: '풍요로운 창조의 기쁨', reversed: '자기 사랑의 회복' },
      '황제': { upright: '안정된 기반의 구축', reversed: '유연한 리더십의 발견' },
      '교황': { upright: '전통 속 지혜의 발견', reversed: '개인적 신념의 확립' },
      '연인': { upright: '진정한 선택의 조화', reversed: '내면 갈등의 해결' },
      '전차': { upright: '의지력의 승리', reversed: '내적 균형의 회복' },
      '힘': { upright: '부드러운 용기의 힘', reversed: '자기 용서의 치유' },
      '은둔자': { upright: '내면 탐구의 깊이', reversed: '고립에서 연결로의 전환' },
      '운명의 바퀴': { upright: '긍정적 변화의 흐름', reversed: '내적 성장의 시간' },
      '정의': { upright: '공정한 균형의 실현', reversed: '자기 판단의 재검토' },
      '매달린 사람': { upright: '관점 전환의 지혜', reversed: '행동으로의 전환점' },
      '죽음': { upright: '재생의 아름다운 변화', reversed: '변화 저항의 극복' },
      '절제': { upright: '조화로운 균형의 예술', reversed: '극단에서 중도로의 회귀' },
      '악마': { upright: '유혹 인식의 자유', reversed: '속박에서 해방의 기쁨' },
      '탑': { upright: '필요한 파괴의 정화', reversed: '점진적 변화의 수용' },
      '별': { upright: '무한한 희망의 치유', reversed: '내적 믿음의 회복' },
      '달': { upright: '직감의 신비로운 안내', reversed: '환상에서 현실로의 각성' },
      '태양': { upright: '순수한 기쁨의 완성', reversed: '내면 빛의 재발견' },
      '심판': { upright: '영적 각성의 부름', reversed: '자기 용서의 해방' },
      '세계': { upright: '완성의 충만한 성취', reversed: '개인적 완성의 추구' }
    };
    
    const essence = essences[cardName];
    if (!essence) return '깊은 변화와 성장';
    
    return isReversed ? essence.reversed : essence.upright;
  }

  /**
   * 질문의 맥락을 추출하는 메소드
   */
  /**
   * 3카드 감정적 여정 매핑
   */
  private mapEmotionalJourney(cards: SelectedCard[]): string {
    const pastEmotion = this.getCardEmotionalTone(cards[0]);
    const presentEmotion = this.getCardEmotionalTone(cards[1]);
    const futureEmotion = this.getCardEmotionalTone(cards[2]);
    
    return `${pastEmotion} → ${presentEmotion} → ${futureEmotion}`;
  }

  /**
   * 에너지 전환 분석
   */
  private analyzeEnergyTransition(cards: SelectedCard[]): string {
    const transitions = [];
    
    if (this.isPositiveCard(cards[0]) && this.isNegativeCard(cards[1])) {
      transitions.push('시련을 통한 성장');
    } else if (this.isNegativeCard(cards[0]) && this.isPositiveCard(cards[2])) {
      transitions.push('어둠에서 빛으로의 전환');
    }
    
    return transitions.join(', ') || '점진적 발전';
  }

  /**
   * 타임라인 내러티브 생성
   */
  private createTimelineNarrative(cards: SelectedCard[], question: string): string {
    return `${cards[0].card.koreanName}에서 시작된 여정이 ${cards[1].card.koreanName}을 거쳐 ${cards[2].card.koreanName}으로 완성되는 이야기`;
  }

  /**
   * 3카드 감정적 제목 생성
   */
  private generateThreeCardEmotionalTitle(question: string, flow: string, emotion: string): string {
    const emotionalTitles = {
      'confusion': '혼란 속에서 찾은 세 개의 빛나는 진실',
      'anxiety': '불안한 마음이 평온으로 변하는 세 단계',
      'hope': '희망의 씨앗이 꽃으로 피어나는 여정',
      'transformation': '변화의 바람이 이끄는 세 개의 문',
      'seeking': '진실을 향한 영혼의 삼부작'
    };
    
    return emotionalTitles[emotion as keyof typeof emotionalTitles] || '과거, 현재, 미래가 전하는 깊은 메시지';
  }

  /**
   * 3카드 감정적 오프닝
   */
  private generateThreeCardEmotionalOpening(question: string, emotion: string, cards: SelectedCard[]): string {
    const openings = {
      'confusion': '혼란스러운 마음으로 던진 질문에, 세 장의 카드가 마치 오래된 친구처럼 다정하게 답해줍니다.',
      'anxiety': '걱정으로 무거운 마음을 안고 앉은 당신에게, 카드들이 "괜찮다, 모든 것이 제자리를 찾아갈 거야"라고 속삭입니다.',
      'hope': '희망을 품고 기다리는 당신의 마음을 알기라도 하듯, 세 카드가 아름다운 협주곡을 연주하기 시작합니다.',
      'transformation': '변화를 갈망하는 당신의 용기 있는 마음에, 카드들이 박수를 보내며 앞으로의 길을 밝혀줍니다.',
      'seeking': '진실을 찾는 당신의 순수한 마음에 감동받은 듯, 세 카드가 가장 솔직한 이야기를 들려주려 합니다.'
    };
    
    const opening = openings[emotion as keyof typeof openings] || openings['seeking'];
    return `${opening}\n\n"${question}"이라는 당신의 간절한 물음에, ${cards[0].card.koreanName}, ${cards[1].card.koreanName}, ${cards[2].card.koreanName}이 하나의 완전한 답을 만들어냅니다.`;
  }

  /**
   * 감정적 여정 소개
   */
  private generateEmotionalJourneyIntro(journey: string, question: string): string {
    return `🌙 **당신의 감정적 여정**: ${journey}\n\n이 세 카드는 단순한 예언이 아닙니다. 당신의 마음이 지나온 길과 지나갈 길을 보여주는 감정의 지도입니다. 각 카드마다 당신에게 꼭 필요한 위로와 지혜가 담겨 있어요.`;
  }

  /**
   * 깊이 있는 과거 분석
   */
  private generateDeepPastAnalysis(card: SelectedCard, question: string, category: Category, emotion: string): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    
    let analysis = `과거의 ${cardName}${isReversed ? ' 역방향' : ''}을 보니, 당신의 마음이 느껴집니다. `;
    
    if (emotion === 'confusion') {
      analysis += `그때도 지금처럼 답답하고 혼란스러웠을 텐데, 그 모든 경험이 헛되지 않았어요. ${cardName}은 "그때의 혼란이 지금의 지혜를 만들었다"고 말해줍니다.`;
    } else if (emotion === 'anxiety') {
      analysis += `불안했던 그 시간들, 걱정으로 잠 못 이뤘던 밤들이 모두 당신을 더 강하게 만들었습니다. ${cardName}은 "두려움도 당신의 소중한 성장 동력이었다"고 위로해줍니다.`;
    }
    
    return analysis + `\n\n💫 과거가 당신에게 주는 선물: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 깊이 있는 현재 분석  
   */
  private generateDeepPresentAnalysis(present: SelectedCard, past: SelectedCard, question: string, category: Category, emotion: string): string {
    const cardName = present.card.koreanName;
    const isReversed = present.isReversed;
    
    let analysis = `현재의 ${cardName}${isReversed ? ' 역방향' : ''}이 말하는 것은, 과거의 ${past.card.koreanName}에서 배운 교훈이 지금 당신 안에서 새로운 형태로 피어나고 있다는 것입니다. `;
    
    analysis += `지금 이 순간, 당신은 예전과는 다른 사람이에요. 더 깊이 있고, 더 지혜로운 사람이 되었습니다.`;
    
    return analysis + `\n\n🌟 현재 당신의 빛나는 힘: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 깊이 있는 미래 분석
   */
  private generateDeepFutureAnalysis(future: SelectedCard, present: SelectedCard, question: string, category: Category, emotion: string): string {
    const cardName = future.card.koreanName;
    const isReversed = future.isReversed;
    
    let analysis = `미래의 ${cardName}${isReversed ? ' 역방향' : ''}을 보니 가슴이 뭉클해집니다. `;
    
    analysis += `현재의 ${present.card.koreanName}에서 쌓은 경험과 성장이 ${cardName}이라는 아름다운 결실로 맺어질 것 같아요. `;
    
    if (emotion === 'hope') {
      analysis += `당신이 품었던 희망들이 하나씩 현실이 되어가는 모습이 보입니다.`;
    } else if (emotion === 'transformation') {
      analysis += `당신이 그토록 원했던 변화가 드디어 완성되는 순간이 다가오고 있어요.`;
    }
    
    return analysis + `\n\n✨ 미래가 약속하는 선물: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 3카드 따뜻한 결론
   */
  private generateThreeCardHeartfeltConclusion(cards: SelectedCard[], question: string, flow: string, emotion: string): string {
    let conclusion = `세 카드가 들려준 이야기를 정리해보면, 당신의 여정은 정말 특별합니다. `;
    
    conclusion += `${cards[0].card.koreanName}에서 시작된 이야기가 ${cards[1].card.koreanName}을 거쳐 ${cards[2].card.koreanName}으로 완성되는 이 흐름 자체가 하나의 기적이에요.\n\n`;
    
    const emotionalConclusions = {
      'confusion': '혼란스러웠던 마음이 점차 명확해지고 있습니다. 답은 이미 당신 안에 있었어요.',
      'anxiety': '불안했던 마음이 평온으로 변해가고 있습니다. 당신은 생각보다 훨씬 강한 사람이에요.',
      'hope': '희망을 품었던 당신의 마음이 옳았습니다. 꿈꿔왔던 일들이 현실이 되어가고 있어요.',
      'transformation': '변화를 원했던 당신의 용기가 결실을 맺고 있습니다. 새로운 당신이 탄생하고 있어요.',
      'seeking': '진실을 찾으려 했던 당신의 노력이 헛되지 않았습니다. 원하던 답을 찾게 될 거예요.'
    };
    
    conclusion += emotionalConclusions[emotion as keyof typeof emotionalConclusions] || '당신의 여정은 아름답게 펼쳐지고 있습니다.';
    conclusion += '\n\n💝 **마지막 메시지**: 세 카드 모두 당신을 믿고 있어요. 자신을 믿고, 한 걸음씩 나아가세요. 당신은 충분히 사랑받을 자격이 있고, 행복해질 자격이 있는 소중한 사람입니다. 🌈';
    
    return conclusion;
  }

  /**
   * 카드의 감정적 톤 추출
   */
  private getCardEmotionalTone(card: SelectedCard): string {
    const tones: Record<string, string> = {
      '바보': '순수한 시작',
      '마법사': '창조의 기쁨', 
      '여교황': '직관적 평온',
      '여제': '풍요로운 사랑',
      '황제': '안정된 힘',
      '죽음': '변화의 용기',
      '별': '희망의 빛',
      '태양': '순수한 기쁨'
    };
    
    return tones[card.card.koreanName as keyof typeof tones] || '성장의 에너지';
  }

  /**
   * 긍정적 카드 판별
   */
  private isPositiveCard(card: SelectedCard): boolean {
    const positiveCards = ['바보', '마법사', '여제', '별', '태양', '세계'];
    return positiveCards.includes(card.card.koreanName) && !card.isReversed;
  }

  /**
   * 부정적 카드 판별
   */
  private isNegativeCard(card: SelectedCard): boolean {
    const challengingCards = ['탑', '악마', '죽음', '매달린 사람'];
    return challengingCards.includes(card.card.koreanName) && !card.isReversed;
  }

  /**
   * 관계 감정 분석
   */
  private analyzeRelationshipEmotion(question: string): string {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('사랑') || lowerQ.includes('연인') || lowerQ.includes('좋아')) {
      return 'love';
    } else if (lowerQ.includes('갈등') || lowerQ.includes('싸움') || lowerQ.includes('문제')) {
      return 'conflict';
    } else if (lowerQ.includes('결혼') || lowerQ.includes('미래') || lowerQ.includes('발전')) {
      return 'future';
    } else if (lowerQ.includes('이별') || lowerQ.includes('헤어') || lowerQ.includes('끝')) {
      return 'separation';
    } else if (lowerQ.includes('복합') || lowerQ.includes('돌아') || lowerQ.includes('다시')) {
      return 'reconciliation';
    } else {
      return 'understanding';
    }
  }

  /**
   * 에너지 연결 분석
   */
  private analyzeEnergyConnection(yourCard: SelectedCard, theirCard: SelectedCard): string {
    const yourSuit = yourCard.card.suit;
    const theirSuit = theirCard.card.suit;
    
    if (yourSuit === theirSuit) {
      return '조화로운 공명';
    } else if ((yourSuit === 'cups' && theirSuit === 'wands') || (yourSuit === 'wands' && theirSuit === 'cups')) {
      return '감정과 열정의 균형';
    } else if ((yourSuit === 'swords' && theirSuit === 'pentacles') || (yourSuit === 'pentacles' && theirSuit === 'swords')) {
      return '이성과 현실의 조화';
    } else {
      return '서로 다른 매력의 결합';
    }
  }

  /**
   * 관계 흐름 매핑
   */
  private mapRelationshipFlow(cards: SelectedCard[]): string {
    const flow = cards.map(card => this.getCardEmotionalTone(card)).join(' → ');
    return `${flow}의 여정`;
  }

  /**
   * 감정적 균형 평가
   */
  private assessEmotionalBalance(cards: SelectedCard[]): string {
    const positiveCount = cards.filter(card => this.isPositiveCard(card)).length;
    const negativeCount = cards.filter(card => this.isNegativeCard(card)).length;
    
    if (positiveCount > negativeCount) {
      return '희망적 균형';
    } else if (negativeCount > positiveCount) {
      return '성장을 위한 도전';
    } else {
      return '조화로운 균형';
    }
  }

  /**
   * 관계 감정적 제목 생성
   */
  private generateRelationshipEmotionalTitle(type: string, emotion: string): string {
    const titles = {
      'love': {
        'romantic': '사랑하는 두 마음이 들려주는 진실한 이야기',
        'general': '소중한 관계가 전하는 따뜻한 메시지'
      },
      'conflict': {
        'romantic': '갈등 너머에 숨어있는 더 깊은 사랑',
        'general': '어려움을 통해 더 단단해지는 관계'
      },
      'future': {
        'romantic': '두 영혼이 함께 그려갈 아름다운 미래',
        'general': '함께 성장해나갈 관계의 가능성'
      },
      'separation': {
        'romantic': '이별의 아픔 속에서 찾는 진정한 의미',
        'general': '헤어짐이 주는 소중한 깨달음'
      },
      'reconciliation': {
        'romantic': '다시 만난 두 마음의 새로운 시작',
        'general': '화해를 통해 더 깊어지는 유대'
      },
      'understanding': {
        'romantic': '서로를 더 깊이 이해하기 위한 다섯 개의 열쇠',
        'general': '관계의 본질을 드러내는 다섯 장의 카드'
      }
    };
    
    return titles[emotion as keyof typeof titles]?.[type as keyof typeof titles.understanding] || titles['understanding'][type as keyof typeof titles.understanding] || '관계의 진실을 보여주는 다섯 장의 카드';
  }

  /**
   * 관계 감정적 오프닝
   */
  private generateRelationshipEmotionalOpening(question: string, emotion: string, type: string): string {
    const openings = {
      'love': '사랑에 대한 당신의 진심어린 질문에, 카드들이 마치 큐피드처럼 미소지으며 답해줍니다.',
      'conflict': '갈등으로 힘든 당신의 마음을 보며, 카드들이 "모든 어려움에는 성장의 씨앗이 있다"고 위로해줍니다.',
      'future': '미래에 대한 설렘과 궁금증으로 가득한 당신에게, 카드들이 희망찬 그림을 그려보여줍니다.',
      'separation': '아픈 마음으로 던진 질문에, 카드들이 따뜻한 포옹처럼 당신을 감싸안으며 치유의 메시지를 전합니다.',
      'reconciliation': '다시 시작하고 싶은 간절한 마음을 담은 질문에, 카드들이 새로운 가능성의 문을 열어줍니다.',
      'understanding': '관계를 더 깊이 이해하고 싶은 당신의 순수한 마음에, 카드들이 지혜로운 안내자가 되어줍니다.'
    };
    
    const opening = openings[emotion as keyof typeof openings] || openings['understanding'];
    return `${opening}\n\n"${question}"이라는 당신의 소중한 물음에, 다섯 장의 카드가 각자의 목소리로 하나의 완전한 답을 만들어냅니다.`;
  }

  /**
   * 에너지 연결 소개
   */
  private generateEnergyConnectionIntro(connection: string, you: SelectedCard, them: SelectedCard): string {
    return `💫 **두 마음의 에너지 연결**: ${connection}\n\n${you.card.koreanName}과 ${them.card.koreanName}이 만나 만들어내는 이 특별한 조화를 보면, 당신들의 관계가 우연이 아님을 알 수 있습니다. 서로 다르기 때문에 더욱 아름다운, 그런 관계의 매력이 느껴져요.`;
  }

  /**
   * 깊이 있는 당신의 에너지 분석
   */
  private generateDeepYourEnergyAnalysis(card: SelectedCard, question: string, emotion: string): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation]['love'];
    
    let analysis = `${cardName}${isReversed ? ' 역방향' : ''}으로 나타난 당신의 마음을 보니, 얼마나 진심으로 이 관계를 생각하고 있는지 느껴집니다.\n\n`;
    
    // 카드의 구체적 의미
    analysis += `**당신 마음의 진실**: ${interpretation}\n\n`;
    
    if (emotion === 'love') {
      analysis += `사랑하는 마음이 ${cardName}을 통해 이렇게 아름답게 표현되고 있어요. 당신의 사랑은 진짜입니다.`;
    } else if (emotion === 'conflict') {
      analysis += `갈등 속에서도 ${cardName}은 관계를 포기하지 않으려는 당신의 의지를 보여줍니다. 이런 마음이 진정한 사랑의 증거예요.`;
    } else if (emotion === 'separation') {
      analysis += `아픈 마음 속에서도 ${cardName}은 여전히 상대방을 생각하는 당신의 따뜻함을 드러냅니다.`;
    } else {
      analysis += `${cardName}에서 느껴지는 당신의 진심이 아름답습니다. 이렇게 깊이 생각하고 계시는 마음 자체가 소중한 사랑의 증거예요.`;
    }
    
    // 방향성에 따른 추가 분석
    if (isReversed) {
      analysis += `\n\n역방향으로 나타났다고 해서 걱정하지 마세요. 이는 더 신중하고 깊이 있는 사랑을 원한다는 의미일 수 있어요. 때로는 역방향이 더 성숙한 관계로 나아가는 과정을 보여주기도 합니다.`;
    } else {
      analysis += `\n\n정방향으로 나타난 것은 당신의 마음이 건강하고 긍정적이라는 의미입니다. 자신의 감정을 믿고 나아가세요.`;
    }
    
    return analysis + `\n\n💝 당신 마음의 본질: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 깊이 있는 상대방 에너지 분석
   */
  private generateDeepTheirEnergyAnalysis(card: SelectedCard, question: string, emotion: string): string {
    const cardName = card.card.koreanName;
    const isReversed = card.isReversed;
    const orientation = isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation]['love'];
    
    let analysis = `상대방을 나타내는 ${cardName}${isReversed ? ' 역방향' : ''}을 보면, 그들의 마음도 복잡하고 깊다는 것을 알 수 있어요.\n\n`;
    
    // 카드의 구체적 의미
    analysis += `**상대방 마음의 본질**: ${interpretation}\n\n`;
    
    analysis += `겉으로 보이는 모습과 달리, 내면에는 깊은 변화와 성장의 에너지가 흐르고 있습니다. `;
    
    if (emotion === 'love') {
      analysis += `그들도 나름의 방식으로 사랑을 표현하고 있는 것 같아요. ${cardName}은 그들이 당신을 어떻게 생각하고 있는지를 보여줍니다.`;
    } else if (emotion === 'conflict') {
      analysis += `갈등 상황에서도 그들 나름의 보호 방식이 ${cardName}으로 나타나고 있습니다. 이는 사실 관계를 지키고 싶어하는 마음의 표현일 수 있어요.`;
    } else if (emotion === 'separation') {
      analysis += `이별의 상황에서도 ${cardName}은 그들이 당신을 완전히 잊지 못하고 있음을 보여줍니다.`;
    } else {
      analysis += `${cardName}을 통해 그들의 진심이 전해집니다. 표현하지 못하는 마음들이 이 카드에 담겨있어요.`;
    }
    
    // 방향성에 따른 추가 해석
    if (isReversed) {
      analysis += `\n\n역방향으로 나타난 것은 그들도 내적 갈등이나 혼란을 겪고 있을 수 있음을 의미합니다. 하지만 이는 관계에 대해 더 진지하게 생각하고 있다는 신호이기도 해요.`;
    } else {
      analysis += `\n\n정방향으로 나타난 것은 그들의 마음이 비교적 명확하고 안정되어 있음을 의미합니다. 솔직한 소통이 가능할 것 같아요.`;
    }
    
    return analysis + `\n\n💙 상대방 마음의 진실: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 깊이 있는 관계 현재 상태
   */
  private generateDeepRelationshipCurrentState(relationship: SelectedCard, you: SelectedCard, them: SelectedCard, emotion: string): string {
    const cardName = relationship.card.koreanName;
    const isReversed = relationship.isReversed;
    
    let analysis = `두 사람의 관계를 나타내는 ${cardName}${isReversed ? ' 역방향' : ''}을 보니, 가슴이 뭉클해집니다. `;
    
    analysis += `${you.card.koreanName}인 당신과 ${them.card.koreanName}인 상대방이 만나 만들어낸 이 ${cardName}의 에너지는 특별해요. `;
    
    if (emotion === 'love') {
      analysis += `사랑이 어떻게 두 사람을 변화시키고 성장시키는지 보여주는 아름다운 모습입니다.`;
    } else if (emotion === 'conflict') {
      analysis += `갈등조차도 두 사람이 더 깊이 이해하게 되는 과정의 일부로 보입니다.`;
    }
    
    return analysis + `\n\n💞 관계의 현재 에너지: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 깊이 있는 관계 도전과제
   */
  private generateDeepRelationshipChallenge(challenge: SelectedCard, relationship: SelectedCard, emotion: string): string {
    const cardName = challenge.card.koreanName;
    const isReversed = challenge.isReversed;
    
    let analysis = `${cardName}${isReversed ? ' 역방향' : ''}이 보여주는 과제는 사실 축복입니다. `;
    
    analysis += `이 도전을 통해 두 사람은 더욱 단단하고 아름다운 관계로 성장할 수 있어요. `;
    
    if (emotion === 'love') {
      analysis += `사랑한다는 것은 함께 어려움을 극복해나가는 것이기도 하니까요.`;
    } else if (emotion === 'conflict') {
      analysis += `갈등을 해결하는 과정에서 서로를 더 깊이 이해하게 될 거예요.`;
    }
    
    return analysis + `\n\n🌱 성장의 기회: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 깊이 있는 관계 미래
   */
  private generateDeepRelationshipOutcome(outcome: SelectedCard, challenge: SelectedCard, question: string, emotion: string): string {
    const cardName = outcome.card.koreanName;
    const isReversed = outcome.isReversed;
    
    let analysis = `미래를 나타내는 ${cardName}${isReversed ? ' 역방향' : ''}을 보니 희망이 생깁니다. `;
    
    analysis += `${challenge.card.koreanName}의 과제를 함께 극복한 후에 맞이할 ${cardName}의 에너지는 정말 아름다워요. `;
    
    if (emotion === 'love') {
      analysis += `사랑이 더욱 깊고 성숙해진 모습으로 완성될 것 같습니다.`;
    } else if (emotion === 'future') {
      analysis += `함께 꿈꿔왔던 미래가 현실이 되어가는 모습이 보여요.`;
    }
    
    return analysis + `\n\n✨ 미래의 선물: "${this.getCardEmotionalEssence(cardName, isReversed)}"`;
  }

  /**
   * 관계 따뜻한 결론
   */
  private generateRelationshipHeartfeltConclusion(cards: SelectedCard[], question: string, type: string, emotion: string): string {
    let conclusion = `**💕 사랑하는 당신에게**\n\n`;
    
    conclusion += `다섯 장의 카드가 들려준 이야기를 정리해보면, 당신의 관계는 정말 소중하고 특별합니다. `;
    conclusion += `완벽하지 않기 때문에 더욱 아름다운, 그런 인간적인 관계의 매력이 느껴져요.\n\n`;
    
    const emotionalConclusions = {
      'love': '사랑은 완벽함이 아니라 함께 성장하는 것입니다. 당신들의 사랑은 진짜예요.',
      'conflict': '갈등도 사랑의 일부입니다. 이를 통해 서로를 더 깊이 이해하게 될 거예요.',
      'future': '함께 꿈꾸는 미래는 이미 현실이 되어가고 있습니다. 조금만 더 기다려보세요.',
      'separation': '때로는 떨어져 있는 시간이 관계를 더욱 소중하게 만들기도 해요.',
      'reconciliation': '다시 시작하는 용기, 그 자체가 이미 아름다운 사랑의 증거입니다.',
      'understanding': '서로를 이해하려는 마음이 있는 한, 모든 관계는 성장할 수 있어요.'
    };
    
    conclusion += emotionalConclusions[emotion as keyof typeof emotionalConclusions] || '관계는 함께 만들어가는 아름다운 작품입니다.';
    conclusion += '\n\n💝 **마지막 당부**: 상대방도 당신만큼이나 복잡하고 아름다운 마음을 가진 사람이에요. 서로의 다름을 인정하고, 작은 것에도 감사하며, 무엇보다 자신을 사랑하는 것을 잊지 마세요. 당신이 행복해야 관계도 행복해집니다. 🌈';
    
    return conclusion;
  }

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

  // ===== 고급 감정 분석 통합 메소드들 =====

  /**
   * 향상된 감정적 오프닝 생성
   */
  private generateEnhancedEmotionalOpening(
    question: string,
    questionEmotion: string,
    cardName: string,
    isReversed: boolean,
    emotionalContext: EmotionalContext
  ): string {
    const coreEmotion = emotionalContext.questionAnalysis.emotion.primary;
    const emotionalIntensity = emotionalContext.questionAnalysis.emotion.intensity;
    const psychProfile = emotionalContext.psychProfile;
    
    let opening = '';
    
    // 감정 상태에 따른 공감적 시작
    if (emotionalIntensity > 0.7) {
      if (coreEmotion === 'anxiety' || coreEmotion === 'fear') {
        opening += `마음이 많이 불안하고 걱정이 되시는 것 같아요. 이런 마음으로 질문을 하시는 것만으로도 용기 있는 일이에요. `;
      } else if (coreEmotion === 'sadness') {
        opening += `지금 마음이 많이 아프고 힘드시죠. 그런 마음을 알아주는 ${cardName}이 당신 곁에 와주었어요. `;
      } else if (coreEmotion === 'anger' || coreEmotion === 'frustration') {
        opening += `답답하고 화가 나는 마음, 정말 이해해요. 그런 감정들도 소중한 당신의 일부예요. `;
      }
    } else {
      opening += `${cardName}이 당신의 마음을 깊이 이해하고 있어요. `;
    }
    
    // 심리적 유형에 따른 접근
    const jungianType = psychProfile.jungianType;
    if (jungianType.attitude === 'introversion') {
      opening += `내면의 깊은 성찰을 통해 답을 찾으려는 당신의 모습이 아름다워요. `;
    } else {
      opening += `적극적으로 해답을 찾으려는 당신의 에너지가 느껴져요. `;
    }
    
    return opening;
  }

  /**
   * 심리적 통찰 생성
   */
  private generatePsychologicalInsight(
    emotionalContext: EmotionalContext,
    cardName: string
  ): string {
    const primaryBlock = emotionalContext.emotionalJourney.emotionalBlocks[0];
    
    if (!primaryBlock) return '';
    
    let insight = `**🧠 내면의 목소리를 들어보세요**\n\n`;
    
    // 블록 유형에 따른 통찰
    const blockInsights = {
      'fear_based': `지금 내면에 두려움이 있는 것 같아요. ${cardName}은 그 두려움을 직면할 용기를 주려고 해요.`,
      'shame_based': `자신에 대한 부정적인 생각들이 마음을 무겁게 하고 있어요. 하지만 당신은 그보다 훨씬 소중한 존재예요.`,
      'control_based': `모든 것을 통제하려는 마음이 오히려 스트레스가 되고 있어요. 때로는 흘러가도록 두는 것도 지혜예요.`,
      'anger_based': `분노 뒤에 숨어있는 상처받은 마음을 ${cardName}이 알아주고 있어요.`,
      'attachment_based': `놓아주는 것에 대한 두려움이 있으시군요. ${cardName}은 건강한 관계의 방향을 제시해줄 거예요.`
    };
    
    insight += blockInsights[primaryBlock.blockType as keyof typeof blockInsights] || 
               `${cardName}이 내면의 복잡한 감정들을 정리하는데 도움을 줄 거예요.`;
    
    return insight;
  }

  /**
   * 치료적 위로 메시지
   */
  private generateTherapeuticComfort(
    card: SelectedCard,
    question: string,
    questionEmotion: string,
    emotionalContext: EmotionalContext
  ): string {
    const therapeuticNeeds = emotionalContext.therapeuticNeeds;
    const cardName = card.card.koreanName;
    
    let comfort = `**💚 당신을 위한 따뜻한 메시지**\n\n`;
    
    // 치료적 필요에 따른 맞춤 위로
    if (therapeuticNeeds.length > 0) {
      const primaryNeed = therapeuticNeeds[0];
      
      const comfortMessages = {
        'emotional_release': `억눌러둔 감정들을 표현하는 것은 약함이 아니라 용기예요. ${cardName}이 안전한 공간을 만들어줄 거예요.`,
        'cognitive_restructuring': `부정적인 생각의 패턴을 인식하는 것만으로도 이미 큰 변화의 첫걸음이에요.`,
        'spiritual_healing': `영혼의 상처는 시간과 사랑으로만 치유됩니다. 자신에게 더 많은 자비를 베풀어주세요.`,
        'relationship_healing': `건강한 관계는 서로의 상처를 이해하고 함께 성장하는 것에서 시작돼요.`,
        'trauma_integration': `과거의 아픔을 통합하는 과정은 쉽지 않지만, 당신은 충분히 강하고 아름다운 사람이에요.`
      };
      
      comfort += comfortMessages[primaryNeed.needType as keyof typeof comfortMessages] || 
                `${cardName}이 당신의 마음을 깊이 이해하고 위로해주고 있어요.`;
    } else {
      comfort += `지금 이 순간 당신이 느끼는 모든 감정들이 소중해요. ${cardName}이 그 감정들을 모두 받아주고 있답니다.`;
    }
    
    return comfort;
  }

  /**
   * 힐링 가이던스 생성
   */
  private generateHealingGuidance(emotionalContext: EmotionalContext): string {
    const healingPath = emotionalContext.emotionalJourney.healingPath;
    
    if (healingPath.length === 0) return '';
    
    let guidance = `**🌱 성장과 치유의 길**\n\n`;
    
    const firstStep = healingPath[0];
    guidance += `지금 당신에게 가장 필요한 것은 "${firstStep.step}"입니다.\n\n`;
    
    // 구체적인 방법 제시
    if (firstStep.methods.length > 0) {
      guidance += `**실천 방법:**\n`;
      firstStep.methods.slice(0, 2).forEach((method, index) => {
        guidance += `${index + 1}. ${method}\n`;
      });
      guidance += `\n`;
    }
    
    guidance += `${firstStep.expectedOutcome}을 통해 더 나은 내일을 만들어갈 수 있을 거예요.`;
    
    return guidance;
  }
}

export const aiNarrativeEngine = new AINavigativeEngine();