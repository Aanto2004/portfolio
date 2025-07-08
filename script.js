// Floating animated circles background
function createFloatingCircles() {
  const bg = document.querySelector('.bg-animated');
  if (!bg) return;
  for (let i = 0; i < 18; i++) {
    const circle = document.createElement('div');
    circle.className = 'absolute rounded-full opacity-30';
    const size = Math.random() * 80 + 40;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${Math.random() * 100}%`;
    circle.style.top = `${Math.random() * 100}%`;
    circle.style.background = `hsl(${Math.random()*360}, 80%, 70%)`;
    circle.style.animation = `floatY ${6 + Math.random()*6}s ease-in-out infinite alternate`;
    bg.appendChild(circle);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createFloatingCircles();
  // Section fade-in animation
  document.querySelectorAll('.animate-fade-in-up').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 200 + i * 200);
  });

  // Splash page logic
  const splash = document.getElementById('welcomeSplash');
  const enterBtn = document.getElementById('enterPortfolio');
  if (splash && enterBtn) {
    enterBtn.addEventListener('click', () => {
      splash.classList.add('hide');
      setTimeout(() => {
        splash.style.display = 'none';
        document.querySelectorAll('.portfolio-content').forEach(el => el.classList.add('show'));
      }, 700);
    });
  } else {
    // If splash not present, show content by default
    document.querySelectorAll('.portfolio-content').forEach(el => el.classList.add('show'));
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = ['about', 'achievements', 'experience', 'contact'];
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + 120;
    for (const id of sections) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollY) {
        current = id;
      }
    }
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Contact form handler (demo only)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('formStatus').classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        document.getElementById('formStatus').classList.add('hidden');
      }, 4000);
    });
  }
});

// Floating animation keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatY {
  0% { transform: translateY(0); }
  100% { transform: translateY(-60px); }
}`;
document.head.appendChild(style); 