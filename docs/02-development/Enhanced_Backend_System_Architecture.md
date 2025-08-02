# 🏗️ 향상된 백엔드 시스템 아키텍처

## 📋 문서 정보
**작성일**: 2025년 8월 2일  
**버전**: v2.0 개선안  
**기반 문서**: `/docs/07-archive/backend_admin_system_part1.md` 분석 및 개선  
**기술 스택**: Vercel + Supabase + React Native  
**목표**: 프로덕션 레벨 확장 가능한 백엔드 시스템

---

## 🚀 **기존 문서 분석 결과**

### **✅ 기존 문서의 장점**
- **포괄적인 UI 설계**: 11개 주요 관리 영역의 상세한 UI 스펙
- **실무적 접근**: 실제 관리자가 필요로 하는 기능들 포함
- **체계적 구조**: 논리적으로 잘 정리된 관리 도메인 분류

### **❌ 기존 문서의 한계점**
- **기술 구현 부재**: UI 디자인만 있고 실제 코드/아키텍처 없음
- **구식 접근법**: 모놀리식 관리자 시스템 (현대적 마이크로서비스 아키텍처 부재)
- **확장성 부족**: 대규모 트래픽 및 글로벌 배포 고려 부족
- **실시간 기능 한계**: WebSocket 기반 실시간 시스템 구체적 설계 부족

---

## 🎯 **개선된 백엔드 아키텍처**

### **1. 마이크로서비스 기반 구조**
```typescript
// 서버리스 마이크로서비스 아키텍처
📦 Backend Services
├── 🔐 Auth Service (Supabase Auth)
│   ├── JWT 토큰 관리
│   ├── 소셜 로그인 (Google, Apple, Kakao)
│   ├── 관리자 권한 시스템
│   └── 세션 관리
├── 🔮 Tarot Service (Edge Functions)
│   ├── AI 해석 엔진
│   ├── 카드 선택 로직
│   ├── 스프레드 패턴 관리
│   └── 품질 평가 시스템
├── 💳 Payment Service (Vercel API Routes)
│   ├── 인앱결제 처리
│   ├── 구독 관리
│   ├── 환불 처리
│   └── 영수증 검증
├── 👥 User Service (Supabase RPC)
│   ├── 프로필 관리
│   ├── 토큰 시스템
│   ├── 활동 추적
│   └── 세그멘테이션
├── 📊 Analytics Service (Vercel + Supabase Views)
│   ├── 실시간 대시보드
│   ├── 비즈니스 인텔리전스
│   ├── 사용자 행동 분석
│   └── 성과 지표 추적
├── 📱 Notification Service (Edge Functions)
│   ├── 푸시 알림 (Expo Notifications)
│   ├── 이메일 발송 (Resend)
│   ├── SMS 발송 (Twilio)
│   └── 인앱 메시지
├── 📁 Storage Service (Supabase Storage)
│   ├── 카드 이미지 관리
│   ├── 사용자 프로필 이미지
│   ├── 문서 파일 관리
│   └── CDN 최적화
└── 🔍 Monitoring Service (Vercel Analytics)
    ├── 에러 추적 (Sentry)
    ├── 성능 모니터링
    ├── 로그 집계
    └── 알림 시스템
```

### **2. 데이터베이스 설계 (Supabase PostgreSQL)**
```sql
-- 핵심 테이블 구조 설계
-- 사용자 관리
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  birth_date DATE,
  zodiac_sign TEXT,
  subscription_type subscription_tier DEFAULT 'free',
  tokens_remaining INTEGER DEFAULT 3,
  tokens_lifetime INTEGER DEFAULT 0,
  last_active_at TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 구독 관리
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'vip');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'pending');

CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  tier subscription_tier NOT NULL,
  status subscription_status DEFAULT 'pending',
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  external_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 타로카드 마스터 데이터
CREATE TABLE tarot_cards (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  suit TEXT NOT NULL CHECK (suit IN ('major', 'cups', 'wands', 'swords', 'pentacles')),
  number INTEGER,
  keywords_en TEXT[],
  keywords_ko TEXT[],
  meanings JSONB NOT NULL, -- {upright: {love, career, money, health, general}, reversed: {...}}
  image_url TEXT NOT NULL,
  image_metadata JSONB, -- {width, height, format, size}
  symbolism JSONB, -- {colors, symbols, elements}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 상담 타입 및 카테고리
CREATE TABLE consultation_categories (
  id TEXT PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  icon TEXT,
  color_hex TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'
);

CREATE TABLE consultation_types (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES consultation_categories(id),
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  card_count INTEGER NOT NULL,
  token_cost INTEGER DEFAULT 1,
  estimated_duration_minutes INTEGER,
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  is_popular BOOLEAN DEFAULT false,
  is_premium_only BOOLEAN DEFAULT false,
  spread_layout JSONB, -- {positions: [{id, name, description, x, y}]}
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 리딩 기록 및 세션
CREATE TYPE reading_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');

CREATE TABLE readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  category_id TEXT REFERENCES consultation_categories(id),
  consultation_type_id TEXT REFERENCES consultation_types(id),
  question TEXT NOT NULL,
  question_metadata JSONB, -- {emotion_analysis, keywords, language}
  selected_cards JSONB NOT NULL, -- [{card_id, position, is_reversed, selected_at}]
  interpretation JSONB, -- {individual_cards: [], overall_story, advice, summary}
  satisfaction_rating INTEGER CHECK (satisfaction_rating BETWEEN 1 AND 5),
  satisfaction_feedback TEXT,
  status reading_status DEFAULT 'pending',
  progress_percentage INTEGER DEFAULT 0,
  current_step TEXT,
  ai_model_used TEXT,
  processing_time_ms INTEGER,
  tokens_used INTEGER DEFAULT 1,
  is_flagged BOOLEAN DEFAULT false,
  flag_reason TEXT,
  processing_start_time TIMESTAMP WITH TIME ZONE,
  processing_end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 결제 및 토큰 관리
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded', 'disputed');
CREATE TYPE token_transaction_type AS ENUM ('purchase', 'bonus', 'refund', 'usage', 'expiry', 'admin_adjustment');

CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id),
  product_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web', 'admin')),
  transaction_id TEXT UNIQUE NOT NULL,
  receipt_data TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'KRW',
  tokens_purchased INTEGER DEFAULT 0,
  subscription_months INTEGER DEFAULT 0,
  status payment_status DEFAULT 'pending',
  processor TEXT, -- 'apple', 'google', 'stripe', etc.
  processor_fee_cents INTEGER,
  metadata JSONB DEFAULT '{}',
  verified_at TIMESTAMP WITH TIME ZONE,
  refunded_at TIMESTAMP WITH TIME ZONE,
  refund_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE token_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  payment_id UUID REFERENCES payments(id),
  reading_id UUID REFERENCES readings(id),
  transaction_type token_transaction_type NOT NULL,
  amount INTEGER NOT NULL, -- positive for credit, negative for debit
  balance_after INTEGER NOT NULL,
  description TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 관리자 시스템
CREATE TYPE admin_role AS ENUM ('super_admin', 'system_admin', 'operations_admin', 'support_admin', 'analyst');
CREATE TYPE admin_permission AS ENUM (
  'dashboard_view', 'user_management', 'content_management', 'financial_data',
  'system_settings', 'support_tools', 'analytics_full', 'marketing_tools'
);

CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  role admin_role NOT NULL,
  permissions admin_permission[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 감사 로그
CREATE TABLE admin_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES admin_users(id) NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT, -- 'user', 'reading', 'payment', etc.
  target_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 시스템 설정
CREATE TABLE system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 행동 추적
CREATE TABLE user_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  session_id UUID,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  platform TEXT,
  app_version TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 콘텐츠 관리
CREATE TABLE daily_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  card_id TEXT REFERENCES tarot_cards(id) NOT NULL,
  message_ko TEXT NOT NULL,
  message_en TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 알림 관리
CREATE TYPE notification_type AS ENUM ('push', 'email', 'sms', 'in_app');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'delivered', 'failed', 'clicked');

CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  status notification_status DEFAULT 'pending',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔧 **Supabase Edge Functions 구현**

### **1. AI 해석 엔진 (Edge Function)**
```typescript
// supabase/functions/ai-interpretation-v2/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface ReadingRequest {
  readingId: string;
  userId: string;
  question: string;
  selectedCards: Array<{
    cardId: string;
    position: string;
    isReversed: boolean;
    selectedAt: string;
  }>;
  consultationType: string;
  categoryId: string;
}

interface AIResponse {
  individualCards: Array<{
    cardId: string;
    position: string;
    interpretation: string;
    keywords: string[];
    advice: string;
  }>;
  overallStory: string;
  summary: string;
  advice: string;
  confidence: number;
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: ReadingRequest = await req.json();
    const { readingId, userId, question, selectedCards, consultationType, categoryId } = payload;

    // 1. 진행상태 업데이트 함수
    const updateProgress = async (progress: number, step: string) => {
      await supabase
        .from('readings')
        .update({
          progress_percentage: progress,
          current_step: step,
          updated_at: new Date().toISOString()
        })
        .eq('id', readingId);

      // 실시간 알림
      await supabase
        .channel('reading_progress')
        .send({
          type: 'broadcast',
          event: 'progress_update',
          payload: { readingId, progress, step, userId }
        });
    };

    // 2. 질문 분석 (감정, 키워드 추출)
    await updateProgress(10, '질문 분석 중...');
    const questionAnalysis = await analyzeQuestion(question, categoryId);

    // 3. 카드 데이터 조회
    await updateProgress(25, '카드 정보 조회 중...');
    const { data: cardsData } = await supabase
      .from('tarot_cards')
      .select('*')
      .in('id', selectedCards.map(c => c.cardId));

    // 4. 개별 카드 해석
    await updateProgress(40, '개별 카드 해석 중...');
    const individualInterpretations = await interpretIndividualCards(
      selectedCards,
      cardsData,
      questionAnalysis,
      consultationType
    );

    // 5. 전체 스토리 생성
    await updateProgress(65, '전체 스토리 구성 중...');
    const overallStory = await generateOverallStory(
      question,
      individualInterpretations,
      questionAnalysis,
      consultationType
    );

    // 6. 조언 및 요약 생성
    await updateProgress(80, '조언 및 요약 생성 중...');
    const advice = await generateAdvice(overallStory, questionAnalysis, categoryId);
    const summary = await generateSummary(overallStory, individualInterpretations);

    // 7. 결과 구성
    const finalResult: AIResponse = {
      individualCards: individualInterpretations,
      overallStory,
      summary,
      advice,
      confidence: calculateConfidence(individualInterpretations, overallStory)
    };

    // 8. 결과 저장
    await updateProgress(95, '결과 저장 중...');
    const processingEndTime = new Date().toISOString();
    
    await supabase
      .from('readings')
      .update({
        interpretation: finalResult,
        status: 'completed',
        progress_percentage: 100,
        current_step: '완료',
        processing_end_time: processingEndTime,
        ai_model_used: 'grok-beta',
        processing_time_ms: Date.now() - new Date(payload.startTime || Date.now()).getTime(),
        updated_at: processingEndTime
      })
      .eq('id', readingId);

    // 9. 사용자 이벤트 기록
    await supabase
      .from('user_events')
      .insert({
        user_id: userId,
        event_type: 'reading_completed',
        event_data: {
          readingId,
          consultationType,
          categoryId,
          cardCount: selectedCards.length,
          processingTimeMs: Date.now() - new Date(payload.startTime || Date.now()).getTime()
        }
      });

    return new Response(JSON.stringify({
      success: true,
      readingId,
      result: finalResult
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('AI 해석 오류:', error);
    
    // 오류 상태 업데이트
    if (payload?.readingId) {
      await supabase
        .from('readings')
        .update({
          status: 'failed',
          current_step: '처리 실패',
          error_message: error.message
        })
        .eq('id', payload.readingId);
    }

    return new Response(JSON.stringify({
      error: error.message,
      code: 'AI_PROCESSING_ERROR'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// 헬퍼 함수들
async function analyzeQuestion(question: string, categoryId: string) {
  // xAI API를 사용한 질문 분석
  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('XAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{
          role: 'system',
          content: `질문을 분석하여 감정 상태, 핵심 키워드, 질문 유형을 JSON으로 반환하세요.`
        }, {
          role: 'user',
          content: `카테고리: ${categoryId}\n질문: ${question}`
        }],
        max_tokens: 200,
        temperature: 0.3
      })
    });

    const result = await response.json();
    return JSON.parse(result.choices[0].message.content);
  } catch (error) {
    // 폴백: 기본 분석
    return {
      emotionalTone: 'neutral',
      keywords: question.split(' ').filter(word => word.length > 2),
      questionType: 'general',
      urgency: 'medium'
    };
  }
}

async function interpretIndividualCards(selectedCards: any[], cardsData: any[], questionAnalysis: any, consultationType: string) {
  const interpretations = [];
  
  for (const selectedCard of selectedCards) {
    const cardData = cardsData.find(c => c.id === selectedCard.cardId);
    if (!cardData) continue;

    const interpretation = await generateCardInterpretation(
      cardData,
      selectedCard.position,
      selectedCard.isReversed,
      questionAnalysis,
      consultationType
    );

    interpretations.push({
      cardId: selectedCard.cardId,
      position: selectedCard.position,
      interpretation,
      keywords: selectedCard.isReversed ? 
        cardData.keywords_ko.map((k: string) => `역 ${k}`) : 
        cardData.keywords_ko,
      advice: generateCardAdvice(cardData, selectedCard.isReversed, questionAnalysis)
    });
  }

  return interpretations;
}

async function generateCardInterpretation(
  cardData: any, 
  position: string, 
  isReversed: boolean, 
  questionAnalysis: any, 
  consultationType: string
) {
  // xAI API를 사용한 개별 카드 해석
  const prompt = `
타로카드 해석:
- 카드: ${cardData.name_ko}
- 위치: ${position}
- 방향: ${isReversed ? '역방향' : '정방향'}
- 질문 분석: ${JSON.stringify(questionAnalysis)}
- 상담 유형: ${consultationType}

이 카드가 현재 위치에서 주는 메시지를 구체적이고 개인화된 해석으로 작성하세요.
`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('XAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    // 폴백: 기본 해석 사용
    const meanings = cardData.meanings;
    const direction = isReversed ? 'reversed' : 'upright';
    return meanings[direction]?.general || '긍정적인 에너지가 느껴집니다.';
  }
}

function calculateConfidence(individualCards: any[], overallStory: string): number {
  // AI 해석의 신뢰도 계산
  let confidence = 85; // 기본 신뢰도
  
  // 카드 수에 따른 조정
  if (individualCards.length >= 3) confidence += 5;
  if (individualCards.length >= 7) confidence += 5;
  
  // 스토리 길이에 따른 조정
  if (overallStory.length > 200) confidence += 3;
  if (overallStory.length > 500) confidence += 2;
  
  return Math.min(confidence, 95); // 최대 95%
}
```

### **2. 실시간 알림 시스템 (Edge Function)**
```typescript
// supabase/functions/notification-service/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface NotificationRequest {
  type: 'push' | 'email' | 'sms' | 'in_app';
  target: {
    userIds?: string[];
    segments?: string[];
    all?: boolean;
  };
  content: {
    title: string;
    body: string;
    data?: Record<string, any>;
  };
  scheduling?: {
    sendAt?: string;
    timezone?: string;
  };
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: NotificationRequest = await req.json();
    const { type, target, content, scheduling } = payload;

    // 1. 대상 사용자 조회
    const targetUsers = await getTargetUsers(supabase, target);
    
    // 2. 알림 생성
    const notifications = targetUsers.map(userId => ({
      user_id: userId,
      type,
      title: content.title,
      body: content.body,
      data: content.data || {},
      scheduled_at: scheduling?.sendAt || new Date().toISOString(),
      status: 'pending'
    }));

    // 3. 데이터베이스에 저장
    const { data: createdNotifications } = await supabase
      .from('notifications')
      .insert(notifications)
      .select();

    // 4. 즉시 발송 또는 스케줄링
    if (!scheduling?.sendAt) {
      await sendNotifications(createdNotifications, type);
    }

    return new Response(JSON.stringify({
      success: true,
      notificationIds: createdNotifications.map(n => n.id),
      targetCount: targetUsers.length
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('알림 발송 오류:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

async function getTargetUsers(supabase: any, target: any): Promise<string[]> {
  if (target.userIds) {
    return target.userIds;
  }

  if (target.all) {
    const { data } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('is_active', true);
    return data.map((u: any) => u.id);
  }

  if (target.segments) {
    // 세그먼트 기반 사용자 조회
    const conditions = target.segments.map((segment: string) => {
      switch (segment) {
        case 'premium':
          return `subscription_type IN ('premium', 'vip')`;
        case 'active_7d':
          return `last_active_at > NOW() - INTERVAL '7 days'`;
        case 'inactive_30d':
          return `last_active_at < NOW() - INTERVAL '30 days'`;
        default:
          return '';
      }
    }).filter(Boolean).join(' AND ');

    if (conditions) {
      const { data } = await supabase
        .rpc('get_users_by_condition', { condition: conditions });
      return data.map((u: any) => u.id);
    }
  }

  return [];
}

async function sendNotifications(notifications: any[], type: string) {
  for (const notification of notifications) {
    try {
      switch (type) {
        case 'push':
          await sendPushNotification(notification);
          break;
        case 'email':
          await sendEmail(notification);
          break;
        case 'sms':
          await sendSMS(notification);
          break;
        case 'in_app':
          await sendInAppNotification(notification);
          break;
      }

      // 성공적으로 발송된 경우 상태 업데이트
      await updateNotificationStatus(notification.id, 'sent');

    } catch (error) {
      console.error(`알림 발송 실패 (${notification.id}):`, error);
      await updateNotificationStatus(notification.id, 'failed', error.message);
    }
  }
}

async function sendPushNotification(notification: any) {
  // Expo Push Notifications API 사용
  const message = {
    to: await getExpoPushToken(notification.user_id),
    title: notification.title,
    body: notification.body,
    data: notification.data,
    sound: 'default',
    badge: 1
  };

  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    throw new Error(`Push notification failed: ${response.statusText}`);
  }
}
```

---

## 🌐 **Vercel API Routes 구현**

### **1. 관리자 대시보드 API**
```typescript
// web/pages/api/admin/dashboard/stats.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminToken } from '@/lib/auth';

interface DashboardStats {
  realtime: {
    dau: number;
    activeReadings: number;
    todayRevenue: number;
    newSignups: number;
  };
  trends: {
    dauGrowth: number;
    revenueGrowth: number;
    satisfactionScore: number;
    conversionRate: number;
  };
  alerts: Array<{
    type: 'warning' | 'error' | 'info' | 'success';
    message: string;
    timestamp: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardStats | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 관리자 권한 검증
    const admin = await verifyAdminToken(req.headers.authorization);
    if (!admin || !admin.permissions.includes('dashboard_view')) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 실시간 통계 조회 (병렬 처리)
    const [dauResult, readingsResult, revenueResult, signupsResult] = await Promise.all([
      // DAU (Daily Active Users)
      supabase
        .from('user_events')
        .select('user_id')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .not('user_id', 'is', null),

      // 진행 중인 상담
      supabase
        .from('readings')
        .select('id')
        .in('status', ['pending', 'processing']),

      // 오늘 매출
      supabase
        .from('payments')
        .select('amount_cents')
        .eq('status', 'completed')
        .gte('created_at', new Date().toISOString().split('T')[0]),

      // 신규 가입자
      supabase
        .from('user_profiles')
        .select('id')
        .gte('created_at', new Date().toISOString().split('T')[0])
    ]);

    // 트렌드 분석 (전일 대비)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [yesterdayDAU, yesterdayRevenue] = await Promise.all([
      supabase
        .from('user_events')
        .select('user_id')
        .gte('created_at', yesterday.toISOString())
        .lt('created_at', new Date().toISOString().split('T')[0])
        .not('user_id', 'is', null),

      supabase
        .from('payments')
        .select('amount_cents')
        .eq('status', 'completed')
        .gte('created_at', yesterday.toISOString().split('T')[0])
        .lt('created_at', new Date().toISOString().split('T')[0])
    ]);

    // 만족도 점수 (최근 7일)
    const { data: satisfactionData } = await supabase
      .from('readings')
      .select('satisfaction_rating')
      .not('satisfaction_rating', 'is', null)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // 전환율 계산 (최근 30일)
    const [totalUsers, convertedUsers] = await Promise.all([
      supabase
        .from('user_profiles')
        .select('id')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),

      supabase
        .from('user_profiles')
        .select('id')
        .neq('subscription_type', 'free')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    ]);

    // 시스템 알림 생성
    const alerts = await generateSystemAlerts(supabase);

    const stats: DashboardStats = {
      realtime: {
        dau: new Set(dauResult.data?.map(d => d.user_id)).size,
        activeReadings: readingsResult.data?.length || 0,
        todayRevenue: revenueResult.data?.reduce((sum, p) => sum + p.amount_cents, 0) || 0,
        newSignups: signupsResult.data?.length || 0
      },
      trends: {
        dauGrowth: calculateGrowthRate(
          new Set(dauResult.data?.map(d => d.user_id)).size,
          new Set(yesterdayDAU.data?.map(d => d.user_id)).size
        ),
        revenueGrowth: calculateGrowthRate(
          revenueResult.data?.reduce((sum, p) => sum + p.amount_cents, 0) || 0,
          yesterdayRevenue.data?.reduce((sum, p) => sum + p.amount_cents, 0) || 0
        ),
        satisfactionScore: satisfactionData?.length ? 
          satisfactionData.reduce((sum, r) => sum + r.satisfaction_rating, 0) / satisfactionData.length : 0,
        conversionRate: totalUsers.data?.length ? 
          (convertedUsers.data?.length || 0) / totalUsers.data.length * 100 : 0
      },
      alerts
    };

    res.status(200).json(stats);

  } catch (error) {
    console.error('대시보드 통계 조회 오류:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

async function generateSystemAlerts(supabase: any) {
  const alerts = [];

  // CPU 사용률 체크 (모니터링 시스템에서 가져온다고 가정)
  const cpuUsage = await getCPUUsage();
  if (cpuUsage > 85) {
    alerts.push({
      type: 'warning',
      message: `서버 CPU 사용률 ${cpuUsage}% (주의)`,
      timestamp: new Date().toISOString()
    });
  }

  // 오늘 매출 목표 달성 체크
  const { data: todayRevenue } = await supabase
    .from('payments')
    .select('amount_cents')
    .eq('status', 'completed')
    .gte('created_at', new Date().toISOString().split('T')[0]);

  const totalRevenue = todayRevenue?.reduce((sum, p) => sum + p.amount_cents, 0) || 0;
  const dailyTarget = 500000; // 50만원 목표

  if (totalRevenue >= dailyTarget) {
    alerts.push({
      type: 'success',
      message: `일일 매출 목표 달성! (${Math.round(totalRevenue / dailyTarget * 100)}%)`,
      timestamp: new Date().toISOString()
    });
  }

  // 실패한 리딩 체크
  const { data: failedReadings } = await supabase
    .from('readings')
    .select('id')
    .eq('status', 'failed')
    .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString()); // 최근 1시간

  if (failedReadings?.length > 5) {
    alerts.push({
      type: 'error',
      message: `최근 1시간 내 리딩 실패 ${failedReadings.length}건 발생`,
      timestamp: new Date().toISOString()
    });
  }

  return alerts;
}

async function getCPUUsage(): Promise<number> {
  // 실제 환경에서는 Vercel Analytics API나 모니터링 서비스 사용
  return Math.random() * 100; // 테스트용 랜덤 값
}
```

### **2. 사용자 관리 API**
```typescript
// web/pages/api/admin/users/[action].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  try {
    const admin = await verifyAdminToken(req.headers.authorization);
    if (!admin || !admin.permissions.includes('user_management')) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    switch (action) {
      case 'list':
        return await listUsers(req, res, supabase);
      case 'detail':
        return await getUserDetail(req, res, supabase);
      case 'update':
        return await updateUser(req, res, supabase, admin);
      case 'suspend':
        return await suspendUser(req, res, supabase, admin);
      case 'grant-tokens':
        return await grantTokens(req, res, supabase, admin);
      default:
        return res.status(404).json({ error: 'Action not found' });
    }

  } catch (error) {
    console.error('사용자 관리 API 오류:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function listUsers(req: NextApiRequest, res: NextApiResponse, supabase: any) {
  const {
    page = 1,
    limit = 50,
    search,
    subscription_type,
    status,
    sort_by = 'created_at',
    sort_order = 'desc'
  } = req.query;

  let query = supabase
    .from('user_profiles')
    .select(`
      id,
      email,
      full_name,
      subscription_type,
      tokens_remaining,
      last_active_at,
      created_at,
      subscriptions(status, current_period_end),
      readings(count),
      payments(count)
    `);

  // 검색 필터
  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  if (subscription_type) {
    query = query.eq('subscription_type', subscription_type);
  }

  // 상태 필터 (활성/휴면/정지)
  if (status === 'active') {
    query = query.gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
  } else if (status === 'inactive') {
    query = query.lt('last_active_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
  }

  // 정렬 및 페이지네이션
  query = query
    .order(sort_by as string, { ascending: sort_order === 'asc' })
    .range((Number(page) - 1) * Number(limit), Number(page) * Number(limit) - 1);

  const { data: users, error, count } = await query;

  if (error) {
    throw error;
  }

  res.status(200).json({
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count,
      totalPages: Math.ceil((count || 0) / Number(limit))
    }
  });
}

async function getUserDetail(req: NextApiRequest, res: NextApiResponse, supabase: any) {
  const { user_id } = req.query;

  const { data: user, error } = await supabase
    .from('user_profiles')
    .select(`
      *,
      subscriptions(*),
      readings(
        id,
        question,
        consultation_type_id,
        satisfaction_rating,
        status,
        created_at,
        consultation_types(name_ko)
      ),
      payments(*),
      token_transactions(*)
    `)
    .eq('id', user_id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'User not found' });
    }
    throw error;
  }

  // 통계 계산
  const stats = {
    totalReadings: user.readings?.length || 0,
    avgSatisfaction: user.readings?.length ? 
      user.readings.reduce((sum: number, r: any) => sum + (r.satisfaction_rating || 0), 0) / user.readings.length : 0,
    totalSpent: user.payments?.filter((p: any) => p.status === 'completed')
      .reduce((sum: number, p: any) => sum + p.amount_cents, 0) || 0,
    lifetimeTokens: user.token_transactions?.reduce((sum: number, t: any) => sum + Math.max(0, t.amount), 0) || 0
  };

  res.status(200).json({
    user,
    stats
  });
}

async function grantTokens(req: NextApiRequest, res: NextApiResponse, supabase: any, admin: any) {
  const { user_id, amount, reason } = req.body;

  if (!user_id || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  // 트랜잭션으로 토큰 지급
  const { data, error } = await supabase.rpc('grant_user_tokens', {
    target_user_id: user_id,
    token_amount: amount,
    grant_reason: reason || '관리자 지급',
    admin_id: admin.id
  });

  if (error) {
    throw error;
  }

  // 감사 로그 기록
  await supabase
    .from('admin_audit_logs')
    .insert({
      admin_user_id: admin.id,
      action: 'grant_tokens',
      target_type: 'user',
      target_id: user_id,
      details: { amount, reason }
    });

  res.status(200).json({
    success: true,
    newBalance: data.new_balance
  });
}
```

---

## 📊 **고급 분석 및 모니터링**

### **1. 실시간 비즈니스 인텔리전스**
```typescript
// web/lib/analytics/business-intelligence.ts
import { createClient } from '@supabase/supabase-js';

export class BusinessIntelligence {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  async getKPIMetrics(timeRange: '1d' | '7d' | '30d' | '90d' = '30d') {
    const startDate = this.getStartDate(timeRange);
    
    const [
      userMetrics,
      revenueMetrics,
      engagementMetrics,
      qualityMetrics
    ] = await Promise.all([
      this.getUserMetrics(startDate),
      this.getRevenueMetrics(startDate),
      this.getEngagementMetrics(startDate),
      this.getQualityMetrics(startDate)
    ]);

    return {
      user: userMetrics,
      revenue: revenueMetrics,
      engagement: engagementMetrics,
      quality: qualityMetrics,
      timeRange,
      generatedAt: new Date().toISOString()
    };
  }

  private async getUserMetrics(startDate: string) {
    // 사용자 관련 메트릭
    const [newUsers, activeUsers, churned, retention] = await Promise.all([
      // 신규 가입자
      this.supabase
        .from('user_profiles')
        .select('id')
        .gte('created_at', startDate),

      // 활성 사용자 (최근 7일 내 활동)
      this.supabase
        .from('user_events')
        .select('user_id')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .not('user_id', 'is', null),

      // 이탈 사용자 (30일 이상 비활성)
      this.supabase
        .from('user_profiles')
        .select('id')
        .lt('last_active_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),

      // 리텐션 분석
      this.calculateRetentionRates(startDate)
    ]);

    return {
      newUsers: newUsers.data?.length || 0,
      activeUsers: new Set(activeUsers.data?.map(u => u.user_id)).size,
      churnedUsers: churned.data?.length || 0,
      retention
    };
  }

  private async getRevenueMetrics(startDate: string) {
    // 매출 관련 메트릭
    const { data: payments } = await this.supabase
      .from('payments')
      .select('amount_cents, created_at, product_id, user_id')
      .eq('status', 'completed')
      .gte('created_at', startDate);

    const totalRevenue = payments?.reduce((sum, p) => sum + p.amount_cents, 0) || 0;
    const uniquePayingUsers = new Set(payments?.map(p => p.user_id)).size;
    
    // ARPU (Average Revenue Per User)
    const arpu = uniquePayingUsers > 0 ? totalRevenue / uniquePayingUsers : 0;

    // 매출 구성 분석
    const revenueByProduct = this.analyzeRevenueByProduct(payments || []);

    return {
      totalRevenue,
      payingUsers: uniquePayingUsers,
      arpu,
      averageOrderValue: payments?.length ? totalRevenue / payments.length : 0,
      revenueByProduct
    };
  }

  private async getEngagementMetrics(startDate: string) {
    // 참여도 관련 메트릭
    const [sessions, readings, satisfaction] = await Promise.all([
      // 세션 분석
      this.supabase
        .from('user_events')
        .select('user_id, created_at, session_id')
        .eq('event_type', 'session_start')
        .gte('created_at', startDate),

      // 상담 활동
      this.supabase
        .from('readings')
        .select('user_id, consultation_type_id, created_at, satisfaction_rating')
        .gte('created_at', startDate),

      // 만족도 평가
      this.supabase
        .from('readings')
        .select('satisfaction_rating')
        .not('satisfaction_rating', 'is', null)
        .gte('created_at', startDate)
    ]);

    const avgSessionsPerUser = sessions.data?.length ? 
      sessions.data.length / new Set(sessions.data.map(s => s.user_id)).size : 0;

    const avgSatisfaction = satisfaction.data?.length ?
      satisfaction.data.reduce((sum, r) => sum + r.satisfaction_rating, 0) / satisfaction.data.length : 0;

    return {
      totalSessions: sessions.data?.length || 0,
      totalReadings: readings.data?.length || 0,
      avgSessionsPerUser,
      avgReadingsPerUser: readings.data?.length ? 
        readings.data.length / new Set(readings.data.map(r => r.user_id)).size : 0,
      avgSatisfaction
    };
  }

  private async getQualityMetrics(startDate: string) {
    // 품질 관련 메트릭
    const [aiPerformance, errorRates, responseTime] = await Promise.all([
      // AI 성능 분석
      this.supabase
        .from('readings')
        .select('ai_model_used, processing_time_ms, satisfaction_rating, status')
        .gte('created_at', startDate),

      // 에러율 분석
      this.supabase
        .from('readings')
        .select('status')
        .eq('status', 'failed')
        .gte('created_at', startDate),

      // 응답 시간 분석
      this.supabase
        .from('readings')
        .select('processing_time_ms')
        .eq('status', 'completed')
        .not('processing_time_ms', 'is', null)
        .gte('created_at', startDate)
    ]);

    const totalReadings = aiPerformance.data?.length || 0;
    const failedReadings = errorRates.data?.length || 0;
    const avgResponseTime = responseTime.data?.length ?
      responseTime.data.reduce((sum, r) => sum + r.processing_time_ms, 0) / responseTime.data.length : 0;

    return {
      totalReadings,
      successRate: totalReadings > 0 ? ((totalReadings - failedReadings) / totalReadings) * 100 : 100,
      avgResponseTime: Math.round(avgResponseTime),
      aiQualityScore: this.calculateAIQualityScore(aiPerformance.data || [])
    };
  }

  private calculateAIQualityScore(readings: any[]): number {
    if (readings.length === 0) return 0;

    const weights = {
      satisfaction: 0.4,
      responseTime: 0.3,
      successRate: 0.3
    };

    const avgSatisfaction = readings
      .filter(r => r.satisfaction_rating)
      .reduce((sum, r) => sum + r.satisfaction_rating, 0) / readings.length;

    const avgResponseTime = readings
      .filter(r => r.processing_time_ms)
      .reduce((sum, r) => sum + r.processing_time_ms, 0) / readings.length;

    const successRate = readings.filter(r => r.status === 'completed').length / readings.length;

    // 점수 계산 (0-100)
    const satisfactionScore = (avgSatisfaction / 5) * 100;
    const responseTimeScore = Math.max(0, 100 - (avgResponseTime / 1000)); // 1초 = 100점
    const successRateScore = successRate * 100;

    return Math.round(
      satisfactionScore * weights.satisfaction +
      responseTimeScore * weights.responseTime +
      successRateScore * weights.successRate
    );
  }

  private async calculateRetentionRates(startDate: string) {
    // 1일, 7일, 30일 리텐션 계산
    const cohorts = await this.getCohortData(startDate);
    
    return {
      day1: this.calculateRetentionForPeriod(cohorts, 1),
      day7: this.calculateRetentionForPeriod(cohorts, 7),
      day30: this.calculateRetentionForPeriod(cohorts, 30)
    };
  }

  private getStartDate(timeRange: string): string {
    const now = new Date();
    const days = {
      '1d': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90
    }[timeRange] || 30;

    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
  }
}
```

---

## 🔒 **보안 및 권한 관리**

### **1. Role-Based Access Control (RBAC)**
```sql
-- RLS 정책 구현
-- 관리자만 관리 데이터 접근 가능
CREATE POLICY "Admin access only" ON admin_audit_logs
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_active = true
  )
);

-- 사용자는 본인 데이터만 접근
CREATE POLICY "Users can access own data" ON user_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
FOR UPDATE USING (auth.uid() = id);

-- 리딩 데이터 보안
CREATE POLICY "Users can view own readings" ON readings
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own readings" ON readings
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 관리자는 모든 데이터 접근 가능 (권한에 따라)
CREATE POLICY "Admins can manage all data" ON readings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users a
    WHERE a.user_id = auth.uid()
    AND a.is_active = true
    AND ('user_management' = ANY(a.permissions) OR a.role = 'super_admin')
  )
);
```

### **2. API 보안 미들웨어**
```typescript
// web/lib/middleware/security.ts
import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate Limiting
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 요청 제한
  message: {
    error: 'Too many requests, please try again later',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 보안 헤더
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.supabase.co", "https://api.x.ai"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// JWT 토큰 검증
export async function verifyToken(token: string) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new Error('Invalid token');
    }

    return user;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

// 관리자 권한 검증
export async function verifyAdminPermissions(
  userId: string, 
  requiredPermissions: string[]
) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: admin } = await supabase
    .from('admin_users')
    .select('role, permissions, is_active')
    .eq('user_id', userId)
    .single();

  if (!admin || !admin.is_active) {
    throw new Error('Admin access denied');
  }

  // 슈퍼 관리자는 모든 권한
  if (admin.role === 'super_admin') {
    return true;
  }

  // 필요한 권한 체크
  const hasPermissions = requiredPermissions.every(permission =>
    admin.permissions.includes(permission)
  );

  if (!hasPermissions) {
    throw new Error('Insufficient permissions');
  }

  return true;
}
```

---

## 📈 **성능 최적화 및 확장성**

### **1. 캐싱 전략**
```typescript
// web/lib/cache/redis-cache.ts
import Redis from 'ioredis';

class CacheManager {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    try {
      await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  // 통계 데이터 캐싱
  async getCachedStats(cacheKey: string, generator: () => Promise<any>, ttl: number = 300) {
    let stats = await this.get(cacheKey);
    
    if (!stats) {
      stats = await generator();
      await this.set(cacheKey, stats, ttl);
    }
    
    return stats;
  }
}

export const cache = new CacheManager();
```

### **2. 데이터베이스 최적화**
```sql
-- 성능 인덱스 생성
-- 사용자 검색 최적화
CREATE INDEX CONCURRENTLY idx_user_profiles_email_search 
ON user_profiles USING gin(to_tsvector('korean', email || ' ' || COALESCE(full_name, '')));

-- 리딩 조회 최적화
CREATE INDEX CONCURRENTLY idx_readings_user_date 
ON readings(user_id, created_at DESC);

CREATE INDEX CONCURRENTLY idx_readings_status_date 
ON readings(status, created_at DESC);

-- 결제 분석 최적화
CREATE INDEX CONCURRENTLY idx_payments_user_status_date 
ON payments(user_id, status, created_at DESC);

-- 이벤트 분석 최적화
CREATE INDEX CONCURRENTLY idx_user_events_type_date 
ON user_events(event_type, created_at DESC);

CREATE INDEX CONCURRENTLY idx_user_events_user_date 
ON user_events(user_id, created_at DESC);

-- 파티셔닝 (대용량 데이터 처리)
-- 월별 파티셔닝
CREATE TABLE user_events_2025_01 PARTITION OF user_events
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE user_events_2025_02 PARTITION OF user_events
FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
```

---

## 🚀 **배포 및 운영**

### **1. 환경별 설정**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/admin/(.*)",
      "dest": "/web/pages/api/admin/$1"
    },
    {
      "src": "/api/(.*)",
      "dest": "/web/pages/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/web/$1"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key",
    "XAI_API_KEY": "@xai-api-key",
    "REDIS_URL": "@redis-url",
    "STRIPE_SECRET_KEY": "@stripe-secret-key"
  },
  "functions": {
    "web/pages/api/**/*.ts": {
      "maxDuration": 60
    },
    "web/pages/api/admin/**/*.ts": {
      "maxDuration": 120
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://soulcard.app"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Authorization, Content-Type"
        }
      ]
    }
  ]
}
```

### **2. 모니터링 및 알림**
```typescript
// web/lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // 민감한 정보 필터링
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.value?.includes('password') || error?.value?.includes('token')) {
        return null;
      }
    }
    return event;
  }
});

export { Sentry };
```

---

## 📊 **성공 지표 및 모니터링**

### **핵심 메트릭 (KPI)**
```typescript
// 비즈니스 메트릭
interface BusinessKPIs {
  user: {
    dau: number;           // 목표: 2,000+
    mau: number;           // 목표: 15,000+
    retention_7d: number;  // 목표: 40%+
    retention_30d: number; // 목표: 20%+
  };
  revenue: {
    mrr: number;           // 목표: ₩10,000,000+
    arpu: number;          // 목표: ₩15,000+
    conversion_rate: number; // 목표: 15%+
    ltv: number;           // 목표: ₩50,000+
  };
  product: {
    reading_completion_rate: number; // 목표: 95%+
    avg_satisfaction: number;        // 목표: 4.5+
    ai_accuracy_score: number;       // 목표: 85%+
    response_time_ms: number;        // 목표: <3000ms
  };
  technical: {
    uptime: number;        // 목표: 99.9%+
    error_rate: number;    // 목표: <0.5%
    api_response_time: number; // 목표: <500ms
    crash_rate: number;    // 목표: <0.1%
  };
}
```

---

## 🏁 **결론**

이 개선된 백엔드 시스템 아키텍처는 기존 문서의 UI 설계를 기반으로 하여 **실제 구현 가능한 기술적 솔루션**을 제공합니다.

### **주요 개선사항:**
1. **마이크로서비스 아키텍처**: 확장 가능하고 유지보수가 쉬운 구조
2. **실시간 시스템**: WebSocket 기반 실시간 업데이트
3. **고급 보안**: RBAC, JWT, RLS 기반 다층 보안
4. **성능 최적화**: 캐싱, 인덱싱, 파티셔닝
5. **비즈니스 인텔리전스**: 실시간 분석 및 예측
6. **자동화된 모니터링**: 장애 예방 및 빠른 대응

### **기술적 우위:**
- **Vercel + Supabase**: 서버리스 기반 무제한 확장
- **Edge Functions**: 글로벌 분산 처리
- **PostgreSQL**: 관계형 + NoSQL 하이브리드
- **실시간 기능**: 즉시 반영되는 관리 시스템

이제 이 설계를 바탕으로 **8주 내에 완전한 프로덕션 백엔드 시스템**을 구축할 수 있습니다! 🚀