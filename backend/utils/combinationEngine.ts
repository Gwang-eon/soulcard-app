import { TarotCard, Category, Strength, SpreadType } from '../types/tarot';

/**
 * 타로 카드 조합 해석 엔진
 * 실시간으로 카드 조합을 분석하고 해석을 생성합니다
 */
export class CombinationEngine {
  private static instance: CombinationEngine;

  private constructor() {}

  public static getInstance(): CombinationEngine {
    if (!CombinationEngine.instance) {
      CombinationEngine.instance = new CombinationEngine();
    }
    return CombinationEngine.instance;
  }

  /**
   * 카드 조합의 강도를 계산합니다
   */
  public calculateCombinationStrength(cards: TarotCard[]): Strength {
    let strengthScore = 0;
    
    // 메이저 아르카나 가중치
    const majorCount = cards.filter(card => card.suit === 'major').length;
    strengthScore += majorCount * 3;
    
    // 같은 수트 가중치
    const suitCounts = this.getSuitCounts(cards);
    const maxSuitCount = Math.max(...Object.values(suitCounts));
    if (maxSuitCount >= 2) strengthScore += maxSuitCount * 2;
    
    // 연속 숫자 가중치
    const consecutiveBonus = this.getConsecutiveNumberBonus(cards);
    strengthScore += consecutiveBonus;
    
    // 특별한 조합 보너스
    const specialBonus = this.getSpecialCombinationBonus(cards);
    strengthScore += specialBonus;
    
    // 강도 분류
    if (strengthScore >= 15) return 'maximum';
    if (strengthScore >= 12) return 'extremely_strong';
    if (strengthScore >= 9) return 'very_strong';
    if (strengthScore >= 6) return 'strong';
    if (strengthScore >= 3) return 'moderate';
    return 'weak';
  }

  /**
   * 2장 카드 조합 해석
   */
  public interpretTwoCards(card1: TarotCard, card2: TarotCard, category: Category = 'general'): string {
    const cards = [card1, card2];
    
    // 기본 해석 요소들
    const elements = this.analyzeElements(cards);
    const suits = this.analyzeSuits(cards);
    const numbers = this.analyzeNumbers(cards);
    const themes = this.analyzeThemes(cards);
    
    // 특별한 조합 체크
    const specialPattern = this.checkSpecialPatterns(cards);
    if (specialPattern) {
      return this.generateSpecialInterpretation(specialPattern, category);
    }
    
    // 일반적인 조합 해석 생성
    return this.generateTwoCardInterpretation(card1, card2, elements, suits, numbers, themes, category);
  }

  /**
   * 3장 카드 스프레드 해석 (과거-현재-미래)
   */
  public interpretThreeCardSpread(
    cards: [TarotCard, TarotCard, TarotCard], 
    spreadType: SpreadType = 'past_present_future',
    category: Category = 'general'
  ): {
    individual: [string, string, string];
    overall: string;
    advice: string;
  } {
    const [past, present, future] = cards;
    
    // 개별 카드 해석
    const individual: [string, string, string] = [
      this.getSingleCardInterpretation(past, category, 'past'),
      this.getSingleCardInterpretation(present, category, 'present'),
      this.getSingleCardInterpretation(future, category, 'future')
    ];
    
    // 전체적인 흐름 분석
    const progression = this.analyzeProgression(cards);
    const overall = this.generateOverallInterpretation(cards, progression, category);
    
    // 조언 생성
    const advice = this.generateAdvice(cards, progression, category);
    
    return { individual, overall, advice };
  }

  /**
   * 원소 분석
   */
  private analyzeElements(cards: TarotCard[]): {
    dominant: string | null;
    balance: 'balanced' | 'imbalanced';
    missing: string[];
  } {
    const elementCounts = {
      fire: 0,
      water: 0,
      air: 0,
      earth: 0
    };
    
    cards.forEach(card => {
      if (card.element && card.element !== null) {
        elementCounts[card.element]++;
      }
    });
    
    const maxCount = Math.max(...Object.values(elementCounts));
    const dominant = Object.entries(elementCounts).find(([_, count]) => count === maxCount && count > 0)?.[0] || null;
    
    const presentElements = Object.entries(elementCounts).filter(([_, count]) => count > 0).map(([element]) => element);
    const missing = Object.keys(elementCounts).filter(element => !presentElements.includes(element));
    
    const balance = presentElements.length >= 3 ? 'balanced' : 'imbalanced';
    
    return { dominant, balance, missing };
  }

  /**
   * 수트 분석
   */
  private analyzeSuits(cards: TarotCard[]): {
    suitCounts: Record<string, number>;
    dominantSuit: string | null;
    diversity: 'low' | 'medium' | 'high';
  } {
    const suitCounts = this.getSuitCounts(cards);
    const maxCount = Math.max(...Object.values(suitCounts));
    const dominantSuit = Object.entries(suitCounts).find(([_, count]) => count === maxCount)?.[0] || null;
    
    const uniqueSuits = Object.keys(suitCounts).length;
    let diversity: 'low' | 'medium' | 'high';
    if (uniqueSuits <= 2) diversity = 'low';
    else if (uniqueSuits === 3) diversity = 'medium';
    else diversity = 'high';
    
    return { suitCounts, dominantSuit, diversity };
  }

  /**
   * 숫자 패턴 분석
   */
  private analyzeNumbers(cards: TarotCard[]): {
    hasSequence: boolean;
    averageNumber: number;
    range: 'low' | 'medium' | 'high';
  } {
    const numbers = cards
      .filter(card => card.number !== undefined && card.number !== null)
      .map(card => card.number as number)
      .sort((a, b) => a - b);
    
    const hasSequence = this.checkForSequence(numbers);
    const averageNumber = numbers.length > 0 ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length : 0;
    
    let range: 'low' | 'medium' | 'high';
    if (averageNumber <= 3) range = 'low';
    else if (averageNumber <= 7) range = 'medium';
    else range = 'high';
    
    return { hasSequence, averageNumber, range };
  }

  /**
   * 테마 분석
   */
  private analyzeThemes(cards: TarotCard[]): string[] {
    const themes: string[] = [];
    
    // 키워드 기반 테마 추출
    const allKeywords = cards.flatMap(card => [...card.uprightKeywords, ...card.reversedKeywords]);
    const keywordCounts = allKeywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // 자주 나타나는 키워드를 테마로 선정
    const commonThemes = Object.entries(keywordCounts)
      .filter(([_, count]) => count >= 2)
      .map(([keyword]) => keyword);
    
    themes.push(...commonThemes);
    
    // 추가 테마 규칙
    if (cards.some(card => card.suit === 'major')) themes.push('인생의전환점');
    if (cards.filter(card => card.suit === 'cups').length >= 2) themes.push('감정과관계');
    if (cards.filter(card => card.suit === 'wands').length >= 2) themes.push('열정과행동');
    if (cards.filter(card => card.suit === 'swords').length >= 2) themes.push('갈등과소통');
    if (cards.filter(card => card.suit === 'pentacles').length >= 2) themes.push('물질과안정');
    
    return [...new Set(themes)]; // 중복 제거
  }

  /**
   * 특별한 패턴 체크
   */
  private checkSpecialPatterns(cards: TarotCard[]): string | null {
    // 모든 에이스
    if (cards.every(card => card.number === 1)) return 'all_aces';
    
    // 모든 메이저
    if (cards.every(card => card.suit === 'major')) return 'all_major';
    
    // 같은 수트
    if (cards.length > 1 && cards.every(card => card.suit === cards[0].suit)) return 'same_suit';
    
    // 연속 숫자
    const numbers = cards
      .filter(card => card.number !== undefined)
      .map(card => card.number as number)
      .sort((a, b) => a - b);
    
    if (this.checkForSequence(numbers)) return 'sequence';
    
    // 대칭 패턴 (첫번째와 마지막이 같은 숫자)
    if (cards.length === 3 && cards[0].number === cards[2].number) return 'mirror';
    
    return null;
  }

  /**
   * 진행 상황 분석 (3장 스프레드용)
   */
  private analyzeProgression(cards: [TarotCard, TarotCard, TarotCard]): {
    trend: 'improving' | 'declining' | 'stable' | 'complex';
    energy: 'increasing' | 'decreasing' | 'fluctuating';
  } {
    // 숫자 기반 분석
    const numbers = cards.map(card => card.number || 0);
    
    let trend: 'improving' | 'declining' | 'stable' | 'complex';
    if (numbers[0] < numbers[1] && numbers[1] < numbers[2]) trend = 'improving';
    else if (numbers[0] > numbers[1] && numbers[1] > numbers[2]) trend = 'declining';
    else if (numbers[0] === numbers[1] && numbers[1] === numbers[2]) trend = 'stable';
    else trend = 'complex';
    
    // 에너지 분석 (키워드 기반)
    const energyKeywords = {
      high: ['열정', '행동', '창조', '시작', '에너지'],
      low: ['휴식', '정체', '끝', '완성', '안정']
    };
    
    let energy: 'increasing' | 'decreasing' | 'fluctuating' = 'fluctuating';
    // 구현 생략 - 실제로는 더 복잡한 분석 로직

    return { trend, energy };
  }

  /**
   * 유틸리티 메서드들
   */
  private getSuitCounts(cards: TarotCard[]): Record<string, number> {
    return cards.reduce((acc, card) => {
      acc[card.suit] = (acc[card.suit] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private getConsecutiveNumberBonus(cards: TarotCard[]): number {
    const numbers = cards
      .filter(card => card.number !== undefined)
      .map(card => card.number as number)
      .sort((a, b) => a - b);
    
    return this.checkForSequence(numbers) ? 5 : 0;
  }

  private getSpecialCombinationBonus(cards: TarotCard[]): number {
    let bonus = 0;
    
    // 모든 에이스
    if (cards.every(card => card.number === 1)) bonus += 10;
    
    // 모든 메이저
    if (cards.every(card => card.suit === 'major')) bonus += 8;
    
    // 같은 수트
    if (cards.length > 1 && cards.every(card => card.suit === cards[0].suit)) bonus += 3;
    
    return bonus;
  }

  private checkForSequence(numbers: number[]): boolean {
    if (numbers.length < 2) return false;
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i-1] + 1) return false;
    }
    return true;
  }

  private getSingleCardInterpretation(card: TarotCard, category: Category, position: string): string {
    const interpretation = card.interpretations.upright[category];
    return `${position === 'past' ? '과거에는' : position === 'present' ? '현재' : '미래에는'} ${interpretation}`;
  }

  private generateTwoCardInterpretation(
    card1: TarotCard, 
    card2: TarotCard, 
    elements: any, 
    suits: any, 
    numbers: any, 
    themes: string[], 
    category: Category
  ): string {
    // 실제 구현에서는 더 정교한 자연어 생성 로직
    const baseInterpretation = `${card1.koreanName}과 ${card2.koreanName}의 조합은`;
    
    if (elements.dominant) {
      return `${baseInterpretation} ${elements.dominant} 원소의 에너지가 강하게 나타나며, ${themes.join(', ')} 관련된 상황을 의미합니다.`;
    }
    
    return `${baseInterpretation} ${themes.join(', ')} 에너지의 조화를 나타냅니다.`;
  }

  private generateSpecialInterpretation(pattern: string, category: Category): string {
    const interpretations = {
      'all_aces': '모든 에이스가 나타난 극히 강력한 조합입니다. 모든 영역에서 새로운 시작과 무한한 가능성이 열립니다.',
      'all_major': '메이저 아르카나만으로 구성된 운명적 조합입니다. 인생의 중요한 전환점에 있음을 의미합니다.',
      'same_suit': '같은 수트의 에너지가 집중된 조합입니다. 해당 영역에서 강한 영향력을 보입니다.',
      'sequence': '연속된 숫자의 조합으로 단계적 발전과 성장을 의미합니다.',
      'mirror': '대칭적 구조로 균형과 조화, 또는 반복되는 패턴을 나타냅니다.'
    };
    
    return interpretations[pattern as keyof typeof interpretations] || '특별한 의미를 가진 조합입니다.';
  }

  private generateOverallInterpretation(cards: TarotCard[], progression: any, category: Category): string {
    // 실제로는 더 복잡한 해석 생성 로직
    return `전체적으로 ${progression.trend === 'improving' ? '긍정적인 발전' : '복잡한 변화'}의 흐름을 보이며, ${category} 영역에서 중요한 메시지를 전달합니다.`;
  }

  private generateAdvice(cards: TarotCard[], progression: any, category: Category): string {
    // 카드들의 조언을 종합하여 생성
    const advices = cards.map(card => card.advice.upright.action);
    return `${advices.join(', ')}하는 것이 좋겠습니다.`;
  }
}

// 싱글톤 인스턴스 익스포트
export const combinationEngine = CombinationEngine.getInstance();