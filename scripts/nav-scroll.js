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

document.querySelectorAll(".siteheader").forEach((header) => {
  let scrolled = header.classList.contains("is-scrolled");

  const setScrolled = () => {
    const next = getScrollY() > 8;
    if (scrolled === next) return;
    scrolled = next;
    header.classList.toggle("is-scrolled", next);
  };

  setScrolled();
  bindScroll(setScrolled);
});
