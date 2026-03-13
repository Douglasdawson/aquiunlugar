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

  // --- Mobile bottom nav: hide on scroll down, show on scroll up ---
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  if (bottomNav) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const onBottomNavScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 300) {
        bottomNav.classList.add('hidden');
      } else {
        bottomNav.classList.remove('hidden');
      }
      lastScrollY = currentY;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onBottomNavScroll);
        ticking = true;
      }
    }, { passive: true });
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
