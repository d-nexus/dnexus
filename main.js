/* D-Nexus - JS compartido: menú móvil, detalles de servicios y fondo de partículas optimizado */
(function () {
    'use strict';

    // ---- Menú móvil ----
    var btn = document.getElementById('mobileMenuBtn');
    var menu = document.getElementById('mobileMenu');
    if (btn && menu) {
        btn.addEventListener('click', function () {
            menu.classList.toggle('hidden');
            var icon = btn.querySelector('i');
            var open = !menu.classList.contains('hidden');
            if (icon) {
                icon.classList.toggle('fa-xmark', open);
                icon.classList.toggle('fa-bars', !open);
            }
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // ---- Detalles de servicios (usado en index.html por onclick) ----
    window.toggleServiceDetails = function (event) {
        if (event) event.stopPropagation();
        var details = document.getElementById('serviceDetails');
        var text = document.getElementById('detailsBtnText');
        var icon = document.getElementById('detailsIcon');
        if (!details) return;
        var hidden = details.classList.toggle('hidden');
        if (text) text.textContent = hidden ? 'Ver detalles' : 'Ocultar detalles';
        if (icon) icon.style.transform = hidden ? 'rotate(0deg)' : 'rotate(180deg)';
    };

    // ---- Medición de clics marcados con data-track ----
    document.addEventListener('click', function (e) {
        var el = e.target.closest && e.target.closest('[data-track]');
        if (el && typeof gtag === 'function') gtag('event', 'contact_click', { method: el.getAttribute('data-track') });
    });

    // ---- Fondo de partículas ----
    var canvas = document.getElementById('bg-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var width = 0, height = 0, particles = [], running = false, raf = 0;
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // Sprites pre-renderizados (reemplazan shadowBlur, que es muy costoso por partícula)
    function makeSprite(rgb) {
        var s = document.createElement('canvas');
        s.width = s.height = 32;
        var c = s.getContext('2d');
        var g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(' + rgb + ',1)');
        g.addColorStop(0.35, 'rgba(' + rgb + ',0.55)');
        g.addColorStop(1, 'rgba(' + rgb + ',0)');
        c.fillStyle = g;
        c.fillRect(0, 0, 32, 32);
        return s;
    }
    var sprites = [makeSprite('0,210,255'), makeSprite('16,185,129')];

    function makeParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35 - 0.1,
            size: (Math.random() * 1.5 + 2.0) * 3.2,
            alpha: Math.random() * 0.5 + 0.4,
            sprite: sprites[Math.random() > 0.4 ? 0 : 1]
        };
    }

    function targetCount() {
        var mobile = window.innerWidth < 768;
        var n = Math.floor((window.innerWidth * window.innerHeight) / (mobile ? 12000 : 9000));
        return Math.max(20, Math.min(n, mobile ? 60 : 120));
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        var n = targetCount();
        while (particles.length < n) particles.push(makeParticle());
        if (particles.length > n) particles.length = n;
        if (reduce || !running) draw();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            ctx.globalAlpha = p.alpha;
            ctx.drawImage(p.sprite, p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        }
        ctx.globalAlpha = 1;
    }

    function step() {
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        var dx = (mouse.x - width / 2) * 0.0001, dy = (mouse.y - height / 2) * 0.0001;
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx + dx;
            p.y += p.vy + dy;
            if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;
        }
        draw();
        raf = requestAnimationFrame(step);
    }

    function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(step); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    mouse.x = mouse.tx = window.innerWidth / 2;
    mouse.y = mouse.ty = window.innerHeight / 2;
    window.addEventListener('mousemove', function (e) { mouse.tx = e.clientX; mouse.ty = e.clientY; }, { passive: true });
    window.addEventListener('resize', resize);
    // Pausa cuando la pestaña no está visible (ahorra batería y CPU)
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

    resize();
    start();
})();
