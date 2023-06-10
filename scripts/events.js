const fullscreenIcon = document.getElementById("fullscreen-icon");
const gameContainer = document.querySelector(".game-container");

function goFullscreen() {
  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.mozRequestFullScreen) {
    gameContainer.mozRequestFullScreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  } else if (gameContainer.msRequestFullscreen) {
    gameContainer.msRequestFullscreen();
  }
}

fullscreenIcon.addEventListener("click", goFullscreen);
function startGame() {
  world = new World(canvas, keyboard);
  document
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.add("d-none"));
}
