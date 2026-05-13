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

    /* ── 4. Modais de Privacidade e Termos ─────────────────── */
    const modal = document.getElementById('legal-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    const openPrivacy = document.getElementById('open-privacy');
    const openTerms = document.getElementById('open-terms');

    const contentPrivacy = `
        <p>Na Barbearia A37, valorizamos sua privacidade. Coletamos apenas os dados necessários para o agendamento de serviços, controle do Clube Exclusive e comunicação essencial (como lembretes de horário via WhatsApp).</p>
        <p>Suas informações (nome, telefone, e-mail) não são vendidas ou compartilhadas com terceiros não autorizados. Utilizamos padrões de segurança adequados para proteger seus dados.</p>
        <p>Ao utilizar nosso site ou aplicativo de agendamento, você concorda com a coleta e uso das informações conforme descrito. Para dúvidas ou solicitação de exclusão de dados, entre em contato via WhatsApp.</p>
    `;

    const contentTerms = `
        <p>Bem-vindo à Barbearia A37. Ao agendar um serviço ou assinar o Clube Exclusive, você concorda com nossos termos.</p>
        <ul>
            <li><strong>Agendamentos:</strong> Solicitamos pontualidade. Atrasos superiores a 15 minutos poderão resultar em cancelamento do horário para não prejudicar o próximo cliente.</li>
            <li><strong>Clube Exclusive:</strong> O plano de assinatura é pessoal e intransferível. Oferece serviços ilimitados conforme o plano escolhido, restritos a um agendamento ativo por vez.</li>
            <li><strong>Cancelamento do Plano:</strong> Sem fidelidade. O cancelamento pode ser feito a qualquer momento antes da próxima cobrança, sem multas.</li>
            <li><strong>Conduta:</strong> Prezamos por um ambiente de respeito mútuo. A barbearia reserva-se o direito de recusar atendimento em caso de comportamento inadequado.</li>
        </ul>
    `;

    if(openPrivacy && openTerms && modal) {
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

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Fechar ao clicar fora do modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

});
