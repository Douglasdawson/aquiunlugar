/* ============================================
   AQUÍ UN LUGAR — JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.querySelector('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile nav ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav-overlay');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    const closeMobile = () => {
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileClose?.addEventListener('click', closeMobile);
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobile);
    });
  }

  // --- Reveal on scroll ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Stagger children animation ---
  document.querySelectorAll('.stagger-children').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const items = document.querySelectorAll('.galeria-item');
    let currentIndex = 0;

    const openLightbox = (index) => {
      currentIndex = index;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const navigate = (dir) => {
      currentIndex = (currentIndex + dir + items.length) % items.length;
    };

    items.forEach((item) => {
      item.addEventListener('click', () => {
        openLightbox(parseInt(item.dataset.index, 10));
      });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');
      const answer = item.querySelector('.faq-answer');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').hidden = true;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});
