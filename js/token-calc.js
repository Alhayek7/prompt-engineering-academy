/**
 * ================================================================
 * حاسبة التوكنز - Token Calculator
 * الإصدار: 2.0.0 (مع دعم النافذة المنبثقة)
 * ================================================================
 */

// ================================================================
// 1. دوال الحساب (محاكاة محلية)
// ================================================================

/**
 * حساب عدد التوكنز تقريبياً للنص العربي/الإنجليزي
 * @param {string} text - النص المراد حسابه
 * @returns {object} - النتائج
 */
function estimateTokens(text) {
    if (!text || text.trim().length === 0) {
        return { tokens: 0, words: 0, chars: 0 };
    }

    const trimmed = text.trim();
    const charCount = trimmed.length;

    // عدد الكلمات (تقسيم على المسافات)
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // تقدير التوكنز (متوسط 1.5 توكن للكلمة العربية، 1.3 للإنجليزية)
    // نأخذ متوسط 1.4
    const estimatedTokens = Math.round(wordCount * 1.4);

    // إضافة تعقيد إضافي للرموز والأرقام
    const specialChars = (trimmed.match(/[^a-zA-Z0-9\s\u0600-\u06FF]/g) || []).length;
    const finalTokens = estimatedTokens + Math.round(specialChars * 0.3);

    return {
        tokens: Math.max(1, finalTokens),
        words: wordCount,
        chars: charCount,
    };
}

/**
 * تقدير التكلفة بناءً على النموذج
 * @param {number} tokens - عدد التوكنز
 * @param {string} model - اسم النموذج
 * @returns {string} - التكلفة التقريبية
 */
function estimateCost(tokens, model = 'gemini') {
    const rates = {
        gemini: 0.0001, // $0.0001 لكل 1000 توكن
        gpt4: 0.0005,
        claude: 0.0004,
    };

    const rate = rates[model] || rates.gemini;
    const cost = (tokens / 1000) * rate;

    return '$' + cost.toFixed(5);
}

// ================================================================
// 2. الواجهة التفاعلية (الصفحة الرئيسية)
// ================================================================

function calculateTokens() {
    const input = document.getElementById('tokenInput');
    const resultsDiv = document.getElementById('tokenResults');

    if (!input || !resultsDiv) return;

    const text = input.value;

    if (!text || text.trim().length === 0) {
        alert('⚠️ الرجاء إدخال النص أولاً!');
        return;
    }

    const result = estimateTokens(text);

    // عرض النتائج
    document.getElementById('tokenCount').textContent = result.tokens;
    document.getElementById('wordCount').textContent = result.words;
    document.getElementById('charCount').textContent = result.chars;
    document.getElementById('tokenCost').textContent = estimateCost(result.tokens);

    // عرض نصائح مخصصة
    showCustomTips(result, 'tokenTipsList');

    resultsDiv.style.display = 'block';

    // تأثير تحريك بسيط
    resultsDiv.style.animation = 'none';
    setTimeout(() => {
        resultsDiv.style.animation = 'fadeInUp 0.5s ease';
    }, 10);
}

function showCustomTips(result, tipsListId = 'tokenTipsList') {
    const tipsList = document.getElementById(tipsListId);
    if (!tipsList) return;

    const tips = [];

    if (result.tokens > 500) {
        tips.push('📌 نصك طويل! حاول تقسيمه إلى أجزاء أصغر');
    }

    if (result.words > 100 && result.tokens / result.words > 1.8) {
        tips.push('📌 يحتوي نصك على الكثير من الرموز الخاصة، حاول تقليلها');
    }

    if (result.words > 0 && result.tokens / result.words < 1.2) {
        tips.push('📌 نصك موجز جداً، يمكنك إضافة تفاصيل مفيدة');
    }

    if (tips.length === 0) {
        tips.push('✅ نصك متوازن! استمر بهذا المستوى');
    }

    tipsList.innerHTML = tips.map(t => `<li>${t}</li>`).join('');
}

// ================================================================
// 3. دوال النافذة المنبثقة (Token Modal)
// ================================================================

/**
 * فتح نافذة حاسبة التوكنز
 */
function openTokenModal() {
    const modal = document.getElementById('tokenModal');
    const input = document.getElementById('tokenModalInput');
    const results = document.getElementById('tokenModalResults');
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // تنظيف الحقل والنتائج السابقة
        if (input) {
            input.value = '';
            input.focus();
        }
        if (results) {
            results.style.display = 'none';
        }
    }
}

/**
 * إغلاق نافذة حاسبة التوكنز
 */
function closeTokenModal() {
    const modal = document.getElementById('tokenModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * حساب التوكنز داخل النافذة المنبثقة
 */
function calculateTokensModal() {
    const input = document.getElementById('tokenModalInput');
    const resultsDiv = document.getElementById('tokenModalResults');

    if (!input || !resultsDiv) return;

    const text = input.value;

    if (!text || text.trim().length === 0) {
        alert('⚠️ الرجاء إدخال النص أولاً!');
        return;
    }

    const result = estimateTokens(text);

    // عرض النتائج
    document.getElementById('tokenModalCount').textContent = result.tokens;
    document.getElementById('tokenModalWords').textContent = result.words;
    document.getElementById('tokenModalChars').textContent = result.chars;
    document.getElementById('tokenModalCost').textContent = estimateCost(result.tokens);

    // عرض النصائح المخصصة
    showCustomTips(result, 'tokenModalTipsList');

    resultsDiv.style.display = 'block';
    resultsDiv.style.animation = 'fadeInUp 0.4s ease';
}

// ================================================================
// 4. دعم API خارجي (Gemini - اختياري)
// ================================================================

/**
 * حساب التوكنز عبر Gemini API
 * @param {string} text - النص
 * @param {string} apiKey - مفتاح API
 */
async function calculateTokensGemini(text, apiKey) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:countTokens?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
            }
        );

        const data = await response.json();
        if (data.totalTokens) {
            return data.totalTokens;
        }
        throw new Error('فشل في الحصول على عدد التوكنز');
    } catch (error) {
        console.warn('API غير متاح، استخدام التقدير المحلي:', error);
        return estimateTokens(text).tokens;
    }
}

// ================================================================
// 5. إغلاق النافذة عند الضغط خارجها أو زر Escape
// ================================================================

// إغلاق عند الضغط خارج النافذة
document.addEventListener('click', function(e) {
    const modal = document.getElementById('tokenModal');
    if (e.target === modal) {
        closeTokenModal();
    }
});

// إغلاق عند الضغط على زر Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTokenModal();
    }
});

// الضغط على Enter في حقل الإدخال (النافذة المنبثقة)
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('tokenModalInput');
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey === false) {
                e.preventDefault();
                calculateTokensModal();
            }
        });
    }
    
    // الضغط على Enter في حقل الإدخال (الصفحة الرئيسية)
    const mainInput = document.getElementById('tokenInput');
    if (mainInput) {
        mainInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey === false) {
                e.preventDefault();
                calculateTokens();
            }
        });
    }
});

// ================================================================
// 6. تصدير الدوال العامة
// ================================================================

window.calculateTokens = calculateTokens;
window.estimateTokens = estimateTokens;
window.calculateTokensGemini = calculateTokensGemini;
window.openTokenModal = openTokenModal;
window.closeTokenModal = closeTokenModal;
window.calculateTokensModal = calculateTokensModal;

console.log('✅ token-calc.js تم تحميله بنجاح (الإصدار 2.0.0)');