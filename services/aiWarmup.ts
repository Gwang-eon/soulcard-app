/**
 * AI 워밍업 서비스
 * 서버 시작시 Ollama 모델을 미리 로드하여 첫 요청 지연시간 단축
 */

import { ollamaAI } from './ollamaAI';

export class AIWarmupService {
  private static instance: AIWarmupService;
  private isWarmedUp = false;
  private warmupPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): AIWarmupService {
    if (!AIWarmupService.instance) {
      AIWarmupService.instance = new AIWarmupService();
    }
    return AIWarmupService.instance;
  }

  /**
   * AI 워밍업 시작
   */
  public async warmup(): Promise<void> {
    if (this.isWarmedUp || this.warmupPromise) {
      return this.warmupPromise || Promise.resolve();
    }

    console.log('🔥 AI 워밍업 시작...');
    this.warmupPromise = this.performWarmup();
    
    try {
      await this.warmupPromise;
      this.isWarmedUp = true;
      console.log('✅ AI 워밍업 완료 - 준비 상태');
    } catch (error) {
      console.error('❌ AI 워밍업 실패:', error);
      this.warmupPromise = null;
    }
  }

  /**
   * 실제 워밍업 작업
   */
  private async performWarmup(): Promise<void> {
    try {
      // 간단한 테스트 해석으로 모델 로드
      await ollamaAI.generateSingleCardInterpretation(
        '바보',
        false,
        '테스트 질문입니다',
        'general',
        '새로운 시작을 의미하는 카드입니다'
      );
      
      console.log('🎯 AI 모델 로드 완료');
    } catch (error) {
      throw new Error(`AI 워밍업 중 오류: ${error}`);
    }
  }

  /**
   * AI 준비 상태 확인
   */
  public isReady(): boolean {
    return this.isWarmedUp;
  }

  /**
   * AI 상태 정보
   */
  public getStatus(): {
    isReady: boolean;
    isWarming: boolean;
    message: string;
  } {
    if (this.isWarmedUp) {
      return {
        isReady: true,
        isWarming: false,
        message: 'AI 준비 완료'
      };
    }

    if (this.warmupPromise) {
      return {
        isReady: false,
        isWarming: true,
        message: 'AI 워밍업 중...'
      };
    }

    return {
      isReady: false,
      isWarming: false,
      message: 'AI 미준비 상태'
    };
  }
}

export const aiWarmup = AIWarmupService.getInstance();