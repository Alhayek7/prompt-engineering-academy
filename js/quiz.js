/**
 * ================================================================
 * نظام الاختبارات - Quiz System (نسخة ديناميكية محسنة)
 * ================================================================
 */

// ================================================================
// 1. بيانات الأسئلة
// ================================================================

const QUIZ_DATA = {
    ar: {
        1: {
            questions: [
                {
                    question: 'ما هو العنصر الأساسي في الأمر الجيد؟',
                    options: ['الوضوح', 'الطول', 'اللون', 'الصوت'],
                    correct: 0,
                },
                {
                    question: 'أي من التالي يُعتبر أمراً قوياً؟',
                    options: [
                        '"اكتب شيئاً عن الذكاء الاصطناعي"',
                        '"اكتب مقالاً عن الذكاء الاصطناعي"',
                        '"اكتب مقالاً من 300 كلمة عن الذكاء الاصطناعي في الطب، موجه للأطباء"',
                        '"اكتب مقالاً طويلاً"',
                    ],
                    correct: 2,
                },
                {
                    question: 'ما هي أهمية تحديد الجمهور في الأمر؟',
                    options: [
                        'تجعل النموذج أسرع',
                        'تحدد النغمة والمحتوى المناسب',
                        'تجعل النموذج أكثر إبداعاً',
                        'لا أهمية لها',
                    ],
                    correct: 1,
                },
            ],
            passingScore: 70,
            stageName: 'الأساسيات',
        },
        2: {
            questions: [
                {
                    question: 'ماذا نعني بـ "المحظورات" في الأمر؟',
                    options: [
                        'ما يجب أن يفعله النموذج',
                        'ما يجب أن يتجنبه النموذج',
                        'طول النص المطلوب',
                        'لغة النص',
                    ],
                    correct: 1,
                },
                {
                    question: 'أي مما يلي يحدد نغمة النص؟',
                    options: ['الطول', 'الجمهور', 'النغمة المحددة', 'التنسيق'],
                    correct: 2,
                },
                {
                    question: 'عندما تطلب "على شكل نقاط"، فإنك تحدد:',
                    options: ['الطول', 'النغمة', 'التنسيق', 'المحظورات'],
                    correct: 2,
                },
                {
                    question: 'ما الفرق بين الأمر الجيد والسيئ؟',
                    options: [
                        'الأمر الجيد أطول',
                        'الأمر الجيد أكثر تحديداً وتفصيلاً',
                        'الأمر الجيد يستخدم كلمات أكبر',
                        'لا فرق',
                    ],
                    correct: 1,
                },
            ],
            passingScore: 70,
            stageName: 'التفاصيل',
        },
        3: {
            questions: [
                {
                    question: 'ماذا تعني تقنية CoT (Chain of Thought)؟',
                    options: [
                        'طلب إجابة مختصرة',
                        'طلب من النموذج توضيح خطوات التفكير',
                        'تقديم أمثلة',
                        'استخدام كلمات مفتاحية',
                    ],
                    correct: 1,
                },
                {
                    question: 'متى تستخدم تقنية Few-shot؟',
                    options: [
                        'عندما تريد إجابة قصيرة',
                        'عندما تريد أن يتعلم النموذج نمطاً معيناً من خلال أمثلة',
                        'عندما تريد إجابة إبداعية',
                        'عندما تريد ترجمة نص',
                    ],
                    correct: 1,
                },
                {
                    question: 'تقسيم المهام المعقدة يساعد في:',
                    options: [
                        'إطالة النص',
                        'الحصول على إجابات دقيقة ومنظمة',
                        'جعل النموذج أبطأ',
                        'تقليل جودة الإجابة',
                    ],
                    correct: 1,
                },
                {
                    question: 'أي من التالي مثال على Few-shot؟',
                    options: [
                        '"اكتب لي مقالاً"',
                        '"مثال 1: مدخل X → مخرج Y، مثال 2: مدخل A → مخرج B، الآن: مدخل Z → ؟"',
                        '"فكر خطوة بخطوة"',
                        '"لا تذكر الأرقام"',
                    ],
                    correct: 1,
                },
                {
                    question: 'ما الهدف من استخدام CoT؟',
                    options: [
                        'تقليل عدد الكلمات',
                        'تحسين دقة الإجابات المنطقية والحسابية',
                        'جعل الإجابة أكثر إبداعاً',
                        'تغيير لغة النموذج',
                    ],
                    correct: 1,
                },
            ],
            passingScore: 70,
            stageName: 'المتقدّم',
        },
        4: {
            questions: [
                {
                    question: 'ما هي قيمة Temperature المناسبة للإجابات الدقيقة؟',
                    options: ['0.0', '0.7', '1.0', '2.0'],
                    correct: 0,
                },
                {
                    question: 'ماذا تفعل المطالبات السلبية؟',
                    options: [
                        'تخبر النموذج بما يجب فعله',
                        'تخبر النموذج بما يجب تجنبه',
                        'تجعل الإجابة أطول',
                        'تضيف ألواناً للنص',
                    ],
                    correct: 1,
                },
                {
                    question: 'ما معنى الحوار المتدرج؟',
                    options: [
                        'طلب كل شيء دفعة واحدة',
                        'بناء الإجابة خطوة بخطوة عبر محادثة',
                        'استخدام جمل قصيرة',
                        'تجاهل ردود النموذج',
                    ],
                    correct: 1,
                },
                {
                    question: 'عندما تطلب من النموذج أن يتصرف كـ "خبير تسويق"، فأنت تستخدم:',
                    options: ['CoT', 'Few-shot', 'الأدوار المتعددة', 'المطالبات السلبية'],
                    correct: 2,
                },
            ],
            passingScore: 70,
            stageName: 'التفاعلي',
        },
        5: {
            questions: [
                {
                    question: 'ما هو الغرض من ملف SKILL.md؟',
                    options: [
                        'تخزين الصور',
                        'تغليف مهارة في ملف يمكن للنموذج قراءته وتنفيذها',
                        'كتابة السيرة الذاتية',
                        'إنشاء صفحة ويب',
                    ],
                    correct: 1,
                },
                {
                    question: 'كيف تحمي مطالباتك من الاختراق؟',
                    options: [
                        'باستخدام كلمات مرور',
                        'بفصل تعليمات النظام عن محتوى المستخدم',
                        'بإخفاء المطالبات',
                        'لا يمكن حمايتها',
                    ],
                    correct: 1,
                },
                {
                    question: 'ما هي أهمية التقييم الذاتي للمخرجات؟',
                    options: [
                        'يجعل النموذج أسرع',
                        'يساعد في تحسين جودة الإجابة قبل تقديمها',
                        'يضيف ألواناً للنص',
                        'لا أهمية له',
                    ],
                    correct: 1,
                },
                {
                    question: 'أي من التالي يُعتبر قالباً شخصياً جيداً؟',
                    options: [
                        '"اكتب لي شيئاً"',
                        'قالب يحتوي على: الدور، السياق، المهمة، المتطلبات، المحظورات',
                        '"أريد مقالاً"',
                        '"ساعدني"',
                    ],
                    correct: 1,
                },
                {
                    question: 'ما هو الهدف النهائي من تعلم هندسة الأوامر؟',
                    options: [
                        'كتابة أوامر أطول',
                        'الحصول على أفضل النتائج من نماذج الذكاء الاصطناعي بكفاءة ودقة',
                        'حفظ الأوامر عن ظهر قلب',
                        'تطوير تطبيقات',
                    ],
                    correct: 1,
                },
            ],
            passingScore: 70,
            stageName: 'الاحتراف',
        },
    },
    en: {
        // النسخة الإنجليزية (يمكن إضافتها لاحقاً)
    },
};

// ================================================================
// 2. تهيئة الاختبار
// ================================================================

function initQuiz(stageNum) {
    const container = document.getElementById(`quizContainer_${stageNum}`);
    if (!container) {
        console.warn('⚠️ حاوية الاختبار غير موجودة للمرحلة:', stageNum);
        return;
    }

    const lang = window.STATE?.language || 'ar';
    const quizData = QUIZ_DATA[lang]?.[stageNum] || QUIZ_DATA.ar[stageNum];

    if (!quizData) {
        container.innerHTML = '<p style="color:var(--color-text-dim);">📝 لا توجد أسئلة لهذه المرحلة</p>';
        return;
    }

    const alreadyPassed = (window.STATE?.progress?.quizScores[stageNum - 1] || 0) >= quizData.passingScore;

    let html = `
        <div class="quiz-header">
            <h3>📝 اختبار المرحلة ${stageNum}</h3>
            <p style="color:var(--color-text-dim);font-size:0.9rem;">
                ${quizData.questions.length} أسئلة • النجاح: ${quizData.passingScore}%
            </p>
        </div>
        <div class="quiz-questions" id="quizQuestions_${stageNum}">
    `;

    quizData.questions.forEach((q, index) => {
        html += `
            <div class="quiz-question">
                <p class="q-text">${index + 1}. ${q.question}</p>
                <div class="quiz-options">
        `;
        q.options.forEach((opt, optIndex) => {
            html += `
                <label>
                    <input type="radio" name="q${stageNum}_${index}" value="${optIndex}" ${alreadyPassed ? 'disabled' : ''} />
                    ${opt}
                </label>
            `;
        });
        html += `</div></div>`;
    });

    html += `
        </div>
        <div style="text-align:center;margin-top:1.5rem;">
            <button class="btn-primary" onclick="submitQuiz(${stageNum})" ${alreadyPassed ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                ${alreadyPassed ? '✅ تم الاجتياز' : '📤 تقديم الاختبار'}
            </button>
        </div>
    `;

    // إذا كان قد اجتاز سابقاً، عرض النتيجة
    if (alreadyPassed) {
        const score = window.STATE.progress.quizScores[stageNum - 1] || 0;
        html += `
            <div class="quiz-result pass" id="quizResult_${stageNum}">
                <p>✅ لقد اجتزت هذا الاختبار بنجاح!</p>
                <p class="score">${score}%</p>
                <p style="font-size:0.85rem;color:var(--color-text-dim);">يمكنك الآن إكمال المرحلة</p>
            </div>
        `;
    } else {
        // إضافة حاوية للنتيجة (ستظهر بعد التقديم)
        html += `<div id="quizResult_${stageNum}"></div>`;
    }

    container.innerHTML = html;
}

// ================================================================
// 3. تقديم الاختبار (ديناميكي)
// ================================================================

function submitQuiz(stageNum) {
    const lang = window.STATE?.language || 'ar';
    const quizData = QUIZ_DATA[lang]?.[stageNum] || QUIZ_DATA.ar[stageNum];

    if (!quizData) return;

    // حساب النتيجة
    let correct = 0;
    const total = quizData.questions.length;

    quizData.questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${stageNum}_${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            correct++;
        }
    });

    const score = Math.round((correct / total) * 100);
    const passed = score >= quizData.passingScore;

    // حفظ النتيجة
    window.STATE.progress.quizScores[stageNum - 1] = score;
    if (typeof saveProgress === 'function') {
        saveProgress();
    }

    // تحديث لوحة التحكم
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }

    // عرض النتيجة في الحاوية المخصصة (استبدال النتيجة السابقة)
    const resultContainer = document.getElementById(`quizResult_${stageNum}`);
    if (!resultContainer) return;

    // بناء رسالة النتيجة
    let resultHTML = '';

    if (passed) {
        resultHTML = `
            <div class="quiz-result pass">
                <p>✅ تهانينا! لقد اجتزت الاختبار بنجاح!</p>
                <p class="score">${score}%</p>
                <p style="font-size:0.85rem;color:var(--color-text-dim);">${correct} من ${total} إجابات صحيحة</p>
                <p style="font-size:0.9rem;color:var(--color-mid-blue);margin-top:0.5rem;">
                    🎉 يمكنك الآن إكمال المرحلة!
                </p>
            </div>
        `;
        
        // تعطيل زر التقديم
        const submitBtn = document.querySelector(`#quizContainer_${stageNum} .btn-primary`);
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.textContent = '✅ تم الاجتياز';
        }
        
        // تحديث خريطة المراحل
        if (typeof updateStagesMap === 'function') {
            updateStagesMap();
        }
        
    } else {
        // رسالة فشل مع توجيه واضح
        resultHTML = `
            <div class="quiz-result fail">
                <p>❌ لم تجتز الاختبار</p>
                <p class="score">${score}%</p>
                <p style="font-size:0.85rem;color:var(--color-text-dim);">${correct} من ${total} إجابات صحيحة</p>
                <div style="margin-top:1rem;padding:1rem;background:rgba(231,76,60,0.05);border-radius:8px;border-right:3px solid #e74c3c;">
                    <p style="font-weight:600;color:#e74c3c;">📖 نصيحة:</p>
                    <p style="font-size:0.9rem;color:var(--color-text-dim);">
                        راجع <strong>${quizData.stageName || 'المرحلة'}</strong> مرة أخرى، ثم حاول مجدداً.
                        تأكد من فهمك للعناصر الأربعة: الوضوح، الهدف، الجمهور، والسياق.
                    </p>
                </div>
                <button class="btn-secondary" onclick="initQuiz(${stageNum})" style="margin-top:1rem;">
                    🔄 إعادة المحاولة
                </button>
            </div>
        `;
    }

    // استبدال المحتوى القديم بالجديد
    resultContainer.innerHTML = resultHTML;
    resultContainer.style.display = 'block';

    // تمرير إلى نتيجة الاختبار
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ================================================================
// 4. تصدير الدوال العامة
// ================================================================

window.QUIZ_DATA = QUIZ_DATA;
window.initQuiz = initQuiz;
window.submitQuiz = submitQuiz;

console.log('✅ quiz.js تم تحميله بنجاح (نسخة ديناميكية محسنة)');