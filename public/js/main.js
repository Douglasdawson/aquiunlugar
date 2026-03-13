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
    let savedScrollY = 0;

    const openMobile = () => {
      // #10 — Toggle hamburger active class for X animation
      hamburger.classList.add('active');
      mobileNav.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');

      // #12 — iOS-safe scroll lock
      savedScrollY = window.scrollY;
      document.body.classList.add('nav-open');
      document.body.style.top = `-${savedScrollY}px`;

      // #6 — Focus trap for mobile nav
      const firstFocusable = mobileNav.querySelector('button, a');
      if (firstFocusable) firstFocusable.focus();
    };

    const closeMobile = () => {
      // #10 — Remove hamburger active class
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');

      // #12 — Restore scroll position
      document.body.classList.remove('nav-open');
      document.body.style.top = '';
      window.scrollTo(0, savedScrollY);

      // #6 — Return focus to hamburger
      hamburger.focus();
    };

    hamburger.addEventListener('click', openMobile);
    mobileClose?.addEventListener('click', closeMobile);
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobile);
    });

    // #6 — Focus trap within mobile nav overlay
    mobileNav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobile();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = mobileNav.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
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
  // #7 — Use scrollIntoView + CSS scroll-margin-top for accurate positioning
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- #15 Back to top button ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          backToTop.classList.toggle('visible', window.scrollY > window.innerHeight * 2);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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
