import './style.css'

const stage = document.querySelector('.stage')
const car = document.querySelector('#car')
const intro = document.querySelector('#intro')
const prompt = document.querySelector('#prompt')
const year = document.querySelector('#year')
const progress = document.querySelector('#progress')

const eras = [
  { year: '2022', label: 'IV' },
  { year: '2014', label: 'III' },
  { year: '2007', label: 'II' },
  { year: '2001', label: 'I' },
]

let started = false
let visibleEra = -1
let yearTimer

// Inertia: scrolling should feel like it moves time itself, not just the page.
// INERTIA_MODE is the code-level default. Override per session via ?inertia=off|soft|normal|strong to compare.
const INERTIA_MODE = 'soft' // 'off' | 'soft' | 'normal' | 'strong' — a tuning choice, not a finished value

// Starting points for feel, not finished numbers — expect to retune after review.
const INERTIA_PRESETS = {
  soft:   { coastMs: 380, releaseDelayMs: 80 },
  normal: { coastMs: 460, releaseDelayMs: 80 },
  strong: { coastMs: 560, releaseDelayMs: 80 },
}

const inertiaOverride = new URLSearchParams(location.search).get('inertia')
const activeInertiaMode = inertiaOverride === 'off' || INERTIA_PRESETS[inertiaOverride]
  ? inertiaOverride
  : INERTIA_MODE

const INERTIA_ENABLED = activeInertiaMode !== 'off'
const { coastMs: INERTIA_COAST_MS, releaseDelayMs: INERTIA_RELEASE_DELAY_MS } =
  INERTIA_PRESETS[activeInertiaMode] || INERTIA_PRESETS.soft

// How much of the previous velocity sample carries into the next (0-1, higher = smoother but laggier)
const VELOCITY_SMOOTHING = .5
// Below this speed, coasting is treated as finished
const MIN_COASTING_VELOCITY = 0.00002
// Below this speed, a stop doesn't warrant starting to coast at all
const MIN_VELOCITY_TO_COAST = 0.00003

let rawT = 0
let velocity = 0 // normalized time per ms
let lastMoveTime = performance.now()
let idleTimer = null
let inertiaRaf = null

function timePosition() {
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
  return Math.min(1, Math.max(0, scrollY / max))
}

function setEra(index) {
  if (index === visibleEra) return
  visibleEra = index
  car.dataset.era = index
  year.classList.remove('shown')
  clearTimeout(yearTimer)
  // The shape is discovered before time is named.
  yearTimer = setTimeout(() => {
    year.textContent = eras[index].year
    year.classList.add('shown')
  }, 760)
}

function render(t) {
  if (!started && t > .012) {
    started = true
    stage.classList.add('begun')
    intro.classList.add('quiet')
    prompt.classList.add('hidden')
    setEra(0)
  }
  if (!started) return
  const era = Math.min(3, Math.floor(t * 4.15))
  setEra(era)
  car.style.setProperty('--travel', `${t}`)
  progress.style.transform = `scaleY(${Math.max(.04, t)})`
}

function stopInertia() {
  if (inertiaRaf) cancelAnimationFrame(inertiaRaf)
  inertiaRaf = null
}

function runInertia() {
  let t = rawT
  let v = velocity
  const start = performance.now()
  let last = start

  function step(now) {
    const dt = now - last
    last = now
    const elapsed = now - start
    if (elapsed >= INERTIA_COAST_MS || Math.abs(v) < MIN_COASTING_VELOCITY || t <= 0 || t >= 1) {
      inertiaRaf = null
      return
    }
    t = Math.min(1, Math.max(0, t + v * dt))
    v *= Math.pow(0.02, dt / INERTIA_COAST_MS) // decays to ~2% of its start value by INERTIA_COAST_MS
    render(t)
    inertiaRaf = requestAnimationFrame(step)
  }
  inertiaRaf = requestAnimationFrame(step)
}

function moveTime() {
  const now = performance.now()
  const t = timePosition()
  const dt = now - lastMoveTime
  if (dt > 0) velocity = velocity * VELOCITY_SMOOTHING + ((t - rawT) / dt) * (1 - VELOCITY_SMOOTHING)
  rawT = t
  lastMoveTime = now

  stopInertia()
  render(t)

  if (INERTIA_ENABLED) {
    clearTimeout(idleTimer)
    idleTimer = setTimeout(() => {
      if (Math.abs(velocity) > MIN_VELOCITY_TO_COAST) runInertia()
    }, INERTIA_RELEASE_DELAY_MS)
  }
}

addEventListener('scroll', moveTime, { passive: true })
addEventListener('touchstart', () => {
  if (!started) stage.classList.add('ready')
}, { passive: true, once: true })
moveTime()
