/* =========================================================
   ABERNO — umumiy skript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // --- Tema (yorug' / qorong'u) ---
  // Boshlang'ich tema <head> ichidagi skriptda o'rnatiladi (sahifa yuklanganda miltillamasligi uchun)
  const root = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (darkQuery.matches ? "dark" : "light");

  const syncToggles = () => {
    const isDark = currentTheme() === "dark";
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("aria-label", isDark ? "Yorug‘ rejimga o‘tish" : "Qorong‘u rejimga o‘tish");
      btn.title = btn.getAttribute("aria-label");
    });
  };

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* saqlab bo'lmasa ham tema almashadi */ }
      syncToggles();
    });
  });
  darkQuery.addEventListener("change", syncToggles);
  syncToggles();

  // --- Mobil menyu ---
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    const setOpen = (open) => {
      burger.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };

    burger.addEventListener("click", () => {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) setOpen(false); });
  }

  // --- Header soyasi ---
  const header = document.querySelector(".header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Scroll paytida paydo bo'lish ---
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // --- Raqamlar hisoblagichi ---
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => co.observe(el));
  }

  // --- Footer yili ---
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  // --- Kontakt formasi ---
  const form = document.getElementById("contact-form");
  if (form) {
    const rules = {
      name: (v) => v.trim().length >= 2 || "Ismingizni kiriting",
      phone: (v) => /^[+\d][\d\s()-]{8,}$/.test(v.trim()) || "Telefon raqamini to‘g‘ri kiriting",
      topic: (v) => v !== "" || "Murojaat mavzusini tanlang",
      message: (v) => v.trim().length >= 10 || "Xabar kamida 10 ta belgidan iborat bo‘lsin",
    };

    const validateField = (name) => {
      const input = form.elements[name];
      const field = input.closest(".field");
      const result = rules[name](input.value);
      const ok = result === true;
      field.classList.toggle("is-invalid", !ok);
      field.querySelector(".field__error").textContent = ok ? "" : result;
      return ok;
    };

    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener("blur", () => validateField(name));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const allOk = Object.keys(rules).map(validateField).every(Boolean);
      const note = document.getElementById("form-note");
      if (!allOk) {
        note.classList.remove("is-visible");
        return;
      }
      // TODO: backend yoki Telegram bot ulanganda so'rovni shu yerdan yuborish kerak
      note.classList.add("is-visible");
      form.reset();
    });
  }
});
