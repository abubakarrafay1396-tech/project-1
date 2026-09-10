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
  if (section) { e.preventDefault(); section.scrollIntoView({ behavior: 'smooth' }); }
}));
