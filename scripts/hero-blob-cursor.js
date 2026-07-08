import gsap from "gsap";

const ACTIVATION_MS = 3000;
const HIT_SELECTOR = ".hero-dot-hit";
const ENTER_DURATION = 0.55;
const EXIT_DURATION = 0.8;
const EXIT_TO_DOT_DURATION = 0.75;
const CLICKABLE_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "summary",
  "label[for]",
  '[role="button"]',
  '[role="link"]',
  'input[type="submit"]',
  'input[type="button"]',
  "select",
  ".case-card__cta",
].join(", ");

const BLOB_OPTIONS = {
  blobType: "circle",
  fillColor: "#2A2A2A",
  trailCount: 3,
  sizes: [60, 125, 75],
  innerSizes: [20, 35, 25],
  innerColor: "rgba(255, 255, 255, 0.14)",
  opacities: [0.72, 0.68, 0.7],
  shadowColor: "rgba(0, 0, 0, 0.42)",
  shadowBlur: 6,
  shadowOffsetX: 8,
  shadowOffsetY: 8,
  filterStdDeviation: 30,
  useFilter: true,
  fastDuration: 0.1,
  slowDuration: 0.5,
  zIndex: 10000,
};

function createBlobCursor(options = {}) {
  const { onClickableOverlap, ...blobOptions } = options;
  const config = { ...BLOB_OPTIONS, ...blobOptions };
  const {
    blobType,
    fillColor,
    trailCount,
    sizes,
    innerSizes,
    innerColor,
    opacities,
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    filterId = "hero-blob-filter",
    filterStdDeviation,
    filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
    useFilter,
    fastDuration,
    slowDuration,
    fastEase = "power3.out",
    slowEase = "power1.out",
    zIndex,
  } = config;

  const container = document.createElement("div");
  container.className = "blob-container";
  container.style.zIndex = String(zIndex);
  container.setAttribute("aria-hidden", "true");

  if (useFilter) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";

    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", filterId);
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");

    const blur = document.createElementNS(svgNS, "feGaussianBlur");
    blur.setAttribute("in", "SourceGraphic");
    blur.setAttribute("result", "blur");
    blur.setAttribute("stdDeviation", String(filterStdDeviation));

    const matrix = document.createElementNS(svgNS, "feColorMatrix");
    matrix.setAttribute("in", "blur");
    matrix.setAttribute("values", filterColorMatrixValues);

    filter.append(blur, matrix);
    svg.append(filter);
    document.body.append(svg);
  }

  const blobMain = document.createElement("div");
  blobMain.className = "blob-main";
  if (useFilter) blobMain.style.filter = `url(#${filterId})`;

  const blobs = [];

  for (let i = 0; i < trailCount; i += 1) {
    const blob = document.createElement("div");
    blob.className = "blob";
    blob.style.width = `${sizes[i]}px`;
    blob.style.height = `${sizes[i]}px`;
    blob.style.borderRadius = blobType === "circle" ? "50%" : "0%";
    blob.style.backgroundColor = fillColor;
    blob.style.opacity = "0";
    blob.style.boxShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`;

    const inner = document.createElement("div");
    inner.className = "inner-dot";
    inner.style.width = `${innerSizes[i]}px`;
    inner.style.height = `${innerSizes[i]}px`;
    inner.style.top = `${(sizes[i] - innerSizes[i]) / 2}px`;
    inner.style.left = `${(sizes[i] - innerSizes[i]) / 2}px`;
    inner.style.backgroundColor = innerColor;
    inner.style.borderRadius = blobType === "circle" ? "50%" : "0%";

    blob.append(inner);
    blobMain.append(blob);
    blobs.push(blob);
  }

  container.append(blobMain);
  document.body.append(container);

  let active = false;
  let exiting = false;
  let rafId = 0;
  let motionTween = null;

  function getOriginPoint(originEl) {
    if (!originEl) return null;
    const rect = originEl.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  function isOverClickable(clientX, clientY) {
    const target = document.elementFromPoint(clientX, clientY);
    if (!target || target.closest(HIT_SELECTOR)) return false;
    return !!target.closest(CLICKABLE_SELECTOR);
  }

  function restoreSystemCursor() {
    document.documentElement.classList.remove("has-blob-cursor");
  }

  function moveBlobs(clientX, clientY) {
    if (exiting) return;
    blobs.forEach((el, i) => {
      const isLead = i === 0;
      gsap.to(el, {
        x: clientX,
        y: clientY,
        duration: isLead ? fastDuration : slowDuration,
        ease: isLead ? fastEase : slowEase,
        overwrite: "auto",
      });
    });
  }

  function handleMove(event) {
    if (!active || exiting) return;
    const x = "clientX" in event ? event.clientX : event.touches?.[0]?.clientX;
    const y = "clientY" in event ? event.clientY : event.touches?.[0]?.clientY;
    if (x == null || y == null) return;

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (isOverClickable(x, y)) {
        onClickableOverlap?.();
        return;
      }
      moveBlobs(x, y);
    });
  }

  function playEnter(originEl, event) {
    const origin = getOriginPoint(originEl);
    const startX = origin?.x ?? event?.clientX ?? -100;
    const startY = origin?.y ?? event?.clientY ?? -100;

    gsap.killTweensOf([container, blobMain, ...blobs]);
    exiting = false;

    blobs.forEach((blob) => {
      gsap.set(blob, {
        xPercent: -50,
        yPercent: -50,
        x: startX,
        y: startY,
        scale: 0.12,
        opacity: 0,
        transformOrigin: "50% 50%",
      });
    });

    gsap.set(container, { opacity: 0, visibility: "visible" });
    container.classList.add("is-active");

    motionTween = gsap.timeline();
    motionTween.to(
      container,
      {
        opacity: 1,
        duration: ENTER_DURATION * 0.85,
        ease: "power2.out",
      },
      0
    );

    blobs.forEach((blob, i) => {
      motionTween.to(
        blob,
        {
          scale: 1,
          opacity: opacities[i],
          duration: ENTER_DURATION,
          ease: "power3.out",
        },
        i * 0.05
      );
    });

    if (event?.clientX != null && event?.clientY != null) {
      if (isOverClickable(event.clientX, event.clientY)) {
        onClickableOverlap?.();
        return;
      }
      moveBlobs(event.clientX, event.clientY);
    }
  }

  function activate(event, originEl) {
    if (exiting) return;

    if (!active) {
      active = true;
      document.documentElement.classList.add("has-blob-cursor");
      window.addEventListener("mousemove", handleMove, { passive: true });
      window.addEventListener("pointermove", handleMove, { passive: true });
      window.addEventListener("touchmove", handleMove, { passive: true });
      playEnter(originEl, event);
      return;
    }

    if (event?.clientX != null && event?.clientY != null) {
      if (isOverClickable(event.clientX, event.clientY)) {
        onClickableOverlap?.();
        return;
      }
      moveBlobs(event.clientX, event.clientY);
    }
  }

  function deactivate(originEl, { inPlace = false } = {}) {
    if (!active || exiting) return;
    exiting = true;
    active = false;

    restoreSystemCursor();

    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("touchmove", handleMove);
    cancelAnimationFrame(rafId);

    const origin = getOriginPoint(originEl);
    const endX = origin?.x ?? gsap.getProperty(blobs[0], "x");
    const endY = origin?.y ?? gsap.getProperty(blobs[0], "y");
    const duration = inPlace ? EXIT_DURATION : EXIT_TO_DOT_DURATION;
    const ease = "sine.inOut";

    gsap.killTweensOf([container, blobMain, ...blobs]);

    const exitTween = gsap.timeline({
      onComplete: () => {
        exiting = false;
        container.classList.remove("is-active");
        restoreSystemCursor();
        gsap.set(container, { opacity: 0, visibility: "hidden" });
        blobs.forEach((blob) => {
          gsap.set(blob, { scale: 0.12, opacity: 0 });
        });
      },
    });

    exitTween.to(
      container,
      {
        opacity: 0,
        duration,
        ease,
      },
      0
    );

    blobs.forEach((blob, i) => {
      const blobProps = inPlace
        ? { scale: 0.9, opacity: 0, duration, ease }
        : {
            x: endX,
            y: endY,
            scale: 0.08,
            opacity: 0,
            duration,
            ease,
          };

      exitTween.to(blob, blobProps, i * 0.03);
    });
  }

  function isActive() {
    return active || exiting;
  }

  return { activate, deactivate, isActive, destroy: () => deactivate() };
}

function pointInRect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function initHeroBlobCursor() {
  if (!document.body.classList.contains("home")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hitTarget = document.querySelector(HIT_SELECTOR);
  if (!hitTarget) return;

  let timeoutId = null;
  let pointerInside = false;
  let cursor;

  function clearDeactivateTimer() {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  function scheduleDeactivate() {
    clearDeactivateTimer();
    timeoutId = setTimeout(() => {
      cursor.deactivate(hitTarget);
      timeoutId = null;
    }, ACTIVATION_MS);
  }

  cursor = createBlobCursor({
    onClickableOverlap: () => {
      if (!cursor.isActive()) return;
      clearDeactivateTimer();
      cursor.deactivate(hitTarget, { inPlace: true });
    },
  });

  function activateFromEvent(event) {
    if (cursor.isActive()) return;
    cursor.activate(event, hitTarget);
    scheduleDeactivate();
  }

  function onEnter(event) {
    activateFromEvent(event);
  }

  hitTarget.addEventListener("pointerenter", onEnter);
  hitTarget.addEventListener("mouseenter", onEnter);

  document.addEventListener(
    "pointermove",
    (event) => {
      if (cursor.isActive() && isOverClickableGlobal(event.clientX, event.clientY, hitTarget)) {
        clearDeactivateTimer();
        cursor.deactivate(hitTarget, { inPlace: true });
        return;
      }

      const rect = hitTarget.getBoundingClientRect();
      const inside = pointInRect(event.clientX, event.clientY, rect);
      if (inside && !pointerInside && !cursor.isActive()) {
        pointerInside = true;
        activateFromEvent(event);
        return;
      }
      if (!inside) pointerInside = false;
    },
    { passive: true }
  );

  document.documentElement.dataset.blobCursor = "ready";
}

function isOverClickableGlobal(clientX, clientY, hitTarget) {
  const target = document.elementFromPoint(clientX, clientY);
  if (!target || target.closest(HIT_SELECTOR)) return false;
  return !!target.closest(
    'a[href], button:not(:disabled), summary, label[for], [role="button"], [role="link"], input[type="submit"], input[type="button"], select, .case-card__cta'
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroBlobCursor, { once: true });
} else {
  initHeroBlobCursor();
}
