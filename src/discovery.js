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

const topCardPresentation = {
  harrier: '-1 1',
  'n-box': 1.07,
  spacia: 1.07,
}

// TOP and NEXT DISCOVERY share one art-directed set: same 4:3 canvas,
// camera, vehicle occupancy, wheel baseline and studio floor across all
// published vehicles. Page Hero and comparison imagery remain independent.
export function getDiscoveryImage(car) {
  return topCardImages[car.slug] || car.homeCardImage || car.heroImage
}

export function getDiscoveryStyle(car) {
  return `--top-card-scale:${topCardPresentation[car.slug] || 1}`
}
