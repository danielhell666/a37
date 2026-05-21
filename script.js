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
                observer.unobserve(entry.target);
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
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
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


    /* ── 4. Modais de Privacidade e Termos ─────────────────── */
    const modal = document.getElementById('legal-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    const openPrivacy = document.getElementById('open-privacy');
    const openTerms = document.getElementById('open-terms');

    const contentPrivacy = `
        <p>Na Barbearia A37, valorizamos sua privacidade. Coletamos apenas os dados necessários para o agendamento de serviços, controle do Clube Exclusivo e comunicação essencial (como lembretes de horário via WhatsApp).</p>
        <p>Suas informações (nome, telefone, e-mail) não são vendidas ou compartilhadas com terceiros não autorizados. Utilizamos padrões de segurança adequados para proteger seus dados.</p>
        <p>Ao utilizar nosso site ou aplicativo de agendamento, você concorda com a coleta e uso das informações conforme descrito. Para dúvidas ou solicitação de exclusão de dados, entre em contato via WhatsApp.</p>
    `;

    const contentTerms = `
        <p>Bem-vindo à Barbearia A37. Ao agendar um serviço ou assinar o Clube Exclusivo, você concorda com nossos termos.</p>
        <ul>
            <li><strong>Agendamentos:</strong> Solicitamos pontualidade. Atrasos superiores a 15 minutos poderão resultar em cancelamento do horário para não prejudicar o próximo cliente.</li>
            <li><strong>Clube Exclusivo:</strong> O plano de assinatura é pessoal e intransferível. Oferece serviços ilimitados conforme o plano escolhido, restritos a um agendamento ativo por vez.</li>
            <li><strong>Cancelamento do Plano:</strong> Sem fidelidade. O cancelamento pode ser feito a qualquer momento antes da próxima cobrança, sem multas.</li>
            <li><strong>Conduta:</strong> Prezamos por um ambiente de respeito mútuo. A barbearia reserva-se o direito de recusar atendimento em caso de comportamento inadequado.</li>
        </ul>
    `;

    if (openPrivacy && openTerms && modal) {
        openPrivacy.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.textContent = 'Política de Privacidade';
            modalBody.innerHTML = contentPrivacy;
            modal.classList.add('active');
        });

        openTerms.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.textContent = 'Termos de Uso';
            modalBody.innerHTML = contentTerms;
            modal.classList.add('active');
        });

        closeModal.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }


    /* ── 5. Plan Info Modal ──────────────────────────────────── */
    const planDetails = {
        corte: {
            name: 'Plano Corte — R$ 69,90/mês',
            text: 'Ideal para quem gosta de manter o corte impecável em qualquer ocasião, com praticidade, prioridade e padrão A37 em cada atendimento.',
            note: 'Agendamento disponível nos dias de funcionamento pelo aplicativo Cashbarber ou pelo WhatsApp.'
        },
        barba: {
            name: 'Plano Barba — R$ 89,90/mês',
            text: 'Acabamento preciso, desenho alinhado e cuidado profissional para manter sua imagem sempre forte e elegante.',
            note: 'Agendamento disponível nos dias de funcionamento pelo aplicativo Cashbarber ou pelo WhatsApp.'
        },
        corte_barba: {
            name: 'Plano Corte + Barba — R$ 119,90/mês',
            text: 'Liberdade para manter cabelo e barba sempre em dia, sem preocupação e sem limites. Mais praticidade, autoestima e presença para quem exige o melhor da própria imagem.',
            note: 'Agendamento disponível nos dias de funcionamento pelo aplicativo Cashbarber ou pelo WhatsApp.'
        }
    };

    const planModal = document.getElementById('plan-modal');

    document.querySelectorAll('.plan-info-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const d = planDetails[btn.dataset.plan];
            document.getElementById('plan-modal-name').textContent = d.name;
            document.getElementById('plan-modal-text').textContent = d.text;
            document.getElementById('plan-modal-note').textContent = d.note;
            planModal.classList.add('active');
        });
    });

    document.getElementById('plan-modal-close').addEventListener('click', () => planModal.classList.remove('active'));
    planModal.addEventListener('click', e => { if (e.target === planModal) planModal.classList.remove('active'); });


    /* ── 6. Modal de Parceiros ───────────────────────────────── */
    const parceirosModal = document.getElementById('parceiros-modal');
    const openParceiros = document.getElementById('open-parceiros-modal');
    const closeParceiros = document.getElementById('close-parceiros-modal');

    if (parceirosModal && openParceiros) {
        openParceiros.addEventListener('click', () => parceirosModal.classList.add('active'));
        closeParceiros.addEventListener('click', () => parceirosModal.classList.remove('active'));
        parceirosModal.addEventListener('click', e => {
            if (e.target === parceirosModal) parceirosModal.classList.remove('active');
        });
    }


    /* ── 7. Touch interactions (mobile gallery) ─────────────────
       Em dispositivos touch hover não existe, então ativamos os
       efeitos da galeria via toque. Toca num card → abre; toca
       em outro → fecha o anterior e abre o novo.                */
    if (window.matchMedia('(hover: none)').matches) {
        const galleryCards = document.querySelectorAll('.gallery-card');

        galleryCards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('touch-active');
                galleryCards.forEach(c => c.classList.remove('touch-active'));
                if (!isActive) card.classList.add('touch-active');
            });
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('.gallery-card')) {
                galleryCards.forEach(c => c.classList.remove('touch-active'));
            }
        });
    }


    /* ── 8. Hamburger Menu ───────────────────────────────────── */
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

});
