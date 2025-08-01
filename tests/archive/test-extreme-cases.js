const { TarotReadingService } = require('./dist/services/tarotReading');

async function testExtremeCases() {
  const service = TarotReadingService.getInstance();
  
  console.log('=== 극단적 케이스 테스트 ===\n');
  
  const extremeCases = [
    'ㅗㅜㅏㅣㅗㅜㅏㅣ',  // 모음만
    'ㄱㄴㄷㄹㅁㅂㅅㅇ',  // 자음만
    '12345아67890',      // 숫자+한글 혼합
    'asdfㅁㅈㄷㄱ',       // 영문+자음 혼합
    '안.녕.하.세.요.',    // 과도한 점 사용
    '하나둘셋넷다섯여섯',  // 숫자 나열
    'qwerty키보드',       // 키보드 패턴
    '!!!질문!!!',       // 특수문자 남용
    '아아아아아아아',     // 같은 글자 반복
    'ㅎㅎㅎㅎㅎㅎㅎ',     // 웃음 표현 반복
  ];
  
  console.log('【극단적 무효 케이스】');
  for (const question of extremeCases) {
    try {
      const result = await service.performSingleCardReading(question);
      console.log(`질문: "${question}"`);
      console.log(`응답: ${result.interpretation.split('\\n')[0]}`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
  
  console.log('\\n【경계선 케이스 - 유효해야 하는 것들】');
  const borderlineCases = [
    '사랑할까?',         // 짧지만 의미있는 질문
    '돈 벌 수 있을까요?', // 간단하지만 명확한 질문
    '일이 잘될까',       // 질문형 어미 없지만 의미있는
    '연애는 어떨까요',   // 자연스러운 질문
  ];
  
  for (const question of borderlineCases) {
    try {
      const result = await service.performSingleCardReading(question);
      console.log(`질문: "${question}"`);
      console.log(`카드 수: ${result.cards.length}`);
      console.log(`응답 시작: ${result.interpretation.substring(0, 50)}...`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
}

testExtremeCases().catch(console.error);