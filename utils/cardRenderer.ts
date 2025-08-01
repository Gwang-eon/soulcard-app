import { TarotCard, SelectedCard } from '../types/tarot';

/**
 * 카드 렌더링 유틸리티
 * 실제 이미지가 없을 때 텍스트 기반 카드 표시
 */
export class CardRenderer {
  
  /**
   * 단일 카드를 콘솔용 텍스트로 렌더링
   */
  public static renderCardText(selectedCard: SelectedCard): string {
    const { card, isReversed } = selectedCard;
    const orientation = isReversed ? '🔄 역방향' : '⬆️ 정방향';
    
    const cardBox = this.createCardBox(card, isReversed);
    return cardBox;
  }

  /**
   * 여러 카드를 나란히 렌더링
   */
  public static renderCardsInRow(selectedCards: SelectedCard[]): string {
    if (selectedCards.length === 0) return '';
    
    const cardLines = selectedCards.map(selectedCard => {
      const lines = this.createCardBox(selectedCard.card, selectedCard.isReversed).split('\n');
      return lines;
    });
    
    const maxLines = Math.max(...cardLines.map(lines => lines.length));
    const result: string[] = [];
    
    for (let i = 0; i < maxLines; i++) {
      const line = cardLines.map(lines => 
        (lines[i] || '').padEnd(24, ' ')
      ).join('  ');
      result.push(line);
    }
    
    return result.join('\n');
  }

  /**
   * 3카드 스프레드를 위치 라벨과 함께 렌더링
   */
  public static render3CardSpread(
    selectedCards: [SelectedCard, SelectedCard, SelectedCard],
    labels = ['과거', '현재', '미래']
  ): string {
    const labelLine = labels.map(label => label.padEnd(24, ' ')).join('  ');
    const separatorLine = labels.map(() => '─'.repeat(24)).join('  ');
    const cardsDisplay = this.renderCardsInRow(selectedCards);
    
    return `${labelLine}\n${separatorLine}\n${cardsDisplay}`;
  }

  /**
   * 켈틱 크로스 레이아웃 렌더링
   */
  public static renderCelticCross(selectedCards: SelectedCard[]): string {
    if (selectedCards.length !== 10) {
      throw new Error('켈틱 크로스는 정확히 10장의 카드가 필요합니다');
    }

    const positions = [
      '현재상황', '도전과제', '먼과거', '가까운과거',
      '가능한미래', '가까운미래', '당신의접근', '외부영향',
      '희망과두려움', '최종결과'
    ];

    // 켈틱 크로스 레이아웃
    const layout = `
            [6]
             |
    [3] - [1]+[0] - [5]
             |
            [2]

        [7] [8] [9] [4]
    `;

    let result = '🔮 켈틱 크로스 스프레드\n';
    result += '═'.repeat(50) + '\n\n';

    // 중앙 십자가 부분
    const card6 = this.createMiniCard(selectedCards[6]);
    const card3 = this.createMiniCard(selectedCards[3]);
    const card1 = this.createMiniCard(selectedCards[1]);
    const card0 = this.createMiniCard(selectedCards[0]);
    const card5 = this.createMiniCard(selectedCards[5]);
    const card2 = this.createMiniCard(selectedCards[2]);

    result += '        ' + card6 + '\n';
    result += '           │\n';
    result += card3 + '───' + card1 + '+' + card0 + '───' + card5 + '\n';
    result += '           │\n';
    result += '        ' + card2 + '\n\n';

    // 오른쪽 스태프 부분
    const card7 = this.createMiniCard(selectedCards[7]);
    const card8 = this.createMiniCard(selectedCards[8]);
    const card9 = this.createMiniCard(selectedCards[9]);
    const card4 = this.createMiniCard(selectedCards[4]);

    result += '    ' + [card7, card8, card9, card4].join(' ') + '\n\n';

    // 카드 설명
    result += '📋 카드 의미:\n';
    selectedCards.forEach((selectedCard, index) => {
      const orientation = selectedCard.isReversed ? '(역방향)' : '(정방향)';
      result += `${index + 1}. ${positions[index]}: ${selectedCard.card.koreanName} ${orientation}\n`;
    });

    return result;
  }

  /**
   * 관계 스프레드 렌더링 (5카드)
   */
  public static renderRelationshipSpread(selectedCards: SelectedCard[]): string {
    if (selectedCards.length !== 5) {
      throw new Error('관계 스프레드는 정확히 5장의 카드가 필요합니다');
    }

    const positions = ['당신', '상대방', '관계현재', '도전과제', '미래'];
    
    let result = '💕 관계 상담 스프레드\n';
    result += '═'.repeat(40) + '\n\n';

    // 레이아웃: 위에 당신-상대방, 가운데 관계현재, 아래에 도전과제-미래
    const topRow = this.renderCardsInRow([selectedCards[0], selectedCards[1]]);
    const middleCard = this.createCardBox(selectedCards[2].card, selectedCards[2].isReversed);
    const bottomRow = this.renderCardsInRow([selectedCards[3], selectedCards[4]]);

    const topLabels = ['당신', '상대방'].map(label => label.padEnd(24, ' ')).join('  ');
    const bottomLabels = ['도전과제', '미래'].map(label => label.padEnd(24, ' ')).join('  ');

    result += topLabels + '\n';
    result += topRow + '\n\n';
    result += '        관계의 현재\n';
    result += '        ' + middleCard.split('\n').join('\n        ') + '\n\n';
    result += bottomLabels + '\n';
    result += bottomRow + '\n';

    return result;
  }

  /**
   * 기본 카드 박스 생성
   */
  private static createCardBox(card: TarotCard, isReversed: boolean): string {
    const orientation = isReversed ? '🔄' : '⬆️';
    const suitSymbol = this.getSuitSymbol(card.suit);
    const elementSymbol = card.element ? this.getElementSymbol(card.element) : '';
    
    const topLine = '┌' + '─'.repeat(22) + '┐';
    const numberLine = `│ ${card.number || 0}`.padEnd(23, ' ') + '│';
    const nameLine = `│ ${card.koreanName}`.padEnd(23, ' ') + '│';
    const englishLine = `│ ${card.name}`.padEnd(23, ' ') + '│';
    const suitLine = `│ ${suitSymbol}${elementSymbol}`.padEnd(23, ' ') + '│';
    const orientationLine = `│ ${orientation}`.padEnd(23, ' ') + '│';
    const emptyLine = '│' + ' '.repeat(22) + '│';
    const bottomLine = '└' + '─'.repeat(22) + '┘';

    return [
      topLine,
      numberLine,
      nameLine,
      englishLine.length > 25 ? `│ ${card.name.slice(0, 20)}..` + ' │' : englishLine,
      suitLine,
      orientationLine,
      emptyLine,
      bottomLine
    ].join('\n');
  }

  /**
   * 간단한 미니 카드 생성 (켈틱 크로스용)
   */
  private static createMiniCard(selectedCard: SelectedCard): string {
    const { card, isReversed } = selectedCard;
    const orientation = isReversed ? '🔄' : '⬆️';
    const shortName = card.koreanName.length > 6 ? card.koreanName.slice(0, 6) + '..' : card.koreanName;
    return `[${shortName}${orientation}]`;
  }

  /**
   * 수트 심볼 반환
   */
  private static getSuitSymbol(suit: string): string {
    const symbols = {
      'major': '🌟',
      'wands': '🔥',
      'cups': '💧',
      'swords': '⚔️',
      'pentacles': '🪙'
    };
    return symbols[suit as keyof typeof symbols] || '❓';
  }

  /**
   * 원소 심볼 반환
   */
  private static getElementSymbol(element: string): string {
    const symbols = {
      'fire': '🔥',
      'water': '💧',
      'air': '💨',
      'earth': '🌍'
    };
    return symbols[element as keyof typeof symbols] || '';
  }

  /**
   * 모바일 앱용 JSON 렌더링 데이터 생성
   */
  public static createMobileCardData(selectedCard: SelectedCard) {
    const { card, isReversed, position } = selectedCard;
    
    return {
      id: card.id,
      name: card.name,
      koreanName: card.koreanName,
      suit: card.suit,
      number: card.number,
      isReversed,
      position,
      displayInfo: {
        suitSymbol: this.getSuitSymbol(card.suit),
        elementSymbol: card.element ? this.getElementSymbol(card.element) : '',
        orientationSymbol: isReversed ? '🔄' : '⬆️',
        orientationText: isReversed ? '역방향' : '정방향',
        backgroundColor: this.getSuitColor(card.suit),
        textColor: '#FFFFFF'
      },
      // 실제 이미지 URL 대신 폰트 기반 카드 디자인 정보
      cardDesign: {
        type: 'text-based',
        template: 'modern-minimal',
        useSymbols: true,
        showNumber: card.number !== undefined,
        showOrientation: true
      }
    };
  }

  /**
   * 수트별 색상 반환 (모바일 앱용)
   */
  private static getSuitColor(suit: string): string {
    const colors = {
      'major': '#8B5CF6', // 보라색
      'wands': '#EF4444', // 빨간색  
      'cups': '#3B82F6', // 파란색
      'swords': '#6B7280', // 회색
      'pentacles': '#10B981' // 초록색
    };
    return colors[suit as keyof typeof colors] || '#6B7280';
  }
}

// 사용 예시 함수들
export const cardDisplayUtils = {
  /**
   * 콘솔에서 카드 리딩 결과를 예쁘게 출력
   */
  displayReading: (selectedCards: SelectedCard[], title: string) => {
    console.log('\n' + '🔮 ' + title);
    console.log('═'.repeat(50));
    
    if (selectedCards.length === 1) {
      console.log(CardRenderer.renderCardText(selectedCards[0]));
    } else if (selectedCards.length === 3) {
      console.log(CardRenderer.render3CardSpread(selectedCards as [SelectedCard, SelectedCard, SelectedCard]));
    } else if (selectedCards.length === 5) {
      console.log(CardRenderer.renderRelationshipSpread(selectedCards));
    } else if (selectedCards.length === 10) {
      console.log(CardRenderer.renderCelticCross(selectedCards));
    } else {
      console.log(CardRenderer.renderCardsInRow(selectedCards));
    }
    
    console.log('═'.repeat(50) + '\n');
  },

  /**
   * 모바일 앱용 카드 데이터 배열 생성
   */
  createMobileDisplayData: (selectedCards: SelectedCard[]) => {
    return selectedCards.map(card => CardRenderer.createMobileCardData(card));
  }
};