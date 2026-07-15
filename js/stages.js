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
    title: '📖 الأساسيات - Fundamentals',
    description: 'تعلم أساسيات صياغة الأوامر: الوضوح، تحديد الهدف، الجمهور، والسياق.',
    body: `
        <!-- ===== شريط التقدم داخل المرحلة ===== -->
        <div class="stage-progress-bar">
            <div class="stage-progress-step active">
                <span class="step-number">1</span>
                <span class="step-label">الوضوح</span>
            </div>
            <div class="stage-progress-line"></div>
            <div class="stage-progress-step">
                <span class="step-number">2</span>
                <span class="step-label">الهدف</span>
            </div>
            <div class="stage-progress-line"></div>
            <div class="stage-progress-step">
                <span class="step-number">3</span>
                <span class="step-label">الجمهور</span>
            </div>
            <div class="stage-progress-line"></div>
            <div class="stage-progress-step">
                <span class="step-number">4</span>
                <span class="step-label">السياق</span>
            </div>
        </div>

        <!-- ===== مقدمة المرحلة ===== -->
        <div class="stage-intro">
            <div class="stage-intro-icon">🎯</div>
            <h3>مرحباً بك في رحلة تعلم هندسة الأوامر!</h3>
            <p>
                في هذه المرحلة، ستتعلم <strong>الأساسيات</strong> التي تحتاجها لصياغة أوامر فعالة لنماذج الذكاء الاصطناعي. 
                سنغطي العناصر الأربعة الرئيسية للأمر الجيد: <strong>الوضوح، الهدف، الجمهور، والسياق</strong>.
            </p>
            <div class="stage-intro-stats">
                <div class="intro-stat">
                    <span class="intro-stat-number">4</span>
                    <span class="intro-stat-label">عناصر رئيسية</span>
                </div>
                <div class="intro-stat">
                    <span class="intro-stat-number">3</span>
                    <span class="intro-stat-label">أسئلة اختبار</span>
                </div>
                <div class="intro-stat">
                    <span class="intro-stat-number">70%</span>
                    <span class="intro-stat-label">نسبة النجاح</span>
                </div>
            </div>
        </div>

        <!-- ===== العنصر الأول: الوضوح ===== -->
        <div class="stage-concept" id="concept-clarity">
            <div class="concept-header">
                <span class="concept-number">1</span>
                <h4>🔍 الوضوح (Clarity)</h4>
                <span class="concept-badge">الأهم</span>
            </div>
            <p>استخدم لغة <strong>مباشرة ومحددة</strong>، وتجنب الغموض. كلما كان سؤالك أو أمرك واضحاً، كانت الإجابة أدق.</p>
            
            <div class="example-box compare interactive" onclick="toggleCompare(this)">
                <div class="compare-item bad">
                    <span class="compare-label">❌ ضعيف</span>
                    <p>"اكتب لي شيئاً عن التكنولوجيا"</p>
                </div>
                <div class="compare-arrow">→</div>
                <div class="compare-item good">
                    <span class="compare-label">✅ قوي</span>
                    <p>"اكتب مقالاً من 200 كلمة عن الذكاء الاصطناعي في الطب، موجه لطلاب الطب، بلغة عربية مبسطة"</p>
                </div>
            </div>
            
            <div class="tip-box">
                <span class="tip-icon">💡</span>
                <div>
                    <p><strong>نصيحة ذهبية:</strong></p>
                    <p>تخيل أنك تتحدث إلى شخص لا يعرف شيئاً عن الموضوع. قدم تفاصيل كافية لي فهم ما تريد بالضبط.</p>
                </div>
            </div>

            <!-- عنصر تفاعلي: اختر الإجابة الصحيحة -->
            <div class="interactive-quiz mini">
                <p class="mini-quiz-question">❓ أي من هذه الجمل أكثر وضوحاً؟</p>
                <div class="mini-options">
                    <button class="mini-option" onclick="checkMiniQuiz(this, false)">
                        "اكتب لي عن الذكاء الاصطناعي"
                    </button>
                    <button class="mini-option" onclick="checkMiniQuiz(this, true)">
                        "اكتب مقالاً من 300 كلمة عن تطبيقات الذكاء الاصطناعي في التعليم، موجه لمعلمي المرحلة الثانوية"
                    </button>
                </div>
                <div class="mini-feedback" style="display:none;"></div>
            </div>
        </div>

        <!-- ===== العنصر الثاني: الهدف ===== -->
        <div class="stage-concept" id="concept-goal">
            <div class="concept-header">
                <span class="concept-number">2</span>
                <h4>🎯 الهدف (Goal)</h4>
            </div>
            <p>حدد <strong>ما تريده بوضوح</strong> من النموذج. هل تريد شرحاً؟ قائمة؟ تحليلاً؟ مقارنة؟</p>
            
            <div class="example-box">
                <p><strong>✏️ أمثلة على أهداف مختلفة:</strong></p>
                <div class="goal-grid">
                    <div class="goal-card">
                        <span class="goal-icon">📖</span>
                        <h5>شرح</h5>
                        <p>"اشرح لي مفهوم الذكاء الاصطناعي بعبارات بسيطة"</p>
                    </div>
                    <div class="goal-card">
                        <span class="goal-icon">📋</span>
                        <h5>قائمة</h5>
                        <p>"أعطني قائمة بأفضل 5 لغات برمجة للمبتدئين"</p>
                    </div>
                    <div class="goal-card">
                        <span class="goal-icon">📊</span>
                        <h5>تحليل</h5>
                        <p>"حلل إيجابيات وسلبيات العمل عن بُعد"</p>
                    </div>
                    <div class="goal-card">
                        <span class="goal-icon">⚖️</span>
                        <h5>مقارنة</h5>
                        <p>"قارن بين التعلم التقليدي والتعلم الذاتي"</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== العنصر الثالث: الجمهور ===== -->
        <div class="stage-concept" id="concept-audience">
            <div class="concept-header">
                <span class="concept-number">3</span>
                <h4>👥 الجمهور (Audience)</h4>
            </div>
            <p>من سيقرأ أو يستخدم المخرجات؟ <strong>تحديد الجمهور</strong> يساعد النموذج في اختيار النغمة والمحتوى المناسب.</p>
            
            <div class="audience-grid">
                <div class="audience-card" onclick="this.classList.toggle('selected')">
                    <span class="audience-icon">👶</span>
                    <h5>مبتدئ</h5>
                    <p>لغة بسيطة، أمثلة عملية، شرح أساسي</p>
                    <span class="audience-tag">للنقر</span>
                </div>
                <div class="audience-card" onclick="this.classList.toggle('selected')">
                    <span class="audience-icon">🧑‍💻</span>
                    <h5>متخصص</h5>
                    <p>مصطلحات تقنية، تحليل عميق، تفاصيل دقيقة</p>
                    <span class="audience-tag">للنقر</span>
                </div>
                <div class="audience-card" onclick="this.classList.toggle('selected')">
                    <span class="audience-icon">👔</span>
                    <h5>مدير تنفيذي</h5>
                    <p>لغة رسمية، ملخص تنفيذي، توصيات واضحة</p>
                    <span class="audience-tag">للنقر</span>
                </div>
            </div>
        </div>

        <!-- ===== العنصر الرابع: السياق ===== -->
        <div class="stage-concept" id="concept-context">
            <div class="concept-header">
                <span class="concept-number">4</span>
                <h4>🌐 السياق (Context)</h4>
            </div>
            <p>قدم <strong>خلفية كافية</strong> عن الموضوع. السياق يساعد النموذج على فهم ما تتحدث عنه ويقلل من التخمينات.</p>
            
            <div class="example-box compare-context">
                <div class="context-item bad">
                    <span class="context-label">❌ بدون سياق</span>
                    <p>"اكتب لي عن التسويق"</p>
                </div>
                <div class="context-arrow">↓</div>
                <div class="context-item good">
                    <span class="context-label">✅ مع سياق</span>
                    <p>"اكتب لي عن التسويق الرقمي في مجال التعليم، مع التركيز على وسائل التواصل الاجتماعي، واستهدف الشركات الناشئة الصغيرة"</p>
                </div>
            </div>
        </div>

        <!-- ===== ملخص المرحلة ===== -->
        <div class="stage-summary">
            <h4>📌 ملخص المرحلة الأولى</h4>
            <div class="summary-grid">
                <div class="summary-item">
                    <span class="summary-icon">🔍</span>
                    <span>الوضوح: كن محدداً</span>
                </div>
                <div class="summary-item">
                    <span class="summary-icon">🎯</span>
                    <span>الهدف: حدد ما تريد</span>
                </div>
                <div class="summary-item">
                    <span class="summary-icon">👥</span>
                    <span>الجمهور: اختر النغمة المناسبة</span>
                </div>
                <div class="summary-item">
                    <span class="summary-icon">🌐</span>
                    <span>السياق: قدم خلفية كافية</span>
                </div>
            </div>
            <div class="golden-rule">
                <span>🏆</span>
                <div>
                    <p><strong>القاعدة الذهبية:</strong></p>
                    <p>"كلما زادت التفاصيل التي تقدمها، قلّت التخمينات التي يقوم بها النموذج، وزادت دقة النتيجة."</p>
                </div>
            </div>
        </div>

        <!-- ===== تمرين تفاعلي ===== -->
        <div class="stage-exercise" id="stageExercise">
            <h4>✍️ تمرين عملي</h4>
            <p>حاول تحسين الأمر التالي بإضافة الوضوح، الهدف، الجمهور، والسياق:</p>
            <div class="exercise-box">
                <p class="exercise-prompt">❌ "اكتب لي عن الذكاء الاصطناعي"</p>
                <button class="btn-exercise" onclick="toggleExerciseHint()">💡 اعرض التلميح</button>
                <div id="exerciseHint" style="display:none; margin-top: 1rem; padding: 1rem; background: rgba(37,83,138,0.05); border-radius: 8px; border-right: 3px solid #25538A;">
                    <p><strong>💡 التلميح:</strong> فكر في:</p>
                    <ul>
                        <li><strong>الوضوح:</strong> أي جانب من الذكاء الاصطناعي؟ (مثل: التعليم، الطب، الأعمال)</li>
                        <li><strong>الهدف:</strong> هل تريد شرحاً، تحليلاً، أم قائمة؟</li>
                        <li><strong>الجمهور:</strong> من سيقرأ هذا؟ (مثل: طلاب، معلمين، مبتدئين)</li>
                        <li><strong>السياق:</strong> ما هي الخلفية المطلوبة؟</li>
                    </ul>
                    <div style="margin-top: 0.8rem; padding: 0.8rem; background: rgba(37,83,138,0.05); border-radius: 6px;">
                        <p style="font-weight:600;color:#25538A;">✅ مثال مقترح:</p>
                        <p>"اكتب مقالاً من 300 كلمة عن تطبيقات الذكاء الاصطناعي في التعليم، موجه لمعلمي المدارس الثانوية، مع أمثلة عملية من الواقع."</p>
                    </div>
                </div>
            </div>
        </div>
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

// ================================================================
// دوال التفاعل للمرحلة الأولى
// ================================================================

/**
 * تبديل عرض المقارنة (للعناصر التفاعلية)
 */
function toggleCompare(element) {
    element.classList.toggle('expanded');
}

/**
 * اختبار مصغر (Mini Quiz)
 */
function checkMiniQuiz(button, isCorrect) {
    const container = button.closest('.interactive-quiz.mini');
    const feedback = container.querySelector('.mini-feedback');
    const allOptions = container.querySelectorAll('.mini-option');
    
    // تعطيل جميع الأزرار
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
    });
    
    // تمييز الإجابة
    if (isCorrect) {
        button.classList.add('correct');
        feedback.style.display = 'block';
        feedback.className = 'mini-feedback success';
        feedback.textContent = '✅ إجابة صحيحة! الجملة الثانية أكثر وضوحاً وتحديداً.';
    } else {
        button.classList.add('wrong');
        feedback.style.display = 'block';
        feedback.className = 'mini-feedback error';
        feedback.textContent = '❌ ليس تماماً. الجملة الثانية أكثر وضوحاً لأنها تحدد الموضوع، الطول، الجمهور، والمجال.';
        
        // إظهار الإجابة الصحيحة
        allOptions.forEach(opt => {
            if (opt !== button && opt.textContent.includes('300 كلمة')) {
                opt.classList.add('correct');
            }
        });
    }
}

/**
 * تبديل عرض تلميح التمرين
 */
function toggleExerciseHint() {
    const hint = document.getElementById('exerciseHint');
    if (hint) {
        if (hint.style.display === 'none') {
            hint.style.display = 'block';
            hint.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            hint.style.display = 'none';
        }
    }
}

// ================================================================
// تصدير الدوال
// ================================================================

window.toggleCompare = toggleCompare;
window.checkMiniQuiz = checkMiniQuiz;
window.toggleExerciseHint = toggleExerciseHint;

console.log('✅ دوال التفاعل للمرحلة الأولى تم تحميلها');
