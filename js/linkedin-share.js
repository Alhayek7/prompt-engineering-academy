/**
 * ================================================================
 * مشاركة التقدم على لينكدإن
 * ================================================================
 */

function shareLinkedIn() {
    const userName = STATE.userName || 'متعلم في أكاديمية هندسة الأوامر';

    const completed = STATE.progress.stages.filter(s => s === true).length;

    const scores = STATE.progress.quizScores;
    const total = scores.reduce((a, b) => a + b, 0);
    const maxPossible = scores.length * 100;
    const percentage = maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;

    const today = new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // بناء نص المنشور
    const postText = `
🎓 أنا سعيد بمشاركتكم أنني أكملت برنامج "هندسة الأوامر" في أكاديمية هندسة الأوامر!

📊 إنجازاتي:
- ✅ أكملت ${completed}/5 مراحل
- ✅ نسبة الإنجاز: ${percentage}%
- 📅 تاريخ الإكمال: ${today}

💡 المهارات التي اكتسبتها:
• صياغة أوامر احترافية لنماذج الذكاء الاصطناعي
• تقنيات CoT و Few-shot
• التحكم في المخرجات وتحليل التوكنز
• بناء قوالب شخصية ومطالبات آمنة

🙏 شكراً للمدرب م/ أحمد الحايك على هذه الرحلة التعليمية المميزة.

🚀 أوصي بشدة كل مهتم بالذكاء الاصطناعي وتطوير الذات بالانضمام إلى هذه الأكاديمية!

#هندسة_الأوامر #PromptEngineering #الذكاء_الاصطناعي #تطوير_ذاتي #AlhayekAcademy
    `;

    // رابط الموقع (يجب تغييره بعد النشر)
    const url = 'https://your-site.com';

    // بناء رابط لينكدإن
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(postText)}`;

    // فتح النافذة
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
}

// تصدير الدالة
window.shareLinkedIn = shareLinkedIn;