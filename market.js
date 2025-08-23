// TradeNG Marketplace JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  setupSearchFunctionality();
  setupNavigationFunctionality();
  setupImageLoading();
  setupScrollBehavior();
  setupInteractiveElements();
  loadDynamicContent();
}

// Search Functionality
function setupSearchFunctionality() {
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");

  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.parentElement.style.boxShadow = "0 0 0 2px #15803D";
    });

    searchInput.addEventListener("blur", function () {
      this.parentElement.style.boxShadow = "none";
    });

    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      filterContent(query);
    });

    // Search icon click
    if (searchIcon) {
      searchIcon.addEventListener("click", function () {
        const query = searchInput.value.trim();
        if (query) {
          performSearch(query);
        }
      });
    }

    // Enter key search
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = this.value.trim();
        if (query) {
          performSearch(query);
        }
      }
    });
  }
}

function filterContent(query) {
  const marketCards = document.querySelectorAll(".market-card");
  const shopCards = document.querySelectorAll(".shop-card");

  // Filter markets
  marketCards.forEach((card) => {
    const title =
      card.querySelector(".market-title")?.textContent.toLowerCase() || "";
    const location =
      card.querySelector(".market-location span")?.textContent.toLowerCase() ||
      "";

    if (title.includes(query) || location.includes(query)) {
      card.style.display = "flex";
    } else {
      card.style.display = query ? "none" : "flex";
    }
  });

  // Filter shops
  shopCards.forEach((card) => {
    const name =
      card.querySelector(".shop-name")?.textContent.toLowerCase() || "";
    const location =
      card.querySelector(".location span")?.textContent.toLowerCase() || "";
    const description =
      card.querySelector(".shop-description")?.textContent.toLowerCase() || "";

    if (
      name.includes(query) ||
      location.includes(query) ||
      description.includes(query)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = query ? "none" : "block";
    }
  });
}

function performSearch(query) {
  console.log("Searching for:", query);
  // Here you would typically make an API call to search for results
  // For demo purposes, we'll just filter existing content
  filterContent(query.toLowerCase());

  // Show search feedback
  showToast(`Searching for "${query}"...`);
}

// Navigation Functionality

function setupNavigationFunctionality() {
  const navItems = document.querySelectorAll(".nav-item");
  const deliveryButton = document.querySelector(".delivery-button");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove active class from all items
      navItems.forEach((nav) => nav.classList.remove("active"));
      // Add active class to clicked item
      this.classList.add("active");
      // Get the navigation type
      const navType = this.getAttribute("data-page") || 
                     this.querySelector("span")?.textContent.toLowerCase();
      
      // Handle navigation based on type
      switch (navType) {
        case "home":
          window.location.href = "index.html";
          break;
        case "market":
          // Stay on current page if already on market
          if (!window.location.pathname.includes("market.html")) {
            window.location.href = "market.html";
          } else {
            scrollToSection(".markets-grid");
          }
          break;
        case "live":
          // Navigate to subMarket.html with live page
          window.location.href = "subMarket.html#live";
          break;
        case "chat":
          // Navigate to subMarket.html with chat page
          window.location.href = "subMarket.html#chat";
          break;
        case "profile":
          // Navigate to subMarket.html with profile page
          window.location.href = "subMarket.html#profile";
          break;
        default:
          showToast("Unknown navigation");
      }
    });
  });


  if (deliveryButton) {
    deliveryButton.addEventListener("click", function () {
      showToast("Opening delivery tracking...");
      // Here you would navigate to delivery page
    });
  }

  // View All buttons
  const viewAllButtons = document.querySelectorAll(".view-all");
  viewAllButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".section");
      const sectionTitle = section.querySelector(".section-title")?.textContent;
      showToast(`Viewing all ${sectionTitle}...`);
      // Here you would navigate to the full section page
    });
  });
}

function navigateToSection(section) {
  console.log("Navigating to:", section);

  switch (section) {
    case "home":
      scrollToTop();
      break;
    case "market":
      scrollToSection(".markets-grid");
      break;
    case "live":
      scrollToLiveSection();
      break;
    case "chat":
      showToast("Opening chat...");
      break;
    case "profile":
      showToast("Opening profile...");
      break;
    default:
      console.log("Unknown navigation:", section);
  }
}

// Image Loading with Error Handling
function setupImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.addEventListener("error", function () {
      this.style.opacity = "0.5";
      this.alt = "Image failed to load";
      console.warn("Failed to load image:", this.src);
    });

    // Add loading placeholder
    if (!img.complete) {
      img.style.opacity = "0.3";
    }
  });
}

// Scroll Behavior
function setupScrollBehavior() {
  let lastScrollTop = 0;
  const header = document.querySelector(".header");
  const bottomNav = document.querySelector(".bottom-nav");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      if (header) {
        header.style.transform = "translateY(-100%)";
        header.style.transition = "transform 0.3s ease";
      }
    } else {
      // Scrolling up
      if (header) {
        header.style.transform = "translateY(0)";
      }
    }

    lastScrollTop = scrollTop;
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function scrollToLiveSection() {
  const liveSection = document.querySelector(".section:has(.live-header)");
  if (liveSection) {
    liveSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Interactive Elements
function setupInteractiveElements() {
  // Market card clicks
  const marketCards = document.querySelectorAll(".market-card");
  marketCards.forEach((card) => {
    card.addEventListener("click", function () {
      const marketName = this.querySelector(".market-title")?.textContent;
      showToast(`Opening ${marketName}...`);
      // Here you would navigate to the market page
    });
  });

  // Shop card clicks
  const shopCards = document.querySelectorAll(".shop-card");
  shopCards.forEach((card) => {
    card.addEventListener("click", function () {
      const shopName = this.querySelector(".shop-name")?.textContent;
      showToast(`Opening ${shopName}...`);
      // Here you would navigate to the shop page
    });
  });

  // Live badges
  const liveBadges = document.querySelectorAll(".live-badge");
  liveBadges.forEach((badge) => {
    badge.addEventListener("click", function (e) {
      e.stopPropagation();
      showToast("Joining live stream...");
    });
  });

  // Rating clicks
  const ratings = document.querySelectorAll(".rating");
  ratings.forEach((rating) => {
    rating.addEventListener("click", function (e) {
      e.stopPropagation();
      const ratingValue = this.querySelector("span")?.textContent;
      showToast(`Rating: ${ratingValue} stars`);
    });
  });
}

// Dynamic Content Loading
function loadDynamicContent() {
  // Simulate loading live data
  updateLiveIndicators();
  updateRatings();

  // Set up periodic updates
  setInterval(updateLiveIndicators, 30000); // Update every 30 seconds
}

function updateLiveIndicators() {
  const liveIndicators = document.querySelectorAll(
    ".live-indicator, .live-dot"
  );
  liveIndicators.forEach((indicator) => {
    indicator.style.animation = "pulse 2s infinite";
  });
}

function updateRatings() {
  const ratings = document.querySelectorAll(".rating span");
  ratings.forEach((rating) => {
    // Simulate slight rating fluctuations
    const currentRating = parseFloat(rating.textContent);
    const fluctuation = (Math.random() - 0.5) * 0.1;
    const newRating = Math.max(1, Math.min(5, currentRating + fluctuation));
    rating.textContent = newRating.toFixed(1);
  });
}

// Utility Functions
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 1000;
        animation: slideInDown 0.3s ease;
    `;

  document.body.appendChild(toast);

  // Remove toast after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "slideOutUp 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes slideInDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideOutUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
    
    .market-card, .shop-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
    }
    
    .market-card:hover, .shop-card:hover {
        transform: translateY(-2px);
    }
    
    .shop-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .nav-item {
        cursor: pointer;
        transition: color 0.2s ease;
    }
    
    .delivery-button {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .delivery-button:hover {
        transform: scale(1.05);
        background-color: #0f5a2b;
    }
`;
document.head.appendChild(style);

// Error Handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  showToast("Something went wrong. Please try again.");
});

// Performance Monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log("Page load time:", loadTime + "ms");
  });
}

// Export functions for potential testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    filterContent,
    performSearch,
    navigateToSection,
    showToast,
    debounce,
  };
}
