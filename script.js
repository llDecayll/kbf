const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const farmContent = {
  location: {
    kicker: 'The land beneath the legacy',
    title: 'Prime Location in Yelandur With Fertile Red Soil & Abundant Groundwater.',
    description: 'Located in Yeragamballi Village, Yelandur Taluk, at the foothills of BR Hills in the Kaveri basin belt, Krushi Bhoomi Farms offers exceptional location advantages across 120 acres. The nutrient-dense, well-aerated red loam soil and rich groundwater table create ideal natural conditions for sandalwood heartwood development, organic fruit orchards, and diverse chemical-free crops.',
    left: 'Fertile Red Soil.', right: 'Kaveri Basin Advantage'
  },
  sandalwood: {
    kicker: 'Harvesting legacy',
    title: 'Where Nature Meets Opportunity — Own Land, Trees, And A Living Legacy.',
    description: 'Krushi Bhoomi Farms is a one-of-a-kind managed farmland project spread across 120 acres of lush greenery in Yelandur, Karnataka. Each 6,500 sq. ft. plot is thoughtfully designed with 40 to 50 sandalwood and fruit-bearing trees for long-term, high-value returns. Every plot owner can also keep a cow and sheep on the farm — generating regular income and a deeper connection with nature. We’re not just selling land, we’re helping you create a legacy.',
    left: 'Harvesting Legacy.', right: 'Planting Tomorrow'
  },
  organic: {
    kicker: 'Cultivated without compromise',
    title: '100% Chemical-Free Organic Crops & Companion Farming for Healthy Soil.',
    description: 'We practice sustainable organic farming with intercrops such as pulses, turmeric, millets, and vegetables. Nourished by in-house Jeevamrutha and vermicompost derived from our livestock, our organic methods build rich soil microbiology, protect biodiversity, and generate continuous intermediate returns alongside perennial trees.',
    left: '100% Organic.', right: 'Zero Chemicals'
  },
  orchards: {
    kicker: 'Seasonal abundance',
    title: 'Fruit Orchards That Add Beauty, Yield, And Steady Seasonal Income.',
    description: 'Every plot is enriched with fruit-bearing trees—including mango, guava, chikoo, pomegranate, lemon, and amla—chosen to complement the sandalwood plantation and create a balanced ecosystem. These orchards add recurring harvest potential, diversify the land use, and make every visit to your farm feel vibrant, productive, and alive.',
    left: 'Seasonal Harvests.', right: 'Living Orchard'
  },
  livestock: {
    kicker: 'Nature in motion',
    title: 'Cattle & Sheep Turn Your Farm Into A Living, Income-Generating Ecosystem.',
    description: 'Plot owners can keep a cow and sheep on the farm, creating an added layer of value beyond the trees themselves. Livestock supports regular milk-based income, natural farm activity, and a stronger emotional connection to the land while our team manages the day-to-day care.',
    left: 'Daily Value.', right: 'Nature In Motion'
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
