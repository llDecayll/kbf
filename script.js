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
    kicker: 'Demand-aligned seasonal farming',
    title: 'Seasonal Crops, Flowers & Companion Farming Guided by Market Demand.',
    description: 'We practice responsible farming with seasonal companion crops, commercial flower cultivation, pulses, turmeric, millets, and vegetables — dynamically planned as per seasonal requirements and prevailing market demand. Nourished with in-house Jeevamrutha and vermicompost from our livestock, these integrated projects enrich soil microbiology, enhance biodiversity, and optimize land productivity alongside perennial trees.',
    left: 'Crops & Flowers.', right: 'Market-Demand Driven'
  },
  orchards: {
    kicker: 'Seasonal harvest potential',
    title: 'Seasonal Fruits & Orchards — High Market Demand & Natural Yield.',
    description: 'Carefully planned seasonal fruit plantations bring recurring value and agricultural diversity to the farm. High-demand varieties—including mango, guava, chikoo, pomegranate, lemon, and amla—are selected and managed as per regional agro-climatic suitability and seasonal market demand, creating consistent harvest potential and a productive farm ecosystem.',
    left: 'Seasonal Fruits.', right: 'Market-Aligned Projects'
  },
  livestock: {
    kicker: 'Integrated farm ecosystem',
    title: 'Livestock & Integrated Projects — A Dynamic, Self-Sustaining Farm.',
    description: 'Indigenous livestock and complementary farm projects form a multifaceted, integrated farming model adapted to market requirements and operational cycles. Cattle and sheep supply natural organic manure and Jeevamrutha for our seasonal fruits, flowers, and intercrops, ensuring an active, self-sustaining farm asset under full on-ground care.',
    left: 'Integrated Ecosystem.', right: 'Demand-Based Projects'
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
