// ============ LOADER ============
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 600);
});

// ============ STICKY NAVBAR ============
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (window.scrollY > 700) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============ MOBILE MENU ============
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
// Close menu on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// ============ DARK / LIGHT THEME TOGGLE ============
const themeToggles = document.querySelectorAll(".theme-toggle-btn");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = theme === "dark" ? "fa-sun" : "fa-moon";
  themeToggles.forEach((btn) => {
    btn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  });
}

// Check saved preference
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
});

// ============ LIGHTBOX GALLERY ============
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("data-src");
    lightboxImg.src = src;
    lightbox.classList.add("active");
  });
});
closeLightbox.addEventListener("click", () =>
  lightbox.classList.remove("active"),
);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

// ============ TESTIMONIAL CAROUSEL ============
const track = document.getElementById("testimonial-track");
const prevBtn = document.getElementById("prev-testimonial");
const nextBtn = document.getElementById("next-testimonial");
let index = 0;
const cardWidth = 340; // approximate card width + gap

function updateCarousel() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}
nextBtn.addEventListener("click", () => {
  const maxIndex = track.children.length - 1;
  if (index < maxIndex) {
    index++;
    updateCarousel();
  }
});
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// ============ FAQ ACCORDION ============
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains("active");
    // Close all
    document
      .querySelectorAll(".faq-item")
      .forEach((faq) => faq.classList.remove("active"));
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// ============ SCROLL REVEAL ANIMATIONS ============
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => revealObserver.observe(el));
