(function initPageLoader() {
  const root = document.documentElement;
  /** Prevent a flash when the page is already cached / very fast */
  const MIN_MS = 450;
  /** Never block the UI longer than this if something hangs */
  const MAX_MS = 8000;
  const FADE_MS = 450;
  const NAV_KEY = "page-loader-nav";

  const LOADER_MARKUP = `
<div class="page-loader" id="page-loader" role="status" aria-live="polite" aria-busy="true" aria-label="Loading">
  <div class="page-loader__dots" aria-hidden="true">
    <span class="page-loader__dot"></span>
    <span class="page-loader__dot"></span>
    <span class="page-loader__dot"></span>
    <span class="page-loader__dot"></span>
    <span class="page-loader__dot"></span>
  </div>
</div>`;

  function ensureLoader() {
    let loader = document.getElementById("page-loader");
    if (!loader) {
      document.body.insertAdjacentHTML("afterbegin", LOADER_MARKUP);
      loader = document.getElementById("page-loader");
    }
    return loader;
  }

  function shouldInterceptLink(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.target === "_blank") return false;
    if (anchor.hasAttribute("download")) return false;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#")) return false;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;

    let url;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return false;
    }

    if (url.origin !== window.location.origin) return false;
    if (/\.(pdf|png|jpe?g|gif|svg|webp|zip)$/i.test(url.pathname)) return false;

    const current = new URL(window.location.href);
    if (url.pathname === current.pathname && url.search === current.search) return false;

    return true;
  }

  function resetLoaderState(loader) {
    loader.classList.remove("is-done");
    loader.style.opacity = "";
    loader.style.visibility = "";
    loader.removeAttribute("aria-hidden");
  }

  function showLoaderNow() {
    const loader = ensureLoader();
    resetLoaderState(loader);
    root.classList.remove("is-page-loaded");
    root.classList.add("is-page-loading");
    loader.setAttribute("aria-busy", "true");
    return loader;
  }

  function finishLoading(loader) {
    root.classList.remove("is-page-loading");
    root.classList.add("is-page-loaded");
    loader.classList.add("is-done");
    loader.setAttribute("aria-busy", "false");
    loader.setAttribute("aria-hidden", "true");

    requestAnimationFrame(() => {
      window.__smoothScroll?.getLenis?.()?.resize?.();
    });

    window.setTimeout(() => {
      loader.remove();
    }, FADE_MS);
  }

  function waitForReady() {
    return Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
      }),
    ]);
  }

  function delay(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  /**
   * Best practice:
   * - Hide when the page is actually ready (fonts + window load)
   * - Keep a short minimum so fast loads do not flicker
   * - Cap with a maximum so a hung asset never blocks the site
   */
  function waitForLoaderCycle() {
    const gate = window.__pageLoaderGate;
    const gatePromise =
      typeof gate === "function" ? gate() : gate && typeof gate.then === "function" ? gate : Promise.resolve();
    const maxMs = Number(window.__pageLoaderMaxMs) > 0 ? Number(window.__pageLoaderMaxMs) : MAX_MS;

    return Promise.race([Promise.all([waitForReady(), delay(MIN_MS), gatePromise]), delay(maxMs)]);
  }

  function shouldRunEntryLoader() {
    if (root.classList.contains("is-page-loading")) return true;
    if (sessionStorage.getItem(NAV_KEY) === "1") return true;

    const nav = performance.getEntriesByType("navigation")[0];
    if (nav?.type === "back_forward") return true;

    return false;
  }

  function bootLoader() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.removeItem(NAV_KEY);
      root.classList.remove("is-page-loading");
      root.classList.add("is-page-loaded");
      document.getElementById("page-loader")?.remove();
      return false;
    }

    if (!shouldRunEntryLoader()) {
      root.classList.remove("is-page-loading");
      root.classList.add("is-page-loaded");
      document.getElementById("page-loader")?.remove();
      return false;
    }

    showLoaderNow();
    return true;
  }

  function completeLoader() {
    sessionStorage.removeItem(NAV_KEY);
    const loader = ensureLoader();
    waitForLoaderCycle().then(() => finishLoading(loader));
  }

  function navigateAfterLoaderPaint(url) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.location.assign(url);
      });
    });
  }

  function bindNavigation() {
    document.addEventListener(
      "click",
      (event) => {
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const anchor = event.target.closest("a[href]");
        if (!shouldInterceptLink(anchor)) return;

        event.preventDefault();
        sessionStorage.setItem(NAV_KEY, "1");
        showLoaderNow();
        navigateAfterLoaderPaint(anchor.href);
      },
      true
    );
  }

  const shouldComplete = bootLoader();

  bindNavigation();

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    if (bootLoader()) completeLoader();
  });

  if (shouldComplete) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", completeLoader, { once: true });
    } else {
      completeLoader();
    }
  }
})();
