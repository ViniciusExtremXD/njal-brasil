/* ==========================================================================
   NJAL BRASIL — motor de movimento
   Um único módulo, carregado pelo layout, cuida de tudo que se mexe:

   1. Preferência de movimento (html.motion-reduced) — toggle no rodapé, salvo em localStorage.
      O flag do sistema (prefers-reduced-motion) NÃO é seguido: no Windows ele vem ligado
      por padrão em muita máquina e matava toda a experiência. Quem precisa, desliga no site.
   2. Split de texto ([data-split]) — cada palavra vira um <span class="w" style="--w:n">.
   3. Revelações por scroll ([data-reveal], [data-inview], section, footer, .rule-draw)
      com IntersectionObserver + rede de segurança por scroll e por tempo.
   4. Scroll: barra de progresso, nav que some/volta, parallax ([data-parallax*]),
      saída do hero ([data-hero-exit]), seção ativa na navegação.
   5. Ponteiro: brilho que segue o mouse e botões magnéticos (só pointer: fine).
   6. Imagens: fade ao terminar de carregar.
   ========================================================================== */

const root = document.documentElement;
const isReduced = () => root.classList.contains('motion-reduced');
const finePointer = window.matchMedia('(pointer: fine)').matches;
const raf = window.requestAnimationFrame.bind(window);

/* --------------------------------------------------------------------------
   1. Preferência de movimento
   -------------------------------------------------------------------------- */
const syncMotionToggles = () => {
  const on = !isReduced();
  document.querySelectorAll<HTMLElement>('[data-motion-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(on));
    const state = btn.querySelector<HTMLElement>('[data-motion-state]');
    if (state) state.textContent = on ? 'ligado' : 'reduzido';
  });
};

document.querySelectorAll<HTMLElement>('[data-motion-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    root.classList.toggle('motion-reduced');
    try {
      localStorage.setItem('njal-motion', isReduced() ? 'reduced' : 'full');
    } catch {
      /* armazenamento indisponível: a escolha vale só nesta página */
    }
    syncMotionToggles();
    if (isReduced()) resetParallax();
  });
});
syncMotionToggles();

/* --------------------------------------------------------------------------
   2. Split de texto por palavra
   -------------------------------------------------------------------------- */
const splitWords = (el: HTMLElement) => {
  if (el.dataset.splitReady) return;
  let n = 0;

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '));
          continue;
        }
        const w = document.createElement('span');
        w.className = 'w';
        w.style.setProperty('--w', String(n++));
        w.textContent = part;
        frag.appendChild(w);
      }
      node.parentNode?.replaceChild(frag, node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const e = node as HTMLElement;
    if (e.tagName === 'BR' || e.tagName === 'SVG' || e.classList.contains('sr-only') || e.classList.contains('w')) return;
    for (const child of Array.from(e.childNodes)) walk(child);
  };

  walk(el);
  el.style.setProperty('--words', String(n));
  el.dataset.splitReady = '1';
};

document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);

/* --------------------------------------------------------------------------
   3. Revelações por scroll
   -------------------------------------------------------------------------- */
const REVEAL_SEL = '[data-reveal], [data-inview], section, footer, .rule-draw';
const revealEls = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SEL));
const pending = new Set<HTMLElement>(revealEls);

const show = (el: HTMLElement) => {
  el.classList.add('in');
  pending.delete(el);
};

const nearLine = () => window.innerHeight * 0.9;

/* Revela tudo que já cruzou ~10% do viewport pela base (progressivo conforme rola). */
const revealNear = () => {
  if (!pending.size) return;
  // No fim da página, o que sobrou (rodapé) entra de uma vez — nada fica preso na borda.
  const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 4;
  const line = atBottom ? window.innerHeight + 1 : nearLine();
  for (const el of Array.from(pending)) {
    if (el.getBoundingClientRect().top < line) show(el);
  }
};

/* Primeira cena: o que já está no viewport entra escalonado, depois de dois frames,
   pra garantir que o estado inicial (opacity 0) foi pintado e a transição de fato roda. */
{
  const line = nearLine();
  const initial = revealEls.filter((el) => el.getBoundingClientRect().top < line);
  let n = 0;
  for (const el of initial) {
    if (el.hasAttribute('data-reveal') && !el.style.getPropertyValue('--i')) {
      el.style.setProperty('--i', String(Math.min(n++, 8)));
    }
  }
  raf(() => raf(() => initial.forEach(show)));
}

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
  );
  revealEls.forEach((el) => io.observe(el));
}

window.addEventListener('load', () => window.setTimeout(revealNear, 200), { once: true });
window.setTimeout(revealNear, 1200);

/* --------------------------------------------------------------------------
   4. Scroll: progresso, nav, parallax, saída do hero, seção ativa
   -------------------------------------------------------------------------- */
const nav = document.querySelector<HTMLElement>('[data-nav]');
const menu = nav?.querySelector<HTMLDetailsElement>('[data-menu]');
const heroExit = document.querySelector<HTMLElement>('[data-hero-exit]');

interface ParallaxItem {
  el: HTMLElement;
  fx: number;
  fy: number;
  x: number;
  y: number;
}
const parallax: ParallaxItem[] = Array.from(
  document.querySelectorAll<HTMLElement>('[data-parallax], [data-parallax-x]'),
).map((el) => ({
  el,
  fx: parseFloat(el.dataset.parallaxX ?? '0') || 0,
  fy: parseFloat(el.dataset.parallax ?? '0') || 0,
  x: 0,
  y: 0,
}));

function resetParallax() {
  for (const p of parallax) {
    p.x = p.y = 0;
    p.el.style.translate = '';
  }
  if (heroExit) {
    heroExit.style.transform = '';
    heroExit.style.opacity = '';
  }
}

const updateParallax = () => {
  if (isReduced() || !parallax.length) return;
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const mobile = vw < 720 ? 0.6 : 1;
  for (const p of parallax) {
    const r = p.el.getBoundingClientRect();
    // A medida inclui o deslocamento atual: compensa pra não realimentar.
    const top = r.top - p.y;
    const bottom = r.bottom - p.y;
    if (bottom < -vh * 0.5 || top > vh * 1.5) continue;
    const progress = (top + r.height / 2 - vh / 2) / vh; // -1 (abaixo) … 1 (acima)
    p.y = -progress * p.fy * vh * mobile;
    p.x = -progress * p.fx * vw * mobile;
    p.el.style.translate = `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`;
  }
};

const updateHeroExit = (y: number) => {
  if (!heroExit) return;
  if (isReduced()) return;
  const h = heroExit.offsetHeight || window.innerHeight;
  if (y > h * 1.1) return;
  const p = Math.min(1, y / (h * 0.85));
  heroExit.style.transform = `translate3d(0, ${(y * 0.28).toFixed(1)}px, 0)`;
  heroExit.style.opacity = String(Math.max(0, 1 - p * 1.15).toFixed(3));
};

let lastY = window.scrollY;
let ticking = false;

const onScroll = () => {
  const y = window.scrollY;
  const max = root.scrollHeight - window.innerHeight;
  root.style.setProperty('--scroll-p', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');

  revealNear();
  updateParallax();
  updateHeroExit(y);

  if (nav) {
    nav.classList.toggle('is-scrolled', y > 24);
    if (!menu?.open) {
      if (y > lastY && y > nav.offsetHeight * 1.5) nav.classList.add('nav--hidden');
      else if (y < lastY) nav.classList.remove('nav--hidden');
    }
  }

  lastY = y;
  ticking = false;
};

const requestScroll = () => {
  if (!ticking) {
    ticking = true;
    raf(onScroll);
  }
};

onScroll();
window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll, { passive: true });

/* Seção ativa: o link correspondente na nav ganha .is-active */
{
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href*="#"]'));
  const targets = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
  if (links.length && targets.length && 'IntersectionObserver' in window) {
    const byId = new Map<string, HTMLAnchorElement[]>();
    for (const a of links) {
      const id = a.getAttribute('href')?.split('#')[1];
      if (!id) continue;
      byId.set(id, [...(byId.get(id) ?? []), a]);
    }
    const setActive = (id: string | null) => {
      for (const a of links) a.classList.remove('is-active');
      if (id) byId.get(id)?.forEach((a) => a.classList.add('is-active'));
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );
    targets.forEach((s) => io.observe(s));
  }
}

/* --------------------------------------------------------------------------
   5. Ponteiro: brilho e magnetismo (só mouse/trackpad)
   -------------------------------------------------------------------------- */
if (finePointer) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let gx = tx;
  let gy = ty;
  let glowLoop = false;

  const glowTick = () => {
    gx += (tx - gx) * 0.18;
    gy += (ty - gy) * 0.18;
    glow.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0) translate(-50%, -50%)`;
    if (Math.abs(tx - gx) > 0.2 || Math.abs(ty - gy) > 0.2) raf(glowTick);
    else glowLoop = false;
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      tx = e.clientX;
      ty = e.clientY;
      glow.classList.add('is-on');
      const t = e.target instanceof Element ? e.target : null;
      glow.classList.toggle('is-hot', !!t?.closest('a, button, summary, label, [role="button"], input, textarea'));
      glow.classList.toggle('is-off', !!t?.closest('.plate, .pcard__frame, .pdp__frame, .drop__tile, iframe'));
      if (!glowLoop) {
        glowLoop = true;
        raf(glowTick);
      }
    },
    { passive: true },
  );
  document.addEventListener('mouseleave', () => glow.classList.remove('is-on'));
  window.addEventListener('blur', () => glow.classList.remove('is-on'));

  /* Botões magnéticos: puxam levemente na direção do ponteiro e voltam com mola. */
  interface Magnet {
    el: HTMLElement;
    tx: number;
    ty: number;
    x: number;
    y: number;
    active: boolean;
  }
  const magnets: Magnet[] = Array.from(document.querySelectorAll<HTMLElement>('.btn, [data-magnetic]')).map((el) => ({
    el,
    tx: 0,
    ty: 0,
    x: 0,
    y: 0,
    active: false,
  }));
  let magnetLoop = false;

  const magnetTick = () => {
    let busy = false;
    for (const m of magnets) {
      if (!m.active && Math.abs(m.x) < 0.05 && Math.abs(m.y) < 0.05) {
        if (m.el.style.translate) m.el.style.translate = '';
        continue;
      }
      const k = m.active ? 0.22 : 0.12;
      m.x += (m.tx - m.x) * k;
      m.y += (m.ty - m.y) * k;
      m.el.style.translate = `${m.x.toFixed(2)}px ${m.y.toFixed(2)}px`;
      busy = true;
    }
    if (busy) raf(magnetTick);
    else magnetLoop = false;
  };
  const wake = () => {
    if (!magnetLoop) {
      magnetLoop = true;
      raf(magnetTick);
    }
  };

  for (const m of magnets) {
    m.el.addEventListener(
      'pointermove',
      (e) => {
        if (isReduced()) return;
        const r = m.el.getBoundingClientRect();
        const strength = Math.min(0.3, 24 / Math.max(r.width, 1) + 0.12);
        m.tx = (e.clientX - (r.left + r.width / 2)) * strength;
        m.ty = (e.clientY - (r.top + r.height / 2)) * strength;
        m.active = true;
        wake();
      },
      { passive: true },
    );
    m.el.addEventListener('pointerleave', () => {
      m.tx = m.ty = 0;
      m.active = false;
      wake();
    });
  }
}

/* --------------------------------------------------------------------------
   6. Imagens entram com fade ao terminar de carregar
   -------------------------------------------------------------------------- */
const imgs = Array.from(document.images);
const loaded = (img: HTMLImageElement) => img.classList.add('is-loaded');
for (const img of imgs) {
  if (img.complete && img.naturalWidth > 0) loaded(img);
  else {
    img.addEventListener('load', () => loaded(img), { once: true });
    img.addEventListener('error', () => loaded(img), { once: true });
  }
}
window.setTimeout(() => imgs.forEach(loaded), 3000);

/* Menu mobile fecha ao escolher uma seção. */
document.querySelectorAll<HTMLAnchorElement>('[data-menu] a').forEach((a) => {
  a.addEventListener('click', () => {
    const details = a.closest('details');
    if (details) details.open = false;
  });
});

/* Sinal pro seguro do <head>: o motor carregou. */
(window as Window & { __njalMotion?: boolean }).__njalMotion = true;
