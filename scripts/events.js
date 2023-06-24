const fullscreenIcon = document.getElementById("fullscreen-icon");
const gameContainer = document.querySelector(".game-container");

function goFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
}

fullscreenIcon.addEventListener("click", goFullscreen);
function startGame() {
  const level1 = createLevel();
  world = new World(canvas, keyboard, level1);
  document
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.add("d-none"));
}
