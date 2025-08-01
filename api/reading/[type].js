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

  const { type } = req.query;
  const { question, selectedCards } = req.body;

  try {
    // 타로 카드 데이터 (기본 샘플)
    const tarotCards = {
      'the-fool': { name: '바보(The Fool)', meaning: '새로운 시작, 순수함, 자유로운 정신' },
      'the-magician': { name: '마법사(The Magician)', meaning: '의지력, 창조력, 집중력' },
      'the-high-priestess': { name: '여사제(High Priestess)', meaning: '직관, 신비, 내면의 지혜' }
    };

    // 타로 리딩 타입별 처리
    let reading;
    switch (type) {
      case 'single':
        reading = generateSingleCardReading(question, selectedCards, tarotCards);
        break;
      case 'three-card':
        reading = generateThreeCardReading(question, selectedCards, tarotCards);
        break;
      case 'celtic-cross':
        reading = generateCelticCrossReading(question, selectedCards, tarotCards);
        break;
      default:
        res.status(400).json({ error: '지원하지 않는 리딩 타입입니다.' });
        return;
    }

    res.status(200).json({
      success: true,
      type,
      question,
      reading,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Tarot reading error:', error);
    res.status(500).json({ 
      error: '타로 리딩 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
}

function generateSingleCardReading(question, selectedCards, tarotCards) {
  const card = selectedCards[0];
  const cardData = tarotCards[card] || { name: '미지의 카드', meaning: '새로운 발견의 기회' };
  
  return {
    card: cardData,
    interpretation: `질문 "${question}"에 대한 답변입니다. ${cardData.name} 카드는 ${cardData.meaning}을 의미합니다. 이 카드는 현재 상황에서 중요한 통찰을 제공합니다.`,
    advice: '카드의 에너지를 받아들이고 새로운 관점으로 상황을 바라보세요.'
  };
}

function generateThreeCardReading(question, selectedCards, tarotCards) {
  const cards = selectedCards.slice(0, 3).map(cardId => 
    tarotCards[cardId] || { name: '미지의 카드', meaning: '새로운 발견' }
  );
  
  return {
    cards: {
      past: cards[0],
      present: cards[1],
      future: cards[2]
    },
    interpretation: `질문 "${question}"에 대한 3장 카드 리딩입니다. 과거는 ${cards[0]?.name}로 ${cards[0]?.meaning}을 나타냅니다. 현재는 ${cards[1]?.name}로 ${cards[1]?.meaning}의 상황입니다. 미래는 ${cards[2]?.name}로 ${cards[2]?.meaning}의 가능성을 보여줍니다.`,
    advice: '과거의 경험을 바탕으로 현재를 이해하고, 미래를 위한 현명한 선택을 하세요.'
  };
}

function generateCelticCrossReading(question, selectedCards, tarotCards) {
  const cards = selectedCards.slice(0, 10).map(cardId => 
    tarotCards[cardId] || { name: '미지의 카드', meaning: '새로운 발견' }
  );
  
  const positions = [
    '현재 상황', '도전과 기회', '먼 과거', '최근 과거',
    '가능한 미래', '가까운 미래', '당신의 접근법', '외부 영향',
    '희망과 두려움', '최종 결과'
  ];
  
  return {
    cards: cards.map((card, index) => ({
      position: positions[index],
      card: card
    })),
    interpretation: `질문 "${question}"에 대한 켈틱 크로스 리딩입니다. 복잡한 상황의 모든 면을 보여주는 종합적인 해석을 제공합니다.`,
    advice: '각 위치의 카드들이 전하는 메시지를 종합적으로 고려하여 균형잡힌 결정을 내리세요.'
  };
}