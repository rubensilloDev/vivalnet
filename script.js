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
        const hoverables = document.querySelectorAll(`
            a, button, .service-card, .trust-card, .image-glass-card, 
            .filter-chip, .accordion-header, .popular-item, .read-more-link,
            .vet-social-btn, .social-links a, .footer-links a, .nav-links a
        `);
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
    const articles = document.querySelectorAll('.article-card, .article-featured');

    if (filterChips.length > 0) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const filter = chip.getAttribute('data-filter');

                // 1. UI: Actualizar chips activos
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // 2. Lógica de Filtrado
                articles.forEach(article => {
                    const categories = article.getAttribute('data-category');

                    // Pequeño truco para que el cambio de layout (position absolute)
                    // no sea brusco: primero bajamos opacidad, luego ocultamos.
                    if (filter === 'todos' || (categories && categories.includes(filter))) {
                        article.style.display = ''; // Restaura el valor del CSS original
                        
                        setTimeout(() => {
                            article.classList.remove('filtered-out');
                            article.style.visibility = 'visible';
                            article.style.pointerEvents = 'auto';
                        }, 10);
                    } else {
                        article.classList.add('filtered-out');
                        article.style.pointerEvents = 'none';
                        setTimeout(() => {
                           if(article.classList.contains('filtered-out')) {
                               article.style.display = 'none';
                           }
                        }, 400);
                    }
                });
            });
        });
    }


    /* --- 10. BUSCADOR DE ARTÍCULOS (Real-time Search) --- */
    const searchInput = document.getElementById('consejos-search');
    const searchBtn = document.querySelector('.btn-search');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        // Si hay búsqueda, reseteamos los chips de categorías a "Todos"
        if (query.length > 0) {
            filterChips.forEach(c => c.classList.remove('active'));
            if (filterChips.length > 0) { // Ensure there's a 'todos' chip
                filterChips[0].classList.add('active');
            }
        }

        articles.forEach(article => {
            const titleElement = article.querySelector('h2, h3');
            const textElement = article.querySelector('p');

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const text = textElement ? textElement.textContent.toLowerCase() : '';

            if (title.includes(query) || text.includes(query)) {
                article.style.display = '';
                setTimeout(() => {
                    article.classList.remove('filtered-out');
                    article.style.visibility = 'visible';
                    article.style.pointerEvents = 'auto';
                }, 10);
            } else {
                article.classList.add('filtered-out');
                article.style.pointerEvents = 'none';
                setTimeout(() => {
                   if(article.classList.contains('filtered-out')) {
                       article.style.display = 'none';
                   }
                }, 400);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
    }

    /* --- 11. CLEANUP IN PROGRESS --- */
    // Anterior código de FAQ interactivo (Orbe de Max) eliminado tras rediseño a Acordeón.

    /* --- 12. SCROLL TO TOP LOGIC --- */
    const scrollTopBtn = document.getElementById('scrollToTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- 12. TIMELINE SERVICES SCROLL ANIMATION --- */
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineMarkers = document.querySelectorAll('.timeline-marker');

    if (timelineContainer && timelineProgress) {
        const updateTimeline = () => {
            const containerRect = timelineContainer.getBoundingClientRect();
            const containerHeight = timelineContainer.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calcular progreso basado en la posición del scroll
            const scrollStart = containerRect.top + window.scrollY - windowHeight * 0.5;
            const scrollEnd = scrollStart + containerHeight + windowHeight * 0.5;
            const currentScroll = window.scrollY;

            let progress = ((currentScroll - scrollStart) / (scrollEnd - scrollStart)) * 100;
            progress = Math.max(0, Math.min(100, progress));

            // Actualizar barra de progreso
            timelineProgress.style.height = progress + '%';

            // Activar marcadores según el progreso y hacer visibles los items
            timelineItems.forEach((item, index) => {
                const marker = timelineMarkers[index];
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;

                // Hacer visible el item cuando entra en pantalla
                if (itemRect.top < windowHeight * 0.85) {
                    item.classList.add('visible');
                }

                // Activar cuando el item está en el centro de la pantalla
                if (itemCenter < windowHeight * 0.6) {
                    marker.classList.add('active');
                    item.classList.add('active');
                } else {
                    marker.classList.remove('active');
                    item.classList.remove('active');
                }
            });
        };

        // Usar IntersectionObserver para mejor performance
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', updateTimeline, { passive: true });
                    updateTimeline();
                } else {
                    window.removeEventListener('scroll', updateTimeline);
                }
            });
        }, { threshold: 0, rootMargin: '-10% 0px -10% 0px' });

        timelineObserver.observe(timelineContainer);

        // Inicializar
        updateTimeline();
    }

    /* --- 14. FAQ ACCORDION LOGIC --- */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerrar todos los items (modo single-open)
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Abrir el item clicado si no estaba activo
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* --- 15. FAQ ACCORDION KEYBOARD NAVIGATION --- */
    const accordionContainer = document.querySelector('.accordion-container');

    if (accordionContainer) {
        const headers = accordionContainer.querySelectorAll('.accordion-header');

        accordionContainer.addEventListener('keydown', (e) => {
            const focusedHeader = document.activeElement;
            if (!focusedHeader.classList.contains('accordion-header')) return;

            const currentIndex = Array.from(headers).indexOf(focusedHeader);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % headers.length;
                    headers[nextIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + headers.length) % headers.length;
                    headers[prevIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    headers[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    headers[headers.length - 1].focus();
                    break;
            }
        });
    }

});



