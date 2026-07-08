import Lenis from "lenis";

const SCROLL_LERP = 0.11;
const SCROLL_LERP_STUDY = 0.1;
const WHEEL_MULTIPLIER = 1.2;
const WHEEL_MULTIPLIER_STUDY = 1.3;
const ANCHOR_SCROLL_DURATION = 0.75;
const ANCHOR_SCROLL_DURATION_STUDY = 0.65;

type GsapTicker = {
  add: (fn: (time: number) => void) => void;
  remove: (fn: (time: number) => void) => void;
  lagSmoothing: (threshold: number) => void;
};

type ScrollTriggerStatic = {
  update: () => void;
};

type AnchorHandler = {
  el: HTMLAnchorElement;
  fn: (event: MouseEvent) => void;
};

declare global {
  interface Window {
    gsap?: { ticker: GsapTicker };
    ScrollTrigger?: ScrollTriggerStatic;
    __smoothScroll?: SmoothScroll;
  }
}

export class SmoothScroll {
  private static instance: SmoothScroll | null = null;

  private lenis: Lenis | null = null;
  private rafId = 0;
  private tickerFn: ((time: number) => void) | null = null;
  private scrollTriggerUpdate: (() => void) | null = null;
  private visibilityHandler: (() => void) | null = null;
  private motionHandler: ((event: MediaQueryListEvent) => void) | null = null;
  private popstateHandler: (() => void) | null = null;
  private anchorHandlers: AnchorHandler[] = [];
  private motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  private active = false;
  private anchorScrollDuration = ANCHOR_SCROLL_DURATION;

  static mount(): SmoothScroll {
    if (SmoothScroll.instance?.isActive()) {
      return SmoothScroll.instance;
    }

    if (SmoothScroll.instance) {
      SmoothScroll.instance.destroy();
    }

    SmoothScroll.instance = new SmoothScroll();
    SmoothScroll.instance.init();
    window.__smoothScroll = SmoothScroll.instance;
    return SmoothScroll.instance;
  }

  static getInstance(): SmoothScroll | null {
    return SmoothScroll.instance;
  }

  isActive(): boolean {
    return this.active && this.lenis !== null;
  }

  getLenis(): Lenis | null {
    return this.lenis;
  }

  getScrollY(): number {
    return this.lenis?.animatedScroll ?? window.scrollY;
  }

  bindScroll(fn: () => void): () => void {
    if (this.lenis) {
      this.lenis.on("scroll", fn);
      return () => {
        this.lenis?.off("scroll", fn);
      };
    }

    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }

  scrollTo(
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ): void {
    this.lenis?.scrollTo(target, options);
  }

  private init(): void {
    if (this.active || this.motionQuery.matches) {
      return;
    }

    if (document.body.classList.contains("photography-page-body")) {
      return;
    }

    const isStudy = document.body.classList.contains("study");
    this.anchorScrollDuration = isStudy
      ? ANCHOR_SCROLL_DURATION_STUDY
      : ANCHOR_SCROLL_DURATION;
    const wheelMultiplier = isStudy ? WHEEL_MULTIPLIER_STUDY : WHEEL_MULTIPLIER;
    const lerp = isStudy ? SCROLL_LERP_STUDY : SCROLL_LERP;

    this.lenis = new Lenis({
      lerp,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier,
      touchMultiplier: 1,
      infinite: false,
      autoRaf: false,
    });

    this.setupRaf();
    this.setupVisibility();
    this.setupAnchors();
    this.setupPopstate();
    this.setupMotionPreference();
    this.resolveInitialHash();
    this.active = true;
  }

  private getHeaderOffset(): number {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-offset")
      .trim();

    const value = parseFloat(raw);
    return Number.isFinite(value) ? -value : -68;
  }

  private setupRaf(): void {
    if (!this.lenis) {
      return;
    }

    const { gsap, ScrollTrigger } = window;

    if (gsap?.ticker && ScrollTrigger) {
      this.scrollTriggerUpdate = ScrollTrigger.update;
      this.lenis.on("scroll", this.scrollTriggerUpdate);

      this.tickerFn = (time: number) => {
        this.lenis?.raf(time * 1000);
      };

      gsap.ticker.add(this.tickerFn);
      gsap.ticker.lagSmoothing(0);
      return;
    }

    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };

    this.rafId = requestAnimationFrame(raf);
  }

  private setupVisibility(): void {
    this.visibilityHandler = () => {
      if (!this.lenis) {
        return;
      }

      if (document.hidden) {
        this.lenis.stop();
        return;
      }

      this.lenis.start();
      this.lenis.raf(performance.now());
    };

    document.addEventListener("visibilitychange", this.visibilityHandler);
  }

  private setupAnchors(): void {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const fn = (event: MouseEvent) => {
        const target = document.querySelector<HTMLElement>(href);
        if (!target || !this.lenis) {
          return;
        }

        event.preventDefault();
        this.lenis.scrollTo(target, {
          offset: this.getHeaderOffset(),
          duration: this.anchorScrollDuration,
        });
        history.pushState(null, "", href);
      };

      link.addEventListener("click", fn);
      this.anchorHandlers.push({ el: link, fn });
    });
  }

  private setupPopstate(): void {
    this.popstateHandler = () => {
      const hash = window.location.hash;
      if (!hash || !this.lenis) {
        return;
      }

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) {
        return;
      }

      this.lenis.scrollTo(target, {
        offset: this.getHeaderOffset(),
        duration: this.anchorScrollDuration,
      });
    };

    window.addEventListener("popstate", this.popstateHandler);
  }

  private resolveInitialHash(): void {
    const hash = window.location.hash;
    if (!hash || !this.lenis) {
      return;
    }

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      this.lenis?.scrollTo(target, {
        offset: this.getHeaderOffset(),
        immediate: true,
      });
    });
  }

  private setupMotionPreference(): void {
    this.motionHandler = (event: MediaQueryListEvent) => {
      if (event.matches) {
        this.destroy();
        return;
      }

      SmoothScroll.mount();
    };

    this.motionQuery.addEventListener("change", this.motionHandler);
  }

  destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    if (this.tickerFn && window.gsap?.ticker) {
      window.gsap.ticker.remove(this.tickerFn);
      this.tickerFn = null;
    }

    if (this.lenis && this.scrollTriggerUpdate) {
      this.lenis.off("scroll", this.scrollTriggerUpdate);
      this.scrollTriggerUpdate = null;
    }

    if (this.visibilityHandler) {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
      this.visibilityHandler = null;
    }

    if (this.motionHandler) {
      this.motionQuery.removeEventListener("change", this.motionHandler);
      this.motionHandler = null;
    }

    if (this.popstateHandler) {
      window.removeEventListener("popstate", this.popstateHandler);
      this.popstateHandler = null;
    }

    this.anchorHandlers.forEach(({ el, fn }) => {
      el.removeEventListener("click", fn);
    });
    this.anchorHandlers = [];

    this.lenis?.destroy();
    this.lenis = null;
    this.active = false;

    if (SmoothScroll.instance === this) {
      SmoothScroll.instance = null;
      delete window.__smoothScroll;
    }
  }
}
