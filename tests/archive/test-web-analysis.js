// 웹 서버 시뮬레이션 테스트
const express = require('express');
const { TarotReadingService } = require('./dist/services/tarotReading');

const app = express();
app.use(express.json());

const tarotReading = TarotReadingService.getInstance();

// 질문 분석 API 시뮬레이션
app.post('/api/analyze-question', async (req, res) => {
  try {
    const { question } = req.body;
    
    const analysis = tarotReading.analyzeQuestion(question);
    
    // 질문이 유효하지 않은 경우
    if (!analysis.isValid) {
      res.status(400).json({
        error: '유효하지 않은 질문입니다',
        message: analysis.validationMessage,
        isValid: false
      });
      return;
    }
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: '질문 분석 중 오류가 발생했습니다', details: error });
  }
});

const PORT = 3003;
const server = app.listen(PORT, () => {
  console.log(`테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
  runTests();
});

async function runTests() {
  // 잠시 대기
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('\\n=== 웹 API 질문 분석 테스트 ===\\n');
  
  const testQuestions = [
    { question: 'test', expectValid: false },
    { question: 'ㅋㅋㅋ', expectValid: false },
    { question: '할미ㅏㅣ낭러;미낭ㄹ', expectValid: false },
    { question: '새로운 직장에서 성공할 수 있을까요?', expectValid: true },
    { question: '연애운이 어떨까요?', expectValid: true }
  ];
  
  for (const testCase of testQuestions) {
    try {
      // Node.js 내장 http 모듈로 요청
      const http = require('http');
      const postData = JSON.stringify({ question: testCase.question });
      
      const options = {
        hostname: 'localhost',
        port: PORT,
        path: '/api/analyze-question',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            console.log(`질문: "${testCase.question}"`);
            console.log(`상태코드: ${res.statusCode}`);
            console.log(`예상 유효성: ${testCase.expectValid} / 실제: ${result.isValid !== false}`);
            
            if (result.isValid === false) {
              console.log(`에러 메시지: ${result.message}`);
            } else {
              console.log(`추천 카테고리: ${result.suggestedCategory}`);
            }
            console.log('---');
          } catch (e) {
            console.log(`파싱 에러: ${e.message}`);
          }
        });
      });
      
      req.on('error', (e) => {
        console.log(`요청 에러: ${e.message}`);
      });
      
      req.write(postData);
      req.end();
      
      // 다음 요청 전 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`테스트 에러: ${error.message}`);
    }
  }
  
  // 테스트 완료 후 서버 종료
  setTimeout(() => {
    console.log('\\n테스트 완료. 서버를 종료합니다.');
    server.close();
    process.exit(0);
  }, 2000);
}