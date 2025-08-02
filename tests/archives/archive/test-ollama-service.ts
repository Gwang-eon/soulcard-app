// OllamaAI 서비스 직접 테스트
import { ollamaAI } from './services/ollamaAI';

async function testOllamaService() {
  try {
    console.log('🔍 OllamaAI 서비스 테스트 시작...');
    
    const result = await ollamaAI.generateSingleCardInterpretation(
      '바보',
      false,
      '오늘의 운세는?',
      'general',
      '새로운 시작을 의미하는 카드입니다'
    );

    console.log('✅ 해석 생성 성공:');
    console.log('결과 타입:', typeof result);
    console.log('결과 길이:', result?.length);
    console.log('결과 내용:', result?.substring(0, 100));
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }
}

testOllamaService();