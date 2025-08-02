import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// 환경변수 로드
dotenv.config();
import { createServer } from 'http';
import { cardLoader } from '../utils/cardLoader';
import { tarotReading } from '../services/tarotReading';
import { CardRenderer } from '../utils/cardRenderer';
import { realtimeWebSocketServer } from './websocket-server';
import { aiWarmup } from '../services/aiWarmup';
import { readingHistory } from '../services/readingHistory';
import { progressiveReading } from '../services/progressiveReading';
import { structuredTarotEngine } from '../services/structuredTarotEngine';
const HybridTarotEngine = require('../services/hybridTarotEngine');

const app = express();
const httpServer = createServer(app);
const PORT = 3001;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public-dev')));

// 초기화
let isInitialized = false;
let hybridEngine: any;

async function initializeApp() {
  if (!isInitialized) {
    console.log('🔮 타로 앱 서버 초기화 시작...');
    
    // 1. 카드 데이터 로드
    await cardLoader.loadAllCards();
    console.log('✅ 타로 카드 데이터 로드 완료');
    
    // 2. 하이브리드 ML+AI 엔진 초기화
    hybridEngine = new HybridTarotEngine();
    console.log('🤖 하이브리드 ML+AI 엔진 초기화 완료');
    
    // 3. AI 워밍업 시작 (백그라운드)
    aiWarmup.warmup().catch(error => {
      console.error('AI 워밍업 실패 (서비스는 계속 작동):', error);
    });
    
    // 4. 히스토리 정리 스케줄링 (24시간마다)
    setInterval(() => {
      readingHistory.cleanupOldSessions(24);
    }, 24 * 60 * 60 * 1000);
    
    isInitialized = true;
    console.log('🔮 타로 앱 서버 초기화 완료');
  }
}

// API 라우트들
app.get('/api/status', (req, res) => {
  const stats = cardLoader.isDataLoaded() ? cardLoader.getStats() : { error: '데이터 로딩 중...' };
  res.json({
    status: 'ok',
    initialized: isInitialized,
    stats,
    ai: aiWarmup.getStatus(),
    history: readingHistory.getStats()
  });
});

// 단일 카드 리딩
app.post('/api/reading/single', async (req, res) => {
  try {
    await initializeApp();
    const { question, category = 'general', engineType = 'ai' } = req.body;
    
    console.log(`🔍 단일카드 요청된 엔진 타입: ${engineType}`);
    
    let reading;
    let cardDisplayData = null;
    
    if (engineType === 'hybrid' || engineType === 'pure-ai' || engineType === 'true-hybrid') {
      try {
        // 🤖 ML+AI 하이브리드 엔진 사용
        console.log(`🤖 하이브리드 엔진으로 단일카드 해석: ${question}`);
        const tarotCards = cardLoader.getIntuitiveCards(1, question, category);
        const selectedCards = tarotCards.map((card, index) => ({
          name: card.name,
          isReversed: Math.random() < 0.25,
          card,
          position: index
        }));
        
        console.log('🔧 하이브리드 엔진 호출 시작...');
        const mode = engineType === 'pure-ai' ? 'pure_ai' : 
                  engineType === 'true-hybrid' ? 'hybrid' : 'pure_ai';
        const hybridResult = await hybridEngine.generateReading(selectedCards, question, '단일카드', category, mode);
        console.log('✅하이브리드 엔진 결과 생성 완료');
        
        reading = {
          id: Date.now().toString(),
          question,
          category,
          cards: selectedCards.map(card => ({
            card: card.card,
            position: card.position,
            isReversed: card.isReversed
          })),
          interpretation: hybridResult.mainContent,
          qualityMetrics: hybridResult.qualityMetrics,
          engineType: hybridResult.metadata?.model || `hybrid-${engineType}`,
          createdAt: new Date()
        };
        
        cardDisplayData = CardRenderer.createMobileCardData({
          card: selectedCards[0].card,
          position: selectedCards[0].position,
          isReversed: selectedCards[0].isReversed
        });
      } catch (error) {
        console.error('❌ 하이브리드 엔진 오류:', error);
        throw error;
      }
    } else if (engineType === 'internal') {
      // 구조화된 내부 엔진 사용
      console.log(`🏗️ 내부 엔진으로 단일카드 해석: ${question}`);
      const tarotCards = cardLoader.getIntuitiveCards(1, question, category);
      const selectedCards = tarotCards.map((card, index) => ({
        card,
        position: index,
        isReversed: Math.random() < 0.25
      }));
      const interpretation = structuredTarotEngine.generateStructuredReading(selectedCards, question, category as any, 'situation_action_outcome');
      
      reading = {
        id: Date.now().toString(),
        question,
        category,
        cards: selectedCards,
        interpretation,
        engineType: 'internal',
        createdAt: new Date()
      };
      
      cardDisplayData = CardRenderer.createMobileCardData(selectedCards[0]);
    } else {
      // 기존 AI 엔진 사용
      console.log(`🤖 AI 엔진으로 단일카드 해석: ${question}`);
      reading = await tarotReading.performSingleCardReading(question, category);
      
      if (reading.cards && reading.cards.length > 0) {
        cardDisplayData = CardRenderer.createMobileCardData(reading.cards[0]);
      }
    }
    
    res.json({
      ...reading,
      cardDisplay: cardDisplayData,
      createdAt: reading.createdAt ? reading.createdAt.toISOString() : new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: '리딩 실행 중 오류가 발생했습니다', details: error });
  }
});

// 3카드 스프레드
app.post('/api/reading/three-card', async (req, res) => {
  try {
    await initializeApp();
    const { question, category = 'general', spreadType = 'past_present_future', useProgressive = false, engineType = 'internal' } = req.body;
    
    console.log(`🔍 3카드 요청된 엔진 타입: ${engineType}`);
    console.log(`🔍 3카드 요청 body 전체:`, JSON.stringify(req.body, null, 2));
    
    if (!useProgressive) {
      let reading;
      let cardDisplayData = null;
      
      // 카드 선택 시에는 항상 내부 엔진 사용하도록 강제
      if (req.body.cardSelection && req.body.cardSelection.method === 'pick-a-card') {
        console.log(`🎴 카드 선택 모드 감지 - 사용자가 선택한 카드 사용`);
        console.log(`🎴 선택된 카드 데이터:`, req.body.cardSelection.selectedCards);
        
        // 사용자가 선택한 실제 카드 데이터 사용
        const selectedCards = req.body.cardSelection.selectedCards.map((cardData: any, index: number) => {
          // cardLoader에서 실제 카드 데이터 찾기 (한국어 이름으로)
          const actualCard = cardLoader.findCardByKoreanName(cardData.name);
          if (!actualCard) {
            console.warn(`카드를 찾을 수 없습니다: ${cardData.name}, 기본 데이터 사용`);
            return {
              card: {
                name: cardData.name,
                type: cardData.type,
                suit: cardData.suit,
                number: cardData.number,
                keywords: [],
                meaning: `${cardData.name}의 의미`,
                reversed_meaning: `${cardData.name}의 역방향 의미`,
                interpretations: {
                  upright: { general: `${cardData.name}의 정방향 의미` },
                  reversed: { general: `${cardData.name}의 역방향 의미` }
                },
                uprightKeywords: ['성장', '기회'],
                reversedKeywords: ['지연', '장애'],
                advice: {
                  upright: {
                    action: `${cardData.name}의 행동 지침`,
                    focus: `${cardData.name}의 집중 포인트`,
                    avoid: `${cardData.name}의 주의사항`
                  },
                  reversed: {
                    action: `${cardData.name} 역방향의 행동 지침`,
                    focus: `${cardData.name} 역방향의 집중 포인트`,
                    avoid: `${cardData.name} 역방향의 주의사항`
                  }
                }
              },
              position: index,
              isReversed: cardData.isReversed
            };
          }
          
          return {
            card: actualCard,
            position: index,
            isReversed: cardData.isReversed
          };
        });
        
        const interpretation = structuredTarotEngine.generateStructuredReading(selectedCards, question, category as any, 'past_present_future');
        
        reading = {
          id: Date.now().toString(),
          question,
          category,
          spreadType,
          cards: selectedCards,
          interpretation,
          engineType: 'internal',
          createdAt: new Date()
        };
        
        cardDisplayData = selectedCards.map((card: any) => CardRenderer.createMobileCardData(card));
      } else if (engineType === 'hybrid' || engineType === 'pure-ai' || engineType === 'true-hybrid') {
        try {
          // 🤖 ML+AI 하이브리드 엔진 사용
          console.log(`🤖 하이브리드 엔진으로 3카드 해석: ${question}`);
          const tarotCards = cardLoader.getIntuitiveCards(3, question, category);
          const selectedCards = tarotCards.map((card, index) => ({
            name: card.name,
            isReversed: Math.random() < 0.25,
            card,
            position: index
          }));
          
          console.log('🔧 하이브리드 엔진 호출 시작...');
          console.log('🔍 hybridEngine 존재 여부:', !!hybridEngine);
          console.log('🔍 selectedCards:', selectedCards);
          console.log('🔍 question:', question);
          console.log('🔍 category:', category);
          
          const mode = engineType === 'pure-ai' ? 'pure_ai' : 
                    engineType === 'true-hybrid' ? 'hybrid' : 'pure_ai';
        const hybridResult = await hybridEngine.generateReading(selectedCards, question, '3카드', category, mode);
          console.log('✅ 하이브리드 엔진 결과 생성 완료');
          
          reading = {
            id: Date.now().toString(),
            question,
            category,
            spreadType,
            cards: selectedCards.map(card => ({
              card: card.card,
              position: card.position,
              isReversed: card.isReversed
            })),
            interpretation: hybridResult.mainContent,
            qualityMetrics: hybridResult.qualityMetrics,
            engineType: hybridResult.metadata?.model || `hybrid-${engineType}`,
            createdAt: new Date()
          };
          
          cardDisplayData = selectedCards.map(card => CardRenderer.createMobileCardData({
            card: card.card,
            position: card.position,
            isReversed: card.isReversed
          }));
        } catch (error) {
          console.error('❌ 하이브리드 엔진 오류:', error);
          throw error;
        }
      } else if (engineType === 'internal') {
        // 구조화된 내부 엔진 사용
        console.log(`🏗️ 내부 엔진으로 3카드 해석: ${question}`);
        const tarotCards = cardLoader.getIntuitiveCards(3, question, category);
        const selectedCards = tarotCards.map((card, index) => ({
          card,
          position: index,
          isReversed: Math.random() < 0.25
        }));
        const interpretation = structuredTarotEngine.generateStructuredReading(selectedCards, question, category as any, 'past_present_future');
        
        reading = {
          id: Date.now().toString(),
          question,
          category,
          spreadType,
          cards: selectedCards,
          interpretation,
          engineType: 'internal',
          createdAt: new Date()
        };
        
        cardDisplayData = selectedCards.map((card: any) => CardRenderer.createMobileCardData(card));
      } else {
        // 기존 AI 엔진 사용  
        console.log(`🤖 AI 엔진으로 3카드 해석: ${question}`);
        reading = await tarotReading.performThreeCardReading(question, category, spreadType);
        
        if (reading.cards && reading.cards.length > 0) {
          cardDisplayData = reading.cards.map(card => CardRenderer.createMobileCardData(card));
        }
      }
      
      res.json({
        ...reading,
        cardDisplay: cardDisplayData,
        createdAt: reading.createdAt.toISOString()
      });
    } else {
      // 🎯 점진적 해석 방식
      console.log('🎴 점진적 3카드 해석 요청:', question);
      
      // 1. 카드만 먼저 선택
      const selectedCards = cardLoader.getIntuitiveCards(3, question, category);
      const cards = selectedCards.map((card, index) => {
        const determinedOrientation = (Math.random() * 100) < 25; // 25% 확률로 역방향
        return {
          card,
          position: index,
          isReversed: determinedOrientation
        };
      });
      
      // 2. 세션 ID 생성
      const sessionId = `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 3. 카드 표시 데이터 생성
      const cardDisplayData = cards.map(card => CardRenderer.createMobileCardData(card));
      
      // 4. 즉시 응답 (카드 정보만)
      res.json({
        readingType: 'progressive',
        sessionId,
        question,
        category,
        spreadType,
        cards: cardDisplayData,
        status: 'ready',
        message: 'WebSocket으로 연결하면 점진적 해석이 시작됩니다',
        websocketUrl: '/socket.io/'
      });
    }
    
  } catch (error) {
    console.error('3카드 해석 요청 처리 오류:', error);
    res.status(500).json({ error: '3카드 리딩 실행 중 오류가 발생했습니다', details: error });
  }
});

// 관계 상담
app.post('/api/reading/relationship', async (req, res) => {
  try {
    await initializeApp();
    const { question, useProgressive = false, engineType = 'ai' } = req.body;
    
    if (!useProgressive) {
      let reading;
      let cardDisplayData = null;
      
      if (engineType === 'hybrid' || engineType === 'pure-ai' || engineType === 'true-hybrid') {
        try {
          // 🤖 ML+AI 하이브리드 엔진 사용
          console.log(`🤖 하이브리드 엔진으로 관계상담 해석: ${question}`);
          const tarotCards = cardLoader.getIntuitiveCards(5, question, 'love');
          const selectedCards = tarotCards.map((card, index) => ({
            name: card.name,
            isReversed: Math.random() < 0.25,
            card,
            position: index
          }));
          
          console.log('🔧 하이브리드 엔진 호출 시작...');
          const mode = engineType === 'pure-ai' ? 'pure_ai' : 
                    engineType === 'true-hybrid' ? 'hybrid' : 'pure_ai';
          const hybridResult = await hybridEngine.generateReading(selectedCards, question, '관계상담', 'love', mode);
          console.log('✅ 하이브리드 엔진 결과 생성 완료');
          
          reading = {
            id: Date.now().toString(),
            question,
            category: 'love',
            cards: selectedCards.map(card => ({
              card: card.card,
              position: card.position,
              isReversed: card.isReversed
            })),
            interpretation: hybridResult.mainContent,
            qualityMetrics: hybridResult.qualityMetrics,
            engineType: hybridResult.metadata?.model || `hybrid-${engineType}`,
            createdAt: new Date()
          };
          
          cardDisplayData = selectedCards.map(card => CardRenderer.createMobileCardData({
            card: card.card,
            position: card.position,
            isReversed: card.isReversed
          }));
        } catch (error) {
          console.error('❌ 하이브리드 엔진 오류:', error);
          throw error;
        }
      } else if (engineType === 'internal') {
        // 구조화된 내부 엔진 사용
        console.log(`🏗️ 내부 엔진으로 관계상담 해석: ${question}`);
        const tarotCards = cardLoader.getIntuitiveCards(5, question, 'love');
        const selectedCards = tarotCards.map((card, index) => ({
          card,
          position: index,
          isReversed: Math.random() < 0.25
        }));
        const interpretation = structuredTarotEngine.generateStructuredReading(selectedCards, question, 'love', 'relationship');
        
        reading = {
          id: Date.now().toString(),
          question,
          category: 'love',
          cards: selectedCards,
          interpretation,
          engineType: 'internal',
          createdAt: new Date()
        };
        
        cardDisplayData = selectedCards.map((card: any) => CardRenderer.createMobileCardData(card));
      } else {
        // 기존 AI 엔진 사용
        console.log(`🤖 AI 엔진으로 관계상담 해석: ${question}`);
        reading = await tarotReading.performRelationshipReading(question);
        
        if (reading.cards && reading.cards.length > 0) {
          cardDisplayData = reading.cards.map(card => CardRenderer.createMobileCardData(card));
        }
      }
      
      res.json({
        ...reading,
        cardDisplay: cardDisplayData,
        createdAt: reading.createdAt.toISOString()
      });
    } else {
      // 🎯 점진적 해석 방식
      console.log('💕 점진적 관계 상담 해석 요청:', question);
      
      // 1. 관계 상담용 카드 5장 선택
      const selectedCards = cardLoader.getIntuitiveCards(5, question, 'love');
      const cards = selectedCards.map((card, index) => {
        const determinedOrientation = (Math.random() * 100) < 25; // 25% 확률로 역방향
        return {
          card,
          position: index,
          isReversed: determinedOrientation
        };
      });
      
      // 2. 세션 ID 생성
      const sessionId = `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 3. 카드 표시 데이터 생성
      const cardDisplayData = cards.map(card => CardRenderer.createMobileCardData(card));
      
      // 4. 즉시 응답 (카드 정보만)
      res.json({
        readingType: 'progressive',
        sessionId,
        question,
        category: 'love',
        spreadType: 'relationship',
        cards: cardDisplayData,
        status: 'ready',
        message: 'WebSocket으로 연결하면 점진적 해석이 시작됩니다',
        websocketUrl: '/socket.io/'
      });
    }
    
  } catch (error) {
    console.error('관계 상담 해석 요청 처리 오류:', error);
    res.status(500).json({ error: '관계 리딩 실행 중 오류가 발생했습니다', details: error });
  }
});

// 켈틱 크로스
app.post('/api/reading/celtic-cross', async (req, res) => {
  try {
    await initializeApp();
    const { question, category = 'general', useProgressive = false, engineType = 'ai' } = req.body;
    
    if (!useProgressive) {
      let reading;
      let cardDisplayData = null;
      
      if (engineType === 'hybrid' || engineType === 'pure-ai' || engineType === 'true-hybrid') {
        try {
          // 🤖 ML+AI 하이브리드 엔진 사용
          console.log(`🤖 하이브리드 엔진으로 켈틱크로스 해석: ${question}`);
          const tarotCards = cardLoader.getIntuitiveCards(10, question, category);
          const selectedCards = tarotCards.map((card, index) => ({
            name: card.name,
            isReversed: Math.random() < 0.25,
            card,
            position: index
          }));
          
          console.log('🔧 하이브리드 엔진 호출 시작...');
          const mode = engineType === 'pure-ai' ? 'pure_ai' : 
                    engineType === 'true-hybrid' ? 'hybrid' : 'pure_ai';
          const hybridResult = await hybridEngine.generateReading(selectedCards, question, '켈틱크로스', category, mode);
          console.log('✅ 하이브리드 엔진 결과 생성 완료');
          
          reading = {
            id: Date.now().toString(),
            question,
            category,
            cards: selectedCards.map(card => ({
              card: card.card,
              position: card.position,
              isReversed: card.isReversed
            })),
            interpretation: hybridResult.mainContent,
            qualityMetrics: hybridResult.qualityMetrics,
            engineType: hybridResult.metadata?.model || `hybrid-${engineType}`,
            createdAt: new Date()
          };
          
          cardDisplayData = selectedCards.map(card => CardRenderer.createMobileCardData({
            card: card.card,
            position: card.position,
            isReversed: card.isReversed
          }));
        } catch (error) {
          console.error('❌ 하이브리드 엔진 오류:', error);
          throw error;
        }
      } else if (engineType === 'internal') {
        // 구조화된 내부 엔진 사용
        console.log(`🏗️ 내부 엔진으로 켈틱크로스 해석: ${question}`);
        const tarotCards = cardLoader.getIntuitiveCards(10, question, category);
        const selectedCards = tarotCards.map((card, index) => ({
          card,
          position: index,
          isReversed: Math.random() < 0.25
        }));
        const interpretation = structuredTarotEngine.generateStructuredReading(selectedCards, question, category as any, 'celtic_cross');
        
        reading = {
          id: Date.now().toString(),
          question,
          category,
          cards: selectedCards,
          interpretation,
          engineType: 'internal',
          createdAt: new Date()
        };
        
        cardDisplayData = selectedCards.map((card: any) => CardRenderer.createMobileCardData(card));
      } else {
        // 기존 AI 엔진 사용
        console.log(`🤖 AI 엔진으로 켈틱크로스 해석: ${question}`);
        reading = await tarotReading.performCelticCrossReading(question, category);
        
        if (reading.cards && reading.cards.length > 0) {
          cardDisplayData = reading.cards.map(card => CardRenderer.createMobileCardData(card));
        }
      }
      
      res.json({
        ...reading,
        cardDisplay: cardDisplayData,
        createdAt: reading.createdAt.toISOString()
      });
    } else {
      // 🎯 점진적 해석 방식
      console.log('✨ 점진적 켈틱 크로스 해석 요청:', question);
      
      // 1. 켈틱 크로스용 카드 10장 선택
      const selectedCards = cardLoader.getIntuitiveCards(10, question, category);
      const cards = selectedCards.map((card, index) => {
        const determinedOrientation = (Math.random() * 100) < 25; // 25% 확률로 역방향
        return {
          card,
          position: index,
          isReversed: determinedOrientation
        };
      });
      
      // 2. 세션 ID 생성
      const sessionId = `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 3. 카드 표시 데이터 생성
      const cardDisplayData = cards.map(card => CardRenderer.createMobileCardData(card));
      
      // 4. 즉시 응답 (카드 정보만)
      res.json({
        readingType: 'progressive',
        sessionId,
        question,
        category,
        spreadType: 'celtic_cross',
        cards: cardDisplayData,
        status: 'ready',
        message: 'WebSocket으로 연결하면 점진적 해석이 시작됩니다',
        websocketUrl: '/socket.io/'
      });
    }
    
  } catch (error) {
    console.error('켈틱 크로스 해석 요청 처리 오류:', error);
    res.status(500).json({ error: '켈틱 크로스 리딩 실행 중 오류가 발생했습니다', details: error });
  }
});

// 질문 분석
app.post('/api/analyze-question', async (req, res) => {
  try {
    await initializeApp();
    const { question } = req.body;
    
    const analysis = tarotReading.analyzeQuestion(question);
    
    // 질문이 유효하지 않은 경우
    if (!analysis.isValid) {
      res.status(400).json({
        error: '유효하지 않은 질문입니다',
        message: analysis.validationMessage,
        isValid: false
      });
      return;
    }
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: '질문 분석 중 오류가 발생했습니다', details: error });
  }
});

// 메인 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// WebSocket 서버 초기화
realtimeWebSocketServer.initialize(httpServer);

// 서버 시작
httpServer.listen(PORT, async () => {
  console.log(`🌐 타로 카드 웹 앱이 http://localhost:${PORT} 에서 실행 중입니다`);
  console.log('🔮 데이터 초기화 중...');
  await initializeApp();
  console.log('✨ 모든 준비 완료! 브라우저에서 확인해보세요');
});

export default app;