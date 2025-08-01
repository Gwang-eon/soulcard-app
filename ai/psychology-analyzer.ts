/**
 * 고급 심리 분석기
 * v2.0 Phase 1.2 - 융 심리학 + 현대 심리학 기반
 */

import { QuestionAnalysis, EmotionType, PersonalityTrait } from './nlp-processor';

export interface PsychologicalProfile {
  jungianType: JungianType;
  cognitiveFunction: CognitiveFunctionStack;
  emotionalPattern: EmotionalPattern;
  stressSignature: StressSignature;
  growthStage: GrowthStage;
  defenseStrategies: DefenseStrategy[];
  mentalFramework: MentalFramework;
  psychologicalNeeds: PsychologicalNeed[];
  archetypes: ActivatedArchetype[];
  shadow: ShadowAnalysis;
}

export interface JungianType {
  attitude: 'extraversion' | 'introversion';
  dominantFunction: CognitiveFunction;
  auxiliaryFunction: CognitiveFunction;
  tertiaryFunction: CognitiveFunction;
  inferiorFunction: CognitiveFunction;
  confidence: number;
}

export interface CognitiveFunctionStack {
  dominant: CognitiveFunctionInfo;
  auxiliary: CognitiveFunctionInfo;
  tertiary: CognitiveFunctionInfo;
  inferior: CognitiveFunctionInfo;
}

export interface CognitiveFunctionInfo {
  function: CognitiveFunction;
  development: DevelopmentLevel;
  stress: StressLevel;
  expression: ExpressionMode;
}

export interface EmotionalPattern {
  primaryStyle: EmotionalStyle;
  regulationStrategy: RegulationStrategy;
  expressionPattern: ExpressionPattern;
  triggers: EmotionalTrigger[];
  resilience: ResilienceLevel;
  emotionalIntelligence: EQScore;
}

export interface StressSignature {
  stressors: Stressor[];
  responses: StressResponse[];
  copingMechanisms: CopingMechanism[];
  burnoutRisk: BurnoutRisk;
  recovery: RecoveryPattern;
}

export interface DefenseStrategy {
  mechanism: DefenseMechanism;
  frequency: number;
  effectiveness: number;
  context: string[];
}

export interface MentalFramework {
  thinkingStyle: ThinkingStyle;
  decisionMaking: DecisionMakingStyle;
  problemSolving: ProblemSolvingApproach;
  worldview: Worldview;
  valuesSystem: ValueSystem;
}

export interface PsychologicalNeed {
  need: NeedType;
  intensity: number;
  satisfaction: number;
  fulfillmentPath: string[];
}

export interface ActivatedArchetype {
  archetype: JungianArchetype;
  activation: number;
  expression: ArchetypeExpression;
  integration: IntegrationLevel;
}

export interface ShadowAnalysis {
  projectedTraits: string[];
  repressedAspects: string[];
  integrationOpportunities: string[];
  shadowWork: ShadowWorkArea[];
}

// Types and Enums
export type CognitiveFunction = 
  | 'Te' | 'Ti' | 'Fe' | 'Fi' | 'Ne' | 'Ni' | 'Se' | 'Si';

export type EmotionalStyle = 
  | 'expressive' | 'controlled' | 'reactive' | 'stable' | 'volatile';

export type RegulationStrategy = 
  | 'suppression' | 'reappraisal' | 'expression' | 'avoidance' | 'acceptance';

export type DefenseMechanism = 
  | 'denial' | 'projection' | 'rationalization' | 'displacement' | 'sublimation'
  | 'intellectualization' | 'reaction_formation' | 'regression' | 'repression';

export type JungianArchetype = 
  | 'innocent' | 'explorer' | 'sage' | 'hero' | 'outlaw' | 'magician'
  | 'regular_guy' | 'lover' | 'jester' | 'caregiver' | 'creator' | 'ruler';

export type ThinkingStyle = 
  | 'analytical' | 'intuitive' | 'practical' | 'creative' | 'systematic';

export type GrowthStage = 
  | 'survival' | 'conformity' | 'achievement' | 'authenticity' | 'integration' | 'service';

export type DevelopmentLevel = 'underdeveloped' | 'developing' | 'mature' | 'refined';
export type StressLevel = 'low' | 'moderate' | 'high' | 'critical';
export type ExpressionMode = 'healthy' | 'stressed' | 'grip';
export type ResilienceLevel = 'low' | 'moderate' | 'high' | 'exceptional';
export type BurnoutRisk = 'low' | 'moderate' | 'high' | 'critical';

/**
 * 고급 심리 분석기 클래스
 */
export class AdvancedPsychologyAnalyzer {
  private readonly functionIndicators: Map<CognitiveFunction, string[]>;
  private readonly archetypePatterns: Map<JungianArchetype, RegExp[]>;
  private readonly defensePatterns: Map<DefenseMechanism, RegExp[]>;
  private readonly stressIndicators: Map<string, StressLevel>;

  constructor() {
    this.functionIndicators = this.initializeFunctionIndicators();
    this.archetypePatterns = this.initializeArchetypePatterns();
    this.defensePatterns = this.initializeDefensePatterns();
    this.stressIndicators = this.initializeStressIndicators();
  }

  /**
   * 종합 심리 분석
   */
  public async analyzePsychology(
    nlpAnalysis: QuestionAnalysis, 
    questionText: string
  ): Promise<PsychologicalProfile> {
    
    const [
      jungianType,
      emotionalPattern,
      stressSignature,
      defenseStrategies,
      mentalFramework,
      psychologicalNeeds,
      archetypes,
      shadow
    ] = await Promise.all([
      this.analyzeJungianType(nlpAnalysis, questionText),
      this.analyzeEmotionalPattern(nlpAnalysis, questionText),
      this.analyzeStressSignature(nlpAnalysis, questionText),
      this.analyzeDefenseStrategies(questionText),
      this.analyzeMentalFramework(nlpAnalysis, questionText),
      this.analyzePsychologicalNeeds(nlpAnalysis, questionText),
      this.analyzeArchetypes(questionText),
      this.analyzeShadow(nlpAnalysis, questionText)
    ]);

    const cognitiveFunction = this.buildCognitiveFunctionStack(jungianType);
    const growthStage = this.identifyGrowthStage(nlpAnalysis, psychologicalNeeds);

    return {
      jungianType,
      cognitiveFunction,
      emotionalPattern,
      stressSignature,
      growthStage,
      defenseStrategies,
      mentalFramework,
      psychologicalNeeds,
      archetypes,
      shadow
    };
  }

  /**
   * 융 심리학적 성격 유형 분석
   */
  private async analyzeJungianType(
    nlpAnalysis: QuestionAnalysis, 
    text: string
  ): Promise<JungianType> {
    
    // 인지 기능 점수 계산
    const functionScores = new Map<CognitiveFunction, number>();
    
    for (const [func, indicators] of this.functionIndicators) {
      let score = 0;
      for (const indicator of indicators) {
        if (text.toLowerCase().includes(indicator)) {
          score += 0.1;
        }
      }
      if (score > 0) {
        functionScores.set(func, score);
      }
    }

    // 성격 마커를 통한 추가 분석
    const personalityInfluence = this.analyzePersonalityMarkers(nlpAnalysis.personalityMarkers);
    for (const [func, bonus] of personalityInfluence) {
      const current = functionScores.get(func) || 0;
      functionScores.set(func, current + bonus);
    }

    // 상위 4개 기능 추출
    const sortedFunctions = Array.from(functionScores.entries())
      .sort((a, b) => b[1] - a[1]);

    const dominantFunction = sortedFunctions[0]?.[0] || 'Ni';
    const auxiliaryFunction = sortedFunctions[1]?.[0] || 'Fe';
    const tertiaryFunction = sortedFunctions[2]?.[0] || 'Ti';
    const inferiorFunction = sortedFunctions[3]?.[0] || 'Se';

    // 태도 결정 (외향성/내향성)
    const attitude = this.determineAttitude(nlpAnalysis, dominantFunction);
    
    const confidence = Math.min(
      (sortedFunctions[0]?.[1] || 0) + 
      (sortedFunctions[1]?.[1] || 0), 
      1.0
    );

    return {
      attitude,
      dominantFunction,
      auxiliaryFunction,
      tertiaryFunction,
      inferiorFunction,
      confidence
    };
  }

  /**
   * 감정 패턴 분석
   */
  private async analyzeEmotionalPattern(
    nlpAnalysis: QuestionAnalysis, 
    text: string
  ): Promise<EmotionalPattern> {
    
    const emotionState = nlpAnalysis.emotion;
    
    // 감정 스타일 결정
    const primaryStyle = this.determineEmotionalStyle(emotionState, text);
    
    // 조절 전략
    const regulationStrategy = this.identifyRegulationStrategy(text);
    
    // 표현 패턴
    const expressionPattern = this.analyzeExpressionPattern(text);
    
    // 감정 트리거
    const triggers = this.identifyEmotionalTriggers(text);
    
    // 회복력
    const resilience = this.assessResilience(text, emotionState);
    
    // 감정 지능
    const emotionalIntelligence = this.assessEmotionalIntelligence(nlpAnalysis);

    return {
      primaryStyle,
      regulationStrategy,
      expressionPattern,
      triggers,
      resilience,
      emotionalIntelligence
    };
  }

  /**
   * 스트레스 패턴 분석
   */
  private async analyzeStressSignature(
    nlpAnalysis: QuestionAnalysis, 
    text: string
  ): Promise<StressSignature> {
    
    // 스트레스 요인 식별
    const stressors = this.identifyStressors(text);
    
    // 스트레스 반응
    const responses = this.analyzeStressResponses(text, nlpAnalysis.emotion);
    
    // 대처 메커니즘
    const copingMechanisms = this.identifyCopingMechanisms(text);
    
    // 번아웃 위험도
    const burnoutRisk = this.assessBurnoutRisk(nlpAnalysis, text);
    
    // 회복 패턴
    const recovery = this.analyzeRecoveryPattern(text);

    return {
      stressors,
      responses,
      copingMechanisms,
      burnoutRisk,
      recovery
    };
  }

  /**
   * 방어 전략 분석
   */
  private async analyzeDefenseStrategies(text: string): Promise<DefenseStrategy[]> {
    const strategies: DefenseStrategy[] = [];

    for (const [mechanism, patterns] of this.defensePatterns) {
      let frequency = 0;
      const contexts: string[] = [];

      for (const pattern of patterns) {
        const matches = text.match(pattern);
        if (matches) {
          frequency += matches.length;
          contexts.push(...matches);
        }
      }

      if (frequency > 0) {
        strategies.push({
          mechanism,
          frequency: Math.min(frequency * 0.2, 1.0),
          effectiveness: this.assessDefenseEffectiveness(mechanism, text),
          context: contexts.slice(0, 3) // 상위 3개만
        });
      }
    }

    return strategies.sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * 정신적 프레임워크 분석
   */
  private async analyzeMentalFramework(
    nlpAnalysis: QuestionAnalysis, 
    text: string
  ): Promise<MentalFramework> {
    
    const thinkingStyle = this.identifyThinkingStyle(nlpAnalysis, text);
    const decisionMaking = this.analyzeDecisionMakingStyle(text);
    const problemSolving = this.analyzeProblemSolvingApproach(text);
    const worldview = this.assessWorldview(text);
    const valuesSystem = this.identifyValueSystem(text);

    return {
      thinkingStyle,
      decisionMaking,
      problemSolving,
      worldview,
      valuesSystem
    };
  }

  /**
   * 심리적 욕구 분석
   */
  private async analyzePsychologicalNeeds(
    nlpAnalysis: QuestionAnalysis, 
    text: string
  ): Promise<PsychologicalNeed[]> {
    
    const needPatterns = {
      'autonomy': ['자유', '독립', '선택', '결정', '통제'],
      'competence': ['성취', '성공', '능력', '실력', '발전'],
      'relatedness': ['관계', '사랑', '소속', '연결', '이해'],
      'security': ['안전', '안정', '보장', '확실', '예측'],
      'meaning': ['의미', '목적', '가치', '이유', '방향'],
      'recognition': ['인정', '승인', '칭찬', '존중', '평가'],
      'growth': ['성장', '발달', '학습', '변화', '진보'],
      'beauty': ['아름다', '예술', '창조', '조화', '완벽']
    };

    const needs: PsychologicalNeed[] = [];

    for (const [needType, keywords] of Object.entries(needPatterns)) {
      let intensity = 0;
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          intensity += 0.2;
        }
      }

      if (intensity > 0) {
        const satisfaction = this.assessNeedSatisfaction(needType, text);
        const fulfillmentPath = this.suggestFulfillmentPath(needType as NeedType);
        
        needs.push({
          need: needType as NeedType,
          intensity: Math.min(intensity, 1.0),
          satisfaction,
          fulfillmentPath
        });
      }
    }

    return needs.sort((a, b) => b.intensity - a.intensity);
  }

  /**
   * 원형 분석
   */
  private async analyzeArchetypes(text: string): Promise<ActivatedArchetype[]> {
    const archetypes: ActivatedArchetype[] = [];

    for (const [archetype, patterns] of this.archetypePatterns) {
      let activation = 0;
      
      for (const pattern of patterns) {
        const matches = text.match(pattern);
        if (matches) {
          activation += matches.length * 0.15;
        }
      }

      if (activation > 0) {
        archetypes.push({
          archetype,
          activation: Math.min(activation, 1.0),
          expression: this.analyzeArchetypeExpression(archetype, text),
          integration: this.assessArchetypeIntegration(archetype, activation)
        });
      }
    }

    return archetypes
      .sort((a, b) => b.activation - a.activation)
      .slice(0, 5); // 상위 5개
  }

  /**
   * 그림자 분석
   */
  private async analyzeShadow(
    nlpAnalysis: QuestionAnalysis, 
    text: string
  ): Promise<ShadowAnalysis> {
    
    // 투사된 특성 (타인을 비판하는 내용)
    const projectedTraits = this.identifyProjectedTraits(text);
    
    // 억압된 측면 (회피하는 주제들)
    const repressedAspects = this.identifyRepressedAspects(text, nlpAnalysis);
    
    // 통합 기회
    const integrationOpportunities = this.identifyIntegrationOpportunities(
      projectedTraits, 
      repressedAspects
    );
    
    // 그림자 작업 영역
    const shadowWork = this.suggestShadowWork(projectedTraits, repressedAspects);

    return {
      projectedTraits,
      repressedAspects,
      integrationOpportunities,
      shadowWork
    };
  }

  // ===== 헬퍼 메소드들 =====

  private buildCognitiveFunctionStack(jungianType: JungianType): CognitiveFunctionStack {
    return {
      dominant: {
        function: jungianType.dominantFunction,
        development: 'mature',
        stress: 'low',
        expression: 'healthy'
      },
      auxiliary: {
        function: jungianType.auxiliaryFunction,
        development: 'developing',
        stress: 'low',
        expression: 'healthy'
      },
      tertiary: {
        function: jungianType.tertiaryFunction,
        development: 'developing',
        stress: 'moderate',
        expression: 'healthy'
      },
      inferior: {
        function: jungianType.inferiorFunction,
        development: 'underdeveloped',
        stress: 'high',
        expression: 'stressed'
      }
    };
  }

  private analyzePersonalityMarkers(markers: any[]): Map<CognitiveFunction, number> {
    const influence = new Map<CognitiveFunction, number>();
    
    // 성격 마커를 인지 기능으로 매핑
    const markerMapping = {
      'analytical': ['Ti', 'Te'],
      'intuitive': ['Ni', 'Ne'],
      'openness': ['Ne', 'Ni'],
      'conscientiousness': ['Te', 'Si'],
      'extraversion': ['Fe', 'Se', 'Te', 'Ne'],
      'agreeableness': ['Fe', 'Fi']
    };

    for (const marker of markers) {
      const functions = markerMapping[marker.trait as keyof typeof markerMapping];
      if (functions) {
        for (const func of functions) {
          const current = influence.get(func as CognitiveFunction) || 0;
          influence.set(func as CognitiveFunction, current + marker.strength * 0.1);
        }
      }
    }

    return influence;
  }

  private determineAttitude(
    nlpAnalysis: QuestionAnalysis, 
    dominantFunction: CognitiveFunction
  ): 'extraversion' | 'introversion' {
    // 외향 기능: Fe, Te, Se, Ne
    const extrovertedFunctions = ['Fe', 'Te', 'Se', 'Ne'];
    
    if (extrovertedFunctions.includes(dominantFunction)) {
      return 'extraversion';
    }
    return 'introversion';
  }

  private identifyGrowthStage(
    nlpAnalysis: QuestionAnalysis,
    needs: PsychologicalNeed[]
  ): GrowthStage {
    // 욕구 패턴을 통한 발달 단계 추정
    const securityNeeds = needs.find(n => n.need === 'security')?.intensity || 0;
    const autonomyNeeds = needs.find(n => n.need === 'autonomy')?.intensity || 0;
    const meaningNeeds = needs.find(n => n.need === 'meaning')?.intensity || 0;
    
    if (securityNeeds > 0.7) return 'survival';
    if (autonomyNeeds > meaningNeeds) return 'achievement';
    if (meaningNeeds > 0.6) return 'authenticity';
    return 'conformity';
  }

  // 패턴 초기화 메소드들
  private initializeFunctionIndicators(): Map<CognitiveFunction, string[]> {
    return new Map([
      ['Te', ['효율', '체계', '목표', '결과', '성과', '계획', '조직']],
      ['Ti', ['논리', '분석', '이해', '원리', '체계적', '정확', '일관성']],
      ['Fe', ['사람들', '조화', '분위기', '배려', '감정', '관계', '협력']],
      ['Fi', ['가치', '진실', '진정성', '개인적', '신념', '윤리', '의미']],
      ['Ne', ['가능성', '아이디어', '창의', '연결', '패턴', '새로운', '영감']],
      ['Ni', ['통찰', '직감', '미래', '비전', '깊이', '복잡성', '의미']],
      ['Se', ['현재', '경험', '감각', '실제', '활동', '변화', '즉시']],
      ['Si', ['과거', '경험', '안정', '전통', '세부사항', '비교', '익숙']]
    ]);
  }

  private initializeArchetypePatterns(): Map<JungianArchetype, RegExp[]> {
    return new Map([
      ['hero', [/도전|극복|싸움|용기|승리|영웅/gi]],
      ['sage', [/지혜|배움|이해|진리|지식|깨달음/gi]],
      ['innocent', [/순수|행복|희망|신뢰|낙관|단순/gi]],
      ['explorer', [/모험|탐험|자유|경험|발견|새로운/gi]],
      ['magician', [/변화|창조|마법|변신|능력|힘/gi]],
      ['lover', [/사랑|관계|열정|아름다움|연결|친밀/gi]],
      ['jester', [/재미|유머|즐거움|놀이|웃음|자유/gi]],
      ['caregiver', [/돌봄|보호|도움|서비스|희생|양육/gi]],
      ['ruler', [/권력|통제|책임|질서|리더|지배/gi]],
      ['creator', [/창조|예술|표현|독창성|상상|작품/gi]],
      ['outlaw', [/반항|혁명|파괴|변화|규칙|도전/gi]],
      ['regular_guy', [/소속|평범|일반|보통|친근|편안/gi]]
    ]);
  }

  private initializeDefensePatterns(): Map<DefenseMechanism, RegExp[]> {
    return new Map([
      ['denial', [/아니다|그렇지 않다|사실이 아니다|믿을 수 없다/gi]],
      ['projection', [/그 사람이|저 사람은|다른 사람들은|남들은/gi]],
      ['rationalization', [/이유는|때문에|어쩔 수 없이|합리적으로/gi]],
      ['displacement', [/대신|다른 곳에서|엉뚱한|전혀 다른/gi]],
      ['sublimation', [/승화|긍정적으로|건설적으로|창조적으로/gi]]
    ]);
  }

  private initializeStressIndicators(): Map<string, StressLevel> {
    return new Map([
      ['극도로', 'critical'],
      ['매우', 'high'],
      ['많이', 'high'],
      ['조금', 'moderate'],
      ['가끔', 'low']
    ]);
  }

  // Additional helper methods would be implemented here...
  private determineEmotionalStyle(emotionState: any, text: string): EmotionalStyle {
    if (emotionState.intensity > 0.8) return 'expressive';
    if (emotionState.stability > 0.8) return 'stable';
    if (text.includes('참') || text.includes('억지')) return 'controlled';
    return 'reactive';
  }

  private identifyRegulationStrategy(text: string): RegulationStrategy {
    if (text.includes('참') || text.includes('억누')) return 'suppression';
    if (text.includes('다르게 생각') || text.includes('긍정적으로')) return 'reappraisal';
    if (text.includes('표현') || text.includes('말하')) return 'expression';
    if (text.includes('피하') || text.includes('회피')) return 'avoidance';
    return 'acceptance';
  }

  private analyzeExpressionPattern(text: string): ExpressionPattern {
    return {
      directness: text.includes('직접') ? 'direct' : 'indirect',
      intensity: text.includes('강하') ? 'intense' : 'mild',
      frequency: text.includes('자주') ? 'frequent' : 'occasional'
    } as ExpressionPattern;
  }

  private identifyEmotionalTriggers(text: string): EmotionalTrigger[] {
    return [
      { trigger: 'rejection', sensitivity: 0.7 },
      { trigger: 'uncertainty', sensitivity: 0.5 }
    ] as EmotionalTrigger[];
  }

  private assessResilience(text: string, emotionState: any): ResilienceLevel {
    if (text.includes('극복') || text.includes('이겨내')) return 'high';
    if (emotionState.stability > 0.6) return 'moderate';
    return 'low';
  }

  private assessEmotionalIntelligence(nlpAnalysis: QuestionAnalysis): EQScore {
    return {
      selfAwareness: 0.7,
      selfRegulation: 0.6,
      motivation: 0.8,
      empathy: 0.7,
      socialSkills: 0.6
    } as EQScore;
  }

  // More helper methods would be implemented here...
  private identifyStressors(text: string): Stressor[] { return []; }
  private analyzeStressResponses(text: string, emotion: any): StressResponse[] { return []; }
  private identifyCopingMechanisms(text: string): CopingMechanism[] { return []; }
  private assessBurnoutRisk(nlpAnalysis: QuestionAnalysis, text: string): BurnoutRisk { return 'low'; }
  private analyzeRecoveryPattern(text: string): RecoveryPattern { return {} as RecoveryPattern; }
  private assessDefenseEffectiveness(mechanism: DefenseMechanism, text: string): number { return 0.5; }
  private identifyThinkingStyle(nlpAnalysis: QuestionAnalysis, text: string): ThinkingStyle { return 'analytical'; }
  private analyzeDecisionMakingStyle(text: string): DecisionMakingStyle { return {} as DecisionMakingStyle; }
  private analyzeProblemSolvingApproach(text: string): ProblemSolvingApproach { return {} as ProblemSolvingApproach; }
  private assessWorldview(text: string): Worldview { return {} as Worldview; }
  private identifyValueSystem(text: string): ValueSystem { return {} as ValueSystem; }
  private assessNeedSatisfaction(needType: string, text: string): number { return 0.5; }
  private suggestFulfillmentPath(needType: NeedType): string[] { return []; }
  private analyzeArchetypeExpression(archetype: JungianArchetype, text: string): ArchetypeExpression { return {} as ArchetypeExpression; }
  private assessArchetypeIntegration(archetype: JungianArchetype, activation: number): IntegrationLevel { return 'moderate'; }
  private identifyProjectedTraits(text: string): string[] { return []; }
  private identifyRepressedAspects(text: string, nlpAnalysis: QuestionAnalysis): string[] { return []; }
  private identifyIntegrationOpportunities(projected: string[], repressed: string[]): string[] { return []; }
  private suggestShadowWork(projected: string[], repressed: string[]): ShadowWorkArea[] { return []; }
}

// Additional type definitions that would be needed
export type NeedType = 'autonomy' | 'competence' | 'relatedness' | 'security' | 'meaning' | 'recognition' | 'growth' | 'beauty';
export type EmotionalTrigger = { trigger: string; sensitivity: number; };
export type EQScore = { selfAwareness: number; selfRegulation: number; motivation: number; empathy: number; socialSkills: number; };
export type ExpressionPattern = { directness: string; intensity: string; frequency: string; };
export type Stressor = any;
export type StressResponse = any;
export type CopingMechanism = any;
export type RecoveryPattern = any;
export type DecisionMakingStyle = any;
export type ProblemSolvingApproach = any;
export type Worldview = any;
export type ValueSystem = any;
export type ArchetypeExpression = any;
export type IntegrationLevel = 'low' | 'moderate' | 'high';
export type ShadowWorkArea = any;

export const psychologyAnalyzer = new AdvancedPsychologyAnalyzer();