/**
 * ================================================================
 * إدارة التقدم - Progress Management
 * ================================================================
 */

// ================================================================
// 1. حفظ واسترجاع التقدم
// ================================================================

function loadProgress() {
    const saved = localStorage.getItem('academyProgress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            STATE.progress = data;
            return true;
        } catch (e) {
            console.warn('⚠️ خطأ في تحميل التقدم:', e);
            resetProgress();
            return false;
        }
    }
    resetProgress();
    return false;
}

function resetProgress() {
    STATE.progress = {
        stages: [false, false, false, false, false],
        quizScores: [0, 0, 0, 0, 0],
        completed: false,
        timeSpent: 0,
        startTime: Date.now(),
    };
    saveProgress();
}

function saveProgress() {
    try {
        localStorage.setItem('academyProgress', JSON.stringify(STATE.progress));
        return true;
    } catch (e) {
        console.warn('⚠️ فشل في حفظ التقدم:', e);
        return false;
    }
}

// ================================================================
// 2. تحديث الوقت المستغرق
// ================================================================

function updateTimeSpent() {
    if (STATE.progress.startTime) {
        const elapsed = Math.floor((Date.now() - STATE.progress.startTime) / 60000);
        STATE.progress.timeSpent = elapsed;
        saveProgress();
    }
}

// ================================================================
// 3. تصدير الدوال العامة
// ================================================================

window.loadProgress = loadProgress;
window.resetProgress = resetProgress;
window.saveProgress = saveProgress;
window.updateTimeSpent = updateTimeSpent;