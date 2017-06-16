var greenBlock = document.querySelector(".aside-panel__block-1");
var blueBlock = document.querySelector(".aside-panel__block-2");
var asideToggle = document.querySelector(".aside-panel__block-pop");

greenBlock.addEventListener("click", function() {
  asideToggle.classList.toggle("aside-panel__block-pop--hidden");
  blueBlock.classList.toggle("aside-panel__block-2--toggle");
});
