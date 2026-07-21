/* ==========================================================================
   SRI SAI Vidyalaya HIGH SCHOOL - SCRIPT
   Interactivity, Animations, Countdowns, and Validations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Loading Screen dismiss
    // ==========================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    });

    // Fallback if window load doesn't trigger quickly
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    }, 2000);

    // ==========================================
    // 3. Theme Switcher (Dark/Light mode)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // ==========================================
    // 4. Sticky Header navbar & Scroll Progress
    // ==========================================
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        // Sticky Header class toggler
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Scroll Progress Bar percentage mapping
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
            const scrollPercentage = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        }
    });

    // ==========================================
    // 5. Mobile Hamburger Navigation Menu
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        const toggleMenu = () => {
            const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !expanded);
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        };

        hamburgerBtn.addEventListener('click', toggleMenu);

        // Collapse mobile menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // ==========================================
    // 6. Typing Effect (School Title in Hero)
    // ==========================================
    const schoolNameEl = document.getElementById('typingSchoolName');
    if (schoolNameEl) {
        const textToType = "Sri Sai Vidyalaya High School";
        let index = 0;
        
        const typeEffect = () => {
            if (index < textToType.length) {
                schoolNameEl.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeEffect, 80);
            }
        };
        // Trigger with slight delay after load
        setTimeout(typeEffect, 800);
    }

    // ==========================================
    // 7. Scroll Reveal Animations (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-left, .reveal-right, .reveal-zoom');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback if IntersectionObserver not supported
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // ==========================================
    // 8. Statistics Counter animation
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.getElementById('statsSection');
    
    if (statNumbers.length > 0 && statsSection) {
        let animated = false;
        
        const startCounter = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const duration = 2000; // 2 seconds animation
                const increment = target / (duration / 16); // ~60fps
                let current = 0;
                
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateCount();
            });
        };
        
        if ('IntersectionObserver' in window) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animated) {
                        startCounter();
                        animated = true;
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            statsObserver.observe(statsSection);
        } else {
            // Fallback
            startCounter();
        }
    }

    // ==========================================
    // 9. Notice Board Auto-Scrolling loops
    // ==========================================
    const ticker = document.getElementById('noticeTicker');
    const tickerWrapper = document.getElementById('noticeTickerWrapper');
    
    if (ticker && tickerWrapper) {
        // Clone the content elements inside the ticker to allow seamless continuous flow
        const items = Array.from(ticker.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            ticker.appendChild(clone);
        });
        
        // Total heights of notices
        let totalHeight = 0;
        items.forEach(item => {
            totalHeight += item.offsetHeight + 16; // Add margin bottom
        });
        
        // Set dynamic animation keyframe if browser supports it
        // Or we rely on CSS loop which moves down and restarts
    }

    // ==========================================
    // 10. Annual Day Countdown Timer
    // ==========================================
    const countdown = document.getElementById('countdownTimer');
    
    if (countdown) {
        const targetDateString = countdown.getAttribute('data-date');
        const targetDate = new Date(targetDateString).getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                // Event arrived
                document.getElementById('days').textContent = "00";
                document.getElementById('hours').textContent = "00";
                document.getElementById('minutes').textContent = "00";
                document.getElementById('seconds').textContent = "00";
                clearInterval(countdownInterval);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        };
        
        updateCountdown(); // Run immediately
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // ==========================================
    // 11. Academics Cards Modal Content Injector
    // ==========================================
    const modal = document.getElementById('academicModal');
    const modalBody = document.getElementById('academicModalBody');
    const modalClose = document.getElementById('academicModalClose');
    const triggers = document.querySelectorAll('.academic-modal-trigger');

    // Program static copy database
    const programDetails = {
        'pre-primary': {
            title: 'Pre Primary Program',
            desc: 'Our Pre Primary wing focuses on creating an environment that feels like a second home. Through our structured play-based curriculum, we stimulate primary cognitive growth, language learning, and visual coordination.',
            curriculum: [
                'Montessori integrated sensory learning activities',
                'Introductory phonics and phonological word structures',
                'Basic mathematics concepts using abacus frameworks',
                'Social communication, behavior tracking, and emotional resilience building'
            ],
            activities: [
                'Clay molding & pottery sessions',
                'Color coordination and drawing classes',
                'Weekly music sing-alongs and puppet theatre storytelling'
            ]
        },
        'primary': {
            title: 'Primary School Program',
            desc: 'The Primary School curriculum aims at developing key reading, writing, mathematical thinking, and general inquiry skills in students. We guide students from passive listening to creative questioners.',
            curriculum: [
                'Cambridge Primary Core English frameworks',
                'Mathematical concepts, logical puzzles and coding foundations',
                'Environmental Studies (EVS) introducing basic scientific theories',
                'Second language programs (Hindi / French / German)'
            ],
            activities: [
                'Weekly swimming and aquatic safety lessons',
                'Mental Math competitions and spell bee drills',
                'Public speaking exercises and youth mock press conferences'
            ]
        },
        'middle': {
            title: 'Middle School Program',
            desc: 'Our Middle School program builds on foundation competencies to introduce advanced conceptual domains. Focus shifts toward analytical logic, group project works, and multi-disciplinary learning.',
            curriculum: [
                'Separate fields: Physics, Chemistry, and Biology studies',
                'Algebraic systems, geometry modeling, and statistics analyses',
                'Social Sciences covering world history, geomorphology, and civics duties',
                'Computer science curricula containing Scratch and Python programming'
            ],
            activities: [
                'Robotics building tournaments and IoT prototyping clubs',
                'English and bilingual inter-house debates',
                'Standard laboratory experiments and chemistry labs visits'
            ]
        },
        'high': {
            title: 'High School Program',
            desc: 'The High School curriculum prepares students for national board examinations and secondary school certificates, demanding dedicated study habits and problem-solving excellence.',
            curriculum: [
                'Comprehensive Mathematics (Calculus, Trigonometry, Statistics)',
                'Advanced Sciences streams (Organic Chemistry, Mechanics, Bio-energetics)',
                'Global perspectives and humanitarian economics research',
                'Advanced Coding courses (Java programming & database paradigms)'
            ],
            activities: [
                'Model United Nations (MUN) simulation summits',
                'Science fair exhibitions and prototype setups',
                'Creative drama acting, direction, and theatrical productions'
            ]
        },
        'senior': {
            title: 'Senior Secondary Program',
            desc: 'Preparing students directly for university entries. We offer stream selections across Science (Medical/Non-Medical), Commerce, and Humanities with career guidance counselling programs.',
            curriculum: [
                'Physics: Electromagnetism, Quantum theory; Chemistry: Thermodynamics',
                'Advanced Accountancy, Business Studies, and Economics theorems',
                'Psychology, History, Political structures, and Sociology modules',
                'Comprehensive test preparation drills for international university admissions'
            ],
            activities: [
                'Academic research internships and corporate industrial tours',
                'Under-18 school football, basketball, and athletics training camps',
                'Student Council leadership campaigns and social work drives'
            ]
        }
    };

    if (modal && modalBody && modalClose && triggers.length > 0) {
        const openModal = (programKey) => {
            const data = programDetails[programKey];
            if (!data) return;
            
            // Build modal HTML structure dynamically
            let htmlContent = `
                <div class="academic-modal-body">
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                    <div class="modal-section-title">Academic Curriculum Focus</div>
                    <ul class="modal-list">
                        ${data.curriculum.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <div class="modal-section-title">Co-Curricular Activities</div>
                    <ul class="modal-list">
                        ${data.activities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            modalBody.innerHTML = htmlContent;
            modal.removeAttribute('hidden');
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            document.body.style.overflow = 'hidden'; // Lock main scroll
        };

        const closeModal = () => {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            setTimeout(() => {
                modal.setAttribute('hidden', 'true');
                modalBody.innerHTML = '';
            }, 300);
            document.body.style.overflow = ''; // Unlock main scroll
        };

        triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                const programKey = btn.getAttribute('data-program');
                openModal(programKey);
            });
        });

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // ==========================================
    // 12. Gallery Filter & Lightbox Viewer
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let activeImages = []; // Stores filtered items for navigation
    let currentIndex = 0;

    // Gallery Category filtering
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        const filterGallery = (category) => {
            activeImages = [];
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Show if all matches or match category
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.classList.add('reveal-zoom', 'revealed');
                    activeImages.push(item);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('revealed');
                }
            });
        };

        // Initialize activeImages with all gallery items initially
        filterGallery('all');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active button design
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                filterGallery(filterValue);
            });
        });
    }

    // Lightbox Functionality
    if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
        const updateLightboxImage = () => {
            const currentItem = activeImages[currentIndex];
            if (!currentItem) return;
            
            const imgElement = currentItem.querySelector('img');
            const captionElement = currentItem.querySelector('h4');
            
            if (imgElement && captionElement) {
                lightboxImg.src = imgElement.src;
                lightboxImg.alt = imgElement.alt;
                lightboxCaption.textContent = captionElement.textContent;
            }
        };

        const openLightbox = (index) => {
            currentIndex = index;
            updateLightboxImage();
            lightbox.removeAttribute('hidden');
            lightbox.style.opacity = '1';
            lightbox.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightbox.style.visibility = 'hidden';
            setTimeout(() => {
                lightbox.setAttribute('hidden', 'true');
            }, 300);
            document.body.style.overflow = '';
        };

        // Bind clicks on gallery item wrappers
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Find current item index within the active filtered array
                const index = activeImages.indexOf(item);
                if (index !== -1) {
                    openLightbox(index);
                }
            });
        });

        // Navigation actions
        lightboxNext.addEventListener('click', () => {
            if (activeImages.length > 0) {
                currentIndex = (currentIndex + 1) % activeImages.length;
                updateLightboxImage();
            }
        });

        lightboxPrev.addEventListener('click', () => {
            if (activeImages.length > 0) {
                currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
                updateLightboxImage();
            }
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard support for gallery
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.visibility === 'visible') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight' && activeImages.length > 0) {
                    currentIndex = (currentIndex + 1) % activeImages.length;
                    updateLightboxImage();
                }
                if (e.key === 'ArrowLeft' && activeImages.length > 0) {
                    currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
                    updateLightboxImage();
                }
            }
        });
    }

    // ==========================================
    // 13. Testimonials Slider Carousel
    // ==========================================
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (slider) {
        const slides = Array.from(slider.children);
        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
        let currentSlide = 0;
        let slideInterval;
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                    if (dots[i]) dots[i].classList.add('active');
                } else {
                    slide.classList.remove('active');
                    if (dots[i]) dots[i].classList.remove('active');
                }
            });
            currentSlide = index;
        };

        const nextSlide = () => {
            const nextIdx = (currentSlide + 1) % slides.length;
            showSlide(nextIdx);
        };

        const prevSlide = () => {
            const prevIdx = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIdx);
        };

        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5s switch
        };

        const stopAutoSlide = () => {
            clearInterval(slideInterval);
        };

        // Navigation clicks
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        // Dot navigation
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Pause automatic slideshow on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        // Initial launch
        startAutoSlide();
    }

    // ==========================================
    // 14. FAQ Accordion Toggle heights
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            const answer = btn.nextElementSibling;
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            
            // Toggle active designs
            btn.setAttribute('aria-expanded', !isExpanded);
            parent.classList.toggle('active');
            
            if (parent.classList.contains('active')) {
                answer.removeAttribute('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                setTimeout(() => {
                    if (!parent.classList.contains('active')) {
                        answer.setAttribute('hidden', 'true');
                    }
                }, 400);
            }
        });
    });

    // ==========================================
    // 15. Form Validation Details (Admissions)
    // ==========================================
    const admissionForm = document.getElementById('admissionForm');
    const successAlert = document.getElementById('formSuccessAlert');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    // Dynamic error displays
    const displayError = (inputId, message) => {
        const errorSpan = document.getElementById(`${inputId}Error`);
        const inputEl = document.getElementById(inputId);
        if (errorSpan && inputEl) {
            errorSpan.textContent = message;
            inputEl.style.borderColor = 'var(--error)';
        }
    };

    const clearError = (inputId) => {
        const errorSpan = document.getElementById(`${inputId}Error`);
        const inputEl = document.getElementById(inputId);
        if (errorSpan && inputEl) {
            errorSpan.textContent = '';
            inputEl.style.borderColor = '';
        }
    };

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 1. Student Name validation
            const studentName = document.getElementById('studentName').value.trim();
            if (!studentName) {
                displayError('studentName', 'Student Name is required.');
                isValid = false;
            } else if (studentName.length < 3) {
                displayError('studentName', 'Name must be at least 3 characters.');
                isValid = false;
            } else {
                clearError('studentName');
            }

            // 2. Father Name validation
            const fatherName = document.getElementById('fatherName').value.trim();
            if (!fatherName) {
                displayError('fatherName', "Father's Name is required.");
                isValid = false;
            } else if (fatherName.length < 3) {
                displayError('fatherName', 'Name must be at least 3 characters.');
                isValid = false;
            } else {
                clearError('fatherName');
            }

            // 3. Mother Name validation
            const motherName = document.getElementById('motherName').value.trim();
            if (!motherName) {
                displayError('motherName', "Mother's Name is required.");
                isValid = false;
            } else if (motherName.length < 3) {
                displayError('motherName', 'Name must be at least 3 characters.');
                isValid = false;
            } else {
                clearError('motherName');
            }

            // 4. Gender selection validation
            const gender = document.getElementById('gender').value;
            if (!gender) {
                displayError('gender', 'Please select a gender.');
                isValid = false;
            } else {
                clearError('gender');
            }

            // 5. Date of Birth validation
            const dob = document.getElementById('dob').value;
            if (!dob) {
                displayError('dob', 'Date of Birth is required.');
                isValid = false;
            } else {
                const birthYear = new Date(dob).getFullYear();
                const currentYear = new Date().getFullYear();
                if (birthYear > currentYear - 2) {
                    displayError('dob', 'Student must be at least 2 years old.');
                    isValid = false;
                } else {
                    clearError('dob');
                }
            }

            // 6. Class selection validation
            const classApplying = document.getElementById('classApplying').value;
            if (!classApplying) {
                displayError('classApplying', 'Please select class applying for.');
                isValid = false;
            } else {
                clearError('classApplying');
            }

            // 7. Mobile Number validation
            const mobileNumber = document.getElementById('mobileNumber').value.trim();
            if (!mobileNumber) {
                displayError('mobileNumber', 'Mobile Number is required.');
                isValid = false;
            } else if (!phonePattern.test(mobileNumber)) {
                displayError('mobileNumber', 'Please enter a valid 10-digit number.');
                isValid = false;
            } else {
                clearError('mobileNumber');
            }

            // 8. Email validation
            const email = document.getElementById('email').value.trim();
            if (!email) {
                displayError('email', 'Email Address is required.');
                isValid = false;
            } else if (!emailPattern.test(email)) {
                displayError('email', 'Please enter a valid email format.');
                isValid = false;
            } else {
                clearError('email');
            }

            // 9. Address validation
            const address = document.getElementById('address').value.trim();
            if (!address) {
                displayError('address', 'Residential Address is required.');
                isValid = false;
            } else if (address.length < 10) {
                displayError('address', 'Please enter complete address details.');
                isValid = false;
            } else {
                clearError('address');
            }

            // Trigger success displays
            if (isValid && successAlert) {
                successAlert.removeAttribute('hidden');
                successAlert.style.display = 'block';
                admissionForm.style.opacity = '0.2';
                admissionForm.style.pointerEvents = 'none';
            }
        });

        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                successAlert.setAttribute('hidden', 'true');
                successAlert.style.display = 'none';
                admissionForm.reset();
                admissionForm.style.opacity = '1';
                admissionForm.style.pointerEvents = 'auto';
            });
        }
    }

    // ==========================================
    // 16. Contact Form Validation
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const contactSuccessAlert = document.getElementById('contactSuccessAlert');
    const closeContactSuccessBtn = document.getElementById('closeContactSuccessBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('contactName').value.trim();
            if (!name) {
                displayError('contactName', 'Name is required.');
                isValid = false;
            } else {
                clearError('contactName');
            }

            const email = document.getElementById('contactEmail').value.trim();
            if (!email) {
                displayError('contactEmail', 'Email is required.');
                isValid = false;
            } else if (!emailPattern.test(email)) {
                displayError('contactEmail', 'Invalid email format.');
                isValid = false;
            } else {
                clearError('contactEmail');
            }

            const mobile = document.getElementById('contactMobile').value.trim();
            if (!mobile) {
                displayError('contactMobile', 'Mobile number is required.');
                isValid = false;
            } else if (!phonePattern.test(mobile)) {
                displayError('contactMobile', 'Must be a 10-digit number.');
                isValid = false;
            } else {
                clearError('contactMobile');
            }

            const message = document.getElementById('contactMessage').value.trim();
            if (!message) {
                displayError('contactMessage', 'Message is required.');
                isValid = false;
            } else {
                clearError('contactMessage');
            }

            if (isValid && contactSuccessAlert) {
                contactSuccessAlert.removeAttribute('hidden');
                contactSuccessAlert.style.display = 'block';
                contactForm.style.opacity = '0.2';
                contactForm.style.pointerEvents = 'none';
            }
        });

        if (closeContactSuccessBtn) {
            closeContactSuccessBtn.addEventListener('click', () => {
                contactSuccessAlert.setAttribute('hidden', 'true');
                contactSuccessAlert.style.display = 'none';
                contactForm.reset();
                contactForm.style.opacity = '1';
                contactForm.style.pointerEvents = 'auto';
            });
        }
    }

    // ==========================================
    // 17. Newsletter Form Subscription validation
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMsg = document.getElementById('newsletterMsg');

    if (newsletterForm && newsletterMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();

            if (!email) {
                newsletterMsg.textContent = "Please enter an email.";
                newsletterMsg.className = "newsletter-msg error";
            } else if (!emailPattern.test(email)) {
                newsletterMsg.textContent = "Invalid email format.";
                newsletterMsg.className = "newsletter-msg error";
            } else {
                newsletterMsg.textContent = "Subscription Successful!";
                newsletterMsg.className = "newsletter-msg success";
                emailInput.value = '';
                setTimeout(() => {
                    newsletterMsg.textContent = '';
                }, 4000);
            }
        });
    }

    // ==========================================
    // 18. Back to Top button visibility
    // ==========================================
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 19. Ripple Button Effect setups
    // ==========================================
    const rippleButtons = document.querySelectorAll('.ripple-btn, .nav-admission-btn');
    
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});
