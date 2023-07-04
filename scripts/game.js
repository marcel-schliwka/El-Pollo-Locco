let canvas;
let intervalIds = [];
let world;
let startGameBtn;
let overlayImage;
let touchJump;
let touchThrow;
let lastCalculated = 0;
const throttleTime = 100;
let keyboard = new Keyboard();

const init = () => {
  canvas = document.querySelector("#canvas");
  startGameBtn = document.querySelector("#start-game");
  overlayImage = document.querySelector("#overlay-image");
  touchJump = document.getElementById("touchJump");
  touchThrow = document.getElementById("touchThrow");

  startTouchEventListener(canvas);
};

function startTouchEventListener(canvas) {
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    calculateDirection(e.touches[0].clientX, e.touches[0].clientY);
  });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastCalculated > throttleTime) {
      calculateDirection(e.touches[0].clientX, e.touches[0].clientY);
      lastCalculated = now;
    }
  });

  canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
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
}

function stopGame() {
  intervalIds.forEach(clearInterval);
  document.querySelector(".gameOver").classList.remove("d-none");
}
