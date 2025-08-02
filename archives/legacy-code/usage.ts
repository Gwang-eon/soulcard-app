import { tarotReading } from '../services/tarotReading';
import { cardLoader } from '../utils/cardLoader';
import { combinationEngine } from '../utils/combinationEngine';
import { cardDisplayUtils } from '../utils/cardRenderer';

/**
 * 타로 카드 앱 사용 예시 데모
 */
export class TarotAppDemo {
  
  /**
   * 기본 사용법 데모
   */
  public static async basicUsageDemo() {
    console.log('=== 타로 카드 앱 데모 시작 ===\n');

    try {
      // 1. 단일 카드 리딩
      console.log('1. 단일 카드 리딩');
      console.log('-'.repeat(30));
      
      const singleReading = await tarotReading.performSingleCardReading(
        '오늘 하루는 어떨까요?',
        'general'
      );
      
      console.log(`질문: ${singleReading.question}`);
      
      // 카드 시각적 표시
      cardDisplayUtils.displayReading(singleReading.cards, '선택된 카드');
      
      console.log(`해석:\n${singleReading.interpretation}\n`);

      // 2. 3카드 스프레드 (과거-현재-미래)
      console.log('2. 3카드 스프레드 (과거-현재-미래)');
      console.log('-'.repeat(40));
      
      const threeCardReading = await tarotReading.performThreeCardReading(
        '내 연애운은 어떻게 될까요?',
        'love'
      );
      
      console.log(`질문: ${threeCardReading.question}`);
      
      // 3카드 스프레드 시각적 표시
      cardDisplayUtils.displayReading(threeCardReading.cards, '3카드 스프레드 (과거-현재-미래)');
      
      console.log(`해석:\n${threeCardReading.interpretation}\n`);

      // 3. 관계 상담 스프레드
      console.log('3. 관계 상담 스프레드');
      console.log('-'.repeat(30));
      
      const relationshipReading = await tarotReading.performRelationshipReading(
        '이 사람과의 관계가 앞으로 어떻게 될까요?'
      );
      
      console.log(`질문: ${relationshipReading.question}`);
      
      // 관계 상담 스프레드 시각적 표시
      cardDisplayUtils.displayReading(relationshipReading.cards, '관계 상담 스프레드');
      
      console.log(`해석:\n${relationshipReading.interpretation}\n`);

      // 4. 질문 분석 데모
      console.log('4. 질문 분석 기능');
      console.log('-'.repeat(25));
      
      const questions = [
        '회사에서 승진할 수 있을까요?',
        '새로운 사랑을 만날 수 있을까요?',
        '투자한 주식이 오를까요?',
        '건강이 걱정되는데 괜찮을까요?'
      ];
      
      questions.forEach(question => {
        const analysis = tarotReading.analyzeQuestion(question);
        console.log(`질문: "${question}"`);
        console.log(`  추천 카테고리: ${analysis.suggestedCategory}`);
        console.log(`  추천 스프레드: ${analysis.suggestedSpread}`);
        console.log(`  감정 상태: ${analysis.emotion}`);
        console.log(`  긴급도: ${analysis.urgency}`);
        console.log(`  키워드: ${analysis.keywords.join(', ')}\n`);
      });

      // 5. 카드 조합 분석 데모
      console.log('5. 카드 조합 분석');
      console.log('-'.repeat(25));
      
      await cardLoader.loadAllCards();
      const randomCards = cardLoader.getRandomCards(2);
      
      // 2카드 조합 시각적 표시
      const twoCards = randomCards.slice(0, 2).map((card, index) => ({
        card,
        position: index,
        isReversed: Math.random() < 0.3
      }));
      
      cardDisplayUtils.displayReading(twoCards, '카드 조합 분석');
      
      const combinationInterpretation = combinationEngine.interpretTwoCards(
        randomCards[0]!, 
        randomCards[1]!, 
        'general'
      );
      
      const strength = combinationEngine.calculateCombinationStrength(randomCards);
      
      console.log(`조합 강도: ${strength}`);
      console.log(`해석: ${combinationInterpretation}\n`);

      // 6. 데이터베이스 통계
      console.log('6. 데이터베이스 현황');
      console.log('-'.repeat(30));
      
      const stats = cardLoader.getStats();
      console.log('현재 데이터베이스 상태:');
      Object.entries(stats).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });

    } catch (error) {
      console.error('데모 실행 중 오류 발생:', error);
    }

    console.log('\n=== 데모 완료 ===');
  }

  /**
   * 고급 기능 데모
   */
  public static async advancedFeaturesDemo() {
    console.log('=== 고급 기능 데모 ===\n');

    try {
      await cardLoader.loadAllCards();

      // 1. 특정 카드 검색
      console.log('1. 카드 검색 기능');
      console.log('-'.repeat(25));
      
      const searchResults = cardLoader.searchCards('바보', 'ko');
      console.log(`"바보" 검색 결과: ${searchResults.length}개`);
      searchResults.forEach(card => {
        console.log(`  - ${card.koreanName} (${card.name})`);
      });
      console.log();

      // 2. 수트별 카드 조회
      console.log('2. 수트별 카드 조회');
      console.log('-'.repeat(25));
      
      const majorCards = cardLoader.getMajorArcana();
      const wandsCards = cardLoader.getCardsBySuit('wands');
      
      console.log(`메이저 아르카나: ${majorCards.length}장`);
      console.log(`완드 카드: ${wandsCards.length}장`);
      console.log();

      // 3. 특별한 조합 패턴 테스트
      console.log('3. 특별한 조합 패턴');
      console.log('-'.repeat(30));
      
      // 모든 에이스 조합 시뮬레이션
      const aces = [22, 36, 50, 64]
        .map(id => cardLoader.getCardById(id))
        .filter(card => card !== undefined);
      console.log('모든 에이스 조합:');
      aces.forEach(ace => {
        console.log(`  - ${ace!.koreanName}`);
      });
      
      const acesStrength = combinationEngine.calculateCombinationStrength(aces.slice(0, 3));
      console.log(`조합 강도: ${acesStrength}`);
      console.log();

      // 4. 켈틱 크로스 데모
      console.log('4. 켈틱 크로스 스프레드');
      console.log('-'.repeat(35));
      
      const celticReading = await tarotReading.performCelticCrossReading(
        '내 인생의 전반적인 방향성은?',
        'general'
      );
      
      console.log(`질문: ${celticReading.question}`);
      console.log(`사용된 카드 수: ${celticReading.cards.length}장`);
      // 켈틱 크로스 시각적 표시
      cardDisplayUtils.displayReading(celticReading.cards, '켈틱 크로스 스프레드');
      
    } catch (error) {
      console.error('고급 기능 데모 실행 중 오류:', error);
    }

    console.log('\n=== 고급 기능 데모 완료 ===');
  }

  /**
   * 성능 테스트 데모
   */
  public static async performanceDemo() {
    console.log('=== 성능 테스트 데모 ===\n');

    try {
      // 데이터 로딩 시간 측정
      console.log('1. 데이터 로딩 성능');
      console.log('-'.repeat(30));
      
      const startTime = Date.now();
      await cardLoader.loadAllCards();
      const loadTime = Date.now() - startTime;
      
      console.log(`데이터 로딩 시간: ${loadTime}ms`);
      console.log();

      // 대량 카드 선택 성능
      console.log('2. 대량 카드 선택 성능');
      console.log('-'.repeat(35));
      
      const batchStart = Date.now();
      for (let i = 0; i < 1000; i++) {
        cardLoader.getRandomCard();
      }
      const batchTime = Date.now() - batchStart;
      
      console.log(`1000번 랜덤 카드 선택 시간: ${batchTime}ms`);
      console.log(`평균 선택 시간: ${(batchTime / 1000).toFixed(2)}ms per card`);
      console.log();

      // 조합 해석 성능
      console.log('3. 조합 해석 성능');
      console.log('-'.repeat(30));
      
      const combStart = Date.now();
      for (let i = 0; i < 100; i++) {
        const cards = cardLoader.getRandomCards(2);
        combinationEngine.interpretTwoCards(cards[0], cards[1]);
      }
      const combTime = Date.now() - combStart;
      
      console.log(`100번 2카드 조합 해석 시간: ${combTime}ms`);
      console.log(`평균 해석 시간: ${(combTime / 100).toFixed(2)}ms per combination`);

    } catch (error) {
      console.error('성능 테스트 중 오류:', error);
    }

    console.log('\n=== 성능 테스트 완료 ===');
  }

  /**
   * 전체 데모 실행
   */
  public static async runAllDemos() {
    await this.basicUsageDemo();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await this.advancedFeaturesDemo();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await this.performanceDemo();
  }
}

// 사용법:
// TarotAppDemo.runAllDemos();