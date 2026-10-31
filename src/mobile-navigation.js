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
  const overlapsVehicleContent=()=>{
    if(innerWidth>=700)return false
    const bottom=Math.max(9,Number.parseFloat(getComputedStyle(nav).bottom)||0)
    const right=12,left=innerWidth-right-148,top=innerHeight-bottom-52
    const points=[18,74,130].flatMap(x=>[8,26,44].map(y=>[left+x,top+y]))
    return points.some(([x,y])=>document.elementFromPoint(x,y)?.closest('img,picture,figure,a,button,h1,h2,h3,h4,p,li,table,.timeline-item,.detail-visual,.generation-card,.lc-car,.comparison-card'))
  }
  let scrollingDown=false,lastY=scrollY,stopTimer
  const update=()=>{
    const blocked=modalIsOpen()||keyboardIsOpen()
    const visible=window.scrollY>320&&!blocked&&!scrollingDown&&!overlapsVehicleContent()
    document.body.classList.toggle('mobile-quick-nav-blocked',blocked)
    nav.classList.toggle('is-visible',visible)
    nav.setAttribute('aria-hidden',visible?'false':'true')
  }
  let ticking=false
  const requestUpdate=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;update()})}
  const onScroll=()=>{
    const current=scrollY,delta=current-lastY
    if(delta>5)scrollingDown=true
    else if(delta< -5)scrollingDown=false
    lastY=current
    clearTimeout(stopTimer)
    requestUpdate()
    stopTimer=setTimeout(()=>{scrollingDown=false;update()},650)
  }
  addEventListener('scroll',onScroll,{passive:true})
  addEventListener('resize',requestUpdate,{passive:true})
  window.visualViewport?.addEventListener('resize',requestUpdate,{passive:true})
  document.addEventListener('focusin',requestUpdate)
  document.addEventListener('focusout',requestUpdate)
  new MutationObserver(requestUpdate).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','aria-hidden','aria-modal']})
  topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion.matches?'auto':'smooth'}))
  update()
 }
})
