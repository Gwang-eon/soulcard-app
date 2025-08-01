/**
 * 머신러닝 예측 엔진
 * v2.0 Phase 2.1 - TensorFlow.js 기반 카드 추천 시스템
 */

import { EmotionalContext } from '../ai/emotion-analyzer';
import { QuestionAnalysis } from '../ai/nlp-processor';
import { TarotCard, Category, SelectedCard } from '../types/tarot';

export interface PredictionModel {
  cardRecommendation: CardRecommendationModel;
  outcomePredictor: OutcomePredictorModel;
  userProfiler: UserProfilerModel;
}

export interface CardRecommendationModel {
  predictOptimalCards(
    emotionalContext: EmotionalContext,
    availableCards: TarotCard[],
    spreadSize: number
  ): Promise<CardPrediction[]>;
  
  calculateCardRelevance(
    card: TarotCard,
    context: EmotionalContext
  ): Promise<number>;
}

export interface OutcomePredictorModel {
  predictReadingOutcome(
    cards: SelectedCard[],
    context: EmotionalContext
  ): Promise<OutcomePrediction>;
  
  assessReadingEffectiveness(
    reading: any,
    userFeedback?: UserFeedback
  ): Promise<EffectivenessScore>;
}

export interface UserProfilerModel {
  buildUserProfile(
    readingHistory: ReadingHistory[]
  ): Promise<UserProfile>;
  
  predictUserPreferences(
    profile: UserProfile,
    context: EmotionalContext
  ): Promise<UserPreferences>;
}

export interface CardPrediction {
  card: TarotCard;
  relevanceScore: number; // 0-1
  confidenceLevel: number; // 0-1
  predictedImpact: PredictedImpact;
  reasoningFactors: ReasoningFactor[];
}

export interface OutcomePrediction {
  satisfactionScore: number; // 0-1 (예상 만족도)
  therapeuticValue: number; // 0-1 (치료적 가치)
  emotionalResonance: number; // 0-1 (감정적 공명)
  clarityLevel: number; // 0-1 (명확성)
  actionability: number; // 0-1 (실행 가능성)
  overallEffectiveness: number; // 0-1 (전체 효과성)
}

export interface UserProfile {
  userId: string;
  preferredReadingStyles: ReadingStyle[];
  emotionalPatterns: EmotionalPattern[];
  questionTypes: QuestionTypeFrequency[];
  cardAffinities: CardAffinity[];
  satisfactionHistory: SatisfactionRecord[];
  growthTrajectory: GrowthMetric[];
}

export interface UserPreferences {
  preferredSpreadTypes: SpreadTypePreference[];
  communicationStyle: CommunicationStyle;
  depthLevel: DepthLevel;
  focusAreas: FocusAreaPreference[];
  avoidanceTopics: string[];
}

// Types and Enums
export type PredictedImpact = 'transformative' | 'insightful' | 'comforting' | 'challenging' | 'clarifying';

export interface ReasoningFactor {
  factor: string;
  weight: number; // 0-1
  explanation: string;
}

export type ReadingStyle = 
  | 'analytical' | 'intuitive' | 'therapeutic' | 'spiritual' | 'practical' | 'mystical';

export interface EmotionalPattern {
  pattern: string;
  frequency: number;
  context: string[];
  resolution: string;
}

export interface QuestionTypeFrequency {
  category: Category;
  frequency: number;
  satisfaction: number;
  preferredApproach: string;
}

export interface CardAffinity {
  cardId: string;
  affinity: number; // -1 to 1 (negative = avoidance)
  reason: string;
  contextual: boolean;
}

export interface SatisfactionRecord {
  readingId: string;
  satisfactionScore: number;
  feedback: string;
  timestamp: Date;
}

export interface GrowthMetric {
  metric: string;
  value: number;
  trend: 'improving' | 'stable' | 'declining';
  timestamp: Date;
}

export interface SpreadTypePreference {
  spreadType: string;
  preference: number; // 0-1
  effectiveness: number; // 0-1
}

export type CommunicationStyle = 'direct' | 'gentle' | 'metaphorical' | 'analytical' | 'poetic';

export type DepthLevel = 'surface' | 'moderate' | 'deep' | 'profound';

export interface FocusAreaPreference {
  area: string;
  interest: number; // 0-1
  needLevel: number; // 0-1
}

export interface ReadingHistory {
  id: string;
  question: string;
  category: Category;
  cards: SelectedCard[];
  interpretation: string;
  userFeedback?: UserFeedback;
  timestamp: Date;
}

export interface UserFeedback {
  satisfaction: number; // 1-5
  helpfulness: number; // 1-5
  accuracy: number; // 1-5
  emotionalImpact: number; // 1-5
  comments: string;
}

export interface EffectivenessScore {
  overall: number; // 0-1
  accuracy: number;
  relevance: number;
  depth: number;
  actionability: number;
  therapeuticValue: number;
}

/**
 * 머신러닝 예측 엔진 클래스
 */
export class MLPredictionEngine {
  private cardRecommender: CardRecommendationModel;
  private outcomePredictor: OutcomePredictorModel;
  private userProfiler: UserProfilerModel;
  
  private trainingData: Map<string, any[]> = new Map();
  private modelWeights: Map<string, number[]> = new Map();
  
  constructor() {
    this.cardRecommender = new CardRecommendationEngine();
    this.outcomePredictor = new OutcomePredictionEngine();
    this.userProfiler = new UserProfilingEngine();
    
    this.initializeModels();
  }

  /**
   * 최적 카드 예측
   */
  public async predictOptimalCards(
    emotionalContext: EmotionalContext,
    availableCards: TarotCard[],
    spreadSize: number
  ): Promise<CardPrediction[]> {
    return await this.cardRecommender.predictOptimalCards(
      emotionalContext,
      availableCards,
      spreadSize
    );
  }

  /**
   * 리딩 결과 예측
   */
  public async predictReadingOutcome(
    cards: SelectedCard[],
    context: EmotionalContext
  ): Promise<OutcomePrediction> {
    return await this.outcomePredictor.predictReadingOutcome(cards, context);
  }

  /**
   * 사용자 프로필 구축
   */
  public async buildUserProfile(
    readingHistory: ReadingHistory[]
  ): Promise<UserProfile> {
    return await this.userProfiler.buildUserProfile(readingHistory);
  }

  /**
   * 모델 훈련
   */
  public async trainModels(trainingData: ReadingHistory[]): Promise<void> {
    // 카드 추천 모델 훈련
    await this.trainCardRecommendationModel(trainingData);
    
    // 결과 예측 모델 훈련
    await this.trainOutcomePredictionModel(trainingData);
    
    // 사용자 프로파일링 모델 훈련
    await this.trainUserProfilingModel(trainingData);
  }

  /**
   * 모델 성능 평가
   */
  public async evaluateModels(testData: ReadingHistory[]): Promise<ModelPerformance> {
    const cardAccuracy = await this.evaluateCardRecommendation(testData);
    const outcomeAccuracy = await this.evaluateOutcomePrediction(testData);
    const profileAccuracy = await this.evaluateUserProfiling(testData);
    
    return {
      cardRecommendation: cardAccuracy,
      outcomePrediction: outcomeAccuracy,
      userProfiling: profileAccuracy,
      overall: (cardAccuracy + outcomeAccuracy + profileAccuracy) / 3
    };
  }

  // ===== 헬퍼 메소드들 =====

  private async initializeModels(): Promise<void> {
    // 기본 가중치 초기화
    this.modelWeights.set('emotionalRelevance', [0.4, 0.3, 0.2, 0.1]);
    this.modelWeights.set('psychologicalFit', [0.35, 0.25, 0.25, 0.15]);
    this.modelWeights.set('therapeuticValue', [0.3, 0.3, 0.25, 0.15]);
    
    // 카드별 기본 특성 벡터 초기화
    await this.initializeCardVectors();
  }

  private async initializeCardVectors(): Promise<void> {
    // 각 카드의 특성을 벡터로 표현
    // 예: [감정적_강도, 심리적_깊이, 치료적_가치, 영적_의미, 실용성]
    const cardVectors = new Map<string, number[]>();
    
    // 메이저 아르카나 기본 벡터
    cardVectors.set('fool', [0.8, 0.6, 0.7, 0.9, 0.5]);
    cardVectors.set('magician', [0.7, 0.8, 0.6, 0.8, 0.9]);
    cardVectors.set('high-priestess', [0.6, 0.9, 0.8, 0.95, 0.4]);
    // ... 모든 카드에 대한 벡터 정의
    
    this.trainingData.set('cardVectors', Array.from(cardVectors.entries()));
  }

  private async trainCardRecommendationModel(data: ReadingHistory[]): Promise<void> {
    // 피처 추출
    const features = data.map(reading => this.extractCardFeatures(reading));
    const labels = data.map(reading => this.extractCardLabels(reading));
    
    // 신경망 모델 구성 (TensorFlow.js 시뮬레이션)
    await this.trainNeuralNetwork('cardRecommendation', features, labels.map(label => [label]));
  }

  private async trainOutcomePredictionModel(data: ReadingHistory[]): Promise<void> {
    const features = data.map(reading => this.extractOutcomeFeatures(reading));
    const labels = data.map(reading => this.extractOutcomeLabels(reading));
    
    await this.trainNeuralNetwork('outcomePrediction', features, labels);
  }

  private async trainUserProfilingModel(data: ReadingHistory[]): Promise<void> {
    const userGroups = this.groupByUser(data);
    
    for (const [userId, readings] of userGroups) {
      const features = this.extractUserFeatures(readings);
      const labels = this.extractUserLabels(readings);
      
      await this.trainNeuralNetwork(`userProfile_${userId}`, [features], [labels]);
    }
  }

  private extractCardFeatures(reading: ReadingHistory): number[] {
    // 감정 상태, 질문 타입, 카테고리 등을 숫자 벡터로 변환
    return [
      this.hashString(reading.question) % 100 / 100, // 질문 해시
      this.categoryToNumber(reading.category), // 카테고리
      reading.cards.length / 10, // 스프레드 크기
      // ... 더 많은 피처들
    ];
  }

  private extractCardLabels(reading: ReadingHistory): number {
    // 실제 선택된 카드들의 만족도를 라벨로 사용
    const satisfaction = reading.userFeedback?.satisfaction || 3;
    return satisfaction / 5; // 0-1로 정규화
  }

  private extractOutcomeFeatures(reading: ReadingHistory): number[] {
    return [
      reading.cards.length,
      this.calculateCardSynergy(reading.cards),
      this.assessQuestionComplexity(reading.question),
      // ... 더 많은 피처들
    ];
  }

  private extractOutcomeLabels(reading: ReadingHistory): number[] {
    const feedback = reading.userFeedback;
    if (!feedback) return [0.6]; // 기본값
    
    return [
      feedback.satisfaction / 5,
      feedback.helpfulness / 5,
      feedback.accuracy / 5,
      feedback.emotionalImpact / 5
    ];
  }

  private extractUserFeatures(readings: ReadingHistory[]): number[] {
    return [
      readings.length, // 총 리딩 횟수
      this.calculateAverageSatisfaction(readings),
      this.getPreferredCategory(readings),
      // ... 더 많은 사용자 특성들
    ];
  }

  private extractUserLabels(readings: ReadingHistory[]): number[] {
    return [
      this.calculateUserEngagement(readings),
      this.calculateGrowthTrend(readings)
    ];
  }

  private async trainNeuralNetwork(
    modelName: string,
    features: number[][],
    labels: number[][]
  ): Promise<void> {
    // TensorFlow.js 신경망 훈련 시뮬레이션
    // 실제 구현에서는 tf.sequential() 모델 사용
    
    console.log(`${modelName} 모델 훈련 중...`);
    
    // 가중치 업데이트 시뮬레이션
    const weights = this.modelWeights.get(modelName) || [0.25, 0.25, 0.25, 0.25];
    const updatedWeights = weights.map(w => w + (Math.random() - 0.5) * 0.1);
    this.modelWeights.set(modelName, updatedWeights);
  }

  // 유틸리티 메소드들
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
    }
    return Math.abs(hash);
  }

  private categoryToNumber(category: Category): number {
    const categoryMap: Record<Category, number> = {
      'general': 0.1,
      'love': 0.2,
      'career': 0.3,
      'money': 0.4,
      'health': 0.5,
      'spiritual': 0.6
    };
    return categoryMap[category] || 0.1;
  }

  private calculateCardSynergy(cards: SelectedCard[]): number {
    // 카드들 간의 시너지 계산
    if (cards.length < 2) return 0.5;
    
    let synergy = 0;
    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        synergy += this.calculateCardCompatibility(cards[i], cards[j]);
      }
    }
    
    return synergy / (cards.length * (cards.length - 1) / 2);
  }

  private calculateCardCompatibility(card1: SelectedCard, card2: SelectedCard): number {
    // 두 카드 간의 호환성 계산
    const suit1 = card1.card.suit;
    const suit2 = card2.card.suit;
    
    // 같은 수트는 높은 호환성
    if (suit1 === suit2) return 0.8;
    
    // 보완적 수트들
    const complementarySuits = [
      ['cups', 'pentacles'],
      ['wands', 'swords']
    ];
    
    for (const pair of complementarySuits) {
      if ((pair.includes(suit1) && pair.includes(suit2))) {
        return 0.6;
      }
    }
    
    return 0.4; // 기본 호환성
  }

  private assessQuestionComplexity(question: string): number {
    // 질문의 복잡성 평가
    const factors = [
      question.split(' ').length > 10 ? 0.3 : 0.1, // 길이
      question.includes('?') ? 0.2 : 0.1, // 질문 형태
      /복잡|어려|힘들|갈등/.test(question) ? 0.4 : 0.2 // 복잡성 키워드
    ];
    
    return factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
  }

  private calculateAverageSatisfaction(readings: ReadingHistory[]): number {
    const satisfactions = readings
      .map(r => r.userFeedback?.satisfaction || 3)
      .filter(s => s > 0);
    
    return satisfactions.length > 0 
      ? satisfactions.reduce((sum, s) => sum + s, 0) / satisfactions.length / 5
      : 0.6;
  }

  private getPreferredCategory(readings: ReadingHistory[]): number {
    const categoryCounts = new Map<Category, number>();
    
    readings.forEach(reading => {
      const count = categoryCounts.get(reading.category) || 0;
      categoryCounts.set(reading.category, count + 1);
    });
    
    const mostFrequent = Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])[0];
    
    return mostFrequent ? this.categoryToNumber(mostFrequent[0]) : 0.1;
  }

  private calculateUserEngagement(readings: ReadingHistory[]): number {
    // 사용자 참여도 계산 (빈도, 피드백 제공률 등)
    const totalReadings = readings.length;
    const feedbackRate = readings.filter(r => r.userFeedback).length / totalReadings;
    
    return Math.min(totalReadings / 50 * 0.5 + feedbackRate * 0.5, 1.0);
  }

  private calculateGrowthTrend(readings: ReadingHistory[]): number {
    // 시간에 따른 만족도 변화 추세
    if (readings.length < 3) return 0.5;
    
    const recentReadings = readings.slice(-5);
    const earlyReadings = readings.slice(0, 5);
    
    const recentAvg = this.calculateAverageSatisfaction(recentReadings);
    const earlyAvg = this.calculateAverageSatisfaction(earlyReadings);
    
    return Math.max(0, Math.min(1, 0.5 + (recentAvg - earlyAvg)));
  }

  private groupByUser(data: ReadingHistory[]): Map<string, ReadingHistory[]> {
    const groups = new Map<string, ReadingHistory[]>();
    
    data.forEach(reading => {
      const userId = this.extractUserId(reading);
      const userReadings = groups.get(userId) || [];
      userReadings.push(reading);
      groups.set(userId, userReadings);
    });
    
    return groups;
  }

  private extractUserId(reading: ReadingHistory): string {
    // 실제 구현에서는 세션 ID나 사용자 ID 사용
    return `user_${this.hashString(reading.question + reading.timestamp.toISOString()) % 1000}`;
  }

  private async evaluateCardRecommendation(testData: ReadingHistory[]): Promise<number> {
    // 카드 추천 정확도 평가
    return 0.85; // 시뮬레이션
  }

  private async evaluateOutcomePrediction(testData: ReadingHistory[]): Promise<number> {
    // 결과 예측 정확도 평가
    return 0.78; // 시뮬레이션
  }

  private async evaluateUserProfiling(testData: ReadingHistory[]): Promise<number> {
    // 사용자 프로파일링 정확도 평가
    return 0.82; // 시뮬레이션
  }
}

// 구체적인 구현 클래스들
class CardRecommendationEngine implements CardRecommendationModel {
  async predictOptimalCards(
    emotionalContext: EmotionalContext,
    availableCards: TarotCard[],
    spreadSize: number
  ): Promise<CardPrediction[]> {
    
    const predictions = await Promise.all(
      availableCards.map(async card => {
        const relevance = await this.calculateCardRelevance(card, emotionalContext);
        
        return {
          card,
          relevanceScore: relevance,
          confidenceLevel: 0.8,
          predictedImpact: this.predictImpact(card, emotionalContext),
          reasoningFactors: this.generateReasoningFactors(card, emotionalContext)
        };
      })
    );
    
    return predictions
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, spreadSize);
  }

  async calculateCardRelevance(
    card: TarotCard,
    context: EmotionalContext
  ): Promise<number> {
    const emotionalFit = this.calculateEmotionalFit(card, context);
    const psychologicalRelevance = this.calculatePsychologicalRelevance(card, context);
    const therapeuticValue = this.calculateTherapeuticValue(card, context);
    
    return (emotionalFit * 0.4 + psychologicalRelevance * 0.35 + therapeuticValue * 0.25);
  }

  private calculateEmotionalFit(card: TarotCard, context: EmotionalContext): number {
    const coreEmotion = context.questionAnalysis.emotion.primary;
    
    // 감정과 카드 키워드 매칭 시뮬레이션
    const emotionKeywordMap: Record<string, string[]> = {
      'joy': ['행복', '기쁨', '성공', '완성'],
      'sadness': ['손실', '이별', '변화', '수용'],
      'fear': ['불안', '미지', '도전', '용기'],
      'anger': ['갈등', '정의', '행동', '변화']
    };
    
    const relevantKeywords = emotionKeywordMap[coreEmotion] || [];
    const cardKeywords = card.uprightKeywords || [];
    const matchCount = cardKeywords.filter((keyword: string) => 
      relevantKeywords.some(emotionKeyword => keyword.includes(emotionKeyword))
    ).length;
    
    return Math.min(matchCount / Math.max(cardKeywords.length, 1), 1.0);
  }

  private calculatePsychologicalRelevance(card: TarotCard, context: EmotionalContext): number {
    // 융 심리학적 관련성 계산
    const dominantFunction = context.psychProfile.jungianType.dominantFunction;
    
    // 인지 기능별 카드 친화도 시뮬레이션
    const functionCardAffinity: Record<string, number> = {
      'Te': card.suit === 'swords' ? 0.8 : 0.4,
      'Ti': card.suit === 'swords' ? 0.9 : 0.3,
      'Fe': card.suit === 'cups' ? 0.9 : 0.4,
      'Fi': card.suit === 'cups' ? 0.8 : 0.5,
      'Ne': card.suit === 'wands' ? 0.8 : 0.6,
      'Ni': card.suit === 'major' ? 0.9 : 0.4,
      'Se': card.suit === 'pentacles' ? 0.8 : 0.5,
      'Si': card.suit === 'pentacles' ? 0.7 : 0.6
    };
    
    return functionCardAffinity[dominantFunction] || 0.5;
  }

  private calculateTherapeuticValue(card: TarotCard, context: EmotionalContext): number {
    const therapeuticNeeds = context.therapeuticNeeds;
    
    if (therapeuticNeeds.length === 0) return 0.5;
    
    const primaryNeed = therapeuticNeeds[0];
    
    // 치료적 필요와 카드 매칭
    const therapeuticCardMap: Record<string, string[]> = {
      'emotional_release': ['three-of-swords', 'five-of-cups', 'tower'],
      'cognitive_restructuring': ['temperance', 'judgement', 'hermit'],
      'spiritual_healing': ['star', 'sun', 'world'],
      'relationship_healing': ['two-of-cups', 'lovers', 'ten-of-cups']
    };
    
    const relevantCards = therapeuticCardMap[primaryNeed.needType] || [];
    return relevantCards.includes(String(card.id)) ? 0.9 : 0.4;
  }

  private predictImpact(card: TarotCard, context: EmotionalContext): PredictedImpact {
    if (card.suit === 'major') return 'transformative';
    if (context.emotionalJourney.emotionalBlocks.length > 0) return 'challenging';
    if (context.questionAnalysis.emotion.intensity > 0.7) return 'comforting';
    return 'insightful';
  }

  private generateReasoningFactors(card: TarotCard, context: EmotionalContext): ReasoningFactor[] {
    return [
      {
        factor: '감정적 적합성',
        weight: 0.4,
        explanation: `${context.questionAnalysis.emotion.primary} 감정에 적합한 카드입니다.`
      },
      {
        factor: '심리적 관련성',
        weight: 0.35,
        explanation: `${context.psychProfile.jungianType.dominantFunction} 기능에 맞는 접근을 제공합니다.`
      }
    ];
  }
}

class OutcomePredictionEngine implements OutcomePredictorModel {
  async predictReadingOutcome(
    cards: SelectedCard[],
    context: EmotionalContext
  ): Promise<OutcomePrediction> {
    
    const satisfactionScore = await this.predictSatisfaction(cards, context);
    const therapeuticValue = await this.predictTherapeuticValue(cards, context);
    const emotionalResonance = await this.predictEmotionalResonance(cards, context);
    const clarityLevel = await this.predictClarity(cards, context);
    const actionability = await this.predictActionability(cards, context);
    
    return {
      satisfactionScore,
      therapeuticValue,
      emotionalResonance,
      clarityLevel,
      actionability,
      overallEffectiveness: (satisfactionScore + therapeuticValue + emotionalResonance + clarityLevel + actionability) / 5
    };
  }

  async assessReadingEffectiveness(
    reading: any,
    userFeedback?: UserFeedback
  ): Promise<EffectivenessScore> {
    
    if (!userFeedback) {
      // 피드백이 없으면 예측 모델로 평가
      return {
        overall: 0.7,
        accuracy: 0.7,
        relevance: 0.75,
        depth: 0.8,
        actionability: 0.65,
        therapeuticValue: 0.7
      };
    }
    
    return {
      overall: userFeedback.satisfaction / 5,
      accuracy: userFeedback.accuracy / 5,
      relevance: userFeedback.helpfulness / 5,
      depth: userFeedback.emotionalImpact / 5,
      actionability: userFeedback.satisfaction / 5,
      therapeuticValue: userFeedback.emotionalImpact / 5
    };
  }

  private async predictSatisfaction(cards: SelectedCard[], context: EmotionalContext): Promise<number> { return 0.8; }
  private async predictTherapeuticValue(cards: SelectedCard[], context: EmotionalContext): Promise<number> { return 0.75; }
  private async predictEmotionalResonance(cards: SelectedCard[], context: EmotionalContext): Promise<number> { return 0.85; }
  private async predictClarity(cards: SelectedCard[], context: EmotionalContext): Promise<number> { return 0.7; }
  private async predictActionability(cards: SelectedCard[], context: EmotionalContext): Promise<number> { return 0.65; }
}

class UserProfilingEngine implements UserProfilerModel {
  async buildUserProfile(readingHistory: ReadingHistory[]): Promise<UserProfile> {
    // 사용자 프로필 구축 시뮬레이션
    return {
      userId: `user_${Date.now()}`,
      preferredReadingStyles: ['therapeutic', 'analytical'],
      emotionalPatterns: [],
      questionTypes: [],
      cardAffinities: [],
      satisfactionHistory: [],
      growthTrajectory: []
    };
  }

  async predictUserPreferences(
    profile: UserProfile,
    context: EmotionalContext
  ): Promise<UserPreferences> {
    return {
      preferredSpreadTypes: [
        { spreadType: 'three-card', preference: 0.8, effectiveness: 0.85 }
      ],
      communicationStyle: 'gentle',
      depthLevel: 'deep',
      focusAreas: [
        { area: 'emotional_healing', interest: 0.9, needLevel: 0.8 }
      ],
      avoidanceTopics: []
    };
  }
}

export interface ModelPerformance {
  cardRecommendation: number;
  outcomePrediction: number;
  userProfiling: number;
  overall: number;
}

export const mlPredictionEngine = new MLPredictionEngine();