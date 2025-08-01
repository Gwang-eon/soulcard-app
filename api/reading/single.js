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

  const { question, selectedCards } = req.body;

  try {
    // 타로 카드 데이터 (기본 샘플)
    const tarotCards = {
      'the-fool': { name: '바보(The Fool)', meaning: '새로운 시작, 순수함, 자유로운 정신' },
      'the-magician': { name: '마법사(The Magician)', meaning: '의지력, 창조력, 집중력' },
      'the-high-priestess': { name: '여사제(High Priestess)', meaning: '직관, 신비, 내면의 지혜' }
    };

    const card = selectedCards[0];
    const cardData = tarotCards[card] || { name: '미지의 카드', meaning: '새로운 발견의 기회' };
    
    const reading = {
      card: cardData,
      interpretation: `질문 "${question}"에 대한 답변입니다. ${cardData.name} 카드는 ${cardData.meaning}을 의미합니다. 이 카드는 현재 상황에서 중요한 통찰을 제공합니다.`,
      advice: '카드의 에너지를 받아들이고 새로운 관점으로 상황을 바라보세요.'
    };

    res.status(200).json({
      success: true,
      type: 'single',
      question,
      reading,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Single card reading error:', error);
    res.status(500).json({ 
      error: '단일 카드 리딩 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
}