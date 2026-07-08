(function initNavActive() {
  if (!document.body.classList.contains("home")) return;

  const workLink = document.querySelector('.siteheader__nav a[href="#work"]');
  const homeMark = document.querySelector(".siteheader__mark");
  if (!workLink) return;

  function setWorkActive(active) {
    if (active) {
      workLink.setAttribute("aria-current", "page");
      return;
    }
    workLink.removeAttribute("aria-current");
  }

  workLink.addEventListener("click", () => {
    setWorkActive(true);
  });

  homeMark?.addEventListener("click", () => {
    setWorkActive(false);
  });

  window.addEventListener("hashchange", () => {
    setWorkActive(window.location.hash === "#work");
  });

  setWorkActive(window.location.hash === "#work");
})();
