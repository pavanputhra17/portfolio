/* =========================================================
   Portfolio — Main Script
   Features: Navbar, Hamburger, Smooth Scroll, Scroll Progress,
             Scroll Reveal, Contact Form with EmailJS
   ========================================================= */

(function () {
    'use strict';

    /* ---------- DOM References ---------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollBar = document.getElementById('scrollProgress');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const sections = document.querySelectorAll('.section');

    /* ---------- EmailJS Init (replace with real keys) ---------- */
    // eslint-disable-next-line no-undef
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
    }

    /* ---------- Navbar scroll effect ---------- */
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ---------- Active nav link highlighting ---------- */
    function highlightActiveLink() {
        var scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ---------- Scroll progress bar ---------- */
    function updateScrollProgress() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollBar.style.width = scrollPercent + '%';
    }

    /* ---------- Combined scroll handler ---------- */
    function onScroll() {
        handleNavScroll();
        highlightActiveLink();
        updateScrollProgress();
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Hamburger toggle ---------- */
    hamburger.addEventListener('click', function () {
        var isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close menu on link click */
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    /* Close menu on outside click */
    document.addEventListener('click', function (e) {
        if (
            navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    /* ---------- Smooth scroll for anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        /* Fallback: show everything immediately */
        revealElements.forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    /* ---------- Contact Form Validation & Submit ---------- */
    function validateField(input, errorEl, message) {
        if (!input.value.trim()) {
            input.classList.add('invalid');
            errorEl.textContent = message;
            return false;
        }
        input.classList.remove('invalid');
        errorEl.textContent = '';
        return true;
    }

    function validateEmail(input, errorEl) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value.trim()) {
            input.classList.add('invalid');
            errorEl.textContent = 'Email is required.';
            return false;
        }
        if (!emailRegex.test(input.value.trim())) {
            input.classList.add('invalid');
            errorEl.textContent = 'Please enter a valid email address.';
            return false;
        }
        input.classList.remove('invalid');
        errorEl.textContent = '';
        return true;
    }

    /* Remove error state on input */
    var formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                var errorId = input.id.replace('user', '').replace('E', 'e').replace('N', 'n').replace('M', 'm') + 'Error';
                var errorEl = document.getElementById(errorId);
                if (errorEl) errorEl.textContent = '';
            }
        });
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameInput = document.getElementById('userName');
        var emailInput = document.getElementById('userEmail');
        var messageInput = document.getElementById('userMessage');
        var nameError = document.getElementById('nameError');
        var emailError = document.getElementById('emailError');
        var messageError = document.getElementById('messageError');

        /* Validate all fields */
        var isNameValid = validateField(nameInput, nameError, 'Name is required.');
        var isEmailValid = validateEmail(emailInput, emailError);
        var isMessageValid = validateField(messageInput, messageError, 'Message is required.');

        if (!isNameValid || !isEmailValid || !isMessageValid) return;

        /* Show loading state */
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        /* Send via EmailJS (placeholder — replace service/template IDs) */
        if (typeof emailjs !== 'undefined') {
            emailjs
                .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    user_name: nameInput.value.trim(),
                    user_email: emailInput.value.trim(),
                    message: messageInput.value.trim(),
                })
                .then(
                    function () {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.className = 'form-status success';
                        contactForm.reset();
                    },
                    function () {
                        formStatus.textContent = 'Failed to send message. Please try again later.';
                        formStatus.className = 'form-status error';
                    }
                )
                .finally(function () {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                });
        } else {
            /* EmailJS not loaded — simulate success for demo */
            setTimeout(function () {
                formStatus.textContent = 'Message sent successfully! (demo mode)';
                formStatus.className = 'form-status success';
                contactForm.reset();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 1200);
        }
    });

    /* ---------- Run on load ---------- */
    onScroll();
})();
