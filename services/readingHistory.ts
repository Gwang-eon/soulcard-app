/**
 * 타로 해석 히스토리 관리 시스템
 * 사용자가 중간에 나가도 백그라운드에서 계속 처리하여 나중에 확인 가능
 */

import { SelectedCard, Category, SpreadType } from '../types/tarot';
import { v4 as uuidv4 } from 'uuid';

export interface ReadingSession {
  id: string;
  sessionId: string; // WebSocket 세션 ID
  userId?: string; // 추후 사용자 시스템 연동시
  question: string;
  category: Category;
  spreadType: SpreadType;
  cards: SelectedCard[];
  
  // 진행 상태
  status: 'processing' | 'completed' | 'failed' | 'cancelled';
  currentCardIndex: number;
  totalCards: number;
  
  // 해석 결과
  cardInterpretations: Array<{
    cardIndex: number;
    interpretation: string;
    completedAt: Date;
  }>;
  finalInterpretation?: string;
  
  // 메타데이터
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  processingTimeMs?: number;
}

export class ReadingHistoryService {
  private static instance: ReadingHistoryService;
  private sessions: Map<string, ReadingSession> = new Map();
  private userSessions: Map<string, string[]> = new Map(); // userId -> sessionIds

  private constructor() {}

  public static getInstance(): ReadingHistoryService {
    if (!ReadingHistoryService.instance) {
      ReadingHistoryService.instance = new ReadingHistoryService();
    }
    return ReadingHistoryService.instance;
  }

  /**
   * 새로운 해석 세션 시작
   */
  public createSession(
    sessionId: string,
    question: string,
    category: Category,
    spreadType: SpreadType,
    cards: SelectedCard[],
    userId?: string
  ): string {
    const readingId = uuidv4();
    
    const session: ReadingSession = {
      id: readingId,
      sessionId,
      userId,
      question,
      category,
      spreadType,
      cards,
      status: 'processing',
      currentCardIndex: 0,
      totalCards: cards.length,
      cardInterpretations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.set(readingId, session);
    
    // 사용자별 세션 추적
    if (userId) {
      if (!this.userSessions.has(userId)) {
        this.userSessions.set(userId, []);
      }
      this.userSessions.get(userId)!.push(readingId);
    }

    console.log(`📚 새 해석 세션 생성: ${readingId} (${spreadType})`);
    return readingId;
  }

  /**
   * 카드 해석 완료 업데이트
   */
  public updateCardInterpretation(
    readingId: string,
    cardIndex: number,
    interpretation: string
  ): void {
    const session = this.sessions.get(readingId);
    if (!session) {
      console.error(`세션을 찾을 수 없음: ${readingId}`);
      return;
    }

    session.cardInterpretations.push({
      cardIndex,
      interpretation,
      completedAt: new Date()
    });

    session.currentCardIndex = cardIndex + 1;
    session.updatedAt = new Date();

    console.log(`📝 카드 ${cardIndex + 1}/${session.totalCards} 해석 완료: ${readingId}`);
  }

  /**
   * 최종 종합 해석 완료
   */
  public completeSession(
    readingId: string,
    finalInterpretation: string
  ): void {
    const session = this.sessions.get(readingId);
    if (!session) {
      console.error(`세션을 찾을 수 없음: ${readingId}`);
      return;
    }

    session.finalInterpretation = finalInterpretation;
    session.status = 'completed';
    session.completedAt = new Date();
    session.processingTimeMs = session.completedAt.getTime() - session.createdAt.getTime();
    session.updatedAt = new Date();

    console.log(`✅ 해석 세션 완료: ${readingId} (${session.processingTimeMs}ms)`);
  }

  /**
   * 세션 실패 처리
   */
  public failSession(readingId: string, error: string): void {
    const session = this.sessions.get(readingId);
    if (!session) return;

    session.status = 'failed';
    session.updatedAt = new Date();

    console.log(`❌ 해석 세션 실패: ${readingId} - ${error}`);
  }

  /**
   * 세션 취소 처리
   */
  public cancelSession(readingId: string): void {
    const session = this.sessions.get(readingId);
    if (!session) return;

    session.status = 'cancelled';
    session.updatedAt = new Date();

    console.log(`🚫 해석 세션 취소: ${readingId}`);
  }

  /**
   * 세션 정보 조회
   */
  public getSession(readingId: string): ReadingSession | undefined {
    return this.sessions.get(readingId);
  }

  /**
   * 세션 진행률 계산
   */
  public getProgress(readingId: string): {
    current: number;
    total: number;
    percentage: number;
    status: string;
  } {
    const session = this.sessions.get(readingId);
    if (!session) {
      return { current: 0, total: 0, percentage: 0, status: 'not_found' };
    }

    const current = session.cardInterpretations.length;
    const total = session.totalCards + (session.totalCards > 1 ? 1 : 0); // +1 for final interpretation if multi-card
    const percentage = Math.round((current / total) * 100);

    return {
      current,
      total,
      percentage,
      status: session.status
    };
  }

  /**
   * 사용자의 해석 히스토리 조회
   */
  public getUserHistory(userId: string, limit: number = 10): ReadingSession[] {
    const sessionIds = this.userSessions.get(userId) || [];
    
    return sessionIds
      .map(id => this.sessions.get(id))
      .filter((session): session is ReadingSession => session !== undefined)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * 완료된 세션들 정리 (메모리 관리)
   */
  public cleanupOldSessions(olderThanHours: number = 24): void {
    const cutoffTime = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    let cleanedCount = 0;

    for (const [id, session] of this.sessions.entries()) {
      if (session.updatedAt < cutoffTime && session.status !== 'processing') {
        this.sessions.delete(id);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 ${cleanedCount}개의 오래된 세션 정리 완료`);
    }
  }

  /**
   * 전체 통계
   */
  public getStats(): {
    totalSessions: number;
    processingSessions: number;
    completedSessions: number;
    failedSessions: number;
  } {
    const sessions = Array.from(this.sessions.values());
    
    return {
      totalSessions: sessions.length,
      processingSessions: sessions.filter(s => s.status === 'processing').length,
      completedSessions: sessions.filter(s => s.status === 'completed').length,
      failedSessions: sessions.filter(s => s.status === 'failed').length
    };
  }
}

export const readingHistory = ReadingHistoryService.getInstance();