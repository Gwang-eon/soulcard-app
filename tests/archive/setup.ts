/**
 * Jest 테스트 환경 설정
 */

// 전역 테스트 설정
beforeAll(() => {
  // 테스트 환경에서 콘솔 로그 제한
  if (process.env.NODE_ENV === 'test') {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
  }
});

afterAll(() => {
  // 테스트 정리
});

// 타로 앱 관련 테스트 유틸리티
export const testUtils = {
  // 테스트용 목 카드 데이터
  mockCard: {
    id: 0,
    name: 'Test Card',
    koreanName: '테스트 카드',
    suit: 'major' as const,
    number: 0,
    element: null,
    uprightKeywords: ['테스트', '시험'],
    reversedKeywords: ['실패', '오류'],
    interpretations: {
      upright: {
        general: '테스트 해석입니다.',
        love: '테스트 사랑 해석입니다.',
        career: '테스트 직업 해석입니다.',
        money: '테스트 돈 해석입니다.',
        health: '테스트 건강 해석입니다.',
        spiritual: '테스트 영적 해석입니다.'
      },
      reversed: {
        general: '테스트 역방향 해석입니다.',
        love: '테스트 역방향 사랑 해석입니다.',
        career: '테스트 역방향 직업 해석입니다.',
        money: '테스트 역방향 돈 해석입니다.',
        health: '테스트 역방향 건강 해석입니다.',
        spiritual: '테스트 역방향 영적 해석입니다.'
      }
    },
    timing: {
      immediate: '즉시',
      shortTerm: '단기',
      longTerm: '장기'
    },
    advice: {
      upright: {
        action: '행동하세요',
        avoid: '피하세요',
        focus: '집중하세요'
      },
      reversed: {
        action: '역방향 행동하세요',
        avoid: '역방향 피하세요',
        focus: '역방향 집중하세요'
      }
    },
    symbolism: [
      { symbol: '테스트 심볼', meaning: '테스트 의미' }
    ],
    imageUrl: 'test.png'
  },
  
  // 테스트용 질문들
  testQuestions: [
    '테스트 질문입니다',
    '사랑에 대한 질문',
    '일에 대한 질문',
    '돈에 대한 질문'
  ],
  
  // 비동기 테스트 헬퍼
  async waitFor(condition: () => boolean, timeout = 5000): Promise<void> {
    const start = Date.now();
    while (!condition() && Date.now() - start < timeout) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    if (!condition()) {
      throw new Error('Timeout waiting for condition');
    }
  }
};