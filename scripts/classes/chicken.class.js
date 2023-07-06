class Chicken extends MoveableObject {
  y = 340;
  x = 100;
  width = 100;
  height = 100;
  energy = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.webp",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.webp",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.webp"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp");
    super.loadimages(this.IMAGE_DEAD);
    super.loadimages(this.IMAGES_WALKING);
    this.x = Math.round(Math.random() * 5000 + 300);
    this.speed = 0.25 + Math.random() * 1.65;
    this.animate();
  }

  animate() {
    stoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
    stoppableInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      if (this.isDead()) {
        this.world.soundManager.chickenDead();
        this.playAnimation(this.IMAGE_DEAD);
        setTimeout(() => delete this, 1000);
      }
    }, 200);
  }
}
