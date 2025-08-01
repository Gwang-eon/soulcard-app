/**
 * 점진적 타로 해석 서비스
 * 카드를 하나씩 순차적으로 해석하며 실시간으로 결과 전송
 */

import { SelectedCard, Category, SpreadType } from '../types/tarot';
import { aiNarrativeEngine } from './aiNarrativeEngine';
import { ollamaAI } from './ollamaAI';
import { readingHistory, ReadingHistoryService } from './readingHistory';
import { realtimeWebSocketServer } from '../server/websocket-server';

export interface ProgressiveReadingOptions {
  sessionId: string;
  question: string;
  category: Category;
  spreadType: SpreadType;
  cards: SelectedCard[];
  userId?: string;
}

export interface CardRevealData {
  cardIndex: number;
  card: SelectedCard;
  interpretation: string;
  isComplete: boolean;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
}

export interface FinalInterpretationData {
  finalInterpretation: string;
  totalProcessingTime: number;
  sessionComplete: true;
}

export class ProgressiveReadingService {
  private static instance: ProgressiveReadingService;
  private processingQueue: Map<string, AbortController> = new Map();

  private constructor() {}

  public static getInstance(): ProgressiveReadingService {
    if (!ProgressiveReadingService.instance) {
      ProgressiveReadingService.instance = new ProgressiveReadingService();
    }
    return ProgressiveReadingService.instance;
  }

  /**
   * 점진적 해석 시작
   */
  public async startProgressiveReading(options: ProgressiveReadingOptions): Promise<string> {
    const { sessionId, question, category, spreadType, cards, userId } = options;
    
    // 히스토리에 세션 등록
    const readingId = readingHistory.createSession(
      sessionId, question, category, spreadType, cards, userId
    );

    // 처리 취소를 위한 AbortController
    const abortController = new AbortController();
    this.processingQueue.set(readingId, abortController);

    console.log(`🚀 점진적 해석 시작: ${readingId} (${cards.length}장)`);

    // 백그라운드에서 비동기 처리
    this.processCardsSequentially(readingId, options, abortController.signal)
      .catch(error => {
        console.error(`해석 처리 중 오류: ${readingId}`, error);
        readingHistory.failSession(readingId, error.message);
        
        // 클라이언트에 오류 알림
        realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'interpretation_failed', {
          readingId,
          error: error.message,
          canRetry: true
        });
      })
      .finally(() => {
        this.processingQueue.delete(readingId);
      });

    return readingId;
  }

  /**
   * 카드들을 순차적으로 처리
   */
  private async processCardsSequentially(
    readingId: string,
    options: ProgressiveReadingOptions,
    signal: AbortSignal
  ): Promise<void> {
    const { sessionId, question, category, spreadType, cards } = options;
    const startTime = Date.now();

    try {
      // 1. 개별 카드 해석
      for (let i = 0; i < cards.length; i++) {
        if (signal.aborted) {
          readingHistory.cancelSession(readingId);
          return;
        }

        console.log(`🎴 카드 ${i + 1}/${cards.length} 해석 시작: ${cards[i].card.koreanName}`);
        
        // 클라이언트에 진행 상황 알림
        realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'card_processing', {
          readingId,
          cardIndex: i,
          cardName: cards[i].card.koreanName,
          progress: {
            current: i,
            total: cards.length + 1, // +1 for final interpretation
            percentage: Math.round((i / (cards.length + 1)) * 100)
          }
        });

        try {
          // AI 해석 생성 (타임아웃 15초)
          console.log(`🔍 카드 ${i + 1} AI 해석 시작 - 카드: ${cards[i].card.koreanName}, 질문: ${question}`);
          
          const interpretationResult = await Promise.race([
            aiNarrativeEngine.generateSingleCardNarrative(cards[i], question, category),
            this.createTimeoutPromise(15000, `카드 ${i + 1} 해석 시간 초과`)
          ]);

          // undefined 체크 및 fallback 처리
          const interpretation = interpretationResult || this.generateFallbackInterpretation(cards[i], question, category);

          console.log(`🔍 카드 ${i + 1} 해석 결과:`, { 
            type: typeof interpretation, 
            length: interpretation?.length, 
            preview: interpretation?.substring(0, 50),
            isOriginal: !!interpretationResult
          });

          // 히스토리 업데이트
          readingHistory.updateCardInterpretation(readingId, i, interpretation);

          // 클라이언트에 카드 공개
          const revealData: CardRevealData = {
            cardIndex: i,
            card: cards[i],
            interpretation,
            isComplete: false,
            progress: {
              current: i + 1,
              total: cards.length + 1,
              percentage: Math.round(((i + 1) / (cards.length + 1)) * 100)
            }
          };

          realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'card_revealed', revealData);
          
          console.log(`✅ 카드 ${i + 1} 해석 완료 (${interpretation.length}자)`);

        } catch (cardError) {
          console.error(`카드 ${i + 1} 해석 실패:`, cardError);
          
          // 개별 카드 실패시 기본 해석 사용
          const fallbackInterpretation = this.generateFallbackInterpretation(cards[i], question, category);
          readingHistory.updateCardInterpretation(readingId, i, fallbackInterpretation);
          
          realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'card_revealed', {
            cardIndex: i,
            card: cards[i],
            interpretation: fallbackInterpretation,
            isComplete: false,
            progress: {
              current: i + 1,
              total: cards.length + 1,
              percentage: Math.round(((i + 1) / (cards.length + 1)) * 100)
            },
            usedFallback: true
          });
        }

        // 카드 간 간격 (UX 개선)
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // 2. 최종 종합 해석 (단일 카드가 아닌 경우)
      if (cards.length > 1) {
        console.log(`🎯 최종 종합 해석 시작: ${spreadType}`);
        
        realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'final_processing', {
          readingId,
          message: '모든 카드의 메시지를 종합하고 있습니다...'
        });

        try {
          const finalInterpretation = await Promise.race([
            this.generateFinalInterpretation(cards, question, category, spreadType),
            this.createTimeoutPromise(20000, '최종 해석 시간 초과')
          ]);

          readingHistory.completeSession(readingId, finalInterpretation);

          const finalData: FinalInterpretationData = {
            finalInterpretation,
            totalProcessingTime: Date.now() - startTime,
            sessionComplete: true
          };

          realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'interpretation_complete', finalData);
          
          console.log(`🎉 전체 해석 완료: ${readingId} (${Date.now() - startTime}ms)`);

        } catch (finalError) {
          console.error('최종 해석 실패:', finalError);
          
          const fallbackFinal = this.generateFallbackFinalInterpretation(cards, question);
          readingHistory.completeSession(readingId, fallbackFinal);
          
          realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'interpretation_complete', {
            finalInterpretation: fallbackFinal,
            totalProcessingTime: Date.now() - startTime,
            sessionComplete: true,
            usedFallback: true
          });
        }
      } else {
        // 단일 카드는 바로 완료
        readingHistory.completeSession(readingId, '단일 카드 해석 완료');
        
        realtimeWebSocketServer.sendRealtimeUpdate(sessionId, 'interpretation_complete', {
          finalInterpretation: '',
          totalProcessingTime: Date.now() - startTime,
          sessionComplete: true
        });
      }

    } catch (error) {
      throw error;
    }
  }

  /**
   * 최종 종합 해석 생성
   */
  private async generateFinalInterpretation(
    cards: SelectedCard[],
    question: string,
    category: Category,
    spreadType: SpreadType
  ): Promise<string> {
    if (spreadType === 'past_present_future' && cards.length === 3) {
      return aiNarrativeEngine.generateThreeCardNarrative(cards, question, category);
    } else if (spreadType === 'relationship' && cards.length === 5) {
      return aiNarrativeEngine.generateRelationshipNarrative(cards, question);
    } else if (spreadType === 'celtic_cross' && cards.length === 10) {
      return aiNarrativeEngine.generateCelticCrossNarrative(cards, question, category);
    }
    
    return '모든 카드가 조화롭게 어우러져 당신에게 특별한 메시지를 전하고 있습니다.';
  }

  /**
   * Fallback 해석 생성
   */
  private generateFallbackInterpretation(card: SelectedCard, question: string, category: Category): string {
    const orientation = card.isReversed ? 'reversed' : 'upright';
    const interpretation = card.card.interpretations[orientation][category];
    
    return `**${card.card.koreanName}${card.isReversed ? ' 역방향' : ''}**\n\n"${question}"에 대한 답변입니다.\n\n${interpretation}\n\n🌟 AI 처리 중 문제가 발생하여 기본 해석을 제공해드렸습니다.`;
  }

  /**
   * Fallback 최종 해석
   */
  private generateFallbackFinalInterpretation(cards: SelectedCard[], question: string): string {
    return `**종합 메시지**\n\n${cards.length}장의 카드가 "${question}"에 대해 전하는 메시지는 매우 깊고 의미가 있습니다. 각 카드의 개별적인 의미를 종합해보시면 당신만의 특별한 답을 찾으실 수 있을 것입니다.\n\n🌟 AI 처리 중 문제가 발생하여 간단한 종합 메시지를 제공해드렸습니다.`;
  }

  /**
   * 타임아웃 Promise 생성
   */
  private createTimeoutPromise(ms: number, message: string): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    });
  }

  /**
   * 해석 취소
   */
  public cancelReading(readingId: string): boolean {
    const controller = this.processingQueue.get(readingId);
    if (controller) {
      controller.abort();
      readingHistory.cancelSession(readingId);
      console.log(`🚫 해석 취소: ${readingId}`);
      return true;
    }
    return false;
  }

  /**
   * 현재 처리 중인 해석 목록
   */
  public getActiveReadings(): string[] {
    return Array.from(this.processingQueue.keys());
  }
}

export const progressiveReading = ProgressiveReadingService.getInstance();