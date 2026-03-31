/**
 * Barbearia A37 - Interações e Animações Base
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Scroll Reveal Animations ─────────────────────────
       Simple intersection observer for revealing elements as
       they come into the viewport.
    */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Descomente para animar apenas uma vez
            } else {
                // Remove a classe se quiser que anime sempre que rolar para cima/baixo
                entry.target.classList.remove('is-visible');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => scrollObserver.observe(el));


    /* ── 2. FAQ Accordion ──────────────────────────────────
       Toggles the active class on FAQ items to show/hide answers.
    */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Fecha outros que estejam abertos (opcional)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            
            // Alterna o atual
            item.classList.toggle('active');
        });
    });


    /* ── 3. Header Background on Scroll ─────────────────────
       Adds a solid background to the transparent header when scrolling down.
    */
    const header = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'var(--bg-main)';
            header.style.padding = '15px 5%';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.padding = '20px 5%';
            header.style.boxShadow = 'none';
        }
    });

});
