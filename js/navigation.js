// ================================
// MOBILE NAVIGATION
// ================================

const burgerBtn = document.getElementById("burgerBtn");
const mobileNav = document.getElementById("mobileNav");

if (burgerBtn && mobileNav) {

    burgerBtn.addEventListener("click", () => {

        const expanded =
            burgerBtn.getAttribute("aria-expanded") === "true";

        burgerBtn.setAttribute("aria-expanded", !expanded);

        burgerBtn.classList.toggle("active");
        mobileNav.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

}


// ================================
// CLOSE MOBILE MENU
// ================================

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        burgerBtn.classList.remove("active");

        mobileNav.classList.remove("active");

        burgerBtn.setAttribute("aria-expanded", false);

        document.body.classList.remove("menu-open");

    });

});


// ================================
// CLOSE ON OUTSIDE CLICK
// ================================

document.addEventListener("click", (e) => {

    if (
        !mobileNav.contains(e.target) &&
        !burgerBtn.contains(e.target)
    ) {

        burgerBtn.classList.remove("active");

        mobileNav.classList.remove("active");

        burgerBtn.setAttribute("aria-expanded", false);

        document.body.classList.remove("menu-open");

    }

});


// ================================
// STICKY NAVBAR
// ================================

const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ================================
// ACTIVE NAV LINKS
// ================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function activateNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", activateNav);

activateNav();


// ================================
// SMOOTH SCROLL
// ================================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});


// Close mobile menu when resizing to desktop to avoid stuck states
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        if (burgerBtn) burgerBtn.classList.remove('active');
        if (mobileNav) mobileNav.classList.remove('active');
        if (burgerBtn) burgerBtn.setAttribute('aria-expanded', false);
        document.body.classList.remove('menu-open');
    }
});