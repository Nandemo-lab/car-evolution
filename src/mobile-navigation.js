document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('[data-mobile-site-header]')
 const topButton=document.querySelector('[data-scroll-top]')
 if(header&&topButton){
  document.body.classList.add('has-mobile-navigation')
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)')
  const modalIsOpen=()=>Boolean(document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]:not([aria-hidden="true"])'))
  const keyboardIsOpen=()=>{
    const field=document.activeElement?.matches?.('input,textarea,select,[contenteditable="true"]')
    return Boolean(field)
  }
  let pastThreshold=scrollY>360
  const update=()=>{
    const blocked=modalIsOpen()||keyboardIsOpen()
    if(scrollY>360)pastThreshold=true
    else if(scrollY<240)pastThreshold=false
    const visible=pastThreshold&&!blocked
    document.body.classList.toggle('mobile-navigation-blocked',blocked)
    for(const element of [header,topButton]){
     element.classList.toggle('is-visible',visible)
     element.setAttribute('aria-hidden',visible?'false':'true')
    }
  }
  let ticking=false
  const requestUpdate=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;update()})}
  addEventListener('scroll',requestUpdate,{passive:true})
  addEventListener('resize',requestUpdate,{passive:true})
  window.visualViewport?.addEventListener('resize',requestUpdate,{passive:true})
  document.addEventListener('focusin',requestUpdate)
  document.addEventListener('focusout',requestUpdate)
  new MutationObserver(requestUpdate).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','aria-hidden','aria-modal']})
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion.matches?'auto':'smooth'}))
  update()
 }
})
