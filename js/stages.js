/**
 * ================================================================
 * نظام المراحل - Stages System
 * ================================================================
 */

// ================================================================
// 1. بيانات المحتوى (ستُدمج مع ملفات JSON لاحقاً)
// ================================================================

const STAGES_DATA = {
    ar: {
        1: {
            number: 1,
            title: '📖 الأساسيات',
            description: 'تعلم أساسيات صياغة الأوامر: الوضوح، تحديد الهدف، الجمهور، والسياق.',
            body: `
                <p>هندسة الأوامر (Prompt Engineering) هي فن صياغة التعليمات لنماذج الذكاء الاصطناعي للحصول على أفضل النتائج الممكنة.</p>
                
                <h4>🎯 العناصر الأساسية للأمر الجيد:</h4>
                <ul>
                    <li><strong>الوضوح:</strong> استخدم لغة مباشرة ومحددة</li>
                    <li><strong>الهدف:</strong> حدد ما تريده بوضوح</li>
                    <li><strong>الجمهور:</strong> من سيقرأ أو يستخدم المخرجات؟</li>
                    <li><strong>السياق:</strong> قدم خلفية كافية عن الموضوع</li>
                </ul>
                
                <div class="example-box">
                    <strong>✏️ مثال:</strong><br />
                    ❌ ضعيف: "اكتب لي شيئاً عن التكنولوجيا"<br />
                    ✅ قوي: "اكتب مقالاً من 200 كلمة عن الذكاء الاصطناعي في الطب، موجه لطلاب الطب، بلغة عربية مبسطة"
                </div>
                
                <h4>💡 نصيحة ذهبية:</h4>
                <p>كلما زادت التفاصيل التي تقدمها، قلّت التخمينات التي يقوم بها النموذج، وزادت دقة النتيجة.</p>
            `
        },
        2: {
            number: 2,
            title: '📝 التوسع بالتفاصيل',
            description: 'تعلم كيفية التحكم في الطول، النغمة، التنسيق، والمحظورات في أوامرك.',
            body: `
                <p>بعد إتقان الأساسيات، حان الوقت لإضافة التفاصيل الدقيقة التي تجعل أوامرك احترافية.</p>
                
                <h4>🎛️ عناصر التحكم الرئيسية:</h4>
                <ul>
                    <li><strong>الطول:</strong> حدد عدد الكلمات أو الصفحات المطلوبة</li>
                    <li><strong>النغمة:</strong> رسمية، ودية، تحفيزية، تقنية، إلخ</li>
                    <li><strong>التنسيق:</strong> نقاط، فقرات، جداول، قوائم مرقمة</li>
                    <li><strong>المحظورات:</strong> أخبر النموذج بما لا تريده صراحة</li>
                </ul>
                
                <div class="example-box">
                    <strong>✏️ مثال متقدم:</strong><br />
                    "اكتب لي خطة تسويقية لمنتج جديد، بطول 300 كلمة، بنغمة تحفيزية، على شكل نقاط رئيسية، ولا تذكر أسماء المنافسين."
                </div>
            `
        },
        3: {
            number: 3,
            title: '⚡ التقنيات المتقدمة',
            description: 'تعلم تقنيات CoT، Few-shot، وتقسيم المهام للحصول على إجابات أذكى.',
            body: `
                <h4>🧠 1. التفكير المتسلسل (Chain of Thought - CoT):</h4>
                <p>اطلب من النموذج أن يوضح خطوات تفكيره قبل الإجابة.</p>
                <div class="example-box">
                    "دعنا نفكر خطوة بخطوة: أولاً... ثانياً... ثالثاً... الآن الإجابة النهائية هي..."
                </div>
                
                <h4>📚 2. التعلم بأمثلة (Few-shot):</h4>
                <p>قدم 2-3 أمثلة على المدخلات والمخرجات التي تريدها.</p>
                <div class="example-box">
                    "مثال 1: المدخل X → المخرجات Y<br />
                     مثال 2: المدخل A → المخرجات B<br />
                     الآن: المدخل Z → ؟"
                </div>
                
                <h4>🧩 3. تقسيم المهام المعقدة:</h4>
                <p>قسّم المهمة الكبيرة إلى خطوات صغيرة.</p>
                <div class="example-box">
                    "أريدك أن: 1. تحلل الجمهور 2. تختار القنوات 3. تكتب الرسالة 4. تلخص كل شيء"
                </div>
            `
        },
        4: {
            number: 4,
            title: '🔄 التفاعلية والتكرار',
            description: 'تعلم كيفية بناء حوار متدرج، التحكم بالإبداع، واستخدام الأدوار المتعددة.',
            body: `
                <h4>💬 1. الحوار المتدرج:</h4>
                <p>لا تطلب كل شيء دفعة واحدة، بل ابنِ الإجابة خطوة بخطوة.</p>
                
                <h4>🎨 2. التحكم بالإبداع (Temperature):</h4>
                <ul>
                    <li><strong>0.0:</strong> دقيق ومتوقع (مناسب للحقائق)</li>
                    <li><strong>0.7:</strong> متوازن (الافتراضي)</li>
                    <li><strong>1.0:</strong> إبداعي ومفاجئ (مناسب للأفكار الجديدة)</li>
                </ul>
                
                <h4>🎭 3. الأدوار المتعددة:</h4>
                <div class="example-box">
                    "أنت الآن تجمع بين 3 خبرات: خبير تسويق، محلل بيانات، وكاتب محتوى. أريد تحليلاً من كل منظور."
                </div>
                
                <h4>🚫 4. المطالبات السلبية:</h4>
                <div class="example-box">
                    "اكتب مقالاً عن التكنولوجيا، ولكن: لا تذكر أسماء شركات، ولا تستخدم مصطلحات معقدة، ولا تتجاوز 150 كلمة."
                </div>
            `
        },
        5: {
            number: 5,
            title: '🏆 الاحتراف والبناء',
            description: 'تعلم بناء القوالب الشخصية، التقييم الذاتي، الأمان، وملفات SKILL.md.',
            body: `
                <h4>📋 1. القوالب الشخصية:</h4>
                <p>أنشئ قالباً ثابتاً تستخدمه لأي مهمة، ثم تملأ الفراغات حسب الحاجة.</p>
                
                <h4>🔍 2. التقييم الذاتي للمخرجات:</h4>
                <p>اطلب من النموذج تقييم إجابته بنفسه قبل تقديمها لك.</p>
                <div class="example-box">
                    "بعد أن تكتب المنشور، قيّمه وفق: هل يحقق الهدف؟ هل النغمة مناسبة؟ كيف يمكن تحسينه؟"
                </div>
                
                <h4>🔒 3. أمان المطالبات:</h4>
                <p>احمِ أوامرك من الاختراق (حقن الأوامر) ولا تضع معلومات حساسة في المطالبة.</p>
                
                <h4>📄 4. ملفات SKILL.md:</h4>
                <p>غلف مهاراتك في ملفات منظمة يمكن لأي نموذج قراءتها وتنفيذها تلقائياً.</p>
                <div class="example-box">
                    <pre style="background:rgba(0,0,0,0.05);padding:1rem;border-radius:8px;font-family:var(--font-mono);font-size:0.8rem;direction:ltr;text-align:left;">
---
name: my-skill
description: وصف المهارة
---
# تعليمات المهارة
## المهمة
...
## الخطوات
1. ...
2. ...
## التنسيق المطلوب
...
                    </pre>
                </div>
            `
        }
    },
    en: {
        // سيتم إضافة الترجمة الإنجليزية هنا
    }
};

// ================================================================
// 2. دوال عرض المراحل
// ================================================================

function renderStage(stageNum) {
    const lang = STATE.language || 'ar';
    const data = STAGES_DATA[lang]?.[stageNum] || STAGES_DATA.ar[stageNum];

    if (!data) return '<p>⚠️ المحتوى غير متوفر</p>';

    return `
        <div class="stage-content glass">
            <div class="stage-header">
                <span class="stage-number">${data.number}</span>
                <h2 class="stage-title">${data.title}</h2>
            </div>
            <p class="stage-description">${data.description}</p>
            <div class="stage-body">
                ${data.body}
            </div>
            <div class="quiz-container" id="quizContainer_${stageNum}">
                <!-- سيتم توليد الاختبار عبر quiz.js -->
            </div>
            <div style="text-align:center;margin-top:2rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                ${stageNum > 1 ? `<button class="btn-secondary" onclick="goToStage(${stageNum - 1})">← السابق</button>` : ''}
                <button class="btn-primary" onclick="handleStageComplete(${stageNum})">
                    ${stageNum < 5 ? '✅ إكمال المرحلة →' : '🎓 طلب الشهادة'}
                </button>
            </div>
        </div>
    `;
}

function getStageContent(stageNum) {
    return renderStage(stageNum);
}

// ================================================================
// 3. إكمال المرحلة
// ================================================================

function handleStageComplete(stageNum) {
    // التحقق من اجتياز الاختبار
    const quizPassed = checkQuizPassed(stageNum);

    if (!quizPassed) {
        alert('⚠️ يجب اجتياز الاختبار بنجاح (70% على الأقل) لإكمال المرحلة!');
        return;
    }

    // تسجيل إكمال المرحلة
    STATE.progress.stages[stageNum - 1] = true;
    saveProgress();

    // تحديث الواجهة
    updateProgressBar();
    updateStagesMap();
    updateDashboard();

    // الانتقال للمرحلة التالية أو عرض الشهادة
    if (stageNum < 5) {
        goToStage(stageNum + 1);
    } else {
        // جميع المراحل مكتملة
        STATE.progress.completed = true;
        saveProgress();
        document.getElementById('certificate-section').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert('🎉 تهانينا! لقد أكملت جميع المراحل بنجاح!');
    }
}

function checkQuizPassed(stageNum) {
    const score = STATE.progress.quizScores[stageNum - 1] || 0;
    return score >= 70;
}

// ================================================================
// 4. تصدير الدوال العامة
// ================================================================

window.getStageContent = getStageContent;
window.handleStageComplete = handleStageComplete;
window.checkQuizPassed = checkQuizPassed;