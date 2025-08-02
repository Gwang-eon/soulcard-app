const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// 간단한 API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Test server running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🌐 테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});