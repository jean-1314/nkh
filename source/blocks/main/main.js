var mainBtn = document.querySelector(".main__btn");
var mainWindow = document.querySelector(".main");

mainBtn.addEventListener("click", function() {
  if (mainWindow.classList.contains("main--first")) {
    mainWindow.classList.remove("main--first");
    mainWindow.classList.add("main--second");
  }

  else if (mainWindow.classList.contains("main--second")) {
    mainWindow.classList.remove("main--second");
    mainWindow.classList.add("main--first");
  }

  else {
    mainWindow.classList.add("main--second");
  }
});
