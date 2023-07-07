/**
 * Globale Variables
 */
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

/**
 * This Function get's executed after the DOM got loaded completly
 *
 */
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

/**
 * Starts the Event Listeners for Touchscreen devices
 * The Touch Buttons emulate the keyboard keypress
 */
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

/**
 * Event Listener to wait for keyboard presses to move character in game
 */
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

/**
 * Creates a setInterval() function but safes the interval ID in a Array intervalIds to later clear all Intervals
 * @param {function} fn -  Function to run in a Interval
 * @param {number} time - Time in ms how often the Interval get's repeated
 * @returns the ID of the created Interval
 */
function stoppableInterval(fn, time) {
  let interval = setInterval(fn, time);
  intervalIds.push(interval);
  return interval;
}

/**
 * Stop's the Game and clears all Intervals.
 * It get's the ID's from the intervalIds Array
 * It also removes the d-none class from the game Over Screen to show it
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
  document.querySelector(".gameOver").classList.remove("d-none");
}

/**
 * Same as for stopGame() but a different End Screen if you lost the Game
 */
function lostGame() {
  intervalIds.forEach(clearInterval);
  document.querySelector(".lost").classList.remove("d-none");
}

/**
 * Add's .d-none class to the Endscreens and calls the startGame() function
 */
function restartGame() {
  document.querySelector(".gameOver").classList.add("d-none");
  document.querySelector(".lost").classList.add("d-none");
  startGame();
}
