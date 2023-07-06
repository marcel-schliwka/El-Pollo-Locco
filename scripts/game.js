let canvas;
let intervalIds = [];
let world;
let startGameBtn;
let overlayImage;
let touchJump;
let touchThrow;
let touchLeft;
let touchRight;
let lastCalculated = 0;
const throttleTime = 100;
let keyboard = new Keyboard();

const init = () => {
  canvas = document.querySelector("#canvas");
  startGameBtn = document.querySelector("#start-game");
  overlayImage = document.querySelector("#overlay-image");
  touchJump = document.getElementById("touchJump");
  touchThrow = document.getElementById("touchThrow");
  touchLeft = document.getElementById("touchLeft");
  touchRight = document.getElementById("touchRight");

  startTouchEventListener();
};

function startTouchEventListener() {
  touchLeft.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  touchLeft.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
  touchRight.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  touchRight.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  touchJump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  touchJump.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  touchThrow.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  touchThrow.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

function calculateDirection(touchX, touchY) {
  const canvasMiddle = canvas.width / 2;
  const canvasHalf = canvas.height / 2;

  if (touchX < canvasMiddle && touchY > canvasHalf) {
    keyboard.LEFT = true;
    keyboard.RIGHT = false;
  }

  if (touchX > canvasMiddle && touchY > canvasHalf) {
    keyboard.RIGHT = true;
    keyboard.LEFT = false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    keyboard.SPACE = true;
  }
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (e.code == "ArrowUp") {
    keyboard.UP = true;
  }
  if (e.code == "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (e.code == "KeyD") {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {
  // console.log(e.code);
  if (e.code == "Space") {
    keyboard.SPACE = false;
  }
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (e.code == "ArrowUp") {
    keyboard.UP = false;
  }
  if (e.code == "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (e.code == "KeyD") {
    keyboard.D = false;
  }
});

function stoppableInterval(fn, time) {
  let interval = setInterval(fn, time);
  intervalIds.push(interval);
  return interval;
}

function stopGame() {
  intervalIds.forEach(clearInterval);
  document.querySelector(".gameOver").classList.remove("d-none");
}

function lostGame() {
  intervalIds.forEach(clearInterval);
  document.querySelector(".lost").classList.remove("d-none");
}

function restartGame() {
  document.querySelector(".gameOver").classList.add("d-none");
  document.querySelector(".lost").classList.add("d-none");
  startGame();
}
