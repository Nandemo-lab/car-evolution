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
  'n-one': ['n-box', 'wagon-r-smile', 'hustler'],
  spacia: ['n-box', 'solio', 'sienta'],
  'wagon-r-smile': ['spacia', 'n-one', 'hustler'],
  hustler: ['spacia', 'jimny', 'n-box'],
  roomy: ['solio', 'sienta', 'wagon-r-smile'],
  move: ['tanto', 'n-box', 'spacia'],
  aqua: ['yaris', 'prius', 'raize'],
  yaris: ['aqua', 'raize', 'sienta'],
  raize: ['yaris', 'corolla-cross', 'rav4'],
}

export function getSlugFromPath(pathname = window.location.pathname) {
  return pathname.split('/').pop()?.replace(/\.html$/, '') || ''
}

// TOP is a single catalogue, not a collection of page hero crops. Every
// non-anchor asset is rendered to the same front-right studio specification.
const topCardImages = Object.fromEntries([
  'alphard','vellfire','noah','voxy','esquire','prius','harrier','sienta','corolla-cross','aqua','rav4','yaris','raize','roomy','serena','roox','stepwgn','freed','n-box','vezel','n-one','delica-d5','delica-mini','solio','spacia','jimny','hustler','wagon-r-smile','tanto','move','cx-5',
].map(slug=>[slug,`/images/top-cards/${slug}.webp`]))

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
  'hustler', 'roomy', 'move', 'aqua', 'yaris', 'raize', 'n-one', 'wagon-r-smile',
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
