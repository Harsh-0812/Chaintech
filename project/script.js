// Basic interactive behaviors: nav toggle, smooth scroll, modal, CV link behavior
document.addEventListener('DOMContentLoaded', function () {

  // NAV TOGGLE (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('main-nav');
  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // SMOOTH SCROLL for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav if open
        if (navList.classList.contains('show')) {
          navList.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // PORTFOLIO MODAL
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const closeBtn = document.querySelector('.modal-close');

  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const title = this.dataset.title || 'Project';
      const img = this.dataset.img || 'assets/port-img.png';
      modalImg.src = img;
      modalImg.alt = title + ' preview';
      modalTitle.textContent = title;
      modalDesc.textContent = 'Project details and description go here. Replace with actual content from Figma or project notes.';
      modalLink.href = '#'; // set to real project URL if available
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeBtn && closeBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  // close modal on overlay click
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  // ESC to close modal
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Lazy fallback: ensure images have alt and loading, basic check
  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('alt')) img.alt = '';
  });

});
