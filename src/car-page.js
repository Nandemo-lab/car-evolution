import './car-page.css'

// CarVista -- shared vehicle-page engine ---------------------------
// Every vehicle page (VOXY, Alphard, ...) shares this exact engine and
// the same static HTML skeleton (see voxy.html / alphard.html). Only
// the data differs -- see src/cars/*.js (pure data) + src/entries/*.js
// (the 3-line bootstrap that calls initCarPage). Adding a new vehicle:
// (1) read docs/brand/design-identity.md and define this vehicle's
//     Design Identity keywords BEFORE writing any copy -- annotations,
//     facelift text, and SEO description all get checked against it,
//     not invented per-page; (2) write src/cars/<vehicle>.js matching
//     the shape below, (3) copy src/entries/voxy.js and swap the
//     import, (4) copy an existing vehicle's HTML skeleton verbatim,
//     changing only <head> SEO tags and the closing <script src>;
//     (5) run the Quality Gate checklist in design-identity.md before
//     publishing.
//
// Data shape expected by initCarPage(config):
// {
//   eyebrow: 'CARVISTA',
//   vehicleName: 'VOXY',
//   brand: 'トヨタ',            // JSON-LD only, see vite.config.js
//   maker: 'Toyota',            // English, Home page maker grouping
//   order: 1,                   // Home page display order
//   featured: true,             // include in Home's curated Featured Cards (All Cars always shows every vehicle regardless)
//   designRole: 'The expressive choice.',               // one-line "what is this vehicle" -- read first
//   designIdentity: ['Sharp', 'Dynamic', 'Aggressive'], // see docs/brand/design-identity.md
//   designAvoid: ['Elegant', 'Luxury', 'Formal'],       // words this vehicle's copy must not reach for
//   representativeGrade: 'Standard model',              // fixed spec shown across every generation's image
//   representativeColor: 'Attitude Black Mica',         // fixed color shown across every generation's image
//   tagline: 'かたちは、時代を語る。',
//   heroImage: '/images/cars/voxy/hero-gen4-3q.png',
//   defaultIndex: 3,
//   generations: [
//     {
//       numeral, era, title, code, startYear, yearRange, period, image,
//       annotations: [{ x, y, label, dir: 'top'|'bottom', labelX }],
//       facelift: { fromYear, toYear, note?, points: [...] } | null,
//     },
//     ...
//   ],
// }

// Fallback for any generation whose photo hasn't been produced/placed
// yet -- rather than a browser's broken-image icon, the image's own
// box shows a quiet "画像準備中" label (see .image-missing-label in
// car-page.css) and the <img> itself stays wired completely normally:
// the moment a real file lands at that exact path, the very next load
// succeeds and this fallback simply never fires again -- no flag to
// unset anywhere, no data file to edit, self-healing by construction.
function withImageFallback(img) {
  const label = document.createElement('span')
  label.className = 'image-missing-label'
  label.textContent = '画像準備中'
  img.insertAdjacentElement('afterend', label)
  img.addEventListener('error', () => {
    img.style.visibility = 'hidden'
    label.classList.add('is-visible')
  })
  img.addEventListener('load', () => {
    img.style.visibility = ''
    label.classList.remove('is-visible')
  })
  return img
}

export function initCarPage(config) {
  const { generations, defaultIndex } = config

  renderHero(config)
  renderHeritage(generations)
  renderTimeline(generations, config.vehicleName)

  const detailRefs = getDetailRefs()
  // Below the fold on every vehicle page's initial load -- defer the
  // network fetch until the browser expects it to be needed, instead of
  // competing with the hero image for bandwidth.
  detailRefs.image.loading = 'lazy'
  detailRefs.image.decoding = 'async'
  withImageFallback(detailRefs.image)
  const engine = createDetailEngine(detailRefs, generations, defaultIndex, config.vehicleName)
  engine.render(generations[defaultIndex])

  // A state switcher, not a page-jump: the timeline swaps which
  // generation is shown in place, scroll position untouched. An earlier
  // version auto-scrolled to the detail section on every click, which
  // fought a reader who was scrolling through the timeline itself.
  document.getElementById('timeline').addEventListener('click', (event) => {
    const btn = event.target.closest('.timeline-item')
    if (!btn) return
    engine.showGeneration(Number(btn.dataset.gen))
  })

  initCompare(generations)
}

// ---- Hero / Heritage / Timeline (static-shaped, data-driven) ----------

function renderHero(config) {
  const heroImage = document.getElementById('hero-image')
  // This is the LCP element on every vehicle page -- fetchPriority tells
  // the browser to fetch it ahead of same-priority requests (fonts, the
  // timeline's own thumbnails) instead of competing with them evenly.
  heroImage.fetchPriority = 'high'
  heroImage.src = config.heroImage
  heroImage.alt = config.vehicleName
  document.getElementById('hero-eyebrow').textContent = config.eyebrow
  document.getElementById('hero-title').textContent = config.vehicleName
  document.getElementById('tagline').textContent = config.tagline
}

// A quiet strip of each generation's own start year, plus "現在" for
// whichever is still current. No labels, no explanation -- the numbers
// alone carry the sense of history.
function renderHeritage(generations) {
  const el = document.getElementById('heritage')
  const points = generations.map((gen, index) => {
    const isLast = index === generations.length - 1
    const year = isLast ? '現在' : gen.startYear
    return `<div class="heritage-point"><span class="heritage-year">${year}</span></div>`
  })
  el.innerHTML = points.join('<span class="heritage-line"></span>')
}

function renderTimeline(generations, vehicleName) {
  const nav = document.getElementById('timeline')
  const rail = document.createElement('div')
  rail.className = 'timeline-rail'
  nav.innerHTML = ''
  nav.appendChild(rail)

  generations.forEach((gen, index) => {
    const btn = document.createElement('button')
    btn.className = 'timeline-item'
    btn.type = 'button'
    btn.dataset.gen = String(index)
    if (index === generations.length - 1) btn.setAttribute('aria-current', 'true')
    btn.innerHTML = `
      <span class="timeline-thumb"><img src="${gen.image}" alt="${gen.era} ${vehicleName}" loading="lazy" decoding="async" /></span>
      <span class="timeline-tag">
        <span class="timeline-numeral">${gen.numeral}</span>
        <span class="timeline-year">${gen.yearRange}</span>
      </span>
    `
    withImageFallback(btn.querySelector('.timeline-thumb img'))
    nav.appendChild(btn)
  })
}

// ---- Detail section: image, evolution-point callouts, facelift --------

function getDetailRefs() {
  return {
    detail: document.getElementById('detail'),
    image: document.getElementById('detail-image'),
    dots: document.getElementById('detail-dots'),
    callouts: document.getElementById('detail-callouts'),
    text: document.querySelector('.detail-text'),
    numeral: document.getElementById('detail-numeral'),
    era: document.getElementById('detail-era'),
    title: document.getElementById('detail-title'),
    code: document.getElementById('detail-code'),
    period: document.getElementById('detail-period'),
    facelift: document.getElementById('facelift'),
    facelistToggle: document.getElementById('facelift-toggle'),
    facelistNote: document.getElementById('facelift-note'),
    facelistList: document.getElementById('facelift-list'),
    facelistFromYear: document.getElementById('facelift-from-year'),
    facelistToYear: document.getElementById('facelift-to-year'),
  }
}

// .detail-visual is a 1408x903 virtual canvas (see car-page.css); the
// photo itself only occupies the middle 74%, with a 13% margin above
// and below for callouts -- widened from an earlier 10%/80%/10% split
// after real content (long Japanese labels, multiple annotations on
// one generation) needed more vertical room at narrow viewports than
// the original split allowed. These constants convert a dot's position
// on the PHOTO (0-100) into position on the full VISUAL canvas, so the
// leader line and label land in that margin instead of on the car.
const VISUAL_MARGIN_PCT = 13
const VISUAL_IMAGE_PCT = 74
const toVisualY = (y) => VISUAL_MARGIN_PCT + (y / 100) * VISUAL_IMAGE_PCT

export function renderDots(container, annotations) {
  container.innerHTML = annotations
    .map((a) => `<span class="annotation-dot" style="left:${a.x}%;top:${a.y}%"></span>`)
    .join('')
}

export function renderCallouts(container, annotations) {
  // Lines stop a few units short of the margin's outer edge rather than
  // running all the way to it -- a deliberate gap (the label itself
  // still sits at the true edge via .annotation-label--top/--bottom's
  // CSS) that reads as a shorter, more restrained leader line, closer
  // to the way Apple's product pages callout lines stop well short of
  // their caption instead of touching it.
  const rowY = { top: 6, bottom: 94 }
  const lines = annotations
    .map((a) => `<line x1="${a.x}" y1="${toVisualY(a.y)}" x2="${a.labelX}" y2="${rowY[a.dir]}" vector-effect="non-scaling-stroke" />`)
    .join('')
  const labels = annotations
    .map((a) => `<span class="annotation-label annotation-label--${a.dir}" style="left:${a.labelX}%">${a.label}</span>`)
    .join('')
  container.innerHTML = `<svg class="annotation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>${labels}`
}

// The generation's own mid-cycle story: collapsed by default, opened
// only on request, so it never adds to the initial information a
// reader has to take in -- discovery before explanation, applied one
// level deeper than the timeline itself. Deliberately no "minor
// change" label anywhere -- two years and an arrow read as history,
// not as a system category the reader has to learn. `note` is optional
// and only present when a generation's change wasn't primarily visual
// -- not every generation gets forced into the same three-bullet shape.
function renderFacelift(refs, data) {
  refs.facelift.hidden = !data
  if (!data) return
  refs.facelistFromYear.textContent = data.fromYear
  refs.facelistToYear.textContent = data.toYear
  refs.facelistNote.textContent = data.note || ''
  refs.facelistNote.hidden = !data.note
  refs.facelistList.innerHTML = data.points.map((p) => `<li>${p}</li>`).join('')
  refs.facelistToggle.setAttribute('aria-expanded', 'false')
  refs.facelistNote.classList.remove('is-open')
  refs.facelistList.classList.remove('is-open')
}

function createDetailEngine(refs, generations, defaultIndex, vehicleName) {
  const SLIDE_PX = 20
  const SWAP_DELAY_MS = 260
  const GROUPS = [refs.image, refs.dots, refs.callouts, refs.text]
  let currentIndex = defaultIndex

  refs.facelistToggle.addEventListener('click', () => {
    const isOpen = refs.facelistToggle.getAttribute('aria-expanded') === 'true'
    refs.facelistToggle.setAttribute('aria-expanded', String(!isOpen))
    refs.facelistNote.classList.toggle('is-open', !isOpen)
    refs.facelistList.classList.toggle('is-open', !isOpen)
  })

  function setSlideState(offsetPx, opacity) {
    GROUPS.forEach((el) => {
      el.style.opacity = String(opacity)
      el.style.transform = `translateX(${offsetPx}px)`
    })
  }

  function render(gen) {
    refs.image.src = gen.image
    refs.image.alt = `${gen.era} ${vehicleName} ${gen.title}`
    refs.numeral.textContent = gen.numeral
    refs.era.textContent = gen.era
    refs.title.textContent = gen.title
    refs.code.textContent = gen.code
    refs.period.textContent = gen.period
    renderDots(refs.dots, gen.annotations)
    renderCallouts(refs.callouts, gen.annotations)
    renderFacelift(refs, gen.facelift)
  }

  function showGeneration(index) {
    if (index === currentIndex) return
    const gen = generations[index]
    const goingForward = index > currentIndex
    currentIndex = index

    document.querySelectorAll('.timeline-item').forEach((btn) => {
      btn.setAttribute('aria-current', String(Number(btn.dataset.gen) === index))
    })

    // exit: content slides toward the direction of travel while fading out
    setSlideState(goingForward ? -SLIDE_PX : SLIDE_PX, 0)

    window.setTimeout(() => {
      render(gen)
      // jump to the entry position with no transition, then animate back to rest
      GROUPS.forEach((el) => { el.style.transition = 'none' })
      setSlideState(goingForward ? SLIDE_PX : -SLIDE_PX, 0)
      void refs.image.offsetWidth
      GROUPS.forEach((el) => { el.style.transition = '' })
      setSlideState(0, 1)
    }, SWAP_DELAY_MS)
  }

  return { render, showGeneration }
}

// ---- Compare: drag-reveal slider ---------------------------------------
// Both photos occupy the same frame at once; dragging the divider
// reveals one under the other, so "what changed" is visible directly
// instead of remembered across a swap.
//
// Either side can be set to any generation independently via the two
// numeral-chip rows in #compare-tabs (left = older, right = newer,
// matching the site's left=old/right=new convention) -- not just
// adjacent pairs. loadPair() does all the per-pair setup (images,
// labels, dots, chip selected/disabled state) and is returned from
// initCompare in case something else ever needs to trigger a pair
// change programmatically.
//
// newer is always the visible base layer; older is the overlay
// revealed from the left as the drag handle moves right.
function initCompare(generations) {
  const tabs = document.getElementById('compare-tabs')
  const stage = document.getElementById('compare-stage')
  const baseImage = document.getElementById('compare-base-image')
  const overlay = document.getElementById('compare-overlay')
  const overlayImage = document.getElementById('compare-overlay-image')
  const divider = document.getElementById('compare-divider')
  const labelLeft = document.getElementById('compare-label-left')
  const labelRight = document.getElementById('compare-label-right')

  // Further below the fold than the detail section -- same reasoning
  // as detailRefs.image above.
  baseImage.loading = 'lazy'
  baseImage.decoding = 'async'
  overlayImage.loading = 'lazy'
  overlayImage.decoding = 'async'
  withImageFallback(baseImage)
  withImageFallback(overlayImage)

  // CarVista is "a catalog to look at," not a settings screen -- so the
  // default state shows only the current pair as plain text ("80系 ⇄
  // 90系"), and the tap-to-pick chip picker (same numeral chips as
  // before) stays collapsed until that text is tapped, then folds back
  // away the moment a new pair is chosen. Two earlier versions (native
  // <select>s, then always-visible chip rows) both kept picker UI on
  // screen permanently; this is the one that actually disappears.
  tabs.innerHTML = `
    <button class="compare-pair-toggle" id="compare-pair-toggle" type="button" aria-expanded="false" aria-controls="compare-picker" title="比較対象を変更">
      <span id="compare-pair-text"></span>
    </button>
    <div class="compare-picker" id="compare-picker">
      <div class="compare-picker-row">
        <span class="compare-picker-label">旧</span>
        <div class="compare-picker-chips" id="compare-picker-left"></div>
      </div>
      <div class="compare-picker-row">
        <span class="compare-picker-label">新</span>
        <div class="compare-picker-chips" id="compare-picker-right"></div>
      </div>
    </div>
  `
  const chipsHtml = generations
    .map((gen, i) => `<button class="compare-chip" type="button" data-index="${i}">${gen.numeral}</button>`)
    .join('')
  const pairToggle = document.getElementById('compare-pair-toggle')
  const pairText = document.getElementById('compare-pair-text')
  const picker = document.getElementById('compare-picker')
  const pickerLeft = document.getElementById('compare-picker-left')
  const pickerRight = document.getElementById('compare-picker-right')
  pickerLeft.innerHTML = chipsHtml
  pickerRight.innerHTML = chipsHtml

  function setPickerOpen(open) {
    picker.classList.toggle('is-open', open)
    pairToggle.setAttribute('aria-expanded', String(open))
  }
  pairToggle.addEventListener('click', () => {
    setPickerOpen(!picker.classList.contains('is-open'))
  })

  let split = 50
  let older
  let newer
  let leftIndex
  let rightIndex

  function loadPair(oldIndex, newIndex) {
    leftIndex = oldIndex
    rightIndex = newIndex
    older = generations[oldIndex]
    newer = generations[newIndex]

    // Left chips at or past the current right stay selectable-looking
    // but disabled (rather than silently reassigning the other side),
    // and vice versa -- a tappable picker should show its own
    // constraint, not surprise a reader by moving something they didn't touch.
    pickerLeft.querySelectorAll('.compare-chip').forEach((chip) => {
      const i = Number(chip.dataset.index)
      chip.setAttribute('aria-current', String(i === oldIndex))
      chip.disabled = i >= rightIndex
    })
    pickerRight.querySelectorAll('.compare-chip').forEach((chip) => {
      const i = Number(chip.dataset.index)
      chip.setAttribute('aria-current', String(i === newIndex))
      chip.disabled = i <= leftIndex
    })

    baseImage.src = newer.image
    baseImage.alt = newer.title
    overlayImage.src = older.image
    overlayImage.alt = older.title
    labelLeft.textContent = older.title
    labelRight.textContent = newer.title
    pairText.textContent = `${older.title} ⇄ ${newer.title}`

    // Compare mode shows dots only, no labels -- it's the purest "photo
    // as the interface" surface on the page, so it points at what
    // changed without re-explaining it (that's the detail section's
    // job above).
    renderDots(document.getElementById('compare-annotations-base'), newer.annotations)
    renderDots(document.getElementById('compare-annotations-overlay'), older.annotations)

    setSplit(50)
  }

  // A pair choice closes the picker automatically -- picking is a single
  // action, not a mode a reader stays in, so it folds back to the plain
  // "X ⇄ Y" text the instant a new pair is set, same as tapping it away
  // manually would.
  pickerLeft.addEventListener('click', (event) => {
    const chip = event.target.closest('.compare-chip')
    if (!chip || chip.disabled) return
    loadPair(Number(chip.dataset.index), rightIndex)
    setPickerOpen(false)
  })
  pickerRight.addEventListener('click', (event) => {
    const chip = event.target.closest('.compare-chip')
    if (!chip || chip.disabled) return
    loadPair(leftIndex, Number(chip.dataset.index))
    setPickerOpen(false)
  })

  function setSplit(value) {
    split = Math.max(0, Math.min(100, value))
    overlay.style.clipPath = `inset(0 ${100 - split}% 0 0)`
    divider.style.left = `${split}%`
  }

  function animateSplit(keyframes, onDone) {
    // keyframes: [[value, durationMs], ...] played in sequence
    let i = 0
    function playNext() {
      if (i >= keyframes.length) { onDone && onDone(); return }
      const [target, duration] = keyframes[i]
      const start = split
      const startTime = performance.now()
      function step(now) {
        const t = Math.min(1, (now - startTime) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setSplit(start + (target - start) * eased)
        if (t < 1) requestAnimationFrame(step)
        else { i += 1; playNext() }
      }
      requestAnimationFrame(step)
    }
    playNext()
  }

  function splitFromPointerX(clientX) {
    const rect = stage.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  // A small, quiet static label -- added back on explicit request after
  // the auto-sweep-only version (see below) turned out to not be
  // enough for first-time clarity on its own. Kept deliberately minimal
  // (no card, no arrow icon) and dismissed the moment a reader actually
  // touches the slider, so it never lingers as clutter once its job is
  // done.
  const hintLabel = document.createElement('span')
  hintLabel.className = 'compare-hint'
  hintLabel.textContent = 'Drag to Compare'
  hintLabel.setAttribute('aria-hidden', 'true')
  stage.appendChild(hintLabel)
  function dismissHint() { hintLabel.classList.add('is-dismissed') }

  let dragging = false
  let hintPlayed = false
  stage.addEventListener('pointerdown', (event) => {
    hintPlayed = true
    dismissHint()
    dragging = true
    stage.setPointerCapture(event.pointerId)
    setSplit(splitFromPointerX(event.clientX))
  })
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return
    setSplit(splitFromPointerX(event.clientX))
  })
  stage.addEventListener('pointerup', () => { dragging = false })
  stage.addEventListener('pointercancel', () => { dragging = false })

  // Default: latest generation vs. the one right before it.
  loadPair(Math.max(0, generations.length - 2), generations.length - 1)

  // Discover, don't explain: instead of an instruction label telling the
  // reader to drag, the divider gives itself a small nudge the first
  // time the section actually scrolls into view -- enough to register
  // "this moves" without a word of copy.
  const hint = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hintPlayed) {
        hintPlayed = true
        animateSplit([[42, 520], [58, 620], [50, 420]], dismissHint)
      }
    })
  }, { threshold: 0.6 })
  hint.observe(stage)

  return { loadPair }
}
