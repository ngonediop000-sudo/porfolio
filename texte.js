/* ============================================================
   NGONÉ DIOP — PORTFOLIO JS PREMIUM 2026
   ============================================================ */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ AOS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: 'ease-out-quart'
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ LOADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.7s ease';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 700);
    }, 1800);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CUSTOM CURSOR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const cursor         = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    const animateFollower = () => {
        fx += (mouseX - fx) * 0.10;
        fy += (mouseY - fy) * 0.10;
        cursorFollower.style.left = fx + 'px';
        cursorFollower.style.top  = fy + 'px';
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const interactives = 'a, button, [data-cursor], .service-card, .portfolio-item, .skill-pill, .tools-tags span';
    document.querySelectorAll(interactives).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--hover');
            cursorFollower.classList.add('follower--hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--hover');
            cursorFollower.classList.remove('follower--hover');
        });
    });

    // Hide cursor on touch
    document.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }, { once: true });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PARTICLES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const COUNT  = 55;
    const COLORS = ['rgba(139,92,246,', 'rgba(56,189,248,', 'rgba(212,168,83,'];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x     = Math.random() * W;
            this.y     = Math.random() * H;
            this.size  = Math.random() * 1.4 + 0.3;
            this.vx    = (Math.random() - 0.5) * 0.22;
            this.vy    = (Math.random() - 0.5) * 0.22;
            this.alpha = Math.random() * 0.38 + 0.08;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.fill();
        }
    }

    const drawLines = (particles) => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 130) * 0.07})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    };

    const particles = Array.from({ length: COUNT }, () => new Particle());
    const animate   = () => {
        ctx.clearRect(0, 0, W, H);
        drawLines(particles);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };
    animate();

    let rt;
    window.addEventListener('resize', () => {
        clearTimeout(rt);
        rt = setTimeout(() => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }, 200);
    }, { passive: true });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ NAVBAR SCROLL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const nav = document.querySelector('.navbar');
if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ BURGER / MOBILE MENU ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const burger     = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
let menuOpen = false;

if (burger && mobileMenu) {
    const [l1, l2, l3] = burger.querySelectorAll('div');

    const openMenu = () => {
        menuOpen = true;
        mobileMenu.classList.add('open');
        l1.style.cssText = 'transform:rotate(45deg) translate(5px,5px);';
        l2.style.cssText = 'opacity:0;transform:scaleX(0);';
        l3.style.cssText = 'transform:rotate(-45deg) translate(5px,-5px);';
        document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        [l1, l2, l3].forEach(l => l.style.cssText = '');
        document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ANIMATED COUNTERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const animateCounter = (el) => {
    const target   = +el.getAttribute('data-target');
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;
    const tick = () => {
        current = Math.min(current + step, target);
        el.innerText = Math.ceil(current).toLocaleString('fr-FR');
        if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting) && !counted) {
            counted = true;
            counters.forEach(animateCounter);
        }
    }, { threshold: 0.25 });
    counters.forEach(c => counterObserver.observe(c));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SKILL BARS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const skillFills = document.querySelectorAll('.skill-fill');
if (skillFills.length > 0) {
    let animated = false;
    const skillObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting) && !animated) {
            animated = true;
            skillFills.forEach(bar => {
                const target = bar.getAttribute('data-width') || '0';
                // Small delay per bar for stagger effect
                const delay  = Math.random() * 200;
                setTimeout(() => { bar.style.width = target + '%'; }, delay);
            });
        }
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillObserver.observe(skillsSection);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SMOOTH SCROLL (navbar offset) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const sel = this.getAttribute('href');
        if (sel === '#') return;
        const target = document.querySelector(sel);
        if (!target) return;
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ MAGNETIC BUTTONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.querySelectorAll('.btn-premium, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) * 0.28;
        const dy   = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PARALLAX ORBS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const orbs = document.querySelectorAll('.hero-orb');
let pTicking = false;
document.addEventListener('mousemove', (e) => {
    if (!pTicking) {
        requestAnimationFrame(() => {
            const xP = (e.clientX / window.innerWidth  - 0.5) * 2;
            const yP = (e.clientY / window.innerHeight - 0.5) * 2;
            orbs.forEach((orb, i) => {
                const f = (i + 1) * 11;
                orb.style.transform = `translate(${xP * f}px, ${yP * f}px)`;
            });
            pTicking = false;
        });
        pTicking = true;
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT FORM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn      = contactForm.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML  = '<span>Message envoyé ✓</span>';
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        btn.disabled   = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3500);
    });
}