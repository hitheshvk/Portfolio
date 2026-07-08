(function initStudyToc() {
  const toc = document.querySelector(".toc");
  if (!toc) return;

  const links = [...toc.querySelectorAll("a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  let ready = toc.classList.contains("is-ready");
  let currentId = null;

  function setReady(next) {
    if (ready === next) return;
    ready = next;
    toc.classList.toggle("is-ready", next);
  }

  function setCurrent(section) {
    if (!section || section.id === currentId) return;
    currentId = section.id;
    links.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${section.id}`);
    });
  }

  function getCurrentSection() {
    const marker = window.innerHeight * 0.38;
    let current = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) {
        current = section;
      } else {
        break;
      }
    }

    return current;
  }

  function getScrollY() {
    return window.__smoothScroll?.getScrollY?.() ?? window.scrollY;
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setReady(getScrollY() > window.innerHeight * 0.55);
      setCurrent(getCurrentSection());
      ticking = false;
    });
  }

  function bindScroll(fn) {
    const scroller = window.__smoothScroll;
    if (scroller?.bindScroll) {
      scroller.bindScroll(fn);
      return;
    }

    const lenis = scroller?.getLenis?.();
    if (lenis) {
      lenis.on("scroll", fn);
      return;
    }

    window.addEventListener("scroll", fn, { passive: true });
  }

  bindScroll(onScroll);
  onScroll();
})();
