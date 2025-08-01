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
      'the-high-priestess': { name: '여사제(High Priestess)', meaning: '직관, 신비, 내면의 지혜' },
      'the-empress': { name: '여황제(The Empress)', meaning: '풍요, 창조성, 모성' },
      'the-emperor': { name: '황제(The Emperor)', meaning: '권위, 안정, 질서' },
      'the-hierophant': { name: '교황(The Hierophant)', meaning: '전통, 학습, 영적 지도' }
    };

    const cards = selectedCards.slice(0, 3).map(cardId => 
      tarotCards[cardId] || { name: '미지의 카드', meaning: '새로운 발견' }
    );
    
    const reading = {
      cards: {
        past: cards[0],
        present: cards[1], 
        future: cards[2]
      },
      interpretation: `질문 "${question}"에 대한 3장 카드 리딩입니다. 

과거: ${cards[0]?.name} - ${cards[0]?.meaning}을 나타냅니다. 이는 현재 상황의 근본적인 배경을 보여줍니다.

현재: ${cards[1]?.name} - ${cards[1]?.meaning}의 상황입니다. 지금 이 순간 당신이 마주하고 있는 핵심적인 에너지입니다.

미래: ${cards[2]?.name} - ${cards[2]?.meaning}의 가능성을 보여줍니다. 현재의 선택과 행동에 따라 전개될 수 있는 방향입니다.`,
      advice: '과거의 경험을 바탕으로 현재를 이해하고, 미래를 위한 현명한 선택을 하세요. 각 카드의 메시지를 종합적으로 고려하여 균형잡힌 관점을 유지하시기 바랍니다.'
    };

    res.status(200).json({
      success: true,
      type: 'three-card',
      question,
      reading,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Three card reading error:', error);
    res.status(500).json({ 
      error: '3장 카드 리딩 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
}