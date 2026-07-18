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

function moveTime() {
  const t = timePosition()
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

addEventListener('scroll', moveTime, { passive: true })
addEventListener('touchstart', () => {
  if (!started) stage.classList.add('ready')
}, { passive: true, once: true })
moveTime()
