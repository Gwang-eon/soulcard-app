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
      'the-hierophant': { name: '교황(The Hierophant)', meaning: '전통, 학습, 영적 지도' },
      'the-lovers': { name: '연인(The Lovers)', meaning: '사랑, 선택, 조화' },
      'the-chariot': { name: '전차(The Chariot)', meaning: '의지, 승리, 자제력' },
      'strength': { name: '힘(Strength)', meaning: '용기, 인내, 내적 힘' },
      'the-hermit': { name: '은둔자(The Hermit)', meaning: '성찰, 내적 탐구, 지혜' }
    };

    const cards = selectedCards.slice(0, 10).map(cardId => 
      tarotCards[cardId] || { name: '미지의 카드', meaning: '새로운 발견' }
    );
    
    const positions = [
      '현재 상황', '도전과 기회', '먼 과거', '최근 과거',
      '가능한 미래', '가까운 미래', '당신의 접근법', '외부 영향',
      '희망과 두려움', '최종 결과'
    ];
    
    const reading = {
      cards: cards.map((card, index) => ({
        position: positions[index],
        card: card,
        interpretation: `${positions[index]}에서 ${card.name}는 ${card.meaning}을 의미합니다.`
      })),
      interpretation: `질문 "${question}"에 대한 켈틱 크로스 리딩입니다. 

이 복합적인 스프레드는 상황의 모든 면을 보여주는 종합적인 해석을 제공합니다. 각 위치의 카드들이 서로 어떻게 연결되어 있는지, 그리고 전체적인 에너지의 흐름을 파악하는 것이 중요합니다.

현재 상황과 도전, 과거의 영향과 미래의 가능성, 그리고 당신의 내적 상태와 외부 환경이 모두 이 리딩에 반영되어 있습니다.`,
      advice: '각 위치의 카드들이 전하는 메시지를 종합적으로 고려하여 균형잡힌 결정을 내리세요. 특히 현재 상황과 최종 결과를 연결하는 다른 카드들의 흐름을 주의 깊게 살펴보시기 바랍니다.'
    };

    res.status(200).json({
      success: true,
      type: 'celtic-cross',
      question,
      reading,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Celtic cross reading error:', error);
    res.status(500).json({ 
      error: '켈틱 크로스 리딩 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
}