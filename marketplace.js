// Global state
let currentViewMode = "grid";
let currentPage = "market";

// DOM Elements
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");
const vendorListings = document.getElementById("vendor-listings");

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize the application
function initializeApp() {
  setViewMode("grid");
  setActivePage("market");

  // Add event listeners
  addEventListeners();

  console.log("Marketplace app initialized");
}

// Add event listeners
function addEventListeners() {
  // View mode toggle listeners are handled by onclick attributes in HTML

  // Add click listeners to vendor cards
  const vendorCards = document.querySelectorAll(".vendor-card");
  vendorCards.forEach((card) => {
    card.addEventListener("click", function () {
      handleVendorClick(this);
    });
  });

  // Add smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// Set view mode (grid or list)
function setViewMode(mode) {
  currentViewMode = mode;

  // Update button states
  if (gridBtn && listBtn) {
    gridBtn.classList.toggle("active", mode === "grid");
    listBtn.classList.toggle("active", mode === "list");
  }

  // Update vendor listings layout
  if (vendorListings) {
    vendorListings.className = `vendor-listings ${mode}-view`;

    // Add specific styles for list view
    if (mode === "list") {
      vendorListings.style.display = "flex";
      vendorListings.style.flexDirection = "column";
      vendorListings.style.gap = "12px";
    } else {
      vendorListings.style.display = "flex";
      vendorListings.style.flexDirection = "column";
      vendorListings.style.gap = "16px";
    }
  }

  console.log(`View mode changed to: ${mode}`);
}

// Handle vendor card clicks
function handleVendorClick(card) {
  const vendorName = card.querySelector(".vendor-name").textContent;

  // Add click animation
  card.style.transform = "scale(0.98)";
  setTimeout(() => {
    card.style.transform = "scale(1)";
  }, 150);

  // Show vendor details (placeholder functionality)
  showVendorDetails(vendorName);
}

// Show vendor details (placeholder)
function showVendorDetails(vendorName) {
  alert(`Opening ${vendorName} details page...`);
  // In a real app, this would navigate to a vendor detail page
}

// Navigation functions

// Unified navigation click handler for bottom nav
function handleBottomNavClick(e) {
  e.preventDefault();
  const page = this.getAttribute("data-page");
  if (!page) return;
  setActivePage(page);
  switch (page) {
    case "home":
      window.location.href = "index.html";
      break;
    case "market":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "live":
      showPlaceholderPage("Live", "Live streaming content coming soon");
      break;
    case "chat":
      showPlaceholderPage("Chat", "Messages and chat functionality");
      break;
    case "profile":
      showPlaceholderPage("Profile", "User profile and settings");
      break;
    default:
      console.warn(`Unknown page: ${page}`);
  }
}

// Attach nav click listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".bottom-nav .nav-item").forEach((item) => {
    item.addEventListener("click", handleBottomNavClick);
  });
});

// Set active page in navigation
function setActivePage(page) {
  currentPage = page;

  // Update navigation active states
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Find and activate the correct nav item
  const activeNavItem = Array.from(navItems).find((item) => {
    const onclick = item.getAttribute("onclick");
    return onclick && onclick.includes(`'${page}'`);
  });

  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
}

// Show placeholder page (for navigation demo)
function showPlaceholderPage(title, message) {
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    const originalContent = mainContent.innerHTML;

    mainContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; padding: 32px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px; color: #d1d5db;">📱</div>
                <h2 style="font-size: 24px; font-weight: 600; color: #374151; margin-bottom: 8px;">${title}</h2>
                <p style="color: #6b7280; margin-bottom: 24px;">${message}</p>
                <button onclick="restoreMarketPage()" style="background: #16a34a; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: background 0.2s;">
                    Back to Market
                </button>
            </div>
        `;

    // Store original content for restoration
    window.originalMarketContent = originalContent;
  }
}

// Restore market page content
function restoreMarketPage() {
  const mainContent = document.querySelector(".main-content");
  if (mainContent && window.originalMarketContent) {
    mainContent.innerHTML = window.originalMarketContent;
    setActivePage("market");

    // Re-initialize event listeners for restored content
    addEventListeners();
  }
}

// Go back function (for header back button)
function goBack() {
  // If on a placeholder page, go back to market
  if (currentPage !== "market") {
    restoreMarketPage();
  } else {
    // In a real app, this would use browser history
    alert("Going back...");
  }
}

// Filter functionality (placeholder)
function showFilterModal() {
  alert(
    "Filter options:\n- Price range\n- Rating\n- Distance\n- Category\n\nFilter functionality coming soon!"
  );
}

// Search functionality (placeholder)
function performSearch(query) {
  console.log(`Searching for: ${query}`);
  // In a real app, this would filter vendor listings
  alert(`Searching for "${query}"...`);
}

// Utility functions
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

// Add smooth scroll behavior for mobile
function smoothScrollTo(targetPosition, duration = 300) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function
    const ease = progress * (2 - progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Handle online/offline status
window.addEventListener("online", function () {
  console.log("App is online");
  document.body.classList.remove("offline");
});

window.addEventListener("offline", function () {
  console.log("App is offline");
  document.body.classList.add("offline");
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", lazyLoadImages);
}

// Export functions for global access (if needed)
window.marketplaceApp = {
  setViewMode,
  navigateTo,
  goBack,
  showFilterModal,
  performSearch,
};

console.log("Marketplace JavaScript loaded successfully");
