(function initStudyLock() {
  const boundary = document.querySelector(".study-lock-boundary");
  if (!boundary) return;

  const studyId = boundary.dataset.studyId || "studio-redesign";
  const storageKey = `study-unlock:${studyId}`;
  const passcodes = {
    "studio-redesign": "8904",
  };

  const gate = document.getElementById("study-lock-gate");
  const protectedContent = document.getElementById("study-protected-content");
  const openBtn = document.getElementById("study-lock-open");
  const modal = document.getElementById("study-unlock-modal");
  const form = document.getElementById("study-unlock-form");
  const digitInputs = Array.from(document.querySelectorAll(".study-unlock-modal__digit"));
  const error = document.getElementById("study-unlock-error");
  const cancelBtn = document.getElementById("study-unlock-cancel");
  const backdrop = modal?.querySelector(".study-unlock-modal__backdrop");

  if (!gate || !protectedContent || !openBtn || !modal || !form || digitInputs.length !== 4) return;

  let lastFocus = null;

  try {
    sessionStorage.removeItem(storageKey);
  } catch {
    /* ignore */
  }

  function setUnlocked(unlocked) {
    document.body.classList.toggle("study--locked", !unlocked);
    document.body.classList.toggle("study--unlocked", unlocked);
    boundary.classList.toggle("is-unlocked", unlocked);
    gate.hidden = unlocked;

    if (unlocked) {
      protectedContent.removeAttribute("inert");
      protectedContent.removeAttribute("aria-hidden");
    } else {
      protectedContent.setAttribute("inert", "");
      protectedContent.setAttribute("aria-hidden", "true");
    }
  }

  function getCode() {
    return digitInputs.map((input) => input.value).join("");
  }

  function clearDigits() {
    digitInputs.forEach((input) => {
      input.value = "";
      input.classList.remove("is-error");
    });
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      clearDigits();
      error.hidden = true;
      digitInputs[0].focus();
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
    digitInputs.forEach((input) => input.classList.add("is-error"));
    digitInputs[0].focus();
    digitInputs[0].select();
  }

  function clearError() {
    error.hidden = true;
    digitInputs.forEach((input) => input.classList.remove("is-error"));
  }

  function fillDigits(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    digitInputs.forEach((input, index) => {
      input.value = digits[index] || "";
    });
    const focusIndex = Math.min(digits.length, digitInputs.length - 1);
    digitInputs[focusIndex].focus();
  }

  openBtn.addEventListener("click", openModal);
  cancelBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  digitInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(-1);
      clearError();
      if (input.value && index < digitInputs.length - 1) {
        digitInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && index > 0) {
        digitInputs[index - 1].focus();
        digitInputs[index - 1].value = "";
      }

      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        digitInputs[index - 1].focus();
      }

      if (event.key === "ArrowRight" && index < digitInputs.length - 1) {
        event.preventDefault();
        digitInputs[index + 1].focus();
      }
    });

    input.addEventListener("paste", (event) => {
      event.preventDefault();
      fillDigits(event.clipboardData?.getData("text") || "");
      clearError();
    });

    input.addEventListener("focus", () => {
      input.select();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = getCode();
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

  setUnlocked(false);
})();
