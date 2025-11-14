// ===================================
// INITIALIZATION
// ===================================
document.addEventListener("DOMContentLoaded", function () {
  initAOS();
  initGSAP();
  initNavbar();
  initSmoothScroll();
  initDarkMode();
  initMobileMenu();
  initForm();
});

// ===================================
// AOS INITIALIZATION
// ===================================
function initAOS() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });
}

// ===================================
// GSAP ANIMATIONS
// ===================================
function initGSAP() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".title-line-1", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.3,
  })
    .to(
      ".title-line-2",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.4"
    )
    .to(
      ".title-line-3",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.4"
    )
    .to(
      ".hero-subtitle",
      {
        opacity: 1,
        duration: 0.8,
      },
      "-=0.2"
    )
    .to(
      ".hero-cta",
      {
        opacity: 1,
        duration: 0.8,
      },
      "-=0.4"
    );

  gsap.to(".orb-1", {
    y: "+=100",
    x: "+=50",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-2", {
    y: "-=80",
    x: "-=60",
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        const navMenu = document.getElementById("navMenu");
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===================================
// DARK MODE TOGGLE
// ===================================
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";
  if (isDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      gsap.fromTo(darkModeToggle, { rotation: 0 }, { rotation: 360, duration: 0.5, ease: "power2.out" });
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      gsap.fromTo(darkModeToggle, { rotation: 360 }, { rotation: 0, duration: 0.5, ease: "power2.out" });
    }
  });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  mobileMenuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    const icon = this.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// ===================================
// FORM SUBMISSION
// ===================================
function initForm() {
  const joinForm = document.getElementById("joinForm");
  joinForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      interest: document.getElementById("interest").value,
    };
    console.log("Form submitted:", formData);
    const successMessage = document.createElement("div");
    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #2563EB;
      color: white;
      padding: 30px 50px;
      border-radius: 16px;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      z-index: 10000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      opacity: 0;
    `;
    successMessage.innerHTML = `
      <i class="fas fa-check-circle" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
      Terima kasih telah bergabung!<br>
      <span style="font-size: 14px; font-weight: 400; margin-top: 8px; display: block;">Kami akan menghubungi Anda segera</span>
    `;
    document.body.appendChild(successMessage);
    gsap.to(successMessage, {
      opacity: 1,
      duration: 0.3,
      onComplete: function () {
        gsap.to(successMessage, {
          opacity: 0,
          duration: 0.3,
          delay: 3,
          onComplete: function () {
            successMessage.remove();
          },
        });
      },
    });
    joinForm.reset();
  });
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      transform: scale(0);
    `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: function () {
        ripple.remove();
      },
    });
  });
});
