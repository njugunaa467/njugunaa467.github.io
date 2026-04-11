
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    const setMenuState = (isOpen) => {
        mobileMenu.classList.toggle('active', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
    };

    mobileMenuBtn.addEventListener('click', () => {
        setMenuState(!mobileMenu.classList.contains('active'));
    });

    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formStatus = document.createElement('div');
    formStatus.className = 'form-status';
    formStatus.setAttribute('aria-live', 'polite');
    contactForm.prepend(formStatus);

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Sending...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            formStatus.classList.remove('success', 'error');
            if (response.ok) {
                formStatus.textContent = 'Thanks! Your message has been sent.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                const data = await response.json();
                formStatus.textContent = data.error || 'Oops! There was a problem sending your message.';
                formStatus.classList.add('error');
            }
        } catch (error) {
            formStatus.classList.remove('success', 'error');
            formStatus.textContent = 'Network error. Please try again later.';
            formStatus.classList.add('error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .capability-card, .project-card, .proof-item, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


const animateMetrics = () => {
    const metrics = document.querySelectorAll('.metric-value');
    let animated = false;

    const metricObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            metrics.forEach(metric => {
                const finalValue = metric.textContent;
                const isPercentage = finalValue.includes('%');
                const isPlus = finalValue.includes('+');
                
                if (isPercentage || isPlus) {
                    const numericValue = parseInt(finalValue);
                    let currentValue = 0;
                    const increment = numericValue / 50;

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(counter);
                        }
                        metric.textContent = Math.floor(currentValue) + (isPercentage ? '%' : isPlus ? '+' : '');
                    }, 30);
                }
            });
        }
    }, observerOptions);

    metrics.forEach(metric => metricObserver.observe(metric));
};

animateMetrics();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu) {
        mobileMenu.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
});
