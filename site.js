const image = document.querySelector('#case-image');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let request = 0;
for (const detail of document.querySelectorAll('[data-frame]')) {
  detail.addEventListener('toggle', async () => {
    if (!detail.open) return;
    const current = ++request;
    const next = new Image();
    next.src = detail.dataset.frame;
    try { await next.decode(); } catch { return; }
    if (current !== request) return;
    image.src = next.src;
    image.alt = detail.dataset.alt;
    image.getAnimations().forEach(animation => animation.cancel());
    if (!reduced.matches) {
      image.animate([{clipPath:'inset(0 100% 0 0)',opacity:.5},{clipPath:'inset(0)',opacity:1}], {duration:500,easing:'ease-out'});
    }
  });
}

const options = [...document.querySelectorAll('.cases details')];
const draft = document.querySelector('#smart-draft');
const meter = document.querySelector('.signal-meter');
const messages = ['У меня загорелся индикатор на панели. Когда можно приехать на диагностику?', 'Слышен шум или машину уводит. Когда можно проверить ходовую и тормоза?', 'Подошло время ТО. Когда можно приехать и что нужно уточнить заранее?'];
function updateDraft(index) {
  meter.dataset.step = index;
  draft.href = 'https://t.me/+79016701460?text=' + encodeURIComponent('Здравствуйте! ' + messages[index]);
}
options.forEach((option, index) => option.addEventListener('toggle', () => {
  if (option.open) updateDraft(index);
}));
updateDraft(Math.max(0, options.findIndex(option => option.open)));
