// Improved navigation with smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // If target section exists, scroll to it smoothly
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.bars');
    const dropdownList = document.querySelector('.dropdown-list');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (dropdownList.style.display === 'block') {
                dropdownList.style.display = 'none';
            } else {
                dropdownList.style.display = 'block';
            }
        });
    }
    
    // Close mobile nav when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.dropdown-list a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                dropdownList.style.display = 'none';
            }
        });
    });
    
    // Initialize skill animation
    initSkillAnimation();
    
    // Initialize contact form validation
    initContactForm();
});

// Initialize project filters — called after async render with the live projects array
function initProjectFilters(projects) {
    const filterContainer = document.getElementById('project-filters');

    if (filterContainer) {
        const techTags = new Set();
        projects.forEach(project => {
            project.techStack.forEach(tech => techTags.add(tech));
        });

        let filterHTML = '<button class="filter-btn active" data-filter="all">All</button>';
        techTags.forEach(tech => {
            filterHTML += `<button class="filter-btn" data-filter="${tech}">${tech}</button>`;
        });
        filterContainer.innerHTML = filterHTML;

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                document.querySelectorAll('.portfolio-item').forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else {
                        const projectId = item.getAttribute('data-id');
                        const project = projects.find(p => p.id === projectId);
                        item.style.display = (project && project.techStack.includes(filter)) ? 'flex' : 'none';
                    }
                });
            });
        });
    }
}

// Animate skill bars on scroll
function initSkillAnimation() {
    const skills = document.querySelector('.skills-display');
    
    if (skills) {
        const skillBars = document.querySelectorAll('.skill-progress > div');
        
        // Reset skill bars initially
        skillBars.forEach(bar => {
            bar.style.width = '0';
        });
        
        // Animate skill bars when they come into view
        window.addEventListener('scroll', function() {
            const skillsPosition = skills.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (skillsPosition < windowHeight - 100) {
                skillBars.forEach(bar => {
                    // Get the width class from the bar
                    const classes = bar.className.split(' ');
                    let width = '80%'; // Default width
                    
                    if (classes.includes('eighty-five-percent')) {
                        width = '85%';
                    } else if (classes.includes('eighty-percent')) {
                        width = '80%';
                    } else if (classes.includes('fifty-percent')) {
                        width = '50%';
                    }
                    
                    // Animate the width
                    bar.style.width = width;
                    bar.style.transition = 'width 1s ease-in-out';
                });
            }
        });
    }
}

// Contact form with Formspree integration
// Sign up at https://formspree.io and replace YOUR_FORM_ID below
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('input-name').value.trim();
            const email = document.getElementById('input-email').value.trim();
            const message = document.getElementById('input-message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Something went wrong. Please try emailing me directly.');
                }
            })
            .catch(() => {
                alert('Something went wrong. Please try emailing me directly.');
            })
            .finally(() => {
                submitBtn.textContent = 'SEND MESSAGE';
                submitBtn.disabled = false;
            });
        });
    }
}