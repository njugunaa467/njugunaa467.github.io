const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm && formMessage) {
    const submitBtn = contactForm.querySelector('button[type="submit"], button');
    const endpoint = contactForm.getAttribute('action') || '';

    const showFeedback = (message, isError = false) => {
        formMessage.textContent = message;
        formMessage.classList.toggle('visible', true);
        formMessage.classList.toggle('error', isError);
        formMessage.classList.toggle('success', !isError);
        try { formMessage.focus(); } catch (e) {}
    };

    const resetFormFields = () => {
        try {
            contactForm.reset();
            contactForm.querySelectorAll('input, textarea').forEach(el => el.value = '');
        } catch (e) {
            // ignore
        }
    };

    const setSubmittingState = (isSubmitting) => {
        if (submitBtn) {
            submitBtn.disabled = isSubmitting;
            submitBtn.classList.toggle('disabled', isSubmitting);
            submitBtn.textContent = isSubmitting ? 'Sending...' : 'Send Message';
        }
    };

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        setSubmittingState(true);
        showFeedback('Sending your message...');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(contactForm)
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            resetFormFields();
            showFeedback('Thanks — I will respond within 22 hours.');
        } catch (error) {
            showFeedback('Sorry, your message could not be sent. Please email me directly at alexnjuguna602@gmail.com.', true);
        } finally {
            setSubmittingState(false);
        }
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
