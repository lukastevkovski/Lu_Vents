// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-content");
const lightboxClose = document.querySelector(".lightbox-close");
const portfolioImages = document.querySelectorAll(".portfolio-grid img");

portfolioImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

// Modal functionality
const modal = document.getElementById("callModal");
const bookCallFooter = document.getElementById("bookCallFooter");
const closeModal = document.getElementById("closeModal");
const callForm = document.getElementById("callForm");
const successMsg = document.getElementById("formSuccess");

bookCallFooter.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  successMsg.style.display = "none"; // Hide success message when closing modal
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    successMsg.style.display = "none"; // Hide success message when closing modal
  }
});

// Form submission with Formspree
if (callForm) {
  callForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitButton = callForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const formData = new FormData(callForm);

    try {
      const response = await fetch(callForm.action, {
        method: callForm.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        callForm.reset();
        successMsg.style.display = "block";
        setTimeout(() => {
          modal.style.display = "none";
          successMsg.style.display = "none";
        }, 3000);
      } else {
        alert("There was a problem submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Secure Your Call";
    }
  });
}

// Keyboard accessibility
document.querySelectorAll(".btn, .lightbox-close, .close").forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      el.click();
    }
  });
});
