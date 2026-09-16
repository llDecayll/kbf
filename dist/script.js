const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });
}

const farmContent = {
  location: {
    kicker: 'The land beneath the legacy',
    title: 'Rooted in Yelandur. Designed Around the Land.',
    description: 'Located in Yeragamballi Village, Yelandur Taluk, near the foothills of BR Hills, Krushi Bhoomi Farms spans Phase 1 across 22 acres of managed farmland. The farming model has been planned around the region’s red loam soil, local growing conditions and an integrated mix of sandalwood, fruit orchards and farm activities.',
    left: 'Fertile Red Loam.', right: 'Phase 1 @ 22 Acres'
  },
  sandalwood: {
    kicker: 'A long-term plantation asset',
    title: 'Sandalwood — A Long-Term Plantation Asset Nurtured for Growth.',
    description: 'Sandalwood forms the long-term plantation component across 22 acres in Phase 1 of Krushi Bhoomi, professionally nurtured as part of the farm’s multi-year growth journey. Each managed plot integrates sandalwood and fruit trees under expert on-ground care, planned around the region’s suitable red loam soil and local growing conditions.',
    left: 'Multi-Year Journey.', right: 'Phase 1 @ 22 Acres'
  },
  organic: {
    kicker: 'Cultivated without compromise',
    title: '100% Chemical-Free Organic Crops & Companion Farming for Healthy Soil.',
    description: 'We practice responsible organic farming with companion crops such as pulses, turmeric, millets, and vegetables. Nourished by in-house Jeevamrutha and vermicompost derived from livestock, our practices build rich soil microbiology, protect biodiversity, and support the long-term health of the land.',
    left: '100% Organic.', right: 'Soil Vitality'
  },
  orchards: {
    kicker: 'Seasonal harvest potential',
    title: 'Fruit Orchards — Productive Value Through the Seasons.',
    description: 'Carefully planned fruit plantations bring diversity to the farm, creating seasonal harvest potential while supporting a vibrant and productive farm ecosystem. Varieties including mango, guava, chikoo, pomegranate, lemon, and amla complement the perennial trees and add recurring agricultural activity.',
    left: 'Seasonal Harvests.', right: 'Living Orchard'
  },
  livestock: {
    kicker: 'Bringing the farm ecosystem to life',
    title: 'Livestock — Bringing the Farm Ecosystem to Life.',
    description: 'Indigenous livestock forms part of the integrated farming model, supporting a more active, diversified and naturally connected farm environment. Cattle and sheep contribute natural manure for soil enrichment while our on-ground team manages day-to-day care and supervision.',
    left: 'Integrated Ecosystem.', right: 'Living Farm'
  }
};

const farmChips = document.querySelectorAll('[data-farm-tab]');
const farmPanel = document.querySelector('#farm-panel');
farmChips.forEach(chip => chip.addEventListener('click', () => {
  const content = farmContent[chip.dataset.farmTab];
  farmChips.forEach(item => {
    const selected = item === chip;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  farmPanel.classList.add('changing');
  window.setTimeout(() => {
    document.querySelector('#farm-kicker').textContent = content.kicker;
    document.querySelector('#farm-title').textContent = content.title;
    document.querySelector('#farm-description').textContent = content.description;
    document.querySelector('#farm-note-left').textContent = content.left;
    document.querySelector('#farm-note-right').textContent = content.right;
    farmPanel.classList.remove('changing');
  }, 120);
}));

document.querySelectorAll('details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details').forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

const galleryItems = document.querySelectorAll('[data-gallery-src]');
const galleryLightbox = document.querySelector('#galleryLightbox');
const galleryLarge = document.querySelector('#galleryLarge');
const galleryClose = document.querySelector('#galleryClose');

if (galleryLightbox && galleryLarge && galleryClose) {
  const closeGallery = () => {
    galleryLightbox.hidden = true;
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => item.addEventListener('click', () => {
    const preview = item.querySelector('img');
    galleryLarge.src = item.dataset.gallerySrc;
    galleryLarge.alt = preview?.alt || 'Krushi Bhoomi Farms';
    galleryLightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    galleryClose.focus();
  }));

  galleryClose.addEventListener('click', closeGallery);
  galleryLightbox.addEventListener('click', event => {
    if (event.target === galleryLightbox) closeGallery();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !galleryLightbox.hidden) closeGallery();
  });
}
