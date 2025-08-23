function isMobileDevice() {
  return window.innerWidth <= 768;
}
function checkDevice() {
  const isMobile = isMobileDevice();
  const loadingScreen = document.getElementById("loadingScreen");
  const desktopBlocker = document.getElementById("desktopBlocker");
  const app = document.getElementById("app");
  if (isMobile) {
    loadingScreen.style.display = "flex";
    desktopBlocker.style.display = "none";
    app.style.display = "none";
    startLogoAnimation();
  } else {
    loadingScreen.style.display = "none";
    desktopBlocker.style.display = "flex";
    app.style.display = "none";
  }
}
function startLogoAnimation() {
  const logo = document.querySelector("#loadingScreen #logo");
  const brandText = document.getElementById("brandText");
  const frames = [
    { duration: 800, size: 0 },
    { duration: 600, size: 41 },
    { duration: 500, size: 59 },
    { duration: 500, size: 77 },
    { duration: 500, size: 90 },
    { duration: 500, size: 110 },
    { duration: 500, size: 130 },
    { duration: 500, size: 160 },
    { duration: 1000, size: 180 },
  ];
  let totalDelay = 0;
  frames.forEach((frame, index) => {
    setTimeout(() => {
      if (frame.size === 0) {
        logo.style.opacity = "0";
        logo.style.width = "0px";
        logo.style.height = "0px";
      } else {
        logo.style.opacity = "1";
        logo.style.width = frame.size + "px";
        logo.style.height = Math.round(frame.size * 1.02) + "px";
        logo.classList.add("visible");
      }
      if (index >= 7) {
        brandText.classList.add("visible");
      }
    }, totalDelay);
    totalDelay += frame.duration;
  });
  setTimeout(() => {
    // Hide loading, show advertise section
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("app").style.display = "block";
    updateScreen();
  }, totalDelay);
}
document.addEventListener("DOMContentLoaded", function () {
  checkDevice();
});
window.addEventListener("resize", function () {
  checkDevice();
});
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);

// --- script.js ---
const onboardingScreens = [
  {
    id: 1,
    backgroundImage: "images/2.png",
    title: "Connect with Trusted Sellers",
    subtitle:
      "Connect with verified sellers from real markets across Nigeria. Buy, sell, and discover products from trusted vendors.",
    logo: {
      src: "images/1.png",
      className: "logo-1",
    },
  },
  {
    id: 2,
    backgroundImage: "images/3.png",
    title: "Message Sellers. Make Offers",
    subtitle: "Chat directly with sellers to negotiate prices",
    logo: {
      src: "images/1.5.png",
      className: "logo-2",
    },
  },
  {
    id: 3,
    backgroundImage: "images/4.png",
    title: "Join the Live Shopping Experience",
    subtitle: "Watch live streams from your favorite shops",
    logo: {
      src: "images/1.5.png",
      className: "logo-3",
    },
  },
];
let currentScreen = 0;
function updateScreen() {
  const backgroundImage = document.getElementById("background-image");
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const logo = document.querySelector("#app #logo");
  const paginationDots = document.getElementById("pagination-dots");
  const nextButton = document.getElementById("next-button");
  const skipButton = document.getElementById("skip-button");
  const screenData = onboardingScreens[currentScreen];
  backgroundImage.style.backgroundImage = `url(${screenData.backgroundImage})`;
  title.textContent = screenData.title;
  subtitle.textContent = screenData.subtitle;
  if (screenData.logo) {
    logo.src = screenData.logo.src;
    logo.className = screenData.logo.className;
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }
  // Update pagination dots
  paginationDots.innerHTML = "";
  onboardingScreens.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "w-2.5 h-2.5 rounded-full transition-all duration-300";
    if (index === currentScreen) {
      dot.classList.add("bg-white");
    } else {
      dot.classList.add("bg-white", "bg-opacity-50");
    }
    paginationDots.appendChild(dot);
  });
  const isLast = currentScreen === onboardingScreens.length - 1;
  nextButton.textContent = isLast ? "Get Started" : "Next";
}
function handleNext() {
  if (currentScreen < onboardingScreens.length - 1) {
    currentScreen++;
    updateScreen();
  } else {
    // Go to sign up page
    window.location.href = "signup.html";
  }
}
function handleSkip() {
  // Go to sign up page
  window.location.href = "signup.html";
}
// Attach event listeners after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next-button");
  const skipButton = document.getElementById("skip-button");
  if (nextButton) nextButton.addEventListener("click", handleNext);
  if (skipButton) skipButton.addEventListener("click", handleSkip);
});
