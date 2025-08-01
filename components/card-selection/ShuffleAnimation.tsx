import React, { useState, useEffect, useCallback } from 'react';
import { ShuffleType, HapticFeedback } from '../../types/cardSelection';

interface ShuffleAnimationProps {
  isActive: boolean;
  shuffleType?: ShuffleType;
  onComplete?: () => void;
  cardCount?: number;
}

export const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({
  isActive,
  shuffleType = 'basic',
  onComplete,
  cardCount = 6
}) => {
  const [animationStage, setAnimationStage] = useState<'prepare' | 'shuffle' | 'settle' | 'complete'>('prepare');
  const [currentRound, setCurrentRound] = useState(0);
  const maxRounds = 3;

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

  // 셔플 애니메이션 실행
  const performShuffleRound = useCallback(async () => {
    setAnimationStage('shuffle');
    
    // 셔플 타입별 햅틱 패턴
    const hapticPatterns: { [key in ShuffleType]: number[] } = {
      'basic': [100, 50, 100, 50, 200],
      'riffle': [50, 30, 50, 30, 50, 30, 150],
      'overhand': [80, 40, 80, 40, 80, 40, 80],
      'hindu': [120, 60, 120, 60, 180],
      'bridge': [200, 100, 200]
    };
    
    triggerHapticFeedback({
      type: 'medium',
      duration: 0,
      pattern: hapticPatterns[shuffleType]
    });

    // 애니메이션 지속 시간 (셔플 타입별 다름)
    const animationDuration = {
      'basic': 800,
      'riffle': 1200,
      'overhand': 1000,
      'hindu': 900,
      'bridge': 1100
    };

    await new Promise(resolve => setTimeout(resolve, animationDuration[shuffleType]));
    
    setAnimationStage('settle');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCurrentRound(prev => prev + 1);
  }, [shuffleType, triggerHapticFeedback]);

  // 애니메이션 완료 처리
  const completeAnimation = useCallback(() => {
    setAnimationStage('complete');
    
    // 완료 햅틱 피드백
    triggerHapticFeedback({
      type: 'heavy',
      duration: 0,
      pattern: [200, 100, 200, 100, 300]
    });

    setTimeout(() => {
      onComplete?.();
    }, 200);
  }, [triggerHapticFeedback, onComplete]);

  // 셔플 시퀀스 관리
  useEffect(() => {
    if (!isActive) {
      setAnimationStage('prepare');
      setCurrentRound(0);
      return;
    }

    if (currentRound < maxRounds) {
      // 다음 라운드 시작
      const timer = setTimeout(() => {
        performShuffleRound();
      }, currentRound === 0 ? 100 : 200);

      return () => clearTimeout(timer);
    } else if (currentRound >= maxRounds && animationStage === 'settle') {
      // 모든 라운드 완료
      completeAnimation();
    }
  }, [isActive, currentRound, animationStage, performShuffleRound, completeAnimation]);

  if (!isActive) return null;

  return (
    <div className="shuffle-animation-container">
      {/* 셔플 메시지 */}
      <div className="shuffle-message">
        <h3>
          {animationStage === 'prepare' && '🎴 카드를 준비하고 있습니다...'}
          {animationStage === 'shuffle' && `💫 카드를 섞고 있습니다... (${currentRound}/${maxRounds})`}
          {animationStage === 'settle' && '✨ 카드가 자리를 찾고 있습니다...'}
          {animationStage === 'complete' && '🌟 준비가 완료되었습니다!'}
        </h3>
        <p>
          {shuffleType === 'basic' && '기본 셔플로 카드의 에너지를 고르게 분산시킵니다'}
          {shuffleType === 'riffle' && '리플 셔플로 카드들을 정교하게 섞습니다'}
          {shuffleType === 'overhand' && '오버핸드 셔플로 자연스럽게 카드를 섞습니다'}
          {shuffleType === 'hindu' && '힌두 셔플로 카드의 기운을 순환시킵니다'}
          {shuffleType === 'bridge' && '브릿지 셔플로 카드들을 우아하게 섞습니다'}
        </p>
      </div>

      {/* 애니메이션 카드들 */}
      <div className={`shuffle-cards shuffle-${shuffleType} stage-${animationStage}`}>
        {Array.from({ length: cardCount }, (_, index) => (
          <div
            key={index}
            className={`shuffle-card card-${index}`}
            style={{
              '--card-index': index,
              '--total-cards': cardCount,
              '--animation-delay': `${index * 0.1}s`
            } as React.CSSProperties}
          >
            <div className="card-back"></div>
          </div>
        ))}
      </div>

      {/* 진행률 표시 */}
      <div className="shuffle-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(currentRound / maxRounds) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {Math.round((currentRound / maxRounds) * 100)}% 완료
        </div>
      </div>

      {/* 셔플 타입별 특수 효과 */}
      {shuffleType === 'riffle' && animationStage === 'shuffle' && (
        <div className="riffle-effect">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`riffle-particle particle-${i}`}></div>
          ))}
        </div>
      )}

      {shuffleType === 'bridge' && animationStage === 'shuffle' && (
        <div className="bridge-effect">
          <div className="bridge-arc"></div>
        </div>
      )}

      <style jsx>{`
        .shuffle-animation-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          color: white;
        }

        .shuffle-message {
          text-align: center;
          margin-bottom: 40px;
        }

        .shuffle-message h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .shuffle-message p {
          font-size: 1rem;
          opacity: 0.8;
          max-width: 300px;
        }

        .shuffle-cards {
          position: relative;
          width: 300px;
          height: 200px;
          margin: 40px 0;
        }

        .shuffle-card {
          position: absolute;
          width: 60px;
          height: 90px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }

        .card-back {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #2a2a5a, #1a1a3a);
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, transparent 50%);
        }

        /* 기본 셔플 애니메이션 */
        .shuffle-cards.shuffle-basic.stage-shuffle .shuffle-card {
          animation: basicShuffle 0.8s ease-in-out;
          animation-delay: calc(var(--card-index) * 0.1s);
        }

        @keyframes basicShuffle {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(calc(-50% - 30px), -50%) rotate(-15deg); }
          50% { transform: translate(calc(-50% + 30px), -50%) rotate(15deg); }
          75% { transform: translate(calc(-50% - 15px), -50%) rotate(-8deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }

        /* 리플 셔플 애니메이션 */
        .shuffle-cards.shuffle-riffle.stage-shuffle .shuffle-card {
          animation: riffleShuffle 1.2s ease-in-out;
          animation-delay: calc(var(--card-index) * 0.05s);
        }

        @keyframes riffleShuffle {
          0% { transform: translate(-50%, -50%) rotateY(0deg); }
          25% { transform: translate(-50%, calc(-50% - 20px)) rotateY(90deg); }
          50% { transform: translate(-50%, calc(-50% + 20px)) rotateY(180deg); }
          75% { transform: translate(-50%, calc(-50% - 10px)) rotateY(270deg); }
          100% { transform: translate(-50%, -50%) rotateY(360deg); }
        }

        /* 오버핸드 셔플 애니메이션 */
        .shuffle-cards.shuffle-overhand.stage-shuffle .shuffle-card {
          animation: overhandShuffle 1s ease-in-out;
          animation-delay: calc(var(--card-index) * 0.08s);
        }

        @keyframes overhandShuffle {
          0% { transform: translate(-50%, -50%) translateZ(0); }
          33% { transform: translate(-50%, calc(-50% - 40px)) translateZ(20px); }
          66% { transform: translate(-50%, calc(-50% + 40px)) translateZ(-20px); }
          100% { transform: translate(-50%, -50%) translateZ(0); }
        }

        .shuffle-progress {
          text-align: center;
          width: 200px;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* 특수 효과 */
        .riffle-effect {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .riffle-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFD700;
          border-radius: 50%;
          opacity: 0.7;
          animation: rifleParticle 1.2s ease-out infinite;
        }

        @keyframes rifleParticle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translate(var(--particle-x, 50px), var(--particle-y, 50px)) scale(0);
            opacity: 0;
          }
        }

        .bridge-effect {
          position: absolute;
          width: 200px;
          height: 100px;
          pointer-events: none;
        }

        .bridge-arc {
          width: 100%;
          height: 50px;
          border: 2px solid rgba(255, 215, 0, 0.5);
          border-bottom: none;
          border-radius: 100px 100px 0 0;
          animation: bridgeGlow 1.1s ease-in-out infinite;
        }

        @keyframes bridgeGlow {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.8; transform: scaleX(1.2); }
        }

        /* 모바일 최적화 */
        @media (max-width: 480px) {
          .shuffle-message h3 {
            font-size: 1.3rem;
          }
          
          .shuffle-cards {
            width: 250px;
            height: 150px;
          }
          
          .shuffle-card {
            width: 50px;
            height: 75px;
          }
        }
      `}</style>
    </div>
  );
};

export default ShuffleAnimation;