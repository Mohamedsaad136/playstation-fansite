document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-value');
    const glowTexts = document.querySelectorAll('.section-four h2, .plus h3');
    const duration = 3000;
    const animateCounter = (el) => {

        const targetText = el.innerText;
        const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
        const suffix = targetText.replace(/[0-9]/g, '');
        let startTime = null;
        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuad = (t) => t * (2 - t);
            const easedProgress = easeOutQuad(progress);
            const currentCount = Math.floor(easedProgress * targetNumber);
            const formattedCount = currentCount.toLocaleString();
            el.innerText = formattedCount + suffix;
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = targetText;
            }
        };
        requestAnimationFrame(updateCount);
    };
    const observerOptions = {
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter-value')) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                } else if (Array.from(glowTexts).includes(entry.target)) {
                    entry.target.classList.add('animate-glow');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, 
    observerOptions);
    counters.forEach(counter => observer.observe(counter));
    glowTexts.forEach(text => observer.observe(text));
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        
        if (window.scrollY > lastScrollY && window.scrollY > 20) {
            nav.classList.add('nav-up');
        } else {
            nav.classList.remove('nav-up');
        }
        lastScrollY = window.scrollY;
    });
});


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 40,
    centeredSlides: true,
    loop: true,
    speed: 2000,
    cssEase: "ease-in-out",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
let items = document.querySelectorAll(".item");
items.forEach(item => {
    let video = item.querySelector("video");
    let muteBtn = item.querySelector(".mute-btn");
    let icon = muteBtn ? muteBtn.querySelector("i") : null;
    item.addEventListener("mouseenter", () => {
        video.play();
    });
    item.addEventListener("mouseleave", () => {
        video.pause();
    });
    if (muteBtn) {
        muteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            if (video.muted) {
                icon.classList.replace("fa-volume-high", "fa-volume-xmark");
            } else {
                icon.classList.replace("fa-volume-xmark", "fa-volume-high");
            }
        });
    }
});