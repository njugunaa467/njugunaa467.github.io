const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm && formMessage) {
    const submitBtn = contactForm.querySelector('button[type="submit"], button');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Show concise professional confirmation and keep it visible
        formMessage.textContent = 'Thanks — I will respond within 22 hours.';
        formMessage.classList.add('visible');
        // move focus to the message for screen readers
        try { formMessage.focus(); } catch (e) {}

        // Disable submit to prevent duplicates
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('disabled');
        }

        // Clear all form controls so user input does not remain
        try {
            contactForm.reset();
            // additionally clear any uncontrolled inputs
            contactForm.querySelectorAll('input, textarea').forEach(el => el.value = '');
        } catch (e) {
            // ignore
        }

        // Auto-hide message after 20 seconds and re-enable submit
        setTimeout(() => {
            formMessage.classList.remove('visible');
            formMessage.textContent = '';
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('disabled');
            }
        }, 20000);
    });
}

// ================================
// EXPERIENCE CARD 'READ MORE' TOGGLES
// ================================
(function(){
    const cards = document.querySelectorAll('.experience-card');

    cards.forEach(card => {
        const content = card.querySelector('.experience-content');
        if (!content) return;

        const details = content.querySelector('ul');

        // only add toggle if there are details to show
        if (!details) return;

        // ensure details hidden by default
        details.style.display = 'none';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'exp-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Read more';

        toggle.addEventListener('click', () => {
            const expanded = card.classList.toggle('expanded');
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            toggle.textContent = expanded ? 'Show less' : 'Read more';
            details.style.display = expanded ? 'block' : 'none';
            if (expanded) toggle.focus();
        });

        content.appendChild(toggle);
    });
})();
