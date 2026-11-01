const works = window.ARTWORKS || [];
const gallery = document.querySelector('#gallery');
const filters = document.querySelector('#filters');
const viewer = document.querySelector('#viewer');
let selectedIndex = 0;
let visibleWorks = works;
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function render(category = 'All works') {
  visibleWorks = works.filter(work => category === 'All works' || work.category === category);
  gallery.replaceChildren();
  document.querySelector('#work-count').textContent = `${String(visibleWorks.length).padStart(2, '0')} works`;
  visibleWorks.forEach((work, index) => {
    const figure = element('figure', 'work');
    const button = element('button', 'image-button');
    button.setAttribute('aria-label', `View ${work.title}`);
    const img = element('img');
    img.src = work.file;
    img.alt = work.description || work.title;
    img.loading = index < 2 ? 'eager' : 'lazy';
    if (work.width && work.height) { img.width = work.width; img.height = work.height; }
    const arrow = element('span', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    button.append(img, arrow);
    button.addEventListener('click', () => { selectedIndex = index; updateViewer(); viewer.showModal(); });
    const caption = element('figcaption');
    const text = element('div');
    text.append(element('h3', '', work.title), element('p', '', [work.category, work.date].filter(Boolean).join(' / ')));
    caption.append(text, element('span', 'work-number', String(index + 1).padStart(2, '0')));
    figure.append(button, caption);
    gallery.append(figure);
  });
}
function updateViewer() {
  const work = visibleWorks[selectedIndex];
  const image = document.querySelector('#viewer-image');
  image.src = work.file;
  image.alt = work.description || work.title;
  document.querySelector('#viewer-title').textContent = work.title;
  document.querySelector('#viewer-description').textContent = work.description || '';
  document.querySelector('#viewer-position').textContent = `${selectedIndex + 1} / ${visibleWorks.length}`;
  const source = document.querySelector('#viewer-source');
  source.hidden = !work.source;
  if (work.source) source.href = work.source;
}
function step(direction) { if (!visibleWorks.length) return; selectedIndex = (selectedIndex + direction + visibleWorks.length) % visibleWorks.length; updateViewer(); }
const categories = [...new Set(works.map(work => work.category).filter(Boolean))];
if (categories.length > 1) {
  filters.hidden = false;
  ['All works', ...categories].forEach((category, index) => {
    const button = element('button', '', category);
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      render(category);
    });
    filters.append(button);
  });
}
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
document.querySelector('#previous').addEventListener('click', () => step(-1));
document.querySelector('#next').addEventListener('click', () => step(1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
});
render();
