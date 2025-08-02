# 🚀 Quick Start Guide

AI 타로카드 앱을 빠르게 실행하는 방법

## 📋 목차
1. [서버 실행 방법](#서버-실행-방법)
2. [문제 해결](#문제-해결)
3. [다른 실행 옵션](#다른-실행-옵션)

## 🌐 서버 실행 방법

### 1. 기본 실행
```bash
cd /Volumes/PROJECT/apps/card
npm run web
```

### 2. 실행 성공 시 출력 메시지
```
🌐 타로 카드 웹 앱이 http://localhost:3000 에서 실행 중입니다
🔮 데이터 초기화 중...
🔮 타로 앱 서버 초기화 완료
✨ 모든 준비 완료! 브라우저에서 확인해보세요
```

### 3. 브라우저 접속
```
http://localhost:3000
```

## 🔧 문제 해결

### 포트 3000이 이미 사용 중인 경우

1. **사용 중인 프로세스 확인:**
```bash
lsof -i :3000
```

2. **기존 프로세스 종료:**
```bash
pkill -f "ts-node"
```

3. **다시 실행:**
```bash
npm run web
```

### 다른 포트로 실행하기

```bash
PORT=3001 npm run web
```

그후 `http://localhost:3001`로 접속

### 완전 초기화 후 실행

```bash
# 모든 관련 프로세스 종료
pkill -f "ts-node"
pkill -f "node.*server"

# 2초 대기
sleep 2

# 새로 시작
npm run web
```

### ERR_CONNECTION_REFUSED 오류 해결

```bash
# 1. 프로세스 확인
ps aux | grep "ts-node"

# 2. 모든 프로세스 강제 종료
pkill -9 -f "ts-node"

# 3. 포트 완전히 해제될 때까지 대기
sleep 3

# 4. 서버 재시작
npm run web
```

## 🎯 다른 실행 옵션

### 콘솔 데모 실행
```bash
npm run demo
```

### 개발 모드 (콘솔)
```bash
npm run dev
```

### 빌드 후 실행
```bash
npm run build
npm start
```

### 테스트 실행
```bash
npm test
```

## 📊 서버 상태 확인

### API 상태 확인
```bash
curl http://localhost:3000/api/status
```

### 성공 응답 예시
```json
{
  "status": "ok",
  "initialized": true,
  "stats": {
    "totalCards": 78,
    "completionRate": "100.0%",
    "majorArcana": 22,
    "minorArcana": 56
  }
}
```

## 🔮 사용 가능한 기능

서버가 정상 실행되면 다음 기능들을 사용할 수 있습니다:

- ✅ **단일 카드 리딩**
- ✅ **3카드 스프레드**  
- ✅ **관계 상담 (5카드)**
- ✅ **켈틱 크로스 (10카드)**
- ✅ **AI 질문 분석**
- ✅ **78장 완전한 타로 데이터**

## 💡 팁

1. **터미널을 닫지 마세요** - 서버가 실행 중인 터미널을 닫으면 서버도 종료됩니다
2. **Ctrl+C로 종료** - 서버를 중단하려면 터미널에서 `Ctrl+C`를 누르세요
3. **브라우저 새로고침** - 문제가 있으면 브라우저를 새로고침하세요
4. **완성률 100%** - 이제 모든 78장의 카드가 완성되어 완전한 해석을 제공합니다

---

**🌟 이제 완성된 AI 타로카드 앱을 즐기세요! 🔮**