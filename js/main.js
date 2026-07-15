/**
 * ================================================================
 * الملف الرئيسي - أكاديمية الحايك
 * Alhayek Academy - Main File
 * 
 * @author Eng. Ahmed Al-Hayek
 * @version 2.1.0
 * ================================================================
 */

// ================================================================
// 1. متغيرات عامة
// ================================================================
const STATE = {
    currentStage: 0, // 0 = home, 1-5 = stages
    progress: {
        stages: [false, false, false, false, false],
        quizScores: [0, 0, 0, 0, 0],
        completed: false,
        timeSpent: 0,
    },
    language: 'ar',
    userName: '',
};

// ================================================================
// 2. حفظ واستعادة الحالة الكاملة
// ================================================================

/**
 * حفظ الحالة الكاملة في LocalStorage
 */
function saveFullState() {
    try {
        const stateToSave = {
            currentStage: STATE.currentStage,
            progress: STATE.progress,
            language: STATE.language,
            userName: STATE.userName,
            lastUpdated: new Date().toISOString(),
        };
        localStorage.setItem('academyFullState', JSON.stringify(stateToSave));
    } catch (e) {
        console.warn('⚠️ فشل في حفظ الحالة الكاملة:', e);
    }
}

/**
 * استعادة الحالة الكاملة من LocalStorage
 */
function loadFullState() {
    try {
        const saved = localStorage.getItem('academyFullState');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.currentStage !== undefined) STATE.currentStage = data.currentStage;
            if (data.progress) STATE.progress = data.progress;
            if (data.language) STATE.language = data.language;
            if (data.userName) STATE.userName = data.userName;
            return true;
        }
    } catch (e) {
        console.warn('⚠️ فشل في تحميل الحالة الكاملة:', e);
    }
    return false;
}

// ================================================================
// 3. تهيئة الموقع
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 بدء تشغيل الموقع...');
    
    const hasSavedState = loadFullState();
    loadProgress();
    initLanguage();
    updateProgressBar();
    initStagesMap();
    updateDashboard();
    
    // استعادة المرحلة السابقة
    if (hasSavedState && STATE.currentStage > 0) {
        console.log(`📂 استعادة المرحلة السابقة: ${STATE.currentStage}`);
        setTimeout(() => {
            goToStage(STATE.currentStage, true);
        }, 100);
    }
    
    // تحديث خريطة المسار
    setTimeout(updateLearningPath, 300);
    
    // عرض السنة
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    
    console.log('✅ الموقع جاهز!');
});

// ================================================================
// 4. إدارة اللغة
// ================================================================

function initLanguage() {
    const lang = STATE.language || localStorage.getItem('preferredLanguage') || 'ar';
    setLanguage(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('preferredLanguage', lang);
            saveFullState();
        });
    });
}

function setLanguage(lang) {
    STATE.language = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    if (typeof updateContent === 'function') {
        updateContent(lang);
    }

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    saveFullState();
}

// ================================================================
// 5. إدارة التقدم
// ================================================================

function loadProgress() {
    if (STATE.progress && STATE.progress.stages && STATE.progress.stages.length === 5) {
        return;
    }
    
    const saved = localStorage.getItem('academyProgress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            STATE.progress = data;
        } catch (e) {
            console.warn('⚠️ خطأ في تحميل التقدم:', e);
            resetProgress();
        }
    } else {
        resetProgress();
    }
}

function resetProgress() {
    STATE.progress = {
        stages: [false, false, false, false, false],
        quizScores: [0, 0, 0, 0, 0],
        completed: false,
        timeSpent: 0,
    };
    saveProgress();
}

function saveProgress() {
    localStorage.setItem('academyProgress', JSON.stringify(STATE.progress));
    saveFullState();
    updateProgressBar();
    updateDashboard();
    updateStagesMap();
    updateLearningPath(); // تحديث خريطة المسار
}

function updateProgressBar() {
    const completed = STATE.progress.stages.filter(s => s === true).length;
    const total = STATE.progress.stages.length;
    const percent = Math.round((completed / total) * 100);

    const fill = document.getElementById('mainProgress');
    const text = document.getElementById('progressPercent');

    if (fill) {
        fill.style.width = percent + '%';
        fill.setAttribute('aria-valuenow', percent);
    }
    if (text) text.textContent = percent + '%';

    const dashFill = document.getElementById('dashStagesFill');
    if (dashFill) dashFill.style.width = percent + '%';
}

// ================================================================
// 6. التنقل بين المراحل
// ================================================================

function startJourney() {
    goToStage(1);
}

function goToStage(stageNum, skipLockCheck = false) {
    if (!skipLockCheck && stageNum > 1 && !STATE.progress.stages[stageNum - 2]) {
        alert('⚠️ يجب إكمال المرحلة السابقة أولاً!');
        return;
    }

    STATE.currentStage = stageNum;
    saveFullState();

    document.querySelectorAll('.stage-section').forEach(el => {
        el.classList.remove('active');
    });

    if (stageNum === 0) {
        document.getElementById('home').classList.add('active');
        updateLearningPath();
        return;
    }

    const container = document.getElementById('stages-container');
    if (!container) return;
    
    let stageContent = null;
    if (typeof getStageContent === 'function') {
        stageContent = getStageContent(stageNum);
    }
    
    if (stageContent) {
        container.innerHTML = stageContent;
        container.style.display = 'block';
        container.classList.add('active');

        if (typeof initQuiz === 'function') {
            setTimeout(() => initQuiz(stageNum), 100);
        }

        updateStagesMap();
        updateLearningPath(); // تحديث خريطة المسار
    } else {
        console.error('❌ فشل في تحميل محتوى المرحلة:', stageNum);
        container.innerHTML = `
            <div class="stage-content glass">
                <p style="color:red; text-align:center; padding:2rem;">
                    ⚠️ حدث خطأ في تحميل المحتوى. الرجاء المحاولة مرة أخرى.
                </p>
                <div style="text-align:center; margin-top:1rem;">
                    <button class="btn-secondary" onclick="goToStage(0)">🏠 العودة للرئيسية</button>
                </div>
            </div>
        `;
        container.style.display = 'block';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================================================
// 7. تحديث خريطة المراحل (الأفقية)
// ================================================================

function initStagesMap() {
    updateStagesMap();
}

function updateStagesMap() {
    const nodes = document.querySelectorAll('.stage-node');
    nodes.forEach((node) => {
        const stageNum = parseInt(node.dataset.stage);
        const isCompleted = STATE.progress.stages[stageNum - 1] || false;
        const isActive = STATE.currentStage === stageNum;
        const isLocked = stageNum > 1 && !STATE.progress.stages[stageNum - 2];

        node.classList.remove('completed', 'active', 'locked');

        if (isCompleted) node.classList.add('completed');
        else if (isActive) node.classList.add('active');
        else if (isLocked) node.classList.add('locked');
    });

    const allCompleted = STATE.progress.stages.every(s => s === true);
    if (allCompleted && !STATE.progress.completed) {
        STATE.progress.completed = true;
        saveProgress();
        const certSection = document.getElementById('certificate-section');
        if (certSection) certSection.classList.add('active');
    }
}

// ================================================================
// 8. إكمال المرحلة (مع فتح نافذة الشهادة)
// ================================================================

function handleStageComplete(stageNum) {
    console.log('✅ إكمال المرحلة:', stageNum);
    
    // التحقق من اجتياز الاختبار
    const score = STATE.progress.quizScores[stageNum - 1] || 0;
    if (score < 70) {
        alert('⚠️ يجب اجتياز الاختبار بنجاح (70% على الأقل) لإكمال المرحلة!');
        return;
    }
    
    // تسجيل إكمال المرحلة
    STATE.progress.stages[stageNum - 1] = true;
    saveProgress();
    
    // تحديث الواجهة
    updateProgressBar();
    updateStagesMap();
    updateLearningPath();
    
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }
    
    // التحقق: هل هي المرحلة الخامسة؟
    if (stageNum === 5) {
        // ✅ جميع المراحل مكتملة
        STATE.progress.completed = true;
        saveProgress();
        
        // إظهار قسم الشهادة
        const certSection = document.getElementById('certificate-section');
        if (certSection) {
            certSection.classList.add('active');
        }
        
        // التمرير إلى قسم الشهادة
        setTimeout(() => {
            if (certSection) {
                certSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
        
        // ✅ فتح النافذة المنبثقة لطلب الاسم تلقائياً
        setTimeout(() => {
            if (typeof openModal === 'function') {
                openModal();
            } else {
                // إذا لم توجد دالة openModal، استخدم الطريقة المباشرة
                const certBtn = document.querySelector('[data-i18n="cert_request_btn"]');
                if (certBtn) {
                    certBtn.click();
                }
            }
        }, 800);
        
        alert('🎉 تهانينا! لقد أكملت جميع المراحل بنجاح!');
        return;
    }
    
    // الانتقال للمرحلة التالية (إذا لم تكن الخامسة)
    goToStage(stageNum + 1);
}

// ================================================================
// 9. خريطة المسار التعليمي (الجانب الأيسر)
// ================================================================

/**
 * تحديث خريطة المسار بناءً على تقدم المستخدم
 */
function updateLearningPath() {
    const nodes = document.querySelectorAll('.path-node');
    const progress = document.getElementById('pathProgress');
    
    let completedCount = 0;
    const total = nodes.length;
    
    nodes.forEach((node) => {
        const stageNum = parseInt(node.dataset.stage);
        const isCompleted = STATE.progress.stages[stageNum - 1] || false;
        const isActive = STATE.currentStage === stageNum;
        const isLocked = stageNum > 1 && !STATE.progress.stages[stageNum - 2];
        
        node.classList.remove('completed', 'active', 'locked');
        
        if (isCompleted) {
            node.classList.add('completed');
            completedCount++;
        } else if (isActive) {
            node.classList.add('active');
        } else if (isLocked) {
            node.classList.add('locked');
        }
        
        // تحديث الخط الواصل
        const line = node.nextElementSibling;
        if (line && line.classList.contains('path-line')) {
            if (isCompleted) {
                line.classList.add('completed');
            } else {
                line.classList.remove('completed');
            }
        }
    });
    
    if (progress) {
        const percent = Math.round((completedCount / total) * 100);
        progress.textContent = percent + '%';
    }
}

/**
 * التنقل إلى مرحلة معينة عبر خريطة المسار
 */
function navigateToStage(stageNum) {
    if (stageNum > 1 && !STATE.progress.stages[stageNum - 2]) {
        const node = document.querySelector(`.path-node[data-stage="${stageNum}"]`);
        if (node) {
            node.style.animation = 'errorShake 0.4s ease';
            setTimeout(() => {
                node.style.animation = '';
            }, 500);
        }
        return;
    }
    
    if (typeof goToStage === 'function') {
        goToStage(stageNum);
    }
}

// ================================================================
// 10. تصدير الوظائف العامة
// ================================================================

window.STATE = STATE;
window.startJourney = startJourney;
window.goToStage = goToStage;
window.handleStageComplete = handleStageComplete;
window.updateProgressBar = updateProgressBar;
window.saveProgress = saveProgress;
window.saveFullState = saveFullState;
window.loadFullState = loadFullState;
window.updateLearningPath = updateLearningPath;
window.navigateToStage = navigateToStage;

console.log('✅ main.js تم تحميله بنجاح (الإصدار 2.1.0)');