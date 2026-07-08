(function initCopyEmail() {
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    const email = button.dataset.copyEmail;
    const hint = button.querySelector("[data-copy-hint]");
    if (!email) return;

    const defaultHint = hint?.textContent?.trim() || "Click to copy";
    let resetTimer = null;

    function setHint(message) {
      if (!hint) return;
      hint.textContent = message;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        hint.textContent = defaultHint;
      }, 2200);
    }

    button.addEventListener("click", async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const input = document.createElement("textarea");
          input.value = email;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.left = "-9999px";
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }
        setHint("Copied to clipboard");
        button.classList.add("is-copied");
        window.setTimeout(() => button.classList.remove("is-copied"), 2200);
      } catch {
        setHint("Press to select, then copy");
      }
    });
  });
})();
