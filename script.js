// ============ إصلاح الهامبرغر والقائمة المتجاوبة ============
document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            nav.classList.toggle('open');
            // تغيير أيقونة الهامبرغر
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('open');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // الدروب داون في الموبايل
        document.querySelectorAll('.dropdown > a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    parent.classList.toggle('open');
                }
            });
        });

        // إغلاق القائمة عند الضغط على رابط
        nav.querySelectorAll('a:not(.dropdown > a)').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('open');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }

    // ============ Theme Toggle ============
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        const getCurrentTheme = () => document.documentElement.getAttribute('data-theme');

        const updateIcon = (theme) => {
            if (!themeIcon) return;
            if (theme === 'light') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        };

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateIcon(savedTheme);
        } else if (!systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            updateIcon('light');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isLight = getCurrentTheme() === 'light';
            const newTheme = isLight ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

});

const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('.nav ul');

hamburger.addEventListener('click', () => {
    navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
});


if (typeof particlesJS !== 'undefined') {
    // Index hero
    const particlesContainers = ['particles-js', 'particles-js-register', 'particles-js-team'];
particlesContainers.forEach(id => {
        const element = document.getElementById(id);
        if (element && typeof particlesJS !== 'undefined') {
            try {
                particlesJS(id, {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                        move: { enable: true, speed: 4, direction: 'none', random: true }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
                    },
                    retina_detect: true
                });
            } catch (e) {
                console.log('Particles.js not loaded:', e);
            }
        }
    });
}


document.querySelectorAll('#contact-form, #register-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#ff4444';
                input.style.boxShadow = '0 0 5px rgba(255,68,68,0.3)';
            } else {
                input.style.borderColor = '#4ecdc4';
                input.style.boxShadow = '0 0 5px rgba(78,205,196,0.3)';
            }
        });

        if (valid) {
            const formData = new FormData(form);
            // Simulate submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
                // Enhanced success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; text-align: center;';
                successMsg.textContent = form.id === 'register-form' ? 'تم إرسال طلب التسجيل بنجاح! سنتواصل معك قريباً.' : 'تم إرسال الرسالة بنجاح! شكراً لك.';
                form.insertBefore(successMsg, form.firstChild);
                setTimeout(() => successMsg.remove(), 5000);
            }, 2000);
        } else {
            // Shake animation
            form.style.animation = 'shake 0.5s';
            setTimeout(() => form.style.animation = '', 500);
        }
    });
});

// Team modals
const modal = document.getElementById('team-modal');
const teamCards = document.querySelectorAll('.team-card[data-modal]');
const closeBtn = document.querySelector('.close');

teamCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const modalId = card.dataset.modal;
        const modalData = {
            ahmad: { img: 'روبوت.jpeg', name: 'د. أحمد السعدي', desc: 'أستاذ هندسة الروبوتات وخبير في الذكاء الاصطناعي. خبرة 15 سنة في تدريس الروبوتات المتقدمة.' },
            fatma: { img: 'toto.jpeg', name: 'د. فاطمة المهدي', desc: 'أستاذ مساعد في برمجة الروبوتات. حاصلة على دكتوراه في الذكاء الاصطناعي.' },
            mohamed: { img: 'روبوت.jpeg', name: 'ع. محمد التركي', desc: 'معلم روبوتات متقدمة مع خبرة عملية في الصناعة.' },
            ali: { img: 'روبوت.jpeg', name: 'د. علي الخليل', desc: 'أستاذ تطوير الويب - JavaScript & Python. مطور Full-Stack معتمد.' },
            sara: { img: 'toto.jpeg', name: 'د. سارة القاسم', desc: 'أستاذة البرمجة و Full-Stack Developer. خبرة في تطوير التطبيقات.' },
            khalid: { img: 'روبوت.jpeg', name: 'ع. خالد الزيد', desc: 'معلم تطبيقات الموبايل - React Native & Flutter.' },
            hasan: { img: 'روبوت.jpeg', name: 'د. حسن العمري', desc: 'أستاذ قواعد البيانات وأمن سيبراني. خبير CEH.' },
            laila: { img: 'toto.jpeg', name: 'د. ليلى الشريف', desc: 'أستاذة الشبكات والأنظمة. حاصلة على CCNA.' },
            omar: { img: 'روبوت.jpeg', name: 'ع. عمر الحسن', desc: 'معلم أنظمة الحاسوب والـ Hardware.' }
        };
        const data = modalData[modalId];
        if (data) {
            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-name').textContent = data.name;
            document.getElementById('modal-desc').textContent = data.desc;
            modal.style.display = 'block';
        }
    });
});

if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animate progress bars and stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                bar.style.width = bar.dataset.width || bar.style.width;
            });
            const statsNumbers = document.querySelectorAll('.stats-card h3');
            statsNumbers.forEach(num => {
                num.style.animation = 'countUp 2s ease';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-section, #skills').forEach(section => {
    statsObserver.observe(section);
});

// Card animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Close mobile menu on link click
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        navUl.style.display = 'none';
    });
});

// Add shake animation for forms
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    @keyframes countUp {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;

// Admin Dashboard Logic
document.addEventListener('DOMContentLoaded', function() {
    // Check if on admin page
    if (window.location.pathname.includes('admin.html')) {
        initAdmin();
    }
});

function initAdmin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
        showLogin();
    } else {
        showDashboard();
        loadDashboardData();
    }

    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const adminPass = prompt('أدخل كلمة مرور جديدة للمدير (افتراضي: admin123)');
        const storedPass = localStorage.getItem('adminPass') || 'admin123';
        if (username === 'admin' && password === storedPass) {
            // Optional: update password
            if (adminPass && adminPass !== storedPass) {
                localStorage.setItem('adminPass', adminPass);
            }
            sessionStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
            loadDashboardData();
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        sessionStorage.removeItem('adminLoggedIn');
        showLogin();
    });

    // Sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showLogin() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('dashboard-container').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
}

function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
}

// Load all dashboard data
function loadDashboardData() {
    loadStats();
    loadRegistrations();
    loadNews();
    loadFaculty();
    loadChart();
}

// Stats
function loadStats() {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    const today = new Date().toDateString();
    const todayRegs = registrations.filter(reg => new Date(reg.date).toDateString() === today).length;

    document.getElementById('total-regs').textContent = registrations.length;
    document.getElementById('today-regs').textContent = todayRegs;
    document.getElementById('news-count').textContent = news.length;
}

// Chart
let deptChart;
function loadChart() {
    const ctx = document.getElementById('dept-chart').getContext('2d');
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const depts = {};
    registrations.forEach(reg => {
        depts[reg.department] = (depts[reg.department] || 0) + 1;
    });

    if (deptChart) deptChart.destroy();
    deptChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(depts),
            datasets: [{
                data: Object.values(depts),
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#00d4ff', '#ffd700']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Registrations
function loadRegistrations() {
    const tbody = document.querySelector('#regs-table tbody');
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    tbody.innerHTML = '';
    registrations.forEach((reg, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${reg.name}</td>
            <td>${reg.email}</td>
            <td>${reg.department}</td>
            <td>${new Date(reg.date).toLocaleDateString('ar')}</td>
            <td><button class="btn-danger" onclick="deleteReg(${index})">حذف</button></td>
        `;
    });
}

function deleteReg(index) {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    loadRegistrations();
    loadStats();
    loadChart();
}

// News
document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    if (title && content) {
        const news = JSON.parse(localStorage.getItem('news') || '[]');
        news.unshift({ title, content, date: new Date().toISOString() });
        localStorage.setItem('news', JSON.stringify(news));
        this.reset();
        loadNews();
        loadStats();
    }
});

function loadNews() {
    const list = document.getElementById('news-list');
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    list.innerHTML = '';
    news.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `
            <button class="news-delete" onclick="deleteNews(${index})">×</button>
            <h4>${item.title}</h4>
            <p>${item.content}</p>
            <small>${new Date(item.date).toLocaleDateString('ar')}</small>
        `;
        list.appendChild(div);
    });
}

function deleteNews(index) {
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    news.splice(index, 1);
    localStorage.setItem('news', JSON.stringify(news));
    loadNews();
    loadStats();
}

// Faculty (simple mock, extend from team data)
document.getElementById('faculty-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Mock save - can extend team modals
    alert('تم حفظ عضو هيئة التدريس');
});

// Settings preview mock
function updateHeroPreview() {
    const text = document.getElementById('hero-text').value;
    document.getElementById('preview-area').innerHTML = `<h3>معاينة Hero: ${text}</h3><p>سيتم دمج في JS للتحديث التلقائي</p>`;
}

// Enhance register form to save to localStorage
const originalRegisterSubmit = document.querySelector('#register-form')?.addEventListener ? true : false;
if (originalRegisterSubmit) {
    // Hook into existing register form (mock save data)
    document.getElementById('register-form').addEventListener('submit', function(e) {
        // Existing code runs, then save mock data
        const formData = {
            name: this.querySelector('input[placeholder*="الاسم"]').value,
            email: this.querySelector('input[placeholder*="البريد"]').value,
            department: this.querySelector('select').value,
            date: new Date().toISOString()
        };
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        registrations.push(formData);
        localStorage.setItem('registrations', JSON.stringify(registrations));
    });
}

document.head.appendChild(style);


function hideNow() {
    
    const elements = document.querySelectorAll('.announcement-section, .announcement-bar');
    
    elements.forEach(el => {
       
        const testDate = new Date(2000, 0, 1);
        const today = new Date();

        if (today > testDate) {
            el.style.cssText = "display: none !important;"; 
            el.remove(); 
            console.log("تم المسح بنجاح!");
        }
    });
}


hideNow(); 
window.onload = hideNow;
document.addEventListener('DOMContentLoaded', hideNow);


















(function() {
    const runCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            
            const increment = target / 10; 

            const update = () => {
                const current = +counter.innerText.replace(/,/g, '');
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment).toLocaleString();
                    setTimeout(update, 20); 
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            update();
        });
    };


    if (document.readyState === 'complete') {
        runCounters();
    } else {
        window.addEventListener('load', runCounters);
    }
})();





















document.addEventListener('DOMContentLoaded', () => {
    const newsCards = document.querySelectorAll('.qu-news-card');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
             
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); 
            }
        });
    }, { threshold: 0.1 });

    newsCards.forEach(card => {
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        revealOnScroll.observe(card);
    });
});



























document.addEventListener('DOMContentLoaded', () => {

    const itemsToReveal = document.querySelectorAll('.qu-news-card, .qu-event-card');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
               
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); 
             
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    itemsToReveal.forEach(item => {
  
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        revealOnScroll.observe(item);
    });
});










document.addEventListener("DOMContentLoaded", function () {
    let current = 0;
    const items = document.querySelectorAll(".edu-item");
    const nextBtn = document.querySelector(".edu-nav.next"); 
    const prevBtn = document.querySelector(".edu-nav.prev");

    if (!items.length || !nextBtn || !prevBtn) return;

    function showSlide(index) {
        
        items.forEach(item => {
            item.classList.remove("active");
            item.style.display = "none"; 
        });
        
       
        items[index].classList.add("active");
        items[index].style.display = "block";
    }

   
    nextBtn.addEventListener("click", function() {
        current++;
        if (current >= items.length) {
            current = 0; 
        }
        showSlide(current);
    });

  
    prevBtn.addEventListener("click", function() {
        current--;
        if (current < 0) {
            current = items.length - 1; 
        }
        showSlide(current);
    });


    showSlide(current);
});



document.getElementById('newsForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = this.querySelector('input').value.trim();
    const content = this.querySelector('textarea').value.trim();

    if (title === "" || content === "") {
        alert("⚠️ خطأ: لا يمكن نشر خبر بدون عنوان أو محتوى!");
        return;
    }

    // إظهار رسالة انتظار بسيطة
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "جاري الإرسال...";
    btn.disabled = true;

    
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        news_title: title,
        news_content: content,
        admin_email: "إيميلك_الشخصي@gmail.com" 
    })
    .then(() => {
        alert("✅ تم نشر الخبر بنجاح ووصلت نسخة لإيميلك!");
        this.reset();
       
        if(typeof updateStats === "function") updateStats();
    })
    .catch((err) => {
        alert("❌ فشل الإرسال، تأكدي من إعدادات EmailJS: " + JSON.stringify(err));
    })
    .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
})