// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    const toggleMenu = () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialLive = document.getElementById('testimonial-live');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (!testimonialCards.length || !testimonialDots.length) return;

    // Hide all testimonials and reset dot states
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        card.setAttribute('aria-hidden', 'true');
    });
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
        dot.setAttribute('aria-current', 'false');
    });
    
    // Show selected testimonial
    testimonialCards[index].classList.add('active');
    testimonialCards[index].setAttribute('aria-hidden', 'false');
    testimonialDots[index].classList.add('active');
    testimonialDots[index].setAttribute('aria-current', 'true');
    
    currentTestimonial = index;

    // Update live region announcement
    if (testimonialLive) {
        const total = testimonialCards.length;
        const author = testimonialCards[index].querySelector('.testimonial-author h4');
        const authorName = author ? author.textContent.trim() : '';
        testimonialLive.textContent = `Showing testimonial ${index + 1} of ${total}${authorName ? ': ' + authorName : ''}`;
    }
}

// Add click handlers to dots
if (testimonialDots.length && testimonialCards.length) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
}

// Auto-rotate testimonials every 5 seconds
if (testimonialCards.length > 1) {
    setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }, 5000);
}

// Smooth scrolling for anchor links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav-container');
    if (!navbar) return;
    const bg = 'rgba(251, 248, 239, 0.95)'; // match nav default color
    const scrolled = window.scrollY > 100;
    navbar.style.background = bg;
    navbar.style.boxShadow = scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Intro section reveal
    const intro = document.querySelector('.intro-content');
    if (intro) {
        intro.classList.add('is-animated');
        const introObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    intro.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        introObserver.observe(intro);
    }
});

// Form validation and submission (for contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add loading states for buttons
function addLoadingState(button, originalText) {
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${originalText}`;
    
    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
    }, 2000);
}

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Basic validation
            const email = form.querySelector('input[type="email"]');
            const name = form.querySelector('input[name="name"]');
            const message = form.querySelector('textarea');
            
            if (!name || !name.value.trim()) {
                alert('Please enter your name.');
                return;
            }
            
            if (!email || !validateEmail(email.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (!message || !message.value.trim()) {
                alert('Please enter a message.');
                return;
            }
            
            // Add loading state
            addLoadingState(submitButton, 'Sending...');
            
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            setTimeout(() => {
                alert('Thank you for your message! Flora will get back to you soon.');
                form.reset();
            }, 2000);
        });
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 50);
    });
}

// Trigger stats animation when in viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.intro-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Preload critical fonts and images
document.addEventListener('DOMContentLoaded', () => {
    const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
    ];
    
    fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Initialize all features safely
document.addEventListener('DOMContentLoaded', () => {
    // Safe initialization of features that might not exist on all pages
    safeQuerySelector('.testimonials-slider', () => {
        console.log('Testimonials slider initialized');
    });
    
    safeQuerySelector('.hero', () => {
        console.log('Hero section initialized');
    });
    
    console.log('Flora Anafcheh website loaded successfully!');
});
