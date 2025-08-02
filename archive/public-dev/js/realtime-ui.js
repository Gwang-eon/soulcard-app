/**
 * 실시간 분석 UI 컴포넌트
 * Phase 4.1: 프론트엔드 실시간 UI
 */

class RealtimeAnalysisUI {
    constructor() {
        this.socket = null;
        this.sessionId = null;
        this.isConnected = false;
        this.typingBuffer = [];
        this.lastTypingTime = 0;
        this.currentEmotion = 'neutral';
        
        this.initializeComponents();
        this.setupSocketConnection();
        this.bindEvents();
    }

    /**
     * UI 컴포넌트 초기화
     */
    initializeComponents() {
        // 실시간 분석 패널 생성
        this.createRealtimePanel();
    }

    /**
     * 실시간 분석 패널 생성
     */
    createRealtimePanel() {
        const panel = document.createElement('div');
        panel.id = 'realtimePanel';
        panel.className = 'realtime-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h3><i class="fas fa-chart-line"></i> 실시간 분석 및 AI 피드백</h3>
                <div class="connection-status" id="connectionStatus">
                    <i class="fas fa-circle offline"></i> 연결 중...
                </div>
            </div>
            
            <div class="panel-description">
                <p><i class="fas fa-info-circle"></i> 질문을 입력하는 동안 실시간으로 타이핑 패턴과 감정 상태를 분석하여 개인화된 조언을 제공합니다.</p>
            </div>
            
            <div class="analysis-grid">
                <!-- 타이핑 분석 -->
                <div class="analysis-card">
                    <h4><i class="fas fa-keyboard"></i> 타이핑 분석</h4>
                    <div class="typing-metrics">
                        <div class="metric">
                            <span class="metric-label">속도</span>
                            <div class="speed-gauge">
                                <div class="gauge-fill" id="speedGaugeFill"></div>
                                <span class="gauge-text" id="speedText">0 WPM</span>
                            </div>
                        </div>
                        <div class="metric">
                            <span class="metric-label">리듬</span>
                            <div class="rhythm-indicator" id="rhythmIndicator">
                                <div class="rhythm-bars">
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                </div>
                            </div>
                        </div>
                        <div class="metric">
                            <span class="metric-label">수정</span>
                            <span class="correction-count" id="correctionCount">0</span>
                        </div>
                    </div>
                </div>
                
                <!-- 감정 분석 -->
                <div class="analysis-card">
                    <h4><i class="fas fa-heart"></i> 감정 상태</h4>
                    <div class="emotion-display">
                        <div class="emotion-circle" id="emotionCircle">
                            <span class="emotion-emoji" id="emotionEmoji">😐</span>
                        </div>
                        <div class="emotion-info">
                            <div class="emotion-name" id="emotionName">중립</div>
                            <div class="emotion-intensity">
                                <div class="intensity-bar">
                                    <div class="intensity-fill" id="intensityFill"></div>
                                </div>
                                <span id="intensityText">50%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 질문 예측 -->
                <div class="analysis-card">
                    <h4><i class="fas fa-magic"></i> 질문 예측</h4>
                    <div class="prediction-area">
                        <div class="predicted-intent" id="predictedIntent">입력을 기다리는 중...</div>
                        <div class="suggestion-box" id="suggestionBox"></div>
                    </div>
                </div>
                
                <!-- 카드 미리보기 -->
                <div class="analysis-card">
                    <h4><i class="fas fa-eye"></i> 카드 미리보기</h4>
                    <div class="card-preview-area" id="cardPreviewArea">
                        <div class="preview-placeholder">
                            질문을 입력하면 추천 카드가 표시됩니다
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 감정 여정 차트 -->
            <div class="emotion-journey">
                <h4><i class="fas fa-route"></i> 감정 여정</h4>
                <div class="journey-chart" id="journeyChart">
                    <canvas id="emotionChart" width="400" height="100"></canvas>
                </div>
            </div>
        `;

        // 메인 컨테이너에 추가 (main-content 아래에 배치)
        const container = document.querySelector('.container');
        const mainContent = container.querySelector('.main-content');
        container.insertBefore(panel, mainContent.nextSibling);
    }

    /**
     * WebSocket 연결 설정
     */
    setupSocketConnection() {
        try {
            // Socket.IO 초기화 전에 서버 상태 확인
            console.log('🔍 Socket.IO 초기화 시도...');
            console.log('🔍 현재 페이지 URL:', window.location.href);
            
            this.socket = io(window.location.origin, {
                transports: ['websocket', 'polling'],
                timeout: 20000,
                forceNew: true
            });
            
            this.socket.on('connect', () => {
                console.log('🔌 WebSocket 연결 성공');
                console.log('🔌 Socket ID:', this.socket.id);
                console.log('🔌 Socket 연결 상태:', this.socket.connected);
                
                this.isConnected = true;
                this.updateConnectionStatus('connected');
                
                // 연결 성공 후 1초 뒤에 세션 시작 (서버 준비 시간 확보)
                setTimeout(() => {
                    console.log('⏰ 세션 시작 시도 중...');
                    this.startSession();
                    
                    // 테스트용 가짜 데이터로 UI 업데이트
                    setTimeout(() => {
                        this.testRealtimeUI();
                    }, 3000);
                }, 1000);
            });


            this.socket.on('session_initialized', (response) => {
                console.log('🎯 세션 초기화 완료:', response);
                this.sessionId = response.data.sessionId;
                this.updateConnectionStatus('active');
            });

            this.socket.on('realtime_update', (data) => {
                console.log('📊 실시간 업데이트 수신:', data);
                this.handleRealtimeUpdate(data);
            });

            this.socket.on('question_prediction', (response) => {
                this.updateQuestionPrediction(response.data);
            });

            this.socket.on('personalized_response', (response) => {
                this.showPersonalizedFeedback(response.data);
            });

            this.socket.on('error', (error) => {
                console.error('WebSocket 에러:', error);
                this.updateConnectionStatus('error');
            });

            this.socket.on('connect_error', (error) => {
                console.error('❌ WebSocket 연결 실패:', error);
                console.error('❌ 오류 상세:', error.message);
                console.error('❌ 연결 URL:', window.location.origin);
                this.updateConnectionStatus('error');
            });
            
            this.socket.on('disconnect', (reason) => {
                console.log('🔌 WebSocket 연결 해제, 이유:', reason);
                this.isConnected = false;
                this.updateConnectionStatus('disconnected');
            });
            
            this.socket.on('reconnect_attempt', (attemptNumber) => {
                console.log('🔄 재연결 시도:', attemptNumber);
            });
            
            this.socket.on('reconnect_error', (error) => {
                console.error('🔄 재연결 실패:', error);
            });

        } catch (error) {
            console.error('WebSocket 연결 실패:', error);
            this.updateConnectionStatus('error');
        }
    }

    /**
     * 이벤트 바인딩
     */
    bindEvents() {
        const questionTextarea = document.getElementById('question');
        if (questionTextarea) {
            // 타이핑 이벤트 캡처
            questionTextarea.addEventListener('keydown', (e) => {
                this.captureTypingEvent('keydown', e);
            });

            questionTextarea.addEventListener('keyup', (e) => {
                this.captureTypingEvent('keyup', e);
            });

            // 텍스트 변경 감지
            questionTextarea.addEventListener('input', (e) => {
                this.handleTextChange(e.target.value);
            });

            // 포커스 이벤트
            questionTextarea.addEventListener('focus', () => {
                this.trackActivity('focus');
            });

            questionTextarea.addEventListener('blur', () => {
                this.trackActivity('blur');
            });
        }
    }

    /**
     * 세션 시작
     */
    startSession() {
        if (!this.socket || !this.isConnected) return;

        const userContext = {
            sessionId: `web_${Date.now()}`,
            userProfile: {
                preferredLanguage: 'ko',
                experienceLevel: 'beginner'
            },
            deviceInfo: {
                type: 'desktop',
                browser: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        };

        const sessionData = {
            userContext: userContext,
            initialState: { timestamp: Date.now() }
        };
        
        console.log('🔌 세션 시작 전 Socket 상태 확인:');
        console.log('  - Socket 존재:', !!this.socket);
        console.log('  - Socket 연결:', this.socket?.connected);
        console.log('  - Socket ID:', this.socket?.id);
        console.log('  - isConnected:', this.isConnected);
        
        console.log('🎯 세션 시작 데이터 전송:', sessionData);
        console.log('🔍 userContext 존재 여부:', !!sessionData.userContext);
        console.log('🔍 userContext 내용:', sessionData.userContext);
        
        if (this.socket && this.socket.connected) {
            console.log('✅ Socket 상태 정상 - 이벤트 전송 시도');
            this.socket.emit('session:start', sessionData);
            console.log('📤 session:start 이벤트 전송 완료');
        } else {
            console.error('❌ Socket 연결 상태 이상 - 이벤트 전송 실패');
        }
    }

    /**
     * 타이핑 이벤트 캡처
     */
    captureTypingEvent(type, event) {
        if (!this.isConnected) return;

        // 한글 조합 중인 키 이벤트 필터링
        if (event.isComposing || event.keyCode === 229) {
            console.log('🔤 한글 조합 중 - 스킵:', event.key);
            return;
        }

        // 의미 있는 키 이벤트만 캡처
        const meaningfulKeys = [
            'Backspace', 'Delete', 'Enter', 'Tab', 'Space',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
        ];
        
        const isTextInput = event.key.length === 1; // 단일 문자
        const isMeaningfulKey = meaningfulKeys.includes(event.key);
        
        if (!isTextInput && !isMeaningfulKey) {
            console.log('🚫 무의미한 키 이벤트 스킵:', event.key);
            return;
        }

        const typingEvent = {
            type,
            key: event.key,
            timestamp: Date.now(),
            location: event.target.selectionStart || 0,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            textLength: event.target.value.length,
            isComposing: event.isComposing
        };

        this.typingBuffer.push(typingEvent);
        this.lastTypingTime = Date.now();

        console.log('⌨️ 타이핑 이벤트 캡처:', typingEvent);

        // 100ms 간격으로 배치 전송
        if (!this.typingTimer) {
            this.typingTimer = setTimeout(() => {
                this.sendTypingEvents();
                this.typingTimer = null;
            }, 100);
        }
    }

    /**
     * 타이핑 이벤트 전송
     */
    sendTypingEvents() {
        if (!this.socket || !this.isConnected || this.typingBuffer.length === 0) return;

        const partialText = document.getElementById('question')?.value || '';

        this.socket.emit('typing:event', {
            events: [...this.typingBuffer],
            partialText,
            timestamp: Date.now()
        });

        this.typingBuffer = [];
    }

    /**
     * 텍스트 변경 처리
     */
    handleTextChange(text) {
        if (!this.socket || !this.isConnected) return;

        // 질문 업데이트 이벤트 전송 (500ms 디바운스)
        clearTimeout(this.textChangeTimer);
        this.textChangeTimer = setTimeout(() => {
            this.socket.emit('question:update', {
                partialQuestion: text,
                isComplete: text.trim().length > 10 && text.includes('?'),
                timestamp: Date.now()
            });
        }, 500);
    }

    /**
     * 사용자 활동 추적
     */
    trackActivity(activityType) {
        if (!this.socket || !this.isConnected) return;

        this.socket.emit('activity:update', {
            activity: {
                activityType,
                timestamp: Date.now(),
                duration: 0,
                data: { target: 'question_input' },
                engagement: {
                    focus: activityType === 'focus' ? 1.0 : 0.5,
                    interaction: 1.0,
                    duration: 0
                }
            },
            context: {
                page: 'main',
                section: 'question_panel'
            }
        });
    }

    /**
     * 실시간 업데이트 처리
     */
    handleRealtimeUpdate(data) {
        switch (data.type) {
            case 'typing_analyzed':
                this.updateTypingAnalysis(data.data);
                break;
            case 'emotional_shift':
                this.updateEmotionDisplay(data.data);
                break;
            case 'question_predicted':
                this.updateQuestionPrediction(data.data);
                break;
            case 'drop_off_risk':
                this.handleDropOffRisk(data.data);
                break;
        }
    }

    /**
     * 타이핑 분석 업데이트
     */
    updateTypingAnalysis(analysis) {
        console.log('⌨️ 타이핑 분석 업데이트:', analysis);
        
        // 속도 게이지 업데이트
        const speedGaugeFill = document.getElementById('speedGaugeFill');
        const speedText = document.getElementById('speedText');
        
        if (speedGaugeFill && speedText && analysis.analysis) {
            const wpm = analysis.analysis.speed?.wpm || 0;
            const percentage = Math.min((wpm / 100) * 100, 100);
            
            speedGaugeFill.style.width = `${percentage}%`;
            speedText.textContent = `${wpm} WPM`;
            
            // 속도에 따른 색상 변경
            if (wpm < 20) {
                speedGaugeFill.className = 'gauge-fill slow';
            } else if (wpm < 40) {
                speedGaugeFill.className = 'gauge-fill normal';
            } else {
                speedGaugeFill.className = 'gauge-fill fast';
            }
        } else {
            console.warn('⚠️ 속도 게이지 요소를 찾을 수 없거나 분석 데이터가 없습니다');
        }

        // 리듬 표시 업데이트
        this.updateRhythmIndicator(analysis.analysis.rhythm);
        
        // 수정 횟수 업데이트
        const correctionCount = document.getElementById('correctionCount');
        if (correctionCount && analysis.analysis.corrections) {
            correctionCount.textContent = analysis.analysis.corrections.length || 0;
        }
    }

    /**
     * 리듬 표시기 업데이트
     */
    updateRhythmIndicator(rhythm) {
        const rhythmBars = document.querySelectorAll('.rhythm-bars .bar');
        
        if (rhythmBars.length === 0 || !rhythm) return;

        const consistency = rhythm.consistency || 0.5;
        const activeBarCount = Math.round(consistency * rhythmBars.length);

        rhythmBars.forEach((bar, index) => {
            if (index < activeBarCount) {
                bar.classList.add('active');
                bar.style.animationDelay = `${index * 0.1}s`;
            } else {
                bar.classList.remove('active');
            }
        });
    }

    /**
     * 감정 표시 업데이트
     */
    updateEmotionDisplay(emotionData) {
        const emotionCircle = document.getElementById('emotionCircle');
        const emotionEmoji = document.getElementById('emotionEmoji');
        const emotionName = document.getElementById('emotionName');
        const intensityFill = document.getElementById('intensityFill');
        const intensityText = document.getElementById('intensityText');

        if (!emotionData.shift) return;

        const emotion = emotionData.shift.toEmotion;
        const intensity = emotionData.insight?.intensity || 0.5;

        // 감정 이모지와 이름 업데이트
        const emotionConfig = this.getEmotionConfig(emotion);
        
        if (emotionEmoji) emotionEmoji.textContent = emotionConfig.emoji;
        if (emotionName) emotionName.textContent = emotionConfig.name;
        
        // 감정 원 색상 변경
        if (emotionCircle) {
            emotionCircle.className = `emotion-circle ${emotion}`;
            emotionCircle.style.boxShadow = `0 0 20px ${emotionConfig.color}40`;
        }

        // 강도 바 업데이트
        if (intensityFill && intensityText) {
            const percentage = Math.round(intensity * 100);
            intensityFill.style.width = `${percentage}%`;
            intensityFill.style.backgroundColor = emotionConfig.color;
            intensityText.textContent = `${percentage}%`;
        }

        // 배경색 동적 변경
        this.updateBackgroundEmotion(emotion, intensity);
        
        // 감정 여정 차트 업데이트
        this.updateEmotionChart(emotion, intensity);
    }

    /**
     * 감정 설정 반환
     */
    getEmotionConfig(emotion) {
        const configs = {
            'joy': { emoji: '😊', name: '기쁨', color: '#FFD700' },
            'sadness': { emoji: '😢', name: '슬픔', color: '#4169E1' },
            'fear': { emoji: '😰', name: '두려움', color: '#800080' },
            'anger': { emoji: '😠', name: '분노', color: '#DC143C' },
            'surprise': { emoji: '😲', name: '놀람', color: '#FF6347' },
            'disgust': { emoji: '😷', name: '혐오', color: '#228B22' },
            'anxiety': { emoji: '😰', name: '불안', color: '#FF4500' },
            'stress': { emoji: '😫', name: '스트레스', color: '#B22222' },
            'confusion': { emoji: '😕', name: '혼란', color: '#696969' },
            'excitement': { emoji: '🤩', name: '흥분', color: '#FF1493' },
            'neutral': { emoji: '😐', name: '중립', color: '#808080' }
        };
        
        return configs[emotion] || configs['neutral'];
    }

    /**
     * 배경 감정 색상 업데이트
     */
    updateBackgroundEmotion(emotion, intensity) {
        const body = document.body;
        const emotionConfig = this.getEmotionConfig(emotion);
        
        // 감정에 따른 배경 그라데이션 변경
        const alpha = Math.max(0.1, intensity * 0.3);
        const emotionGradient = `linear-gradient(135deg, 
            rgba(102, 126, 234, ${1 - alpha}) 0%, 
            rgba(118, 75, 162, ${1 - alpha}) 50%,
            ${this.hexToRgba(emotionConfig.color, alpha)} 100%)`;
        
        body.style.background = emotionGradient;
        
        // 트랜지션 효과
        body.style.transition = 'background 2s ease-in-out';
    }

    /**
     * 헥스 색상을 RGBA로 변환
     */
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * 질문 예측 업데이트
     */
    updateQuestionPrediction(prediction) {
        const predictedIntent = document.getElementById('predictedIntent');
        const suggestionBox = document.getElementById('suggestionBox');

        if (predictedIntent && prediction.predictedIntent) {
            const intentName = this.getIntentName(prediction.predictedIntent);
            const confidence = Math.round((prediction.confidence || 0) * 100);
            
            predictedIntent.innerHTML = `
                <div class="intent-display">
                    <span class="intent-name">${intentName}</span>
                    <span class="confidence-badge">${confidence}%</span>
                </div>
            `;
        }

        if (suggestionBox && prediction.suggestedCompletion) {
            suggestionBox.innerHTML = `
                <div class="suggestion-item" onclick="applySuggestion('${prediction.suggestedCompletion}')">
                    <i class="fas fa-lightbulb"></i>
                    "${prediction.suggestedCompletion}"
                </div>
            `;
        }
    }

    /**
     * 의도 이름 반환
     */
    getIntentName(intent) {
        const names = {
            'love_advice': '💕 연애 조언',
            'career_guidance': '💼 직업 안내',
            'general_fortune': '🔮 전반적 운세',
            'relationship_issue': '💔 관계 문제',
            'decision_making': '🤔 결정 고민',
            'future_prediction': '🔭 미래 예측',
            'spiritual_growth': '🙏 영적 성장',
            'health_concern': '🏥 건강 고민'
        };
        
        return names[intent] || `🎯 ${intent}`;
    }

    /**
     * 감정 여정 차트 업데이트
     */
    updateEmotionChart(emotion, intensity) {
        // 간단한 캔버스 차트 구현
        const canvas = document.getElementById('emotionChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // 감정 데이터 저장 (최근 20개)
        if (!this.emotionHistory) this.emotionHistory = [];
        
        this.emotionHistory.push({
            emotion,
            intensity,
            timestamp: Date.now(),
            color: this.getEmotionConfig(emotion).color
        });

        if (this.emotionHistory.length > 20) {
            this.emotionHistory.shift();
        }

        // 차트 그리기
        ctx.clearRect(0, 0, width, height);
        
        if (this.emotionHistory.length < 2) return;

        // 선 그리기
        ctx.beginPath();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;

        this.emotionHistory.forEach((point, index) => {
            const x = (index / (this.emotionHistory.length - 1)) * width;
            const y = height - (point.intensity * height);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // 점 그리기
        this.emotionHistory.forEach((point, index) => {
            const x = (index / (this.emotionHistory.length - 1)) * width;
            const y = height - (point.intensity * height);

            ctx.beginPath();
            ctx.fillStyle = point.color;
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();

            // 현재 점 강조
            if (index === this.emotionHistory.length - 1) {
                ctx.beginPath();
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 2;
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.stroke();
            }
        });
    }

    /**
     * 테스트용 실시간 UI 업데이트
     */
    testRealtimeUI() {
        console.log('🧪 테스트용 실시간 UI 업데이트 시작');
        
        // 1. 타이핑 분석 테스트
        this.updateTypingAnalysis({
            analysis: {
                speed: { wpm: 45, trend: 'increasing' },
                rhythm: { consistency: 0.7, flow: 'flowing' },
                corrections: [{ location: 5, type: 'backspace' }, { location: 12, type: 'delete' }]
            },
            emotion: { primary: 'excitement', intensity: 0.8 }
        });
        
        // 2. 감정 표시 테스트  
        setTimeout(() => {
            this.updateEmotionDisplay({
                shift: { toEmotion: 'joy', fromEmotion: 'neutral' },
                insight: { intensity: 0.75 }
            });
        }, 1000);
        
        // 3. 질문 예측 테스트
        setTimeout(() => {
            this.updateQuestionPrediction({
                predictedIntent: 'love_advice',
                confidence: 0.85,
                suggestedCompletion: '내일 새로운 만남이 있을까요?'
            });
        }, 2000);
        
        console.log('🧪 테스트 UI 업데이트 완료');
    }

    /**
     * 연결 상태 업데이트
     */
    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connectionStatus');
        if (!statusElement) return;

        const statusConfig = {
            'connected': { icon: 'fa-circle online', text: '연결됨' },
            'active': { icon: 'fa-circle active', text: '실시간 분석 중' },
            'disconnected': { icon: 'fa-circle offline', text: '연결 끊김' },
            'error': { icon: 'fa-exclamation-triangle error', text: '연결 오류' }
        };

        const config = statusConfig[status] || statusConfig['disconnected'];
        statusElement.innerHTML = `<i class="fas ${config.icon}"></i> ${config.text}`;
    }

    /**
     * 개인화된 피드백 표시
     */
    showPersonalizedFeedback(feedback) {
        // 알림 창 또는 토스트 메시지로 표시
        this.showToast(feedback.message, feedback.type || 'info');
        
        // 지원 옵션이 있는 경우 모달 표시
        if (feedback.supportOptions && feedback.supportOptions.length > 0) {
            this.showSupportModal(feedback);
        }
    }

    /**
     * 토스트 메시지 표시
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(toast);

        // 자동 제거
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    /**
     * 이탈 위험 처리
     */
    handleDropOffRisk(riskData) {
        if (riskData.interventions && riskData.interventions.length > 0) {
            // 긴급 개입 메시지 표시
            this.showToast('잠시 쉬어가면서 다시 시작해보세요 😊', 'warning');
            
            // 도움말 버튼 활성화
            this.showHelpButton();
        }
    }

    /**
     * 도움말 버튼 표시
     */
    showHelpButton() {
        const helpButton = document.createElement('button');
        helpButton.id = 'helpButton';
        helpButton.className = 'help-floating-button';
        helpButton.innerHTML = '<i class="fas fa-question-circle"></i>';
        
        helpButton.onclick = () => {
            this.showHelpModal();
        };

        document.body.appendChild(helpButton);

        // 5초 후 자동 제거
        setTimeout(() => {
            if (helpButton.parentElement) {
                helpButton.remove();
            }
        }, 10000);
    }
}

/**
 * 제안 적용
 */
function applySuggestion(suggestion) {
    const questionInput = document.getElementById('question');
    if (questionInput) {
        questionInput.value = suggestion;
        questionInput.focus();
        questionInput.setSelectionRange(suggestion.length, suggestion.length);
    }
}

// 전역 인스턴스
let realtimeUI = null;

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
    // Socket.IO가 로드되었는지 확인
    if (typeof io !== 'undefined') {
        realtimeUI = new RealtimeAnalysisUI();
        console.log('🎯 실시간 분석 UI 초기화 완료');
    } else {
        console.warn('⚠️ Socket.IO가 로드되지 않았습니다');
    }
});

// 전역 함수로 내보내기
window.RealtimeAnalysisUI = RealtimeAnalysisUI;