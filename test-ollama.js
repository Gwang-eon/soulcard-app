// Ollama API 테스트 스크립트

async function testOllama() {
  try {
    console.log('🔍 Ollama API 테스트 시작...');
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.1:latest',
        prompt: '바보 카드가 정방향으로 나왔을 때 간단한 해석을 해주세요.',
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 300
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 응답 성공:');
    console.log('모델:', data.model);
    console.log('응답:', data.response);
    console.log('소요시간:', data.total_duration ? Math.round(data.total_duration / 1000000) + 'ms' : '?');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

testOllama();