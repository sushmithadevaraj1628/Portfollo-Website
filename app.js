// ====================================
// Portfolio Website - JavaScript
// ====================================

// ========== DARK MODE TOGGLE ==========
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    const toggleLink = document.getElementById('dark-mode-toggle');
    if (toggleLink) {
        toggleLink.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

// Initialize dark mode from localStorage
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const toggleLink = document.getElementById('dark-mode-toggle');
        if (toggleLink) {
            toggleLink.textContent = '☀️ Light Mode';
        }
    }
}

// ========== FORM VALIDATION ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let valid = true;
    let errorMessage = '';

    if (!name || name.value.trim() === '') {
        errorMessage += 'Name is required.\n';
        valid = false;
    }
    
    if (!email || email.value.trim() === '') {
        errorMessage += 'Email is required.\n';
        valid = false;
    } else if (!validateEmail(email.value)) {
        errorMessage += 'Please enter a valid email address.\n';
        valid = false;
    }
    
    if (!message || message.value.trim() === '') {
        errorMessage += 'Message is required.\n';
        valid = false;
    }

    if (!valid) {
        alert(errorMessage);
    }

    return valid;
}

// ========== SCROLL ANIMATIONS ==========
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.project, .blog-post, section');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// ========== SMOOTH SCROLLING ==========
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== 'javascript:void(0);') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ========== ACTIVE NAV INDICATOR ==========
function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== DOM CONTENT LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initializeDarkMode();
    
    // Setup dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDarkMode();
        });
    }

    // Setup form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm()) {
                alert('Message sent successfully! (This is a demo - implement backend to save messages)');
                this.reset();
            }
        });
    }

    // Setup scroll animations
    observeElements();
    
    // Setup smooth scrolling
    setupSmoothScroll();
    
    // Update active nav
    updateActiveNav();
});

// ========== SCROLL EVENT ==========
window.addEventListener('scroll', function() {
    // Add scroll effects here if needed
});

window.addEventListener('scroll', handleScrollAnimation);