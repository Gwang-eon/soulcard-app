/**
 * WebSocket 실시간 분석 서버
 * v2.0 Phase 3.1 - 실시간 사용자 상호작용 분석
 */

import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { realTimeAnalyzer, TypingEvent, UserActivity, RealtimeFeedback, UserContext } from '../analytics/real-time-analyzer';
import { progressiveReading } from '../services/progressiveReading';

export interface WebSocketServer {
  initialize(httpServer: HTTPServer): void;
  handleConnection(socket: any): void;
  broadcastInsight(sessionId: string, insight: any): void;
  sendPersonalizedResponse(sessionId: string, response: any): void;
}

export interface SocketEventHandlers {
  onSessionStart: (socket: any, data: SessionStartData) => Promise<void>;
  onTypingEvent: (socket: any, data: TypingEventData) => Promise<void>;
  onQuestionUpdate: (socket: any, data: QuestionUpdateData) => Promise<void>;
  onUserActivity: (socket: any, data: UserActivityData) => Promise<void>;
  onRealtimeFeedback: (socket: any, data: RealtimeFeedbackData) => Promise<void>;
  onSessionEnd: (socket: any, data: SessionEndData) => Promise<void>;
  
  // 점진적 해석용
  onStartProgressiveReading: (socket: any, data: ProgressiveReadingStartData) => Promise<void>;
  onCancelReading: (socket: any, data: { readingId: string }) => Promise<void>;
}

export interface SessionStartData {
  userContext: UserContext;
  initialState?: any;
}

export interface TypingEventData {
  events: TypingEvent[];
  partialText: string;
  timestamp: number;
}

export interface QuestionUpdateData {
  partialQuestion: string;
  isComplete: boolean;
  timestamp: number;
}

export interface UserActivityData {
  activity: UserActivity;
  context: any;
}

export interface RealtimeFeedbackData {
  feedback: RealtimeFeedback;
  immediate: boolean;
}

export interface SessionEndData {
  reason: 'completion' | 'abandonment' | 'timeout';
  finalState?: any;
}

export interface ProgressiveReadingStartData {
  sessionId: string;
  question: string;
  category: string;
  spreadType: string;
  cards: any[];
  userId?: string;
}

export interface WebSocketResponse {
  type: ResponseType;
  data: any;
  timestamp: number;
  sessionId: string;
}

export type ResponseType = 
  | 'session_initialized'
  | 'typing_analyzed'
  | 'emotion_detected'
  | 'question_predicted'
  | 'insight_generated'
  | 'recommendation'
  | 'system_adjustment'
  | 'session_summary';

/**
 * WebSocket 실시간 분석 서버 클래스
 */
export class RealtimeWebSocketServer implements WebSocketServer {
  private io!: SocketIOServer;
  private sessionSockets: Map<string, any> = new Map();
  private socketSessions: Map<string, string> = new Map();

  constructor() {
    this.setupRealtimeAnalyzerEvents();
  }

  /**
   * WebSocket 서버 초기화
   */
  public initialize(httpServer: HTTPServer): void {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
      transports: ['websocket', 'polling']
    });

    this.io.on('connection', (socket) => {
      console.log(`🔌 WebSocket 연결: ${socket.id}`);
      this.handleConnection(socket);
    });

    console.log('✨ WebSocket 실시간 분석 서버 초기화 완료');
  }

  /**
   * 클라이언트 연결 처리
   */
  public handleConnection(socket: any): void {
    const handlers = new SocketEventHandlersImpl(this, socket);
    
    console.log(`🔗 이벤트 핸들러 등록 중 for socket: ${socket.id}`);

    // 이벤트 핸들러 등록
    socket.on('session:start', (data: any) => {
      console.log('🎯 session:start 이벤트 수신됨, 데이터:', data);
      handlers.onSessionStart(socket, data);
    });
    
    // 모든 이벤트 수신 테스트
    socket.onAny((eventName: any, ...args: any[]) => {
      console.log('📨 수신된 이벤트:', eventName, 'args:', args);
    });
    socket.on('typing:event', handlers.onTypingEvent.bind(handlers));
    socket.on('question:update', handlers.onQuestionUpdate.bind(handlers));
    socket.on('activity:update', handlers.onUserActivity.bind(handlers));
    socket.on('feedback:realtime', handlers.onRealtimeFeedback.bind(handlers));
    socket.on('session:end', handlers.onSessionEnd.bind(handlers));
    
    // 🎯 점진적 해석 이벤트
    socket.on('start_progressive_reading', handlers.onStartProgressiveReading.bind(handlers));
    socket.on('cancel_reading', handlers.onCancelReading.bind(handlers));

    // 연결 해제 처리
    socket.on('disconnect', () => {
      console.log(`🔌 WebSocket 연결 해제: ${socket.id}`);
      this.handleDisconnection(socket);
    });
  }

  /**
   * 특정 세션에 인사이트 브로드캐스트
   */
  public broadcastInsight(sessionId: string, insight: any): void {
    const socket = this.sessionSockets.get(sessionId);
    if (socket) {
      const response: WebSocketResponse = {
        type: 'insight_generated',
        data: insight,
        timestamp: Date.now(),
        sessionId
      };
      socket.emit('insight', response);
    }
  }

  /**
   * 개인화된 응답 전송
   */
  public sendPersonalizedResponse(sessionId: string, response: any): void {
    const socket = this.sessionSockets.get(sessionId);
    if (socket) {
      const wsResponse: WebSocketResponse = {
        type: 'recommendation',
        data: response,
        timestamp: Date.now(),
        sessionId
      };
      socket.emit('personalized_response', wsResponse);
    }
  }

  /**
   * 시스템 조정 알림
   */
  public notifySystemAdjustment(sessionId: string, adjustment: any): void {
    const socket = this.sessionSockets.get(sessionId);
    if (socket) {
      const response: WebSocketResponse = {
        type: 'system_adjustment',
        data: adjustment,
        timestamp: Date.now(),
        sessionId
      };
      socket.emit('system_adjustment', response);
    }
  }

  /**
   * 실시간 상태 업데이트
   */
  public sendRealtimeUpdate(sessionId: string, updateType: string, data: any): void {
    const socket = this.sessionSockets.get(sessionId);
    if (socket) {
      socket.emit('realtime_update', {
        type: updateType,
        data,
        timestamp: Date.now(),
        sessionId
      });
    }
  }

  // ===== 내부 메소드들 =====

  private setupRealtimeAnalyzerEvents(): void {
    // 실시간 분석기 이벤트 연결
    realTimeAnalyzer.on('sessionStarted', (data) => {
      this.sendRealtimeUpdate(data.sessionId, 'session_started', data.sessionState);
    });

    realTimeAnalyzer.on('typingAnalyzed', (data) => {
      this.sendRealtimeUpdate(data.sessionId, 'typing_analyzed', {
        analysis: data.typingAnalysis,
        emotion: data.emotionalIndicator
      });
    });

    realTimeAnalyzer.on('questionPredicted', (data) => {
      this.sendRealtimeUpdate(data.sessionId, 'question_predicted', data.prediction);
    });

    realTimeAnalyzer.on('criticalInsight', (data) => {
      this.broadcastInsight(data.sessionId, data.insight);
    });

    realTimeAnalyzer.on('emotionalShift', (data) => {
      this.sendRealtimeUpdate(data.sessionId, 'emotional_shift', {
        shift: data.shift,
        insight: data.insight
      });
    });

    realTimeAnalyzer.on('dropOffRisk', (data) => {
      this.sendRealtimeUpdate(data.sessionId, 'drop_off_risk', {
        interventions: data.interventions
      });
    });

    realTimeAnalyzer.on('sessionCompleted', (data) => {
      this.sendSessionSummary(data.sessionId, data.summary);
    });
  }

  private handleDisconnection(socket: any): void {
    const sessionId = this.socketSessions.get(socket.id);
    if (sessionId) {
      // 세션 정리
      this.sessionSockets.delete(sessionId);
      this.socketSessions.delete(socket.id);
      
      // 분석 시스템에 세션 종료 알림
      realTimeAnalyzer.completeSession(sessionId).catch(console.error);
    }
  }

  private sendSessionSummary(sessionId: string, summary: any): void {
    const socket = this.sessionSockets.get(sessionId);
    if (socket) {
      const response: WebSocketResponse = {
        type: 'session_summary',
        data: summary,
        timestamp: Date.now(),
        sessionId
      };
      socket.emit('session_summary', response);
    }
  }

  public registerSession(sessionId: string, socket: any): void {
    this.sessionSockets.set(sessionId, socket);
    this.socketSessions.set(socket.id, sessionId);
  }

  public getSocketSessions(): Map<string, string> {
    return this.socketSessions;
  }
}

/**
 * Socket 이벤트 핸들러 구현
 */
class SocketEventHandlersImpl implements SocketEventHandlers {
  constructor(
    private server: RealtimeWebSocketServer,
    private socket: any
  ) {}

  async onSessionStart(socket: any, data: SessionStartData): Promise<void> {
    try {
      console.log('📥 세션 시작 요청 수신:', data);
      
      const sessionId = this.generateSessionId();
      
      // 세션 등록
      this.server.registerSession(sessionId, socket);
      
      // 데이터 유효성 검사
      if (!data || !data.userContext) {
        console.error('❌ 세션 데이터 유효성 검사 실패:', { data, hasUserContext: !!data?.userContext });
        this.socket.emit('error', { message: '잘못된 세션 데이터입니다' });
        return;
      }
      
      // 실시간 분석 시스템에 세션 시작 알림
      const sessionState = await realTimeAnalyzer.startSession(sessionId, data.userContext);
      
      // 클라이언트에 세션 초기화 응답
      const response: WebSocketResponse = {
        type: 'session_initialized',
        data: {
          sessionId,
          sessionState,
          realtimeFeatures: {
            typingAnalysis: true,
            emotionDetection: true,
            questionPrediction: true,
            instantFeedback: true
          }
        },
        timestamp: Date.now(),
        sessionId
      };
      
      this.socket.emit('session_initialized', response);
      
      console.log(`🎯 실시간 세션 시작: ${sessionId}`);
      
    } catch (error) {
      console.error('세션 시작 오류:', error);
      this.socket.emit('error', { message: '세션 시작 실패', error: String(error) });
    }
  }

  async onTypingEvent(socket: any, data: TypingEventData): Promise<void> {
    try {
      const sessionId = this.getSessionId(socket);
      if (!sessionId) return;

      // 타이핑 이벤트 배치 처리
      for (const event of data.events) {
        await realTimeAnalyzer.processTypingEvent(sessionId, event);
      }

      // 부분 질문 분석 (텍스트가 있는 경우)
      if (data.partialText && data.partialText.length > 5) {
        const prediction = await realTimeAnalyzer.analyzeQuestionInProgress(
          sessionId,
          data.partialText
        );
        
        // 예측 결과 전송
        const response: WebSocketResponse = {
          type: 'question_predicted',
          data: prediction,
          timestamp: Date.now(),
          sessionId
        };
        
        socket.emit('question_prediction', response);
      }

    } catch (error) {
      console.error('타이핑 이벤트 처리 오류:', error);
    }
  }

  async onQuestionUpdate(socket: any, data: QuestionUpdateData): Promise<void> {
    try {
      const sessionId = this.getSessionId(socket);
      if (!sessionId) return;

      // 질문 업데이트 활동 기록
      const activity: UserActivity = {
        activityType: 'typing',
        timestamp: data.timestamp,
        duration: 0,
        data: {
          partialQuestion: data.partialQuestion,
          isComplete: data.isComplete,
          length: data.partialQuestion.length
        },
        engagement: {
          focus: 0.8,
          interaction: 1.0,
          duration: 0
        }
      };

      await realTimeAnalyzer.updateSessionActivity(sessionId, activity);

      // 완성된 질문인 경우 최종 분석
      if (data.isComplete) {
        await this.handleCompleteQuestion(sessionId, data.partialQuestion);
      }

    } catch (error) {
      console.error('질문 업데이트 처리 오류:', error);
    }
  }

  async onUserActivity(socket: any, data: UserActivityData): Promise<void> {
    try {
      const sessionId = this.getSessionId(socket);
      if (!sessionId) return;

      await realTimeAnalyzer.updateSessionActivity(sessionId, data.activity);

    } catch (error) {
      console.error('사용자 활동 처리 오류:', error);
    }
  }

  async onRealtimeFeedback(socket: any, data: RealtimeFeedbackData): Promise<void> {
    try {
      const sessionId = this.getSessionId(socket);
      if (!sessionId) return;

      await realTimeAnalyzer.processRealtimeFeedback(sessionId, data.feedback);

      // 즉시 피드백인 경우 실시간 조정
      if (data.immediate) {
        await this.handleImmediateFeedback(sessionId, data.feedback);
      }

    } catch (error) {
      console.error('실시간 피드백 처리 오류:', error);
    }
  }

  async onSessionEnd(socket: any, data: SessionEndData): Promise<void> {
    try {
      const sessionId = this.getSessionId(socket);
      if (!sessionId) return;

      const summary = await realTimeAnalyzer.completeSession(sessionId);
      
      // 세션 요약 전송
      const response: WebSocketResponse = {
        type: 'session_summary',
        data: {
          summary,
          reason: data.reason,
          insights: await this.generateSessionInsights(summary),
          recommendations: await this.generateFutureRecommendations(summary)
        },
        timestamp: Date.now(),
        sessionId
      };
      
      socket.emit('session_completed', response);
      
      console.log(`🏁 실시간 세션 종료: ${sessionId} (${data.reason})`);

    } catch (error) {
      console.error('세션 종료 처리 오류:', error);
    }
  }

  // ===== 헬퍼 메소드들 =====

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getSessionId(socket: any): string | undefined {
    // 소켓 ID로 세션 ID 조회
    return this.server.getSocketSessions().get(socket.id);
  }

  private async handleCompleteQuestion(sessionId: string, question: string): Promise<void> {
    // 완성된 질문에 대한 최종 분석
    const emotionalJourney = await realTimeAnalyzer.monitorEmotionalJourney(sessionId);
    
    // 질문 분석 결과를 기반으로 개인화된 조언 생성
    const personalizedAdvice = await this.generatePersonalizedAdvice(question, emotionalJourney);
    
    this.server.sendPersonalizedResponse(sessionId, {
      type: 'question_completed',
      question,
      advice: personalizedAdvice,
      emotionalJourney
    });
  }

  private async handleImmediateFeedback(sessionId: string, feedback: RealtimeFeedback): Promise<void> {
    // 부정적 피드백에 즉시 대응
    if (typeof feedback.value === 'number' && feedback.value < 3) {
      this.server.sendPersonalizedResponse(sessionId, {
        type: 'immediate_support',
        message: '더 나은 도움을 드리고 싶어요. 어떤 부분이 아쉬우셨나요?',
        supportOptions: [
          '다른 방식으로 설명해주세요',
          '더 간단하게 알려주세요',
          '다른 카드를 보여주세요'
        ]
      });
    }
  }

  private async generatePersonalizedAdvice(
    question: string,
    emotionalJourney: any
  ): Promise<string> {
    
    const currentEmotion = emotionalJourney.states[emotionalJourney.states.length - 1]?.primaryEmotion || 'neutral';
    
    // 감정 상태에 따른 개인화된 조언
    const adviceTemplates = {
      'anxious': '지금 불안한 마음이 드시는 것 같아요. 천천히 호흡을 고르고 현재에 집중해보세요.',
      'excited': '좋은 에너지가 느껴져요! 이 기운을 잘 활용하시면 원하는 결과를 얻을 수 있을 거예요.',
      'sad': '마음이 많이 아프신 것 같아요. 이런 감정도 자연스러운 과정이니까 너무 자책하지 마세요.',
      'confused': '복잡한 상황인 것 같아요. 한 번에 모든 것을 해결하려 하지 마시고 하나씩 차근차근 정리해보세요.',
      'neutral': '균형잡힌 마음 상태네요. 이런 상태에서 내린 결정은 보통 좋은 결과를 가져와요.'
    };
    
    return adviceTemplates[currentEmotion as keyof typeof adviceTemplates] || adviceTemplates.neutral;
  }

  private async generateSessionInsights(summary: any): Promise<string[]> {
    const insights = [];
    
    if (summary.emotionalJourney.states.length > 5) {
      insights.push('이번 세션에서 다양한 감정의 변화를 경험하셨네요');
    }
    
    if (summary.finalEngagement.attention > 0.8) {
      insights.push('매우 집중해서 리딩에 참여해주셨어요');
    }
    
    if (summary.duration > 600000) { // 10분 이상
      insights.push('충분한 시간을 들여서 깊이 있게 탐구하셨습니다');
    }
    
    return insights;
  }

  private async generateFutureRecommendations(summary: any): Promise<string[]> {
    const recommendations = [];
    
    if (summary.finalEngagement.satisfaction < 0.7) {
      recommendations.push('다음에는 더 구체적인 질문으로 시작해보세요');
    }
    
    if (summary.emotionalJourney.trajectory.volatility > 0.6) {
      recommendations.push('감정이 안정된 상태에서 리딩을 받으시면 더 좋은 결과를 얻을 수 있어요');
    }
    
    recommendations.push('규칙적인 리딩이 자기 이해에 도움이 됩니다');
    
    return recommendations;
  }

  // 🎯 점진적 해석 시작
  async onStartProgressiveReading(socket: any, data: ProgressiveReadingStartData): Promise<void> {
    try {
      console.log('🚀 점진적 해석 시작 요청:', data.sessionId);

      const readingId = await progressiveReading.startProgressiveReading({
        sessionId: data.sessionId,
        question: data.question,
        category: data.category as any,
        spreadType: data.spreadType as any,
        cards: data.cards,
        userId: data.userId
      });

      // 시작 확인 응답
      socket.emit('progressive_reading_started', {
        readingId,
        sessionId: data.sessionId,
        message: '점진적 해석이 시작되었습니다'
      });

      console.log(`✅ 점진적 해석 시작됨: ${readingId}`);

    } catch (error) {
      console.error('점진적 해석 시작 실패:', error);
      socket.emit('error', {
        message: '점진적 해석 시작에 실패했습니다',
        error: String(error)
      });
    }
  }

  // 해석 취소
  async onCancelReading(socket: any, data: { readingId: string }): Promise<void> {
    try {
      const cancelled = progressiveReading.cancelReading(data.readingId);
      
      if (cancelled) {
        socket.emit('reading_cancelled', {
          readingId: data.readingId,
          message: '해석이 취소되었습니다'
        });
        console.log(`🚫 해석 취소됨: ${data.readingId}`);
      } else {
        socket.emit('error', {
          message: '해석 취소에 실패했습니다 (이미 완료되었거나 존재하지 않음)'
        });
      }

    } catch (error) {
      console.error('해석 취소 실패:', error);
      socket.emit('error', {
        message: '해석 취소 중 오류가 발생했습니다',
        error: String(error)
      });
    }
  }
}

// WebSocket 서버 인스턴스
export const realtimeWebSocketServer = new RealtimeWebSocketServer();