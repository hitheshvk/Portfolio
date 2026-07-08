(function initStudyLightbox() {
  const study = document.querySelector(".study");
  if (!study) return;

  const images = study.querySelectorAll(
    ".study-showcase img, .study-article img, .study-product img"
  );
  if (!images.length) return;

  const ZOOM_SENSITIVITY = 0.0011;
  const MAX_ZOOM_FACTOR = 8;

  const overlay = document.createElement("div");
  overlay.className = "study-lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image preview");
  overlay.setAttribute("data-lenis-prevent", "");
  overlay.hidden = true;

  const backdrop = document.createElement("button");
  backdrop.type = "button";
  backdrop.className = "study-lightbox__backdrop";
  backdrop.setAttribute("aria-label", "Close image preview");

  const frame = document.createElement("div");
  frame.className = "study-lightbox__frame";

  const viewport = document.createElement("div");
  viewport.className = "study-lightbox__viewport";
  viewport.setAttribute("data-lenis-prevent", "");

  const stage = document.createElement("div");
  stage.className = "study-lightbox__stage";

  const preview = document.createElement("img");
  preview.className = "study-lightbox__img";
  preview.alt = "";
  preview.draggable = false;
  preview.decoding = "async";

  const loader = document.createElement("span");
  loader.className = "study-lightbox__loader";
  loader.setAttribute("aria-hidden", "true");

  const hint = document.createElement("p");
  hint.className = "study-lightbox__hint";
  hint.textContent = "Scroll to zoom · Drag to pan · Double-click to reset · Esc to close";

  stage.appendChild(preview);
  viewport.appendChild(stage);
  viewport.appendChild(loader);
  frame.appendChild(viewport);
  frame.appendChild(hint);
  overlay.appendChild(backdrop);
  overlay.appendChild(frame);
  document.body.appendChild(overlay);

  let lastFocus = null;
  let scale = 1;
  let minScale = 1;
  let maxScale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let dragPointerX = 0;
  let dragPointerY = 0;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let isOpen = false;
  let resumeLenisOnClose = false;
  let wheelFrame = 0;
  let wheelDelta = 0;
  let wheelX = 0;
  let wheelY = 0;
  let activePointers = new Map();
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let didDrag = false;
  let viewportObserver = null;

  function getImageBounds() {
    const { width: iw, height: ih } = getImageSize();
    if (!iw || !ih) return null;

    const { width: vw, height: vh } = getViewportSize();
    if (!stage.style.transform && vw && vh) {
      const fitScale = Math.min(vw / iw, vh / ih);
      const fitX = (vw - iw * fitScale) / 2;
      const fitY = (vh - ih * fitScale) / 2;
      return {
        left: fitX,
        top: fitY,
        right: fitX + iw * fitScale,
        bottom: fitY + ih * fitScale,
      };
    }

    return {
      left: offsetX,
      top: offsetY,
      right: offsetX + iw * scale,
      bottom: offsetY + ih * scale,
    };
  }

  function isOutsideImage(clientX, clientY) {
    const rect = viewport.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const bounds = getImageBounds();
    if (!bounds) return true;

    return x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getLenis() {
    return window.__smoothScroll?.getLenis?.() ?? null;
  }

  function pausePageScroll() {
    const lenis = getLenis();
    if (!lenis) return;
    resumeLenisOnClose = !lenis.isStopped;
    lenis.stop();
  }

  function resumePageScroll() {
    const lenis = getLenis();
    if (!lenis || !resumeLenisOnClose) return;
    lenis.start();
    resumeLenisOnClose = false;
  }

  function normalizeSrc(url) {
    if (!url) return "";
    try {
      return new URL(url, document.baseURI).href;
    } catch {
      return url;
    }
  }

  function getFullSrc(image) {
    return image.getAttribute("data-full-src") || image.currentSrc || image.src;
  }

  function getViewportSize() {
    return {
      width: viewport.clientWidth,
      height: viewport.clientHeight,
    };
  }

  function getImageSize() {
    return {
      width: preview.naturalWidth,
      height: preview.naturalHeight,
    };
  }

  function setStageSize() {
    preview.style.removeProperty("width");
    preview.style.removeProperty("height");
    stage.style.removeProperty("width");
    stage.style.removeProperty("height");
  }

  function constrainPan() {
    const { width: vw, height: vh } = getViewportSize();
    const { width: iw, height: ih } = getImageSize();
    if (!vw || !vh || !iw || !ih) return;

    const scaledW = iw * scale;
    const scaledH = ih * scale;

    if (scaledW <= vw) {
      offsetX = (vw - scaledW) / 2;
    } else {
      offsetX = clamp(offsetX, vw - scaledW, 0);
    }

    if (scaledH <= vh) {
      offsetY = (vh - scaledH) / 2;
    } else {
      offsetY = clamp(offsetY, vh - scaledH, 0);
    }
  }

  function applyTransform(smooth = false) {
    constrainPan();
    stage.classList.toggle("is-smooth", smooth);
    stage.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`;
    viewport.classList.toggle("is-zoomed", scale > minScale * 1.02);
  }

  function fitToViewport(smooth = false) {
    const { width: vw, height: vh } = getViewportSize();
    const { width: iw, height: ih } = getImageSize();
    if (!vw || !vh || !iw || !ih) return false;

    minScale = Math.min(vw / iw, vh / ih);
    maxScale = Math.max(1, minScale * MAX_ZOOM_FACTOR);
    scale = minScale;
    offsetX = (vw - iw * scale) / 2;
    offsetY = (vh - ih * scale) / 2;
    applyTransform(smooth);
    return true;
  }

  function scheduleFit(smooth = false) {
    const attemptFit = (remaining) => {
      if (!isOpen) return;
      if (fitToViewport(smooth)) return;
      if (remaining > 0) {
        requestAnimationFrame(() => attemptFit(remaining - 1));
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => attemptFit(6));
    });
  }

  function observeViewport() {
    if (viewportObserver || typeof ResizeObserver === "undefined") return;

    viewportObserver = new ResizeObserver(() => {
      if (!isOpen || !preview.naturalWidth) return;
      fitToViewport(false);
    });
    viewportObserver.observe(viewport);
  }

  function unobserveViewport() {
    viewportObserver?.disconnect();
    viewportObserver = null;
  }

  function zoomAt(clientX, clientY, nextScale, smooth = false) {
    const rect = viewport.getBoundingClientRect();
    const pointerX = clientX - rect.left;
    const pointerY = clientY - rect.top;
    const clampedScale = clamp(nextScale, minScale, maxScale);
    const imageX = (pointerX - offsetX) / scale;
    const imageY = (pointerY - offsetY) / scale;

    offsetX = pointerX - imageX * clampedScale;
    offsetY = pointerY - imageY * clampedScale;
    scale = clampedScale;
    applyTransform(smooth);
  }

  function resetView(smooth = true) {
    fitToViewport(smooth);
  }

  function setLoading(loading) {
    viewport.classList.toggle("is-loading", loading);
    stage.hidden = loading;
  }

  let previewReady = false;

  function onPreviewReady() {
    if (previewReady) return;
    previewReady = true;
    setStageSize();
    setLoading(false);
    scheduleFit(true);
  }

  function loadPreview(src) {
    preview.src = src;

    const ready = () => {
      if (!isOpen || previewReady) return;
      onPreviewReady();
    };

    preview.onload = ready;
    preview.onerror = () => {
      setLoading(false);
    };

    if (preview.complete && preview.naturalWidth) {
      if (preview.decode) {
        preview.decode().then(ready).catch(ready);
      } else {
        ready();
      }
    }
  }

  function open(image) {
    lastFocus = document.activeElement;
    isOpen = true;
    previewReady = false;
    isDragging = false;
    didDrag = false;
    wheelDelta = 0;
    activePointers.clear();
    stage.classList.remove("is-smooth", "is-dragging");
    viewport.classList.remove("is-dragging", "is-zoomed");
    preview.alt = image.alt || "";
    setLoading(true);
    pausePageScroll();

    overlay.hidden = false;
    overlay.classList.add("is-open");
    document.body.classList.add("study-lightbox-open");
    observeViewport();

    const src = normalizeSrc(getFullSrc(image));
    loadPreview(src);

    const tryInitialFit = (remaining) => {
      requestAnimationFrame(() => {
        if (!isOpen) return;
        if (fitToViewport(false)) return;
        if (remaining > 0) tryInitialFit(remaining - 1);
      });
    };
    tryInitialFit(8);

    backdrop.focus();
  }

  function close() {
    isOpen = false;
    previewReady = false;
    isDragging = false;
    didDrag = false;
    wheelDelta = 0;
    activePointers.clear();
    if (wheelFrame) {
      cancelAnimationFrame(wheelFrame);
      wheelFrame = 0;
    }

    overlay.hidden = true;
    overlay.classList.remove("is-open");
    document.body.classList.remove("study-lightbox-open");
    unobserveViewport();
    resumePageScroll();
    setLoading(false);
    preview.onload = null;
    preview.onerror = null;
    preview.removeAttribute("src");
    preview.removeAttribute("style");
    stage.removeAttribute("style");
    stage.hidden = false;
    stage.classList.remove("is-smooth", "is-dragging");
    viewport.classList.remove("is-dragging", "is-zoomed");
    preview.alt = "";
    lastFocus?.focus?.();
    lastFocus = null;
  }

  function applyWheelZoom() {
    wheelFrame = 0;
    if (!isOpen || !wheelDelta) return;

    const factor = Math.exp(wheelDelta);
    wheelDelta = 0;
    zoomAt(wheelX, wheelY, scale * factor, false);
  }

  function onWheel(event) {
    if (!isOpen) return;
    event.preventDefault();
    event.stopPropagation();

    wheelX = event.clientX;
    wheelY = event.clientY;
    wheelDelta += -event.deltaY * ZOOM_SENSITIVITY;

    if (wheelFrame) return;
    wheelFrame = requestAnimationFrame(applyWheelZoom);
  }

  function pointerDistance(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.hypot(dx, dy);
  }

  function pointerCenter(a, b) {
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    };
  }

  function onPointerDown(event) {
    if (!isOpen) return;

    const outside = isOutsideImage(event.clientX, event.clientY);
    activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      outside,
    });

    if (outside) return;

    if (activePointers.size === 2) {
      const [first, second] = [...activePointers.values()];
      pinchStartDistance = pointerDistance(first, second);
      pinchStartScale = scale;
      isDragging = false;
      stage.classList.remove("is-dragging");
      viewport.classList.remove("is-dragging");
      viewport.setPointerCapture(event.pointerId);
      return;
    }

    if (scale <= minScale * 1.01) return;

    isDragging = true;
    didDrag = false;
    dragPointerX = event.clientX;
    dragPointerY = event.clientY;
    dragOffsetX = offsetX;
    dragOffsetY = offsetY;
    stage.classList.add("is-dragging");
    stage.classList.remove("is-smooth");
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!isOpen || !activePointers.has(event.pointerId)) return;
    const pointer = activePointers.get(event.pointerId);
    activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      outside: pointer?.outside ?? false,
    });

    if (activePointers.size === 2 && pinchStartDistance > 0) {
      const [first, second] = [...activePointers.values()];
      const distance = pointerDistance(first, second);
      const center = pointerCenter(first, second);
      const nextScale = pinchStartScale * (distance / pinchStartDistance);
      zoomAt(center.x, center.y, nextScale, false);
      return;
    }

    if (!isDragging) return;

    if (
      Math.abs(event.clientX - dragPointerX) > 2 ||
      Math.abs(event.clientY - dragPointerY) > 2
    ) {
      didDrag = true;
    }

    offsetX = dragOffsetX + (event.clientX - dragPointerX);
    offsetY = dragOffsetY + (event.clientY - dragPointerY);
    applyTransform(false);
  }

  function onPointerUp(event) {
    const pointer = activePointers.get(event.pointerId);
    activePointers.delete(event.pointerId);

    if (activePointers.size < 2) {
      pinchStartDistance = 0;
    }

    if (pointer?.outside && !didDrag && isOutsideImage(event.clientX, event.clientY)) {
      close();
      return;
    }

    if (!isDragging) {
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      return;
    }

    isDragging = false;
    stage.classList.remove("is-dragging");
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    applyTransform(true);
  }

  function onDoubleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (scale > minScale * 1.05) {
      resetView(true);
      return;
    }

    zoomAt(event.clientX, event.clientY, Math.min(minScale * 2.5, maxScale), true);
  }

  images.forEach((image) => {
    image.classList.add("study-zoomable");
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute(
      "aria-label",
      image.alt ? `View full size: ${image.alt}` : "View full size image"
    );

    const handleOpen = (event) => {
      event.preventDefault();
      event.stopPropagation();
      open(image);
    };

    image.addEventListener("click", handleOpen);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        handleOpen(event);
      }
    });
  });

  backdrop.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (!isOpen || didDrag) return;

    if (event.target === overlay || event.target === backdrop) {
      close();
      return;
    }

    if (
      (event.target === viewport || event.target === loader) &&
      isOutsideImage(event.clientX, event.clientY)
    ) {
      close();
    }
  });

  overlay.addEventListener("wheel", onWheel, { passive: false });
  viewport.addEventListener("wheel", onWheel, { passive: false });
  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerUp);
  viewport.addEventListener("dblclick", onDoubleClick);

  window.addEventListener("resize", () => {
    if (!isOpen || !preview.naturalWidth) return;
    fitToViewport(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      close();
      return;
    }

    const rect = viewport.getBoundingClientRect();
    const center = {
      x: rect.left + viewport.clientWidth / 2,
      y: rect.top + viewport.clientHeight / 2,
    };

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAt(center.x, center.y, scale * 1.15, true);
    }

    if (event.key === "-") {
      event.preventDefault();
      zoomAt(center.x, center.y, scale / 1.15, true);
    }

    if (event.key === "0") {
      event.preventDefault();
      resetView(true);
    }
  });
})();
