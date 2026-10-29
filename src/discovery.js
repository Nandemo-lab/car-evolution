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
}

export function getSlugFromPath(pathname = window.location.pathname) {
  return pathname.split('/').pop()?.replace(/\.html$/, '') || ''
}

const topCardImages = Object.fromEntries(
  Object.keys(relatedCars).map((slug) => [slug, `/images/cars/${slug}/top-card-v2.webp`])
)
topCardImages.stepwgn = '/images/cars/stepwgn/top-card-v3.webp'
topCardImages.harrier = '/images/cars/harrier/top-card-v3.png'
topCardImages.vezel = '/images/cars/vezel/top-card-2026-v3.png'
topCardImages.tanto = '/images/cars/tanto/top-card-v1.png'

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
].map((slug) => [slug, { direction: 'front-right', angle: 'front-dominant-3q' }]))

// TOP and NEXT DISCOVERY share one art-directed set: same 4:3 canvas,
// camera, vehicle occupancy, wheel baseline and studio floor across all
// published vehicles. Page Hero and comparison imagery remain independent.
export function getDiscoveryImage(car) {
  return topCardImages[car.slug] || car.homeCardImage || car.heroImage
}

export function getDiscoveryStyle(car) {
  const scale = car.topCardScale || topCardPresentation[car.slug] || 1
  const flip = car.topCardFlip || 1
  const position = car.topCardPosition || '50% 50%'
  return `--top-card-scale:${scale};--top-card-flip:${flip};--top-card-position:${position}`
}
