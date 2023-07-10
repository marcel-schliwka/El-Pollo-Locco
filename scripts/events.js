/**
 * Element that represents the fullscreen icon in the DOM.
 * @type {HTMLElement}
 */
const fullscreenIcon = document.getElementById("fullscreen-icon");

/**
 * Element that represents the game container in the DOM.
 * @type {HTMLElement}
 */
const gameContainer = document.querySelector(".game-container");

/**
 * Element that represents the settings menu in the DOM.
 * @type {HTMLElement}
 */
const menu = document.getElementById("settingsMenu");

/**
 * Instance of the SoundManager class to manage game sounds.
 * @type {SoundManager}
 */
let soundManager = new SoundManager();

/**
 * Starts the game, creates the level with all enemies and items to collect.
 * Creates an instance of the SoundManager class to play sound effects and background music.
 * Creates the world and passes all important variables into the instance of the World class.
 */
function startGame() {
  const level1 = createLevel();

  world = new World(canvas, keyboard, level1, soundManager);
  document
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.add("d-none"));
}

/**
 * Opens the settings menu and updates the button to close the settings.
 * @param {HTMLImageElement} button - The button that opens/closes the settings.
 */
function openSettings(button) {
  menu.classList.remove("d-none");
  button.src = "./img/icons/close.webp";
  button.setAttribute("onclick", "closeSettings(this);");
}

/**
 * Closes the settings menu and updates the button to open the settings.
 * @param {HTMLImageElement} button - The button that opens/closes the settings.
 */
function closeSettings(button) {
  menu.classList.add("d-none");
  button.src = "./img/icons/setting.webp";
  button.setAttribute("onclick", "openSettings(this);");
}

/**
 * Mutes the audio and updates the button to resume the audio.
 * @param {HTMLImageElement} button - The button that mutes/resumes the audio.
 */
function muteAudio(button) {
  button.setAttribute("onclick", "resumeAudio(this);");
  button.src = "./img/icons/mute.webp";
  soundManager.muteThemes();
  soundManager.muted = true;
}

/**
 * Resumes the audio and updates the button to mute the audio.
 * @param {HTMLImageElement} button - The button that mutes/resumes the audio.
 */
function resumeAudio(button) {
  button.setAttribute("onclick", "muteAudio(this);");
  button.src = "./img/icons/sound.webp";
  soundManager.resumeThemes();
  soundManager.muted = false;
}

/**
 * Toggles fullscreen mode on the game container.
 * Adds a 'fullscreen' class to the canvas when in fullscreen mode.
 * @param {HTMLImageElement} button - The button that toggles fullscreen mode.
 */
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
