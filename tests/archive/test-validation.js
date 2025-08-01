const { TarotReadingService } = require('./dist/services/tarotReading');

async function testValidation() {
  const service = TarotReadingService.getInstance();
  
  console.log('=== 질문 유효성 검증 테스트 ===\n');
  
  // 의미없는 질문들 테스트
  const invalidQuestions = [
    '.',
    '...',
    '123..',
    '가나다라..',
    'test',
    '테스트',
    'aaa',
    'ㅋㅋㅋ',
    '!!!!!',
    '1234567',
    'ㄱㄴㄷㄹ',
    '',
    '  ',
    'aaaaaaa',  // 같은 글자 반복
    '할미ㅏㅣ낭러;미낭ㄹ',  // 무작위 키보드 입력
    'ㅁㄴㅇㄻㄴㅇ',  // 자음만 많이
    '안녕ㅏㅣㅗㅜ하세요',  // 한글+모음 섞임
    ';;;;;;',   // 세미콜론 반복
    ',,,,,,',   // 쉼표 반복
    'ㄱ안ㄴ녕ㄷ',  // 자음-한글-자음 패턴
    'ㅏ안ㅣ녕ㅗ'   // 모음-한글-모음 패턴
  ];
  
  console.log('【무효한 질문들 테스트】');
  for (const question of invalidQuestions) {
    try {
      const result = await service.performSingleCardReading(question);
      console.log(`질문: "${question}"`);
      console.log(`응답: ${result.interpretation.split('\n')[0]}`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
  
  console.log('\n【유효한 질문 테스트】');
  const validQuestion = '새로운 직장에서 성공할 수 있을까요?';
  try {
    const result = await service.performSingleCardReading(validQuestion);
    console.log(`질문: "${validQuestion}"`);
    console.log(`카드 수: ${result.cards.length}`);
    console.log(`응답 시작: ${result.interpretation.substring(0, 100)}...`);
  } catch (error) {
    console.log(`유효한 질문 에러: ${error.message}`);
  }
}

testValidation().catch(console.error);