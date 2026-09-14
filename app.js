const searchInput = document.querySelector('[data-search]');
const cards = [...document.querySelectorAll('[data-work-card]')];
const emptyState = document.querySelector('[data-empty-state]');
const toast = document.querySelector('[data-toast]');
let toastTimer;

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLocaleLowerCase('ru-RU');
    let visibleCount = 0;

    cards.forEach((card) => {
      const isVisible = card.dataset.title.toLocaleLowerCase('ru-RU').includes(query);
      card.closest('li').hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    emptyState?.classList.toggle('is-visible', visibleCount === 0);
  });
}

cards.forEach((card) => {
  if (!card.hasAttribute('data-coming-soon')) return;

  card.addEventListener('click', (event) => {
    event.preventDefault();
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
  });
});

document.querySelectorAll('[data-close-lesson]').forEach((button) => {
  button.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
