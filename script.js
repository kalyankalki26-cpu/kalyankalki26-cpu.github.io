// =========================
// MOBILE MENU (hamburger)
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu when clicking anywhere else
document.addEventListener("click", function (event) {
    if (!navLinks.contains(event.target)) {
        closeMenu();
    }
});


// =========================
// SMOOTH SCROLLING
// (nav links + hero buttons + any other #link)
// =========================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const id = this.getAttribute("href");

        if (id.length < 2) return;

        const target = document.querySelector(id);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            closeMenu();
        }

    });

});


// =========================
// TYPING ANIMATION
// =========================

const typingElement = document.querySelector(".hero-text h2");

const typingTexts = [
    "Computer Science Engineering Student",
    "Programmer",
    "Problem Solver",
    "Web Development Learner"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

    const currentText = typingTexts[textIndex];

    if (!deleting) {

        charIndex++;
        typingElement.textContent = currentText.substring(0, charIndex);

        // Finished typing: pause, then start deleting
        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typingEffect, 1500);
            return;
        }

    } else {

        charIndex--;
        typingElement.textContent = currentText.substring(0, charIndex);

        // Finished deleting: move to the next text
        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }

    setTimeout(typingEffect, deleting ? 45 : 75);
}

typingEffect();


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        },

        { threshold: 0.15 }

    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {

    // Very old browsers: just show everything
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });

}


// =========================
// SCROLL EFFECTS
// (progress bar, active nav link, scroll-to-top button)
// =========================

const progressBar = document.querySelector(".scroll-progress");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const scrollTopBtn = document.getElementById("scrollTopBtn");

function onScroll() {

    const scrollTop = window.scrollY;

    // Progress bar
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    progressBar.style.width = scrollPercentage + "%";

    // Active navbar link
    let currentSection = "";

    sections.forEach(function (section) {
        if (scrollTop >= section.offsetTop - 150) {
            currentSection = section.getAttribute("id");
        }
    });

    // At the very bottom, highlight the last section
    if (window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 2) {
        currentSection = sections[sections.length - 1].getAttribute("id");
    }

    navItems.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });

    // Scroll-to-top button
    scrollTopBtn.classList.toggle("show", scrollTop > 400);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

scrollTopBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================
// FOOTER YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================
// DARK / LIGHT THEME
// =========================

const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme) {

    root.setAttribute("data-theme", theme);

    // Moon icon in dark mode, sun icon in light mode
    themeBtn.innerHTML = theme === "dark" ? "&#9790;" : "&#9728;";

    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        // Storage not available: ignore
    }
}

try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
    }
} catch (error) {
    // Storage not available: keep default dark theme
}

themeBtn.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});
