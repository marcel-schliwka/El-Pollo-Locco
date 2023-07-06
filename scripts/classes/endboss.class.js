class Endboss extends MoveableObject {
  width = 300;
  height = 300;
  y = 150;
  x = 4500;
  energy = 100;
  playerContact = false;
  hurt_sound = new Audio("audio/goat.mp3");
  onceHurt = false;
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.webp",
    "img/4_enemie_boss_chicken/2_alert/G6.webp",
    "img/4_enemie_boss_chicken/2_alert/G7.webp",
    "img/4_enemie_boss_chicken/2_alert/G8.webp",
    "img/4_enemie_boss_chicken/2_alert/G9.webp",
    "img/4_enemie_boss_chicken/2_alert/G10.webp",
    "img/4_enemie_boss_chicken/2_alert/G11.webp",
    "img/4_enemie_boss_chicken/2_alert/G12.webp",
  ];

  IMAGE_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.webp",
    "img/4_enemie_boss_chicken/5_dead/G25.webp",
    "img/4_enemie_boss_chicken/5_dead/G26.webp",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.webp",
    "img/4_enemie_boss_chicken/4_hurt/G22.webp",
    "img/4_enemie_boss_chicken/4_hurt/G23.webp",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.webp",
    "img/4_enemie_boss_chicken/3_attack/G14.webp",
    "img/4_enemie_boss_chicken/3_attack/G15.webp",
    "img/4_enemie_boss_chicken/3_attack/G16.webp",
    "img/4_enemie_boss_chicken/3_attack/G17.webp",
    "img/4_enemie_boss_chicken/3_attack/G18.webp",
    "img/4_enemie_boss_chicken/3_attack/G19.webp",
    "img/4_enemie_boss_chicken/3_attack/G20.webp",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.webp",
    "img/4_enemie_boss_chicken/1_walk/G2.webp",
    "img/4_enemie_boss_chicken/1_walk/G3.webp",
    "img/4_enemie_boss_chicken/1_walk/G4.webp",
  ];

  constructor() {
    super();
    super.loadImage("img/4_enemie_boss_chicken/2_alert/G5.webp");
    super.loadimages(this.IMAGES_ALERT);
    super.loadimages(this.IMAGES_WALKING);
    super.loadimages(this.IMAGE_DEAD);
    super.loadimages(this.IMAGES_ATTACK);
    super.loadimages(this.IMAGES_HURT);
    this.animate();
    this.offset = {
      top: 0,
      left: 100,
      right: 60,
      bottom: 20,
    };
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
