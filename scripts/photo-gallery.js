(function initPhotoGallery() {
  function mountPhotographyLoaderGate() {
    if (!document.querySelector(".photography-page")) return;
    window.__pageLoaderMaxMs = 5000;
    window.__pageLoaderGate = new Promise((resolve) => {
      window.__resolvePhotographyLoaderGate = resolve;
    });
  }

  mountPhotographyLoaderGate();

  const ALL_PHOTOS = [
    { src: "images/photography/01.jpg", alt: "Trekkers crossing a snow-dusted meadow below jagged peaks.", ratio: 1.779, focus: "center", featured: true },
    { src: "images/photography/02.jpg", alt: "Turquoise river winding through a mountain valley.", ratio: 1.779, focus: "center", featured: true },
    { src: "images/photography/03.jpg", alt: "Street mural and passerby in morning light.", ratio: 0.666, focus: "center top", featured: true },
    { src: "images/photography/04.jpg", alt: "Red boats moored on still water at dusk.", ratio: 1.333, focus: "center", featured: true },
    { src: "images/photography/05.jpg", alt: "Two figures silhouetted on a shore at twilight.", ratio: 1.251, focus: "right center", featured: false, slot: "wide3" },
    { src: "images/photography/06.jpg", alt: "Street photograph.", ratio: 0.8, focus: "center", featured: true },
    { src: "images/photography/07.jpg", alt: "Orange sun setting behind mountain silhouettes.", ratio: 0.667, focus: "center top", featured: true },
    { src: "images/photography/08.jpg", alt: "Street photograph.", ratio: 0.667, focus: "center top", featured: false },
    { src: "images/photography/09.jpg", alt: "Birds on a wire against a pale sky.", ratio: 0.562, focus: "center top", featured: true },
    { src: "images/photography/10.jpg", alt: "Street photograph.", ratio: 0.801, focus: "center", featured: false },
    { src: "images/photography/11.jpg", alt: "Street photograph.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/13.jpg", alt: "Dewdrop on a blade of grass.", ratio: 0.75, focus: "center", featured: false },
    { src: "images/photography/14.jpg", alt: "Howrah Bridge in black and white with a bird in flight.", ratio: 0.8, focus: "center", featured: true, marqueeFocus: "left top" },
    { src: "images/photography/16.jpg", alt: "Photograph 16.", ratio: 1.25, focus: "center", featured: false },
    { src: "images/photography/17.jpg", alt: "Photograph 17.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/18.jpg", alt: "Photograph 18.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/19.jpg", alt: "Photograph 19.", ratio: 0.563, focus: "center top", featured: false },
    { src: "images/photography/20.jpg", alt: "Photograph 20.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/21.jpg", alt: "Photograph 21.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/22.jpg", alt: "Photograph 22.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/23.jpg", alt: "Photograph 23.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/24.jpg", alt: "Photograph 24.", ratio: 0.714, focus: "center top", featured: false },
    { src: "images/photography/25.jpg", alt: "Photograph 25.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/26.jpg", alt: "Photograph 26.", ratio: 0.75, focus: "center", featured: false },
    { src: "images/photography/27.jpg", alt: "Photograph 27.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/28.jpg", alt: "Photograph 28.", ratio: 1.778, focus: "center", featured: false },
    { src: "images/photography/29.jpg", alt: "Photograph 29.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/30.jpg", alt: "Photograph 30.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/38.jpg", alt: "Red berries beaded with dew in soft morning light.", ratio: 0.562, focus: "center top", featured: false, pageSpan: 1 },
    { src: "images/photography/44.jpg", alt: "Photograph 44.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/47.jpg", alt: "Photograph 47.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/48.jpg", alt: "Photograph 48.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/49.jpg", alt: "Photograph 49.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/50.jpg", alt: "Photograph 50.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/51.jpg", alt: "Photograph 51.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/52.jpg", alt: "Misty morning path through trees with golden foliage.", ratio: 0.562, focus: "center top", featured: true, pageSpan: 1 },
    { src: "images/photography/53.jpg", alt: "Photograph 53.", ratio: 0.8, focus: "center", featured: false },
    { src: "images/photography/54.jpg", alt: "Photograph 54.", ratio: 0.667, focus: "center top", featured: false },
    { src: "images/photography/55.jpg", alt: "Mother lifting a child into the sunset.", ratio: 0.562, focus: "center top", featured: false, pageSpan: 1 },
    { src: "images/photography/56.jpg", alt: "Photograph 56.", ratio: 0.75, focus: "center", featured: false },
    { src: "images/photography/57.jpg", alt: "Photograph 57.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/58.jpg", alt: "Carved wooden pillars in a dim temple interior.", ratio: 0.667, focus: "center top", featured: false, pageSpan: 1 },
    { src: "images/photography/59.jpg", alt: "Photograph 59.", ratio: 0.562, focus: "center top", featured: false },
    { src: "images/photography/60.jpg", alt: "Long-tail boats in turquoise water beneath limestone cliffs.", ratio: 1.333, focus: "center", featured: false },
    { src: "images/photography/61.jpg", alt: "Stone elephant carving along a temple walkway.", ratio: 0.562, focus: "center top", featured: true },
    { src: "images/photography/62.jpg", alt: "Child behind a sheer curtain in black and white.", ratio: 0.75, focus: "center", featured: true },
  ];

  const MARQUEE_LEAD = [
    { type: "square", src: "images/photography/14.jpg" },
    { type: "tall", src: "images/photography/61.jpg" },
    { type: "tall", src: "images/photography/52.jpg" },
    { type: "tall", src: "images/photography/62.jpg" },
    { type: "tall", src: "images/photography/09.jpg" },
  ];

  const HOMEPAGE_PHOTOS = ALL_PHOTOS.filter((photo) => photo.featured);
  const MARQUEE_LEAD_SRCS = new Set(MARQUEE_LEAD.map((item) => item.src));

  ALL_PHOTOS.forEach((photo, index) => {
    photo.index = index;
    photo.kind = slotKind(photo.ratio);
  });

  HOMEPAGE_PHOTOS.forEach((photo, index) => {
    photo.homeIndex = index;
  });

  const GRID_COLS = 6;
  const BLOCK_TYPES = ["wide3x2", "panorama", "wide3", "wide2", "pair", "duo", "tall"];

  function slotKind(ratio) {
    if (ratio > 1.55) return "panorama";
    if (ratio > 1.08) return "landscape";
    if (ratio < 0.72) return "portrait";
    return "square";
  }

  function colUnits(type) {
    const units = {
      tall: 1,
      duo: 1,
      pair: 2,
      wide2: 2,
      wide3: 3,
      wide3x2: 3,
      panorama: 3,
    };
    return units[type] || 1;
  }

  function seededShuffle(items, seed) {
    const list = items.slice();
    let s = seed;
    for (let i = list.length - 1; i > 0; i -= 1) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function takeFromPool(pool, kind, fallbackKinds = []) {
    const kinds = [kind, ...fallbackKinds];
    for (const k of kinds) {
      const idx = pool.findIndex((p) => p.kind === k);
      if (idx !== -1) return pool.splice(idx, 1)[0];
    }
    return pool.shift() || null;
  }

  function takeMany(pool, count, kind, fallbackKinds = []) {
    const picks = [];
    for (let i = 0; i < count; i += 1) {
      const photo = takeFromPool(pool, kind, fallbackKinds);
      if (photo) picks.push(photo);
    }
    return picks;
  }

  function takePreferredSlot(pool, slot) {
    const idx = pool.findIndex((photo) => photo.slot === slot);
    if (idx === -1) return null;
    return pool.splice(idx, 1)[0];
  }

  function tryPlaceBlock(pool, type) {
    if (type === "tall") {
      const photo = takeFromPool(pool, "portrait", ["square", "landscape"]);
      return photo ? { type: "tall", index: photo.index } : null;
    }
    if (type === "duo") {
      const picks = takeMany(pool, 2, "square", ["landscape", "portrait"]);
      return picks.length === 2 ? { type: "duo", indices: picks.map((p) => p.index) } : null;
    }
    if (type === "pair") {
      const picks = takeMany(pool, 2, "square", ["landscape", "portrait"]);
      return picks.length === 2 ? { type: "pair", indices: picks.map((p) => p.index) } : null;
    }
    if (type === "wide2") {
      const photo = takePreferredSlot(pool, "wide2") || takeFromPool(pool, "landscape", ["panorama", "square"]);
      return photo ? { type: "wide2", index: photo.index } : null;
    }
    if (type === "wide3" || type === "wide3x2") {
      const photo = takePreferredSlot(pool, type) || takeFromPool(pool, "panorama", ["landscape"]);
      return photo ? { type, index: photo.index } : null;
    }
    if (type === "panorama") {
      const tallPhoto = takeFromPool(pool, "portrait", ["square"]);
      const widePhoto = takeFromPool(pool, "landscape", ["panorama", "square"]);
      return tallPhoto && widePhoto
        ? { type: "panorama", tallIndex: tallPhoto.index, wideIndex: widePhoto.index }
        : null;
    }
    return null;
  }

  function buildStripFromPool(pool, seed) {
    const layout = [];
    let usedCols = 0;
    let attempt = 0;

    while (usedCols < GRID_COLS && pool.length > 0 && attempt < 24) {
      const remaining = GRID_COLS - usedCols;

      const preferredWide3 = remaining >= 3 ? takePreferredSlot(pool, "wide3") : null;
      if (preferredWide3) {
        layout.push({ type: "wide3", index: preferredWide3.index });
        usedCols += 3;
        attempt += 1;
        continue;
      }

      const candidates = seededShuffle(
        BLOCK_TYPES.filter((type) => colUnits(type) <= remaining),
        seed + attempt
      );
      let placed = false;

      for (const type of candidates) {
        const snapshot = pool.map((photo) => ({ ...photo }));
        const block = tryPlaceBlock(pool, type);
        if (block) {
          layout.push(block);
          usedCols += colUnits(block.type);
          placed = true;
          break;
        }
        pool.splice(0, pool.length, ...snapshot);
      }

      if (!placed) {
        if (remaining >= 1) {
          const photo = pool.shift();
          layout.push({ type: "tall", index: photo.index });
          usedCols += 1;
        } else {
          break;
        }
      }

      attempt += 1;
    }

    return layout;
  }

  const PAGE_THUMB_ROOT = "images/photography/thumb/";
  const PAGE_WEB_ROOT = "images/photography/web/";
  const MARQUEE_THUMB_ROOT = "images/photography/marquee/";

  function toThumbSrc(src) {
    return src.replace("images/photography/", PAGE_THUMB_ROOT);
  }

  function toMarqueeThumbSrc(src) {
    return src.replace("images/photography/", MARQUEE_THUMB_ROOT);
  }

  function toWebSrc(src) {
    return src.replace("images/photography/", PAGE_WEB_ROOT);
  }

  function displayDimensions(photo) {
    const maxEdge = 960;
    if (photo.ratio >= 1) {
      return { width: maxEdge, height: Math.max(1, Math.round(maxEdge / photo.ratio)) };
    }
    return { width: Math.max(1, Math.round(maxEdge * photo.ratio)), height: maxEdge };
  }

  function getMasonryColumnCount() {
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 900) return 3;
    if (width >= 560) return 2;
    return 1;
  }

  function buildMasonryColumns(photos, columnCount) {
    const columns = Array.from({ length: columnCount }, () => ({ items: [], height: 0 }));

    photos.forEach((photo) => {
      const shortestIndex = columns.reduce(
        (minIndex, column, index, list) => (column.height < list[minIndex].height ? index : minIndex),
        0
      );
      const estimatedHeight = 1 / Math.max(photo.ratio || 1, 0.35);
      columns[shortestIndex].items.push(photo);
      columns[shortestIndex].height += estimatedHeight;
    });

    return columns.map((column) => column.items);
  }

  function buildMarqueeLeadLayout() {
    return MARQUEE_LEAD.map(({ type, src }) => {
      const photo = ALL_PHOTOS.find((item) => item.src === src);
      if (!photo) return null;
      return {
        type,
        index: photo.index,
        ...(photo.marqueeFocus ? { marqueeFocus: photo.marqueeFocus } : {}),
      };
    }).filter(Boolean);
  }

  function buildMarqueeLayout(photos) {
    const pool = photos
      .filter((photo) => !MARQUEE_LEAD_SRCS.has(photo.src))
      .map((photo) => ({ ...photo }));
    const blockTemplates = seededShuffle(
      [
        { type: "tall" },
        { type: "tall" },
        { type: "wide3" },
        { type: "tall" },
        { type: "tall" },
        { type: "tall" },
        { type: "wide3" },
        { type: "tall" },
        { type: "tall" },
        { type: "tall" },
        { type: "tall" },
        { type: "tall" },
      ],
      20260708
    );

    const layout = buildMarqueeLeadLayout();

    blockTemplates.forEach((block) => {
      if (block.type === "tall") {
        const photo = takeFromPool(pool, "portrait", ["square", "landscape"]);
        if (photo) layout.push({ type: "tall", index: photo.index });
      } else if (block.type === "duo") {
        const picks = takeMany(pool, 2, "portrait", ["square", "landscape"]);
        picks.forEach((photo) => layout.push({ type: "tall", index: photo.index }));
      } else if (block.type === "wide3") {
        const photo =
          takePreferredSlot(pool, "wide3") || takeFromPool(pool, "panorama", ["landscape"]);
        if (photo) layout.push({ type: "wide3", index: photo.index });
      }
    });

    pool.forEach((photo) => {
      layout.push({ type: "tall", index: photo.index });
    });

    return layout;
  }

  function getPhotoByIndex(photos, index) {
    return photos.find((photo) => photo.index === Number(index)) || photos[Number(index)];
  }

  function getLenis() {
    return window.__smoothScroll?.getLenis?.() ?? null;
  }

  async function waitForImage(img) {
    await new Promise((resolve) => {
      const done = () => resolve();
      if (img.complete) {
        done();
        return;
      }
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });

    if (typeof img.decode === "function") {
      try {
        await img.decode();
      } catch {
        /* ignore decode failures */
      }
    }
  }

  function delay(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function waitForPriorityImages(root, limit = 4) {
    const images = Array.from(root.querySelectorAll("img")).slice(0, limit);
    if (!images.length) return Promise.resolve();
    return Promise.all(images.map((img) => waitForImage(img)));
  }

  function refreshLenis() {
    const lenis = getLenis();
    if (!lenis) return;
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => lenis.resize?.(), { timeout: 1200 });
    } else {
      window.setTimeout(() => lenis.resize?.(), 120);
    }
  }

  function scheduleFrame(fn) {
    requestAnimationFrame(() => requestAnimationFrame(fn));
  }

  function scheduleIdle(fn, timeout = 600) {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(fn, { timeout });
    } else {
      window.setTimeout(fn, 32);
    }
  }

  function hydrateMarqueeImages(root, onDone) {
    const images = [...root.querySelectorAll("img.is-pending[data-src]")];
    if (!images.length) {
      onDone?.();
      return;
    }

    let index = 0;
    const batchSize = 2;

    function loadBatch() {
      const end = Math.min(index + batchSize, images.length);
      for (; index < end; index += 1) {
        const img = images[index];
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        img.classList.remove("is-pending");
      }

      if (index < images.length) {
        requestAnimationFrame(loadBatch);
        return;
      }

      onDone?.();
    }

    requestAnimationFrame(loadBatch);
  }

  function createPageCell(photo, eager) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "photo-cell photo-cell--masonry";
    cell.dataset.photoIndex = String(photo.index);
    cell.setAttribute("aria-label", `View photograph: ${photo.alt}`);

    const img = document.createElement("img");
    const dims = displayDimensions(photo);
    img.width = dims.width;
    img.height = dims.height;
    img.alt = photo.alt;
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    img.draggable = false;
    img.sizes = "(min-width: 1280px) 25vw, (min-width: 900px) 33vw, (min-width: 560px) 50vw, 100vw";
    img.src = toThumbSrc(photo.src);
    if (eager) img.fetchPriority = "high";
    if (photo.focus) img.style.objectPosition = photo.focus;

    cell.appendChild(img);
    return cell;
  }

  function renderMasonryGrid(grid, photos) {
    const columnCount = getMasonryColumnCount();
    const columns = buildMasonryColumns(photos, columnCount);
    let eagerBudget = 4;

    grid.replaceChildren();
    const masonry = document.createElement("div");
    masonry.className = "photography-page__masonry";
    masonry.style.setProperty("--photo-masonry-columns", String(columnCount));

    columns.forEach((columnPhotos) => {
      const column = document.createElement("div");
      column.className = "photography-page__column";

      columnPhotos.forEach((photo) => {
        const eager = eagerBudget > 0;
        if (eager) eagerBudget -= 1;
        column.appendChild(createPageCell(photo, eager));
      });

      masonry.appendChild(column);
    });

    grid.appendChild(masonry);
    return columnCount;
  }

  function createCell(photos, index, slot, options = {}) {
    const photo = getPhotoByIndex(photos, index);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "photo-cell";
    if (slot) cell.classList.add(`photo-cell--${slot}`);
    cell.dataset.photoIndex = String(photo.index);
    cell.setAttribute("aria-label", `View photograph: ${photo.alt}`);

    const img = document.createElement("img");
    const thumbSrc = options.marquee ? toMarqueeThumbSrc(photo.src) : toThumbSrc(photo.src);
    img.alt = photo.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.draggable = false;
    img.sizes = options.marquee ? "280px" : "(max-width: 900px) 180px, 280px";
    if (photo.ratio) {
      const edge = options.marquee ? 480 : slot === "wide" || slot === "wide3" ? 840 : 560;
      img.width = photo.ratio >= 1 ? edge : Math.max(1, Math.round(edge * photo.ratio));
      img.height = photo.ratio >= 1 ? Math.max(1, Math.round(edge / photo.ratio)) : edge;
    }

    if (options.deferSrc) {
      img.dataset.src = thumbSrc;
      img.classList.add("is-pending");
    } else {
      img.src = thumbSrc;
      if (options.eager) img.fetchPriority = "high";
    }

    const objectPosition = options.marqueeFocus || photo.marqueeFocus || photo.focus;
    if (objectPosition) img.style.objectPosition = objectPosition;

    cell.appendChild(img);
    return cell;
  }

  function appendBlock(parent, block, photos) {
    const column = document.createElement("div");
    column.className = `photo-column photo-column--${block.type}`;
    const cellOptions = block.marqueeFocus ? { marqueeFocus: block.marqueeFocus } : {};

    if (block.type === "tall") {
      column.appendChild(createCell(photos, block.index, "tall", cellOptions));
    } else if (block.type === "square") {
      column.appendChild(createCell(photos, block.index, "square", cellOptions));
    } else if (block.type === "wide2" || block.type === "wide3" || block.type === "wide3x2") {
      column.appendChild(createCell(photos, block.index, "wide"));
    } else if (block.type === "duo") {
      block.indices.forEach((index) => column.appendChild(createCell(photos, index, "square")));
    } else if (block.type === "pair") {
      block.indices.forEach((index) => column.appendChild(createCell(photos, index, "square")));
    } else if (block.type === "panorama") {
      const tallCell = createCell(photos, block.tallIndex, "tall");
      tallCell.classList.add("photo-cell--panorama-tall");
      const wideCell = createCell(photos, block.wideIndex, "wide");
      wideCell.classList.add("photo-cell--panorama-wide");
      column.appendChild(tallCell);
      column.appendChild(wideCell);
    }

    parent.appendChild(column);
  }

  function buildStrip(root, layout, photos) {
    root.replaceChildren();
    layout.forEach((block) => appendBlock(root, block, photos));
  }

  function createLightbox(root, photos) {
    if (root.__photoLightboxReady) return;
    root.__photoLightboxReady = true;

    const overlay = document.createElement("div");
    overlay.className = "photo-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photograph preview");
    overlay.setAttribute("data-lenis-prevent", "");
    overlay.hidden = true;

    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "photo-lightbox__backdrop";
    backdrop.setAttribute("aria-label", "Close photograph");

    const frame = document.createElement("div");
    frame.className = "photo-lightbox__frame";

    const preview = document.createElement("img");
    preview.className = "photo-lightbox__img";
    preview.alt = "";
    preview.decoding = "async";
    preview.draggable = false;

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "photo-lightbox__close";
    closeBtn.setAttribute("aria-label", "Close photograph");
    closeBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

    frame.appendChild(preview);
    overlay.appendChild(backdrop);
    overlay.appendChild(frame);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    let lastFocus = null;
    let isOpen = false;
    let resumeLenisOnClose = false;

    function openLightbox(index) {
      const photo = getPhotoByIndex(photos, index);
      if (!photo || isOpen) return;

      lastFocus = document.activeElement;
      isOpen = true;
      preview.alt = photo.alt;
      preview.src = toWebSrc(photo.src);
      preview.style.objectPosition = photo.focus || "center";

      const lenis = getLenis();
      if (lenis?.stop) {
        lenis.stop();
        resumeLenisOnClose = true;
      }

      overlay.hidden = false;
      requestAnimationFrame(() => {
        overlay.classList.add("is-open");
      });
      document.body.classList.add("photo-lightbox-open");
      closeBtn.focus();
    }

    function closeLightbox() {
      if (!isOpen) return;
      isOpen = false;
      overlay.classList.remove("is-open");
      document.body.classList.remove("photo-lightbox-open");

      const lenis = getLenis();
      if (resumeLenisOnClose && lenis?.start) {
        lenis.start();
        resumeLenisOnClose = false;
      }

      window.setTimeout(() => {
        if (!isOpen) {
          overlay.hidden = true;
          preview.removeAttribute("src");
        }
      }, 420);

      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    root.addEventListener("click", (event) => {
      const cell = event.target.closest(".photo-cell");
      if (!cell || !root.contains(cell)) return;
      openLightbox(cell.dataset.photoIndex);
    });

    backdrop.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closeLightbox();
      }
    });
  }

  function initMarquee() {
    const section = document.querySelector(".photography--marquee");
    if (!section) return;

    const track = section.querySelector(".photography__track");
    const stripA = section.querySelector(".photography__strip--primary");
    const stripB = section.querySelector(".photography__strip--clone");
    if (!track || !stripA || !stripB) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layout = buildMarqueeLayout(HOMEPAGE_PHOTOS);
    let built = false;
    let buildQueued = false;
    let lightboxBound = false;

    function createMarqueeCell(photos, index, slot, options = {}) {
      return createCell(photos, index, slot, {
        ...options,
        marquee: true,
        deferSrc: true,
      });
    }

    function appendMarqueeBlock(parent, block, photos) {
      const column = document.createElement("div");
      column.className = `photo-column photo-column--${block.type}`;
      const cellOptions = block.marqueeFocus ? { marqueeFocus: block.marqueeFocus } : {};

      if (block.type === "tall") {
        column.appendChild(createMarqueeCell(photos, block.index, "tall", cellOptions));
      } else if (block.type === "square") {
        column.appendChild(createMarqueeCell(photos, block.index, "square", cellOptions));
      } else if (block.type === "wide2" || block.type === "wide3" || block.type === "wide3x2") {
        column.appendChild(createMarqueeCell(photos, block.index, "wide"));
      } else if (block.type === "duo") {
        block.indices.forEach((index) => column.appendChild(createMarqueeCell(photos, index, "square")));
      } else if (block.type === "pair") {
        block.indices.forEach((index) => column.appendChild(createMarqueeCell(photos, index, "square")));
      } else if (block.type === "panorama") {
        const tallCell = createMarqueeCell(photos, block.tallIndex, "tall");
        tallCell.classList.add("photo-cell--panorama-tall");
        const wideCell = createMarqueeCell(photos, block.wideIndex, "wide");
        wideCell.classList.add("photo-cell--panorama-wide");
        column.appendChild(tallCell);
        column.appendChild(wideCell);
      }

      parent.appendChild(column);
    }

    async function buildStripChunked(root, stripLayout, photos) {
      root.replaceChildren();
      for (let i = 0; i < stripLayout.length; i += 1) {
        appendMarqueeBlock(root, stripLayout[i], photos);
        if (i % 2 === 1) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }
    }

    function setMarqueeSpeed() {
      const width = stripA.getBoundingClientRect().width;
      if (!width) return;
      const seconds = Math.max(32, Math.round(width / 48));
      track.style.setProperty("--photo-marquee-duration", `${seconds}s`);
    }

    function ensureLightbox() {
      if (lightboxBound) return;
      lightboxBound = true;
      createLightbox(section, ALL_PHOTOS);
    }

    function startMarqueeMotion() {
      if (reduceMotion.matches) {
        track.classList.add("is-static");
        return;
      }
      track.classList.add("is-animating");
    }

    async function buildMarquee() {
      if (built) return;
      built = true;
      section.classList.add("is-ready");

      await buildStripChunked(stripA, layout, ALL_PHOTOS);
      setMarqueeSpeed();

      hydrateMarqueeImages(stripA, () => {
        startMarqueeMotion();
        scheduleIdle(() => {
          if (stripB.childElementCount) return;
          buildStripChunked(stripB, layout, ALL_PHOTOS).then(() => {
            hydrateMarqueeImages(stripB, setMarqueeSpeed);
          });
        }, 1400);
      });
    }

    function queueBuild() {
      if (built || buildQueued) return;
      buildQueued = true;
      scheduleFrame(() => {
        scheduleIdle(() => {
          buildQueued = false;
          buildMarquee();
        }, 300);
      });
    }

    function setMarqueeActive(active) {
      track.classList.toggle("is-offscreen", !active);
      section.classList.toggle("is-inview", active);
      if (active) ensureLightbox();
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              queueBuild();
            }
            setMarqueeActive(entry.isIntersecting);
          });
        },
        { rootMargin: "120px 0px", threshold: 0.01 }
      );
      observer.observe(section);
    } else {
      queueBuild();
      setMarqueeActive(true);
      ensureLightbox();
    }

    let resizeTimer = null;
    window.addEventListener(
      "resize",
      () => {
        if (!built) return;
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(setMarqueeSpeed, 160);
      },
      { passive: true }
    );

    reduceMotion.addEventListener?.("change", (event) => {
      track.classList.toggle("is-static", event.matches);
      track.classList.toggle("is-animating", !event.matches && built);
    });
  }

  async function initPage() {
    const page = document.querySelector(".photography-page");
    if (!page) return;

    const grid = page.querySelector(".photography-page__grid");
    if (!grid) return;

    let masonryColumns = renderMasonryGrid(grid, ALL_PHOTOS);
    createLightbox(page, ALL_PHOTOS);

    let resizeTimer = null;
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          const nextColumns = getMasonryColumnCount();
          if (nextColumns === masonryColumns) return;
          masonryColumns = renderMasonryGrid(grid, ALL_PHOTOS);
          refreshLenis();
        }, 160);
      },
      { passive: true }
    );

    try {
      await Promise.race([waitForPriorityImages(grid, getMasonryColumnCount() * 2), delay(1200)]);
      refreshLenis();
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      refreshLenis();
    } finally {
      window.__resolvePhotographyLoaderGate?.();
    }
  }

  initMarquee();
  initPage().catch(() => window.__resolvePhotographyLoaderGate?.());
})();
