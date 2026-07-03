/**
 * ================================================================
 * إدارة المشاهد 3D - Scene Manager
 * ================================================================
 */

let currentScene = 'home';
let logoMesh = null;

function loadLogo3D(scene) {
    // إنشاء شعار 3D بسيط (حرف A)
    const group = new THREE.Group();

    // حرف A باستخدام الأشكال الهندسية
    const material = new THREE.MeshStandardMaterial({
        color: 0x25538A,
        metalness: 0.6,
        roughness: 0.3,
        emissive: 0x25538A,
        emissiveIntensity: 0.1,
    });

    const materialLight = new THREE.MeshStandardMaterial({
        color: 0x6FB7E0,
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0x6FB7E0,
        emissiveIntensity: 0.05,
    });

    // الساق الأيمن
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 0.4), material);
    leg1.position.set(-0.6, 0, 0);
    group.add(leg1);

    // الساق الأيسر
    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 0.4), material);
    leg2.position.set(0.6, 0, 0);
    group.add(leg2);

    // العارضة الوسطى
    const cross = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 0.4), materialLight);
    cross.position.set(0, 0.6, 0);
    group.add(cross);

    // العارضة العلوية
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 0.4), materialLight);
    top.position.set(0, 1.2, 0);
    group.add(top);

    // حلقة دائرة حول الشعار
    const ringGeo = new THREE.TorusGeometry(1.3, 0.04, 16, 40);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0x6FB7E0,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x6FB7E0,
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.rotation.z = Math.PI / 6;
    group.add(ring);

    // حلقة ثانية
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.5, 0.03, 16, 40),
        new THREE.MeshStandardMaterial({
            color: 0xA9D4EC,
            metalness: 0.5,
            roughness: 0.3,
            transparent: true,
            opacity: 0.3,
        })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    group.add(ring2);

    group.position.set(0, 0, 0);
    group.scale.set(0.7, 0.7, 0.7);

    logoMesh = group;
    scene.add(group);

    return group;
}

function animateLogo() {
    if (logoMesh) {
        logoMesh.rotation.y += 0.005;
        logoMesh.rotation.x += 0.002;
        logoMesh.rotation.z += 0.001;

        // اهتزاز خفيف
        logoMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
}

function switchScene(sceneName) {
    currentScene = sceneName;
    // يمكن إضافة انتقالات بين المشاهد هنا
}

// تصدير الدوال
window.loadLogo3D = loadLogo3D;
window.animateLogo = animateLogo;
window.switchScene = switchScene;