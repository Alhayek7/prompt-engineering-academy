/**
 * ================================================================
 * نظام الترجمة (i18n)
 * ================================================================
 */

const CONTENT = {
    ar: {
        hero_title: '🚀 أتقن فن هندسة الأوامر',
        hero_subtitle: 'تعلم كيفية صياغة الأوامر المثالية لنماذج الذكاء الاصطناعي',
        stages: 'مراحل',
        exercises: 'تمرين',
        quizzes: 'اختبار',
        start_btn: '🚀 ابدأ الرحلة',
        progress: 'التقدم',
        stage1: 'الأساسيات',
        stage2: 'التفاصيل',
        stage3: 'المتقدّم',
        stage4: 'التفاعلي',
        stage5: 'الاحتراف',
        token_title: '🧮 حاسبة التوكنز',
        token_sub: 'تعرف على عدد التوكنز التي يستهلكها نصك',
        token_calc_btn: '🔢 احسب التوكنز',
        token_count: 'عدد التوكنز',
        word_count: 'عدد الكلمات',
        char_count: 'عدد الأحرف',
        token_cost: 'التكلفة التقريبية',
        token_tips_title: '💡 نصائح لتقليل التوكنز:',
        token_tip1: 'استخدم كلمات مختصرة بدل الجمل الطويلة',
        token_tip2: 'أزل التكرار غير الضروري',
        token_tip3: 'ضع الأهم في البداية والنهاية',
        dashboard_title: '📊 لوحة التحكم',
        dashboard_sub: 'تابع تقدمك وإحصائياتك',
        stages_completed: 'المراحل المكتملة',
        avg_score: 'متوسط الدرجات',
        quizzes_passed: 'الاختبارات المجتازة',
        total_time: 'الوقت المستغرق',
        stage_performance: 'أداء المراحل',
        recommendations: '📌 توصيات للتحسين',
        rec_default: 'أكمل جميع المراحل للحصول على توصيات مخصصة',
        cert_title: '🎓 شهادة الإنجاز',
        cert_sub: 'تهانينا! لقد أكملت جميع المراحل بنجاح',
        cert_request_btn: '📜 طلب الشهادة',
        cert_share_btn: '🔗 مشاركة على لينكدإن',
        cert_download_btn: '⬇️ تحميل PDF',
        footer_text: 'أكاديمية هندسة الأوامر - م/ أحمد الحايك',
        footer_rights: 'جميع الحقوق محفوظة',
        // في القسم العربي
cert_download_png: '🖼️ تحميل PNG',
cert_download_pdf: '📄 تحميل PDF',

// في القسم الإنجليزي
cert_download_png: '🖼️ Download PNG',
cert_download_pdf: '📄 Download PDF',
    },
    en: {
        hero_title: '🚀 Master Prompt Engineering',
        hero_subtitle: 'Learn how to craft perfect prompts for AI models',
        stages: 'Stages',
        exercises: 'Exercises',
        quizzes: 'Quizzes',
        start_btn: '🚀 Start Journey',
        progress: 'Progress',
        stage1: 'Basics',
        stage2: 'Details',
        stage3: 'Advanced',
        stage4: 'Interactive',
        stage5: 'Professional',
        token_title: '🧮 Token Calculator',
        token_sub: 'Discover how many tokens your text consumes',
        token_calc_btn: '🔢 Calculate Tokens',
        token_count: 'Token Count',
        word_count: 'Word Count',
        char_count: 'Character Count',
        token_cost: 'Estimated Cost',
        token_tips_title: '💡 Tips to reduce tokens:',
        token_tip1: 'Use concise words instead of long sentences',
        token_tip2: 'Remove unnecessary repetition',
        token_tip3: 'Place the most important content at the beginning and end',
        dashboard_title: '📊 Dashboard',
        dashboard_sub: 'Track your progress and statistics',
        stages_completed: 'Stages Completed',
        avg_score: 'Average Score',
        quizzes_passed: 'Quizzes Passed',
        total_time: 'Time Spent',
        stage_performance: 'Stage Performance',
        recommendations: '📌 Recommendations',
        rec_default: 'Complete all stages to get personalized recommendations',
        cert_title: '🎓 Certificate of Completion',
        cert_sub: 'Congratulations! You have completed all stages successfully',
        cert_request_btn: '📜 Request Certificate',
        cert_share_btn: '🔗 Share on LinkedIn',
        cert_download_btn: '⬇️ Download PDF',
        footer_text: 'Prompt Engineering Academy - Eng. Ahmed Al-Hayek',
        footer_rights: 'All Rights Reserved',
    }
};

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.dataset.i18n;
        if (CONTENT[lang] && CONTENT[lang][key]) {
            el.textContent = CONTENT[lang][key];
        }
    });
}

function getStageData(stageNum) {
    // سيتم توسيعه لاحقاً مع ملفات البيانات
    return null;
}

window.updateContent = updateContent;
window.getStageData = getStageData;