/* =========================================================================
   VIVALNET CLINICA VETERINARIA | INTERACTION SCRIPTS (PREMIUM EDITION)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. CUSTOM CURSOR LOGIC --- */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Smoother movement for cursor
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            
            // Follower follows with a slight delay naturally via CSS transitions
            follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        // Add hover effect to all interactive elements
        const hoverables = document.querySelectorAll('a, button, .service-card, .trust-card, .image-glass-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    /* --- 2. DARK MODE SYSTEM --- */
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'ph-fill ph-sun';
        } else {
            icon.className = 'ph-fill ph-moon';
        }
    }

    /* --- 3. MAGNETIC BUTTONS EFFECT --- */
    const magneticWraps = document.querySelectorAll('.magnetic-wrap');
    
    magneticWraps.forEach(wrap => {
        wrap.addEventListener('mousemove', (e) => {
            const btn = wrap.querySelector('.btn') || wrap.querySelector('.btn-whatsapp-floating');
            const rect = wrap.getBoundingClientRect();
            
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the wrap slightly and the button more
            wrap.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            if (btn) btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        wrap.addEventListener('mouseleave', () => {
            const btn = wrap.querySelector('.btn') || wrap.querySelector('.btn-whatsapp-floating');
            wrap.style.transform = 'translate(0, 0)';
            if (btn) btn.style.transform = 'translate(0, 0)';
        });
    });

    /* --- 4. TILT EFFECT (3D Cards) --- */
    const tiltElements = document.querySelectorAll('#tilt-card, .service-card, .trust-card');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    /* --- 5. NAVBAR SCROLL EFFECT --- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 6. MOBILE MENU --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navBarContent = document.querySelector('.navbar-content');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navBarContent.classList.toggle('nav-active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('ph-list');
            icon.classList.toggle('ph-x');
        });
    }

    /* --- 7. ENHANCED SCROLL REVEAL (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('[data-animate]');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const element = entry.target;
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('is-visible');
            }, parseInt(delay));
            
            observer.unobserve(element);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* --- 8. SMOOTH SCROLL --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navBarContent) navBarContent.classList.remove('nav-active');
                }
            }
        });
    });

    /* --- 9. FILTROS DE CATEGORÍA (Página: Consejos de Salud) --- */
    const filterChips = document.querySelectorAll('.filter-chip');

    if (filterChips.length > 0) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Desactivar el chip que estaba activo
                filterChips.forEach(c => c.classList.remove('active'));
                // Activar el chip pulsado
                chip.classList.add('active');
            });
        });
    }

});

