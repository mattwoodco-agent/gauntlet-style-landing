// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    const body = document.body;

    if (mobileMenuToggle && headerNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            headerNav.classList.toggle('mobile-open');
            body.classList.toggle('mobile-menu-open');
        });

        // Close mobile menu when clicking on a link
        const navLinks = headerNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('mobile-open');
                body.classList.remove('mobile-menu-open');
            });
        });
    }

    // Smooth scrolling for navigation links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial thumbnail switching
    const thumbnails = document.querySelectorAll('.thumbnail');
    const testimonialData = {
        1: {
            quote: "This solution completely transformed our business. The results exceeded our wildest expectations.",
            avatar: "👨‍💼",
            name: "John Smith",
            title: "CEO, TechCorp"
        },
        2: {
            quote: "Incredible innovation and flawless execution. Our productivity has increased by 300%.",
            avatar: "👩‍💻",
            name: "Sarah Chen",
            title: "CTO, InnovateLab"
        },
        3: {
            quote: "The most comprehensive and effective solution we've ever implemented. Absolutely revolutionary.",
            avatar: "👨‍🚀",
            name: "Mike Johnson",
            title: "Director, FutureTech"
        },
        4: {
            quote: "Exceptional results in record time. This platform has redefined what's possible for our industry.",
            avatar: "👩‍🔬",
            name: "Dr. Lisa Wong",
            title: "Head of Research, BioAdvance"
        }
    };

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Get the testimonial number
            const testimonialNum = this.getAttribute('data-testimonial');
            const data = testimonialData[testimonialNum];
            
            if (data) {
                // Update the main testimonial content
                const testimonialQuote = document.querySelector('.testimonial-quote');
                const authorAvatar = document.querySelector('.author-avatar');
                const authorName = document.querySelector('.author-name');
                const authorTitle = document.querySelector('.author-title');
                
                if (testimonialQuote) testimonialQuote.textContent = data.quote;
                if (authorAvatar) authorAvatar.textContent = data.avatar;
                if (authorName) authorName.textContent = data.name;
                if (authorTitle) authorTitle.textContent = data.title;
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });

    // Form submission (basic validation)
    const contactForm = document.querySelector('.premium-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Basic validation
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! Your message has been sent. We\'ll be in touch soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Parallax effect for hero background
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }

        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    const animatedElements = document.querySelectorAll('.trusted-section, .ai-first-engineering-section, .images-section, .contact-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.logo-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Typing effect for hero headline (optional enhancement)
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        const originalText = heroHeadline.innerHTML;
        
        // Only run typing effect on desktop
        if (window.innerWidth > 768) {
            heroHeadline.innerHTML = '';
            heroHeadline.style.opacity = '1';
            
            let index = 0;
            const text = originalText.replace(/<[^>]*>/g, ''); // Remove HTML for typing
            
            function typeText() {
                if (index < text.length) {
                    heroHeadline.innerHTML = originalText.substring(0, index + 1);
                    index++;
                    setTimeout(typeText, 50);
                }
            }
            
            // Start typing after a short delay
            setTimeout(() => {
                heroHeadline.innerHTML = originalText; // Show complete text with formatting
            }, 100);
        }
    }

    // Add loading animation for form
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update scroll-dependent functions with debouncing
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-dependent code can go here
}, 10), { passive: true });