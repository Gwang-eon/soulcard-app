/**
 * AI Tarot Card App - Main Entry Point
 * 타로 카드 앱의 메인 진입점
 */

// 핵심 모듈 익스포트
export { cardLoader } from '../utils/cardLoader';
export { combinationEngine } from '../utils/combinationEngine';
export { tarotReading } from '../services/tarotReading';

// 타입 정의 익스포트
export * from '../types/tarot';

// 데모 익스포트
export { TarotAppDemo } from '../demo/usage';

/**
 * 앱 초기화 함수
 */
export async function initializeTarotApp(): Promise<void> {
  console.log('🔮 AI Tarot Card App 초기화 중...');
  
  try {
    // 카드 데이터 로드
    const { cardLoader } = await import('../utils/cardLoader');
    await cardLoader.loadAllCards();
    
    const stats = cardLoader.getStats();
    console.log('📊 데이터베이스 로딩 완료:');
    console.log(`   총 카드: ${stats.totalCards}장`);
    console.log(`   완성률: ${stats.completionRate}`);
    console.log('✨ 초기화 완료!\n');
    
  } catch (error) {
    console.error('❌ 초기화 실패:', error);
    throw error;
  }
}

/**
 * 빠른 시작 함수
 */
export async function quickStart(): Promise<void> {
  await initializeTarotApp();
  
  console.log('🎯 빠른 시작 가이드:');
  console.log('1. 단일 카드 리딩: tarotReading.performSingleCardReading(question)'); 
  console.log('2. 3카드 스프레드: tarotReading.performThreeCardReading(question, category)');
  console.log('3. 관계 상담: tarotReading.performRelationshipReading(question)');
  console.log('4. 전체 데모: TarotAppDemo.runAllDemos()');
  console.log('');
  
  // 간단한 예시 실행
  const { tarotReading } = await import('../services/tarotReading');
  const reading = await tarotReading.performSingleCardReading('오늘의 운세는?');
  
  console.log('📋 예시 리딩:');
  console.log(`질문: ${reading.question}`);
  
  // 카드 시각적 표시
  const { cardDisplayUtils } = await import('../utils/cardRenderer');
  cardDisplayUtils.displayReading(reading.cards, '선택된 카드');
  
  console.log(`해석: ${reading.interpretation.split('\n')[0]}...`);
  console.log('');
}

// Node.js에서 직접 실행될 때
if (require.main === module) {
  quickStart().catch(console.error);
}