const sections = [...document.querySelectorAll('[data-motion="section"]')];

const ease = [0.22, 1, 0.36, 1];
const enter = { opacity: 1, y: 0 };
const leave = { opacity: 0, y: 14 };
const enterTransition = { duration: 0.62, ease };
const leaveTransition = { duration: 0.38, ease };
const SHOW_RATIO = 0.14;
const HIDE_RATIO = 0.04;
const TOGGLE_COOLDOWN_MS = 220;

function revealAll() {
  document.documentElement.classList.add("motion-enabled");
  sections.forEach((el) => {
    el.classList.add("is-visible");
    el.style.opacity = "";
    el.style.transform = "";
  });
}

function visibleRatio(element) {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight;
  if (rect.bottom <= 0 || rect.top >= vh) return 0;
  return (Math.min(rect.bottom, vh) - Math.max(rect.top, 0)) / rect.height;
}

function bindScroll(fn) {
  const scroller = window.__smoothScroll;
  if (scroller?.bindScroll) {
    return scroller.bindScroll(fn);
  }

  const lenis = window.__smoothScroll?.getLenis?.();
  if (lenis) {
    lenis.on("scroll", fn);
    return () => lenis.off("scroll", fn);
  }

  window.addEventListener("scroll", fn, { passive: true });
  return () => window.removeEventListener("scroll", fn);
}

async function init() {
  if (!sections.length) return;

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

  const state = sections.map((el) => ({
    el,
    visible: null,
    anim: null,
    lastToggle: 0,
  }));

  function setVisible(section, show) {
    if (section.visible === show) return;

    const now = performance.now();
    if (section.visible !== null && now - section.lastToggle < TOGGLE_COOLDOWN_MS) return;

    section.visible = show;
    section.lastToggle = now;
    section.anim?.stop();
    section.el.classList.toggle("is-visible", show);
    section.anim = animate(
      section.el,
      show ? enter : leave,
      show ? enterTransition : leaveTransition
    );
  }

  function updateAll() {
    state.forEach((section) => {
      const ratio = visibleRatio(section.el);
      const show = section.visible ? ratio >= HIDE_RATIO : ratio >= SHOW_RATIO;
      setVisible(section, show);
    });
  }

  state.forEach((section) => {
    animate(section.el, leave, { duration: 0 });
    section.el.classList.remove("is-visible");
    section.visible = false;
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
  requestAnimationFrame(updateAll);

  const unbind = bindScroll(onScroll);
  window.addEventListener("resize", onScroll, { passive: true });

  window.addEventListener(
    "pagehide",
    () => {
      unbind?.();
    },
    { once: true }
  );
}

init().catch(revealAll);
