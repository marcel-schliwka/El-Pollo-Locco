const fullscreenIcon = document.getElementById("fullscreen-icon");
const gameContainer = document.querySelector(".game-container");
const menu = document.getElementById("settingsMenu");

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

function startGame() {
  const level1 = createLevel();
  world = new World(canvas, keyboard, level1);
  document
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.add("d-none"));
}

function openSettings(button) {
  menu.classList.remove("d-none");
  button.src = "./img/icons/close.png";
  button.setAttribute("onclick", "closeSettings(this);");
}

function closeSettings(button) {
  menu.classList.add("d-none");
  button.src = "./img/icons/setting.png";
  button.setAttribute("onclick", "openSettings(this);");
}

function muteAudio(button) {
  button.setAttribute("onclick", "resumeAudio(this);");
  button.src = "./img/icons/mute.png";
}
function resumeAudio(button) {
  button.setAttribute("onclick", "muteAudio(this);");
  button.src = "./img/icons/sound.png";
}

function fullscreen(button) {
  if (document.fullscreenElement === null) {
    if (canvas.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) {
      gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      gameContainer.msRequestFullscreen();
    }
  } else {
    document.exitFullscreen();
  }
}
