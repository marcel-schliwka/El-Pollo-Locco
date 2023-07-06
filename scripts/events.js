const fullscreenIcon = document.getElementById("fullscreen-icon");
const gameContainer = document.querySelector(".game-container");
const menu = document.getElementById("settingsMenu");
let soundManager = new SoundManager();

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

document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    canvas.classList.remove("fullscreen");
  }
});

function startGame() {
  const level1 = createLevel();
  world = new World(canvas, keyboard, level1, soundManager);
  document
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.add("d-none"));
}

function openSettings(button) {
  menu.classList.remove("d-none");
  button.src = "./img/icons/close.webp";
  button.setAttribute("onclick", "closeSettings(this);");
}

function closeSettings(button) {
  menu.classList.add("d-none");
  button.src = "./img/icons/setting.webp";
  button.setAttribute("onclick", "openSettings(this);");
}

function muteAudio(button) {
  button.setAttribute("onclick", "resumeAudio(this);");
  button.src = "./img/icons/mute.webp";
  soundManager.muted = true;
}
function resumeAudio(button) {
  button.setAttribute("onclick", "muteAudio(this);");
  button.src = "./img/icons/sound.webp";
  soundManager.muted = false;
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
    canvas.classList.add("fullscreen");
  } else {
    document.exitFullscreen();
  }
}
