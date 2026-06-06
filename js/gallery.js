/* ============================================
   LOVELY PETS – gallery.js
   Filter funkcionalnost za galeriju
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryGrid = document.querySelector('.gallery-grid');

  if (!filterBtns.length || !galleryItems.length) return;

  /* ── Filter logika ── */
  function filterGallery(category) {
    galleryItems.forEach(function (item) {
      const itemCategory = item.getAttribute('data-category');
      const matches = category === 'sve' || itemCategory === category;

      if (matches) {
        item.style.display = '';
        // Kratka animacija pojavljivanja
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        });
      } else {
        item.style.transition = 'opacity 0.2s ease';
        item.style.opacity = '0';
        setTimeout(function () {
          item.style.display = 'none';
        }, 200);
      }
    });

    // Brojač vidljivih stavki
    updateCount(category);
  }

  /* ── Ažuriraj brojač (opciono) ── */
  function updateCount(category) {
    const counter = document.querySelector('.gallery-count');
    if (!counter) return;
    const visible = category === 'sve'
      ? galleryItems.length
      : document.querySelectorAll('.gallery-item[data-category="' + category + '"]').length;
    counter.textContent = visible + ' ' + (visible === 1 ? 'fotografija' : 'fotografija');
  }

  /* ── Klik na filter dugmad ── */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Ukloni active sa svih
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      // Dodaj active na kliknuto
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      filterGallery(category);
    });
  });

  /* ── Lightbox (jednostavan) ── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const emoji = item.querySelector('.gallery-thumb-emoji');
        const caption = item.querySelector('.gallery-caption');

        lightboxImg.textContent = emoji ? emoji.textContent : '🐾';
        if (lightboxCaption && caption) {
          lightboxCaption.textContent = caption.textContent;
        }
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ── Inicijalizacija ── */
  filterGallery('sve');
  updateCount('sve');

});