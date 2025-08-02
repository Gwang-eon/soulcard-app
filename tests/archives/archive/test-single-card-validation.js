const { TarotReadingService } = require('./dist/services/tarotReading');

async function testSingleCardValidation() {
  const service = TarotReadingService.getInstance();
  
  console.log('=== 단일카드 무의미 질문 테스트 ===\n');
  
  const invalidQuestions = [
    '.',
    'ㅋㅋㅋ',
    '할미ㅏㅣ낭러;미낭ㄹ',
    'test'
  ];
  
  for (const question of invalidQuestions) {
    try {
      const result = await service.performSingleCardReading(question);
      console.log(`질문: "${question}"`);
      console.log(`카드 수: ${result.cards ? result.cards.length : 'undefined'}`);
      console.log(`해석 시작: ${result.interpretation ? result.interpretation.substring(0, 100) : 'undefined'}...`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
}

testSingleCardValidation().catch(console.error);