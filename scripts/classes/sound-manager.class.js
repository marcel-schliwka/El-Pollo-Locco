/**
 * Represents a SoundManager that handles all the sound effects in the game.
 */
class SoundManager {
  /**
   * @property {boolean} muted - Boolean flag indicating whether the sound is muted or not.
   * @property {Audio} theme_sound - Theme sound for the game.
   * @property {Audio} endboss_theme_sound - Theme sound for the end boss.
   * @property {Audio} character_jump - Sound for character's jump.
   * @property {Audio} character_hurt - Sound for when the character gets hurt.
   * @property {Audio} endboss_hurt - Sound for when the end boss gets hurt.
   * @property {Audio} endboss_dies - Sound for when the end boss dies.
   * @property {Audio} chicken_sound - Sound for chicken.
   * @property {Audio} walking_sound - Sound for walking.
   * @property {Audio} chicken_dead_sound - Sound for when the chicken dies.
   * @property {Audio} collect_item_sound - Sound for collecting an item.
   * @property {Audio} character_death_sound - Sound for when the character dies.
   * @property {boolean} onceDead - Boolean flag to prevent character death sound playing more than once.
   */
  muted = false;
  theme_sound = new Audio("audio/theme.mp3");
  endboss_theme_sound = new Audio("audio/endboss_theme.mp3");
  character_jump_sound = new Audio("audio/pepe_jump.mp3");
  character_hurt_sound = new Audio("audio/pepe_hurt.mp3");
  endboss_hurt_sound = new Audio("audio/endboss.mp3");
  endboss_dead_sound = new Audio("audio/goat.mp3");
  chicken_sound = new Audio("audio/chicken.mp3");
  character_walking_sound = new Audio("audio/walking_sand.mp3");
  chicken_dead_sound = new Audio("audio/smash_enemy.mp3");
  collect_item_sound = new Audio("audio/collect_item.mp3");
  character_dead_sound = new Audio("audio/character_death.mp3");
  onceDead = false;

  /**
   * Plays the given sound if sound is not muted.
   * @param {Audio} sound - The sound to play.
   */
  playSound(sound) {
    if (!this.muted) {
      sound.play();
    }
  }

  /**
   * Pauses the given sound.
   * @param {Audio} sound - The sound to pause.
   */
  pauseSound(sound) {
    sound.pause();
  }

  /**
   * Handles the character's walking sound. Plays the sound if the character is walking and not muted, otherwise pauses the sound.
   * @param {boolean} walking - Boolean indicating whether the character is walking or not.
   */
  characterWalking(walking) {
    if (walking && !this.muted) {
      this.character_walking_sound.play();
    } else {
      this.character_walking_sound.pause();
    }
  }

  /**
   * Pauses the character's walking sound if sound is not muted.
   */
  characterStopWalking() {
    if (!this.muted) {
      this.character_walking_sound.pause();
    }
  }

  /**
   * Plays the character's death sound if sound is not muted and the sound has not been played before (controlled by the onceDead flag).
   * Resets the onceDead boolean after 2000ms to allow the sound to be played again later.
   */
  characterDies() {
    if (!this.muted && !this.onceDead) {
      this.character_dead_sound.play();
      this.onceDead = true;
      setTimeout(() => (this.onceDead = false), 2000);
    }
  }
}
