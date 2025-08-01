// 카드 선택 시스템 타입 정의

export interface CardOption {
  id: number;
  position: { x: number; y: number };
  isRevealed: boolean;
  isSelected: boolean;
  animationState: 'idle' | 'shuffling' | 'hovering' | 'selecting' | 'revealed';
}

export interface CardDeckState {
  cards: CardOption[];
  shuffleState: 'idle' | 'shuffling' | 'ready';
  selectedCardId: number | null;
  shuffleCount: number;
}

export type ShuffleType = 'basic' | 'riffle' | 'overhand' | 'hindu' | 'bridge';

export type GestureType = 'tap' | 'swipe-left' | 'swipe-right' | 'pinch' | 'long-press' | 'shake';

export interface HapticFeedback {
  type: 'light' | 'medium' | 'heavy';
  duration: number;
  pattern?: number[];
}

export interface SelectionEvent {
  cardId: number;
  timestamp: number;
  gestureType: GestureType;
  position: { x: number; y: number };
  selectionTime: number; // 카드 표시부터 선택까지 걸린 시간
}

export interface ShuffleEvent {
  type: ShuffleType;
  timestamp: number;
  duration: number;
  gestureUsed: GestureType;
  intensity: number; // 0-1 사이 값
}

// 사용자 참여 분석을 위한 타입
export interface EngagementMetrics {
  sessionId: string;
  sessionDuration: number;
  cardSelectionTime: number;
  shuffleCount: number;
  shuffleEvents: ShuffleEvent[];
  touchInteractions: number;
  gestureUsage: GestureType[];
  hapticFeedbackResponse: number;
  readingCompletion: boolean;
  returnWithin24h: boolean;
  shareAction: boolean;
}

// 개인화를 위한 사용자 성격 분석
export interface PersonalityInsights {
  patience: 'high' | 'medium' | 'low';          // 셔플 시간 기반
  intuition: 'strong' | 'developing' | 'weak';  // 선택 속도 기반  
  energy: 'dynamic' | 'balanced' | 'calm';      // 제스처 강도 기반
  engagement: 'high' | 'medium' | 'low';        // 상호작용 빈도 기반
}

export interface UserPreferences {
  preferredShuffleType: ShuffleType;
  averageSelectionTime: number;
  gesturePatterns: GestureType[];
  hapticPreference: boolean;
  personalityProfile: PersonalityInsights;
}