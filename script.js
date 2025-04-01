// Navigation and Section Switching
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const ctaButtons = document.querySelectorAll('.cta-button');
const logo = document.querySelector('.logo a');

// Function to switch sections
function switchSection(sectionId) {
    // Remove active class from all sections and nav links
    sections.forEach(section => {
        section.classList.remove('active');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to target section and nav link
    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection && targetLink) {
        targetSection.classList.add('active');
        targetLink.classList.add('active');
    }

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Handle logo click
logo.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection('home');
});

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        switchSection(sectionId);
    });
});

// Handle CTA button clicks
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = button.getAttribute('data-section');
        switchSection(sectionId);
    });
});

// Handle talk-to-contact link click
const talkToContactLink = document.querySelector('.talk-to-contact');
if (talkToContactLink) {
    talkToContactLink.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = talkToContactLink.getAttribute('data-section');
        switchSection(sectionId);
    });
}

// Handle name-highlight link click
const nameHighlightLink = document.querySelector('.name-highlight');
if (nameHighlightLink) {
    nameHighlightLink.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = nameHighlightLink.getAttribute('data-section');
        switchSection(sectionId);
    });
}

// Mobile menu toggle
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Form Submission
const contactForm = document.getElementById('contact-form');

function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = contactForm.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create and show new message
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    messageElement.textContent = message;
    contactForm.appendChild(messageElement);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        // Using EmailJS service for form submission
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY');
        
        // Show success message
        showMessage('Message sent successfully!', 'success');
        
        // Clear form
        contactForm.reset();
    } catch (error) {
        // Show error message
        showMessage('Failed to send message. Please try again.', 'error');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.hero-text, .about-text, .skills-container, .contact-info, .contact-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Initialize the first section
document.addEventListener('DOMContentLoaded', () => {
    switchSection('home');
}); 