// 🖼️ 타로카드 이미지 유틸리티

import { TarotCard } from '../types/tarot';

/**
 * 카드 정보로부터 이미지 경로를 생성
 */
export function getCardImagePath(card: TarotCard): string {
  const suit = card.suit.toLowerCase();
  const cardName = card.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  if (suit === 'major') {
    return `/images/cards/major-arcana/${String(card.id).padStart(2, '0')}-${cardName}.webp`;
  }
  
  return `/images/cards/${suit}/${cardName}.webp`;
}

/**
 * 카드 이미지 미리로딩
 */
export function preloadCardImage(imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = imageUrl;
  });
}

/**
 * 여러 카드 이미지 일괄 미리로딩
 */
export async function preloadCardImages(cards: TarotCard[]): Promise<void[]> {
  const imagePromises = cards.map(card => {
    const imagePath = getCardImagePath(card);
    return preloadCardImage(imagePath);
  });
  
  return Promise.all(imagePromises);
}

/**
 * 카드 이미지 lazy loading 지원
 */
export function createCardImageProps(card: TarotCard) {
  const imagePath = getCardImagePath(card);
  
  return {
    src: imagePath,
    alt: `${card.name} - ${card.koreanName}`,
    loading: 'lazy' as const,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      // 이미지 로딩 실패 시 기본 이미지로 대체
      e.currentTarget.src = '/images/cards/card-back.webp';
    }
  };
}

/**
 * 이미지 최적화를 위한 responsive 이미지 경로
 */
export function getResponsiveCardImagePaths(card: TarotCard) {
  const basePath = getCardImagePath(card).replace('.webp', '');
  
  return {
    small: `${basePath}-sm.webp`, // 모바일용 작은 이미지
    medium: `${basePath}-md.webp`, // 태블릿용 중간 이미지
    large: `${basePath}-lg.webp`, // 데스크톱용 큰 이미지
    original: `${basePath}.webp` // 원본 이미지
  };
}

/**
 * 카드 카테고리별 아이콘 매핑
 */
export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    love: '💕',
    career: '💼', 
    money: '💰',
    health: '💚',
    spiritual: '✨',
    general: '🔮'
  };
  
  return iconMap[category] || '🃏';
}

/**
 * 카드 수트별 색상 클래스
 */
export function getSuitColorClass(suit: string): string {
  const colorMap: Record<string, string> = {
    major: 'text-figma-accent-purple',
    cups: 'text-figma-love-color',
    wands: 'text-figma-career-color', 
    swords: 'text-figma-health-color',
    pentacles: 'text-figma-money-color'
  };
  
  return colorMap[suit] || 'text-figma-primary-500';
}

/**
 * 이미지 존재 여부 확인
 */
export async function checkImageExists(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * 카드백 이미지 경로
 */
export const CARD_BACK_IMAGE = '/images/cards/card-back.webp';

/**
 * 기본 플레이스홀더 이미지 경로
 */
export const CARD_PLACEHOLDER_IMAGE = '/images/cards/placeholder.webp';

/**
 * 이미지 형식별 지원 여부 확인
 */
export function getSupportedImageFormat(): 'webp' | 'jpg' {
  // WebP 지원 여부 확인
  const canvas = document.createElement('canvas');
  const support = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  return support ? 'webp' : 'jpg';
}

/**
 * 이미지 경로를 지원되는 형식으로 변환
 */
export function getOptimizedImagePath(imagePath: string): string {
  const format = getSupportedImageFormat();
  
  if (format === 'jpg' && imagePath.endsWith('.webp')) {
    return imagePath.replace('.webp', '.jpg');
  }
  
  return imagePath;
}