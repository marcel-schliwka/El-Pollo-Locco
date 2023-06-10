let canvas;
let intervalIds = [];
let world;
let startGameBtn;
let keyboard = new Keyboard();

const init = () => {
  canvas = document.querySelector("#canvas");
  startGameBtn = document.querySelector("#start-game");
  startGameBtn.addEventListener("click", startGame);
};

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
}
