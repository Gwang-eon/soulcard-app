const { TarotReadingService } = require('./dist/services/tarotReading');

async function testQuestionAnalysis() {
  console.log('=== 질문 분석 API 테스트 ===\n');
  
  const tarotReading = TarotReadingService.getInstance();
  
  const invalidQuestions = [
    'test',
    'ㅋㅋㅋ', 
    '할미ㅏㅣ낭러;미낭ㄹ',
    '.',
    '123..'
  ];
  
  console.log('【무효한 질문들 테스트】');
  for (const question of invalidQuestions) {
    try {
      const analysis = tarotReading.analyzeQuestion(question);
      console.log(`질문: "${question}"`);
      console.log(`유효성: ${analysis.isValid}`);
      console.log(`메시지: ${analysis.validationMessage || 'none'}`);
      console.log(`카테고리: ${analysis.suggestedCategory}`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
  
  console.log('\n【유효한 질문 테스트】');
  const validQuestions = [
    '새로운 직장에서 성공할 수 있을까요?',
    '연애운이 어떨까요?',
    '돈을 벌 수 있을까?'
  ];
  
  for (const question of validQuestions) {
    try {
      const analysis = tarotReading.analyzeQuestion(question);
      console.log(`질문: "${question}"`);
      console.log(`유효성: ${analysis.isValid}`);
      console.log(`추천 카테고리: ${analysis.suggestedCategory}`);
      console.log(`추천 스프레드: ${analysis.suggestedSpread}`);
      console.log(`키워드: ${analysis.keywords.join(', ')}`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
}

testQuestionAnalysis().catch(console.error);