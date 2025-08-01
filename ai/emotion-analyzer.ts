/**
 * 고급 감정 분석 시스템
 * v2.0 Phase 1.3 - NLP + 심리학 + 타로 통합
 */

import { nlpProcessor, QuestionAnalysis, EmotionType } from './nlp-processor';
import { psychologyAnalyzer, PsychologicalProfile } from './psychology-analyzer';

export interface EmotionalContext {
  questionAnalysis: QuestionAnalysis;
  psychProfile: PsychologicalProfile;
  emotionalJourney: EmotionalJourney;
  therapeuticNeeds: TherapeuticNeed[];
  readingRecommendation: ReadingRecommendation;
}

export interface EmotionalJourney {
  currentState: EmotionalState;
  emotionalBlocks: EmotionalBlock[];
  healingPath: HealingStep[];
  transformationPotential: TransformationArea[];
  energyFlow: EnergyFlowPattern;
}

export interface EmotionalState {
  coreEmotion: EmotionType;
  emotionalIntensity: number; // 0-1
  emotionalClarity: number; // 0-1 (감정의 명확성)
  emotionalStability: number; // 0-1
  underlyingEmotions: UnderlyingEmotion[];
  emotionalConflicts: EmotionalConflict[];
}

export interface EmotionalBlock {
  blockType: BlockType;
  intensity: number;
  source: BlockSource;
  manifestation: string[];
  dissolutionStrategy: string[];
}

export interface HealingStep {
  step: string;
  purpose: string;
  methods: string[];
  expectedOutcome: string;
  timeframe: HealingTimeframe;
}

export interface TransformationArea {
  area: TransformationDomain;
  currentLevel: number;
  potentialLevel: number;
  transformationPath: string[];
  challenges: string[];
}

export interface EnergyFlowPattern {
  flowDirection: EnergyDirection;
  blockages: EnergyBlockage[];
  harmonics: EnergyHarmonic[];
  recommendations: EnergyRecommendation[];
}

export interface TherapeuticNeed {
  needType: TherapeuticType;
  urgency: number; // 0-1
  approach: TherapeuticApproach[];
  expectedBenefit: string;
}

export interface ReadingRecommendation {
  preferredSpread: RecommendedSpread;
  readingApproach: ReadingApproach;
  focusAreas: FocusArea[];
  cautions: string[];
  timing: OptimalTiming;
}

// Types and Enums
export type BlockType = 
  | 'fear_based' | 'trauma_based' | 'belief_based' | 'attachment_based'
  | 'shame_based' | 'anger_based' | 'grief_based' | 'control_based';

export type BlockSource = 
  | 'childhood' | 'relationships' | 'career' | 'family' | 'society'
  | 'spiritual' | 'health' | 'financial' | 'creative' | 'unknown';

export type HealingTimeframe = 'immediate' | 'short_term' | 'medium_term' | 'long_term';

export type TransformationDomain = 
  | 'emotional_intelligence' | 'relationships' | 'self_worth' | 'creativity'
  | 'spiritual_growth' | 'career_fulfillment' | 'physical_health' | 'mental_clarity';

export type EnergyDirection = 'expanding' | 'contracting' | 'stagnant' | 'chaotic' | 'balanced';

export type TherapeuticType = 
  | 'emotional_release' | 'cognitive_restructuring' | 'behavioral_change'
  | 'spiritual_healing' | 'trauma_integration' | 'relationship_healing';

export type RecommendedSpread = 'single' | 'three-card' | 'relationship' | 'celtic-cross';

export type ReadingApproach = 
  | 'gentle_nurturing' | 'direct_honest' | 'analytical_logical' | 'intuitive_mystical'
  | 'therapeutic_healing' | 'empowering_motivational';

export type FocusArea = 
  | 'emotional_healing' | 'relationship_dynamics' | 'career_guidance' | 'spiritual_growth'
  | 'self_discovery' | 'decision_making' | 'trauma_integration' | 'creative_expression';

export type OptimalTiming = 'immediate' | 'within_week' | 'within_month' | 'seasonal';

export interface UnderlyingEmotion {
  emotion: EmotionType;
  intensity: number;
  hiddenReason: string;
}

export interface EmotionalConflict {
  primaryEmotion: EmotionType;
  conflictingEmotion: EmotionType;
  conflictSource: string;
  resolutionPath: string;
}

export interface EnergyBlockage {
  location: EnergyCenter;
  severity: number;
  symptoms: string[];
  clearingMethods: string[];
}

export interface EnergyHarmonic {
  frequency: EnergyFrequency;
  resonance: number;
  effects: string[];
}

export interface EnergyRecommendation {
  practice: string;
  duration: string;
  expectedResult: string;
}

export interface TherapeuticApproach {
  method: string;
  description: string;
  effectiveness: number;
}

export type EnergyCenter = 
  | 'root' | 'sacral' | 'solar_plexus' | 'heart' | 'throat' | 'third_eye' | 'crown';

export type EnergyFrequency = 'low' | 'medium' | 'high' | 'very_high';

/**
 * 고급 감정 분석기 클래스
 */
export class AdvancedEmotionAnalyzer {
  
  /**
   * 종합적인 감정 분석 수행
   */
  public async analyzeEmotionalContext(
    question: string,
    category: string = 'general'
  ): Promise<EmotionalContext> {
    
    // 1. NLP 분석
    const questionAnalysis = await nlpProcessor.analyzeQuestion(question);
    
    // 2. 심리 프로파일링
    const psychProfile = await psychologyAnalyzer.analyzePsychology(
      questionAnalysis, 
      question
    );
    
    // 3. 감정 여정 매핑
    const emotionalJourney = await this.mapEmotionalJourney(
      questionAnalysis, 
      psychProfile
    );
    
    // 4. 치료적 필요 분석
    const therapeuticNeeds = await this.assessTherapeuticNeeds(
      questionAnalysis,
      psychProfile,
      emotionalJourney
    );
    
    // 5. 리딩 추천
    const readingRecommendation = await this.generateReadingRecommendation(
      questionAnalysis,
      psychProfile,
      emotionalJourney,
      category
    );
    
    return {
      questionAnalysis,
      psychProfile,
      emotionalJourney,
      therapeuticNeeds,
      readingRecommendation
    };
  }

  /**
   * 감정 여정 매핑
   */
  private async mapEmotionalJourney(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): Promise<EmotionalJourney> {
    
    const currentState = await this.analyzeCurrentEmotionalState(analysis, profile);
    const emotionalBlocks = await this.identifyEmotionalBlocks(analysis, profile);
    const healingPath = await this.designHealingPath(currentState, emotionalBlocks);
    const transformationPotential = await this.assessTransformationPotential(profile);
    const energyFlow = await this.analyzeEnergyFlow(analysis, profile);
    
    return {
      currentState,
      emotionalBlocks,
      healingPath,
      transformationPotential,
      energyFlow
    };
  }

  /**
   * 현재 감정 상태 분석
   */
  private async analyzeCurrentEmotionalState(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): Promise<EmotionalState> {
    
    const coreEmotion = analysis.emotion.primary;
    const emotionalIntensity = analysis.emotion.intensity;
    const emotionalClarity = this.calculateEmotionalClarity(analysis);  
    const emotionalStability = analysis.emotion.stability;
    
    const underlyingEmotions = await this.identifyUnderlyingEmotions(analysis, profile);
    const emotionalConflicts = await this.identifyEmotionalConflicts(underlyingEmotions);
    
    return {
      coreEmotion,
      emotionalIntensity,
      emotionalClarity,
      emotionalStability,
      underlyingEmotions,
      emotionalConflicts
    };
  }

  /**
   * 감정 블록 식별
   */
  private async identifyEmotionalBlocks(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): Promise<EmotionalBlock[]> {
    
    const blocks: EmotionalBlock[] = [];
    
    // 방어 메커니즘 기반 블록 분석
    for (const defense of profile.defenseStrategies) {
      if (defense.frequency > 0.3) {
        const block = await this.convertDefenseToBlock(defense, analysis);
        blocks.push(block);
      }
    }
    
    // 스트레스 패턴 기반 블록 분석
    const stressBlocks = await this.analyzeStressBasedBlocks(profile.stressSignature);
    blocks.push(...stressBlocks);
    
    // 그림자 기반 숨겨진 블록
    const shadowBlocks = await this.analyzeShadowBlocks(profile.shadow);
    blocks.push(...shadowBlocks);
    
    return blocks.sort((a, b) => b.intensity - a.intensity);
  }

  /**
   * 힐링 경로 설계
   */
  private async designHealingPath(
    currentState: EmotionalState,
    blocks: EmotionalBlock[]
  ): Promise<HealingStep[]> {
    
    const healingSteps: HealingStep[] = [];
    
    // 1단계: 감정 인식 및 수용
    if (currentState.emotionalClarity < 0.7) {
      healingSteps.push({
        step: '감정 인식과 수용',
        purpose: '현재 감정 상태를 명확히 인식하고 수용하기',
        methods: [
          '마음챙김 명상',
          '감정 일기 작성',
          '바디 스캐닝',
          '감정 명명하기 연습'
        ],
        expectedOutcome: '감정에 대한 명확성과 수용력 향상',
        timeframe: 'short_term'
      });
    }
    
    // 2단계: 주요 블록 해소
    const primaryBlocks = blocks.slice(0, 2);
    for (const block of primaryBlocks) {
      healingSteps.push({
        step: `${block.blockType} 블록 해소`,
        purpose: `${block.source} 영역의 감정적 장애물 제거`,
        methods: block.dissolutionStrategy,
        expectedOutcome: '해당 영역의 에너지 흐름 개선',
        timeframe: this.determineHealingTimeframe(block.intensity)
      });
    }
    
    // 3단계: 감정 통합 및 균형
    if (currentState.emotionalConflicts.length > 0) {
      healingSteps.push({
        step: '감정 통합과 균형',
        purpose: '상충하는 감정들을 조화롭게 통합',
        methods: [
          '내면 대화 기법',
          '감정 균형 명상',
          '창작 활동을 통한 표현',
          '전문가 상담'
        ],
        expectedOutcome: '내면의 갈등 해소 및 감정적 균형 달성',
        timeframe: 'medium_term'
      });
    }
    
    return healingSteps;
  }

  /**
   * 변화 잠재력 평가
   */
  private async assessTransformationPotential(
    profile: PsychologicalProfile
  ): Promise<TransformationArea[]> {
    
    const areas: TransformationArea[] = [];
    
    // 감정 지능 영역
    const eqScore = profile.emotionalPattern.emotionalIntelligence;
    areas.push({
      area: 'emotional_intelligence',
      currentLevel: (eqScore.selfAwareness + eqScore.selfRegulation) / 2,
      potentialLevel: Math.min(1.0, ((eqScore.selfAwareness + eqScore.selfRegulation) / 2) + 0.3),
      transformationPath: [
        '자기 인식 능력 향상',
        '감정 조절 기술 습득',  
        '타인 감정 이해력 증진',
        '사회적 기술 발전'
      ],
      challenges: [
        '기존 패턴 극복의 어려움',
        '일관된 실천의 필요성',
        '사회적 압력과 기대'
      ]
    });
    
    // 관계 영역
    const relatednessNeed = profile.psychologicalNeeds.find(n => n.need === 'relatedness');
    if (relatednessNeed) {
      areas.push({
        area: 'relationships',
        currentLevel: relatednessNeed.satisfaction,
        potentialLevel: Math.min(1.0, relatednessNeed.satisfaction + 0.4),
        transformationPath: [
          '의사소통 기술 향상',
          '경계 설정 능력 개발',
          '친밀감 형성 능력 증진',
          '갈등 해결 기술 습득'
        ],
        challenges: [
          '과거 관계 상처 치유',
          '신뢰 구축의 어려움',
          '취약성 노출에 대한 두려움'
        ]
      });
    }
    
    return areas;
  }

  /**
   * 에너지 흐름 분석
   */
  private async analyzeEnergyFlow(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): Promise<EnergyFlowPattern> {
    
    const flowDirection = this.determineEnergyDirection(analysis, profile);
    const blockages = await this.identifyEnergyBlockages(profile);
    const harmonics = await this.analyzeEnergyHarmonics(analysis);
    const recommendations = await this.generateEnergyRecommendations(flowDirection, blockages);
    
    return {
      flowDirection,
      blockages,
      harmonics,
      recommendations
    };
  }

  /**
   * 치료적 필요 평가
   */
  private async assessTherapeuticNeeds(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile,
    journey: EmotionalJourney
  ): Promise<TherapeuticNeed[]> {
    
    const needs: TherapeuticNeed[] = [];
    
    // 감정 해방의 필요성
    if (journey.currentState.emotionalIntensity > 0.7 && 
        journey.currentState.emotionalStability < 0.5) {
      needs.push({
        needType: 'emotional_release',
        urgency: 0.8,
        approach: [
          {
            method: '감정 해방 기법',
            description: '억압된 감정을 안전하게 표출하고 해소',
            effectiveness: 0.85
          },
          {
            method: '호흡 치료',
            description: '깊은 호흡을 통한 감정 조절과 안정',
            effectiveness: 0.75
          }
        ],
        expectedBenefit: '감정적 부담 경감 및 내면 평화 증진'
      });
    }
    
    // 인지 재구조화의 필요성
    const negativeThoughts = profile.defenseStrategies
      .filter(d => ['rationalization', 'denial'].includes(d.mechanism))
      .reduce((sum, d) => sum + d.frequency, 0);
    
    if (negativeThoughts > 0.5) {
      needs.push({
        needType: 'cognitive_restructuring',
        urgency: 0.6,
        approach: [
          {
            method: '인지행동치료 기법',
            description: '부정적 사고 패턴 인식 및 개선',
            effectiveness: 0.8
          },
          {
            method: '리프레이밍 연습',
            description: '상황을 다양한 관점에서 재해석',
            effectiveness: 0.7
          }
        ],
        expectedBenefit: '현실적이고 균형잡힌 사고방식 확립'
      });
    }
    
    return needs.sort((a, b) => b.urgency - a.urgency);
  }

  /**
   * 리딩 추천 생성
   */
  private async generateReadingRecommendation(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile,
    journey: EmotionalJourney,
    category: string
  ): Promise<ReadingRecommendation> {
    
    const preferredSpread = this.recommendSpreadType(analysis, profile);
    const readingApproach = this.determineReadingApproach(profile, journey);
    const focusAreas = this.identifyFocusAreas(analysis, journey);
    const cautions = this.generateCautions(profile, journey);
    const timing = this.determineOptimalTiming(analysis, profile);
    
    return {
      preferredSpread,
      readingApproach,
      focusAreas,
      cautions,
      timing
    };
  }

  // ===== 헬퍼 메소드들 =====

  private calculateEmotionalClarity(analysis: QuestionAnalysis): number {
    // 감정의 명확성 = 주감정 강도 + 복잡성 역수 + 일관성
    const primaryIntensity = analysis.emotion.intensity;
    const complexityFactor = analysis.complexity === 'simple' ? 1.0 : 
                            analysis.complexity === 'moderate' ? 0.8 :
                            analysis.complexity === 'complex' ? 0.6 : 0.4;
    const stabilityFactor = analysis.emotion.stability;
    
    return (primaryIntensity + complexityFactor + stabilityFactor) / 3;
  }

  private async identifyUnderlyingEmotions(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): Promise<UnderlyingEmotion[]> {
    
    const underlying: UnderlyingEmotion[] = [];
    
    // 그림자 감정 분석
    if (profile.shadow.repressedAspects.length > 0) {
      underlying.push({
        emotion: 'fear',
        intensity: 0.6,
        hiddenReason: '인정받지 못할 것에 대한 두려움'
      });
    }
    
    // 방어 메커니즘 기반 숨겨진 감정
    for (const defense of profile.defenseStrategies) {
      if (defense.mechanism === 'projection' && defense.frequency > 0.4) {
        underlying.push({
          emotion: 'anger',
          intensity: defense.frequency,
          hiddenReason: '자신의 부정적 측면 투사'
        });
      }
    }
    
    return underlying;
  }

  private async identifyEmotionalConflicts(
    underlyingEmotions: UnderlyingEmotion[]
  ): Promise<EmotionalConflict[]> {
    
    const conflicts: EmotionalConflict[] = [];
    
    // 상반된 감정 쌍 찾기
    const emotionPairs = [
      ['joy', 'sadness'],
      ['love', 'anger'], 
      ['hope', 'fear'],
      ['excitement', 'anxiety']
    ];
    
    for (const [emotion1, emotion2] of emotionPairs) {
      const hasEmotion1 = underlyingEmotions.find(e => e.emotion === emotion1);
      const hasEmotion2 = underlyingEmotions.find(e => e.emotion === emotion2);
      
      if (hasEmotion1 && hasEmotion2) {
        conflicts.push({
          primaryEmotion: emotion1 as EmotionType,
          conflictingEmotion: emotion2 as EmotionType,
          conflictSource: '내면의 양가감정',
          resolutionPath: '감정 통합과 수용을 통한 조화'
        });
      }
    }
    
    return conflicts;
  }

  private async convertDefenseToBlock(
    defense: any,
    analysis: QuestionAnalysis
  ): Promise<EmotionalBlock> {
    
    const blockTypeMap: Record<string, BlockType> = {
      'denial': 'fear_based',
      'projection': 'shame_based',
      'rationalization': 'control_based',
      'displacement': 'anger_based',
      'sublimation': 'attachment_based'
    };
    
    return {
      blockType: blockTypeMap[defense.mechanism] || 'fear_based',
      intensity: defense.frequency,
      source: this.determineBlockSource(analysis),
      manifestation: defense.context,
      dissolutionStrategy: this.generateDissolutionStrategy(defense.mechanism)
    };
  }

  private determineBlockSource(analysis: QuestionAnalysis): BlockSource {
    if (analysis.intent.category === 'relationships') return 'relationships';
    if (analysis.intent.category === 'career') return 'career';
    if (analysis.intent.category === 'family') return 'family';
    return 'unknown';
  }

  private generateDissolutionStrategy(mechanism: string): string[] {
    const strategies: Record<string, string[]> = {
      'denial': ['현실 인정', '점진적 노출', '지지적 환경 조성'],
      'projection': ['자기 성찰', '책임감 회복', '타인 관점 이해'],
      'rationalization': ['감정 인정', '진정한 동기 탐색', '정직한 자기 대면'],
      'displacement': ['직접적 표현', '분노 관리', '건설적 소통'],
      'sublimation': ['창조적 표현', '건강한 승화', '균형잡힌 접근']
    };
    
    return strategies[mechanism] || ['전문가 상담', '치료적 접근'];
  }

  private determineHealingTimeframe(intensity: number): HealingTimeframe {
    if (intensity < 0.3) return 'short_term';
    if (intensity < 0.6) return 'medium_term';
    return 'long_term';
  }

  private determineEnergyDirection(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): EnergyDirection {
    if (analysis.emotion.progression === 'escalating') return 'expanding';
    if (analysis.emotion.progression === 'diminishing') return 'contracting';
    if (analysis.emotion.progression === 'fluctuating') return 'chaotic';
    if (analysis.emotion.stability > 0.7) return 'balanced';
    return 'stagnant';
  }

  private recommendSpreadType(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): RecommendedSpread {
    if (analysis.intent.category === 'relationships') return 'relationship';
    if (analysis.complexity === 'multi_layered') return 'celtic-cross';
    if (analysis.complexity === 'complex') return 'three-card';
    return 'single';
  }

  private determineReadingApproach(
    profile: PsychologicalProfile,
    journey: EmotionalJourney
  ): ReadingApproach {
    if (journey.currentState.emotionalStability < 0.4) return 'gentle_nurturing';
    if (profile.mentalFramework.thinkingStyle === 'analytical') return 'analytical_logical';
    if (profile.archetypes.some(a => a.archetype === 'sage')) return 'intuitive_mystical';
    return 'therapeutic_healing';
  }

  private identifyFocusAreas(
    analysis: QuestionAnalysis,
    journey: EmotionalJourney
  ): FocusArea[] {
    const areas: FocusArea[] = [];
    
    if (journey.emotionalBlocks.length > 0) areas.push('emotional_healing');
    if (analysis.intent.category === 'relationships') areas.push('relationship_dynamics');
    if (analysis.intent.category === 'career') areas.push('career_guidance');
    if (journey.transformationPotential.length > 0) areas.push('self_discovery');
    
    return areas;
  }

  private generateCautions(
    profile: PsychologicalProfile,
    journey: EmotionalJourney
  ): string[] {
    const cautions: string[] = [];
    
    if (journey.currentState.emotionalIntensity > 0.8) {
      cautions.push('감정적으로 민감한 상태이므로 부드러운 접근이 필요합니다');
    }
    
    if (profile.stressSignature.burnoutRisk === 'high') {
      cautions.push('번아웃 위험이 높으므로 휴식과 자기돌봄을 우선시하세요');
    }
    
    return cautions;
  }

  private determineOptimalTiming(
    analysis: QuestionAnalysis,
    profile: PsychologicalProfile
  ): OptimalTiming {
    if (analysis.urgency === 'critical') return 'immediate';
    if (analysis.urgency === 'high') return 'within_week';
    if (analysis.urgency === 'medium') return 'within_month';
    return 'seasonal';
  }

  // Placeholder methods for complex analysis functions
  private async analyzeStressBasedBlocks(stressSignature: any): Promise<EmotionalBlock[]> { return []; }
  private async analyzeShadowBlocks(shadow: any): Promise<EmotionalBlock[]> { return []; }
  private async identifyEnergyBlockages(profile: PsychologicalProfile): Promise<EnergyBlockage[]> { return []; }
  private async analyzeEnergyHarmonics(analysis: QuestionAnalysis): Promise<EnergyHarmonic[]> { return []; }
  private async generateEnergyRecommendations(direction: EnergyDirection, blockages: EnergyBlockage[]): Promise<EnergyRecommendation[]> { return []; }
}

export const emotionAnalyzer = new AdvancedEmotionAnalyzer();