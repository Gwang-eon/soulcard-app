import React, { useState, useEffect, useCallback } from 'react';
import { CardOption, CardDeckState, ShuffleType, GestureType, HapticFeedback } from '../../types/cardSelection';

interface CardDeckDisplayProps {
  onCardSelect: (cardId: number) => void;
  onShuffleComplete: () => void;
  shuffleOnMount?: boolean;
  cardCount?: number;
}

export const CardDeckDisplay: React.FC<CardDeckDisplayProps> = ({
  onCardSelect,
  onShuffleComplete,
  shuffleOnMount = true,
  cardCount = 6
}) => {
  const [deckState, setDeckState] = useState<CardDeckState>({
    cards: [],
    shuffleState: 'idle',
    selectedCardId: null,
    shuffleCount: 0
  });

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [selectionStartTime, setSelectionStartTime] = useState<number>(0);

  // 햅틱 피드백 함수
  const triggerHapticFeedback = useCallback((feedback: HapticFeedback) => {
    if ('vibrate' in navigator) {
      if (feedback.pattern) {
        navigator.vibrate(feedback.pattern);
      } else {
        const duration = feedback.type === 'light' ? 50 : 
                        feedback.type === 'medium' ? 100 : 200;
        navigator.vibrate(duration);
      }
    }
  }, []);

  // 카드 더미 초기화
  const initializeCards = useCallback(() => {
    const cards: CardOption[] = Array.from({ length: cardCount }, (_, index) => ({
      id: index,
      position: { x: 0, y: 0 },
      isRevealed: false,
      isSelected: false,
      animationState: 'idle'
    }));

    setDeckState(prev => ({
      ...prev,
      cards,
      shuffleState: 'idle'
    }));
  }, [cardCount]);

  // 기본 셔플 애니메이션
  const performShuffle = useCallback(async (type: ShuffleType = 'basic') => {
    setDeckState(prev => ({
      ...prev,
      shuffleState: 'shuffling'
    }));

    // 햅틱 피드백 - 셔플 시작
    triggerHapticFeedback({ type: 'medium', duration: 100, pattern: [100, 50, 100] });

    // 카드들에 셔플 애니메이션 적용
    setDeckState(prev => ({
      ...prev,
      cards: prev.cards.map((card, index) => ({
        ...card,
        animationState: 'shuffling'
      }))
    }));

    // 애니메이션 지속 시간 대기
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 셔플 완료
    setDeckState(prev => ({
      ...prev,
      cards: prev.cards.map(card => ({
        ...card,
        animationState: 'idle'
      })),
      shuffleState: 'ready',
      shuffleCount: prev.shuffleCount + 1
    }));

    setSelectionStartTime(Date.now());
    onShuffleComplete();
  }, [triggerHapticFeedback, onShuffleComplete]);

  // 카드 선택 처리
  const handleCardSelect = useCallback((cardId: number) => {
    if (deckState.shuffleState !== 'ready') return;

    // 햅틱 피드백 - 카드 선택
    triggerHapticFeedback({ type: 'heavy', duration: 200 });

    // 선택된 카드 상태 업데이트
    setDeckState(prev => ({
      ...prev,
      selectedCardId: cardId,
      cards: prev.cards.map(card => ({
        ...card,
        isSelected: card.id === cardId,
        animationState: card.id === cardId ? 'selecting' : 'idle'
      }))
    }));

    // 선택 시간 계산
    const selectionTime = Date.now() - selectionStartTime;
    console.log(`카드 선택 완료: ${cardId}, 선택 시간: ${selectionTime}ms`);

    // 부모 컴포넌트에 선택 알림
    onCardSelect(cardId);
  }, [deckState.shuffleState, selectionStartTime, triggerHapticFeedback, onCardSelect]);

  // 터치 시작 처리
  const handleTouchStart = useCallback((e: React.TouchEvent, cardId: number) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });

    // 가벼운 햅틱 피드백
    triggerHapticFeedback({ type: 'light', duration: 50 });

    // 카드 호버 효과
    setDeckState(prev => ({
      ...prev,
      cards: prev.cards.map(card => ({
        ...card,
        animationState: card.id === cardId ? 'hovering' : card.animationState
      }))
    }));
  }, [triggerHapticFeedback]);

  // 터치 종료 처리
  const handleTouchEnd = useCallback((e: React.TouchEvent, cardId: number) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 터치가 너무 많이 움직이지 않았으면 선택으로 처리
    if (distance < 30) {
      handleCardSelect(cardId);
    } else {
      // 스와이프 제스처 감지
      const threshold = 50;
      if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'swipe-right' : 'swipe-left';
        handleSwipeGesture(direction);
      }
    }

    // 호버 효과 제거
    setDeckState(prev => ({
      ...prev,
      cards: prev.cards.map(card => ({
        ...card,
        animationState: card.animationState === 'hovering' ? 'idle' : card.animationState
      }))
    }));

    setTouchStart(null);
  }, [touchStart, handleCardSelect]);

  // 스와이프 제스처 처리
  const handleSwipeGesture = useCallback((direction: 'swipe-left' | 'swipe-right') => {
    if (deckState.shuffleState === 'ready') {
      console.log(`스와이프 감지: ${direction}, 재셔플 실행`);
      performShuffle('basic');
    }
  }, [deckState.shuffleState, performShuffle]);

  // 컴포넌트 마운트 시 초기화 및 자동 셔플
  useEffect(() => {
    initializeCards();
    
    if (shuffleOnMount) {
      // 약간의 지연 후 자동 셔플
      setTimeout(() => {
        performShuffle('basic');
      }, 500);
    }
  }, [initializeCards, shuffleOnMount, performShuffle]);

  return (
    <div className="card-selection-container">
      {/* 안내 메시지 */}
      <div className="selection-guide">
        {deckState.shuffleState === 'idle' && (
          <>
            <h2>🔮 마음속 질문을 떠올려주세요</h2>
            <p>카드들이 당신의 에너지를 느끼고 있습니다...</p>
          </>
        )}
        
        {deckState.shuffleState === 'shuffling' && (
          <>
            <h2>💫 카드를 섞고 있습니다</h2>
            <p>잠시만 기다려주세요...</p>
            <div className="loading-spinner"></div>
          </>
        )}
        
        {deckState.shuffleState === 'ready' && !deckState.selectedCardId && (
          <>
            <h2>✨ 직감으로 카드를 선택하세요</h2>
            <p>끌리는 카드를 터치해주세요</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              좌우로 스와이프하면 다시 섞을 수 있어요
            </p>
          </>
        )}

        {deckState.selectedCardId !== null && (
          <>
            <h2>🌟 선택이 완료되었습니다</h2>
            <p>당신이 선택한 카드의 메시지를 준비하고 있습니다...</p>
          </>
        )}
      </div>

      {/* 카드 덱 그리드 */}
      <div className="card-deck-grid">
        {deckState.cards.map((card, index) => (
          <div
            key={card.id}
            className={`card-pile ${card.animationState} ${card.isSelected ? 'selected' : ''}`}
            style={{ '--card-index': index } as React.CSSProperties}
            onTouchStart={(e) => handleTouchStart(e, card.id)}
            onTouchEnd={(e) => handleTouchEnd(e, card.id)}
            onClick={() => handleCardSelect(card.id)}
            role="button"
            tabIndex={0}
            aria-label={`카드 ${card.id + 1}`}
          >
            {/* 카드 뒷면 디자인 - CSS로 구현 */}
          </div>
        ))}
      </div>

      {/* 진행률 표시 */}
      <div className="selection-progress">
        <div className={`progress-step ${deckState.shuffleState !== 'idle' ? 'completed' : ''}`}></div>
        <div className={`progress-step ${deckState.shuffleState === 'ready' ? 'active' : 
                        deckState.selectedCardId ? 'completed' : ''}`}></div>
        <div className={`progress-step ${deckState.selectedCardId ? 'active' : ''}`}></div>
      </div>

      {/* 셔플 상태 표시 */}
      <div className={`shuffle-status ${deckState.shuffleState === 'shuffling' ? 'visible' : ''}`}>
        카드 셔플 중... ({deckState.shuffleCount}/3)
      </div>
    </div>
  );
};

export default CardDeckDisplay;