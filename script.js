// ===== Smooth scroll & navigation =====
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-close');
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const backToTop = document.getElementById('backToTop');

  // Throttled scroll effect on navbar and Back to Top button
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Navbar scrolled state
        navbar.classList.toggle('scrolled', scrollY > 50);
        
        // Back to Top button visibility
        if (backToTop) {
          backToTop.classList.toggle('visible', scrollY > 500);
        }

        updateActiveNav();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Mobile menu
  hamburger?.addEventListener('click', () => mobileOverlay.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileOverlay.classList.remove('open'));

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => mobileOverlay.classList.remove('open'));
  });

  // Back to top click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active nav link based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // Intersection Observer for scroll animations
  const animateElements = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  animateElements.forEach(el => observer.observe(el));

  updateActiveNav();
});
