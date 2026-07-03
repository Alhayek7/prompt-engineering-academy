/**
 * ================================================================
 * التفاعلات 3D - 3D Interactions
 * ================================================================
 */

let raycaster, mouse;

function initInteractions() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    document.addEventListener('mousemove', (event) => {
        const container = document.getElementById('three-container');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // تفاعل النقر على العناصر 3D
    document.addEventListener('click', (event) => {
        // يمكن إضافة منطق النقر على العناصر 3D هنا
    });

    console.log('✅ تفاعلات 3D جاهزة');
}

function updateInteractions(scene, camera) {
    if (!raycaster || !scene) return;

    raycaster.setFromCamera(mouse, camera);

    // يمكن إضافة عناصر قابلة للنقر هنا
}

// تصدير الدوال
window.initInteractions = initInteractions;
window.updateInteractions = updateInteractions;