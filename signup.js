document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = document.getElementById("full-name").value;
      const emailPhone = document.getElementById("email-phone").value;
      console.log({ fullName, emailPhone });
      window.location.href = "market.html";
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailPhone = document.getElementById("email-phone").value;
      console.log({ emailPhone });
      window.location.href = "market.html";
    });
  }

  const verificationForm = document.getElementById("verification-form");
  if (verificationForm) {
    verificationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const verificationCode =
        document.getElementById("verification-code").value;
      console.log({ verificationCode });
    });
  }

  const resendButton = document.getElementById("resend-button");
  if (resendButton) {
    resendButton.addEventListener("click", () => {
      console.log("Resend code clicked");
    });
  }

  const sellerForm = document.getElementById("seller-form");
  if (sellerForm) {
    sellerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = document.getElementById("full-name").value;
      const businessName = document.getElementById("business-name").value;
      const emailPhone = document.getElementById("email-phone").value;
      console.log({ fullName, businessName, emailPhone });
    });
  }

  const personalIdUpload = document.getElementById("personal-id-upload");
  if (personalIdUpload) {
    personalIdUpload.addEventListener("click", () => {
      console.log("Personal ID upload clicked");
    });
  }

  const businessLocationUpload = document.getElementById(
    "business-location-upload"
  );
  if (businessLocationUpload) {
    businessLocationUpload.addEventListener("click", () => {
      console.log("Business location upload clicked");
    });
  }
});