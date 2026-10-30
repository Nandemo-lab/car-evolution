document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('[data-mobile-quick-nav]')
 if(nav){
  document.body.classList.add('has-mobile-quick-nav')
  const topButton=nav.querySelector('[data-scroll-top]')
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)')
  const modalIsOpen=()=>Boolean(document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]:not([aria-hidden="true"])'))
  const keyboardIsOpen=()=>{
    const field=document.activeElement?.matches?.('input,textarea,select,[contenteditable="true"]')
    return Boolean(field)
  }
  const update=()=>{
    const blocked=modalIsOpen()||keyboardIsOpen()
    const visible=window.scrollY>320&&!blocked
    document.body.classList.toggle('mobile-quick-nav-blocked',blocked)
    nav.classList.toggle('is-visible',visible)
    nav.setAttribute('aria-hidden',visible?'false':'true')
  }
  let ticking=false
  const requestUpdate=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;update()})}
  addEventListener('scroll',requestUpdate,{passive:true})
  addEventListener('resize',requestUpdate,{passive:true})
  window.visualViewport?.addEventListener('resize',requestUpdate,{passive:true})
  document.addEventListener('focusin',requestUpdate)
  document.addEventListener('focusout',requestUpdate)
  new MutationObserver(requestUpdate).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','aria-hidden','aria-modal']})
  topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion.matches?'auto':'smooth'}))
  update()
 }
})
