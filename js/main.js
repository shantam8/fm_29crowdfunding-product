let bodySection = document.querySelector("body");
let mainSection = document.querySelector("main");
let divDarkoverlay = document.querySelector("#darkOverlay");

let headerSection = document.querySelector("header");
let btnToggleMobileMenu = document.querySelector("#btnToggleMobileMenu");
let sectionBackingModal = document.querySelector("#modalBackingProject");

let btnSubmitBamboo = document.querySelector("#btnSubmitBamboo");
let btnSubmitBlackEdition = document.querySelector("#btnSubmitBlackEdition");
let btnSubmitMahogany = document.querySelector("#btnSubmitMahogany");

let radioBtnBambooReward = document.querySelector("#radioBtnBambooReward");
let radioBtnBlackEditionReward = document.querySelector(
  "#radioBtnBlackEditionReward"
);
let radioBtnMahoganyReward = document.querySelector("#radioBtnMahoganyReward");

let radioBtns = document.querySelectorAll('input[name="selectReward"]');

let totalSumBacked = 89914;
let totalNumberBackers = 5007;
let totalNumberDaysLeft = 56;

let statusFieldMoneyBacked = document.querySelector("#statsMoney");
let statusFieldNumberBackers = document.querySelector("#statsBackers");
let statusFieldNumberDaysLeft = document.querySelector("#statsDays");




function mobileMenuToggle() {
  if (headerSection.classList.contains("isOpen")) {
    divDarkoverlay.classList.remove("darkoverlay");
    bodySection.classList.remove("overflowHidden");
    headerSection.classList.remove("isOpen");
    btnToggleMobileMenu.src = "../images/icon-hamburger.svg";
    btnToggleMobileMenu.alt = "open menu";
  } else {
    divDarkoverlay.classList.add("darkoverlay");
    bodySection.classList.add("overflowHidden");
    headerSection.classList.add("isOpen");
    btnToggleMobileMenu.src = "../images/icon-close-menu.svg";
    btnToggleMobileMenu.alt = "close menu";
  }
}

function deactivateRewardBlock(reward) {
  let cardsToDeactivate = document.querySelectorAll("." + reward);
  cardsToDeactivate.forEach((element) => {
    element.classList.add("disabled");
  });
}

function toggleModal(selectedReward) {
  if (sectionBackingModal.classList.contains("showModal")) {
    sectionBackingModal.classList.remove("showModal");
    divDarkoverlay.classList.remove("darkoverlay");
    toggleRadioBtn("allOff");
  } else {
    sectionBackingModal.classList.add("showModal");
    divDarkoverlay.classList.add("darkoverlay");
  }
}

function toggleRadioBtn(selectedRadioBtn) {
  radioBtns.forEach((element) => {
    if (selectedRadioBtn.id == element.id) {
      element.parentNode.parentNode.classList.add("cardActivated");
    } else {
      element.parentNode.parentNode.classList.remove("cardActivated");
      element.checked = false;
    }
  });
}

function updateBackerStates() {

  statusFieldMoneyBacked.innerText = "$"+(totalSumBacked.toLocaleString());
statusFieldNumberBackers.innerText = totalNumberBackers.toLocaleString();
statusFieldNumberDaysLeft.innerText = totalNumberDaysLeft;

}

function init() {
  console.log("Hi");
  updateBackerStates();

  radioBtns.forEach((element) => {
    element.addEventListener("change", () => {
      toggleRadioBtn(element);
    });
  });

  btnToggleMobileMenu.addEventListener("click", mobileMenuToggle);

  document
    .querySelector("#btnCloseModal")
    .addEventListener("click", toggleModal);

  document
    .querySelector("#btnBackProject")
    .addEventListener("click", toggleModal);

  document
    .querySelector("#btnRewardBambooStand")
    .addEventListener("click", () => {
      toggleModal("bambooStand");
    });

  document
    .querySelector("#btnRewardBlackStand")
    .addEventListener("click", () => {
      toggleModal("blackEdition");
    });
  document.querySelector("#btnRewardMahogany").addEventListener("click", () => {
    toggleModal("mahogany");
  });
  toggleRadioBtn("allOff");
  //deactivateRewardBlock("mahogany");
}

window.onload = init;
