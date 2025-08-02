// 📝 통합 타입 인덱스 파일
// 모든 타입 정의를 한 곳에서 관리

// 🔮 기존 AI/백엔드 타입들 (유지)
export * from './tarot';
export * from './cardSelection';

// 🎨 새로운 UI 타입들 (Figma 기반)
export * from './figma-ui';

// 🔄 호환성을 위한 타입 별칭들
import { TarotCard as BackendTarotCard } from './tarot';
import { UIUser, UIConsultationType, UIConsultationResult } from './figma-ui';

// 기존 코드와의 호환성을 위한 타입 별칭
export type TarotCardUI = BackendTarotCard; // UI에서 사용할 때
export type User = UIUser;
export type ConsultationType = UIConsultationType;
export type ConsultationResult = UIConsultationResult;

// 🎯 공통 유틸리티 타입들
export type ViewMode = 'navigation' | 'full-app' | 'component';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 📱 앱 전체 상태 타입
export interface AppGlobalState {
  // 사용자 관련
  user: UIUser | null;
  isAuthenticated: boolean;
  
  // 네비게이션
  currentPage: string;
  previousPage?: string;
  
  // UI 상태
  isLoading: boolean;
  loadingMessage?: string;
  error: string | null;
  
  // 상담 관련
  activeConsultation?: {
    type: UIConsultationType;
    question: string;
    step: number;
    selectedCards: string[];
  };
  
  // 설정
  settings: {
    theme: 'light' | 'dark' | 'auto';
    language: 'ko' | 'en';
    animations: boolean;
    sound: boolean;
  };
}

// 🔧 환경 설정 타입
export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
  features: {
    enableAnimations: boolean;
    enableSound: boolean;
    enablePremium: boolean;
    enableAnalytics: boolean;
  };
  ui: {
    defaultTheme: 'light' | 'dark' | 'auto';
    defaultLanguage: 'ko' | 'en';
    cardAnimationDuration: number;
    transitionDuration: number;
  };
}

// 🎨 Figma 컴포넌트 제어 타입들
export interface FigmaComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface DesignSystemProps extends FigmaComponentProps {
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
}

// 📊 이벤트 트래킹 타입
export interface AnalyticsEvent {
  name: string;
  category: 'consultation' | 'navigation' | 'interaction' | 'error';
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
}

// 🔄 API 통합 타입들
export interface APIEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// 🎯 React 컴포넌트 공통 타입들
export interface BaseComponentProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  testId?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// 🔮 상담 플로우 전용 타입들
export interface ConsultationStep {
  id: string;
  name: string;
  nameKo: string;
  component: React.ComponentType<any>;
  validation?: (data: any) => boolean;
  skipCondition?: (data: any) => boolean;
}

export interface ConsultationFlow {
  id: string;
  name: string;
  nameKo: string;
  steps: ConsultationStep[];
  totalSteps: number;
  estimatedDuration: number; // 분
}

// 🎨 스타일링 관련 타입들
export interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'shadow' | 'border-radius';
  description?: string;
}

export interface ComponentVariant {
  name: string;
  props: Record<string, any>;
  description?: string;
  example?: string;
}

// 📱 반응형 관련 타입들
export interface Breakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
}

export interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}

// 🔄 상태 관리 타입들
export type ActionType = 
  | 'SET_USER'
  | 'SET_LOADING'
  | 'SET_ERROR'
  | 'SET_PAGE'
  | 'START_CONSULTATION'
  | 'UPDATE_CONSULTATION'
  | 'END_CONSULTATION'
  | 'CLEAR_ERROR';

export interface AppAction {
  type: ActionType;
  payload?: any;
}

export type AppReducer = (state: AppGlobalState, action: AppAction) => AppGlobalState;

// 📦 컴포넌트 라이브러리 메타데이터
export interface ComponentMeta {
  name: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates' | 'pages';
  description: string;
  props: Record<string, {
    type: string;
    required: boolean;
    description: string;
    defaultValue?: any;
  }>;
  examples: ComponentVariant[];
}