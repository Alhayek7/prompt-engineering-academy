/**
 * ================================================================
 * لوحة التحكم - Dashboard
 * ================================================================
 */

function updateDashboard() {
    const stagesCompleted = STATE.progress.stages.filter(s => s === true).length;
    const totalStages = STATE.progress.stages.length;

    // تحديث المراحل المكتملة
    const stagesEl = document.getElementById('dashStages');
    if (stagesEl) stagesEl.textContent = `${stagesCompleted}/${totalStages}`;

    // تحديث متوسط الدرجات
    const scores = STATE.progress.quizScores;
    const total = scores.reduce((a, b) => a + b, 0);
    const maxPossible = scores.length * 100;
    const avg = maxPossible > 0 ? Math.round((total / scores.length)) : 0;
    const avgEl = document.getElementById('dashAvgScore');
    if (avgEl) avgEl.textContent = avg + '%';

    // تحديث الاختبارات المجتازة
    const passed = scores.filter(s => s >= 70).length;
    const passedEl = document.getElementById('dashQuizzes');
    if (passedEl) passedEl.textContent = `${passed}/${scores.length}`;

    // تحديث الوقت المستغرق (تقديري)
    const timeEl = document.getElementById('dashTime');
    if (timeEl) {
        const minutes = STATE.progress.timeSpent || Math.floor(stagesCompleted * 8);
        timeEl.textContent = `${minutes} دق`;
    }

    // تحديث أداء المراحل (رسوم بيانية بسيطة)
    updateStagePerformance(scores);
}

function updateStagePerformance(scores) {
    const container = document.getElementById('stagePerformanceChart');
    if (!container) return;

    if (scores.every(s => s === 0)) {
        container.innerHTML = `<p style="color:var(--color-text-dim);">📊 أكمل الاختبارات لعرض أدائك</p>`;
        return;
    }

    const stageNames = ['الأساسيات', 'التفاصيل', 'المتقدّم', 'التفاعلي', 'الاحتراف'];

    let html = '<div style="display:flex;flex-direction:column;gap:0.5rem;">';
    scores.forEach((score, i) => {
        const percent = Math.min(100, score);
        const color = percent >= 80 ? 'var(--color-lighter-blue)' :
            percent >= 50 ? 'var(--color-light-blue)' :
            'var(--color-text-dim)';
        html += `
            <div style="display:flex;align-items:center;gap:1rem;">
                <span style="min-width:80px;font-size:0.8rem;color:var(--color-text-dim);">${stageNames[i]}</span>
                <div style="flex:1;height:8px;background:rgba(255,255,255,0.05);border-radius:10px;overflow:hidden;">
                    <div style="width:${percent}%;height:100%;background:${color};border-radius:10px;transition:width 0.8s ease;"></div>
                </div>
                <span style="font-family:var(--font-mono);font-size:0.8rem;color:${color};min-width:40px;text-align:right;">${percent}%</span>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

// تصدير الدالة
window.updateDashboard = updateDashboard;