"use strict";

// changing the source of the top image depending on the screen size

const theImage = document.querySelector(".image-side-inner");
const successElement = document.querySelector(".newsletter-card-success");
const theBody = document.querySelector("body");
const emailAdressInput = document.querySelector(".email-address-input");
const subscribeButton = document.querySelector(".subscribe-btn");
const validationMessage = document.querySelector(".validation-message");
const newsletterInitial = document.querySelector(".newsletter-card-initial");
const newsletterSuccess = document.querySelector(".newsletter-card-success");
const dismissMessageButton = document.querySelector(".dismiss-message");
const confirmationEmail = document.querySelector(".confirmation-email");

const measureWidth = function () {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 576) {
    theImage.setAttribute(
      "src",
      "../assets/images/illustration-sign-up-mobile.svg"
    );
  } else {
    theImage.setAttribute(
      "src",
      "./assets/images/illustration-sign-up-desktop.svg"
    );
  }
};

window.addEventListener("resize", measureWidth);
window.addEventListener("load", measureWidth);

// if the width of the screen is less than 768px and the "newsletter-card-success" is displayed => set the background-color of the body to white
if (
  window.innerWidth < 768 &&
  !successElement.classList.contains("display-none")
) {
  theBody.style.backgroundColor = "var(--neutral-white)";
}

// email validation

// throw error function
const throwError = function () {
  validationMessage.classList.remove("display-none");
  emailAdressInput.classList.add("error-class");
};

// display success message / return to the initial state
const toggleSuccessInitial = function () {
  newsletterInitial.classList.toggle("display-none");
  newsletterSuccess.classList.toggle("display-none");

  // clear the input
  emailAdressInput.value = "";
};

// validate email function
const validateEmail = (email) => {
  const accepted = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  const theEmailInner = emailAdressInput.value;
  if (accepted) {
    toggleSuccessInitial();
    confirmationEmail.textContent = theEmailInner;
  } else {
    throwError();
  }
};

subscribeButton.addEventListener("click", function (event) {
  // preventing the default behavior
  event.preventDefault();
  // checking if the field is left empty
  if (emailAdressInput.value === "") {
    throwError();
  } // check if the email address is formated correctly
  validateEmail(emailAdressInput.value);
});

dismissMessageButton.addEventListener("click", toggleSuccessInitial);
