import './click-glow.css'

// Keep the interaction tactile without turning the cursor itself into a
// visual object. Only intentional controls receive the short, metallic glint.
const interactiveSelector = 'a[href], button:not(:disabled), [role="button"], input:not(:disabled), select:not(:disabled)'

document.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'touch' || event.button !== 0 || !event.target.closest(interactiveSelector)) return

  const glow = document.createElement('span')
  glow.className = 'click-glow'
  glow.style.left = `${event.clientX}px`
  glow.style.top = `${event.clientY}px`
  document.body.append(glow)
  glow.addEventListener('animationend', () => glow.remove(), { once: true })
})
