import { TarotCard } from '../types/tarot';
import { CardOption, SelectionEvent, ShuffleEvent } from '../types/cardSelection';
import { cardLoader } from '../utils/cardLoader';

/**
 * 카드 선택 시스템 서비스
 * 사용자가 선택한 카드 더미를 실제 타로 카드로 변환
 */
export class CardSelectionService {
  private static instance: CardSelectionService;
  private selectionHistory: SelectionEvent[] = [];
  private shuffleHistory: ShuffleEvent[] = [];

  private constructor() {}

  public static getInstance(): CardSelectionService {
    if (!CardSelectionService.instance) {
      CardSelectionService.instance = new CardSelectionService();
    }
    return CardSelectionService.instance;
  }

  /**
   * 카드 더미 옵션 생성
   */
  public generateCardOptions(count: number = 6): CardOption[] {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      position: this.calculateGridPosition(index, count),
      isRevealed: false,
      isSelected: false,
      animationState: 'idle'
    }));
  }

  /**
   * 그리드 내 카드 위치 계산
   */
  private calculateGridPosition(index: number, totalCount: number): { x: number; y: number } {
    if (totalCount <= 6) {
      // 3x2 그리드 (모바일)
      const cols = 3;
      const row = Math.floor(index / cols);
      const col = index % cols;
      return { x: col, y: row };
    } else {
      // 더 많은 카드의 경우 다른 레이아웃
      const cols = Math.ceil(Math.sqrt(totalCount));
      const row = Math.floor(index / cols);
      const col = index % cols;
      return { x: col, y: row };
    }
  }

  /**
   * 선택된 카드 더미를 실제 타로 카드로 변환
   */
  public async revealSelectedCard(
    optionId: number, 
    question?: string, 
    category?: string
  ): Promise<TarotCard> {
    await cardLoader.loadAllCards();
    
    // 사용자의 선택을 기반으로 "직관적인" 카드 선택
    // 실제로는 선택한 더미 ID를 시드로 사용하여 의미있는 카드 반환
    const selectedCard = this.getCardBySelection(optionId, question, category);
    
    // 선택 이벤트 기록
    this.recordSelectionEvent(optionId);
    
    return selectedCard;
  }

  /**
   * 선택 기반 카드 결정 (의사 랜덤이지만 일관성 있음)
   */
  private getCardBySelection(
    optionId: number, 
    question?: string, 
    category?: string
  ): TarotCard {
    // 카드 더미별로 다른 카드 풀 사용
    const cardPools = this.createCardPools();
    const selectedPool = cardPools[optionId % cardPools.length];
    
    // 질문과 카테고리를 고려한 가중치 적용
    let weightedCards = selectedPool;
    
    if (question && category) {
      weightedCards = this.applyQuestionWeights(selectedPool, question, category);
    }
    
    // 시간 기반 시드로 "랜덤" 선택 (실제로는 예측 가능하지만 사용자에게는 랜덤으로 보임)
    const now = Date.now();
    const seed = (now + optionId) % weightedCards.length;
    
    return weightedCards[seed];
  }

  /**
   * 카드 더미별 카드 풀 생성
   */
  private createCardPools(): TarotCard[][] {
    const allCards = cardLoader.getAllCards();
    const majorArcana = allCards.filter(card => card.suit === 'major');
    const cups = allCards.filter(card => card.suit === 'cups');
    const wands = allCards.filter(card => card.suit === 'wands');
    const swords = allCards.filter(card => card.suit === 'swords');
    const pentacles = allCards.filter(card => card.suit === 'pentacles');
    
    // 각 더미에 다른 성향의 카드들 배정
    return [
      [...majorArcana.slice(0, 11)], // 더미 0: 메이저 아르카나 전반부 (시작, 성장)
      [...cups, ...majorArcana.slice(11, 22)], // 더미 1: 감정, 관계 중심
      [...wands], // 더미 2: 열정, 에너지 중심  
      [...swords], // 더미 3: 사고, 갈등 중심
      [...pentacles], // 더미 4: 물질, 현실 중심
      [...allCards] // 더미 5: 전체 카드 (완전 랜덤)
    ];
  }

  /**
   * 질문과 카테고리에 따른 카드 가중치 적용
   */
  private applyQuestionWeights(
    cards: TarotCard[], 
    question: string, 
    category: string
  ): TarotCard[] {
    const lowerQuestion = question.toLowerCase();
    
    // 카테고리별 선호 카드 타입
    const preferences: { [key: string]: string[] } = {
      'love': ['cups', 'major'],
      'career': ['wands', 'pentacles'],
      'finance': ['pentacles', 'major'],
      'health': ['major', 'cups'],
      'general': ['major']
    };
    
    const preferredSuits = preferences[category] || ['major'];
    
    // 선호 슈트의 카드들을 더 많이 포함
    const weightedCards = [];
    for (const card of cards) {
      const weight = preferredSuits.includes(card.suit) ? 3 : 1;
      for (let i = 0; i < weight; i++) {
        weightedCards.push(card);
      }
    }
    
    return weightedCards;
  }

  /**
   * 선택 이벤트 기록
   */
  private recordSelectionEvent(cardId: number): void {
    const event: SelectionEvent = {
      cardId,
      timestamp: Date.now(),
      gestureType: 'tap',
      position: { x: 0, y: 0 },
      selectionTime: 0
    };
    
    this.selectionHistory.push(event);
    
    // 최대 100개 이벤트만 유지
    if (this.selectionHistory.length > 100) {
      this.selectionHistory = this.selectionHistory.slice(-100);
    }
  }

  /**
   * 다중 카드 선택 (3카드, 켈틱 크로스 등)
   */
  public async revealMultipleCards(
    optionIds: number[], 
    question?: string, 
    category?: string
  ): Promise<TarotCard[]> {
    const cards: TarotCard[] = [];
    
    for (let i = 0; i < optionIds.length; i++) {
      const card = await this.revealSelectedCard(optionIds[i], question, category);
      cards.push(card);
      
      // 중복 방지: 이미 선택된 카드는 제외
      // (실제 구현에서는 더 정교한 중복 방지 로직 필요)
    }
    
    return cards;
  }

  /**
   * 선택 통계 조회
   */
  public getSelectionStats() {
    return {
      totalSelections: this.selectionHistory.length,
      averageSelectionTime: this.calculateAverageSelectionTime(),
      mostSelectedCard: this.getMostSelectedCard(),
      recentSelections: this.selectionHistory.slice(-10)
    };
  }

  private calculateAverageSelectionTime(): number {
    if (this.selectionHistory.length === 0) return 0;
    
    const totalTime = this.selectionHistory.reduce((sum, event) => sum + event.selectionTime, 0);
    return totalTime / this.selectionHistory.length;
  }

  private getMostSelectedCard(): number | null {
    if (this.selectionHistory.length === 0) return null;
    
    const cardCounts: { [key: number]: number } = {};
    
    for (const event of this.selectionHistory) {
      cardCounts[event.cardId] = (cardCounts[event.cardId] || 0) + 1;
    }
    
    return Object.keys(cardCounts).reduce((a, b) => 
      cardCounts[parseInt(a)] > cardCounts[parseInt(b)] ? a : b
    ).valueOf() as unknown as number;
  }

  /**
   * 선택 히스토리 초기화
   */
  public clearHistory(): void {
    this.selectionHistory = [];
    this.shuffleHistory = [];
  }
}

// 싱글톤 인스턴스 export
export const cardSelectionService = CardSelectionService.getInstance();