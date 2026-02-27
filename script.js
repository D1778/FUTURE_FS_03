/**
 * Golden Crust Bakery - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Navigation Toggle
    // ----------------------------------------------------------------------
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ----------------------------------------------------------------------
    // 2. Sticky Header & Scroll Effects
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    
    // Check scroll position on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('navbar'); // Keep base class
            navbar.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------------------------
    // 3. Smooth Scrolling for Anchor Links
    // ----------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Ignore if it's just "#"
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Determine offset based on whether navbar is fixed
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. Scroll Reveal Animations
    // ----------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Fire when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated to play only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ----------------------------------------------------------------------
    // 5. Contact Form Submission Handling
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const btn = this.querySelector('button[type="submit"]');
            
            // Save original text
            const originalText = btn.innerHTML;
            
            // Visual feedback - loading state
            btn.innerHTML = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Success state
                btn.innerHTML = `✓ Thank you, ${name.split(' ')[0]}!`;
                btn.style.backgroundColor = '#4CAF50';
                btn.style.color = '#fff';
                btn.style.borderColor = '#4CAF50';
                btn.style.opacity = '1';
                
                // Reset form
                this.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    // Reset inline styles to let CSS take over
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                }, 3000);
                
            }, 1000);
        });
    }

    // ----------------------------------------------------------------------
    // 6. Active Navigation Highlighting
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // If scroll is past section top minus header offset
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Remove active class from all links
        navItems.forEach(item => {
            item.classList.remove('active');
            // If the href contains the current section id, add active class
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
