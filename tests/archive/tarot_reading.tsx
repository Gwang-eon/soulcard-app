import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Zap, Heart, Shield, Eye, Clock, Target, Sparkles } from 'lucide-react';

const TarotReading = () => {
  const [revealedCards, setRevealedCards] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalReading, setShowFinalReading] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const cards = [
    { 
      id: 1, 
      name: "컵 3", 
      position: "현재 상황", 
      reversed: true,
      meaning: "질투, 가십, 갈등, 소외감",
      interpretation: "사회적 관계에서 갈등이나 질투가 발생할 수 있습니다. 과도한 사교 활동으로 인해 피로감을 느낄 수 있어요.",
      advice: "진정한 우정과 적당한 사교 활동을 하세요. 가십이나 질투에 휘말리지 마세요.",
      icon: Heart,
      color: "text-blue-400"
    },
    { 
      id: 2, 
      name: "펜타클 왕", 
      position: "장애물/도전", 
      reversed: false,
      meaning: "성공, 리더십, 풍요, 안정",
      interpretation: "물질적 성공의 정점에 도달하여 안정적인 리더십을 발휘하는 시기입니다.",
      advice: "성공을 겸손하게 받아들이고 다른 사람들과 나누세요. 오만해지지 마세요.",
      icon: Shield,
      color: "text-yellow-400"
    },
    { 
      id: 3, 
      name: "태양", 
      position: "과거", 
      reversed: false,
      meaning: "성공, 기쁨, 활력, 성취",
      interpretation: "모든 것이 순조롭게 진행되는 매우 긍정적인 시기였습니다. 성공과 행복을 경험했네요.",
      advice: "긍정적인 에너지를 최대한 활용하고 성공을 축하하세요.",
      icon: Sun,
      color: "text-orange-400"
    },
    { 
      id: 4, 
      name: "죽음", 
      position: "미래", 
      reversed: false,
      meaning: "변화, 종료, 재생, 새시작",
      interpretation: "중요한 변화와 전환의 시기가 올 것입니다. 무언가가 끝나지만 새로운 시작을 의미해요.",
      advice: "변화를 받아들이고 과거를 정리하며 새로운 시작을 준비하세요.",
      icon: Moon,
      color: "text-purple-400"
    },
    { 
      id: 5, 
      name: "소드 7", 
      position: "가능한 결과", 
      reversed: false,
      meaning: "속임수, 교활함, 회피, 전략",
      interpretation: "교묘한 방법이나 속임수에 주의해야 할 시기입니다. 정직한 방법을 선택하세요.",
      advice: "정직한 방법을 사용하고 다른 사람들과 협력하세요.",
      icon: Zap,
      color: "text-red-400"
    },
    { 
      id: 6, 
      name: "완드 5", 
      position: "최근 영향", 
      reversed: false,
      meaning: "경쟁, 갈등, 도전, 분쟁",
      interpretation: "경쟁이 치열하거나 의견 충돌이 있는 상황이었습니다. 다양한 도전을 겪으셨네요.",
      advice: "건설적인 경쟁을 통해 자신을 발전시키세요.",
      icon: Target,
      color: "text-green-400"
    },
    { 
      id: 7, 
      name: "완드 에이스", 
      position: "당신의 접근", 
      reversed: false,
      meaning: "창조, 영감, 새시작, 잠재력",
      interpretation: "강력한 창조적 에너지가 분출하는 시기입니다. 새로운 아이디어와 기회가 펼쳐져 있어요.",
      advice: "떠오르는 아이디어를 즉시 실행에 옮기세요.",
      icon: Sparkles,
      color: "text-pink-400"
    },
    { 
      id: 8, 
      name: "황제", 
      position: "외부 영향", 
      reversed: false,
      meaning: "권위, 리더십, 안정, 구조",
      interpretation: "강력한 리더십과 안정된 구조를 통해 목표를 달성할 수 있는 시기입니다.",
      advice: "리더십을 발휘하되 공정하고 보호하는 자세를 유지하세요.",
      icon: Eye,
      color: "text-indigo-400"
    },
    { 
      id: 9, 
      name: "펜타클 5", 
      position: "희망과 두려움", 
      reversed: false,
      meaning: "곤경, 결핍, 고립, 어려움",
      interpretation: "경제적 어려움이나 건강상의 문제가 우려됩니다. 하지만 도움은 가까이에 있어요.",
      advice: "자존심을 버리고 필요하다면 도움을 요청하세요.",
      icon: Clock,
      color: "text-gray-400"
    },
    { 
      id: 10, 
      name: "소드 5", 
      position: "최종 결과", 
      reversed: true,
      meaning: "화해, 용서, 교훈, 극복",
      interpretation: "갈등을 해결하고 화해를 추구하게 됩니다. 과거의 실수를 인정하고 관계를 회복할 것입니다.",
      advice: "화해와 용서를 통해 관계를 회복하세요.",
      icon: Star,
      color: "text-cyan-400"
    }
  ];

  const positions = {
    1: { top: '45%', left: '45%', transform: 'translate(-50%, -50%)' }, // 중앙
    2: { top: '25%', left: '45%', transform: 'translate(-50%, -50%)' }, // 위
    3: { top: '45%', left: '25%', transform: 'translate(-50%, -50%)' }, // 왼쪽
    4: { top: '45%', left: '65%', transform: 'translate(-50%, -50%)' }, // 오른쪽
    5: { top: '65%', left: '45%', transform: 'translate(-50%, -50%)' }, // 아래
    6: { top: '20%', left: '80%', transform: 'translate(-50%, -50%)' }, // 오른쪽 위
    7: { top: '35%', left: '80%', transform: 'translate(-50%, -50%)' }, // 오른쪽 중간
    8: { top: '50%', left: '80%', transform: 'translate(-50%, -50%)' }, // 오른쪽 중간 아래
    9: { top: '65%', left: '80%', transform: 'translate(-50%, -50%)' }, // 오른쪽 아래
    10: { top: '80%', left: '80%', transform: 'translate(-50%, -50%)' }, // 오른쪽 맨 아래
  };

  const revealCard = (cardId) => {
    if (revealedCards[cardId] || isReading) return;
    
    setIsReading(true);
    setRevealedCards(prev => ({ ...prev, [cardId]: true }));
    setCurrentStep(prev => prev + 1);
    
    setTimeout(() => {
      setIsReading(false);
      if (currentStep + 1 === 10) {
        setTimeout(() => setShowFinalReading(true), 1000);
      }
    }, 2000);
  };

  const Card = ({ card }) => {
    const isRevealed = revealedCards[card.id];
    const Icon = card.icon;
    const pos = positions[card.id];

    return (
      <div 
        className={`absolute w-20 h-32 cursor-pointer transition-all duration-500 hover:scale-105 ${
          isRevealed ? 'z-20' : 'z-10'
        }`}
        style={pos}
        onClick={() => revealCard(card.id)}
      >
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
          isRevealed ? 'rotate-y-180' : ''
        }`}>
          {/* 카드 뒷면 */}
          <div className="absolute inset-0 backface-hidden rounded-lg bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-purple-400 flex items-center justify-center">
            <div className="text-purple-200 text-xs font-bold text-center">
              <Star className="w-6 h-6 mx-auto mb-1" />
              TAROT
            </div>
          </div>
          
          {/* 카드 앞면 */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${
            card.reversed ? 'border-red-400' : 'border-golden-400'
          } p-2 flex flex-col items-center justify-center text-center`}>
            <Icon className={`w-6 h-6 mb-1 ${card.color}`} />
            <div className="text-white text-xs font-bold mb-1">
              {card.name}
              {card.reversed && <span className="text-red-400 ml-1">↻</span>}
            </div>
            <div className="text-gray-300 text-xs">
              {card.position}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      {/* 헤더 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔮 켈틱크로스 타로 리딩
        </h1>
        <p className="text-purple-200 mb-4">
          "앞으로 한 달간 나에게 어떤 일이 일어날까요?"
        </p>
        <div className="text-sm text-gray-300">
          진행상황: {currentStep}/10 ({Math.round((currentStep/10)*100)}%)
        </div>
        <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto mt-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep/10)*100}%` }}
          ></div>
        </div>
      </div>

      {/* 카드 스프레드 */}
      <div className="relative h-96 mx-auto max-w-4xl">
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* 카드 해석 */}
      {Object.keys(revealedCards).length > 0 && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h3 className="text-xl font-bold mb-4 text-center">
            💫 카드 해석
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {cards.filter(card => revealedCards[card.id]).map(card => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center mb-2">
                    <Icon className={`w-5 h-5 mr-2 ${card.color}`} />
                    <h4 className="font-bold">
                      {card.name} {card.reversed && <span className="text-red-400">↻</span>}
                    </h4>
                    <span className="ml-auto text-sm text-gray-400">
                      {card.position}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    {card.interpretation}
                  </p>
                  <div className="text-xs text-purple-300 bg-purple-900/30 rounded p-2">
                    💡 조언: {card.advice}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 최종 해석 */}
      {showFinalReading && (
        <div className="max-w-4xl mx-auto px-4 py-6 border-t border-purple-500/30 mt-6">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-lg p-6 border border-purple-400/30">
            <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌟 종합 해석
            </h3>
            
            <div className="space-y-4 text-gray-200">
              <div>
                <h4 className="font-bold text-purple-300 mb-2">🎯 핵심 메시지</h4>
                <p>현재 당신은 과거의 성공과 기쁨에서 벗어나 새로운 변화의 시기를 맞이하고 있습니다. 사회적 관계에서의 갈등이나 어려움이 있지만, 이는 더 큰 성장을 위한 과정입니다.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-purple-300 mb-2">⏰ 시간적 흐름</h4>
                <p>앞으로 한 달간 창조적 에너지와 리더십을 발휘할 기회가 올 것입니다. 중간에 도전적인 상황이 있겠지만, 결국 화해와 용서를 통해 더 나은 결과를 얻게 될 것입니다.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-purple-300 mb-2">💎 행동 지침</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>새로운 아이디어나 프로젝트를 적극적으로 추진하세요</li>
                  <li>인간관계에서 정직하고 협력적인 자세를 유지하세요</li>
                  <li>변화를 두려워하지 말고 새로운 시작을 준비하세요</li>
                  <li>필요할 때는 도움을 요청하는 것을 주저하지 마세요</li>
                </ul>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-4 mt-6">
                <h4 className="font-bold text-yellow-300 mb-2">✨ 최종 조언</h4>
                <p className="text-center italic">
                  "변화는 두려운 것이 아니라 성장의 기회입니다. 당신의 창조적 에너지와 리더십으로 새로운 길을 개척해 나가세요. 진정한 성공은 혼자가 아닌 다른 사람들과 함께 할 때 더욱 빛납니다."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 하단 안내 */}
      <div className="text-center py-6 text-gray-400 text-sm">
        {currentStep < 10 ? (
          <p>카드를 클릭하여 운세를 확인해보세요 ✨</p>
        ) : (
          <p>리딩이 완료되었습니다. 좋은 하루 되세요! 🌟</p>
        )}
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default TarotReading;