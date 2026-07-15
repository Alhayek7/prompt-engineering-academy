/**
 * ================================================================
 * نظام الشهادة - Certificate System (نسخة متكاملة مع تخزين دائم)
 * ================================================================
 */

// ================================================================
// 1. بيانات الشهادة الافتراضية
// ================================================================

const CERT_DATA = {
    signature: 'assets/images/signature-placeholder.png',
    qrCode: 'assets/images/qr-placeholder.png',
    instructor: 'م/ أحمد الحايك',
    title: 'مدرب هندسة الأوامر',
    academy: 'Alhayek Academy',
    academyAr: 'أكاديمية الحايك',
    certificateId: 'PE-2026-0001',
};

let selectedCertLang = 'ar'; // اللغة الافتراضية

// ================================================================
// 2. اختيار لغة الشهادة
// ================================================================

function selectCertLang(lang) {
    selectedCertLang = lang;
    
    // تحديث الأزرار
    document.querySelectorAll('.modal-lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ================================================================
// 3. فتح وإغلاق النافذة المنبثقة
// ================================================================

function openModal() {
    const modal = document.getElementById('certModal');
    const input = document.getElementById('userNameInput');
    const error = document.getElementById('modalError');
    
    if (!modal) return;
    
    // التحقق من إكمال جميع المراحل
    const allCompleted = window.STATE?.progress?.stages?.every(s => s === true);
    if (!allCompleted) {
        alert('⚠️ يجب إكمال جميع المراحل أولاً!');
        return;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        if (input) {
            input.focus();
            input.value = window.STATE?.userName || '';
            input.placeholder = 'اكتب اسمك الكامل هنا...';
        }
    }, 300);
    
    if (error) {
        error.classList.remove('show');
        error.style.display = 'none';
    }
}

function closeModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ================================================================
// 4. تأكيد إصدار الشهادة
// ================================================================

function confirmCertificate() {
    const input = document.getElementById('userNameInput');
    const error = document.getElementById('modalError');
    const name = input ? input.value.trim() : '';
    
    // التحقق من صحة الاسم
    if (!name || name.length < 2) {
        if (error) {
            error.textContent = selectedCertLang === 'ar' 
                ? '⚠️ الرجاء إدخال اسم صحيح (على الأقل حرفان)'
                : '⚠️ Please enter a valid name (at least 2 characters)';
            error.style.display = 'block';
            error.classList.add('show');
        }
        
        if (input) {
            input.style.borderColor = '#e74c3c';
            input.style.animation = 'errorShake 0.4s ease';
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.animation = '';
            }, 500);
        }
        return;
    }
    
    // حفظ الاسم واللغة
    if (window.STATE) {
        window.STATE.userName = name;
        if (typeof saveProgress === 'function') {
            saveProgress();
        }
    }
    
    localStorage.setItem('certLanguage', selectedCertLang);
    
    // إغلاق النافذة
    closeModal();
    
    // توليد الشهادة
    generateCertificate();
}

// ================================================================
// 5. توليد الشهادة (مع دعم اللغة)
// ================================================================

function generateCertificate() {
    const userName = window.STATE?.userName || 'متعلم في أكاديمية الحايك';
    const lang = localStorage.getItem('certLanguage') || 'ar';
    
    // حساب النسبة المئوية
    const scores = window.STATE?.progress?.quizScores || [0, 0, 0, 0, 0];
    const total = scores.reduce((a, b) => a + b, 0);
    const maxPossible = scores.length * 100;
    const percentage = maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;
    
    // تاريخ اليوم
    const today = new Date();
    const dateStr = today.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    // رقم الشهادة
    const certNumber = 'PE-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
    
    // بناء HTML الشهادة (حسب اللغة)
    const certHTML = lang === 'ar' 
        ? buildCertificateArabic(userName, percentage, dateStr, certNumber)
        : buildCertificateEnglish(userName, percentage, dateStr, certNumber);
    
    const preview = document.getElementById('certificatePreview');
    if (preview) {
        preview.innerHTML = certHTML;
        preview.style.display = 'block';
        preview.style.animation = 'fadeInUp 0.6s ease';
    }
    
    CERT_DATA.certificateId = certNumber;
    
    setTimeout(() => {
        const section = document.getElementById('certificate-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 300);
}

// ================================================================
// 6. بناء الشهادة بالعربية
// ================================================================

function buildCertificateArabic(name, percentage, date, certNumber) {
    return `
        <div class="certificate-wrapper" id="certificateWrapper">
            <div class="certificate certificate-rtl">
                <div class="cert-header">
                    <div class="cert-logo">⚡</div>
                    <div class="cert-title">
                        <h2>🎓 شهادة إتمام</h2>
                        <p>Certificate of Completion</p>
                    </div>
                </div>
                <div class="cert-body">
                    <p class="cert-statement">تشهد <strong>أكاديمية الحايك</strong></p>
                    <p class="cert-academy">Alhayek Academy</p>
                    <p class="cert-statement">بأن</p>
                    <h1 class="cert-name">${name}</h1>
                    <p class="cert-statement">قد اجتاز بنجاح جميع مراحل برنامج <strong>"هندسة الأوامر"</strong></p>
                    <p class="cert-statement">بنسبة إنجاز <span class="cert-percentage">${percentage}%</span></p>
                    <div class="cert-skills">
                        <p>📌 المهارات المكتسبة:</p>
                        <ul>
                            <li>صياغة الأوامر الاحترافية</li>
                            <li>تقنيات CoT و Few-shot</li>
                            <li>التحكم في المخرجات</li>
                            <li>أمان المطالبات وهندسة القوالب</li>
                            <li>تحليل التوكنز وتحسين الاستهلاك</li>
                        </ul>
                    </div>
                </div>
                <div class="cert-footer">
                    <div class="cert-date"><span>📅 تاريخ الإصدار:</span> ${date}</div>
                    <div class="cert-signature">
                        <div class="signature-image"><img src="${CERT_DATA.signature}" alt="توقيع المدرب" /></div>
                        <p class="signature-name">${CERT_DATA.instructor}</p>
                        <p class="signature-title">${CERT_DATA.title}</p>
                    </div>
                    <div class="cert-qr"><img src="${CERT_DATA.qrCode}" alt="QR Code" /></div>
                </div>
                <div class="cert-id">🏅 رقم الإصدار: ${certNumber}</div>
            </div>
        </div>
    `;
}

// ================================================================
// 7. بناء الشهادة بالإنجليزية
// ================================================================

function buildCertificateEnglish(name, percentage, date, certNumber) {
    return `
        <div class="certificate-wrapper" id="certificateWrapper">
            <div class="certificate">
                <div class="cert-header">
                    <div class="cert-logo">⚡</div>
                    <div class="cert-title">
                        <h2>🎓 Certificate of Completion</h2>
                        <p>شهادة إتمام</p>
                    </div>
                </div>
                <div class="cert-body">
                    <p class="cert-statement">This certifies that</p>
                    <h1 class="cert-name">${name}</h1>
                    <p class="cert-statement">has successfully completed the <strong>"Prompt Engineering"</strong> program</p>
                    <p class="cert-statement">at <strong>Alhayek Academy</strong></p>
                    <p class="cert-statement">with an achievement rate of <span class="cert-percentage">${percentage}%</span></p>
                    <div class="cert-skills">
                        <p>📌 Skills Acquired:</p>
                        <ul>
                            <li>Professional Prompt Crafting</li>
                            <li>CoT & Few-shot Techniques</li>
                            <li>Output Control (Length, Tone, Format)</li>
                            <li>Prompt Security & Template Design</li>
                            <li>Token Analysis & Consumption Optimization</li>
                        </ul>
                    </div>
                </div>
                <div class="cert-footer">
                    <div class="cert-date"><span>📅 Issued on:</span> ${date}</div>
                    <div class="cert-signature">
                        <div class="signature-image"><img src="${CERT_DATA.signature}" alt="Instructor Signature" /></div>
                        <p class="signature-name">${CERT_DATA.instructor}</p>
                        <p class="signature-title">${CERT_DATA.title}</p>
                    </div>
                    <div class="cert-qr"><img src="${CERT_DATA.qrCode}" alt="QR Code" /></div>
                </div>
                <div class="cert-id">🏅 Certificate ID: ${certNumber}</div>
            </div>
        </div>
    `;
}

// ================================================================
// 8. تحميل الشهادة كـ PNG
// ================================================================

function downloadCertificate() {
    const wrapper = document.getElementById('certificateWrapper');
    if (!wrapper) {
        alert('⚠️ الرجاء طلب الشهادة أولاً!');
        return;
    }

    if (typeof html2canvas !== 'undefined') {
        html2canvas(wrapper, {
            scale: 2.5,
            useCORS: true,
            backgroundColor: null,
            logging: false,
            borderRadius: '24px',
        }).then(canvas => {
            const link = document.createElement('a');
            const name = window.STATE?.userName || 'Learner';
            const lang = localStorage.getItem('certLanguage') || 'ar';
            const langSuffix = lang === 'ar' ? 'ar' : 'en';
            link.download = `Certificate-${name}-Alhayek-Academy-${langSuffix}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(() => {
            alert('📥 سيتم تحميل الشهادة قريباً');
        });
    } else {
        alert('📥 سيتم تحميل الشهادة قريباً');
    }
}

// ================================================================
// 9. إغلاق النافذة عند الضغط خارجها أو زر Escape
// ================================================================

document.addEventListener('click', function(e) {
    const modal = document.getElementById('certModal');
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

// ================================================================
// 10. ربط الأزرار في الصفحة
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    const certBtn = document.querySelector('[data-i18n="cert_request_btn"]');
    if (certBtn) {
        certBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const allCompleted = window.STATE?.progress?.stages?.every(s => s === true);
            if (!allCompleted) {
                alert('⚠️ يجب إكمال جميع المراحل الخمس أولاً!');
                return;
            }
            
            openModal();
        });
    }
    
    const input = document.getElementById('userNameInput');
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                confirmCertificate();
            }
        });
    }
});

// ================================================================
// 11. تصدير الدوال العامة
// ================================================================

window.openModal = openModal;
window.closeModal = closeModal;
window.confirmCertificate = confirmCertificate;
window.generateCertificate = generateCertificate;
window.downloadCertificate = downloadCertificate;
window.selectCertLang = selectCertLang;

console.log('✅ certificate.js تم تحميله بنجاح');

/**
 * ================================================================
 * نظام الشهادة - Certificate System (نسخة متكاملة مع تحميل)
 * ================================================================
 */

// ================================================================
// 1. دوال التحكم في مؤشر التحميل
// ================================================================

function showLoading(message = '⏳ جاري تحميل الشهادة...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = document.getElementById('loadingText');
    if (overlay) {
        overlay.classList.add('active');
        if (text) text.textContent = message;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ================================================================
// 2. تحميل الشهادة كـ PNG
// ================================================================

function downloadCertificatePNG() {
    const wrapper = document.getElementById('certificateWrapper');
    if (!wrapper) {
        alert('⚠️ الرجاء طلب الشهادة أولاً!');
        return;
    }

    showLoading('🖼️ جاري تحضير صورة الشهادة...');

    setTimeout(() => {
        html2canvas(wrapper, {
            scale: 3,
            useCORS: true,
            backgroundColor: null,
            logging: false,
            borderRadius: '24px',
            allowTaint: true,
            width: wrapper.scrollWidth,
            height: wrapper.scrollHeight,
        }).then(canvas => {
            const link = document.createElement('a');
            const name = window.STATE?.userName || 'Learner';
            const lang = localStorage.getItem('certLanguage') || 'ar';
            const langSuffix = lang === 'ar' ? 'ar' : 'en';
            link.download = `شهادة-${name}-Alhayek-Academy-${langSuffix}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
            hideLoading();
        }).catch(error => {
            console.error('خطأ في تحميل PNG:', error);
            hideLoading();
            alert('⚠️ حدث خطأ أثناء تحميل الصورة. الرجاء المحاولة مرة أخرى.');
        });
    }, 300);
}

// ================================================================
// 3. تحميل الشهادة كـ PDF
// ================================================================

function downloadCertificatePDF() {
    const wrapper = document.getElementById('certificateWrapper');
    if (!wrapper) {
        alert('⚠️ الرجاء طلب الشهادة أولاً!');
        return;
    }

    showLoading('📄 جاري تحضير ملف PDF...');

    setTimeout(() => {
        const opt = {
            margin: 8,
            filename: `شهادة-${window.STATE?.userName || 'Learner'}-Alhayek-Academy.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2.5,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                borderRadius: '24px',
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'landscape'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().set(opt).from(wrapper).save().then(() => {
            hideLoading();
        }).catch(error => {
            console.error('خطأ في تحميل PDF:', error);
            hideLoading();
            alert('⚠️ حدث خطأ أثناء تحميل PDF. الرجاء المحاولة مرة أخرى.');
        });
    }, 300);
}

// ================================================================
// 4. تحديث أزرار التحميل
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    // زر تحميل PNG
    const pngBtn = document.querySelector('[data-i18n="cert_download_png"]');
    if (pngBtn) {
        pngBtn.addEventListener('click', downloadCertificatePNG);
    }
    
    // زر تحميل PDF
    const pdfBtn = document.querySelector('[data-i18n="cert_download_pdf"]');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', downloadCertificatePDF);
    }
});

// ================================================================
// 5. تصدير الدوال العامة
// ================================================================

window.downloadCertificatePNG = downloadCertificatePNG;
window.downloadCertificatePDF = downloadCertificatePDF;
window.showLoading = showLoading;
window.hideLoading = hideLoading;

console.log('✅ certificate.js تم تحميله بنجاح مع ميزة التحميل');
