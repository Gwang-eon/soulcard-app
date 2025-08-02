import { TarotCard } from '../components/tarot/TarotCard';

// 메이저 아르카나 22장
export const majorArcana: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'The Fool',
    nameKo: '바보',
    description: 'New beginnings, innocence, spontaneity',
    descriptionKo: '새로운 시작, 순수함, 자발성을 의미하는 카드',
    image: 'images/cards/major-arcana/00-the-fool.webp',
    suit: 'major',
    number: 0,
    keywords: ['new beginnings', 'innocence', 'adventure'],
    keywordsKo: ['새로운 시작', '순수함', '모험'],
    meaning: {
      general: 'New journey ahead',
      love: 'Fresh romance',
      career: 'New opportunities',
      money: 'Financial fresh start',
      health: 'New health routine',
      spiritual: 'Spiritual awakening'
    },
    meaningKo: {
      general: '새로운 여정의 시작',
      love: '새로운 연애의 시작',
      career: '새로운 기회',
      money: '재정적 새 출발',
      health: '새로운 건강 관리',
      spiritual: '영적 각성'
    }
  },
  {
    id: 'the-magician',
    name: 'The Magician',
    nameKo: '마법사',
    description: 'Manifestation, resourcefulness, power',
    descriptionKo: '현실화, 수완, 힘을 의미하는 카드',
    image: 'images/cards/major-arcana/01-the-magician.webp',
    suit: 'major',
    number: 1,
    keywords: ['manifestation', 'willpower', 'desire'],
    keywordsKo: ['현실화', '의지력', '욕망'],
    meaning: {
      general: 'Using your skills',
      love: 'Taking action in love',
      career: 'Professional success',
      money: 'Financial control',
      health: 'Taking charge of health',
      spiritual: 'Spiritual power'
    },
    meaningKo: {
      general: '당신의 능력 활용',
      love: '연애에서의 적극적 행동',
      career: '직업적 성공',
      money: '재정 통제',
      health: '건강 관리 주도',
      spiritual: '영적 힘'
    }
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    nameKo: '여교황',
    description: 'Intuition, sacred knowledge, divine feminine',
    descriptionKo: '직관, 신성한 지식, 신성한 여성성을 의미하는 카드',
    image: 'images/cards/major-arcana/02-the-high-priestess.webp',
    suit: 'major',
    number: 2,
    keywords: ['intuition', 'mystery', 'inner wisdom'],
    keywordsKo: ['직관', '신비', '내면의 지혜'],
    meaning: {
      general: 'Trust your intuition',
      love: 'Hidden feelings revealed',
      career: 'Trust your instincts',
      money: 'Hidden financial matters',
      health: 'Listen to your body',
      spiritual: 'Divine guidance'
    },
    meaningKo: {
      general: '직감을 믿으세요',
      love: '숨겨진 감정이 드러남',
      career: '본능을 믿으세요',
      money: '숨겨진 재정 문제',
      health: '몸의 소리에 귀 기울이기',
      spiritual: '신적 인도'
    }
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    nameKo: '여황제',
    description: 'Femininity, beauty, nature, abundance',
    descriptionKo: '여성성, 아름다움, 자연, 풍요를 의미하는 카드',
    image: 'images/cards/major-arcana/03-the-empress.webp',
    suit: 'major',
    number: 3,
    keywords: ['abundance', 'nature', 'fertility'],
    keywordsKo: ['풍요', '자연', '비옥함'],
    meaning: {
      general: 'Abundance and growth',
      love: 'Nurturing relationship',
      career: 'Creative success',
      money: 'Financial abundance',
      health: 'Fertility and vitality',
      spiritual: 'Earth connection'
    },
    meaningKo: {
      general: '풍요와 성장',
      love: '양육적 관계',
      career: '창조적 성공',
      money: '재정적 풍요',
      health: '생식력과 활력',
      spiritual: '대지와의 연결'
    }
  },
  {
    id: 'the-emperor',
    name: 'The Emperor',
    nameKo: '황제',
    description: 'Authority, structure, control, father figure',
    descriptionKo: '권위, 구조, 통제, 아버지상을 의미하는 카드',
    image: 'images/cards/major-arcana/04-the-emperor.webp',
    suit: 'major',
    number: 4,
    keywords: ['authority', 'structure', 'control'],
    keywordsKo: ['권위', '구조', '통제'],
    meaning: {
      general: 'Taking control',
      love: 'Stable relationship',
      career: 'Leadership role',
      money: 'Financial stability',
      health: 'Disciplined health',
      spiritual: 'Spiritual authority'
    },
    meaningKo: {
      general: '통제권 잡기',
      love: '안정적인 관계',
      career: '리더십 역할',
      money: '재정적 안정',
      health: '규칙적인 건강 관리',
      spiritual: '영적 권위'
    }
  },
  {
    id: 'the-hierophant',
    name: 'The Hierophant',
    nameKo: '교황',
    description: 'Spiritual wisdom, religious beliefs, conformity',
    descriptionKo: '영적 지혜, 종교적 믿음, 순응을 의미하는 카드',
    image: 'images/cards/major-arcana/05-the-hierophant.webp',
    suit: 'major',
    number: 5,
    keywords: ['tradition', 'conformity', 'morality'],
    keywordsKo: ['전통', '순응', '도덕성'],
    meaning: {
      general: 'Following tradition',
      love: 'Conventional relationship',
      career: 'Following rules',
      money: 'Conservative approach',
      health: 'Traditional medicine',
      spiritual: 'Religious guidance'
    },
    meaningKo: {
      general: '전통 따르기',
      love: '전통적인 관계',
      career: '규칙 준수',
      money: '보수적 접근',
      health: '전통 의학',
      spiritual: '종교적 인도'
    }
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    nameKo: '연인들',
    description: 'Love, harmony, relationships, values alignment',
    descriptionKo: '사랑, 조화, 관계, 가치관 일치를 의미하는 카드',
    image: 'images/cards/major-arcana/06-the-lovers.webp',
    suit: 'major',
    number: 6,
    keywords: ['love', 'relationships', 'choices'],
    keywordsKo: ['사랑', '관계', '선택'],
    meaning: {
      general: 'Important choices',
      love: 'Deep connection',
      career: 'Partnership',
      money: 'Shared resources',
      health: 'Harmony and balance',
      spiritual: 'Unity and connection'
    },
    meaningKo: {
      general: '중요한 선택',
      love: '깊은 연결',
      career: '파트너십',
      money: '자원 공유',
      health: '조화와 균형',
      spiritual: '통합과 연결'
    }
  },
  {
    id: 'the-chariot',
    name: 'The Chariot',
    nameKo: '전차',
    description: 'Control, willpower, success, determination',
    descriptionKo: '통제, 의지력, 성공, 결단력을 의미하는 카드',
    image: 'images/cards/major-arcana/07-the-chariot.webp',
    suit: 'major',
    number: 7,
    keywords: ['control', 'willpower', 'success'],
    keywordsKo: ['통제', '의지력', '성공'],
    meaning: {
      general: 'Moving forward',
      love: 'Overcoming obstacles',
      career: 'Victory and success',
      money: 'Financial control',
      health: 'Overcoming illness',
      spiritual: 'Spiritual victory'
    },
    meaningKo: {
      general: '전진하기',
      love: '장애물 극복',
      career: '승리와 성공',
      money: '재정 통제',
      health: '질병 극복',
      spiritual: '영적 승리'
    }
  },
  {
    id: 'strength',
    name: 'Strength',
    nameKo: '힘',
    description: 'Inner strength, courage, patience, control',
    descriptionKo: '내면의 힘, 용기, 인내, 통제를 의미하는 카드',
    image: 'images/cards/major-arcana/08-strength.webp',
    suit: 'major',
    number: 8,
    keywords: ['strength', 'courage', 'patience'],
    keywordsKo: ['힘', '용기', '인내'],
    meaning: {
      general: 'Inner strength',
      love: 'Patience in love',
      career: 'Perseverance',
      money: 'Steady progress',
      health: 'Recovery and healing',
      spiritual: 'Inner power'
    },
    meaningKo: {
      general: '내면의 힘',
      love: '사랑에서의 인내',
      career: '인내심',
      money: '꾸준한 진전',
      health: '회복과 치유',
      spiritual: '내적 힘'
    }
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    nameKo: '은둔자',
    description: 'Soul searching, seeking inner guidance, introspection',
    descriptionKo: '영혼 탐구, 내면의 인도 추구, 성찰을 의미하는 카드',
    image: 'images/cards/major-arcana/09-the-hermit.webp',
    suit: 'major',
    number: 9,
    keywords: ['introspection', 'guidance', 'solitude'],
    keywordsKo: ['성찰', '인도', '고독'],
    meaning: {
      general: 'Soul searching',
      love: 'Time alone needed',
      career: 'Self-reflection',
      money: 'Careful consideration',
      health: 'Rest and recovery',
      spiritual: 'Seeking truth'
    },
    meaningKo: {
      general: '영혼 탐구',
      love: '혼자만의 시간 필요',
      career: '자기 성찰',
      money: '신중한 고려',
      health: '휴식과 회복',
      spiritual: '진리 추구'
    }
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    nameKo: '운명의 바퀴',
    description: 'Good luck, karma, life cycles, destiny',
    descriptionKo: '행운, 카르마, 생명 주기, 운명을 의미하는 카드',
    image: 'images/cards/major-arcana/10-wheel-of-fortune.webp',
    suit: 'major',
    number: 10,
    keywords: ['luck', 'karma', 'destiny'],
    keywordsKo: ['운', '카르마', '운명'],
    meaning: {
      general: 'Change of fortune',
      love: 'Fated encounter',
      career: 'Opportunity knocks',
      money: 'Financial upturn',
      health: 'Turning point',
      spiritual: 'Karmic lesson'
    },
    meaningKo: {
      general: '운명의 변화',
      love: '운명적 만남',
      career: '기회가 찾아옴',
      money: '재정 호전',
      health: '전환점',
      spiritual: '카르마적 교훈'
    }
  },
  {
    id: 'justice',
    name: 'Justice',
    nameKo: '정의',
    description: 'Justice, fairness, truth, cause and effect',
    descriptionKo: '정의, 공정함, 진실, 인과관계를 의미하는 카드',
    image: 'images/cards/major-arcana/11-justice.webp',
    suit: 'major',
    number: 11,
    keywords: ['justice', 'fairness', 'truth'],
    keywordsKo: ['정의', '공정함', '진실'],
    meaning: {
      general: 'Fair outcome',
      love: 'Balanced relationship',
      career: 'Justice prevails',
      money: 'Fair deal',
      health: 'Balance needed',
      spiritual: 'Karmic balance'
    },
    meaningKo: {
      general: '공정한 결과',
      love: '균형잡힌 관계',
      career: '정의가 승리',
      money: '공정한 거래',
      health: '균형 필요',
      spiritual: '카르마적 균형'
    }
  },
  {
    id: 'the-hanged-man',
    name: 'The Hanged Man',
    nameKo: '매달린 남자',
    description: 'Suspension, restriction, letting go',
    descriptionKo: '정지, 제약, 놓아주기를 의미하는 카드',
    image: 'images/cards/major-arcana/12-the-hanged-man.webp',
    suit: 'major',
    number: 12,
    keywords: ['suspension', 'letting go', 'sacrifice'],
    keywordsKo: ['정지', '놓아주기', '희생'],
    meaning: {
      general: 'Letting go',
      love: 'Sacrifice for love',
      career: 'Waiting period',
      money: 'Financial sacrifice',
      health: 'Rest required',
      spiritual: 'Surrender'
    },
    meaningKo: {
      general: '놓아주기',
      love: '사랑을 위한 희생',
      career: '대기 기간',
      money: '재정적 희생',
      health: '휴식 필요',
      spiritual: '항복'
    }
  },
  {
    id: 'death',
    name: 'Death',
    nameKo: '죽음',
    description: 'Endings, beginnings, change, transformation',
    descriptionKo: '끝남, 시작, 변화, 변형을 의미하는 카드',
    image: 'images/cards/major-arcana/13-death.webp',
    suit: 'major',
    number: 13,
    keywords: ['transformation', 'endings', 'change'],
    keywordsKo: ['변형', '끝남', '변화'],
    meaning: {
      general: 'Major transformation',
      love: 'Relationship changes',
      career: 'Career transition',
      money: 'Financial transformation',
      health: 'Health changes',
      spiritual: 'Spiritual rebirth'
    },
    meaningKo: {
      general: '주요 변형',
      love: '관계의 변화',
      career: '직업 전환',
      money: '재정적 변형',
      health: '건강 변화',
      spiritual: '영적 재생'
    }
  },
  {
    id: 'temperance',
    name: 'Temperance',
    nameKo: '절제',
    description: 'Balance, moderation, patience, purpose',
    descriptionKo: '균형, 절제, 인내, 목적을 의미하는 카드',
    image: 'images/cards/major-arcana/14-temperance.webp',
    suit: 'major',
    number: 14,
    keywords: ['balance', 'moderation', 'patience'],
    keywordsKo: ['균형', '절제', '인내'],
    meaning: {
      general: 'Finding balance',
      love: 'Harmonious relationship',
      career: 'Balanced approach',
      money: 'Moderate spending',
      health: 'Balanced lifestyle',
      spiritual: 'Spiritual harmony'
    },
    meaningKo: {
      general: '균형 찾기',
      love: '조화로운 관계',
      career: '균형잡힌 접근',
      money: '적당한 소비',
      health: '균형잡힌 생활',
      spiritual: '영적 조화'
    }
  },
  {
    id: 'the-devil',
    name: 'The Devil',
    nameKo: '악마',
    description: 'Bondage, addiction, sexuality, materialism',
    descriptionKo: '속박, 중독, 성적 욕망, 물질주의를 의미하는 카드',
    image: 'images/cards/major-arcana/15-the-devil.webp',
    suit: 'major',
    number: 15,
    keywords: ['bondage', 'addiction', 'materialism'],
    keywordsKo: ['속박', '중독', '물질주의'],
    meaning: {
      general: 'Breaking free from chains',
      love: 'Unhealthy attachment',
      career: 'Feeling trapped',
      money: 'Material obsession',
      health: 'Breaking bad habits',
      spiritual: 'Spiritual bondage'
    },
    meaningKo: {
      general: '사슬로부터 해방',
      love: '건강하지 못한 애착',
      career: '갇힌 느낌',
      money: '물질적 강박',
      health: '나쁜 습관 끊기',
      spiritual: '영적 속박'
    }
  },
  {
    id: 'the-tower',
    name: 'The Tower',
    nameKo: '탑',
    description: 'Sudden change, upheaval, chaos, revelation',
    descriptionKo: '급격한 변화, 격변, 혼돈, 계시를 의미하는 카드',
    image: 'images/cards/major-arcana/16-the-tower.webp',
    suit: 'major',
    number: 16,
    keywords: ['sudden change', 'upheaval', 'revelation'],
    keywordsKo: ['급격한 변화', '격변', '계시'],
    meaning: {
      general: 'Sudden upheaval',
      love: 'Relationship shock',
      career: 'Sudden change',
      money: 'Financial loss',
      health: 'Health crisis',
      spiritual: 'Spiritual awakening'
    },
    meaningKo: {
      general: '갑작스런 격변',
      love: '관계의 충격',
      career: '급작스런 변화',
      money: '재정적 손실',
      health: '건강 위기',
      spiritual: '영적 각성'
    }
  },
  {
    id: 'the-star',
    name: 'The Star',
    nameKo: '별',
    description: 'Hope, faith, purpose, renewal, spirituality',
    descriptionKo: '희망, 신앙, 목적, 새로움, 영성을 의미하는 카드',
    image: 'images/cards/major-arcana/17-the-star.webp',
    suit: 'major',
    number: 17,
    keywords: ['hope', 'faith', 'renewal'],
    keywordsKo: ['희망', '신앙', '새로움'],
    meaning: {
      general: 'Hope and healing',
      love: 'Renewed faith in love',
      career: 'New opportunities',
      money: 'Financial recovery',
      health: 'Healing and recovery',
      spiritual: 'Spiritual guidance'
    },
    meaningKo: {
      general: '희망과 치유',
      love: '사랑에 대한 새로운 믿음',
      career: '새로운 기회',
      money: '재정 회복',
      health: '치유와 회복',
      spiritual: '영적 인도'
    }
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    nameKo: '달',
    description: 'Illusion, fear, anxiety, subconscious, intuition',
    descriptionKo: '환상, 두려움, 불안, 무의식, 직관을 의미하는 카드',
    image: 'images/cards/major-arcana/18-the-moon.webp',
    suit: 'major',
    number: 18,
    keywords: ['illusion', 'fear', 'intuition'],
    keywordsKo: ['환상', '두려움', '직관'],
    meaning: {
      general: 'Facing fears',
      love: 'Confusion in love',
      career: 'Unclear situation',
      money: 'Financial confusion',
      health: 'Hidden health issues',
      spiritual: 'Spiritual confusion'
    },
    meaningKo: {
      general: '두려움에 직면',
      love: '사랑의 혼란',
      career: '불분명한 상황',
      money: '재정적 혼란',
      health: '숨겨진 건강 문제',
      spiritual: '영적 혼란'
    }
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    nameKo: '태양',
    description: 'Positivity, fun, warmth, success, vitality',
    descriptionKo: '긍정성, 즐거움, 따뜻함, 성공, 활력을 의미하는 카드',
    image: 'images/cards/major-arcana/19-the-sun.webp',
    suit: 'major',
    number: 19,
    keywords: ['positivity', 'success', 'vitality'],
    keywordsKo: ['긍정성', '성공', '활력'],
    meaning: {
      general: 'Joy and success',
      love: 'Happy relationship',
      career: 'Success and recognition',
      money: 'Financial success',
      health: 'Vitality and energy',
      spiritual: 'Spiritual joy'
    },
    meaningKo: {
      general: '기쁨과 성공',
      love: '행복한 관계',
      career: '성공과 인정',
      money: '재정적 성공',
      health: '활력과 에너지',
      spiritual: '영적 기쁨'
    }
  },
  {
    id: 'judgement',
    name: 'Judgement',
    nameKo: '심판',
    description: 'Judgement, rebirth, inner calling, absolution',
    descriptionKo: '심판, 재생, 내적 부름, 사면을 의미하는 카드',
    image: 'images/cards/major-arcana/20-judgement.webp',
    suit: 'major',
    number: 20,
    keywords: ['judgement', 'rebirth', 'calling'],
    keywordsKo: ['심판', '재생', '부름'],
    meaning: {
      general: 'Second chance',
      love: 'Relationship renewal',
      career: 'New calling',
      money: 'Financial fresh start',
      health: 'Recovery',
      spiritual: 'Spiritual awakening'
    },
    meaningKo: {
      general: '두 번째 기회',
      love: '관계의 새로운 시작',
      career: '새로운 소명',
      money: '재정적 새 출발',
      health: '회복',
      spiritual: '영적 각성'
    }
  },
  {
    id: 'the-world',
    name: 'The World',
    nameKo: '세계',
    description: 'Completion, integration, accomplishment, travel',
    descriptionKo: '완성, 통합, 성취, 여행을 의미하는 카드',
    image: 'images/cards/major-arcana/21-the-world.webp',
    suit: 'major',
    number: 21,
    keywords: ['completion', 'accomplishment', 'travel'],
    keywordsKo: ['완성', '성취', '여행'],
    meaning: {
      general: 'Achievement and completion',
      love: 'Fulfilled relationship',
      career: 'Goal achievement',
      money: 'Financial success',
      health: 'Perfect health',
      spiritual: 'Spiritual fulfillment'
    },
    meaningKo: {
      general: '성취와 완성',
      love: '충만한 관계',
      career: '목표 달성',
      money: '재정적 성공',
      health: '완벽한 건강',
      spiritual: '영적 충족'
    }
  }
];

// 컵스 수트 (Cups) 14장
export const cups: TarotCard[] = [
  {
    id: 'ace-of-cups',
    name: 'Ace of Cups',
    nameKo: '컵의 에이스',
    description: 'New relationships, compassion, creativity',
    descriptionKo: '새로운 관계, 연민, 창조성을 의미하는 카드',
    image: 'images/cards/cups/ace-of-cups.webp',
    suit: 'cups',
    number: 1,
    keywords: ['new love', 'compassion', 'creativity'],
    keywordsKo: ['새로운 사랑', '연민', '창조성'],
    meaning: {
      general: 'New emotional beginning',
      love: 'New love or deepening relationship',
      career: 'Creative opportunities',
      money: 'Emotional investment',
      health: 'Emotional healing',
      spiritual: 'Spiritual love'
    },
    meaningKo: {
      general: '새로운 감정적 시작',
      love: '새로운 사랑 또는 관계 심화',
      career: '창조적 기회',
      money: '감정적 투자',
      health: '감정적 치유',
      spiritual: '영적 사랑'
    }
  },
  {
    id: 'two-of-cups',
    name: 'Two of Cups',
    nameKo: '컵의 2',
    description: 'Unified love, partnership, mutual attraction',
    descriptionKo: '통합된 사랑, 파트너십, 상호 매력을 의미하는 카드',
    image: 'images/cards/cups/two-of-cups.webp',
    suit: 'cups',
    number: 2,
    keywords: ['partnership', 'love', 'harmony'],
    keywordsKo: ['파트너십', '사랑', '조화'],
    meaning: {
      general: 'Partnership and unity',
      love: 'Mutual love and attraction',
      career: 'Successful partnership',
      money: 'Shared resources',
      health: 'Emotional balance',
      spiritual: 'Soul connection'
    },
    meaningKo: {
      general: '파트너십과 통합',
      love: '상호 사랑과 매력',
      career: '성공적인 파트너십',
      money: '자원 공유',
      health: '감정적 균형',
      spiritual: '영혼의 연결'
    }
  },
  {
    id: 'three-of-cups',
    name: 'Three of Cups',
    nameKo: '컵의 3',
    description: 'Celebration, friendship, creativity, community',
    descriptionKo: '축하, 우정, 창조성, 공동체를 의미하는 카드',
    image: 'images/cards/cups/three-of-cups.webp',
    suit: 'cups',
    number: 3,
    keywords: ['celebration', 'friendship', 'community'],
    keywordsKo: ['축하', '우정', '공동체'],
    meaning: {
      general: 'Celebration and friendship',
      love: 'Happy social life',
      career: 'Team success',
      money: 'Shared prosperity',
      health: 'Social support for health',
      spiritual: 'Spiritual community'
    },
    meaningKo: {
      general: '축하와 우정',
      love: '행복한 사회생활',
      career: '팀의 성공',
      money: '공유된 번영',
      health: '건강을 위한 사회적 지원',
      spiritual: '영적 공동체'
    }
  },
  {
    id: 'four-of-cups',
    name: 'Four of Cups',
    nameKo: '컵의 4',
    description: 'Meditation, contemplation, apathy, reevaluation',
    descriptionKo: '명상, 숙고, 무관심, 재평가를 의미하는 카드',
    image: 'images/cards/cups/four-of-cups.webp',
    suit: 'cups',
    number: 4,
    keywords: ['contemplation', 'apathy', 'reevaluation'],
    keywordsKo: ['숙고', '무관심', '재평가'],
    meaning: {
      general: 'Contemplation and withdrawal',
      love: 'Relationship apathy',
      career: 'Career dissatisfaction',
      money: 'Financial complacency',
      health: 'Mental stagnation',
      spiritual: 'Spiritual searching'
    },
    meaningKo: {
      general: '숙고와 철수',
      love: '관계에 대한 무관심',
      career: '직업에 대한 불만',
      money: '재정적 안주',
      health: '정신적 침체',
      spiritual: '영적 탐구'
    }
  },
  {
    id: 'five-of-cups',
    name: 'Five of Cups',
    nameKo: '컵의 5',
    description: 'Regret, failure, disappointment, pessimism',
    descriptionKo: '후회, 실패, 실망, 비관주의를 의미하는 카드',
    image: 'images/cards/cups/five-of-cups.webp',
    suit: 'cups',
    number: 5,
    keywords: ['regret', 'disappointment', 'loss'],
    keywordsKo: ['후회', '실망', '상실'],
    meaning: {
      general: 'Loss and disappointment',
      love: 'Relationship grief',
      career: 'Professional setback',
      money: 'Financial loss',
      health: 'Emotional depression',
      spiritual: 'Spiritual crisis'
    },
    meaningKo: {
      general: '상실과 실망',
      love: '관계의 슬픔',
      career: '직업적 좌절',
      money: '재정적 손실',
      health: '감정적 우울',
      spiritual: '영적 위기'
    }
  },
  {
    id: 'six-of-cups',
    name: 'Six of Cups',
    nameKo: '컵의 6',
    description: 'Revisiting the past, childhood memories, innocence',
    descriptionKo: '과거 재방문, 어린 시절 추억, 순수함을 의미하는 카드',
    image: 'images/cards/cups/six-of-cups.webp',
    suit: 'cups',
    number: 6,
    keywords: ['nostalgia', 'childhood', 'innocence'],
    keywordsKo: ['향수', '어린 시절', '순수함'],
    meaning: {
      general: 'Nostalgia and childhood',
      love: 'Past love returning',
      career: 'Return to familiar work',
      money: 'Financial security from past',
      health: 'Childhood patterns',
      spiritual: 'Innocent faith'
    },
    meaningKo: {
      general: '향수와 어린 시절',
      love: '과거 사랑의 재회',
      career: '익숙한 일로의 복귀',
      money: '과거로부터의 재정적 안정',
      health: '어린 시절 패턴',
      spiritual: '순수한 믿음'
    }
  },
  {
    id: 'seven-of-cups',
    name: 'Seven of Cups',
    nameKo: '컵의 7',
    description: 'Opportunities, choices, wishful thinking, illusion',
    descriptionKo: '기회, 선택, 희망적 사고, 환상을 의미하는 카드',
    image: 'images/cards/cups/seven-of-cups.webp',
    suit: 'cups',
    number: 7,
    keywords: ['choices', 'illusion', 'fantasy'],
    keywordsKo: ['선택', '환상', '판타지'],
    meaning: {
      general: 'Too many options',
      love: 'Romantic fantasies',
      career: 'Career confusion',
      money: 'Unrealistic financial goals',
      health: 'Confusion about health',
      spiritual: 'Spiritual delusion'
    },
    meaningKo: {
      general: '너무 많은 선택',
      love: '로맨틱한 환상',
      career: '직업에 대한 혼란',
      money: '비현실적인 재정 목표',
      health: '건강에 대한 혼란',
      spiritual: '영적 착각'
    }
  },
  {
    id: 'eight-of-cups',
    name: 'Eight of Cups',
    nameKo: '컵의 8',
    description: 'Disappointment, abandonment, withdrawal, escapism',
    descriptionKo: '실망, 포기, 철수, 도피주의를 의미하는 카드',
    image: 'images/cards/cups/eight-of-cups.webp',
    suit: 'cups',
    number: 8,
    keywords: ['abandonment', 'withdrawal', 'escapism'],
    keywordsKo: ['포기', '철수', '도피주의'],
    meaning: {
      general: 'Walking away',
      love: 'Leaving relationship',
      career: 'Job abandonment',
      money: 'Financial withdrawal',
      health: 'Seeking alternative healing',
      spiritual: 'Spiritual journey'
    },
    meaningKo: {
      general: '떠나가기',
      love: '관계 떠나기',
      career: '직장 포기',
      money: '재정적 철수',
      health: '대안적 치유 추구',
      spiritual: '영적 여행'
    }
  },
  {
    id: 'nine-of-cups',
    name: 'Nine of Cups',
    nameKo: '컵의 9',
    description: 'Contentment, satisfaction, gratitude, wish fulfillment',
    descriptionKo: '만족, 충족, 감사, 소원 성취를 의미하는 카드',
    image: 'images/cards/cups/nine-of-cups.webp',
    suit: 'cups',
    number: 9,
    keywords: ['satisfaction', 'wish fulfillment', 'contentment'],
    keywordsKo: ['만족', '소원 성취', '만족감'],
    meaning: {
      general: 'Wish fulfillment',
      love: 'Emotional satisfaction',
      career: 'Professional contentment',
      money: 'Financial abundance',
      health: 'Good health',
      spiritual: 'Spiritual satisfaction'
    },
    meaningKo: {
      general: '소원 성취',
      love: '감정적 만족',
      career: '직업적 만족',
      money: '재정적 풍요',
      health: '좋은 건강',
      spiritual: '영적 만족'
    }
  },
  {
    id: 'ten-of-cups',
    name: 'Ten of Cups',
    nameKo: '컵의 10',
    description: 'Harmony, happy family, emotional fulfillment',
    descriptionKo: '조화, 행복한 가족, 감정적 충족을 의미하는 카드',
    image: 'images/cards/cups/ten-of-cups.webp',
    suit: 'cups',
    number: 10,
    keywords: ['happiness', 'family', 'emotional fulfillment'],
    keywordsKo: ['행복', '가족', '감정적 충족'],
    meaning: {
      general: 'Happy family life',
      love: 'Long-term happiness',
      career: 'Work-life balance',
      money: 'Family financial security',
      health: 'Family health',
      spiritual: 'Spiritual family'
    },
    meaningKo: {
      general: '행복한 가족 생활',
      love: '장기적 행복',
      career: '일과 삶의 균형',
      money: '가족 재정 안정',
      health: '가족 건강',
      spiritual: '영적 가족'
    }
  },
  {
    id: 'page-of-cups',
    name: 'Page of Cups',
    nameKo: '컵의 시종',
    description: 'Creative opportunities, intuitive messages, curiosity',
    descriptionKo: '창조적 기회, 직관적 메시지, 호기심을 의미하는 카드',
    image: 'images/cards/cups/page-of-cups.webp',
    suit: 'cups',
    keywords: ['creativity', 'intuition', 'curiosity'],
    keywordsKo: ['창조성', '직관', '호기심'],
    meaning: {
      general: 'Creative beginnings',
      love: 'Young love',
      career: 'Creative opportunities',
      money: 'Intuitive investments',
      health: 'Intuitive healing',
      spiritual: 'Spiritual messages'
    },
    meaningKo: {
      general: '창조적 시작',
      love: '어린 사랑',
      career: '창조적 기회',
      money: '직관적 투자',
      health: '직관적 치유',
      spiritual: '영적 메시지'
    }
  },
  {
    id: 'knight-of-cups',
    name: 'Knight of Cups',
    nameKo: '컵의 기사',
    description: 'Romance, charm, knight in shining armor',
    descriptionKo: '로맨스, 매력, 빛나는 갑옷의 기사를 의미하는 카드',
    image: 'images/cards/cups/knight-of-cups.webp',
    suit: 'cups',
    keywords: ['romance', 'charm', 'idealism'],
    keywordsKo: ['로맨스', '매력', '이상주의'],
    meaning: {
      general: 'Romantic pursuit',
      love: 'Romantic proposal',
      career: 'Following your passion',
      money: 'Emotional spending',
      health: 'Emotional approach to health',
      spiritual: 'Spiritual quest'
    },
    meaningKo: {
      general: '로맨틱한 추구',
      love: '로맨틱한 프로포즈',
      career: '열정 따르기',
      money: '감정적 소비',
      health: '건강에 대한 감정적 접근',
      spiritual: '영적 탐구'
    }
  },
  {
    id: 'queen-of-cups',
    name: 'Queen of Cups',
    nameKo: '컵의 여왕',
    description: 'Compassionate, caring, emotionally stable, intuitive',
    descriptionKo: '자비로운, 돌보는, 감정적으로 안정된, 직관적인 카드',
    image: 'images/cards/cups/queen-of-cups.webp',
    suit: 'cups',
    keywords: ['compassion', 'intuition', 'emotional security'],
    keywordsKo: ['자비', '직관', '감정적 안정'],
    meaning: {
      general: 'Emotional maturity',
      love: 'Nurturing relationship',
      career: 'Caring profession',
      money: 'Financial intuition',
      health: 'Emotional healing',
      spiritual: 'Spiritual nurturing'
    },
    meaningKo: {
      general: '감정적 성숙',
      love: '양육적 관계',
      career: '돌봄 직업',
      money: '재정적 직관',
      health: '감정적 치유',
      spiritual: '영적 양육'
    }
  },
  {
    id: 'king-of-cups',
    name: 'King of Cups',
    nameKo: '컵의 왕',
    description: 'Emotional balance, compassion, diplomacy',
    descriptionKo: '감정적 균형, 자비, 외교술을 의미하는 카드',
    image: 'images/cards/cups/king-of-cups.webp',
    suit: 'cups',
    keywords: ['emotional balance', 'compassion', 'diplomacy'],
    keywordsKo: ['감정적 균형', '자비', '외교술'],
    meaning: {
      general: 'Emotional mastery',
      love: 'Mature love',
      career: 'Leadership with heart',
      money: 'Wise financial decisions',
      health: 'Emotional well-being',
      spiritual: 'Spiritual wisdom'
    },
    meaningKo: {
      general: '감정적 숙련',
      love: '성숙한 사랑',
      career: '마음이 있는 리더십',
      money: '현명한 재정 결정',
      health: '감정적 웰빙',
      spiritual: '영적 지혜'
    }
  }
];

// 완드 수트 (Wands) 14장
export const wands: TarotCard[] = [
  {
    id: 'ace-of-wands',
    name: 'Ace of Wands',
    nameKo: '완드의 에이스',
    description: 'Inspiration, creative spark, new initiative',
    descriptionKo: '영감, 창조적 불꽃, 새로운 주도권을 의미하는 카드',
    image: 'images/cards/wands/ace-of-wands.webp',
    suit: 'wands',
    number: 1,
    keywords: ['inspiration', 'new beginnings', 'creative energy'],
    keywordsKo: ['영감', '새로운 시작', '창조적 에너지'],
    meaning: {
      general: 'New creative project',
      love: 'Passionate new relationship',
      career: 'New job opportunity',
      money: 'New income source',
      health: 'Renewed energy',
      spiritual: 'Spiritual inspiration'
    },
    meaningKo: {
      general: '새로운 창조적 프로젝트',
      love: '열정적인 새 관계',
      career: '새로운 직업 기회',
      money: '새로운 수입원',
      health: '새로운 에너지',
      spiritual: '영적 영감'
    }
  },
  {
    id: 'two-of-wands',
    name: 'Two of Wands',
    nameKo: '완드의 2',
    description: 'Future planning, making decisions, leaving comfort zone',
    descriptionKo: '미래 계획, 결정 내리기, 안전지대 떠나기를 의미하는 카드',
    image: 'images/cards/wands/two-of-wands.webp',
    suit: 'wands',
    number: 2,
    keywords: ['planning', 'decisions', 'future'],
    keywordsKo: ['계획', '결정', '미래'],
    meaning: {
      general: 'Future planning',
      love: 'Relationship decisions',
      career: 'Career planning',
      money: 'Financial planning',
      health: 'Health planning',
      spiritual: 'Spiritual path planning'
    },
    meaningKo: {
      general: '미래 계획',
      love: '관계 결정',
      career: '직업 계획',
      money: '재정 계획',
      health: '건강 계획',
      spiritual: '영적 길 계획'
    }
  },
  {
    id: 'three-of-wands',
    name: 'Three of Wands',
    nameKo: '완드의 3',
    description: 'Expansion, foresight, overseas opportunities',
    descriptionKo: '확장, 선견지명, 해외 기회를 의미하는 카드',
    image: 'images/cards/wands/three-of-wands.webp',
    suit: 'wands',
    number: 3,
    keywords: ['expansion', 'foresight', 'opportunities'],
    keywordsKo: ['확장', '선견지명', '기회'],
    meaning: {
      general: 'Expansion and growth',
      love: 'Long-distance relationship',
      career: 'Business expansion',
      money: 'Investment opportunities',
      health: 'Expanding health horizons',
      spiritual: 'Spiritual expansion'
    },
    meaningKo: {
      general: '확장과 성장',
      love: '장거리 연애',
      career: '사업 확장',
      money: '투자 기회',
      health: '건강 지평 확장',
      spiritual: '영적 확장'
    }
  },
  {
    id: 'four-of-wands',
    name: 'Four of Wands',
    nameKo: '완드의 4',
    description: 'Celebration, harmony, home, marriage',
    descriptionKo: '축하, 조화, 가정, 결혼을 의미하는 카드',
    image: 'images/cards/wands/four-of-wands.webp',
    suit: 'wands',
    number: 4,
    keywords: ['celebration', 'harmony', 'home'],
    keywordsKo: ['축하', '조화', '가정'],
    meaning: {
      general: 'Celebration and harmony',
      love: 'Marriage or commitment',
      career: 'Work celebration',
      money: 'Financial stability',
      health: 'Health celebration',
      spiritual: 'Spiritual harmony'
    },
    meaningKo: {
      general: '축하와 조화',
      love: '결혼 또는 약속',
      career: '직장 축하',
      money: '재정적 안정',
      health: '건강 축하',
      spiritual: '영적 조화'
    }
  },
  {
    id: 'five-of-wands',
    name: 'Five of Wands',
    nameKo: '완드의 5',
    description: 'Conflict, disagreements, competition, tension',
    descriptionKo: '갈등, 의견 불일치, 경쟁, 긴장을 의미하는 카드',
    image: 'images/cards/wands/five-of-wands.webp',
    suit: 'wands',
    number: 5,
    keywords: ['conflict', 'competition', 'tension'],
    keywordsKo: ['갈등', '경쟁', '긴장'],
    meaning: {
      general: 'Conflict and competition',
      love: 'Relationship tensions',
      career: 'Workplace competition',
      money: 'Financial disputes',
      health: 'Health conflicts',
      spiritual: 'Spiritual struggles'
    },
    meaningKo: {
      general: '갈등과 경쟁',
      love: '관계의 긴장',
      career: '직장 경쟁',
      money: '재정적 분쟁',
      health: '건강 갈등',
      spiritual: '영적 투쟁'
    }
  },
  {
    id: 'six-of-wands',
    name: 'Six of Wands',
    nameKo: '완드의 6',
    description: 'Success, public recognition, progress, self-confidence',
    descriptionKo: '성공, 대중적 인정, 진전, 자신감을 의미하는 카드',
    image: 'images/cards/wands/six-of-wands.webp',
    suit: 'wands',
    number: 6,
    keywords: ['success', 'recognition', 'confidence'],
    keywordsKo: ['성공', '인정', '자신감'],
    meaning: {
      general: 'Success and recognition',
      love: 'Relationship success',
      career: 'Professional recognition',
      money: 'Financial success',
      health: 'Health improvement',
      spiritual: 'Spiritual achievement'
    },
    meaningKo: {
      general: '성공과 인정',
      love: '관계의 성공',
      career: '직업적 인정',
      money: '재정적 성공',
      health: '건강 개선',
      spiritual: '영적 성취'
    }
  },
  {
    id: 'seven-of-wands',
    name: 'Seven of Wands',
    nameKo: '완드의 7',
    description: 'Challenge, competition, protection, perseverance',
    descriptionKo: '도전, 경쟁, 보호, 인내를 의미하는 카드',
    image: 'images/cards/wands/seven-of-wands.webp',
    suit: 'wands',
    number: 7,
    keywords: ['challenge', 'protection', 'perseverance'],
    keywordsKo: ['도전', '보호', '인내'],
    meaning: {
      general: 'Standing your ground',
      love: 'Defending relationship',
      career: 'Competitive pressure',
      money: 'Financial defense',
      health: 'Health challenges',
      spiritual: 'Spiritual defense'
    },
    meaningKo: {
      general: '자신의 입장 고수',
      love: '관계 수호',
      career: '경쟁적 압력',
      money: '재정적 방어',
      health: '건강 도전',
      spiritual: '영적 방어'
    }
  },
  {
    id: 'eight-of-wands',
    name: 'Eight of Wands',
    nameKo: '완드의 8',
    description: 'Swiftness, speed, progress, action',
    descriptionKo: '신속함, 속도, 진전, 행동을 의미하는 카드',
    image: 'images/cards/wands/eight-of-wands.webp',
    suit: 'wands',
    number: 8,
    keywords: ['speed', 'action', 'progress'],
    keywordsKo: ['속도', '행동', '진전'],
    meaning: {
      general: 'Rapid progress',
      love: 'Fast-moving relationship',
      career: 'Quick developments',
      money: 'Fast financial changes',
      health: 'Quick recovery',
      spiritual: 'Rapid spiritual growth'
    },
    meaningKo: {
      general: '빠른 진전',
      love: '빠르게 발전하는 관계',
      career: '빠른 발전',
      money: '빠른 재정 변화',
      health: '빠른 회복',
      spiritual: '빠른 영적 성장'
    }
  },
  {
    id: 'nine-of-wands',
    name: 'Nine of Wands',
    nameKo: '완드의 9',
    description: 'Resilience, courage, persistence, test of faith',
    descriptionKo: '회복력, 용기, 끈기, 믿음의 시험을 의미하는 카드',
    image: 'images/cards/wands/nine-of-wands.webp',
    suit: 'wands',
    number: 9,
    keywords: ['resilience', 'persistence', 'courage'],
    keywordsKo: ['회복력', '끈기', '용기'],
    meaning: {
      general: 'Final push needed',
      love: 'Relationship endurance',
      career: 'Career persistence',
      money: 'Financial endurance',
      health: 'Health recovery',
      spiritual: 'Spiritual endurance'
    },
    meaningKo: {
      general: '마지막 힘이 필요',
      love: '관계의 인내',
      career: '직업적 끈기',
      money: '재정적 인내',
      health: '건강 회복',
      spiritual: '영적 인내'
    }
  },
  {
    id: 'ten-of-wands',
    name: 'Ten of Wands',
    nameKo: '완드의 10',
    description: 'Burden, extra responsibility, hard work, achievement',
    descriptionKo: '부담, 추가 책임, 힘든 일, 성취를 의미하는 카드',
    image: 'images/cards/wands/ten-of-wands.webp',
    suit: 'wands',
    number: 10,
    keywords: ['burden', 'responsibility', 'hard work'],
    keywordsKo: ['부담', '책임', '힘든 일'],
    meaning: {
      general: 'Heavy burden',
      love: 'Relationship responsibilities',
      career: 'Work overload',
      money: 'Financial burdens',
      health: 'Health stress',
      spiritual: 'Spiritual burdens'
    },
    meaningKo: {
      general: '무거운 부담',
      love: '관계의 책임',
      career: '업무 과부하',
      money: '재정적 부담',
      health: '건강 스트레스',
      spiritual: '영적 부담'
    }
  },
  {
    id: 'page-of-wands',
    name: 'Page of Wands',
    nameKo: '완드의 시종',
    description: 'Enthusiasm, exploration, discovery, free spirit',
    descriptionKo: '열정, 탐험, 발견, 자유로운 영혼을 의미하는 카드',
    image: 'images/cards/wands/page-of-wands.webp',
    suit: 'wands',
    keywords: ['enthusiasm', 'exploration', 'discovery'],
    keywordsKo: ['열정', '탐험', '발견'],
    meaning: {
      general: 'New adventures',
      love: 'Passionate beginning',
      career: 'New creative projects',
      money: 'New financial ventures',
      health: 'Health exploration',
      spiritual: 'Spiritual exploration'
    },
    meaningKo: {
      general: '새로운 모험',
      love: '열정적인 시작',
      career: '새로운 창조적 프로젝트',
      money: '새로운 재정적 모험',
      health: '건강 탐험',
      spiritual: '영적 탐험'
    }
  },
  {
    id: 'knight-of-wands',
    name: 'Knight of Wands',
    nameKo: '완드의 기사',
    description: 'Action, impulsiveness, adventure, energy',
    descriptionKo: '행동, 충동성, 모험, 에너지를 의미하는 카드',
    image: 'images/cards/wands/knight-of-wands.webp',
    suit: 'wands',
    keywords: ['action', 'adventure', 'impulsiveness'],
    keywordsKo: ['행동', '모험', '충동성'],
    meaning: {
      general: 'Impulsive action',
      love: 'Passionate pursuit',
      career: 'Career changes',
      money: 'Risky investments',
      health: 'Active lifestyle',
      spiritual: 'Spiritual adventure'
    },
    meaningKo: {
      general: '충동적 행동',
      love: '열정적 추구',
      career: '직업 변화',
      money: '위험한 투자',
      health: '활동적 생활',
      spiritual: '영적 모험'
    }
  },
  {
    id: 'queen-of-wands',
    name: 'Queen of Wands',
    nameKo: '완드의 여왕',
    description: 'Confidence, courage, independence, social butterfly',
    descriptionKo: '자신감, 용기, 독립성, 사교적을 의미하는 카드',
    image: 'images/cards/wands/queen-of-wands.webp',
    suit: 'wands',
    keywords: ['confidence', 'independence', 'social'],
    keywordsKo: ['자신감', '독립성', '사교적'],
    meaning: {
      general: 'Confident leadership',
      love: 'Independent in love',
      career: 'Leadership position',
      money: 'Financial independence',
      health: 'Confident about health',
      spiritual: 'Spiritual confidence'
    },
    meaningKo: {
      general: '자신 있는 리더십',
      love: '사랑에서의 독립성',
      career: '리더십 위치',
      money: '재정적 독립',
      health: '건강에 대한 자신감',
      spiritual: '영적 자신감'
    }
  },
  {
    id: 'king-of-wands',
    name: 'King of Wands',
    nameKo: '완드의 왕',
    description: 'Leadership, vision, honor, big picture',
    descriptionKo: '리더십, 비전, 명예, 큰 그림을 의미하는 카드',
    image: 'images/cards/wands/king-of-wands.webp',
    suit: 'wands',
    keywords: ['leadership', 'vision', 'honor'],
    keywordsKo: ['리더십', '비전', '명예'],
    meaning: {
      general: 'Visionary leadership',
      love: 'Passionate leadership',
      career: 'Executive position',
      money: 'Financial leadership',
      health: 'Health leadership',
      spiritual: 'Spiritual leadership'
    },
    meaningKo: {
      general: '비전 있는 리더십',
      love: '열정적 리더십',
      career: '임원직',
      money: '재정적 리더십',
      health: '건강 리더십',
      spiritual: '영적 리더십'
    }
  }
];

// 검 수트 (Swords) 14장
export const swords: TarotCard[] = [
  {
    id: 'ace-of-swords',
    name: 'Ace of Swords',
    nameKo: '검의 에이스',
    description: 'Breakthroughs, new ideas, mental clarity, communication',
    descriptionKo: '돌파구, 새로운 아이디어, 정신적 명료함, 소통을 의미하는 카드',
    image: 'images/cards/swords/ace-of-swords.webp',
    suit: 'swords',
    number: 1,
    keywords: ['breakthrough', 'clarity', 'new ideas'],
    keywordsKo: ['돌파구', '명료함', '새로운 아이디어'],
    meaning: {
      general: 'Mental breakthrough',
      love: 'Clear communication',
      career: 'New ideas at work',
      money: 'Financial clarity',
      health: 'Mental clarity',
      spiritual: 'Spiritual breakthrough'
    },
    meaningKo: {
      general: '정신적 돌파구',
      love: '명확한 소통',
      career: '직장에서의 새로운 아이디어',
      money: '재정적 명료함',
      health: '정신적 명료함',
      spiritual: '영적 돌파구'
    }
  },
  {
    id: 'two-of-swords',
    name: 'Two of Swords',
    nameKo: '검의 2',
    description: 'Difficult decisions, weighing options, indecision',
    descriptionKo: '어려운 결정, 선택지 저울질, 우유부단을 의미하는 카드',
    image: 'images/cards/swords/two-of-swords.webp',
    suit: 'swords',
    number: 2,
    keywords: ['indecision', 'difficult choices', 'stalemate'],
    keywordsKo: ['우유부단', '어려운 선택', '교착상태'],
    meaning: {
      general: 'Difficult decision',
      love: 'Relationship choice',
      career: 'Career crossroads',
      money: 'Financial decision',
      health: 'Health choice',
      spiritual: 'Spiritual dilemma'
    },
    meaningKo: {
      general: '어려운 결정',
      love: '관계의 선택',
      career: '직업의 갈림길',
      money: '재정적 결정',
      health: '건강 선택',
      spiritual: '영적 딜레마'
    }
  },
  {
    id: 'three-of-swords',
    name: 'Three of Swords',
    nameKo: '검의 3',
    description: 'Heartbreak, emotional pain, sorrow, grief',
    descriptionKo: '마음의 상처, 감정적 고통, 슬픔, 비탄을 의미하는 카드',
    image: 'images/cards/swords/three-of-swords.webp',
    suit: 'swords',
    number: 3,
    keywords: ['heartbreak', 'sorrow', 'emotional pain'],
    keywordsKo: ['마음의 상처', '슬픔', '감정적 고통'],
    meaning: {
      general: 'Emotional pain',
      love: 'Heartbreak',
      career: 'Work disappointment',
      money: 'Financial loss',
      health: 'Emotional health issues',
      spiritual: 'Spiritual sorrow'
    },
    meaningKo: {
      general: '감정적 고통',
      love: '마음의 상처',
      career: '직장에서의 실망',
      money: '재정적 손실',
      health: '감정적 건강 문제',
      spiritual: '영적 슬픔'
    }
  },
  {
    id: 'four-of-swords',
    name: 'Four of Swords',
    nameKo: '검의 4',
    description: 'Rest, relaxation, meditation, contemplation',
    descriptionKo: '휴식, 이완, 명상, 숙고를 의미하는 카드',
    image: 'images/cards/swords/four-of-swords.webp',
    suit: 'swords',
    number: 4,
    keywords: ['rest', 'meditation', 'contemplation'],
    keywordsKo: ['휴식', '명상', '숙고'],
    meaning: {
      general: 'Need for rest',
      love: 'Relationship break',
      career: 'Work pause',
      money: 'Financial rest',
      health: 'Health recovery',
      spiritual: 'Spiritual rest'
    },
    meaningKo: {
      general: '휴식의 필요',
      love: '관계의 휴식',
      career: '업무 중단',
      money: '재정적 휴식',
      health: '건강 회복',
      spiritual: '영적 휴식'
    }
  },
  {
    id: 'five-of-swords',
    name: 'Five of Swords',
    nameKo: '검의 5',
    description: 'Conflict, defeat, winning at all costs, betrayal',
    descriptionKo: '갈등, 패배, 어떤 댓가든 치르고 승리, 배신을 의미하는 카드',
    image: 'images/cards/swords/five-of-swords.webp',
    suit: 'swords',
    number: 5,
    keywords: ['conflict', 'defeat', 'betrayal'],
    keywordsKo: ['갈등', '패배', '배신'],
    meaning: {
      general: 'Hollow victory',
      love: 'Relationship conflict',
      career: 'Workplace betrayal',
      money: 'Financial conflict',
      health: 'Health battles',
      spiritual: 'Spiritual conflict'
    },
    meaningKo: {
      general: '공허한 승리',
      love: '관계의 갈등',
      career: '직장에서의 배신',
      money: '재정적 갈등',
      health: '건강 투쟁',
      spiritual: '영적 갈등'
    }
  },
  {
    id: 'six-of-swords',
    name: 'Six of Swords',
    nameKo: '검의 6',
    description: 'Transition, change, rite of passage, releasing baggage',
    descriptionKo: '전환, 변화, 통과의례, 짐 내려놓기를 의미하는 카드',
    image: 'images/cards/swords/six-of-swords.webp',
    suit: 'swords',
    number: 6,
    keywords: ['transition', 'change', 'moving on'],
    keywordsKo: ['전환', '변화', '나아가기'],
    meaning: {
      general: 'Moving towards calmer waters',
      love: 'Relationship transition',
      career: 'Career change',
      money: 'Financial transition',
      health: 'Health improvement',
      spiritual: 'Spiritual journey'
    },
    meaningKo: {
      general: '더 평온한 곳으로의 이동',
      love: '관계의 전환',
      career: '직업 변화',
      money: '재정적 전환',
      health: '건강 개선',
      spiritual: '영적 여행'
    }
  },
  {
    id: 'seven-of-swords',
    name: 'Seven of Swords',
    nameKo: '검의 7',
    description: 'Deception, betrayal, getting away with something',
    descriptionKo: '속임수, 배신, 무언가를 빠져나가기를 의미하는 카드',
    image: 'images/cards/swords/seven-of-swords.webp',
    suit: 'swords',
    number: 7,
    keywords: ['deception', 'betrayal', 'stealth'],
    keywordsKo: ['속임수', '배신', '은밀함'],
    meaning: {
      general: 'Deception or theft',
      love: 'Dishonesty in relationship',
      career: 'Workplace deception',
      money: 'Financial deception',
      health: 'Hidden health issues',
      spiritual: 'Spiritual deception'
    },
    meaningKo: {
      general: '속임수나 도둑질',
      love: '관계에서의 부정직',
      career: '직장에서의 속임수',
      money: '재정적 속임수',
      health: '숨겨진 건강 문제',
      spiritual: '영적 속임수'
    }
  },
  {
    id: 'eight-of-swords',
    name: 'Eight of Swords',
    nameKo: '검의 8',
    description: 'Restriction, limitation, feeling trapped',
    descriptionKo: '제한, 한계, 갇힌 느낌을 의미하는 카드',
    image: 'images/cards/swords/eight-of-swords.webp',
    suit: 'swords',
    number: 8,
    keywords: ['restriction', 'feeling trapped', 'limitation'],
    keywordsKo: ['제한', '갇힌 느낌', '한계'],
    meaning: {
      general: 'Feeling trapped',
      love: 'Restricted in love',
      career: 'Career limitations',
      money: 'Financial restrictions',
      health: 'Health limitations',
      spiritual: 'Spiritual restriction'
    },
    meaningKo: {
      general: '갇힌 느낌',
      love: '사랑에서의 제약',
      career: '직업적 한계',
      money: '재정적 제약',
      health: '건강 제한',
      spiritual: '영적 제약'
    }
  },
  {
    id: 'nine-of-swords',
    name: 'Nine of Swords',
    nameKo: '검의 9',
    description: 'Anxiety, worry, fear, depression, nightmares',
    descriptionKo: '불안, 걱정, 두려움, 우울, 악몽을 의미하는 카드',
    image: 'images/cards/swords/nine-of-swords.webp',
    suit: 'swords',
    number: 9,
    keywords: ['anxiety', 'worry', 'nightmares'],
    keywordsKo: ['불안', '걱정', '악몽'],
    meaning: {
      general: 'Mental anguish',
      love: 'Relationship anxiety',
      career: 'Work stress',
      money: 'Financial worry',
      health: 'Health anxiety',
      spiritual: 'Spiritual crisis'
    },
    meaningKo: {
      general: '정신적 고뇌',
      love: '관계 불안',
      career: '업무 스트레스',
      money: '재정적 걱정',
      health: '건강 불안',
      spiritual: '영적 위기'
    }
  },
  {
    id: 'ten-of-swords',
    name: 'Ten of Swords',
    nameKo: '검의 10',
    description: 'Painful endings, deep wounds, betrayal, loss',
    descriptionKo: '고통스런 끝, 깊은 상처, 배신, 상실을 의미하는 카드',
    image: 'images/cards/swords/ten-of-swords.webp',
    suit: 'swords',
    number: 10,
    keywords: ['painful ending', 'betrayal', 'rock bottom'],
    keywordsKo: ['고통스런 끝', '배신', '바닥'],
    meaning: {
      general: 'Rock bottom',
      love: 'Relationship ending',
      career: 'Career ending',
      money: 'Financial ruin',
      health: 'Health crisis',
      spiritual: 'Spiritual death'
    },
    meaningKo: {
      general: '밑바닥',
      love: '관계의 끝',
      career: '직업의 끝',
      money: '재정 파탄',
      health: '건강 위기',
      spiritual: '영적 죽음'
    }
  },
  {
    id: 'page-of-swords',
    name: 'Page of Swords',
    nameKo: '검의 시종',
    description: 'Curiosity, restlessness, mental energy, vigilance',
    descriptionKo: '호기심, 불안정, 정신적 에너지, 경계를 의미하는 카드',
    image: 'images/cards/swords/page-of-swords.webp',
    suit: 'swords',
    keywords: ['curiosity', 'mental energy', 'vigilance'],
    keywordsKo: ['호기심', '정신적 에너지', '경계'],
    meaning: {
      general: 'Mental curiosity',
      love: 'Curious about love',
      career: 'Learning new skills',
      money: 'Financial learning',
      health: 'Health curiosity',
      spiritual: 'Spiritual questioning'
    },
    meaningKo: {
      general: '정신적 호기심',
      love: '사랑에 대한 호기심',
      career: '새로운 기술 학습',
      money: '재정적 학습',
      health: '건강 호기심',
      spiritual: '영적 질문'
    }
  },
  {
    id: 'knight-of-swords',
    name: 'Knight of Swords',
    nameKo: '검의 기사',
    description: 'Ambitious, action-oriented, driven to succeed',
    descriptionKo: '야심찬, 행동 지향적, 성공에 대한 의지를 의미하는 카드',
    image: 'images/cards/swords/knight-of-swords.webp',
    suit: 'swords',
    keywords: ['ambition', 'action', 'driven'],
    keywordsKo: ['야심', '행동', '의지'],
    meaning: {
      general: 'Ambitious action',
      love: 'Pursuing love aggressively',
      career: 'Career ambition',
      money: 'Financial ambition',
      health: 'Health action',
      spiritual: 'Spiritual drive'
    },
    meaningKo: {
      general: '야심찬 행동',
      love: '적극적인 사랑 추구',
      career: '직업적 야심',
      money: '재정적 야심',
      health: '건강 행동',
      spiritual: '영적 추진력'
    }
  },
  {
    id: 'queen-of-swords',
    name: 'Queen of Swords',
    nameKo: '검의 여왕',
    description: 'Independent, unbiased judgement, clear boundaries',
    descriptionKo: '독립적, 편견 없는 판단, 명확한 경계를 의미하는 카드',
    image: 'images/cards/swords/queen-of-swords.webp',
    suit: 'swords',
    keywords: ['independence', 'clear thinking', 'boundaries'],
    keywordsKo: ['독립성', '명확한 사고', '경계'],
    meaning: {
      general: 'Clear thinking',
      love: 'Independent in love',
      career: 'Professional boundaries',
      money: 'Financial independence',
      health: 'Health boundaries',
      spiritual: 'Spiritual clarity'
    },
    meaningKo: {
      general: '명확한 사고',
      love: '사랑에서의 독립성',
      career: '직업적 경계',
      money: '재정적 독립',
      health: '건강 경계',
      spiritual: '영적 명료함'
    }
  },
  {
    id: 'king-of-swords',
    name: 'King of Swords',
    nameKo: '검의 왕',
    description: 'Mental clarity, intellectual power, authority',
    descriptionKo: '정신적 명료함, 지적 힘, 권위를 의미하는 카드',
    image: 'images/cards/swords/king-of-swords.webp',
    suit: 'swords',
    keywords: ['mental clarity', 'authority', 'intellectual power'],
    keywordsKo: ['정신적 명료함', '권위', '지적 힘'],
    meaning: {
      general: 'Mental mastery',
      love: 'Intellectual connection',
      career: 'Leadership with logic',
      money: 'Financial wisdom',
      health: 'Mental health',
      spiritual: 'Spiritual wisdom'
    },
    meaningKo: {
      general: '정신적 숙련',
      love: '지적 연결',
      career: '논리적 리더십',
      money: '재정적 지혜',
      health: '정신 건강',
      spiritual: '영적 지혜'
    }
  }
];

// 펜타클 수트 (Pentacles) 14장
export const pentacles: TarotCard[] = [
  {
    id: 'ace-of-pentacles',
    name: 'Ace of Pentacles',
    nameKo: '펜타클의 에이스',
    description: 'Manifestation, new financial opportunity, abundance',
    descriptionKo: '현실화, 새로운 재정 기회, 풍요를 의미하는 카드',
    image: 'images/cards/pentacles/ace-of-pentacles.webp',
    suit: 'pentacles',
    number: 1,
    keywords: ['manifestation', 'opportunity', 'abundance'],
    keywordsKo: ['현실화', '기회', '풍요'],
    meaning: {
      general: 'New opportunity',
      love: 'Solid relationship foundation',
      career: 'New job opportunity',
      money: 'Financial opportunity',
      health: 'Good health foundation',
      spiritual: 'Material spiritual growth'
    },
    meaningKo: {
      general: '새로운 기회',
      love: '견고한 관계 기반',
      career: '새로운 직업 기회',
      money: '재정적 기회',
      health: '좋은 건강 기반',
      spiritual: '물질적 영적 성장'
    }
  },
  {
    id: 'two-of-pentacles',
    name: 'Two of Pentacles',
    nameKo: '펜타클의 2',
    description: 'Multiple priorities, time management, flexibility',
    descriptionKo: '다중 우선순위, 시간 관리, 유연성을 의미하는 카드',
    image: 'images/cards/pentacles/two-of-pentacles.webp',
    suit: 'pentacles',
    number: 2,
    keywords: ['balance', 'flexibility', 'multiple priorities'],
    keywordsKo: ['균형', '유연성', '다중 우선순위'],
    meaning: {
      general: 'Juggling priorities',
      love: 'Balancing relationship needs',
      career: 'Work-life balance',
      money: 'Financial juggling',
      health: 'Health balance',
      spiritual: 'Spiritual balance'
    },
    meaningKo: {
      general: '우선순위 저글링',
      love: '관계 필요의 균형',
      career: '일과 삶의 균형',
      money: '재정적 저글링',
      health: '건강 균형',
      spiritual: '영적 균형'
    }
  },
  {
    id: 'three-of-pentacles',
    name: 'Three of Pentacles',
    nameKo: '펜타클의 3',
    description: 'Teamwork, collaboration, learning, implementation',
    descriptionKo: '팀워크, 협력, 학습, 실행을 의미하는 카드',
    image: 'images/cards/pentacles/three-of-pentacles.webp',
    suit: 'pentacles',
    number: 3,
    keywords: ['teamwork', 'collaboration', 'learning'],
    keywordsKo: ['팀워크', '협력', '학습'],
    meaning: {
      general: 'Collaboration success',
      love: 'Relationship teamwork',
      career: 'Team projects',
      money: 'Financial collaboration',
      health: 'Health team support',
      spiritual: 'Spiritual community'
    },
    meaningKo: {
      general: '협력의 성공',
      love: '관계 팀워크',
      career: '팀 프로젝트',
      money: '재정적 협력',
      health: '건강 팀 지원',
      spiritual: '영적 공동체'
    }
  },
  {
    id: 'four-of-pentacles',
    name: 'Four of Pentacles',
    nameKo: '펜타클의 4',
    description: 'Conservatism, holding on, control, greed',
    descriptionKo: '보수주의, 붙잡기, 통제, 탐욕을 의미하는 카드',
    image: 'images/cards/pentacles/four-of-pentacles.webp',
    suit: 'pentacles',
    number: 4,
    keywords: ['conservatism', 'control', 'holding on'],
    keywordsKo: ['보수주의', '통제', '붙잡기'],
    meaning: {
      general: 'Holding on tightly',
      love: 'Possessive in love',
      career: 'Job security focus',
      money: 'Financial hoarding',
      health: 'Health anxiety',
      spiritual: 'Spiritual materialism'
    },
    meaningKo: {
      general: '꽉 붙잡기',
      love: '사랑에서의 소유욕',
      career: '직업 안정성 중시',
      money: '재정적 저축',
      health: '건강 불안',
      spiritual: '영적 물질주의'
    }
  },
  {
    id: 'five-of-pentacles',
    name: 'Five of Pentacles',
    nameKo: '펜타클의 5',
    description: 'Financial insecurity, poverty, isolation, unemployment',
    descriptionKo: '재정적 불안정, 빈곤, 고립, 실업을 의미하는 카드',
    image: 'images/cards/pentacles/five-of-pentacles.webp',
    suit: 'pentacles',
    number: 5,
    keywords: ['financial hardship', 'isolation', 'unemployment'],
    keywordsKo: ['재정적 어려움', '고립', '실업'],
    meaning: {
      general: 'Financial hardship',
      love: 'Feeling left out in love',
      career: 'Job loss or insecurity',
      money: 'Financial crisis',
      health: 'Health poverty',
      spiritual: 'Spiritual poverty'
    },
    meaningKo: {
      general: '재정적 어려움',
      love: '사랑에서 소외감',
      career: '실직 또는 불안정',
      money: '재정 위기',
      health: '건강 빈곤',
      spiritual: '영적 빈곤'
    }
  },
  {
    id: 'six-of-pentacles',
    name: 'Six of Pentacles',
    nameKo: '펜타클의 6',
    description: 'Generosity, charity, giving, sharing resources',
    descriptionKo: '관대함, 자선, 주기, 자원 공유를 의미하는 카드',
    image: 'images/cards/pentacles/six-of-pentacles.webp',
    suit: 'pentacles',
    number: 6,
    keywords: ['generosity', 'charity', 'sharing'],
    keywordsKo: ['관대함', '자선', '공유'],
    meaning: {
      general: 'Giving and receiving',
      love: 'Generous in love',
      career: 'Career mentoring',
      money: 'Financial generosity',
      health: 'Health sharing',
      spiritual: 'Spiritual giving'
    },
    meaningKo: {
      general: '주고받기',
      love: '사랑에서의 관대함',
      career: '직업 멘토링',
      money: '재정적 관대함',
      health: '건강 나누기',
      spiritual: '영적 베풂'
    }
  },
  {
    id: 'seven-of-pentacles',
    name: 'Seven of Pentacles',
    nameKo: '펜타클의 7',
    description: 'Assessment, hard work, perseverance, investment',
    descriptionKo: '평가, 힘든 일, 인내, 투자를 의미하는 카드',
    image: 'images/cards/pentacles/seven-of-pentacles.webp',
    suit: 'pentacles',
    number: 7,
    keywords: ['assessment', 'perseverance', 'investment'],
    keywordsKo: ['평가', '인내', '투자'],
    meaning: {
      general: 'Assessing progress',
      love: 'Relationship evaluation',
      career: 'Career assessment',
      money: 'Investment review',
      health: 'Health evaluation',
      spiritual: 'Spiritual progress check'
    },
    meaningKo: {
      general: '진전 평가',
      love: '관계 평가',
      career: '직업 평가',
      money: '투자 검토',
      health: '건강 평가',
      spiritual: '영적 진전 확인'
    }
  },
  {
    id: 'eight-of-pentacles',
    name: 'Eight of Pentacles',
    nameKo: '펜타클의 8',
    description: 'Skill development, quality, craftsmanship, concentration',
    descriptionKo: '기술 개발, 품질, 장인정신, 집중을 의미하는 카드',
    image: 'images/cards/pentacles/eight-of-pentacles.webp',
    suit: 'pentacles',
    number: 8,
    keywords: ['skill development', 'craftsmanship', 'concentration'],
    keywordsKo: ['기술 개발', '장인정신', '집중'],
    meaning: {
      general: 'Skill development',
      love: 'Working on relationship',
      career: 'Skill improvement',
      money: 'Financial skills',
      health: 'Health improvement',
      spiritual: 'Spiritual practice'
    },
    meaningKo: {
      general: '기술 개발',
      love: '관계 개선 작업',
      career: '기술 향상',
      money: '재정적 기술',
      health: '건강 개선',
      spiritual: '영적 수행'
    }
  },
  {
    id: 'nine-of-pentacles',
    name: 'Nine of Pentacles',
    nameKo: '펜타클의 9',
    description: 'Abundance, luxury, self-reliance, financial independence',
    descriptionKo: '풍요, 사치, 자립, 재정적 독립을 의미하는 카드',
    image: 'images/cards/pentacles/nine-of-pentacles.webp',
    suit: 'pentacles',
    number: 9,
    keywords: ['abundance', 'luxury', 'self-reliance'],
    keywordsKo: ['풍요', '사치', '자립'],
    meaning: {
      general: 'Material success',
      love: 'Independent in love',
      career: 'Professional success',
      money: 'Financial independence',
      health: 'Health abundance',
      spiritual: 'Spiritual abundance'
    },
    meaningKo: {
      general: '물질적 성공',
      love: '사랑에서의 독립',
      career: '직업적 성공',
      money: '재정적 독립',
      health: '건강 풍요',
      spiritual: '영적 풍요'
    }
  },
  {
    id: 'ten-of-pentacles',
    name: 'Ten of Pentacles',
    nameKo: '펜타클의 10',
    description: 'Wealth, financial security, family, legacy',
    descriptionKo: '부, 재정적 안정, 가족, 유산을 의미하는 카드',
    image: 'images/cards/pentacles/ten-of-pentacles.webp',
    suit: 'pentacles',
    number: 10,
    keywords: ['wealth', 'family', 'legacy'],
    keywordsKo: ['부', '가족', '유산'],
    meaning: {
      general: 'Wealth and legacy',
      love: 'Family love',
      career: 'Career legacy',
      money: 'Generational wealth',
      health: 'Family health',
      spiritual: 'Spiritual legacy'
    },
    meaningKo: {
      general: '부와 유산',
      love: '가족 사랑',
      career: '직업적 유산',
      money: '세대간 부',
      health: '가족 건강',
      spiritual: '영적 유산'
    }
  },
  {
    id: 'page-of-pentacles',
    name: 'Page of Pentacles',
    nameKo: '펜타클의 시종',
    description: 'Manifestation, financial opportunity, skill development',
    descriptionKo: '현실화, 재정 기회, 기술 개발을 의미하는 카드',
    image: 'images/cards/pentacles/page-of-pentacles.webp',
    suit: 'pentacles',
    keywords: ['manifestation', 'opportunity', 'learning'],
    keywordsKo: ['현실화', '기회', '학습'],
    meaning: {
      general: 'New learning opportunity',
      love: 'Practical love',
      career: 'New career learning',
      money: 'Financial learning',
      health: 'Health learning',
      spiritual: 'Practical spirituality'
    },
    meaningKo: {
      general: '새로운 학습 기회',
      love: '실용적 사랑',
      career: '새로운 직업 학습',
      money: '재정적 학습',
      health: '건강 학습',
      spiritual: '실용적 영성'
    }
  },
  {
    id: 'knight-of-pentacles',
    name: 'Knight of Pentacles',
    nameKo: '펜타클의 기사',
    description: 'Hard work, productivity, routine, conservatism',
    descriptionKo: '힘든 일, 생산성, 일상, 보수주의를 의미하는 카드',
    image: 'images/cards/pentacles/knight-of-pentacles.webp',
    suit: 'pentacles',
    keywords: ['hard work', 'routine', 'reliability'],
    keywordsKo: ['힘든 일', '일상', '신뢰성'],
    meaning: {
      general: 'Steady progress',
      love: 'Reliable in love',
      career: 'Steady work',
      money: 'Steady income',
      health: 'Steady health',
      spiritual: 'Steady spiritual practice'
    },
    meaningKo: {
      general: '꾸준한 진전',
      love: '사랑에서의 신뢰성',
      career: '꾸준한 일',
      money: '꾸준한 수입',
      health: '꾸준한 건강',
      spiritual: '꾸준한 영적 수행'
    }
  },
  {
    id: 'queen-of-pentacles',
    name: 'Queen of Pentacles',
    nameKo: '펜타클의 여왕',
    description: 'Nurturing, practical, providing, down-to-earth',
    descriptionKo: '양육적, 실용적, 제공하는, 현실적인 카드',
    image: 'images/cards/pentacles/queen-of-pentacles.webp',
    suit: 'pentacles',
    keywords: ['nurturing', 'practical', 'providing'],
    keywordsKo: ['양육적', '실용적', '제공하는'],
    meaning: {
      general: 'Practical nurturing',
      love: 'Nurturing relationship',
      career: 'Caring leadership',
      money: 'Financial nurturing',
      health: 'Health nurturing',
      spiritual: 'Practical spirituality'
    },
    meaningKo: {
      general: '실용적 양육',
      love: '양육적 관계',
      career: '돌보는 리더십',
      money: '재정적 양육',
      health: '건강 양육',
      spiritual: '실용적 영성'
    }
  },
  {
    id: 'king-of-pentacles',
    name: 'King of Pentacles',
    nameKo: '펜타클의 왕',
    description: 'Financial success, business acumen, security',
    descriptionKo: '재정적 성공, 사업 수완, 안정을 의미하는 카드',
    image: 'images/cards/pentacles/king-of-pentacles.webp',
    suit: 'pentacles',
    keywords: ['financial success', 'business acumen', 'security'],
    keywordsKo: ['재정적 성공', '사업 수완', '안정'],
    meaning: {
      general: 'Material mastery',
      love: 'Providing in love',
      career: 'Business success',
      money: 'Financial mastery',
      health: 'Health security',
      spiritual: 'Material spiritual wisdom'
    },
    meaningKo: {
      general: '물질적 숙련',
      love: '사랑에서의 제공',
      career: '사업 성공',
      money: '재정적 숙련',
      health: '건강 안정',
      spiritual: '물질적 영적 지혜'
    }
  }
];

// 전체 타로카드 덱 (78장)
export const fullTarotDeck: TarotCard[] = [
  ...majorArcana,
  ...cups,
  ...wands,
  ...swords,
  ...pentacles
];

// 카드 ID로 카드 찾기
export function getCardById(id: string): TarotCard | undefined {
  return fullTarotDeck.find(card => card.id === id);
}

// 수트별로 카드 가져오기
export function getCardsBySuit(suit: string): TarotCard[] {
  return fullTarotDeck.filter(card => card.suit === suit);
}

// 카드 덱 셔플 함수
export function shuffleDeck(deck: TarotCard[] = fullTarotDeck): TarotCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 랜덤 카드 선택
export function drawRandomCards(count: number, deck: TarotCard[] = fullTarotDeck): TarotCard[] {
  const shuffled = shuffleDeck(deck);
  return shuffled.slice(0, count);
}

// 카드 뒤집기 (리버스 상태 토글)
export function flipCard(card: TarotCard): TarotCard {
  return {
    ...card,
    reversed: !card.reversed
  };
}

// 카드 검색
export function searchCards(query: string, deck: TarotCard[] = fullTarotDeck): TarotCard[] {
  const lowercaseQuery = query.toLowerCase();
  return deck.filter(card => 
    card.name.toLowerCase().includes(lowercaseQuery) ||
    card.nameKo.includes(lowercaseQuery) ||
    card.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    card.keywordsKo.some(keyword => keyword.includes(lowercaseQuery))
  );
}