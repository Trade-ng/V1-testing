function isMobileDevice() {
  return window.innerWidth <= 768;
}
function checkDevice() {
  const isMobile = isMobileDevice();
  const loadingScreen = document.getElementById("loadingScreen");
  const desktopBlocker = document.getElementById("desktopBlocker");
  if (isMobile) {
    loadingScreen.style.display = "flex";
    desktopBlocker.style.display = "none";
    startLogoAnimation();
  } else {
    loadingScreen.style.display = "none";
    desktopBlocker.style.display = "flex";
  }
}
function startLogoAnimation() {
  const logo = document.getElementById("logo");
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
  let currentFrame = 0;
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
      currentFrame = index;
    }, totalDelay);
    totalDelay += frame.duration;
  });
  setTimeout(() => {
    console.log("Animation complete - ready to navigate to main app");
    // Here you could redirect to the main app or trigger next screen
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
