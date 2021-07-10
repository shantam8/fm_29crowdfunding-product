let bodySection = document.querySelector("body");
let mainSection = document.querySelector("main");
let divDarkoverlay = document.querySelector("#darkOverlay");

let headerSection = document.querySelector(".headerFlexContainer");
let btnToggleMobileMenu = document.querySelector("#btnToggleMobileMenu");
let btnToggleBookmark = document.querySelector("#btnBookmarkProject");
let sectionBackingModal = document.querySelector("#modalBackingProject");
let sectionThankYouModal = document.querySelector("#modalThankYou");

// Select reward / open modal
let btnSelectRewardBambooStand = document.querySelector(
  "#btnSelectRewardBambooStand"
);
let btnSelectRewardBlackEdition = document.querySelector(
  "#btnSelectRewardBlackStand"
);
let btnSelectRewardMahogany = document.querySelector(
  "#btnSelectRewardMahogany"
);

// Submit selected reward bnt / close reward modal
let btnModalSubmitNoReward = document.querySelector("#btnModalSubmitNoReward");
let btnModalSubmitBamboo = document.querySelector("#btnModalSubmitBamboo");
let btnModalSubmitBlackEdition = document.querySelector(
  "#btnModalSubmitBlackEdition"
);
let btnModalSubmitMahogany = document.querySelector("#btnModalSubmitMahogany");

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

let totalRewardsLeftBamboo = 101;
let totalRewardsLeftBlackEdition = 64;
let totalRewardsLeftMahogany = 1;
let statusFieldsRewardsLeftBamboo =
  document.querySelectorAll(".rewardsLeftBamboo");
let statusFieldsRewardsLeftBlackEdition = document.querySelectorAll(
  ".rewardsLeftBlackEdition"
);
let statusFieldsRewardsLeftMahogany = document.querySelectorAll(
  ".rewardsLeftMahogany"
);

function toggleBookmark() {
  if (btnToggleBookmark.classList.contains("active")) {
    btnToggleBookmark.classList.remove("active");
  } else {
    btnToggleBookmark.classList.add("active");
  }
}

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

function toggleModal(selectedReward) {
  if (sectionBackingModal.classList.contains("showModal")) {
    sectionBackingModal.classList.remove("showModal");
    divDarkoverlay.classList.remove("darkoverlay");
    toggleRadioBtn("allOff");
  } else {
    sectionBackingModal.classList.add("showModal");
    divDarkoverlay.classList.add("darkoverlay");
    window.scrollTo(0, 0);
  }
}

function toggleShowThankYouModal() {
  if (sectionThankYouModal.classList.contains("showModal")) {
    sectionThankYouModal.classList.remove("showModal");
    divDarkoverlay.classList.remove("darkoverlay");
    toggleRadioBtn("allOff");
  } else {
    sectionBackingModal.classList.remove("showModal");
    sectionThankYouModal.classList.add("showModal");
    window.scrollTo(0, 0);
  }
}

function processSubmittedPledge(reward, value) {
  switch (reward) {
    case "bambooStand":
      totalRewardsLeftBamboo--;
      break;
    case "blackEdition":
      totalRewardsLeftBlackEdition--;
      break;
    case "mahogany":
      totalRewardsLeftMahogany--;
      break;
  }
  totalSumBacked = totalSumBacked + parseInt(value);
  totalNumberBackers++;
  updateBackerStates();
  updateRewardsLeft();
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

function deactivateRewardBlock(reward) {
  let cardsToDeactivate = document.querySelectorAll("." + reward);
  cardsToDeactivate.forEach((element) => {
    element.classList.add("disabled");
    element.querySelector("button").innerText = "Out of Stock";
  });
}

function updateBackerStates() {
  if (totalSumBacked <= 100000) {
    document.querySelector(".progressbarFilled").style.width =
      totalSumBacked / 1000 + "%";
  } else {
    document.querySelector(".progressbarFilled").style.width = "100%";
  }
  statusFieldMoneyBacked.innerText = "$" + totalSumBacked.toLocaleString();
  statusFieldNumberBackers.innerText = totalNumberBackers.toLocaleString();
  statusFieldNumberDaysLeft.innerText = totalNumberDaysLeft;
}

function updateRewardsLeft() {
  statusFieldsRewardsLeftBamboo.forEach((element) => {
    element.innerText = totalRewardsLeftBamboo;
  });
  statusFieldsRewardsLeftBlackEdition.forEach((element) => {
    element.innerText = totalRewardsLeftBlackEdition;
  });
  statusFieldsRewardsLeftMahogany.forEach((element) => {
    element.innerText = totalRewardsLeftMahogany;
  });

  if (totalRewardsLeftBamboo == 0) {
    deactivateRewardBlock("bambooStand");
  }
  if (totalRewardsLeftBlackEdition == 0) {
    deactivateRewardBlock("blackEdition");
  }
  if (totalRewardsLeftMahogany == 0) {
    deactivateRewardBlock("mahogany");
  }
}

function closeMobileMenuOnResize() {
  if (headerSection.classList.contains("isOpen") && screen.width >= 635) {
    mobileMenuToggle();
  }
}

function init() {
  console.log("Hi");
  updateBackerStates();
  updateRewardsLeft();
  toggleRadioBtn("allOff");

  radioBtns.forEach((element) => {
    element.addEventListener("change", () => {
      toggleRadioBtn(element);
    });
  });

  btnToggleMobileMenu.addEventListener("click", mobileMenuToggle);
  btnToggleBookmark.addEventListener("click", toggleBookmark);

  document
    .querySelector("#btnCloseModal")
    .addEventListener("click", toggleModal);
  document
    .querySelector("#btnBackProject")
    .addEventListener("click", toggleModal);
  btnSelectRewardBambooStand.addEventListener("click", () => {
    toggleModal("bambooStand");
  });
  btnSelectRewardBlackEdition.addEventListener("click", () => {
    toggleModal("blackEdition");
  });
  btnSelectRewardMahogany.addEventListener("click", () => {
    toggleModal("mahogany");
  });

  btnModalSubmitNoReward.addEventListener("click", () => {
    toggleShowThankYouModal();
    processSubmittedPledge(
      "noReward",
      document.querySelector("#sumForNoReward").value
    );
  });

  btnModalSubmitBamboo.addEventListener("click", () => {
    toggleShowThankYouModal();
    processSubmittedPledge(
      "bambooStand",
      document.querySelector("#sumForBamboo").value
    );
  });
  btnModalSubmitBlackEdition.addEventListener("click", () => {
    toggleShowThankYouModal();
    processSubmittedPledge(
      "blackEdition",
      document.querySelector("#sumForBlackEdition").value
    );
  });
  btnModalSubmitMahogany.addEventListener("click", () => {
    toggleShowThankYouModal();
    processSubmittedPledge(
      "mahogany",
      document.querySelector("#sumForMahogany").value
    );
  });

  document
    .querySelector("#btnThankYouModal")
    .addEventListener("click", toggleShowThankYouModal);

  window.addEventListener("resize", closeMobileMenuOnResize);
}

window.onload = init;
