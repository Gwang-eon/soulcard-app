const { TarotReadingService } = require('./dist/services/tarotReading');
const { CardRenderer } = require('./dist/utils/cardRenderer');

async function testServerValidation() {
  console.log('=== 서버 응답 구조 테스트 ===\\n');
  
  const tarotReading = TarotReadingService.getInstance();
  
  const invalidQuestions = ['test', 'ㅋㅋㅋ', '할미ㅏㅣ낭러;미낭ㄹ'];
  
  for (const question of invalidQuestions) {
    try {
      const reading = await tarotReading.performSingleCardReading(question);
      
      // 서버 응답 구조 시뮬레이션
      let cardDisplayData = null;
      if (reading.cards && reading.cards.length > 0) {
        cardDisplayData = CardRenderer.createMobileCardData(reading.cards[0]);
      }
      
      const response = {
        ...reading,
        cardDisplay: cardDisplayData,
        createdAt: reading.createdAt.toISOString()
      };
      
      console.log(`질문: "${question}"`);
      console.log(`cardDisplay: ${response.cardDisplay ? '객체 있음' : 'null'}`);
      console.log(`cards.length: ${response.cards ? response.cards.length : 'undefined'}`);
      console.log(`interpretation 시작: ${response.interpretation ? response.interpretation.substring(0, 50) : 'undefined'}...`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
  
  console.log('\\n【유효한 질문 테스트】');
  try {
    const reading = await tarotReading.performSingleCardReading('새로운 직장에서 성공할 수 있을까요?');
    
    let cardDisplayData = null;
    if (reading.cards && reading.cards.length > 0) {
      cardDisplayData = CardRenderer.createMobileCardData(reading.cards[0]);
    }
    
    const response = {
      ...reading,
      cardDisplay: cardDisplayData,
      createdAt: reading.createdAt.toISOString()
    };
    
    console.log(`질문: "새로운 직장에서 성공할 수 있을까요?"`);
    console.log(`cardDisplay: ${response.cardDisplay ? '객체 있음' : 'null'}`);
    console.log(`cards.length: ${response.cards ? response.cards.length : 'undefined'}`);
    console.log(`interpretation 시작: ${response.interpretation ? response.interpretation.substring(0, 50) : 'undefined'}...`);
  } catch (error) {
    console.log(`유효한 질문 에러: ${error.message}`);
  }
}

testServerValidation().catch(console.error);