const cards = [...document.querySelectorAll('[data-motion="case"]')];

const ease = [0.22, 1, 0.36, 1];
const enter = { opacity: 1 };
const leave = { opacity: 0 };
const enterTransition = { duration: 0.55, ease };
const leaveTransition = { duration: 0.34, ease };
const SHOW_RATIO = 0.2;
const HIDE_RATIO = 0.03;
const TOGGLE_COOLDOWN_MS = 200;

function bindScroll(fn) {
  const scroller = window.__smoothScroll;
  if (scroller?.bindScroll) {
    return scroller.bindScroll(fn);
  }

  window.addEventListener("scroll", fn, { passive: true });
  return () => window.removeEventListener("scroll", fn);
}

function revealAll() {
  document.documentElement.classList.add("motion-enabled");
  cards.forEach((el) => {
    el.classList.add("is-visible");
    el.style.opacity = "";
  });
}

function visibleRatio(element) {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight;
  if (rect.bottom <= 0 || rect.top >= vh) return 0;
  return (Math.min(rect.bottom, vh) - Math.max(rect.top, 0)) / rect.height;
}

async function init() {
  if (!cards.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    revealAll();
    return;
  }

  let animate;
  try {
    ({ animate } = await import("https://cdn.jsdelivr.net/npm/motion@12.4.7/+esm"));
  } catch {
    revealAll();
    return;
  }

  document.documentElement.classList.add("motion-enabled");

  const state = cards.map((el) => ({
    el,
    visible: null,
    anim: null,
    lastToggle: 0,
  }));

  function setVisible(card, show) {
    if (card.visible === show) return;

    const now = performance.now();
    if (card.visible !== null && now - card.lastToggle < TOGGLE_COOLDOWN_MS) return;

    card.visible = show;
    card.lastToggle = now;
    card.anim?.stop();
    card.el.classList.toggle("is-visible", show);
    card.anim = animate(card.el, show ? enter : leave, show ? enterTransition : leaveTransition);
  }

  function updateAll() {
    state.forEach((card) => {
      const ratio = visibleRatio(card.el);
      const show = card.visible ? ratio >= HIDE_RATIO : ratio >= SHOW_RATIO;
      setVisible(card, show);
    });
  }

  state.forEach((card) => {
    animate(card.el, leave, { duration: 0 });
    card.el.classList.remove("is-visible");
    card.visible = false;
  });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateAll();
      ticking = false;
    });
  }

  updateAll();
  bindScroll(onScroll);
  window.addEventListener("resize", onScroll, { passive: true });
}

init().catch(revealAll);
