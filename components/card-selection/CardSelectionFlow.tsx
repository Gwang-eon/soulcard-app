import React, { useState, useCallback } from 'react';
import { TarotCard, Category } from '../../types/tarot';
import { ShuffleType } from '../../types/cardSelection';
import CardDeckDisplay from './CardDeckDisplay';
import ShuffleAnimation from './ShuffleAnimation';
import { cardSelectionService } from '../../services/cardSelectionService';

interface CardSelectionFlowProps {
  question: string;
  category: Category;
  onCardRevealed: (card: TarotCard) => void;
  onSelectionComplete: (card: TarotCard) => void;
}

export const CardSelectionFlow: React.FC<CardSelectionFlowProps> = ({
  question,
  category,
  onCardRevealed,
  onSelectionComplete
}) => {
  const [flowState, setFlowState] = useState<'preparing' | 'shuffling' | 'selecting' | 'revealing' | 'complete'>('preparing');
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [revealedCard, setRevealedCard] = useState<TarotCard | null>(null);
  const [shuffleType, setShuffleType] = useState<ShuffleType>('basic');

  // 셔플 완료 처리
  const handleShuffleComplete = useCallback(() => {
    console.log('🎴 셔플 완료, 카드 선택 단계로 전환');
    setFlowState('selecting');
  }, []);

  // 카드 선택 처리
  const handleCardSelect = useCallback(async (cardId: number) => {
    console.log(`🎯 카드 선택됨: ${cardId}`);
    setSelectedCardId(cardId);
    setFlowState('revealing');

    try {
      // 선택된 카드를 실제 타로 카드로 변환
      const card = await cardSelectionService.revealSelectedCard(cardId, question, category);
      setRevealedCard(card);
      
      console.log(`🌟 카드 공개: ${card.name}`);
      
      // 부모 컴포넌트에 알림
      onCardRevealed(card);
      
      // 잠시 후 완료 상태로 전환
      setTimeout(() => {
        setFlowState('complete');
        onSelectionComplete(card);
      }, 1500);
      
    } catch (error) {
      console.error('카드 공개 중 오류:', error);
      // 오류 발생 시 선택 단계로 되돌리기
      setFlowState('selecting');
      setSelectedCardId(null);
    }
  }, [question, category, onCardRevealed, onSelectionComplete]);

  // 초기 셔플 시작
  const startInitialShuffle = useCallback(() => {
    console.log('🎴 초기 셔플 시작');
    setFlowState('shuffling');
  }, []);

  // 재시작 (다시 선택)
  const handleRestart = useCallback(() => {
    console.log('🔄 카드 선택 재시작');
    setFlowState('preparing');
    setSelectedCardId(null);
    setRevealedCard(null);
    
    // 잠시 후 셔플 시작
    setTimeout(() => {
      startInitialShuffle();
    }, 500);
  }, [startInitialShuffle]);

  return (
    <div className="card-selection-flow">
      {/* 준비 상태 */}
      {flowState === 'preparing' && (
        <div className="preparation-screen">
          <div className="preparation-content">
            <h2>🔮 타로 리딩 준비</h2>
            <p>질문: "{question}"</p>
            <p>마음속으로 질문을 되새기며 준비해주세요...</p>
            <button 
              className="start-button"
              onClick={startInitialShuffle}
            >
              카드 섞기 시작
            </button>
          </div>
        </div>
      )}

      {/* 셔플 애니메이션 */}
      {flowState === 'shuffling' && (
        <ShuffleAnimation
          isActive={true}
          shuffleType={shuffleType}
          onComplete={handleShuffleComplete}
          cardCount={6}
        />
      )}

      {/* 카드 선택 */}
      {flowState === 'selecting' && (
        <CardDeckDisplay
          onCardSelect={handleCardSelect}
          onShuffleComplete={handleShuffleComplete}
          shuffleOnMount={false}
          cardCount={6}
        />
      )}

      {/* 카드 공개 중 */}
      {flowState === 'revealing' && (
        <div className="revealing-screen">
          <div className="revealing-content">
            <h2>🌟 카드를 공개하고 있습니다</h2>
            <div className="selected-card-placeholder">
              <div className="card-flip-animation">
                <div className="card-face card-back"></div>
                {revealedCard && (
                  <div className="card-face card-front">
                    <h3>{revealedCard.name}</h3>
                    <p>{revealedCard.suit}</p>
                  </div>
                )}
              </div>
            </div>
            <p>당신이 선택한 카드의 메시지를 해석하고 있습니다...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {/* 완료 상태 */}
      {flowState === 'complete' && revealedCard && (
        <div className="completion-screen">
          <div className="completion-content">
            <h2>✨ 선택이 완료되었습니다</h2>
            <div className="revealed-card">
              <h3>{revealedCard.name}</h3>
              <p className="card-suit">{revealedCard.suit}</p>
              <p className="card-description">
                {revealedCard.keywords?.join(', ')}
              </p>
            </div>
            <p>이제 AI가 당신만을 위한 해석을 생성합니다...</p>
            <div className="action-buttons">
              <button 
                className="restart-button"
                onClick={handleRestart}
              >
                다른 카드 선택하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .card-selection-flow {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          color: white;
          font-family: 'Georgia', serif;
        }

        .preparation-screen,
        .revealing-screen,
        .completion-screen {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .preparation-content,
        .revealing-content,
        .completion-content {
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        .preparation-content h2,
        .revealing-content h2,
        .completion-content h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .preparation-content p,
        .revealing-content p,
        .completion-content p {
          font-size: 1.1rem;
          margin: 15px 0;
          opacity: 0.9;
          line-height: 1.6;
        }

        .start-button,
        .restart-button {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          color: #1a1a2e;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .start-button:hover,
        .restart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }

        .start-button:active,
        .restart-button:active {
          transform: translateY(0);
        }

        .selected-card-placeholder {
          margin: 30px 0;
          perspective: 1000px;
        }

        .card-flip-animation {
          width: 120px;
          height: 180px;
          margin: 0 auto;
          position: relative;
          transform-style: preserve-3d;
          animation: cardFlipReveal 2s ease-in-out;
        }

        @keyframes cardFlipReveal {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(180deg); }
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }

        .card-back {
          background: linear-gradient(145deg, #2a2a5a, #1a1a3a);
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, transparent 50%);
        }

        .card-front {
          background: linear-gradient(145deg, #f8f8ff, #e6e6fa);
          color: #1a1a2e;
          transform: rotateY(180deg);
          padding: 20px;
        }

        .card-front h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #4a4a8a;
        }

        .card-front p {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .revealed-card {
          background: rgba(255,255,255,0.1);
          padding: 25px;
          border-radius: 15px;
          margin: 20px 0;
          backdrop-filter: blur(10px);
        }

        .revealed-card h3 {
          font-size: 1.5rem;
          color: #FFD700;
          margin-bottom: 10px;
        }

        .card-suit {
          font-size: 1rem;
          color: #FFA500;
          margin-bottom: 15px;
          text-transform: capitalize;
        }

        .card-description {
          font-size: 0.9rem;
          opacity: 0.8;
          font-style: italic;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 5px;
          margin-top: 20px;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FFD700;
          animation: loadingDot 1.4s ease-in-out infinite both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
        .loading-dots span:nth-child(3) { animation-delay: 0s; }

        @keyframes loadingDot {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .action-buttons {
          margin-top: 30px;
        }

        /* 모바일 최적화 */
        @media (max-width: 480px) {
          .preparation-content h2,
          .revealing-content h2,
          .completion-content h2 {
            font-size: 1.6rem;
          }

          .card-flip-animation {
            width: 100px;
            height: 150px;
          }

          .start-button,
          .restart-button {
            padding: 12px 25px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CardSelectionFlow;