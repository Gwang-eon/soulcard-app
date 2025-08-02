const express = require('express');
const { TarotReadingService } = require('./dist/services/tarotReading');
const { CardRenderer } = require('./dist/utils/cardRenderer');

const app = express();
app.use(express.json());

// 단일 카드 테스트 엔드포인트
app.post('/test-single', async (req, res) => {
  try {
    const { question, category = 'general' } = req.body;
    const tarotReading = TarotReadingService.getInstance();
    const reading = await tarotReading.performSingleCardReading(question, category);
    
    // 카드 표시 데이터 추가 (카드가 있는 경우만)
    let cardDisplayData = null;
    if (reading.cards && reading.cards.length > 0) {
      cardDisplayData = CardRenderer.createMobileCardData(reading.cards[0]);
    }
    
    res.json({
      ...reading,
      cardDisplay: cardDisplayData,
      createdAt: reading.createdAt.toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: '테스트 실행 중 오류가 발생했습니다', details: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

// 테스트 실행
async function runTests() {
  const fetch = (await import('node-fetch')).default;
  
  console.log('=== 웹 API 무의미 질문 테스트 ===\\n');
  
  const invalidQuestions = [
    '.',
    'ㅋㅋㅋ', 
    '할미ㅏㅣ낭러;미낭ㄹ',
    'test'
  ];
  
  for (const question of invalidQuestions) {
    try {
      const response = await fetch(`http://localhost:${PORT}/test-single`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      
      const result = await response.json();
      console.log(`질문: "${question}"`);
      console.log(`응답 상태: ${response.status}`);
      console.log(`카드 표시: ${result.cardDisplay ? '있음' : '없음'}`);
      console.log(`카드 수: ${result.cards ? result.cards.length : 'undefined'}`);
      console.log(`해석 시작: ${result.interpretation ? result.interpretation.substring(0, 50) : 'undefined'}...`);
      console.log('---');
    } catch (error) {
      console.log(`질문: "${question}" - 에러: ${error.message}`);
    }
  }
  
  // 유효한 질문 테스트
  console.log('\\n【유효한 질문 테스트】');
  try {
    const response = await fetch(`http://localhost:${PORT}/test-single`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: '새로운 직장에서 성공할 수 있을까요?' })
    });
    
    const result = await response.json();
    console.log(`질문: "새로운 직장에서 성공할 수 있을까요?"`);
    console.log(`응답 상태: ${response.status}`);
    console.log(`카드 표시: ${result.cardDisplay ? '있음' : '없음'}`);
    console.log(`카드 수: ${result.cards ? result.cards.length : 'undefined'}`);
    console.log(`해석 시작: ${result.interpretation ? result.interpretation.substring(0, 50) : 'undefined'}...`);
  } catch (error) {
    console.log(`유효한 질문 에러: ${error.message}`);
  }
  
  process.exit(0);
}

// 서버 시작 후 테스트 실행
setTimeout(runTests, 1000);