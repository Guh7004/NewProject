gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:45,opacity:0,duration:1.15,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%',once:true}}));
gsap.to('.hero-media img',{scale:1.13,yPercent:4,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
gsap.to('.statement-media',{yPercent:-10,ease:'none',scrollTrigger:{trigger:'.statement',start:'top bottom',end:'bottom top',scrub:1}});
gsap.to('.buy-media img',{scale:1.1,ease:'none',scrollTrigger:{trigger:'.buy',start:'top bottom',end:'bottom top',scrub:1}});
gsap.utils.toArray('.editorial-media img,.switch-media img').forEach(img=>gsap.fromTo(img,{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:1}}));
// Gallery showcase: slow turntable motion + subtle pointer response.
const showcaseProduct = document.querySelector('.showcase-product img');
if (showcaseProduct) {
  gsap.set(showcaseProduct,{transformOrigin:'50% 50%'});
  gsap.to(showcaseProduct,{rotationY:7,rotationX:-2,rotationZ:1,duration:5.8,ease:'sine.inOut',yoyo:true,repeat:-1});
  gsap.to('.showcase-ring',{rotationZ:360,duration:24,ease:'none',repeat:-1});
  const stage=document.querySelector('.showcase-stage');
  stage?.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(showcaseProduct,{x:x*16,y:y*10,rotationY:x*11,rotationX:-y*7,duration:.9,ease:'power2.out',overwrite:'auto'})});
  stage?.addEventListener('pointerleave',()=>gsap.to(showcaseProduct,{x:0,y:0,duration:1.2,ease:'power3.out'}));
  gsap.to('.showcase-stage',{yPercent:5,ease:'none',scrollTrigger:{trigger:'.showcase-hero',start:'top top',end:'bottom top',scrub:1}});
}

// Interactive 2.5D showcase: camera, product, glass and light move at different depths.
(() => {
  const stage = document.querySelector('.showcase-stage');
  const product = document.querySelector('.showcase-product');
  const image = document.querySelector('.showcase-product img');
  const glass = document.querySelector('.showcase-glass');
  const base = document.querySelector('.showcase-base');
  const glow = document.querySelector('.showcase-glow');
  if (!stage || !product || !image || !window.gsap) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // Kill the earlier simple tweens so this controller owns the scene.
  gsap.killTweensOf(image);
  gsap.set(product,{transformPerspective:1400,transformOrigin:'50% 55%'});
  gsap.set(image,{transformPerspective:1400,transformOrigin:'50% 50%',rotationX:0,rotationY:0,rotationZ:0});

  const q = (target, prop, duration=.75) => gsap.quickTo(target, prop, {duration,ease:'power3.out'});
  const prodRX=q(product,'rotationX'), prodRY=q(product,'rotationY'), prodX=q(product,'x'), prodY=q(product,'y');
  const imgX=q(image,'x',.9), imgY=q(image,'y',.9), imgScale=q(image,'scale',.9);
  const glassX=glass?q(glass,'x',1.1):null, glassY=glass?q(glass,'y',1.1):null;
  const baseX=base?q(base,'x',1.2):null;
  const glowX=glow?q(glow,'x',1.25):null, glowY=glow?q(glow,'y',1.25):null;

  function move(e){
    const r=stage.getBoundingClientRect();
    const nx=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));
    const ny=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));
    stage.classList.add('is-active');
    stage.style.setProperty('--shine-x',`${50+nx*24}%`);
    stage.style.setProperty('--shine-y',`${38+ny*20}%`);
    prodRY(nx*8); prodRX(-ny*5); prodX(nx*9); prodY(ny*6);
    imgX(nx*5); imgY(ny*3); imgScale(1.018);
    glassX?.(-nx*6); glassY?.(-ny*4); baseX?.(nx*3); glowX?.(nx*20); glowY?.(ny*10);
  }
  function reset(){
    stage.classList.remove('is-active');
    stage.style.setProperty('--shine-x','50%');stage.style.setProperty('--shine-y','35%');
    prodRY(0);prodRX(0);prodX(0);prodY(0);imgX(0);imgY(0);imgScale(1);
    glassX?.(0);glassY?.(0);baseX?.(0);glowX?.(0);glowY?.(0);
  }
  stage.addEventListener('pointermove',move,{passive:true});
  stage.addEventListener('pointerleave',reset,{passive:true});

  // Scroll behaves like a restrained camera move rather than a flat zoom.
  if (window.ScrollTrigger) {
    gsap.timeline({scrollTrigger:{trigger:'.showcase-hero',start:'top top',end:'bottom top',scrub:1}})
      .to(product,{rotationX:7,rotationY:-6,y:-24,scale:.96,ease:'none'},0)
      .to(image,{scale:1.045,ease:'none'},0)
      .to(glass||stage,{y:16,ease:'none'},0)
      .to(base||stage,{scaleX:1.035,ease:'none'},0);
  }
})();
