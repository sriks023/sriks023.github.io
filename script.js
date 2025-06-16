// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header Shadow ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add shadow after scrolling 50px
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Hamburger Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // Close menu when clicking outside (optional)
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });


    // --- Scroll Reveal Animations ---
    const animateElements = document.querySelectorAll('.fade-in, .animate-slide-up, .animate-fade-in-delay');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.classList.remove('hidden'); // Ensure hidden is removed
                // Optionally, unobserve after revealing to save resources if animation runs once
                // observer.unobserve(entry.target);
            } else {
                // If you want elements to re-animate on scroll up/down, remove these lines
                // entry.target.classList.remove('revealed');
                // entry.target.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust reveal point (e.g., 50px before entering viewport bottom)
    });

    animateElements.forEach(element => {
        element.classList.add('hidden'); // Add hidden class initially
        observer.observe(element);
    });

    // --- Optional: Add 'active' class to current nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust as needed
                current = section.getAttribute('id');
            }
        });

        navMenu.querySelectorAll('a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

});
