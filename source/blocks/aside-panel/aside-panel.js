var greenBlock = document.querySelector(".aside-panel__block-1");
var blueBlock = document.querySelector(".aside-panel__block-2");
var asideToggle = document.querySelector(".aside-panel__block-pop");

greenBlock.addEventListener("click", function() {

  if (asideToggle.classList.contains("aside-panel__block-pop--hidden")) {
    asideToggle.classList.remove("aside-panel__block-pop--hidden");
    asideToggle.classList.add("aside-panel__block-pop--shown");
  }

  else {
    asideToggle.classList.remove("aside-panel__block-pop--shown");
    asideToggle.classList.add("aside-panel__block-pop--hidden");
  }

  blueBlock.classList.toggle("aside-panel__block-2--toggle");
});
