/**
 * ================================================================
 * نظام الشهادة - Certificate System
 * ================================================================
 */

// ================================================================
// 1. بيانات الشهادة الافتراضية
// ================================================================

const CERT_DATA = {
    // هذه القيم مؤقتة (سيتم استبدالها بالملفات الحقيقية)
    signature: 'assets/images/signature-placeholder.png',
    qrCode: 'assets/images/qr-placeholder.png',
    instructor: 'م/ أحمد الحايك',
    title: 'مدرب هندسة الأوامر',
    academy: 'أكاديمية هندسة الأوامر',
    certificateId: 'PE-2026-0001',
};

// ================================================================
// 2. توليد الشهادة
// ================================================================

function generateCertificate() {
    // طلب اسم المستخدم
    let userName = prompt('📝 الرجاء إدخال اسمك الكامل (كما تريد أن يظهر في الشهادة):', STATE.userName || '');

    if (!userName || userName.trim().length < 2) {
        alert('⚠️ الرجاء إدخال اسم صحيح');
        return;
    }

    STATE.userName = userName.trim();

    // حساب النسبة المئوية
    const scores = STATE.progress.quizScores;
    const total = scores.reduce((a, b) => a + b, 0);
    const maxPossible = scores.length * 100;
    const percentage = maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;

    // تاريخ اليوم
    const today = new Date();
    const dateStr = today.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // رقم الشهادة
    const certNumber = 'PE-2026-' + String(Math.floor(Math.random() * 9000) + 1000);

    // بناء HTML الشهادة
    const certHTML = buildCertificateHTML({
        name: STATE.userName,
        percentage: percentage,
        date: dateStr,
        certNumber: certNumber,
        signature: CERT_DATA.signature,
        qrCode: CERT_DATA.qrCode,
        instructor: CERT_DATA.instructor,
        title: CERT_DATA.title,
        academy: CERT_DATA.academy,
    });

    // عرض الشهادة في المعاينة
    const preview = document.getElementById('certificatePreview');
    if (preview) {
        preview.innerHTML = certHTML;
        preview.style.display = 'block';
    }

    // حفظ رقم الشهادة
    CERT_DATA.certificateId = certNumber;
}

function buildCertificateHTML(data) {
    return `
        <div class="certificate-wrapper" id="certificateWrapper">
            <div class="certificate certificate-rtl">
                <!-- الرأس -->
                <div class="cert-header">
                    <div class="cert-logo">⚡</div>
                    <div class="cert-title">
                        <h2>🎓 شهادة إتمام</h2>
                        <p>Certificate of Completion</p>
                    </div>
                </div>

                <!-- المحتوى -->
                <div class="cert-body">
                    <p class="cert-statement">
                        تشهد أكاديمية هندسة الأوامر بأن
                    </p>
                    <h1 class="cert-name">${data.name}</h1>
                    <p class="cert-statement">
                        قد اجتاز بنجاح جميع مراحل برنامج <strong>"هندسة الأوامر"</strong>
                    </p>
                    <p class="cert-statement">
                        بنسبة إنجاز <span class="cert-percentage">${data.percentage}%</span>
                    </p>

                    <div class="cert-skills">
                        <p>📌 المهارات المكتسبة:</p>
                        <ul>
                            <li>صياغة الأوامر الاحترافية</li>
                            <li>تقنيات CoT و Few-shot</li>
                            <li>التحكم في المخرجات (الطول، النغمة، التنسيق)</li>
                            <li>أمان المطالبات وهندسة القوالب</li>
                            <li>تحليل التوكنز وتحسين الاستهلاك</li>
                        </ul>
                    </div>
                </div>

                <!-- التذييل -->
                <div class="cert-footer">
                    <div class="cert-date">
                        <span>📅 تاريخ الإصدار:</span>
                        <span>${data.date}</span>
                    </div>

                    <div class="cert-signature">
                        <div class="signature-image">
                            <img src="${data.signature}" alt="توقيع المدرب" />
                        </div>
                        <p class="signature-name">${data.instructor}</p>
                        <p class="signature-title">${data.title}</p>
                    </div>

                    <div class="cert-qr">
                        <img src="${data.qrCode}" alt="QR Code" />
                    </div>
                </div>

                <!-- رقم الشهادة -->
                <div class="cert-id">
                    🏅 رقم الإصدار: ${data.certNumber}
                </div>
            </div>
        </div>
    `;
}

// ================================================================
// 3. تحميل الشهادة كـ PDF أو PNG
// ================================================================

function downloadCertificate() {
    const wrapper = document.getElementById('certificateWrapper');
    if (!wrapper) {
        alert('⚠️ الرجاء طلب الشهادة أولاً!');
        return;
    }

    alert('📥 سيتم تحميل الشهادة قريباً (ميزة PDF قيد التطوير)');
    // يمكن إضافة مكتبة مثل html2canvas لتحميل الصورة
}

// ================================================================
// 4. تصدير الدوال العامة
// ================================================================

window.generateCertificate = generateCertificate;
window.downloadCertificate = downloadCertificate;