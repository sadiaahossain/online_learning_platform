// Smooth scroll for navigation and CTA buttons

document.addEventListener('DOMContentLoaded', function() {
    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });

    // Hero CTA button
    const heroSignup = document.getElementById('hero-signup');
    if (heroSignup) {
        heroSignup.addEventListener('click', function() {
            window.location.href = 'signup.php';
        });
    }

    // Signup section CTA button (could add more interaction here)
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            window.location.href = 'signup.php';
        });
    }

    // Signup form password match validation and save to localStorage
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const email = signupForm.querySelector('input[type="email"]');
            const name = signupForm.querySelector('input[type="text"]');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                e.preventDefault();
                let error = document.getElementById('signup-error');
                if (!error) {
                    error = document.createElement('div');
                    error.id = 'signup-error';
                    error.style.color = 'red';
                    error.style.marginBottom = '1rem';
                    signupForm.prepend(error);
                }
                error.textContent = 'Passwords do not match.';
                confirmPassword.value = '';
                confirmPassword.focus();
            } else {
                let error = document.getElementById('signup-error');
                if (error) error.remove();
                // Save signup data to localStorage
                if (email && password && name) {
                    localStorage.setItem('olp_user_email', email.value);
                    localStorage.setItem('olp_user_password', password.value);
                    localStorage.setItem('olp_user_name', name.value);
                }   
                e.preventDefault();
                window.location.href = 'email-verification.html';
            }
        });
    }

    // Show signup success message on login page
    if (window.location.pathname.endsWith('login.php')) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('signup') === 'success') {
            let msg = document.createElement('div');
            msg.textContent = 'Signup successful! Please log in.';
            msg.style.color = 'green';
            msg.style.marginBottom = '1rem';
            const form = document.getElementById('login-form');
            if (form) {
                form.prepend(msg);
            }
        }
    }

    // Login form redirect to dashboard with validation using localStorage
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]');
            const password = loginForm.querySelector('input[type="password"]');
            let error = document.getElementById('login-error');
            if (error) error.remove();
            // Get stored credentials
            const storedEmail = localStorage.getItem('olp_user_email');
            const storedPassword = localStorage.getItem('olp_user_password');
            if (email.value === storedEmail && password.value === storedPassword) {
                window.location.href = 'dashboard.html';
            } else {
                error = document.createElement('div');
                error.id = 'login-error';
                error.style.color = 'red';
                error.style.marginBottom = '1rem';
                error.textContent = 'Incorrect email or password.';
                loginForm.prepend(error);
                password.value = '';
                password.focus();
            }
        });
    }

    // Logout button functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('olp_user_email');
            localStorage.removeItem('olp_user_password');
            window.location.href = 'login.php';
        });
    }

    // Show user info on profile page
    if (window.location.pathname.endsWith('profile.html')) {
        const name = localStorage.getItem('olp_user_name') || 'User Name';
        const email = localStorage.getItem('olp_user_email') || 'user@example.com';
        const nameElem = document.getElementById('profile-name');
        const emailElem = document.getElementById('profile-email');
        const avatarElem = document.getElementById('profile-img');
        if (nameElem) nameElem.textContent = name;
        if (emailElem) emailElem.textContent = email;
        if (avatarElem) {
            const storedAvatar = localStorage.getItem('olp_user_avatar');
            if (storedAvatar) {
                avatarElem.src = storedAvatar;
            } else {
                avatarElem.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name);
            }
        }
    }

    // Edit Profile button navigation
    if (window.location.pathname.endsWith('profile.html')) {
        const editBtn = document.getElementById('edit-profile-btn');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                window.location.href = 'edit-profile.html';
            });
        }
    }

    // Edit Profile page logic
    if (window.location.pathname.endsWith('edit-profile.html')) {
        const nameInput = document.getElementById('edit-name');
        const form = document.getElementById('edit-profile-form');
        const cancelBtn = document.getElementById('cancel-edit');
        const avatarInput = document.getElementById('avatar-upload');
        const avatarImg = document.getElementById('edit-profile-img');
        // Pre-fill name and avatar
        if (nameInput) {
            nameInput.value = localStorage.getItem('olp_user_name') || '';
        }
        if (avatarImg) {
            const storedAvatar = localStorage.getItem('olp_user_avatar');
            if (storedAvatar) {
                avatarImg.src = storedAvatar;
            } else {
                avatarImg.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(localStorage.getItem('olp_user_name') || 'User');
            }
        }
        // Preview avatar on file select
        if (avatarInput && avatarImg) {
            avatarInput.addEventListener('change', function(e) {
                const file = avatarInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        avatarImg.src = evt.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        // Save changes
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (nameInput && nameInput.value.trim() !== '') {
                    localStorage.setItem('olp_user_name', nameInput.value.trim());
                }
                if (avatarImg && avatarImg.src) {
                    localStorage.setItem('olp_user_avatar', avatarImg.src);
                }
                window.location.href = 'profile.html';
            });
        }
        // Cancel buttonf
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }
    }

    // Course Catalog logic
    if (window.location.pathname.endsWith('course-catalog.html')) {
        // const courses = [
        //     {
        //         id: 1,
        //         title: 'JavaScript Essentials',
        //         category: 'programming',
        //         syllabus: 'Variables, Functions, DOM, Events',
        //         duration: '4 weeks',
        //         difficulty: 'Beginner',
        //         preview: 'Learn the basics of JavaScript with hands-on examples and projects.',
        //         paid: false
        //     },
        //     {
        //         id: 2,
        //         title: 'UI/UX Design Fundamentals',
        //         category: 'design',
        //         syllabus: 'Wireframes, Prototyping, User Testing',
        //         duration: '3 weeks',
        //         difficulty: 'Intermediate',
        //         preview: 'Explore the principles of user interface and user experience design.',
        //         paid: true
        //     },
        //     {
        //         id: 3,
        //         title: 'Business Analytics',
        //         category: 'business',
        //         syllabus: 'Data Analysis, Visualization, Reporting',
        //         duration: '5 weeks',
        //         difficulty: 'Advanced',
        //         preview: 'Master the tools and techniques for business data analysis.',
        //         paid: true
        //     },
        //     {
        //         id: 4,
        //         title: 'React for Beginners',
        //         category: 'programming',
        //         syllabus: 'Components, State, Props, Hooks',
        //         duration: '6 weeks',
        //         difficulty: 'Beginner',
        //         preview: 'Build interactive web apps using React.js from scratch.',
        //         paid: false
        //     },
        //     {
        //         id: 5,
        //         title: 'Brand Identity Design',
        //         category: 'design',
        //         syllabus: 'Logos, Typography, Color Theory',
        //         duration: '2 weeks',
        //         difficulty: 'Beginner',
        //         preview: 'Create compelling brand identities with design best practices.',
        //         paid: false
        //     }
        // ];
        const gallery = document.getElementById('course-gallery');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const modal = document.getElementById('preview-modal');
        const closeModal = document.getElementById('close-modal');
        const previewContent = document.getElementById('preview-content');
        let courses = [];

        function renderCourses(category) {
            gallery.innerHTML = '';
            const filtered = category === 'all' ? courses : courses.filter(c => c.category === category);
            filtered.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card';
                card.innerHTML = `
                    <h3>${course.title}</h3>
                    <div class="course-meta">Duration: ${course.duration || ''} | Difficulty: ${course.difficulty || ''}</div>
                    <div class="course-syllabus"><strong>Syllabus:</strong> ${course.syllabus || ''}</div>
                    <div class="card-actions">
                        <button class="cta enroll-btn" data-id="${course.id}">Enroll Now</button>
                        <button class="cta preview-btn" data-id="${course.id}">Preview</button>
                    </div>
                `;
                gallery.appendChild(card);
            });
        }

        fetch('get-courses.php')
        .then(res => res.json())
        .then(data => {
            courses = data;
            renderCourses('all');
        });

        filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderCourses(this.getAttribute('data-category'));
        });
        });

        // Preview modal logic
        gallery.addEventListener('click', function(e) {
            if (e.target.classList.contains('preview-btn')) {
                const id = e.target.getAttribute('data-id');
                const course = courses.find(c => c.id == id);
                if (course) {
                    previewContent.innerHTML = `
                        <h3>${course.title} - Preview</h3>
                        <p>${course.preview}</p>
                        <div class="course-meta">Duration: ${course.duration} | Difficulty: ${course.difficulty}</div>
                        <div class="course-syllabus"><strong>Syllabus:</strong> ${course.syllabus}</div>
                    `;
                    modal.style.display = 'flex';
                }
            }
        });
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Enroll Now logic
        gallery.addEventListener('click', function(e) {
            if (e.target.classList.contains('enroll-btn')) {
                const id = e.target.getAttribute('data-id');
                const course = courses.find(c => c.id == id);
                if (course) {
                    // Save enrolled course to localStorage
                    let enrolled = JSON.parse(localStorage.getItem('olp_enrolled_courses') || '[]');
                    if (!enrolled.some(c => c.id === course.id)) {
                        enrolled.push({ id: course.id, title: course.title });
                        localStorage.setItem('olp_enrolled_courses', JSON.stringify(enrolled));
                    }
                    if (course.paid) {
                        localStorage.setItem('olp_enroll_course', JSON.stringify(course));
                        window.location.href = 'enrollment.html';
                    } else {
                        localStorage.setItem('olp_enroll_course', JSON.stringify(course));
                        localStorage.setItem('olp_enroll_free', 'true');
                        window.location.href = 'confirmation.html';
                    }
                }
            }
        });

        // Instructor Profiles button logic
        gallery.addEventListener('click', function(e) {
            if (e.target.classList.contains('instructor-btn')) {
                const id = e.target.getAttribute('data-id');
                // Example instructor data per course
                const instructors = {
                    1: {
                        name: 'Dr. Hasibun Nahin',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                        badges: ['PhD Computer Science', 'Certified JavaScript Instructor'],
                        bio: 'Experienced web developer and educator with a passion for teaching modern web technologies.',
                        history: [
                            'JavaScript Essentials (2018-2023)',
                            'React for Beginners (2020-2023)'
                        ]
                    },
                    2: {
                        name: 'Jane Smith',
                        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                        badges: ['MFA Design', 'UX Certified'],
                        bio: 'Award-winning designer and UX specialist with 10+ years of teaching experience.',
                        history: [
                            'UI/UX Design Fundamentals (2019-2023)',
                            'Brand Identity Design (2021-2023)'
                        ]
                    },
                    3: {
                        name: 'Dr. Alan Brown',
                        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
                        badges: ['PhD Business Analytics', 'Data Science Expert'],
                        bio: 'Business analytics expert and data science mentor for global organizations.',
                        history: [
                            'Business Analytics (2017-2023)'
                        ]
                    },
                    4: {
                        name: 'Emily White',
                        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                        badges: ['BSc Computer Science', 'React Specialist'],
                        bio: 'Front-end developer and React enthusiast with a knack for simplifying complex topics.',
                        history: [
                            'React for Beginners (2020-2023)'
                        ]
                    },
                    5: {
                        name: 'Jane Smith',
                        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                        badges: ['MFA Design', 'UX Certified'],
                        bio: 'Award-winning designer and UX specialist with 10+ years of teaching experience.',
                        history: [
                            'Brand Identity Design (2021-2023)',
                            'UI/UX Design Fundamentals (2019-2023)'
                        ]
                    }
                };
                const instructor = instructors[id];
                if (instructor) {
                    localStorage.setItem('olp_instructor_profile', JSON.stringify(instructor));
                    window.location.href = 'instructor.html';
                }
            }
        });
    }

    // Dashboard quick actions navigation
    if (window.location.pathname.endsWith('dashboard.html')) {
        const viewProfileBtn = document.getElementById('view-profile-btn');
        const viewCoursesBtn = document.getElementById('view-courses-btn');
        const discussionBtn = document.getElementById('discussion-btn');
        const ratingBtn = document.getElementById('rating-btn');    
        const faq = document.getElementById('faq-btn');
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }
        if (viewCoursesBtn) {
            viewCoursesBtn.addEventListener('click', function() {
                window.location.href = 'course-catalog.html';
            });
        }
        if (discussionBtn) {
            discussionBtn.addEventListener('click', function() {
                window.location.href = 'discussion.php';
            }
        );
        }
        if (ratingBtn) {
        ratingBtn.addEventListener('click', function() {
            window.location.href = 'course-rating.php';
        });
        }
        if (faq) {
        faq.addEventListener('click', function() {
            window.location.href = 'faq.php';
        });
        }
        const progressCard = document.getElementById('progress-card');
        if (progressCard) {
            progressCard.style.cursor = 'pointer';
            progressCard.addEventListener('click', function() {
                window.location.href = 'progress.html';
            });
        }
        // Dashboard: show enrolled courses count
        const enrolled = JSON.parse(localStorage.getItem('olp_enrolled_courses') || '[]');
        const enrolledCard = document.querySelector('.dashboard-card:nth-child(1) p');
        if (enrolledCard) {
            enrolledCard.textContent = enrolled.length;
        }

        // Enrolled courses modal logic
        const enrolledCardDiv = document.getElementById('enrolled-card');
        const enrolledModal = document.getElementById('enrolled-modal');
        const closeEnrolledModal = document.getElementById('close-enrolled-modal');
        const enrolledList = document.getElementById('enrolled-list');
        if (enrolledCardDiv && enrolledModal && enrolledList) {
            enrolledCardDiv.style.cursor = 'pointer';
            enrolledCardDiv.addEventListener('click', function() {
                // Populate enrolled courses
                enrolledList.innerHTML = '';
                if (enrolled.length === 0) {
                    enrolledList.innerHTML = '<li>No courses enrolled yet.</li>';
                } else {
                    enrolled.forEach(c => {
                        const li = document.createElement('li');
                        li.textContent = c.title;
                        enrolledList.appendChild(li);
                    });
                }
                enrolledModal.style.display = 'flex';
            });
            if (closeEnrolledModal) {
                closeEnrolledModal.addEventListener('click', function() {
                    enrolledModal.style.display = 'none';
                });
            }
            window.addEventListener('click', function(e) {
                if (e.target === enrolledModal) {
                    enrolledModal.style.display = 'none';
                }
            });
        }
    }

    // Enrollment page logic
    if (window.location.pathname.endsWith('enrollment.html')) {
        const course = JSON.parse(localStorage.getItem('olp_enroll_course') || '{}');
        const titleElem = document.getElementById('enrollment-course-title');
        const metaElem = document.getElementById('enrollment-course-meta');
        if (titleElem && course.title) {
            titleElem.textContent = course.title;
        }
        if (metaElem && course.duration && course.difficulty) {
            metaElem.textContent = `Duration: ${course.duration} | Difficulty: ${course.difficulty}`;
        }
        const form = document.getElementById('enrollment-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                localStorage.setItem('olp_enroll_free', 'false');
                window.location.href = 'confirmation.html';
            });
        }
    }

    // Confirmation page logic
    if (window.location.pathname.endsWith('confirmation.html')) {
        const course = JSON.parse(localStorage.getItem('olp_enroll_course') || '{}');
        const isFree = localStorage.getItem('olp_enroll_free') === 'true';
        const msgElem = document.getElementById('confirmation-message');
        if (msgElem && course.title) {
            msgElem.innerHTML = `You have been enrolled in <b>${course.title}</b>.<br>${isFree ? 'You have instant access to this free course.' : 'A receipt has been sent to your email.'}`;
        }
    }

    // Progress Dashboard logic
    if (window.location.pathname.endsWith('progress.html')) {
        // Example modules and progress
        const modules = [
            { name: 'Introduction', status: 'Completed' },
            { name: 'Module 1: Basics', status: 'Completed' },
            { name: 'Module 2: Intermediate', status: 'In Progress' },
            { name: 'Module 3: Advanced', status: 'Not Started' },
            { name: 'Final Project', status: 'Not Started' }
        ];
        const completed = modules.filter(m => m.status === 'Completed').length;
        const inProgress = modules.filter(m => m.status === 'In Progress').length;
        const percent = Math.round((completed + 0.5 * inProgress) / modules.length * 100);

        // Render circular progress
        const circle = document.querySelector('.progress-bar');
        const percentElem = document.getElementById('progress-percent');
        const radius = 50;
        const circumference = 2 * Math.PI * radius;
        if (circle) {
            circle.setAttribute('stroke-dasharray', `${circumference}`);
            circle.setAttribute('stroke-dashoffset', `${circumference}`);
            setTimeout(() => {
                const offset = circumference - (percent / 100) * circumference;
                circle.setAttribute('stroke-dashoffset', offset);
            }, 200);
        }
        if (percentElem) {
            percentElem.textContent = percent + '%';
        }

        // Render modules
        const moduleList = document.getElementById('module-list');
        if (moduleList) {
            moduleList.innerHTML = '';
            modules.forEach(m => {
                const li = document.createElement('li');
                li.className = 'module-item';
                li.innerHTML = `
                    <span>${m.name}</span>
                    <span class="module-status">${m.status}</span>
                `;
                moduleList.appendChild(li);
            });
        }

        // Continue Learning button
        const continueBtn = document.getElementById('continue-learning-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', function() {
                alert('Resuming your course from the last incomplete module!');
            });
        }
    }

    // Basic Quiz card navigation
    const quizCard = document.getElementById('basic-quiz-card');
    if (quizCard) {
        quizCard.style.cursor = 'pointer';
        quizCard.addEventListener('click', function() {
            window.location.href = 'quiz.html';
        });
    }

    // Quiz logic
    if (window.location.pathname.endsWith('quiz.html')) {
        const questions = [
            {
                q: 'What does HTML stand for?',
                options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyper Text Marketing Language', 'Hyper Text Markup Leveler'],
                answer: 1,
                explanation: 'HTML stands for Hyper Text Markup Language.'
            },
            {
                q: 'Which language is used for styling web pages?',
                options: ['HTML', 'JQuery', 'CSS', 'XML'],
                answer: 2,
                explanation: 'CSS (Cascading Style Sheets) is used for styling web pages.'
            },
            {
                q: 'Which is not a JavaScript Framework?',
                options: ['Python Script', 'JQuery', 'Django', 'NodeJS'],
                answer: 2,
                explanation: 'Django is a Python framework, not a JavaScript framework.'
            },
            {
                q: 'Which property is used to change the background color in CSS?',
                options: ['color', 'background-color', 'bgcolor', 'background'],
                answer: 1,
                explanation: 'background-color is the correct CSS property.'
            },
            {
                q: 'How do you write "Hello World" in an alert box in JavaScript?',
                options: ['msg("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");'],
                answer: 3,
                explanation: 'alert("Hello World"); is the correct syntax.'
            },
            {
                q: 'How do you call a function named myFunction in JavaScript?',
                options: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'Call.myFunction()'],
                answer: 1,
                explanation: 'myFunction() is the correct way to call a function.'
            }
        ];
        let timer = 0;
        let timerInterval;
        const timerElem = document.getElementById('quiz-timer');
        function startTimer() {
            timerInterval = setInterval(() => {
                timer++;
                const min = String(Math.floor(timer / 60)).padStart(2, '0');
                const sec = String(timer % 60).padStart(2, '0');
                timerElem.textContent = `Time: ${min}:${sec}`;
            }, 1000);
        }
        function stopTimer() {
            clearInterval(timerInterval);
        }
        // Render questions
        const quizQuestions = document.getElementById('quiz-questions');
        if (quizQuestions) {
            quizQuestions.innerHTML = '';
            questions.forEach((q, i) => {
                const div = document.createElement('div');
                div.className = 'quiz-question';
                div.innerHTML = `<h4>Q${i + 1}: ${q.q}</h4><div class="quiz-options">${q.options.map((opt, idx) => `<label><input type='radio' name='q${i}' value='${idx}'> ${opt}</label>`).join('')}</div>`;
                quizQuestions.appendChild(div);
            });
        }
        // Quiz form submit
        const quizForm = document.getElementById('quiz-form');
        const quizResults = document.getElementById('quiz-results');
        if (quizForm && quizResults) {
            startTimer();
            quizForm.addEventListener('submit', function(e) {
                e.preventDefault();
                stopTimer();
                let score = 0;
                let details = '';
                questions.forEach((q, i) => {
                    const selected = quizForm.querySelector(`input[name='q${i}']:checked`);
                    const correct = q.answer;
                    const userAns = selected ? parseInt(selected.value) : -1;
                    const isCorrect = userAns === correct;
                    if (isCorrect) score++;
                    details += `<div class='quiz-result-detail ${isCorrect ? 'correct' : 'incorrect'}'>
                        <b>Q${i + 1}:</b> ${q.q}<br>
                        <b>Your answer:</b> ${userAns >= 0 ? q.options[userAns] : '<i>No answer</i>'}<br>
                        <b>Correct answer:</b> ${q.options[correct]}
                        <div class='quiz-explanation'>${q.explanation}</div>
                    </div>`;
                });
                const percent = Math.round((score / questions.length) * 100);
                quizResults.innerHTML = `<div class='quiz-result-summary'>You scored ${score} out of ${questions.length} (${percent}%)</div>${details}`;
                if (score < questions.length) {
                    quizResults.innerHTML += `<button class='cta' id='retake-quiz-btn'>Retake Quiz</button>`;
                }
                quizResults.style.display = 'block';
                quizForm.style.display = 'none';
                // Retake logic
                const retakeBtn = document.getElementById('retake-quiz-btn');
                if (retakeBtn) {
                    retakeBtn.addEventListener('click', function() {
                        window.location.reload();
                    });
                }
            });
        }
    }

    // Instructor page logic
    if (window.location.pathname.endsWith('instructor.html')) {
        const instructor = JSON.parse(localStorage.getItem('olp_instructor_profile') || '{}');
        if (instructor && instructor.name) {
            const nameElem = document.getElementById('instructor-name');
            const avatarElem = document.getElementById('instructor-avatar');
            const badgesElem = document.getElementById('instructor-badges');
            const bioElem = document.getElementById('instructor-bio');
            const historyElem = document.getElementById('instructor-history');
            if (nameElem) nameElem.textContent = instructor.name;
            if (avatarElem) avatarElem.src = instructor.avatar;
            if (badgesElem) {
                badgesElem.innerHTML = '';
                instructor.badges.forEach(badge => {
                    const span = document.createElement('span');
                    span.className = 'instructor-badge';
                    span.textContent = badge;
                    badgesElem.appendChild(span);
                });
            }
            if (bioElem) bioElem.textContent = instructor.bio;
            if (historyElem) {
                historyElem.innerHTML = '';
                instructor.history.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    historyElem.appendChild(li);
                });
            }
        }
    }

    document.querySelectorAll('.stars').forEach(starGroup => {
        const stars = starGroup.querySelectorAll('.star');
        const ratingInput = starGroup.querySelector('.rating-value');

        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                highlightStars(stars, index);
            });

            star.addEventListener('mouseout', () => {
                resetStars(stars);
            });

            star.addEventListener('click', () => {
                setRating(stars, index);
                ratingInput.value = index + 1;
            });
        });
    });

        function highlightStars(stars, index) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('hover');
        }
    }

    function resetStars(stars) {
        stars.forEach(star => star.classList.remove('hover'));
    }

    function setRating(stars, index) {
        stars.forEach(star => star.classList.remove('selected'));
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('selected');
        }
    }

       // Filter courses by rating
    const filter = document.getElementById('ratingFilter');
    const courses = document.querySelectorAll('.course-card');

    filter.addEventListener('change', function () {
        const minRating = parseFloat(this.value);
        courses.forEach(course => {
            const rating = parseFloat(course.getAttribute('data-rating'));
            if (rating >= minRating) {
                course.style.display = '';
            } else {
                course.style.display = 'none';
            }
        });
    });

        document.querySelectorAll('#courseList form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch('../controller/courseRatingSupport.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    form.querySelectorAll('.star').forEach(star => {
                        star.classList.remove('selected');
                    });
                    alert('Thank you for your rating!');
                    // Optionally: reload or update the average rating on the page
                } else {
                    alert(data.message || 'Failed to submit rating.');
                }
            })
            .catch(() => {
                alert('Failed to submit rating.');
            });
        });
    });

    // FAQ Support Form Toggle
    const supportBtn = document.getElementById('supportBtn');
    const supportForm = document.getElementById('supportForm');
    if (supportBtn && supportForm) {
        supportBtn.addEventListener('click', function() {
            supportForm.style.display = (supportForm.style.display === 'none' || supportForm.style.display === '') ? 'block' : 'none';
        });
    }

    // FAQ Search
    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
    
}); 