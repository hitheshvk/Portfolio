function bindScroll(fn) {
  const scroller = window.__smoothScroll;
  if (scroller?.bindScroll) {
    return scroller.bindScroll(fn);
  }

  window.addEventListener("scroll", fn, { passive: true });
  return () => window.removeEventListener("scroll", fn);
}

function getScrollY() {
  return window.__smoothScroll?.getScrollY?.() ?? window.scrollY;
}

const header = document.querySelector("[data-nav-dock]");
if (!header) {
  // hide/show only on homepage dock
} else {
  const ease = [0.22, 1, 0.36, 1];
  const hideOffset = -(header.offsetHeight + 8);
  let lastY = getScrollY();
  let hidden = false;
  let idleTimer = null;
  let anim = null;

  async function animateVisible(show) {
    if (hidden === !show) return;
    hidden = !show;

    try {
      const { animate } = await import("https://cdn.jsdelivr.net/npm/motion@12.4.7/+esm");
      anim?.stop?.();
      anim = animate(
        header,
        show ? { y: 0, opacity: 1 } : { y: hideOffset, opacity: 0 },
        { duration: show ? 0.42 : 0.34, ease }
      );
      header.classList.toggle("siteheader--hidden", !show);
    } catch {
      header.classList.toggle("siteheader--hidden", hidden);
      header.style.transform = hidden ? `translateY(${hideOffset}px)` : "";
      header.style.opacity = hidden ? "0" : "1";
    }
  }

  function onScroll() {
    const y = getScrollY();

    if (y <= 24) {
      clearTimeout(idleTimer);
      void animateVisible(true);
      lastY = y;
      return;
    }

    if (y > lastY + 16) {
      clearTimeout(idleTimer);
      void animateVisible(false);
    } else if (y < lastY - 10) {
      clearTimeout(idleTimer);
      void animateVisible(true);
    }

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (getScrollY() > 120) void animateVisible(true);
    }, 1800);

    lastY = y;
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onScroll();
    bindScroll(onScroll);
  }
}
