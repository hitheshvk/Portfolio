(function initStudyLock() {
  const boundary = document.querySelector(".study-lock-boundary");
  if (!boundary) return;

  const studyId = boundary.dataset.studyId || "studio-redesign";
  const storageKey = `study-unlock:${studyId}`;
  const passcodes = {
    "studio-redesign": "2025",
  };

  const gate = document.getElementById("study-lock-gate");
  const protectedContent = document.getElementById("study-protected-content");
  const openBtn = document.getElementById("study-lock-open");
  const modal = document.getElementById("study-unlock-modal");
  const form = document.getElementById("study-unlock-form");
  const input = document.getElementById("study-unlock-code");
  const error = document.getElementById("study-unlock-error");
  const cancelBtn = document.getElementById("study-unlock-cancel");
  const backdrop = modal?.querySelector(".study-unlock-modal__backdrop");

  if (!gate || !protectedContent || !openBtn || !modal || !form || !input) return;

  let lastFocus = null;

  function isUnlocked() {
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  }

  function setUnlocked(unlocked) {
    document.body.classList.toggle("study--locked", !unlocked);
    document.body.classList.toggle("study--unlocked", unlocked);
    boundary.classList.toggle("is-unlocked", unlocked);
    gate.hidden = unlocked;

    if (unlocked) {
      protectedContent.removeAttribute("inert");
      protectedContent.removeAttribute("aria-hidden");
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* ignore */
      }
    } else {
      protectedContent.setAttribute("inert", "");
      protectedContent.setAttribute("aria-hidden", "true");
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      input.value = "";
      error.hidden = true;
      input.focus();
    });
    document.body.classList.add("study-unlock-modal-open");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("study-unlock-modal-open");
    window.setTimeout(() => {
      if (!modal.classList.contains("is-open")) {
        modal.hidden = true;
      }
    }, 280);
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function showError() {
    error.hidden = false;
    input.classList.add("is-error");
    input.focus();
    input.select();
  }

  function clearError() {
    error.hidden = true;
    input.classList.remove("is-error");
  }

  openBtn.addEventListener("click", openModal);
  cancelBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 4);
    clearError();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = input.value.trim();
    if (code.length !== 4) {
      showError();
      return;
    }

    if (code === passcodes[studyId]) {
      setUnlocked(true);
      closeModal();
      return;
    }

    showError();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      event.preventDefault();
      closeModal();
    }
  });

  setUnlocked(isUnlocked());
})();
