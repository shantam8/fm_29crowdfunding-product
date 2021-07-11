//variables
let totalSumBacked = 49914;
let totalNumberBackers = 5007;
let totalNumberDaysLeft = 56;
let totalRewardsLeftBamboo = 101;
let totalRewardsLeftBlackEdition = 2; //64
let totalRewardsLeftMahogany = 1;

//status fields
let statusFieldMoneyBacked = document.querySelector("#statsMoney");
let statusFieldNumberBackers = document.querySelector("#statsBackers");
let statusFieldNumberDaysLeft = document.querySelector("#statsDays");
let statusFieldsRewardsLeftBamboo =
  document.querySelectorAll(".rewardsLeftBamboo");
let statusFieldsRewardsLeftBlackEdition = document.querySelectorAll(
  ".rewardsLeftBlackEdition"
);
let statusFieldsRewardsLeftMahogany = document.querySelectorAll(
  ".rewardsLeftMahogany"
);

//sections
let bodySection = document.querySelector("body");
let mainSection = document.querySelector("main");
let headerSection = document.querySelector(".headerFlexContainer");
let sectionBackingModal = document.querySelector("#modalBackingProject");
let sectionThankYouModal = document.querySelector("#modalThankYou");

//buttons
let btnToggleMobileMenu = document.querySelector("#btnToggleMobileMenu");
let btnToggleBookmark = document.querySelector("#btnBookmarkProject");
let btnBackThisProject = document.querySelector("#btnBackProject");

//buttons Select reward / open modal
let btnSelectRewardBambooStand = document.querySelector(
  "#btnSelectRewardBambooStand"
);
let btnSelectRewardBlackEdition = document.querySelector(
  "#btnSelectRewardBlackStand"
);
let btnSelectRewardMahogany = document.querySelector(
  "#btnSelectRewardMahogany"
);

//buttons Submit selected reward / close reward modal
let btnModalSubmitNoReward = document.querySelector("#btnModalSubmitNoReward");
let btnModalSubmitBamboo = document.querySelector("#btnModalSubmitBamboo");
let btnModalSubmitBlackEdition = document.querySelector(
  "#btnModalSubmitBlackEdition"
);
let btnModalSubmitMahogany = document.querySelector("#btnModalSubmitMahogany");

//radiobutton
let radioBtnNoReward = document.querySelector("#radioBtnNoReward");
let radioBtnBambooReward = document.querySelector("#radioBtnBambooReward");
let radioBtnBlackEditionReward = document.querySelector(
  "#radioBtnBlackEditionReward"
);
let radioBtnMahoganyReward = document.querySelector("#radioBtnMahoganyReward");
let radioBtns = document.querySelectorAll('input[name="selectReward"]');

//misc
let divDarkoverlay = document.querySelector("#darkOverlay");

function toggleBookmark() {
  if (btnToggleBookmark.classList.contains("active")) {
    btnToggleBookmark.classList.remove("active");
    btnBookmarkProject.setAttribute("aria-label", "bookmark this page");
  } else {
    btnToggleBookmark.classList.add("active");
    btnBookmarkProject.setAttribute(
      "aria-label",
      "page bookmarked, remove bookmark"
    );
  }
}

function mobileMenuToggle() {
  if (headerSection.classList.contains("isOpen")) {
    divDarkoverlay.classList.remove("darkoverlay");
    bodySection.classList.remove("overflowHidden");
    headerSection.classList.remove("isOpen");
    document.querySelector("#btnImgToggleMobileMenu").src =
      "./images/icon-hamburger.svg";
    btnToggleMobileMenu.setAttribute("aria-label", "open menu");
  } else {
    divDarkoverlay.classList.add("darkoverlay");
    bodySection.classList.add("overflowHidden");
    headerSection.classList.add("isOpen");
    document.querySelector("#btnImgToggleMobileMenu").src =
      "./images/icon-close-menu.svg";
    btnToggleMobileMenu.setAttribute("aria-label", "close menu");
  }
  toggleFirstLayerTabIndex();
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

    switch (selectedReward) {
      case "bambooStand":
        radioBtnBambooReward.focus();
        window.scrollTo(0, 150);
        break;
      case "blackEdition":
        radioBtnBlackEditionReward.focus();
        window.scrollTo(0, 200);
        break;
      case "mahogany":
        radioBtnMahoganyReward.focus();
        window.scrollTo(0, 250);
        break;
      default:
        radioBtnNoReward.focus();
        break;
    }
  }
  toggleOpenModalTabIndexes();
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
    document.querySelector("#btnThankYouModal").focus();
  }
  toggleThankYouModalTabIndexes();
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
    if (element.querySelector("input[type=radio]")) {
      element.querySelector("input").disabled = true;
    }
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

function toggleFirstLayerTabIndex() {
  if (headerSection.classList.contains("isOpen")) {
    btnSelectRewardBambooStand.tabIndex = -1;
    btnSelectRewardBlackEdition.tabIndex = -1;
    btnSelectRewardMahogany.tabIndex = -1;
    btnToggleBookmark.tabIndex = -1;
    btnBackThisProject.tabIndex = -1;
  } else {
    btnSelectRewardBambooStand.tabIndex = 0;
    btnSelectRewardBlackEdition.tabIndex = 0;
    btnSelectRewardMahogany.tabIndex = 0;
    btnToggleBookmark.tabIndex = 0;
    btnBackThisProject.tabIndex = 0;
  }
}

function toggleOpenModalTabIndexes() {
  if (sectionBackingModal.classList.contains("showModal")) {
    btnSelectRewardBambooStand.tabIndex = -1;
    btnSelectRewardBlackEdition.tabIndex = -1;
    btnSelectRewardMahogany.tabIndex = -1;
    btnToggleBookmark.tabIndex = -1;
    btnBackThisProject.tabIndex = -1;
    document.querySelector("#aLinkAbout").tabIndex = -1;
    document.querySelector("#aLinkDiscover").tabIndex = -1;
    document.querySelector("#aLinkGetStarted").tabIndex = -1;
  }
}

function toggleThankYouModalTabIndexes() {
  if (sectionThankYouModal.classList.contains("showModal")) {
  } else {
    btnSelectRewardBambooStand.tabIndex =
      btnSelectRewardBambooStand.innerText == "Out of Stock" ? -1 : 0;
    btnSelectRewardBlackEdition.tabIndex =
      btnSelectRewardBlackEdition.innerText == "Out of Stock" ? -1 : 0;
    btnSelectRewardMahogany.tabIndex =
      btnSelectRewardMahogany.innerText == "Out of Stock" ? -1 : 0;

    btnToggleBookmark.tabIndex = 0;
    btnBackThisProject.tabIndex = 0;
    document.querySelector("#aLinkAbout").tabIndex = 0;
    document.querySelector("#aLinkDiscover").tabIndex = 0;
    document.querySelector("#aLinkGetStarted").tabIndex = 0;
    document.querySelector("#aLinkAbout").focus();
  }
}

function init() {
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
  btnBackThisProject.addEventListener("click", toggleModal);
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
