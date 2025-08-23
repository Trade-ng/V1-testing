// Device Detection Functions
function isMobileDevice() {
  return window.innerWidth <= 768;
}

function checkDevice() {
  const isMobile = isMobileDevice();
  const desktopBlocker = document.getElementById("desktopBlocker");
  const app = document.querySelector(".app");

  if (isMobile) {
    // On mobile, hide desktop blocker and show app
    desktopBlocker.style.display = "none";
    app.style.display = "block";

    // Show loading screen briefly then fade it out
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "flex";

    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1500);
  } else {
    // On desktop, show blocker and hide app
    desktopBlocker.style.display = "flex";
    app.style.display = "none";
  }
}
// State management
let currentPage = "home";
let darkMode = false;

// Page navigation
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));

  // Show target page
  const targetPage = document.getElementById(page + "Page");
  if (targetPage) {
    targetPage.classList.remove("hidden");
  }

  // Update navigation state
  updateNavigation(page);
  updateHeader(page);

  currentPage = page;

  // Show/hide FAB based on page (only show on shop page now)
  const fab = document.getElementById("fab");
  if (page === "shop") {
    fab.style.display = "flex";
  } else {
    fab.style.display = "none";
  }
}

function updateNavigation(activePage) {
  // Update bottom navigation active state
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("data-page") === activePage) {
      item.classList.add("active");
    }
  });
}

function updateHeader(page) {
  const backButton = document.getElementById("backButton");
  const brandContainer = document.getElementById("brandContainer");
  const pageTitle = document.getElementById("pageTitle");
  const headerActions = document.getElementById("headerActions");

  // Reset header
  backButton.classList.add("hidden");
  brandContainer.style.display = "block";
  pageTitle.classList.add("hidden");

  // Configure header based on page
  const pageTitles = {
    promotions: "Promotions & Ads",
    settings: "Store Settings & Profile",
    chat: "Chat",
    live: "Live",
    market: "Market",
    shop: "Shop",
    reviews: "Reviews & Ratings",
  };

  if (pageTitles[page]) {
    backButton.classList.remove("hidden");
    brandContainer.style.display = "none";
    pageTitle.classList.remove("hidden");
    pageTitle.textContent = pageTitles[page];
  }
}

// Back button functionality
document.getElementById("backButton").addEventListener("click", () => {
  navigateTo("home");
});

// Dark mode toggle
if (document.getElementById("darkModeToggle")) {
  document.getElementById("darkModeToggle").addEventListener("click", () => {
    darkMode = !darkMode;
    updateDarkModeToggle();
  });
}

function updateDarkModeToggle() {
  const toggleIcon = document.getElementById("toggleIcon");
  if (!toggleIcon) return;

  if (darkMode) {
    toggleIcon.innerHTML = `
                    <path d="M17 15C18.6569 15 20 13.6569 20 12C20 10.3431 18.6569 9 17 9C15.3431 9 14 10.3431 14 12C14 13.6569 15.3431 15 17 15Z" fill="black"/>
                    <path d="M12 7H17C19.76 7 22 9.24 22 12C22 14.76 19.76 17 17 17H7C4.24 17 2 14.76 2 12C2 9.24 4.24 7 7 7H12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                `;
  } else {
    toggleIcon.innerHTML = `
                    <path d="M7 15C8.65685 15 10 13.6569 10 12C10 10.3431 8.65685 9 7 9C5.34315 9 4 10.3431 4 12C4 13.6569 5.34315 15 7 15Z" fill="black"/>
                    <path d="M12 7H17C19.76 7 22 9.24 22 12C22 14.76 19.76 17 17 17H7C4.24 17 2 14.76 2 12C2 9.24 4.24 7 7 7H12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                `;
  }
}

// Tab switching for promotions page
function initializeTabSwitching() {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all tabs
      tabButtons.forEach((tab) => {
        tab.classList.remove("active");
        tab.classList.add("inactive");
      });

      // Add active class to clicked tab
      button.classList.remove("inactive");
      button.classList.add("active");
    });
  });
}

// Initialize the application
function init() {
  // Set initial page
  navigateTo("home");

  // Initialize tab switching
  initializeTabSwitching();

  // Handle navigation clicks
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const page = item.getAttribute("data-page");
      if (page) {
        navigateTo(page);
      }
    });
  });
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  checkDevice();
  init();
});

// Check device on window resize
window.addEventListener("resize", checkDevice);
