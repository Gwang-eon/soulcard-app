// Tarot Card Types and Interfaces

export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
export type Element = 'fire' | 'water' | 'air' | 'earth' | null;
export type Category = 'general' | 'love' | 'career' | 'money' | 'health' | 'spiritual';
export type Language = 'ko' | 'en';
export type Priority = 'high' | 'medium' | 'low';
export type Strength = 'weak' | 'moderate' | 'strong' | 'very_strong' | 'extremely_strong' | 'maximum';
export type CombinationType = 'major_major' | 'major_minor' | 'minor_minor' | 'suit_based';
export type SpreadType = 'past_present_future' | 'situation_action_outcome' | 'relationship' | 'celtic_cross';
export type Orientation = 'upright' | 'reversed';
export type Emotion = 'positive' | 'negative' | 'neutral' | 'anxious' | 'hopeful';
export type Urgency = 'low' | 'medium' | 'high';
export type Specificity = 'vague' | 'general' | 'specific' | 'very_specific';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'very_rare' | 'extremely_rare';

export interface TarotCardMetadata {
  version: string;
  totalCards: number;
  lastUpdated: string;
  categories: Category[];
  languages: Language[];
}

export interface CardInterpretations {
  general: string;
  love: string;
  career: string;
  money: string;
  health: string;
  spiritual: string;
}

export interface CardTiming {
  immediate: string;
  shortTerm: string;
  longTerm: string;
}

export interface CardAdvice {
  action: string;
  avoid: string;
  focus: string;
}

export interface Symbol {
  symbol: string;
  meaning: string;
}

export interface TarotCard {
  id: number;
  name: string;
  koreanName: string;
  suit: Suit;
  number?: number;
  element: Element;
  uprightKeywords: string[];
  reversedKeywords: string[];
  
  interpretations: {
    upright: CardInterpretations;
    reversed: CardInterpretations;
  };
  
  timing: CardTiming;
  
  advice: {
    upright: CardAdvice;
    reversed: CardAdvice;
  };
  
  symbolism: Symbol[];
  imageUrl: string;
}

export interface TarotDeck {
  metadata: TarotCardMetadata;
  cards: TarotCard[];
}

// Card Combination Types
export interface CombinationContext {
  general: string;
  love: string;
  career: string;
  money: string;
}

export interface TwoCardCombination {
  id: string;
  cards: [number, number];
  cardNames: [string, string];
  type: CombinationType;
  strength: Strength;
  meaning: string;
  contexts: CombinationContext;
  advice: string;
  keywords: string[];
}

export interface ThreeCardPattern {
  id: string;
  cards: [number, number, number];
  cardNames: [string, string, string];
  spreadType: SpreadType;
  strength: Strength;
  meaning: string;
  interpretation: {
    past: string;
    present: string;
    future: string;
  };
  overallMessage: string;
  advice: string;
  keywords: string[];
}

export interface SuitCombination {
  id: string;
  suits: Suit[];
  meaning: string;
  strength: Strength;
  contexts: CombinationContext;
  advice: string;
}

export interface SpecialPattern {
  id: string;
  pattern: string;
  description: string;
  meaning: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'very_rare' | 'extremely_rare';
  strength: Strength;
  interpretation: string;
}

export interface CardCombinations {
  metadata: {
    version: string;
    totalCombinations: number;
    lastUpdated: string;
    types: string[];
  };
  twCardCombinations: TwoCardCombination[];
  threeCardPatterns: ThreeCardPattern[];
  suitCombinations: SuitCombination[];
  specialPatterns: SpecialPattern[];
}

// Reading Types
export interface SelectedCard {
  card: TarotCard;
  position: number;
  isReversed: boolean;
}

export interface Reading {
  id: string;
  question: string;
  category: Category;
  spreadType: SpreadType;
  cards: SelectedCard[];
  interpretation: string;
  combinations?: TwoCardCombination[];
  createdAt: Date;
  userRating?: number;
}

// Question Analysis Types
export interface QuestionAnalysis {
  category: Category;
  keywords: string[];
  emotion: 'positive' | 'negative' | 'neutral' | 'anxious' | 'hopeful';
  urgency: 'low' | 'medium' | 'high';
  specificity: 'vague' | 'general' | 'specific' | 'very_specific';
}

// Major Arcana Astrological Information
export interface MajorArcanaElement {
  id: number;
  name: string;
  element: Element;
  astrological: string | null;
  zodiac: string | null;
  description: string;
}

// File Structure Interfaces
export interface CardFileMetadata {
  type: string;
  suit?: Suit;
  element?: Element;
  totalCards: number;
  completedCards: number;
  lastUpdated: string;
  categories: Category[];
  languages: Language[];
}

export interface CardFile {
  metadata: CardFileMetadata;
  cards: TarotCard[];
}

// Enum Definitions
export interface EnumDefinition {
  values: string[];
  descriptions: Record<string, string>;
}

export interface EnumFile {
  metadata: {
    version: string;
    lastUpdated: string;
    description: string;
  };
  suits: EnumDefinition;
  elements: EnumDefinition;
  categories: EnumDefinition;
  languages: EnumDefinition;
  orientations: EnumDefinition;
  priorities: EnumDefinition;
  strengths: EnumDefinition;
  combinationTypes: EnumDefinition;
  spreadTypes: EnumDefinition;
  emotions: EnumDefinition;
  urgency: EnumDefinition;
  specificity: EnumDefinition;
  rarity: EnumDefinition;
}

// Utility Types
export type CardId = TarotCard['id'];
export type CardName = TarotCard['name'];

// Error Types
export class TarotError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'TarotError';
  }
}

export class CardNotFoundError extends TarotError {
  constructor(cardId: number) {
    super(`Card with ID ${cardId} not found`, 'CARD_NOT_FOUND');
  }
}

export class InvalidCombinationError extends TarotError {
  constructor(cardIds: number[]) {
    super(`Invalid combination: ${cardIds.join(', ')}`, 'INVALID_COMBINATION');
  }
}