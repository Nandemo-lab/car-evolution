// Editorial discovery graph. Keep this intentionally small and explicit:
// relationships should reflect sibling models, class and likely comparison
// intent rather than being generated from maker or publication order.
export const relatedCars = {
  alphard: ['vellfire', 'voxy', 'delica-d5'],
  vellfire: ['alphard', 'voxy', 'delica-d5'],
  noah: ['voxy', 'serena', 'stepwgn'],
  voxy: ['noah', 'serena', 'stepwgn'],
  esquire: ['noah', 'voxy', 'alphard'],
  serena: ['voxy', 'stepwgn', 'noah'],
  stepwgn: ['serena', 'voxy', 'freed'],
  freed: ['sienta', 'stepwgn', 'solio'],
  sienta: ['freed', 'solio', 'noah'],
  'delica-d5': ['serena', 'stepwgn', 'alphard'],
  solio: ['sienta', 'freed', 'spacia'],
  'n-box': ['spacia', 'solio', 'freed'],
  spacia: ['n-box', 'solio', 'sienta'],
  hustler: ['spacia', 'jimny', 'n-box'],
  roomy: ['solio', 'sienta', 'freed'],
  move: ['tanto', 'n-box', 'spacia'],
}

export function getSlugFromPath(pathname = window.location.pathname) {
  return pathname.split('/').pop()?.replace(/\.html$/, '') || ''
}

// TOP is a single catalogue, not a collection of page hero crops. Every
// non-anchor asset is rendered to the same front-right studio specification.
const topCardImages = {
  alphard: '/images/cars/alphard/top-card-v2.webp',
  vellfire: '/images/cars/vellfire/top-card-v2.webp',
  noah: '/images/cars/noah/top-card-front-right-v2.png',
  voxy: '/images/cars/voxy/top-card-front-right-v2.png',
  esquire: '/images/cars/esquire/top-card-front-right-v2.png',
  prius: '/images/cars/prius/top-card-front-right-v2.png',
  harrier: '/images/cars/harrier/top-card-front-right-v2.png',
  sienta: '/images/cars/sienta/top-card-front-right-v2.png',
  'corolla-cross': '/images/cars/corolla-cross/top-card-front-right-v2.png',
  serena: '/images/cars/serena/top-card-v2.webp',
  stepwgn: '/images/cars/stepwgn/top-card-front-right-v2.png',
  freed: '/images/cars/freed/top-card-front-right-v2.png',
  'n-box': '/images/cars/n-box/top-card-front-right-v2.png',
  vezel: '/images/cars/vezel/top-card-front-right-v2.png',
  'delica-d5': '/images/cars/delica-d5/top-card-front-right-v2.png',
  solio: '/images/cars/solio/top-card-front-right-v2.png',
  spacia: '/images/cars/spacia/top-card-front-right-v2.png',
  tanto: '/images/cars/tanto/top-card-front-right-v2.png',
  hustler: '/images/cars/hustler/top-card-front-right-v2.png',
  roomy: '/images/cars/roomy/m900a-2026-custom-gt-ff-v1.webp',
  move: '/images/cars/move/top-card-front-right-v2.png',
}

const topCardPresentation = {
  tanto: 1.15,
  'n-box': 1.07,
  spacia: 1.07,
}

// Every published TOP card must be visually checked before its slug is added
// here. Direction alone is insufficient: the nose must dominate the view and
// the side must remain secondary. This explicit record makes a newly added
// model fail the regression suite until somebody confirms both requirements.
// A horizontal flip is not an acceptable audit fix.
export const topCardVisualAudit = Object.fromEntries([
  'alphard', 'vellfire', 'noah', 'voxy', 'esquire', 'prius', 'harrier',
  'sienta', 'corolla-cross', 'serena', 'stepwgn', 'freed', 'n-box',
  'vezel', 'delica-d5', 'solio', 'spacia', 'tanto',
  'rav4', 'cx-5', 'roox', 'delica-mini', 'jimny',
  'hustler', 'roomy', 'move',
].map((slug) => [slug, { direction: 'front-right', angle: 'front-dominant-3q' }]))

// TOP and NEXT DISCOVERY share one art-directed set: same 4:3 canvas,
// camera, vehicle occupancy, wheel baseline and studio floor across all
// published vehicles. Page Hero and comparison imagery remain independent.
export function getDiscoveryImage(car) {
  return topCardImages[car.slug] || car.homeCardImage || car.heroImage
}

export function getDiscoveryStyle(car) {
  const scale = car.topCardScale || topCardPresentation[car.slug] || 1
  return `--top-card-scale:${scale}`
}
