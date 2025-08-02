# AI 타로카드 앱 MVP - 2인 개발팀 구현 가이드

> **팀 구성**: 사용자(UI/디자인 전문가) + 클로드(개발/기술 전담)  
> **개발 방식**: 실시간 협업 + 단계별 검토  
> **목표**: 6주 내 MVP 완성 후 앱스토어 배포

---

## 🎯 MVP 핵심 기능 정의

### ✅ 포함될 기능 (Must Have)
```markdown
1. 기본 타로 리딩 (3카드 스프레드)
2. 78장 타로카드 데이터 + 이미지
3. 질문 입력 및 카드 선택 UI
4. 규칙 기반 AI 해석 시스템
5. 리딩 히스토리 저장/조회
6. 기본 설정 및 정보 화면
```

### ❌ 제외될 기능 (Nice to Have - v2.0)
```markdown
- 고급 AI 모델 (GPT 통합)
- 사용자 계정/로그인
- 소셜 공유 기능
- 다양한 스프레드 패턴
- 실시간 알림/위젯
- 다국어 지원
```

---

## 📱 화면 구성 및 사용자 플로우

### 🗺️ 앱 구조
```
📱 AI 타로 앱
├── 🏠 홈 화면
│   ├── 새로운 리딩 시작
│   ├── 최근 리딩 히스토리 (최대 3개)
│   └── 설정 메뉴
├── 🔮 리딩 화면
│   ├── 질문 입력
│   ├── 카드 덱 시각화
│   ├── 카드 선택 (3장)
│   └── 리딩 시작 버튼
├── 📊 결과 화면
│   ├── 선택된 카드 표시
│   ├── AI 해석 결과
│   ├── 저장/공유 버튼
│   └── 새로운 리딩 버튼
├── 📜 히스토리 화면
│   ├── 과거 리딩 목록
│   ├── 상세 보기
│   └── 삭제 기능
└── ⚙️ 설정 화면
    ├── 앱 정보
    ├── 면책조항
    └── 개인정보정책
```

### 👤 사용자 플로우
```
앱 실행 → 홈 화면 → "새로운 리딩" 클릭 
→ 질문 입력 → 카드 3장 선택 → 해석 결과 확인 
→ 저장 → 홈으로 돌아가기
```

---

## 🏗️ 개발 단계별 상세 계획

## 1단계: 프로젝트 초기 설정 (Day 1-2)

### 👤 사용자 작업
```markdown
Day 1:
□ 앱의 전체적인 비주얼 컨셉 정하기
  - 색상 팔레트 (주색상, 보조색상, 배경색)
  - 분위기 키워드 (신비로운, 모던, 친근한 등)
  - 참고 앱/웹사이트 3개 선정

□ 기본 와이어프레임 스케치 (손그림도 OK)
  - 홈 화면 레이아웃
  - 카드 선택 화면 구성
  - 결과 화면 구성

Day 2:
□ 타로카드 이미지 수집/준비
  - 78장 카드 이미지 (512x512px 권장)
  - 카드 뒷면 디자인 (1장)
  - 앱 아이콘 아이디어 스케치
```

### 🤖 클로드 작업
```bash
Day 1: 프로젝트 초기 설정
□ React Native 프로젝트 생성
□ 필수 라이브러리 설치 및 설정
□ TypeScript 설정 최적화
□ 폴더 구조 생성
□ Git 저장소 초기화

Day 2: 기본 인프라 구축  
□ Firebase 프로젝트 생성 및 연동
□ 네비게이션 시스템 구축
□ 기본 테마 시스템 설정
□ 타로카드 데이터 구조 설계
□ 개발 환경 테스트 (iOS/Android)
```

### 🔧 기술적 구현 상세

#### 프로젝트 초기 설정
```bash
# 1. 프로젝트 생성
npx react-native init AITarotApp --template react-native-template-typescript

# 2. 필수 라이브러리 설치
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-firebase/app @react-native-firebase/firestore @react-native-firebase/analytics
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons react-native-svg
npm install react-native-reanimated react-native-gesture-handler
```

#### 폴더 구조 생성
```typescript
// src/types/index.ts
export interface TarotCard {
  id: number;
  name: string;
  suit: 'major' | 'cups' | 'swords' | 'wands' | 'pentacles';
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  imageUri: string;
}

export interface Reading {
  id: string;
  question: string;
  cards: TarotCard[];
  interpretation: string;
  createdAt: Date;
}

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
  firstLaunch: boolean;
}
```

---

## 2단계: 홈 화면 구현 (Day 3-4)

### 👤 사용자 작업
```markdown
Day 3: 홈 화면 상세 디자인
□ Figma에서 홈 화면 상세 디자인
  - 앱 로고/타이틀 위치
  - "새로운 리딩" 버튼 디자인
  - 최근 리딩 카드 디자인
  - 하단 네비게이션 바 디자인

□ 디자인 시스템 문서화
  - 색상 코드 정리 (#hex 형식)
  - 폰트 크기 및 굵기 정의
  - 여백/패딩 기준 정의

Day 4: 피드백 및 수정
□ 클로드가 구현한 홈 화면 확인
□ 수정 요청사항 정리
□ 최종 디자인 승인
```

### 🤖 클로드 작업
```typescript
// Day 3: 홈 화면 기본 구현
□ src/screens/HomeScreen.tsx 구현
□ src/components/ui/Button.tsx 재사용 컴포넌트
□ src/components/ui/Card.tsx 재사용 컴포넌트  
□ src/theme/colors.ts 색상 시스템
□ src/theme/typography.ts 폰트 시스템

// Day 4: 디자인 적용 및 최적화
□ 사용자 디자인 기반 스타일링
□ 반응형 레이아웃 구현
□ 애니메이션 효과 추가
□ iOS/Android 테스트 및 조정
```

### 📋 구현할 컴포넌트들

#### HomeScreen.tsx
```typescript
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components/ui/Button';
import { RecentReadingCard } from '../components/RecentReadingCard';
import { useRecentReadings } from '../hooks/useRecentReadings';

export const HomeScreen = () => {
  const { recentReadings } = useRecentReadings();

  return (
    <ScrollView style={styles.container}>
      {/* 앱 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>AI 타로</Text>
        <Text style={styles.subtitle}>당신만의 개인화된 타로 리딩</Text>
      </View>

      {/* 새로운 리딩 버튼 */}
      <Button
        title="새로운 리딩 시작"
        onPress={() => navigation.navigate('Reading')}
        style={styles.newReadingButton}
      />

      {/* 최근 리딩 히스토리 */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>최근 리딩</Text>
        {recentReadings.map(reading => (
          <RecentReadingCard key={reading.id} reading={reading} />
        ))}
      </View>
    </ScrollView>
  );
};
```

#### Button.tsx (재사용 컴포넌트)
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};
```

---

## 3단계: 타로카드 데이터 및 리딩 화면 (Day 5-7)

### 👤 사용자 작업
```markdown
Day 5: 리딩 화면 디자인
□ 질문 입력 UI 디자인
  - 텍스트 입력 필드 스타일
  - 플레이스홀더 텍스트 작성
  - 카테고리 선택 버튼 (선택사항)

□ 카드 선택 인터랙션 디자인
  - 카드 덱 시각화 방법
  - 카드 선택 애니메이션 컨셉
  - 선택된 카드 배치 레이아웃

Day 6-7: 상세 디자인 및 피드백
□ 카드 디자인 세부사항
  - 카드 크기 및 비율
  - 그림자/테두리 효과
  - 뒷면 디자인 최종 확정

□ 구현 결과 확인 및 피드백
  - 애니메이션 자연스러움 검토
  - 사용성 테스트 진행
  - 개선사항 정리
```

### 🤖 클로드 작업

#### Day 5: 데이터 구조 및 서비스 구현
```typescript
// src/data/tarotCards.json - 78장 카드 데이터
□ 메이저 아르카나 22장 데이터 입력
□ 마이너 아르카나 56장 데이터 입력
□ 각 카드별 정방향/역방향 해석
□ 키워드 및 메타데이터 정리

// src/services/tarotService.ts - 카드 로직
□ 카드 셔플 알고리즘 구현
□ 랜덤 카드 선택 로직
□ 카드 상태 관리 (선택됨/안됨)
□ 스프레드 패턴 구현 (3카드)
```

#### Day 6-7: 리딩 화면 구현
```typescript
// src/screens/ReadingScreen.tsx
□ 질문 입력 UI 구현
□ 카드 덱 시각화 컴포넌트
□ 카드 선택 인터랙션 구현
□ 선택 완료 후 결과 화면 이동

// src/components/tarot/TarotCard.tsx
□ 개별 카드 컴포넌트 구현
□ 앞면/뒷면 전환 애니메이션
□ 터치 이벤트 처리
□ 선택 상태 시각적 피드백

// src/hooks/useCardSelection.ts
□ 카드 선택 상태 관리 커스텀 훅
□ 최대 3장 선택 제한 로직
□ 선택 해제 기능 구현
```

### 📊 타로카드 데이터 구조 예시
```json
{
  "majorArcana": [
    {
      "id": 0,
      "name": "The Fool",
      "koreanName": "바보",
      "suit": "major",
      "uprightMeaning": "새로운 시작, 순수함, 모험심, 자유로운 영혼",
      "reversedMeaning": "무모함, 경솔함, 위험한 결정, 준비 부족",
      "keywords": ["시작", "모험", "순수", "자유"],
      "imageUri": "cards/major_00_fool.png",
      "description": "절벽 끝에서 한 발을 내딛으려는 젊은이의 모습..."
    }
  ],
  "cups": [
    {
      "id": 14,
      "name": "Ace of Cups",
      "koreanName": "컵 에이스",
      "suit": "cups",
      "element": "water",
      "uprightMeaning": "새로운 사랑, 감정의 시작, 직감, 영감",
      "reversedMeaning": "감정적 막힘, 사랑의 좌절, 내적 갈등",
      "keywords": ["사랑", "감정", "직감", "영감"],
      "imageUri": "cards/cups_01_ace.png"
    }
  ]
}
```

---

## 4단계: AI 해석 시스템 구현 (Day 8-10)

### 👤 사용자 작업
```markdown
Day 8: 결과 화면 디자인
□ 선택된 카드 표시 레이아웃
  - 3장 카드 배치 방식 (과거-현재-미래)
  - 각 카드 설명 영역 디자인
  - 전체 해석 영역 디자인

□ 해석 텍스트 표시 방식
  - 폰트 크기 및 줄간격
  - 읽기 편한 레이아웃
  - 스크롤 가능한 긴 텍스트 처리

Day 9-10: 사용성 개선
□ 로딩 상태 UI 디자인
  - 해석 생성 중 로딩 애니메이션
  - 프로그레스 바 또는 스피너
  - 로딩 중 안내 메시지

□ 액션 버튼 디자인
  - 저장 버튼
  - 새로운 리딩 버튼  
  - 공유 버튼 (추후 구현)
```

### 🤖 클로드 작업

#### Day 8: AI 해석 엔진 구현
```typescript
// src/services/interpretationService.ts
□ 질문 카테고리 분류 로직
  - 연애, 진로, 건강, 인간관계, 재정 등
  - 키워드 기반 분류 알고리즘
  - 기타 카테고리 처리

□ 카드 조합 해석 로직
  - 3카드 스프레드 해석 (과거-현재-미래)
  - 카드 간 상호작용 분석
  - 정방향/역방향 고려한 해석

□ 동적 해석 생성
  - 템플릿 기반 텍스트 생성
  - 사용자 질문 맥락 반영
  - 개인화 요소 삽입
```

#### Day 9-10: 결과 화면 및 데이터 저장
```typescript
// src/screens/ResultScreen.tsx
□ 선택된 카드 시각화
□ AI 해석 결과 표시
□ 저장/공유 기능 구현
□ 새로운 리딩으로 이동

// src/services/storageService.ts
□ AsyncStorage 기반 데이터 저장
□ 리딩 히스토리 CRUD 구현
□ 사용자 설정 저장/로드
□ 데이터 마이그레이션 로직

// src/hooks/useInterpretation.ts
□ 해석 생성 상태 관리
□ 로딩/에러 상태 처리
□ 해석 결과 캐싱
```

### 🧠 AI 해석 로직 예시
```typescript
class InterpretationEngine {
  generateInterpretation(cards: TarotCard[], question: string): string {
    // 1. 질문 분석
    const category = this.categorizeQuestion(question);
    
    // 2. 카드 조합 분석
    const cardMeanings = cards.map(card => ({
      position: this.getCardPosition(card),
      meaning: this.getContextualMeaning(card, category),
      influence: this.calculateCardInfluence(card, cards)
    }));
    
    // 3. 종합 해석 생성
    const interpretation = this.synthesizeInterpretation(
      cardMeanings, 
      category, 
      question
    );
    
    return interpretation;
  }

  private categorizeQuestion(question: string): QuestionCategory {
    const loveKeywords = ['사랑', '연애', '남친', '여친', '결혼', '만남'];
    const careerKeywords = ['직장', '일', '취업', '승진', '사업', '진로'];
    
    if (loveKeywords.some(keyword => question.includes(keyword))) {
      return QuestionCategory.LOVE;
    }
    // ... 추가 분류 로직
  }
}
```

---

## 5단계: 히스토리 및 설정 화면 (Day 11-12)

### 👤 사용자 작업
```markdown
Day 11: 히스토리 화면 디자인
□ 과거 리딩 목록 디자인
  - 리스트 아이템 레이아웃
  - 날짜/시간 표시 방식
  - 질문 미리보기 텍스트

□ 상세 보기 화면 디자인
  - 과거 리딩 재현 화면
  - 카드 및 해석 표시
  - 삭제 버튼 위치

Day 12: 설정 화면 디자인
□ 설정 메뉴 리스트 디자인
□ 면책조항 페이지 레이아웃
□ 개인정보정책 페이지 레이아웃
□ 앱 정보 페이지 디자인
```

### 🤖 클로드 작업
```typescript
// Day 11: 히스토리 화면 구현
□ src/screens/HistoryScreen.tsx
  - 리딩 목록 표시
  - 무한 스크롤 또는 페이지네이션
  - 검색/필터 기능 (간단)
  - 상세 보기 네비게이션

□ src/components/HistoryItem.tsx
  - 개별 히스토리 아이템 컴포넌트
  - 미리보기 정보 표시
  - 터치 이벤트 처리

// Day 12: 설정 화면 구현  
□ src/screens/SettingsScreen.tsx
  - 설정 메뉴 리스트
  - 각종 정보 페이지 링크
  - 앱 버전 정보

□ 법적 고지사항 페이지들
  - 면책조항 텍스트
  - 개인정보정책 텍스트
  - 이용약관 (필요시)
```

---

## 6단계: 테스트 및 최적화 (Day 13-14)

### 👤 사용자 작업
```markdown
Day 13: 전체 플로우 테스트
□ 앱 전체 기능 직접 테스트
  - 홈 → 리딩 → 결과 → 저장 플로우
  - 히스토리 조회 및 상세 보기
  - 설정 메뉴 모든 항목 확인

□ 사용성 문제점 도출
  - 직관적이지 않은 UI 요소
  - 개선이 필요한 인터랙션
  - 텍스트 가독성 문제

Day 14: 최종 디자인 수정
□ 발견된 문제점 디자인 수정
□ 일관성 검토 (색상, 폰트, 여백)
□ 앱 아이콘 최종 버전 완성
□ 스플래시 스크린 디자인
```

### 🤖 클로드 작업
```typescript
// Day 13: 버그 수정 및 최적화
□ 에러 핸들링 강화
  - 네트워크 오류 처리
  - 데이터 저장 실패 처리
  - 예상치 못한 오류 처리

□ 성능 최적화
  - 메모리 사용량 최적화
  - 불필요한 리렌더링 제거
  - 이미지 로딩 최적화

// Day 14: 최종 점검 및 빌드 준비
□ 코드 리팩토링 및 정리
□ TypeScript 타입 안정성 확인
□ ESLint 규칙 준수 확인
□ 릴리즈 빌드 테스트
```

### 🧪 테스트 체크리스트
```markdown
기능 테스트:
□ 새로운 리딩 생성 및 저장
□ 히스토리 조회 및 삭제
□ 앱 재시작 후 데이터 유지
□ 카드 선택 제한 (3장) 정상 동작
□ 해석 생성 시간 3초 이내

성능 테스트:
□ 앱 시작 시간 5초 이내
□ 화면 전환 애니메이션 부드러움
□ 메모리 사용량 적정 수준
□ 배터리 소모량 정상 범위

호환성 테스트:
□ iOS 시뮬레이터 정상 동작
□ Android 에뮬레이터 정상 동작
□ 다양한 화면 크기 대응
□ 세로/가로 모드 대응 (필요시)
```

---

## 📊 주간별 진행 현황 체크

### Week 1: 기반 구축 (Day 1-7)
```markdown
완료해야 할 것들:
□ 프로젝트 초기 설정 완료
□ 홈 화면 구현 및 디자인 적용
□ 타로카드 데이터 입력 완료
□ 리딩 화면 기본 구현
□ 카드 선택 인터랙션 동작

Week 1 성공 기준:
- 홈에서 리딩 화면 이동 가능
- 카드 3장 선택 가능
- 기본 UI 디자인 적용됨
- iOS/Android 빌드 성공
```

### Week 2: 핵심 기능 (Day 8-14)
```markdown
완료해야 할 것들:
□ AI 해석 시스템 구현
□ 결과 화면 완성
□ 데이터 저장/로드 기능
□ 히스토리 화면 구현
□ 설정 화면 구현
□ 전체 앱 통합 테스트

Week 2 성공 기준:
- 완전한 리딩 플로우 동작
- 해석 결과 저장/조회 가능
- 모든 화면 구현 완료
- 주요 버그 수정 완료
```

---

## 🚀 MVP 완료 후 다음 단계

### 즉시 해야 할 것들
```markdown
1. 베타 테스트 진행 (친구/가족 10명)
2. 앱스토어 심사 준비
3. 마케팅 자료 준비 (스크린샷, 설명)
4. 첫 번째 업데이트 계획 수립
```

### v1.1 업데이트 계획 (MVP 이후 4주)
```markdown
추가 기능:
□ 다양한 스프레드 패턴 (켈틱 크로스 등)
□ 소셜 공유 기능
□ 일일 카드 추천
□ 다크모드 지원
□ 사용자 피드백 기반 개선사항
```

---

## 💡 개발 중 협업 가이드

### 🤝 효율적인 협업 방법
```markdown
1. 일일 체크인 (매일 30분)
   - 전날 완료한 작업 확인
   - 오늘 할 작업 계획
   - 막히는 부분 논의

2. 실시간 피드백 
   - 디자인 변경 요청 즉시 전달
   - 기능 동작 확인 후 피드백
   - 개선사항 실시간 적용

3. 문서화
   - 주요 결정사항 기록
   - 변경된 기능 명세 업데이트
   - 버그 및 이슈 트래킹
```

### 🔄 반복 개발 프로세스
```markdown
각 기능별 사이클:
1. 사용자: 디자인/기획 → 클로드에게 전달
2. 클로드: 구현 → 결과물 공유
3. 사용자: 테스트 → 피드백
4. 클로드: 수정 → 최종 확인
5. 다음 기능으로 이동
```

---

## ✅ 지금 바로 시작하기

### 👤 사용자가 준비할 것
1. **개발 도구 설치**
   - Figma 계정 (디자인용)
   - iOS 시뮬레이터 또는 실제 기기
   - Android 에뮬레이터 또는 실제 기기

2. **첫 번째 과제**
   - 색상 팔레트 3-5개 선정
   - 앱 아이콘 아이디어 스케치
   - 홈 화면 와이어프레임 그리기

### 🤖 클로드가 준비할 것
1. **개발 환경 설정**
   - React Native 프로젝트 생성
   - 필수 라이브러리 설치
   - 기본 폴더 구조 생성

2. **첫 번째 구현**
   - 네비게이션 시스템 구축
   - 기본 홈 화면 틀 만들기
   - 타로카드 데이터 구조 설계

**"시작하자!"라고 말씀하시면 바로 Day 1부터 진행하겠습니다! 🎯**