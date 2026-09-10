const io = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('show'); io.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal, .reveal-card').forEach(el => io.observe(el));

const cursor = document.querySelector('.cursor');
if (cursor && matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
  document.querySelectorAll('a').forEach(a => { a.addEventListener('mouseenter', () => cursor.classList.add('active')); a.addEventListener('mouseleave', () => cursor.classList.remove('active')); });
}

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
  const section = document.querySelector(link.getAttribute('href'));
  if (section) {
    e.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.site-header')?.classList.remove('menu-open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  }
}));

const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');
menuToggle?.addEventListener('click', () => {
  const isOpen = siteHeader.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Close navigation menu' : 'Open navigation menu';
});

const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project[data-category]');
filters.forEach(filter => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  filters.forEach(button => {
    const isActive = button === filter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  projects.forEach(project => {
    const show = category === 'all' || project.dataset.category === category;
    project.hidden = !show;
  });
}));

document.querySelectorAll('.video-thumb img').forEach(image => {
  let hasTriedFallback = false;
  const useFallback = () => {
    if (!hasTriedFallback && image.dataset.fallback) {
      hasTriedFallback = true;
      image.src = image.dataset.fallback;
    } else {
      image.closest('.video-thumb')?.classList.add('image-unavailable');
    }
  };
  image.addEventListener('error', useFallback);
  image.addEventListener('load', () => {
    if (image.naturalWidth < 300 || image.naturalHeight < 180) useFallback();
  });
});
