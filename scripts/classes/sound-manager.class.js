class SoundManager {
  muted = false;
  character_jump = new Audio("audio/pepe_jump.mp3");
  character_hurt = new Audio("audio/pepe_hurt.mp3");
  endboss_hurt = new Audio("audio/endboss.mp3");
  endboss_dies = new Audio("audio/goat.mp3");
  walking_sound = new Audio("audio/walking_sand.mp3");
  chicken_dead_sound = new Audio("audio/smash_enemy.mp3");
  collect_item_sound = new Audio("audio/collect_item.mp3");

  playJump() {
    if (!this.muted) {
      this.character_jump.play();
    }
  }

  characterWalking(walking) {
    if (walking && !this.muted) {
      this.walking_sound.play();
    } else {
      this.walking_sound.pause();
    }
  }

  characterStopWalking() {
    if (!this.muted) {
      this.walking_sound.pause();
    }
  }

  playEndbossHurt() {
    if (!this.muted) {
      this.endboss_hurt.play();
    }
  }

  endbossDies() {
    if (!this.muted) {
      this.endboss_dies.play();
    }
  }

  chickenDead() {
    if (!this.muted) {
      this.chicken_dead_sound.play();
      setTimeout(() => this.chicken_dead_sound.pause(), 1000);
    }
  }

  collectItem() {
    if (!this.muted) {
      this.collect_item_sound.play();
    }
  }

  characterHurt() {
    if (!this.muted) {
      this.character_hurt.play();
    }
  }
}
