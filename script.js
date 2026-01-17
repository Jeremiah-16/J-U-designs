
(() => {
  const nav = document.querySelector('[data-hb-nav]');
  const toggle = nav.querySelector('[data-hb-toggle]');
  const panel = nav.querySelector('[data-hb-panel]');

  toggle.addEventListener('click', () => {
    const isOpen = panel.getAttribute('data-visible') === 'true';

    panel.setAttribute('data-visible', !isOpen);
    toggle.setAttribute('data-open', !isOpen);
  });

  // Close nav when clicking a link
  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      panel.setAttribute('data-visible', 'false');
      toggle.setAttribute('data-open', 'false');
    });
  });
})();

const cards = document.querySelectorAll(".card");
const overlay = document.getElementById("overlay");
const img = document.getElementById("expanded-img");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;
let startX = 0;
let startY = 0;


function openViewer(index) {
  const card = cards[index];

  img.src = card.querySelector("img").src;
  title.textContent = card.dataset.title;
  desc.textContent = card.dataset.desc;

  currentIndex = index;
  overlay.classList.add("active");
}


function closeViewer() {
  overlay.classList.remove("active");
}


function nextImage() {
  currentIndex = (currentIndex + 1) % cards.length;
  openViewer(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  openViewer(currentIndex);
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => openViewer(index));
});

closeBtn.addEventListener("click", closeViewer);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeViewer();
});

overlay.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

overlay.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 50) prevImage();
    if (diffX < -50) nextImage();
  } else {
    if (diffY > 80) closeViewer();
  }
});
