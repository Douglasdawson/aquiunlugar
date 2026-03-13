/* ============================================
   AQUÍ UN LUGAR — JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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
    const placeholder = lightbox.querySelector('.lightbox-placeholder');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    let currentIndex = 0;
    let triggerElement = null;

    const updateLightboxContent = () => {
      if (!placeholder) return;
      const item = items[currentIndex];
      if (!item) return;
      const img = item.querySelector('img');
      if (img) {
        placeholder.innerHTML = '';
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;border-radius:12px;';
        placeholder.appendChild(lightboxImg);
      } else {
        placeholder.innerHTML = '<span>📷</span>';
      }
    };

    const focusableInLightbox = () => [closeBtn, prevBtn, nextBtn].filter(Boolean);

    const openLightbox = (index) => {
      triggerElement = document.activeElement;
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (triggerElement) {
        triggerElement.focus();
        triggerElement = null;
      }
    };

    const navigate = (dir) => {
      currentIndex = (currentIndex + dir + items.length) % items.length;
      updateLightboxContent();
    };

    items.forEach((item) => {
      item.addEventListener('click', () => {
        openLightbox(parseInt(item.dataset.index, 10));
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', () => navigate(-1));
    nextBtn?.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard: Escape, arrows, focus trap
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);

      // Focus trap
      if (e.key === 'Tab') {
        const focusable = focusableInLightbox();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  // --- FAQ Accordion ---
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
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

  // FAQ keyboard navigation: arrow keys, Home, End
  if (faqButtons.length > 0) {
    faqButtons.forEach((btn, index) => {
      btn.addEventListener('keydown', (e) => {
        let target = null;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          target = faqButtons[(index + 1) % faqButtons.length];
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          target = faqButtons[(index - 1 + faqButtons.length) % faqButtons.length];
        } else if (e.key === 'Home') {
          e.preventDefault();
          target = faqButtons[0];
        } else if (e.key === 'End') {
          e.preventDefault();
          target = faqButtons[faqButtons.length - 1];
        }
        if (target) target.focus();
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Cookie preference reset ---
  const cookiePrefLink = document.querySelector('.cookie-pref-link');
  if (cookiePrefLink) {
    cookiePrefLink.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        localStorage.removeItem('cookie-consent');
      } catch (err) { /* localStorage unavailable */ }
      window.location.reload();
    });
  }

});
