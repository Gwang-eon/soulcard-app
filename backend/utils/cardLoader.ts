import { TarotCard, CardFile, MajorArcanaElement, Suit } from '../types/tarot';

/**
 * 타로 카드 데이터 로더 유틸리티
 * 분산된 JSON 파일들로부터 카드 데이터를 로드하고 통합합니다
 */
export class CardLoader {
  private static instance: CardLoader;
  private majorCards: TarotCard[] = [];
  private wandsCards: TarotCard[] = [];
  private cupsCards: TarotCard[] = [];
  private swordsCards: TarotCard[] = [];
  private pentaclesCards: TarotCard[] = [];
  private majorElements: MajorArcanaElement[] = [];
  private allCards: TarotCard[] = [];
  private isLoaded = false;

  private constructor() {}

  public static getInstance(): CardLoader {
    if (!CardLoader.instance) {
      CardLoader.instance = new CardLoader();
    }
    return CardLoader.instance;
  }

  /**
   * 모든 카드 데이터를 로드합니다
   */
  public async loadAllCards(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // 각 파일에서 카드 데이터 로드
      const [majorData, wandsData, cupsData, swordsData, pentaclesData, elementsData] = await Promise.all([
        this.loadCardFile('/data/cards/majorArcana.json'),
        this.loadCardFile('/data/cards/wands.json'),
        this.loadCardFile('/data/cards/cups.json'),
        this.loadCardFile('/data/cards/swords.json'),
        this.loadCardFile('/data/cards/pentacles.json'),
        this.loadElementsFile('/data/majorArcanaElements.json')
      ]);

      this.majorCards = majorData.cards;
      this.wandsCards = wandsData.cards;
      this.cupsCards = cupsData.cards;
      this.swordsCards = swordsData.cards;
      this.pentaclesCards = pentaclesData.cards;
      this.majorElements = elementsData.majorArcanaElements;

      // 메이저 카드에 점성학적 정보 추가 (선택사항)
      this.integrateElementalData();

      // 모든 카드를 하나의 배열로 통합
      this.allCards = [
        ...this.majorCards,
        ...this.wandsCards,
        ...this.cupsCards,
        ...this.swordsCards,
        ...this.pentaclesCards
      ].sort((a, b) => a.id - b.id);

      this.isLoaded = true;
    } catch (error) {
      throw new Error(`카드 데이터 로드 실패: ${error}`);
    }
  }

  /**
   * 개별 카드 파일을 로드합니다
   */
  private async loadCardFile(path: string): Promise<CardFile> {
    try {
      // Node.js 환경에서는 fs 사용, 브라우저에서는 fetch 사용
      if (typeof window === 'undefined') {
        const fs = await import('fs/promises');
        const fullPath = require('path').join(__dirname, '..', path);
        const data = await fs.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
      } else {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`파일 로드 실패: ${path}`);
        }
        return response.json();
      }
    } catch (error) {
      throw new Error(`파일 로드 실패: ${path} - ${error}`);
    }
  }

  /**
   * 메이저 아르카나 원소 데이터를 로드합니다
   */
  private async loadElementsFile(path: string): Promise<any> {
    try {
      if (typeof window === 'undefined') {
        const fs = await import('fs/promises');
        const fullPath = require('path').join(__dirname, '..', path);
        const data = await fs.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
      } else {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`원소 데이터 로드 실패: ${path}`);
        }
        return response.json();
      }
    } catch (error) {
      throw new Error(`원소 데이터 로드 실패: ${path} - ${error}`);
    }
  }

  /**
   * 메이저 카드에 점성학적 원소 정보를 통합합니다
   */
  private integrateElementalData(): void {
    this.majorCards = this.majorCards.map(card => {
      const elementData = this.majorElements.find(e => e.id === card.id);
      if (elementData) {
        return {
          ...card,
          astrologicalElement: elementData.element,
          astrological: elementData.astrological,
          zodiac: elementData.zodiac,
          elementDescription: elementData.description
        };
      }
      return card;
    });
  }

  /**
   * 모든 카드를 반환합니다
   */
  public getAllCards(): TarotCard[] {
    if (!this.isLoaded) {
      throw new Error('카드 데이터가 로드되지 않았습니다. loadAllCards()를 먼저 호출하세요.');
    }
    return this.allCards;
  }

  /**
   * ID로 특정 카드를 검색합니다
   */
  public getCardById(id: number): TarotCard | undefined {
    return this.getAllCards().find(card => card.id === id);
  }

  /**
   * 이름으로 특정 카드를 검색합니다 (영어 이름)
   */
  public findCardByName(name: string): TarotCard | undefined {
    return this.getAllCards().find(card => card.name === name);
  }

  /**
   * 한국어 이름으로 특정 카드를 검색합니다
   */
  public findCardByKoreanName(koreanName: string): TarotCard | undefined {
    return this.getAllCards().find(card => 
      (card as any).koreanName === koreanName || card.name === koreanName
    );
  }

  /**
   * 수트별로 카드를 반환합니다
   */
  public getCardsBySuit(suit: Suit): TarotCard[] {
    return this.getAllCards().filter(card => card.suit === suit);
  }

  /**
   * 메이저 아르카나만 반환합니다
   */
  public getMajorArcana(): TarotCard[] {
    return this.majorCards;
  }

  /**
   * 마이너 아르카나만 반환합니다
   */
  public getMinorArcana(): TarotCard[] {
    return this.getAllCards().filter(card => card.suit !== 'major');
  }

  /**
   * 의도적/직관적으로 카드를 선택합니다 (질문 기반)
   */
  public getIntuitiveCard(question?: string, category?: string): TarotCard {
    const cards = this.getAllCards();
    
    // 질문이 있는 경우 의미 기반 선택 알고리즘
    if (question && category) {
      return this.selectMeaningfulCard(cards, question, category);
    }
    
    // 질문만 있는 경우 키워드 기반 선택
    if (question) {
      return this.selectByKeywords(cards, question);
    }
    
    // 질문이 없는 경우 시간 기반 의도적 선택
    const now = new Date();
    const timeSeed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const index = timeSeed % cards.length;
    return cards[index];
  }

  /**
   * 의도적으로 n장의 카드를 선택합니다 (질문 기반, 중복 없음)
   */
  public getIntuitiveCards(count: number, question?: string, category?: string): TarotCard[] {
    const allCards = this.getAllCards();
    const selected: TarotCard[] = [];
    
    if (question && category) {
      // 질문과 카테고리가 있으면 의미 기반 선택
      return this.selectMeaningfulCards(allCards, count, question, category);
    }
    
    if (question) {
      // 질문만 있으면 키워드 기반 선택
      return this.selectCardsByKeywords(allCards, count, question);
    }
    
    // 시간 기반 선택
    const cards = [...allCards];
    const baseSeed = Date.now();
    
    for (let i = 0; i < count && cards.length > 0; i++) {
      const cardSeed = (baseSeed + i * 1000 + i * i) % cards.length;
      const selectedCard = cards.splice(cardSeed, 1)[0];
      selected.push(selectedCard);
    }
    
    return selected;
  }

  /**
   * 의미 기반으로 여러 카드를 선택합니다
   */
  private selectMeaningfulCards(cards: TarotCard[], count: number, question: string, category: string): TarotCard[] {
    const lowerQuestion = question.toLowerCase();
    const preferredSuits = this.getPreferredSuits(category);
    const questionKeywords = this.analyzeQuestionKeywords(lowerQuestion);
    
    // 모든 카드에 점수 부여
    const scoredCards = cards.map(card => ({
      card,
      score: this.calculateCardRelevanceScore(card, questionKeywords, preferredSuits, category)
    }));
    
    // 점수순으로 정렬하고 상위 카드들에서 선택
    const sortedCards = scoredCards.sort((a, b) => b.score - a.score);
    
    // 다양성을 위해 상위 30% 카드들 중에서 선택
    const topPoolSize = Math.max(count * 3, 15);
    const topCards = sortedCards.slice(0, topPoolSize).map(item => item.card);
    
    const selected: TarotCard[] = [];
    const availableCards = [...topCards];
    const seed = this.generateSeedFromQuestion(question);
    
    for (let i = 0; i < count && availableCards.length > 0; i++) {
      const cardSeed = (seed + i * 1000 + i * i) % availableCards.length;
      const selectedCard = availableCards.splice(cardSeed, 1)[0];
      selected.push(selectedCard);
    }
    
    return selected;
  }

  /**
   * 키워드 기반으로 여러 카드를 선택합니다
   */
  private selectCardsByKeywords(cards: TarotCard[], count: number, question: string): TarotCard[] {
    const questionKeywords = this.analyzeQuestionKeywords(question.toLowerCase());
    
    // 키워드 매칭 카드들 찾기
    const matchingCards = cards.filter(card => {
      const cardKeywords = [...card.uprightKeywords, ...card.reversedKeywords]
        .map(k => k.toLowerCase());
      
      return questionKeywords.some(qk => 
        cardKeywords.some(ck => ck.includes(qk) || qk.includes(ck))
      );
    });
    
    const availableCards = matchingCards.length >= count ? matchingCards : [...cards];
    const selected: TarotCard[] = [];
    const cardPool = [...availableCards];
    const seed = this.generateSeedFromQuestion(question);
    
    for (let i = 0; i < count && cardPool.length > 0; i++) {
      const cardSeed = (seed + i * 1000 + i * i) % cardPool.length;
      const selectedCard = cardPool.splice(cardSeed, 1)[0];
      selected.push(selectedCard);
    }
    
    return selected;
  }

  /**
   * 질문의 의미를 분석하여 적절한 카드를 선택합니다
   */
  private selectMeaningfulCard(cards: TarotCard[], question: string, category: string): TarotCard {
    const lowerQuestion = question.toLowerCase();
    
    // 카테고리별 우선 수트 결정
    const preferredSuits = this.getPreferredSuits(category);
    
    // 질문 키워드 분석
    const questionKeywords = this.analyzeQuestionKeywords(lowerQuestion);
    
    // 적합한 카드들을 점수로 평가
    const scoredCards = cards.map(card => ({
      card,
      score: this.calculateCardRelevanceScore(card, questionKeywords, preferredSuits, category)
    }));
    
    // 점수가 높은 상위 카드들 중에서 선택 (다양성 보장)
    const topCards = scoredCards
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(10, cards.length))
      .map(item => item.card);
    
    // 상위 카드 중에서 질문 해시 기반으로 선택
    const seed = this.generateSeedFromQuestion(question);
    const index = seed % topCards.length;
    return topCards[index];
  }

  /**
   * 키워드 기반으로 카드를 선택합니다
   */
  private selectByKeywords(cards: TarotCard[], question: string): TarotCard {
    const lowerQuestion = question.toLowerCase();
    const questionKeywords = this.analyzeQuestionKeywords(lowerQuestion);
    
    // 키워드 매칭 점수 계산
    const matchingCards = cards.filter(card => {
      const cardKeywords = [...card.uprightKeywords, ...card.reversedKeywords]
        .map(k => k.toLowerCase());
      
      return questionKeywords.some(qk => 
        cardKeywords.some(ck => ck.includes(qk) || qk.includes(ck))
      );
    });
    
    if (matchingCards.length > 0) {
      const seed = this.generateSeedFromQuestion(question);
      const index = seed % matchingCards.length;
      return matchingCards[index];
    }
    
    // 매칭되는 카드가 없으면 해시 기반 선택
    const seed = this.generateSeedFromQuestion(question);
    const index = seed % cards.length;
    return cards[index];
  }

  /**
   * 카테고리별 선호 수트 반환
   */
  private getPreferredSuits(category: string): string[] {
    const suitMapping: Record<string, string[]> = {
      'love': ['cups', 'major'],
      'career': ['wands', 'pentacles', 'major'], 
      'money': ['pentacles', 'major'],
      'health': ['major', 'cups'],
      'spiritual': ['major', 'cups'],
      'general': ['major', 'wands', 'cups', 'swords', 'pentacles']
    };
    
    return suitMapping[category] || suitMapping['general'];
  }

  /**
   * 질문에서 키워드를 추출합니다
   */
  private analyzeQuestionKeywords(question: string): string[] {
    const keywords: string[] = [];
    
    // 감정/사랑 관련 키워드 (확장)
    const lovePatterns = ['사랑', '연애', '좋아', '만남', '이별', '헤어', '결혼', '결혼식', '약혼', '데이트', '고백', '짝사랑', '썸', '연인', '남자친구', '여자친구', '새로운 사람', '다시 만날', '복합'];
    if (lovePatterns.some(pattern => question.includes(pattern))) {
      keywords.push('사랑', '감정', '관계', '연결', '소통', '이해', '애정', '로맨스');
    }
    
    // 일/직업 관련 키워드 (확장)
    const careerPatterns = ['일', '직업', '직장', '회사', '업무', '취업', '이직', '승진', '사업', '창업', '프로젝트', '동료', '상사', '부하', '면접', '성과', '실적', '목표', '꿈', '비전'];
    if (careerPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('일', '직업', '성취', '목표', '발전', '성공', '리더십', '협력', '실현', '능력');
    }
    
    // 돈/재정 관련 키워드 (확장)
    const moneyPatterns = ['돈', '재정', '투자', '수입', '월급', '연봉', '부자', '가난', '빚', '대출', '저축', '펀드', '주식', '부동산', '사업', '매출', '이익', '손실'];
    if (moneyPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('돈', '재정', '물질', '안정', '풍요', '성공', '기회', '투자', '수익', '안전');
    }
    
    // 건강 관련 키워드 (확장)
    const healthPatterns = ['건강', '몸', '아프', '병', '치료', '회복', '운동', '다이어트', '스트레스', '피로', '우울', '불안', '마음', '정신', '치유'];
    if (healthPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('건강', '치유', '에너지', '회복', '균형', '조화', '평온', '안정');
    }
    
    // 시간/미래 관련 키워드 (확장)
    const timePatterns = ['미래', '앞으로', '될까', '내일', '다음', '나중', '언제', '올해', '내년', '곧', '빨리', '천천히', '시간', '기다림'];
    if (timePatterns.some(pattern => question.includes(pattern))) {
      keywords.push('미래', '변화', '가능성', '시간', '타이밍', '기회', '발전', '성장');
    }
    
    // 결정/선택 관련 키워드 (확장)
    const decisionPatterns = ['결정', '선택', '해야', '말아야', '고민', '갈등', '어떻게', '방법', '해결', '답', '길', '방향', '조언'];
    if (decisionPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('결정', '선택', '행동', '방향', '지혜', '직관', '용기', '변화');
    }
    
    // 감정 상태 키워드 (새로 추가)
    const emotionPatterns = ['행복', '기쁨', '슬픔', '우울', '불안', '걱정', '두려움', '화', '짜증', '스트레스', '외로움', '공허', '답답', '혼란'];
    if (emotionPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('감정', '마음', '치유', '위로', '평온', '안정', '균형', '이해');
    }
    
    // 관계 키워드 (새로 추가)
    const relationshipPatterns = ['가족', '부모', '형제', '자매', '친구', '지인', '동료', '상사', '부하', '이웃', '사람들', '관계', '소통', '갈등', '화해'];
    if (relationshipPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('관계', '소통', '이해', '조화', '협력', '신뢰', '배려', '연결');
    }
    
    // 성장/변화 키워드 (새로 추가)  
    const growthPatterns = ['성장', '발전', '변화', '새로운', '시작', '끝', '마무리', '완성', '성취', '달성', '개선', '향상', '발달'];
    if (growthPatterns.some(pattern => question.includes(pattern))) {
      keywords.push('성장', '발전', '변화', '새로움', '시작', '완성', '성취', '진보');
    }
    
    // 위기/도전 키워드 (새로 추가)
    const challengePatterns = ['어려움', '힘들', '고통', '시련', '위기', '문제', '장애물', '도전', '극복', '해결', '견디', '버티'];
    if (challengePatterns.some(pattern => question.includes(pattern))) {
      keywords.push('도전', '극복', '인내', '용기', '힘', '의지', '희망', '치유');
    }
    
    // 기본 키워드가 없으면 질문에서 명사 추출 시도
    if (keywords.length === 0) {
      const extractedWords = this.extractMeaningfulWords(question);
      keywords.push(...extractedWords);
    }
    
    return [...new Set(keywords)]; // 중복 제거
  }
  
  /**
   * 질문에서 의미 있는 단어들을 추출합니다
   */
  private extractMeaningfulWords(question: string): string[] {
    const meaningfulWords: string[] = [];
    
    // 한글 단어들 추출 (2글자 이상)
    const koreanWords = question.match(/[가-힣]{2,}/g) || [];
    
    // 의미 있는 단어들만 필터링
    const meaningfulPatterns = [
      '새로운', '좋은', '나쁜', '힘든', '어려운', '쉬운', '중요한', '특별한',
      '마지막', '처음', '다음', '이번', '올해', '내년', '요즘', '최근',
      '진짜', '정말', '매우', '너무', '조금', '많이', '자주', '가끔',
      '혼자', '함께', '같이', '따로', '멀리', '가까이', '높이', '깊이'
    ];
    
    koreanWords.forEach(word => {
      if (word.length >= 2 && (
        meaningfulPatterns.includes(word) ||
        word.endsWith('하다') || word.endsWith('되다') || 
        word.endsWith('이다') || word.endsWith('하기') ||
        word.endsWith('스럽다') || word.endsWith('롭다')
      )) {
        meaningfulWords.push(word);
      }
    });
    
    return meaningfulWords.slice(0, 5); // 최대 5개만
  }

  /**
   * 카드의 질문 관련성 점수를 계산합니다
   */
  private calculateCardRelevanceScore(
    card: TarotCard, 
    questionKeywords: string[], 
    preferredSuits: string[], 
    category: string
  ): number {
    let score = 0;
    
    // 수트 선호도 점수 (강화)
    if (preferredSuits.includes(card.suit)) {
      score += 15;
    }
    
    // 키워드 매칭 점수 (더 정교하게)
    const cardKeywords = [...card.uprightKeywords, ...card.reversedKeywords]
      .map(k => k.toLowerCase());
    
    questionKeywords.forEach(qk => {
      cardKeywords.forEach(ck => {
        // 완전 일치
        if (ck === qk) {
          score += 15;
        }
        // 부분 일치 (더 세분화)
        else if (ck.includes(qk) && qk.length >= 3) {
          score += 10;
        }
        else if (qk.includes(ck) && ck.length >= 3) {
          score += 10;
        }
        // 유사 의미 (한글 특성 고려)
        else if (this.isSimilarMeaning(qk, ck)) {
          score += 8;
        }
      });
    });
    
    // 카드명에서의 매칭 (높은 점수)
    questionKeywords.forEach(qk => {
      if (card.koreanName.toLowerCase().includes(qk)) {
        score += 20;
      }
      if (card.name.toLowerCase().includes(qk)) {
        score += 15;
      }
    });
    
    // 카테고리별 특별 보너스 (확장)
    if (category === 'love') {
      const loveCards = ['연인', 'lovers', '컵', 'cups', '여황제', 'empress', '황제', 'emperor'];
      if (loveCards.some(keyword => 
        card.koreanName.toLowerCase().includes(keyword) || 
        card.name.toLowerCase().includes(keyword) ||
        card.suit === 'cups'
      )) {
        score += 12;
      }
    }
    
    if (category === 'money') {
      const moneyCards = ['펜타클', 'pentacles', '동전', '황제', 'emperor', '세계', 'world'];
      if (moneyCards.some(keyword => 
        card.koreanName.toLowerCase().includes(keyword) || 
        card.name.toLowerCase().includes(keyword) ||
        card.suit === 'pentacles'
      )) {
        score += 12;
      }
    }
    
    if (category === 'career') {
      const careerCards = ['완드', 'wands', '지팡이', '마법사', 'magician', '황제', 'emperor', '전차', 'chariot'];
      if (careerCards.some(keyword => 
        card.koreanName.toLowerCase().includes(keyword) || 
        card.name.toLowerCase().includes(keyword) ||
        card.suit === 'wands'
      )) {
        score += 12;
      }
    }
    
    if (category === 'health') {
      const healthCards = ['별', 'star', '태양', 'sun', '절제', 'temperance', '힘', 'strength'];
      if (healthCards.some(keyword => 
        card.koreanName.toLowerCase().includes(keyword) || 
        card.name.toLowerCase().includes(keyword)
      )) {
        score += 12;
      }
    }
    
    if (category === 'spiritual') {
      const spiritualCards = ['대사제', 'hierophant', '은둔자', 'hermit', '달', 'moon', '별', 'star', '심판', 'judgement'];
      if (spiritualCards.some(keyword => 
        card.koreanName.toLowerCase().includes(keyword) || 
        card.name.toLowerCase().includes(keyword)
      )) {
        score += 12;
      }
    }
    
    // 메이저 아르카나 보너스 (중요한 질문에 더 깊은 의미)
    if (card.suit === 'major' && questionKeywords.length > 3) {
      score += 5;
    }
    
    return score;
  }
  
  /**
   * 두 키워드의 의미적 유사성을 판단합니다
   */
  private isSimilarMeaning(keyword1: string, keyword2: string): boolean {
    // 유사 의미 그룹들
    const similarGroups = [
      ['사랑', '애정', '로맨스', '연애', '감정'],
      ['일', '직업', '업무', '커리어', '직장'],
      ['돈', '재정', '물질', '부', '수입'],
      ['건강', '치유', '회복', '치료', '웰빙'],
      ['성장', '발전', '진보', '향상', '개선'],
      ['변화', '전환', '새로움', '시작', '혁신'],
      ['관계', '소통', '연결', '유대', '네트워크'],
      ['결정', '선택', '판단', '결심', '의지'],
      ['미래', '앞날', '전망', '예측', '가능성'],
      ['과거', '옛날', '추억', '역사', '경험'],
      ['현재', '지금', '오늘', '당장', '즉시'],
      ['행복', '기쁨', '즐거움', '만족', '축복'],
      ['슬픔', '아픔', '고통', '상처', '눈물'],
      ['불안', '걱정', '두려움', '공포', '긴장'],
      ['희망', '기대', '소망', '꿈', '비전']
    ];
    
    for (const group of similarGroups) {
      if (group.includes(keyword1) && group.includes(keyword2)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * 질문으로부터 의도적 시드 생성
   */
  private generateSeedFromQuestion(question: string): number {
    let hash = 0;
    for (let i = 0; i < question.length; i++) {
      const char = question.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit 정수로 변환
    }
    return Math.abs(hash);
  }

  /**
   * 랜덤으로 카드를 선택합니다 (데모용, 실제 사용 권장하지 않음)
   * @deprecated 의도적 선택을 위해 getIntuitiveCard() 사용 권장
   */
  public getRandomCard(): TarotCard {
    const cards = this.getAllCards();
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  }

  /**
   * 랜덤으로 n장의 카드를 선택합니다 (데모용, 실제 사용 권장하지 않음)
   * @deprecated 의도적 선택을 위해 getIntuitiveCards() 사용 권장
   */
  public getRandomCards(count: number): TarotCard[] {
    const cards = [...this.getAllCards()];
    const selected: TarotCard[] = [];
    
    for (let i = 0; i < count && cards.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      selected.push(cards.splice(randomIndex, 1)[0]);
    }
    
    return selected;
  }

  /**
   * 카드 이름으로 검색합니다 (부분 일치)
   */
  public searchCards(query: string, language: 'ko' | 'en' = 'ko'): TarotCard[] {
    const searchTerm = query.toLowerCase();
    return this.getAllCards().filter(card => {
      const name = language === 'ko' ? card.koreanName : card.name;
      return name.toLowerCase().includes(searchTerm);
    });
  }

  /**
   * 로딩 상태를 확인합니다
   */
  public isDataLoaded(): boolean {
    return this.isLoaded;
  }

  /**
   * 캐시를 무효화하고 데이터를 다시 로드합니다
   */
  public async reloadData(): Promise<void> {
    this.isLoaded = false;
    this.allCards = [];
    this.majorCards = [];
    this.wandsCards = [];
    this.cupsCards = [];
    this.swordsCards = [];
    this.pentaclesCards = [];
    this.majorElements = [];
    await this.loadAllCards();
  }

  /**
   * 데이터베이스 통계를 반환합니다
   */
  public getStats() {
    if (!this.isLoaded) {
      return { error: '데이터가 로드되지 않았습니다' };
    }

    return {
      totalCards: this.allCards.length,
      majorArcana: this.majorCards.length,
      minorArcana: this.getMinorArcana().length,
      wands: this.wandsCards.length,
      cups: this.cupsCards.length,
      swords: this.swordsCards.length,
      pentacles: this.pentaclesCards.length,
      completionRate: `${((this.allCards.length / 78) * 100).toFixed(1)}%`
    };
  }
}

// 싱글톤 인스턴스 익스포트
export const cardLoader = CardLoader.getInstance();

// 사용 예시:
/*
// 앱 시작 시 데이터 로드
await cardLoader.loadAllCards();

// 모든 카드 가져오기
const allCards = cardLoader.getAllCards();

// 특정 카드 찾기
const fool = cardLoader.getCardById(0);

// 랜덤 카드 선택
const randomCard = cardLoader.getRandomCard();

// 3장 스프레드를 위한 랜덤 카드
const threeCards = cardLoader.getRandomCards(3);

// 메이저 아르카나만
const majorCards = cardLoader.getMajorArcana();

// 완드 카드만
const wandsCards = cardLoader.getCardsBySuit('wands');

// 카드 검색
const searchResults = cardLoader.searchCards('바보', 'ko');

// 통계 확인
const stats = cardLoader.getStats();
*/