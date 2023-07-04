class Endboss extends MoveableObject {
  width = 300;
  height = 300;
  y = 150;
  x = 2000;
  energy = 100;
  playerContact = false;
  hurt_sound = new Audio("audio/goat.mp3");
  onceHurt = false;
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGE_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super();
    super.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    super.loadimages(this.IMAGES_ALERT);
    super.loadimages(this.IMAGES_WALKING);
    super.loadimages(this.IMAGE_DEAD);
    super.loadimages(this.IMAGES_ATTACK);
    super.loadimages(this.IMAGES_HURT);
    this.animate();
  }

  animate() {
    stoppableInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);
        this.world.soundManager.playEndbossHurt();
        this.onceHurt = true;
      } else if (this.playerContact) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.onceHurt && !this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
        this.x -= 35;
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.world.soundManager.endbossDies();
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 200);
  }
}
