// ========================================
// PORTFOLIO ANIMATIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // REVEAL ON SCROLL
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold:0.15

        });

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }

    // =====================================
    // STAGGER DELAY
    // =====================================

    const grids = document.querySelectorAll(

        ".credibility-grid, .about-highlights, .skills-grid, .projects-grid, .experience-grid"

    );

    grids.forEach(grid => {

        [...grid.children].forEach((item,index) => {

            item.style.transitionDelay = `${index * 120}ms`;

        });

    });

    // =====================================
    // COUNTERS
    // =====================================

    const counters = document.querySelectorAll(".number");

    if (counters.length) {

        const counterObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = Number(counter.dataset.target);

                if (isNaN(target)) return;

                const suffix = counter.textContent.includes("%") ? "%" : "+";

                let current = 0;

                const increment = Math.max(1, Math.ceil(target / 60));

                function updateCounter() {

                    current += increment;

                    if (current >= target) {

                        counter.textContent = target + suffix;

                    }

                    else{

                        counter.textContent = current + suffix;

                        requestAnimationFrame(updateCounter);

                    }

                }

                updateCounter();

                observer.unobserve(counter);

            });

        }, {

            threshold:.5

        });

        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }

    // =====================================
    // BUTTON RIPPLE
    // =====================================

    const buttons = document.querySelectorAll(

        ".btn-primary,.btn-secondary,.nav-cta"

    );

    buttons.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect = button.getBoundingClientRect();

            button.style.setProperty("--x", `${e.clientX - rect.left}px`);

            button.style.setProperty("--y", `${e.clientY - rect.top}px`);

        });

    });

    // =====================================
    // CARD TILT
    // =====================================

    const cards = document.querySelectorAll(

        ".credibility-card,.skill-card,.project-card,.highlight,.timeline-card"

    );

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 8;

            const rotateX = ((y / rect.height) - 0.5) * -8;

            card.style.transform =

                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});