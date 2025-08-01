# 🎨 AI 타로 앱 Frontend/Backend UI Layout 가이드

## 📋 문서 정보
**작성일**: 2025년 7월 31일  
**버전**: v2.0 실용적 구현 방향  
**기반**: 현재 완성된 v1.0 시스템 분석

---

## 🏗️ **현재 시스템 기반 분석**

### **완성된 기능 (활용 가능)**
- ✅ Express.js + TypeScript 서버
- ✅ WebSocket 실시간 통신
- ✅ 4가지 타로 스프레드 (단일, 3카드, 관계, 켈틱크로스)
- ✅ AI 통합 (Ollama LLM)
- ✅ 카드 데이터 로딩 시스템
- ✅ 웹 인터페이스 기본 구조

### **현재 기술 스택**
```typescript
Backend: Express.js + TypeScript + Socket.IO
Frontend: Vanilla HTML/CSS/JavaScript
Data: JSON 파일 시스템
AI: Ollama LLM 통합
```

---

## 🎯 **Frontend UI Layout 설계**

### **1. 메인 레이아웃 구조**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 타로 - 지혜로운 안내</title>
</head>
<body>
    <div id="app">
        <!-- 헤더 영역 -->
        <header class="app-header">
            <div class="logo-section">
                <h1>🔮 AI 타로</h1>
                <p class="tagline">당신의 지혜로운 안내자</p>
            </div>
            <nav class="main-nav">
                <button class="nav-btn active" data-section="reading">리딩</button>
                <button class="nav-btn" data-section="history">기록</button>
                <button class="nav-btn" data-section="settings">설정</button>
            </nav>
        </header>

        <!-- 메인 콘텐츠 영역 -->
        <main class="main-content">
            <!-- 리딩 섹션 -->
            <section id="reading-section" class="content-section active">
                <div class="question-panel">
                    <div class="question-input">
                        <label for="question">질문을 입력하세요</label>
                        <textarea id="question" placeholder="마음속 궁금한 것을 자유롭게 물어보세요..."></textarea>
                    </div>
                    <div class="category-select">
                        <label for="category">카테고리</label>
                        <select id="category">
                            <option value="general">일반</option>
                            <option value="love">연애</option>
                            <option value="career">진로</option>
                            <option value="money">금전</option>
                            <option value="health">건강</option>
                        </select>
                    </div>
                    <div class="spread-selection">
                        <h3>리딩 방식 선택</h3>
                        <div class="spread-buttons">
                            <button class="spread-btn" data-type="single">
                                <span class="icon">🃏</span>
                                <span class="title">단일 카드</span>
                                <span class="desc">간단한 질문</span>
                            </button>
                            <button class="spread-btn" data-type="three-card">
                                <span class="icon">📚</span>
                                <span class="title">3카드 스프레드</span>
                                <span class="desc">과거-현재-미래</span>
                            </button>
                            <button class="spread-btn" data-type="relationship">
                                <span class="icon">💕</span>
                                <span class="title">관계 상담</span>
                                <span class="desc">인간관계 전문</span>
                            </button>
                            <button class="spread-btn" data-type="celtic-cross">
                                <span class="icon">✨</span>
                                <span class="title">켈틱 크로스</span>
                                <span class="desc">종합 분석</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="results-panel">
                    <div id="loading-state" class="loading hidden">
                        <div class="spinner"></div>
                        <p>카드를 뽑고 있습니다...</p>
                    </div>
                    
                    <div id="results-content" class="results-content hidden">
                        <div class="cards-display">
                            <!-- 카드들이 동적으로 표시됩니다 -->
                        </div>
                        <div class="interpretation">
                            <h3>해석</h3>
                            <div class="interpretation-text"></div>
                        </div>
                        <div class="reading-actions">
                            <button id="save-reading" class="action-btn">저장</button>
                            <button id="share-reading" class="action-btn">공유</button>
                            <button id="new-reading" class="action-btn primary">새 리딩</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 기록 섹션 -->
            <section id="history-section" class="content-section">
                <div class="history-header">
                    <h2>리딩 기록</h2>
                    <div class="history-filters">
                        <select id="history-filter">
                            <option value="all">전체</option>
                            <option value="today">오늘</option>
                            <option value="week">이번 주</option>
                            <option value="month">이번 달</option>
                        </select>
                    </div>
                </div>
                <div class="history-list">
                    <!-- 기록들이 동적으로 표시됩니다 -->
                </div>
            </section>

            <!-- 설정 섹션 -->
            <section id="settings-section" class="content-section">
                <div class="settings-groups">
                    <div class="setting-group">
                        <h3>개인화 설정</h3>
                        <div class="setting-item">
                            <label>해석 스타일</label>
                            <select id="interpretation-style">
                                <option value="gentle">부드러운</option>
                                <option value="direct">직접적</option>
                                <option value="detailed">상세한</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label>테마</label>
                            <select id="theme">
                                <option value="mystical">미스틱</option>
                                <option value="modern">모던</option>
                                <option value="dark">다크</option>
                            </select>
                        </div>
                    </div>
                    <div class="setting-group">
                        <h3>알림 설정</h3>
                        <div class="setting-item">
                            <label>일일 카드 알림</label>
                            <input type="checkbox" id="daily-notification">
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- 상태 표시 영역 -->
        <div class="status-bar">
            <div class="status-indicator">
                <span class="status-dot online"></span>
                <span class="status-text">AI 연결됨</span>
            </div>
            <div class="reading-count">
                <span>오늘 리딩: <span id="today-count">0</span>회</span>
            </div>
        </div>
    </div>
</body>
</html>
```

### **2. CSS 스타일 시스템**

```css
/* 기본 변수 설정 */
:root {
    /* 컬러 팔레트 */
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    
    /* 중성 컬러 */
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --bg-card: #0f3460;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --border-color: #2a2a5a;
    
    /* 타이포그래피 */
    --font-primary: 'Pretendard', -apple-system, sans-serif;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    
    /* 간격 */
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* 반응형 브레이크포인트 */
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
}

/* 기본 레이아웃 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-primary);
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--text-primary);
    min-height: 100vh;
    line-height: 1.6;
}

#app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-md);
}

/* 헤더 스타일 */
.app-header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-section h1 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin-bottom: var(--spacing-xs);
}

.tagline {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

.main-nav {
    display: flex;
    gap: var(--spacing-sm);
}

.nav-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: 25px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.nav-btn.active,
.nav-btn:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
}

/* 메인 콘텐츠 */
.main-content {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
}

.content-section {
    display: none;
}

.content-section.active {
    display: block;
}

/* 질문 패널 */
.question-panel {
    margin-bottom: var(--spacing-2xl);
}

.question-input {
    margin-bottom: var(--spacing-lg);
}

.question-input label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
    color: var(--text-primary);
}

#question {
    width: 100%;
    min-height: 120px;
    padding: var(--spacing-md);
    border: 2px solid var(--border-color);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-base);
    resize: vertical;
    transition: border-color 0.3s ease;
}

#question:focus {
    outline: none;
    border-color: var(--accent-color);
}

#question::placeholder {
    color: var(--text-secondary);
}

.category-select {
    margin-bottom: var(--spacing-xl);
}

.category-select label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
}

#category {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 2px solid var(--border-color);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    font-size: var(--font-size-base);
    cursor: pointer;
}

/* 스프레드 선택 */
.spread-selection h3 {
    margin-bottom: var(--spacing-lg);
    text-align: center;
    font-size: var(--font-size-xl);
}

.spread-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
}

.spread-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid var(--border-color);
    border-radius: 15px;
    padding: var(--spacing-lg);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--text-primary);
}

.spread-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--accent-color);
    transform: translateY(-3px);
}

.spread-btn .icon {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-sm);
}

.spread-btn .title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.spread-btn .desc {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

/* 결과 패널 */
.results-panel {
    min-height: 400px;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--accent-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-md);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none !important;
}

/* 카드 표시 */
.cards-display {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
}

.tarot-card {
    width: 150px;
    height: 250px;
    background: linear-gradient(145deg, #2a2a5a, #1a1a2e);
    border-radius: 12px;
    border: 2px solid var(--border-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacing-md);
    position: relative;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.tarot-card:hover {
    transform: scale(1.05);
}

.tarot-card.reversed {
    transform: rotate(180deg);
}

.card-number {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    font-size: var(--font-size-sm);
    font-weight: 600;
}

.card-orientation {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    font-size: var(--font-size-lg);
}

.card-name {
    text-align: center;
    font-weight: 600;
    font-size: var(--font-size-sm);
}

.card-suit-symbol {
    position: absolute;
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    font-size: var(--font-size-lg);
}

/* 해석 영역 */
.interpretation {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
}

.interpretation h3 {
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-xl);
    text-align: center;
}

.interpretation-text {
    line-height: 1.8;
    font-size: var(--font-size-base);
}

/* 액션 버튼 */
.reading-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
}

.action-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: 2px solid var(--border-color);
    border-radius: 25px;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--accent-color);
}

.action-btn.primary {
    background: var(--accent-color);
    border-color: var(--accent-color);
}

.action-btn.primary:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

/* 상태 바 */
.status-bar {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--error-color);
}

.status-dot.online {
    background: var(--success-color);
}

.status-text {
    font-size: var(--font-size-sm);
}

.reading-count {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .app-header {
        flex-direction: column;
        gap: var(--spacing-lg);
        text-align: center;
    }
    
    .spread-buttons {
        grid-template-columns: 1fr;
    }
    
    .cards-display {
        flex-direction: column;
        align-items: center;
    }
    
    .tarot-card {
        width: 120px;
        height: 200px;
    }
    
    .reading-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .status-bar {
        flex-direction: column;
        gap: var(--spacing-sm);
        text-align: center;
    }
}

/* 테마별 색상 변화 */
[data-theme="modern"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
}

[data-theme="dark"] {
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #888888;
    --border-color: #333333;
}
```

### **3. JavaScript 클라이언트 로직**

```javascript
// 앱 상태 관리
class TarotApp {
    constructor() {
        this.currentSection = 'reading';
        this.socket = null;
        this.readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
        this.settings = JSON.parse(localStorage.getItem('tarotSettings') || '{}');
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.setupEventListeners();
        this.connectWebSocket();
        this.loadSettings();
        this.updateTodayCount();
    }
    
    setupEventListeners() {
        // 네비게이션
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });
        
        // 스프레드 선택
        document.querySelectorAll('.spread-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.performReading(e.currentTarget.dataset.type);
            });
        });
        
        // 설정 변경
        document.getElementById('theme').addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });
        
        // 리딩 액션
        document.getElementById('save-reading').addEventListener('click', () => {
            this.saveCurrentReading();
        });
        
        document.getElementById('share-reading').addEventListener('click', () => {
            this.shareReading();
        });
        
        document.getElementById('new-reading').addEventListener('click', () => {
            this.resetReading();
        });
    }
    
    connectWebSocket() {
        this.socket = io();
        
        this.socket.on('connect', () => {
            this.updateStatus('online', 'AI 연결됨');
        });
        
        this.socket.on('disconnect', () => {
            this.updateStatus('offline', '연결 끊김');
        });
        
        this.socket.on('reading-update', (data) => {
            this.handleRealtimeUpdate(data);
        });
    }
    
    switchSection(section) {
        // 네비게이션 활성화 상태 변경
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // 섹션 표시 변경
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');
        
        this.currentSection = section;
    }
    
    async performReading(spreadType) {
        const question = document.getElementById('question').value.trim();
        const category = document.getElementById('category').value;
        
        if (!question) {
            alert('질문을 입력해주세요.');
            return;
        }
        
        this.showLoading(true);
        
        try {
            const response = await fetch(`/api/reading/${spreadType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    category
                })
            });
            
            const reading = await response.json();
            this.displayReading(reading);
            
            // 기록 저장
            this.addToHistory(reading);
            this.updateTodayCount();
            
        } catch (error) {
            console.error('리딩 오류:', error);
            this.showError('리딩 중 오류가 발생했습니다.');
        } finally {
            this.showLoading(false);
        }
    }
    
    displayReading(reading) {
        const cardsDisplay = document.querySelector('.cards-display');
        const interpretationText = document.querySelector('.interpretation-text');
        
        // 카드 표시
        cardsDisplay.innerHTML = '';
        reading.cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            cardsDisplay.appendChild(cardElement);
        });
        
        // 해석 표시
        interpretationText.innerHTML = this.formatInterpretation(reading.interpretation);
        
        // 결과 영역 표시
        document.getElementById('results-content').classList.remove('hidden');
        
        // 현재 리딩 저장 (공유/저장용)
        this.currentReading = reading;
    }
    
    createCardElement(cardData) {
        const card = document.createElement('div');
        card.className = `tarot-card ${cardData.isReversed ? 'reversed' : ''}`;
        card.style.backgroundColor = cardData.cardDisplay?.displayInfo?.backgroundColor || '#2a2a5a';
        
        card.innerHTML = `
            <span class="card-number">${cardData.cardDisplay?.id || ''}</span>
            <span class="card-orientation">${cardData.isReversed ? '🔄' : '⬆️'}</span>
            <div class="card-name">
                <div>${cardData.cardDisplay?.koreanName || cardData.name}</div>
                <div style="font-size: 0.8em; margin-top: 4px;">
                    ${cardData.cardDisplay?.name || ''}
                </div>
            </div>
            <span class="card-suit-symbol">${cardData.cardDisplay?.displayInfo?.suitSymbol || ''}</span>
        `;
        
        return card;
    }
    
    formatInterpretation(interpretation) {
        // 텍스트를 단락으로 나누고 포맷팅
        return interpretation
            .split('\n\n')
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
    }
    
    showLoading(show) {
        const loading = document.getElementById('loading-state');
        const results = document.getElementById('results-content');
        
        if (show) {
            loading.classList.remove('hidden');
            results.classList.add('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }
    
    showError(message) {
        const resultsPanel = document.querySelector('.results-panel');
        resultsPanel.innerHTML = `
            <div class="error-message">
                <h3>⚠️ 오류</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="action-btn">다시 시도</button>
            </div>
        `;
    }
    
    addToHistory(reading) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            question: reading.question,
            category: reading.category,
            spreadType: this.getSpreadTypeName(reading.cards.length),
            cards: reading.cards,
            interpretation: reading.interpretation
        };
        
        this.readingHistory.unshift(historyItem);
        
        // 최대 100개까지만 저장
        if (this.readingHistory.length > 100) {
            this.readingHistory = this.readingHistory.slice(0, 100);
        }
        
        localStorage.setItem('readingHistory', JSON.stringify(this.readingHistory));
        this.updateHistoryDisplay();
    }
    
    getSpreadTypeName(cardCount) {
        switch(cardCount) {
            case 1: return '단일 카드';
            case 3: return '3카드 스프레드';
            case 5: return '관계 상담';
            case 10: return '켈틱 크로스';
            default: return '기타';
        }
    }
    
    updateTodayCount() {
        const today = new Date().toDateString();
        const todayReadings = this.readingHistory.filter(reading => 
            new Date(reading.timestamp).toDateString() === today
        );
        
        document.getElementById('today-count').textContent = todayReadings.length;
    }
    
    updateHistoryDisplay() {
        const historyList = document.querySelector('.history-list');
        
        if (this.readingHistory.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <p>아직 리딩 기록이 없습니다.</p>
                    <p>첫 번째 타로 리딩을 시작해보세요!</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = this.readingHistory.map(reading => `
            <div class="history-item" data-id="${reading.id}">
                <div class="history-header">
                    <span class="history-date">${this.formatDate(reading.timestamp)}</span>
                    <span class="history-type">${reading.spreadType}</span>
                </div>
                <div class="history-question">${reading.question}</div>
                <div class="history-cards">
                    ${reading.cards.map(card => 
                        `<span class="mini-card">${card.cardDisplay?.koreanName || card.name}</span>`
                    ).join(', ')}
                </div>
            </div>
        `).join('');
    }
    
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today - 24 * 60 * 60 * 1000);
        
        if (date.toDateString() === today.toDateString()) {
            return `오늘 ${date.toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `어제 ${date.toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        } else {
            return date.toLocaleDateString('ko-KR', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
    
    updateStatus(status, message) {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        statusDot.className = `status-dot ${status}`;
        statusText.textContent = message;
    }
    
    changeTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.settings.theme = theme;
        localStorage.setItem('tarotSettings', JSON.stringify(this.settings));
    }
    
    loadSettings() {
        if (this.settings.theme) {
            document.getElementById('theme').value = this.settings.theme;
            this.changeTheme(this.settings.theme);
        }
        
        if (this.settings.interpretationStyle) {
            document.getElementById('interpretation-style').value = this.settings.interpretationStyle;
        }
    }
    
    saveCurrentReading() {
        if (!this.currentReading) return;
        
        // 이미 기록에 있으므로 성공 메시지만 표시
        this.showToast('리딩이 저장되었습니다.', 'success');
    }
    
    shareReading() {
        if (!this.currentReading) return;
        
        const shareText = `🔮 타로 리딩 결과\n\n질문: ${this.currentReading.question}\n\n카드: ${this.currentReading.cards.map(c => c.cardDisplay?.koreanName || c.name).join(', ')}\n\n${this.currentReading.interpretation.substring(0, 100)}...`;
        
        if (navigator.share) {
            navigator.share({
                title: 'AI 타로 리딩 결과',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('클립보드에 복사되었습니다.', 'success');
            });
        }
    }
    
    resetReading() {
        document.getElementById('question').value = '';
        document.getElementById('category').value = 'general';
        document.getElementById('results-content').classList.add('hidden');
        this.currentReading = null;
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    handleRealtimeUpdate(data) {
        // WebSocket을 통한 실시간 업데이트 처리
        if (data.type === 'typing-analysis') {
            // 타이핑 분석 결과 표시
            console.log('타이핑 분석:', data);
        }
    }
}

// 토스트 CSS (동적 추가)
const toastStyles = `
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .toast-success {
        background: var(--success-color);
    }
    
    .toast-error {
        background: var(--error-color);
    }
    
    .toast-info {
        background: var(--primary-color);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.tarotApp = new TarotApp();
});
```

---

## 🔧 **Backend API 구조**

### **1. 서버 구조 개선**

```typescript
// server/app.ts - 개선된 버전
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { TarotReadingService } from '../services/tarotReading';
import { UserSessionManager } from '../services/userSession';
import { ReadingHistoryService } from '../services/readingHistory';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 서비스 인스턴스
const tarotService = new TarotReadingService();
const sessionManager = new UserSessionManager();
const historyService = new ReadingHistoryService();

// API 라우트
app.get('/api/status', async (req, res) => {
    try {
        const stats = await tarotService.getSystemStats();
        res.json({
            status: 'ok',
            initialized: true,
            stats,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: '상태 확인 중 오류가 발생했습니다'
        });
    }
});

// 리딩 API
app.post('/api/reading/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const { question, category } = req.body;
        
        // 입력 검증
        if (!question || typeof question !== 'string' || question.trim().length === 0) {
            return res.status(400).json({
                error: '질문을 입력해주세요'
            });
        }
        
        // 세션 관리
        const sessionId = req.headers['x-session-id'] || sessionManager.createSession();
        
        let reading;
        switch (type) {
            case 'single':
                reading = await tarotService.performSingleCardReading(question, category);
                break;
            case 'three-card':
                reading = await tarotService.performThreeCardReading(question, category);
                break;
            case 'relationship':
                reading = await tarotService.performRelationshipReading(question);
                break;
            case 'celtic-cross':
                reading = await tarotService.performCelticCrossReading(question, category);
                break;
            default:
                return res.status(400).json({
                    error: '지원되지 않는 리딩 타입입니다'
                });
        }
        
        // 기록 저장
        await historyService.saveReading(sessionId, reading);
        
        res.json({
            ...reading,
            sessionId
        });
        
    } catch (error) {
        console.error('리딩 오류:', error);
        res.status(500).json({
            error: '리딩 처리 중 오류가 발생했습니다',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// 질문 분석 API
app.post('/api/analyze-question', async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({
                error: '질문이 필요합니다'
            });
        }
        
        const analysis = await tarotService.analyzeQuestion(question);
        res.json(analysis);
        
    } catch (error) {
        console.error('질문 분석 오류:', error);
        res.status(500).json({
            error: '질문 분석 중 오류가 발생했습니다'
        });
    }
});

// 기록 조회 API
app.get('/api/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { limit = 20, offset = 0 } = req.query;
        
        const history = await historyService.getHistory(
            sessionId, 
            parseInt(limit as string), 
            parseInt(offset as string)
        );
        
        res.json(history);
        
    } catch (error) {
        console.error('기록 조회 오류:', error);
        res.status(500).json({
            error: '기록 조회 중 오류가 발생했습니다'
        });
    }
});

// WebSocket 연결 처리
io.on('connection', (socket) => {
    console.log(`클라이언트 연결됨: ${socket.id}`);
    
    socket.on('session:start', (data) => {
        const sessionId = sessionManager.createSession();
        socket.join(sessionId);
        socket.emit('session:created', { sessionId });
    });
    
    socket.on('typing:analysis', (data) => {
        // 실시간 타이핑 분석
        const analysis = sessionManager.analyzeTyping(socket.id, data);
        socket.emit('typing:feedback', analysis);
    });
    
    socket.on('disconnect', () => {
        console.log(`클라이언트 연결 해제됨: ${socket.id}`);
        sessionManager.endSession(socket.id);
    });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌐 타로 앱 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

export { app, server, io };
```

### **2. 사용자 세션 관리 서비스**

```typescript
// services/userSession.ts
export interface UserSession {
    id: string;
    createdAt: Date;
    lastActivity: Date;
    readingCount: number;
    preferences: {
        theme?: string;
        interpretationStyle?: string;
        language?: string;
    };
    typingPatterns: {
        avgSpeed: number;
        pauseCount: number;
        corrections: number;
    };
}

export class UserSessionManager {
    private sessions = new Map<string, UserSession>();
    private cleanupInterval: NodeJS.Timeout;
    
    constructor() {
        // 1시간마다 비활성 세션 정리
        this.cleanupInterval = setInterval(() => {
            this.cleanupInactiveSessions();
        }, 60 * 60 * 1000);
    }
    
    createSession(): string {
        const sessionId = this.generateSessionId();
        const session: UserSession = {
            id: sessionId,
            createdAt: new Date(),
            lastActivity: new Date(),
            readingCount: 0,
            preferences: {},
            typingPatterns: {
                avgSpeed: 0,
                pauseCount: 0,
                corrections: 0
            }
        };
        
        this.sessions.set(sessionId, session);
        return sessionId;
    }
    
    getSession(sessionId: string): UserSession | undefined {
        return this.sessions.get(sessionId);
    }
    
    updateSession(sessionId: string, updates: Partial<UserSession>): void {
        const session = this.sessions.get(sessionId);
        if (session) {
            Object.assign(session, updates, { lastActivity: new Date() });
        }
    }
    
    endSession(sessionId: string): void {
        this.sessions.delete(sessionId);
    }
    
    analyzeTyping(sessionId: string, typingData: any): any {
        const session = this.getSession(sessionId);
        if (!session) return null;
        
        // 타이핑 패턴 분석 로직
        const analysis = {
            emotionalState: this.analyzeEmotionalState(typingData),
            urgency: this.analyzeUrgency(typingData),
            confidence: this.analyzeConfidence(typingData)
        };
        
        // 세션에 패턴 업데이트
        this.updateTypingPatterns(session, typingData);
        
        return analysis;
    }
    
    private generateSessionId(): string {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }
    
    private cleanupInactiveSessions(): void {
        const now = new Date();
        const maxInactiveTime = 24 * 60 * 60 * 1000; // 24시간
        
        for (const [sessionId, session] of this.sessions) {
            if (now.getTime() - session.lastActivity.getTime() > maxInactiveTime) {
                this.sessions.delete(sessionId);
            }
        }
    }
    
    private analyzeEmotionalState(typingData: any): string {
        // 타이핑 속도, 정정 횟수 등을 기반으로 감정 상태 분석
        if (typingData.corrections > 5) return 'anxious';
        if (typingData.speed < 20) return 'thoughtful';
        if (typingData.speed > 80) return 'excited';
        return 'neutral';
    }
    
    private analyzeUrgency(typingData: any): string {
        if (typingData.pauseTime < 500) return 'high';
        if (typingData.pauseTime > 2000) return 'low';
        return 'medium';
    }
    
    private analyzeConfidence(typingData: any): number {
        // 0-1 사이의 확신도 반환
        const correctionPenalty = Math.min(typingData.corrections * 0.1, 0.5);
        const speedBonus = Math.min(typingData.speed / 100, 0.3);
        return Math.max(0.5 - correctionPenalty + speedBonus, 0.1);
    }
    
    private updateTypingPatterns(session: UserSession, typingData: any): void {
        // 타이핑 패턴 누적 업데이트
        session.typingPatterns.avgSpeed = 
            (session.typingPatterns.avgSpeed + typingData.speed) / 2;
        session.typingPatterns.pauseCount += typingData.pauses;
        session.typingPatterns.corrections += typingData.corrections;
    }
}
```

### **3. 리딩 기록 서비스**

```typescript
// services/readingHistory.ts
export interface ReadingRecord {
    id: string;
    sessionId: string;
    timestamp: Date;
    question: string;
    category: string;
    spreadType: string;
    cards: any[];
    interpretation: string;
    userFeedback?: {
        rating: number;
        helpful: boolean;
        comment?: string;
    };
}

export class ReadingHistoryService {
    private history = new Map<string, ReadingRecord[]>();
    
    async saveReading(sessionId: string, reading: any): Promise<void> {
        const record: ReadingRecord = {
            id: this.generateId(),
            sessionId,
            timestamp: new Date(),
            question: reading.question,
            category: reading.category,
            spreadType: this.getSpreadType(reading.cards.length),
            cards: reading.cards,
            interpretation: reading.interpretation
        };
        
        if (!this.history.has(sessionId)) {
            this.history.set(sessionId, []);
        }
        
        const sessionHistory = this.history.get(sessionId)!;
        sessionHistory.unshift(record);
        
        // 최대 100개까지만 저장
        if (sessionHistory.length > 100) {
            sessionHistory.splice(100);
        }
    }
    
    async getHistory(sessionId: string, limit: number = 20, offset: number = 0): Promise<ReadingRecord[]> {
        const sessionHistory = this.history.get(sessionId) || [];
        return sessionHistory.slice(offset, offset + limit);
    }
    
    async getTodayCount(sessionId: string): Promise<number> {
        const sessionHistory = this.history.get(sessionId) || [];
        const today = new Date().toDateString();
        
        return sessionHistory.filter(record => 
            record.timestamp.toDateString() === today
        ).length;
    }
    
    async addFeedback(recordId: string, feedback: ReadingRecord['userFeedback']): Promise<void> {
        for (const sessionHistory of this.history.values()) {
            const record = sessionHistory.find(r => r.id === recordId);
            if (record) {
                record.userFeedback = feedback;
                break;
            }
        }
    }
    
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    private getSpreadType(cardCount: number): string {
        switch (cardCount) {
            case 1: return 'single';
            case 3: return 'three-card';
            case 5: return 'relationship';
            case 10: return 'celtic-cross';
            default: return 'custom';
        }
    }
}
```

---

## 📱 **반응형 디자인 최적화**

### **모바일 최적화 CSS**

```css
/* 추가 모바일 최적화 */
@media (max-width: 480px) {
    :root {
        --spacing-xs: 0.25rem;
        --spacing-sm: 0.5rem;
        --spacing-md: 0.75rem;
        --spacing-lg: 1rem;
        --spacing-xl: 1.5rem;
        --spacing-2xl: 2rem;
    }
    
    #app {
        padding: var(--spacing-sm);
    }
    
    .app-header {
        padding: var(--spacing-md);
    }
    
    .main-content {
        padding: var(--spacing-lg);
    }
    
    #question {
        min-height: 80px;
        font-size: 16px; /* iOS 확대 방지 */
    }
    
    .spread-btn {
        padding: var(--spacing-md);
        min-height: 80px;
    }
    
    .tarot-card {
        width: 100px;
        height: 160px;
        padding: var(--spacing-sm);
    }
    
    .interpretation {
        padding: var(--spacing-lg);
        font-size: var(--font-size-sm);
        line-height: 1.6;
    }
    
    .action-btn {
        min-height: 44px;
        font-size: 16px;
    }
}

/* 터치 기기 최적화 */
@media (hover: none) and (pointer: coarse) {
    .spread-btn:hover {
        transform: none;
    }
    
    .spread-btn:active {
        transform: scale(0.98);
        background: rgba(255, 255, 255, 0.2);
    }
    
    .tarot-card:hover {
        transform: none;
    }
    
    .tarot-card:active {
        transform: scale(1.02);
    }
}
```

---

## 🚀 **성능 최적화**

### **1. 이미지 최적화**
- WebP 포맷 사용
- 지연 로딩 구현
- 적응형 이미지 크기

### **2. JavaScript 최적화**
- 이벤트 위임 사용
- 디바운스/스로틀 적용
- 가상 스크롤링 (기록 목록)

### **3. CSS 최적화**
- CSS 변수 활용
- Critical CSS 인라인
- 애니메이션 최적화

---

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "\uc2e4\uc6a9\uc801\uc778 Frontend/Backend UI Layout \ubb38\uc11c \uc0dd\uc131", "status": "completed", "priority": "high"}]