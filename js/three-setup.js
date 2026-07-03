/**
 * ================================================================
 * إعداد Three.js - 3D Setup
 * ================================================================
 */

let scene, camera, renderer;
let is3DReady = false;

function initThreeJS() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // إنشاء المشهد
    scene = new THREE.Scene();
    scene.background = null; // شفاف

    // إنشاء الكاميرا
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    // إنشاء المُعَرِّض (Renderer)
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // إضافة الإضاءات
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x6FB7E0, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x25538A, 0.8);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // معالجة تغيير الحجم
    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    is3DReady = true;
    console.log('✅ Three.js جاهز');

    // بدء تشغيل نظام الجسيمات
    if (typeof initParticles === 'function') {
        initParticles(scene);
    }
}

// تصدير الدوال
window.initThreeJS = initThreeJS;
window.getScene = () => scene;
window.getCamera = () => camera;
window.getRenderer = () => renderer;