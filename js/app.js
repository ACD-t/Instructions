const searchInput = document.querySelector('[data-search]');
const cards = [...document.querySelectorAll('[data-work-card]')];
const emptyState = document.querySelector('[data-empty-state]');
const toast = document.querySelector('[data-toast]');
const ceilingMenuButton = document.querySelector('[data-open-ceiling-menu]');
const ceilingDialog = document.querySelector('[data-ceiling-dialog]');
const ceilingDialogClose = document.querySelector('[data-close-ceiling-menu]');
let toastTimer;

const showToast = () => {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
};

const openCeilingDialog = () => {
  if (!ceilingDialog) return;
  ceilingDialog.hidden = false;
  document.body.classList.add('is-dialog-open');
  window.requestAnimationFrame(() => {
    ceilingDialog.classList.add('is-visible');
    ceilingDialog.querySelector('a, button')?.focus();
  });
};

const closeCeilingDialog = () => {
  if (!ceilingDialog) return;
  ceilingDialog.classList.remove('is-visible');
  document.body.classList.remove('is-dialog-open');
  window.setTimeout(() => {
    ceilingDialog.hidden = true;
    ceilingMenuButton?.focus();
  }, 180);
};

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
    showToast();
  });
});

ceilingMenuButton?.addEventListener('click', (event) => {
  event.preventDefault();
  openCeilingDialog();
});

ceilingDialogClose?.addEventListener('click', closeCeilingDialog);

ceilingDialog?.addEventListener('click', (event) => {
  if (event.target === ceilingDialog) closeCeilingDialog();
});

document.querySelectorAll('[data-coming-soon-option]').forEach((option) => {
  option.addEventListener('click', () => {
    closeCeilingDialog();
    window.setTimeout(showToast, 200);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && ceilingDialog?.classList.contains('is-visible')) {
    closeCeilingDialog();
  }
});

document.querySelectorAll('[data-close-lesson]').forEach((button) => {
  button.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
