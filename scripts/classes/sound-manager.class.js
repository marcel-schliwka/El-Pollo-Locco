class SoundManager {
  character_jump = new Audio("audio/pepe_jump.mp3");
  character_hurt = new Audio("audio/pepe_hurt.mp3");
  endboss_hurt = new Audio("audio/endboss.mp3");
  endboss_dies = new Audio("audio/goat.mp3");
  walking_sound = new Audio("audio/walking_sand.mp3");
  chicken_dead_sound = new Audio("audio/smash_enemy.mp3");
  collect_item_sound = new Audio("audio/collect_item.mp3");

  playJump() {
    this.character_jump.play();
  }

  characterWalking(walking) {
    if (walking) {
      this.walking_sound.play();
    } else {
      this.walking_sound.pause();
    }
  }

  characterStopWalking() {
    this.walking_sound.pause();
  }

  playEndbossHurt() {
    this.endboss_hurt.play();
  }

  endbossDies() {
    this.endboss_dies.play();
  }

  chickenDead() {
    this.chicken_dead_sound.play();
    setTimeout(() => this.chicken_dead_sound.pause(), 1000);
  }

  collectItem() {
    this.collect_item_sound.play();
  }

  characterHurt() {
    this.character_hurt.play();
  }
}
