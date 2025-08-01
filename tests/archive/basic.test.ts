import { cardLoader } from '../utils/cardLoader';
import { combinationEngine } from '../utils/combinationEngine';
import { tarotReading } from '../services/tarotReading';
import { testUtils } from './setup';

describe('타로 카드 앱 기본 기능 테스트', () => {
  beforeAll(async () => {
    await cardLoader.loadAllCards();
  });

  describe('CardLoader', () => {
    test('카드 데이터가 정상적으로 로드되어야 함', () => {
      const stats = cardLoader.getStats();
      expect(stats.totalCards).toBeGreaterThan(0);
      expect(stats.majorArcana).toBeGreaterThan(0);
    });

    test('특정 카드를 ID로 조회할 수 있어야 함', () => {
      const fool = cardLoader.getCardById(0);
      expect(fool).toBeDefined();
      expect(fool?.name).toBe('The Fool');
      expect(fool?.koreanName).toBe('바보');
    });

    test('랜덤 카드 선택이 동작해야 함', () => {
      const randomCard = cardLoader.getRandomCard();
      expect(randomCard).toBeDefined();
      expect(randomCard.id).toBeGreaterThanOrEqual(0);
    });

    test('카드 검색이 동작해야 함', () => {
      const results = cardLoader.searchCards('바보', 'ko');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].koreanName).toContain('바보');
    });
  });

  describe('CombinationEngine', () => {
    test('2카드 조합 해석이 생성되어야 함', async () => {
      const card1 = cardLoader.getCardById(0)!; // The Fool
      const card2 = cardLoader.getCardById(1)!; // The Magician
      
      const interpretation = combinationEngine.interpretTwoCards(card1, card2);
      expect(interpretation).toBeDefined();
      expect(typeof interpretation).toBe('string');
      expect(interpretation.length).toBeGreaterThan(0);
    });

    test('조합 강도가 계산되어야 함', () => {
      const card1 = cardLoader.getCardById(0)!;
      const card2 = cardLoader.getCardById(1)!;
      const cards = [card1, card2];
      
      const strength = combinationEngine.calculateCombinationStrength(cards);
      expect(['weak', 'moderate', 'strong', 'very_strong', 'extremely_strong', 'maximum'])
        .toContain(strength);
    });
  });

  describe('TarotReadingService', () => {
    test('단일 카드 리딩이 수행되어야 함', async () => {
      const reading = await tarotReading.performSingleCardReading('테스트 질문');
      
      expect(reading).toBeDefined();
      expect(reading.question).toBe('테스트 질문');
      expect(reading.cards).toHaveLength(1);
      expect(reading.interpretation).toBeDefined();
    });

    test('3카드 스프레드가 수행되어야 함', async () => {
      const reading = await tarotReading.performThreeCardReading('테스트 질문', 'general');
      
      expect(reading).toBeDefined();
      expect(reading.cards).toHaveLength(3);
      expect(reading.spreadType).toBe('past_present_future');
    });

    test('질문 분석이 동작해야 함', () => {
      const analysis = tarotReading.analyzeQuestion('사랑에 대한 고민이 있어요');
      
      expect(analysis).toBeDefined();
      expect(analysis.suggestedCategory).toBe('love');
      expect(analysis.keywords).toBeInstanceOf(Array);
    });
  });

  describe('에러 처리', () => {
    test('존재하지 않는 카드 ID로 조회 시 undefined 반환', () => {
      const nonExistentCard = cardLoader.getCardById(9999);
      expect(nonExistentCard).toBeUndefined();
    });

    test('빈 질문으로 리딩 시도 시 처리', async () => {
      const reading = await tarotReading.performSingleCardReading('');
      expect(reading).toBeDefined();
      expect(reading.question).toBe('');
    });
  });

  describe('성능 테스트', () => {
    test('대량 카드 선택이 빠르게 수행되어야 함', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        cardLoader.getRandomCard();
      }
      
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeLessThan(1000); // 1초 이내
    });

    test('조합 해석이 빠르게 생성되어야 함', () => {
      const card1 = cardLoader.getCardById(0)!;
      const card2 = cardLoader.getCardById(1)!;
      
      const startTime = Date.now();
      
      for (let i = 0; i < 10; i++) {
        combinationEngine.interpretTwoCards(card1, card2);
      }
      
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeLessThan(500); // 0.5초 이내
    });
  });
});