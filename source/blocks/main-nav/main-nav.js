var navToggle = document.querySelector(".main-nav__toggle");
var navMain = document.querySelector(".main-nav");
var header = document.querySelector(".page-header");

navToggle.addEventListener("click", function() {

  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
    header.classList.remove("page-header--hidden");
    header.classList.add("page-header--shown");
  }

  else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
    header.classList.remove("page-header--shown");
    header.classList.add("page-header--hidden");
  }
});
