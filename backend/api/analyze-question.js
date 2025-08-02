export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { question } = req.body;

  if (!question || question.trim().length === 0) {
    res.status(400).json({ error: '질문을 입력해주세요.' });
    return;
  }

  try {
    // 질문 분석 로직
    const analysis = analyzeQuestion(question.trim());
    
    res.status(200).json({
      success: true,
      question,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Question analysis error:', error);
    res.status(500).json({ 
      error: '질문 분석 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
}

function analyzeQuestion(question) {
  // 질문 유형 분석
  const questionTypes = {
    love: ['사랑', '연애', '관계', '결혼', '이별', '썸', '남자친구', '여자친구', '짝사랑'],
    career: ['직업', '일', '회사', '취업', '사업', '승진', '이직', '직장', '업무'],
    money: ['돈', '재정', '투자', '경제', '수입', '지출', '대출', '저축'],
    health: ['건강', '몸', '병', '치료', '운동', '다이어트'],
    future: ['미래', '앞으로', '장래', '예정', '계획']
  };

  let detectedType = 'general';
  let confidence = 0;

  for (const [type, keywords] of Object.entries(questionTypes)) {
    const matches = keywords.filter(keyword => question.includes(keyword));
    if (matches.length > confidence) {
      confidence = matches.length;
      detectedType = type;
    }
  }

  // 질문의 구체성 분석
  const specificity = question.length > 20 ? 'high' : question.length > 10 ? 'medium' : 'low';
  
  // 감정 분석 (간단한 키워드 기반)
  const positiveWords = ['좋은', '행복', '성공', '발전', '희망'];
  const negativeWords = ['나쁜', '걱정', '문제', '어려운', '힘든'];
  
  const positiveCount = positiveWords.filter(word => question.includes(word)).length;
  const negativeCount = negativeWords.filter(word => question.includes(word)).length;
  
  let sentiment = 'neutral';
  if (positiveCount > negativeCount) sentiment = 'positive';
  if (negativeCount > positiveCount) sentiment = 'negative';

  // 추천 리딩 타입
  let recommendedReading = 'single';
  if (detectedType === 'love' || specificity === 'high') {
    recommendedReading = 'three-card';
  }
  if (question.includes('복잡') || question.includes('자세히') || specificity === 'high') {
    recommendedReading = 'celtic-cross';
  }

  return {
    type: detectedType,
    typeKorean: {
      love: '연애/관계',
      career: '직업/일',
      money: '금전/재물',
      health: '건강',
      future: '미래',
      general: '일반'
    }[detectedType],
    specificity,
    sentiment,
    recommendedReading,
    recommendedReadingKorean: {
      single: '단일 카드',
      'three-card': '3장 카드 (과거-현재-미래)',
      'celtic-cross': '켈틱 크로스 (종합 분석)'
    }[recommendedReading],
    suggestions: [
      '질문을 더 구체적으로 표현해보세요.',
      '감정보다는 상황에 집중해서 질문해보세요.',
      '예/아니오로 답할 수 있는 질문보다는 열린 질문이 좋습니다.'
    ]
  };
}