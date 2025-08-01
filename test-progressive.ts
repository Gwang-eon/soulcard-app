// 점진적 해석 직접 테스트
import { progressiveReading } from './services/progressiveReading';
import { cardLoader } from './utils/cardLoader';

async function testProgressive() {
  try {
    console.log('🔍 점진적 해석 직접 테스트 시작...');
    
    // 카드 로더 초기화
    await cardLoader.loadAllCards();
    
    // 3장 카드 선택
    const selectedCards = cardLoader.getIntuitiveCards(3, '오늘의 운세는?', 'general');
    const cards = selectedCards.map((card, index) => ({
      card,
      position: index,
      isReversed: Math.random() < 0.25
    }));
    
    console.log('📋 선택된 카드들:', cards.map(c => c.card.koreanName));
    
    // 점진적 해석 시작
    const readingId = await progressiveReading.startProgressiveReading({
      sessionId: 'test_session_123',
      question: '오늘의 운세는?',
      category: 'general',
      spreadType: 'past_present_future',
      cards,
      userId: 'test_user'
    });
    
    console.log('✅ 점진적 해석 시작됨:', readingId);
    
    // 5초 후 상태 확인
    setTimeout(() => {
      const activeReadings = progressiveReading.getActiveReadings();
      console.log('🔄 현재 활성 해석:', activeReadings);
    }, 5000);
    
  } catch (error) {
    console.error('❌ 테스트 실패:', error);
  }
}

testProgressive();