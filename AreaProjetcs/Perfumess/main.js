/* =========================================================
   MAISON VESPER — Main JS
   Lenis · GSAP · Sketchfab 3D embed · Custom particle systems
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* ========== LOADER ========== */
function runLoader() {
  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });

    tl.to(".loader__letter", {
      y: 0, opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out"
    })
    .to(".loader__bar span", {
      width: "100%",
      duration: 2.2,
      ease: "power2.inOut"
    }, "-=0.4");

    const pct = { v: 0 };
    const pctEl = document.getElementById("loaderPct");
    tl.to(pct, {
      v: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => { if (pctEl) pctEl.textContent = Math.round(pct.v); }
    }, "<");

    tl
    .to(".loader", {
      yPercent: -100,
      duration: 1.1,
      ease: "power4.inOut",
      delay: 0.2
    })
    .set(".loader", { display: "none" });
  });
}

/* ========== CUSTOM CURSOR ========== */
function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let dx = mx, dy = my, rx = mx, ry = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
  });

  function loop() {
    dx += (mx - dx) * 0.6;
    dy += (my - dy) * 0.6;
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll("[data-cursor='hover'], a, button").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });
}

/* ========== LENIS SMOOTH SCROLL ========== */
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      }
    });
  });
}

/* ========== NAV SCROLL STATE ========== */
function initNav() {
  const nav = document.getElementById("nav");
  ScrollTrigger.create({
    trigger: document.body,
    start: 60,
    end: "max",
    onUpdate: (self) => {
      nav.classList.toggle("is-scrolled", self.scroll() > 60);
    }
  });
}

/* ========== HERO REVEAL ========== */
function initHero() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.to(".hero__tag", {
    opacity: 1, y: 0,
    duration: 1, ease: "power3.out"
  })
  .to(".hero__word span", {
    y: 0,
    duration: 1.4,
    stagger: 0.045,
    ease: "expo.out"
  }, "-=0.7")
  .to(".hero__slogan", {
    opacity: 1, y: 0,
    duration: 1.2, ease: "power3.out"
  }, "-=0.7")
  .to(".hero__actions", {
    opacity: 1, y: 0,
    duration: 1, ease: "power3.out"
  }, "-=0.6");

  // Parallax do título no scroll
  gsap.to(".hero__title", {
    yPercent: 30,
    scale: 0.85,
    opacity: 0.4,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8
    }
  });
  gsap.to(".hero__slogan, .hero__tag", {
    yPercent: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "60% top",
      scrub: 0.8
    }
  });

  // Movimento sutil pelo mouse no hero
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".hero__title");
  hero.addEventListener("mousemove", (e) => {
    const rx = (e.clientX / window.innerWidth - 0.5) * 8;
    const ry = (e.clientY / window.innerHeight - 0.5) * -6;
    gsap.to(title, { rotationY: rx, rotationX: ry, duration: 1.2, ease: "power3.out" });
  });
  hero.addEventListener("mouseleave", () => {
    gsap.to(title, { rotationY: 0, rotationX: 0, duration: 1, ease: "power3.out" });
  });
}

/* ========== HERO PARTICLES (douradas no ar) ========== */
function initHeroParticles() {
  const canvas = document.getElementById("heroParticles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = canvas.parentElement.offsetHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = canvas.parentElement.offsetHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      vy: -(Math.random() * 0.3 + 0.1) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      a: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.015
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.phase) * 0.3;
      p.phase += p.speed;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
      grad.addColorStop(0, `rgba(233, 213, 160, ${p.a})`);
      grad.addColorStop(0.5, `rgba(212, 168, 90, ${p.a * 0.4})`);
      grad.addColorStop(1, "rgba(212, 168, 90, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}


/* ========== PRODUCT — IFRAME SKETCHFAB 3D ==========
   Modelo 3D fotorrealista real (alshifan / CC BY 4.0).
   O iframe cuida da rotação 3D nativa. Aqui apenas
   coordenamos a entrada cinematográfica e o fade-in. */

function initProductImage() {
  const wrap = document.getElementById("productBottle");
  const iframe = wrap && wrap.querySelector(".product__viewer");
  if (!wrap || !iframe) return;

  // Estado inicial: invisível, pequeno
  gsap.set(wrap, { opacity: 0, scale: 0.85, transformOrigin: "50% 60%" });

  // Quando o iframe carrega, revela com escala e opacidade
  iframe.addEventListener("load", () => {
    // Pequena espera para os assets do Sketchfab iniciarem
    gsap.to(wrap, {
      opacity: 1,
      scale: 1,
      duration: 2,
      delay: 0.6,
      ease: "expo.out"
    });
  });

  // Scroll-triggered: escala suave ao entrar na viewport
  gsap.fromTo(wrap,
    { y: 60 },
    {
      y: 0,
      scrollTrigger: {
        trigger: ".product",
        start: "top 85%",
        end: "top 30%",
        scrub: 1.2
      }
    }
  );

  // Parallax sutil no scroll dentro da seção
  gsap.to(wrap, {
    yPercent: -8,
    scrollTrigger: {
      trigger: ".product",
      start: "top top",
      end: "bottom top",
      scrub: 1.4
    }
  });
}
/* ========== SECTION REVEAL ========== */
function initReveals() {
  // Generic data-reveal
  gsap.utils.toArray("[data-reveal]").forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Split lines (titles)
  gsap.utils.toArray("[data-split]").forEach(title => {
    const lines = title.querySelectorAll(".line");
    lines.forEach(line => {
      const text = line.innerHTML;
      line.innerHTML = `<span style="display:inline-block; transform: translateY(110%);">${text}</span>`;
    });
    gsap.to(title.querySelectorAll(".line > span"), {
      y: 0,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: title,
        start: "top 82%",
      }
    });
  });

  // Notes (animate each group)
  gsap.utils.toArray(".notes__group").forEach((g, i) => {
    ScrollTrigger.create({
      trigger: g,
      start: "top 80%",
      onEnter: () => g.classList.add("is-visible")
    });
    gsap.from(g.querySelectorAll(".notes__list li"), {
      opacity: 0,
      x: -20,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: g,
        start: "top 80%"
      }
    });
  });

  // Cards
  gsap.to("[data-card]", {
    opacity: 1, y: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".collection__grid",
      start: "top 80%"
    }
  });

  // Quotes
  gsap.utils.toArray("[data-quote]").forEach((q, i) => {
    gsap.to(q, {
      opacity: 1, y: 0,
      duration: 1.2,
      delay: i * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: q,
        start: "top 85%"
      }
    });
  });

  // Sensory lines
  gsap.utils.toArray(".sensory__line").forEach(line => {
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.transform = "translateY(110%)";
    inner.innerHTML = line.innerHTML;
    line.innerHTML = "";
    line.appendChild(inner);
  });
  gsap.to(".sensory__line > span", {
    y: 0,
    duration: 1.4,
    stagger: 0.15,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".sensory__quote",
      start: "top 75%"
    }
  });
}

/* ========== STORY (sticky chapters) ========== */
function initStory() {
  const chapters = gsap.utils.toArray(".story__chap");
  if (!chapters.length) return;

  // Start state
  gsap.set(chapters, { opacity: 0, y: 50 });
  gsap.set(chapters[0], { opacity: 1, y: 0 });

  const pin = document.querySelector(".story__pin");
  const total = chapters.length;

  ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const p = self.progress;
      const fill = document.getElementById("storyFill");
      if (fill) fill.style.height = (p * 100) + "%";

      const idx = Math.min(total - 1, Math.floor(p * total));
      chapters.forEach((c, i) => {
        if (i === idx) {
          gsap.to(c, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        } else {
          gsap.to(c, { opacity: 0, y: i < idx ? -40 : 40, duration: 0.8, ease: "power3.out" });
        }
      });
    }
  });

  // Parallax na imagem real (zoom + slight pan)
  gsap.fromTo(".story__photo",
    { scale: 1.05, y: 0 },
    {
      scale: 1.25, y: -40,
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    }
  );
}

/* ========== SMOKE CANVAS (sensory section) ========== */
function initSmoke() {
  const canvas = document.getElementById("smokeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;
  const dpi = Math.min(window.devicePixelRatio, 1.5);

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth * dpi;
    h = canvas.height = canvas.parentElement.offsetHeight * dpi;
    canvas.style.width = canvas.parentElement.offsetWidth + "px";
    canvas.style.height = canvas.parentElement.offsetHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize);

  function spawn() {
    particles.push({
      x: Math.random() * w,
      y: h + 50,
      r: Math.random() * 80 + 60,
      a: 0,
      ma: Math.random() * 0.18 + 0.08,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.3,
      life: 0,
      maxLife: 400 + Math.random() * 200,
      hue: Math.random() > 0.5 ? "212, 168, 90" : "140, 106, 35"
    });
  }
  for (let i = 0; i < 30; i++) {
    spawn();
    particles[particles.length - 1].y = Math.random() * h;
    particles[particles.length - 1].life = Math.random() * 200;
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      p.r += 0.3;

      const lifeRatio = p.life / p.maxLife;
      if (lifeRatio < 0.2) p.a = p.ma * (lifeRatio / 0.2);
      else if (lifeRatio > 0.7) p.a = p.ma * (1 - (lifeRatio - 0.7) / 0.3);
      else p.a = p.ma;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `rgba(${p.hue}, ${p.a})`);
      grad.addColorStop(0.4, `rgba(${p.hue}, ${p.a * 0.3})`);
      grad.addColorStop(1, `rgba(${p.hue}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    particles = particles.filter(p => p.life < p.maxLife);
    while (particles.length < 40) spawn();
    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(tick);
  }
  tick();
}

/* ========== CTA PARTICLES ========== */
function initCtaParticles() {
  const canvas = document.getElementById("ctaParticles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;
  const dpi = Math.min(window.devicePixelRatio, 2);

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth * dpi;
    h = canvas.height = canvas.parentElement.offsetHeight * dpi;
    canvas.style.width = canvas.parentElement.offsetWidth + "px";
    canvas.style.height = canvas.parentElement.offsetHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.7 + 0.3,
      tw: Math.random() * Math.PI * 2,
      tws: 0.01 + Math.random() * 0.02
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.tw += p.tws;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      const a = p.a * (0.6 + Math.sin(p.tw) * 0.4);
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10);
      grad.addColorStop(0, `rgba(233, 213, 160, ${a})`);
      grad.addColorStop(1, "rgba(212, 168, 90, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 10, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();

  // CTA title reveal
  gsap.to(".cta__word span", {
    y: 0,
    duration: 1.4,
    stagger: 0.05,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".cta",
      start: "top 70%"
    }
  });
}

/* ========== CARD TILT (mouse-reactive) ========== */
function initCardTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll("[data-card]").forEach(card => {
    const img = card.querySelector(".card__img");
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 1200,
        duration: 0.6,
        ease: "power3.out"
      });
      if (img) {
        gsap.to(img, {
          x: x * 18,
          y: y * 12 - 6,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
      if (img) {
        gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
      }
    });
  });
}

/* ========== BOOT ========== */
window.addEventListener("DOMContentLoaded", async () => {
  // pré-bloqueia o scroll durante o loader
  document.body.style.overflow = "hidden";

  initCursor();
  initHeroParticles();
  initProductImage();
  initSmoke();
  initCtaParticles();

  await runLoader();
  document.body.style.overflow = "";

  initLenis();
  initNav();
  initHero();
  initReveals();
  initStory();
  initCardTilt();

  ScrollTrigger.refresh();
});