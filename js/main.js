let bodySection = document.querySelector("body");
let mainSection = document.querySelector("main");
let divDarkoverlay = document.querySelector("#darkOverlay");

let headerSection = document.querySelector("header");
let btnToggleMobileMenu = document.querySelector("#btnToggleMobileMenu");

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

function deactivateRewardBlock(reward){

    document.querySelector("."+reward).classList.add("disabled");

}

function selectReward(reward){
    console.log(reward);
}

function init() {
  console.log("Hi");

  btnToggleMobileMenu.addEventListener("click", mobileMenuToggle);

  document
    .querySelector("#btnRewardBambooStand")
    .addEventListener("click", () => {
      selectReward("bambooStand");
    });

  document
    .querySelector("#btnRewardBlackStand")
    .addEventListener("click", () => {
      selectReward("blackEdition");
    });
  document.querySelector("#btnRewardMahogany").addEventListener("click", () => {
    selectReward("mahogany");
  });
  deactivateRewardBlock("mahogany");
}

window.onload = init;
