/**
 * ================================================================
 * نظام الجسيمات - Particle System
 * ================================================================
 */

let particles;
let particlePositions;
let particleVelocities;

function initParticles(scene) {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color(0x25538A);
    const color2 = new THREE.Color(0x6FB7E0);
    const color3 = new THREE.Color(0xA9D4EC);

    for (let i = 0; i < count; i++) {
        // المواقع في مساحة ثلاثية الأبعاد
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

        // الألوان (تدرج أزرق)
        const mix = Math.random();
        let color;
        if (mix < 0.33) color = color1;
        else if (mix < 0.66) color = color2;
        else color = color3;

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = 0.03 + Math.random() * 0.05;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // تخزين المواقع للحركة
    particlePositions = positions;
    particleVelocities = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        particleVelocities[i] = (Math.random() - 0.5) * 0.008;
    }

    const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
    });

    particles = new THREE.Points(geometry, material);
    particles.position.y = 1;
    scene.add(particles);

    console.log('✅ نظام الجسيمات جاهز');
}

function animateParticles() {
    if (!particles) return;

    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i++) {
        positions[i] += particleVelocities[i];

        // إعادة تدوير الجسيمات عند الخروج من الحدود
        if (positions[i] > 15) positions[i] = -15;
        if (positions[i] < -15) positions[i] = 15;

        if (i % 3 === 1) { // محور Y
            if (positions[i] > 10) positions[i] = -10;
            if (positions[i] < -10) positions[i] = 10;
        }

        if (i % 3 === 2) { // محور Z
            if (positions[i] > 10) positions[i] = -10;
            if (positions[i] < -10) positions[i] = 10;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    // دوران خفيف للمجموعة
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
}

function startParticleAnimation() {
    if (typeof animateParticles === 'function') {
        setInterval(animateParticles, 50);
    }
}

// تصدير الدوال
window.initParticles = initParticles;
window.animateParticles = animateParticles;
window.startParticleAnimation = startParticleAnimation;