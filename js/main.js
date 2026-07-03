/**
 * ================================================================
 * الملف الرئيسي - أكاديمية هندسة الأوامر
 * Prompt Engineering Academy
 * 
 * @author Eng. Ahmed Al-Hayek
 * @version 1.0.0
 * ================================================================
 */

// ================================================================
// 1. متغيرات عامة
// ================================================================
const STATE = {
    currentStage: 0, // 0 = home, 1-5 = stages
    progress: {
        stages: [], // [true, false, ...]
        quizScores: [], // [0, 0, ...]
        completed: false,
        timeSpent: 0, // بالدقائق
    },
    language: 'ar',
    userName: '',
};

// ================================================================
// 2. تهيئة الموقع
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    // تحميل البيانات المحفوظة
    loadProgress();

    // تهيئة اللغة
    initLanguage();

    // تحديث شريط التقدم
    updateProgressBar();

    // تهيئة خريطة المراحل
    initStagesMap();

    // تحديث لوحة التحكم
    updateDashboard();

    // عرض السنة في التذييل
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    console.log('🚀 أكاديمية هندسة الأوامر جاهزة!');
});

// ================================================================
// 3. إدارة اللغة
// ================================================================
function initLanguage() {
    const lang = localStorage.getItem('preferredLanguage') || 'ar';
    setLanguage(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('preferredLanguage', lang);
        });
    });
}

function setLanguage(lang) {
    STATE.language = lang;

    // تحديث الأزرار
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // تحديث المحتوى (يتم عبر i18n.js)
    if (typeof updateContent === 'function') {
        updateContent(lang);
    }

    // تحديث اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
}

// ================================================================
// 4. إدارة التقدم
// ================================================================
function loadProgress() {
    const saved = localStorage.getItem('academyProgress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            STATE.progress = data;
        } catch (e) {
            console.warn('خطأ في تحميل التقدم، سيتم إعادة تعيينه');
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
    updateProgressBar();
    updateDashboard();
    updateStagesMap();
}

function updateProgressBar() {
    const completed = STATE.progress.stages.filter(s => s === true).length;
    const total = STATE.progress.stages.length;
    const percent = Math.round((completed / total) * 100);

    const fill = document.getElementById('mainProgress');
    const text = document.getElementById('progressPercent');

    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = percent + '%';

    // تحديث شريط التقدم في لوحة التحكم
    const dashFill = document.getElementById('dashStagesFill');
    if (dashFill) dashFill.style.width = percent + '%';
}

// ================================================================
// 5. التنقل بين المراحل
// ================================================================
function startJourney() {
    goToStage(1);
}

function goToStage(stageNum) {
    // التحقق من إكمال المرحلة السابقة
    if (stageNum > 1 && !STATE.progress.stages[stageNum - 2]) {
        alert('⚠️ يجب إكمال المرحلة السابقة أولاً!');
        return;
    }

    STATE.currentStage = stageNum;

    // إخفاء جميع الأقسام
    document.querySelectorAll('.stage-section').forEach(el => {
        el.classList.remove('active');
    });

    // عرض الصفحة الرئيسية أو المرحلة المطلوبة
    if (stageNum === 0) {
        document.getElementById('home').classList.add('active');
        return;
    }

    // عرض المرحلة
    const container = document.getElementById('stages-container');
    const stageContent = getStageContent(stageNum);

    if (stageContent) {
        container.innerHTML = stageContent;
        container.style.display = 'block';
        container.classList.add('active');

        // تهيئة الاختبارات
        if (typeof initQuiz === 'function') {
            initQuiz(stageNum);
        }

        // تحديث الخريطة
        updateStagesMap();
    }

    // تمرير إلى الأعلى
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ملاحظة: getStageContent() و renderStage() الفعليتين معرّفتين في js/stages.js
// (تم حذف نسخة مكررة كانت هنا تكتب فوق النسخة الصحيحة وتُرجع null دائمًا
// لأنها كانت تعتمد على getStageData() غير المكتملة في i18n.js)

// ================================================================
// 6. تحديث خريطة المراحل
// ================================================================
function initStagesMap() {
    updateStagesMap();
}

function updateStagesMap() {
    const nodes = document.querySelectorAll('.stage-node');
    nodes.forEach((node, index) => {
        const stageNum = parseInt(node.dataset.stage);
        const isCompleted = STATE.progress.stages[stageNum - 1] || false;
        const isActive = STATE.currentStage === stageNum;

        node.classList.remove('completed', 'active', 'locked');

        if (isCompleted) {
            node.classList.add('completed');
        } else if (isActive) {
            node.classList.add('active');
        } else if (stageNum > 1 && !STATE.progress.stages[stageNum - 2]) {
            node.classList.add('locked');
        }
    });

    // تحديث حالة الإكمال الكلي
    const allCompleted = STATE.progress.stages.every(s => s === true);
    if (allCompleted && !STATE.progress.completed) {
        STATE.progress.completed = true;
        saveProgress();
        document.getElementById('certificate-section').classList.add('active');
    }
}

// ================================================================
// 7. تصدير الوظائف العامة
// ================================================================
window.startJourney = startJourney;
window.goToStage = goToStage;
window.updateProgressBar = updateProgressBar;
window.saveProgress = saveProgress;