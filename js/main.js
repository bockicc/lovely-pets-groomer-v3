/* ============================================
   LOVELY PETS – main.js
   Mobilni meni + scroll animacije + navbar
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

/* ── Hamburger / mobilni meni ── */
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const closeBtn = document.querySelector('.close-btn');

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMobile.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMobile.classList.contains('open');
      hamburger.classList.toggle('active', !isOpen);
      navMobile.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Zatvori meni klikom na close dugme
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileMenu);
    }

    // Zatvori meni klikom na link
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Zatvori meni klikom van menija
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ── Navbar scroll efekat ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function handleNavbarScroll() {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const triggerPoint = heroSection.offsetHeight - navbar.offsetHeight;
        navbar.classList.toggle('scrolled', window.scrollY >= triggerPoint);
      } else {
        navbar.classList.add('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  /* ── Aktivna nav stavka ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Reveal animacije ── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback za starije browsere
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Smooth scroll za anchor linkove ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});