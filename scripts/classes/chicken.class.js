class Chicken extends MoveableObject {
  y = 340;
  x = 100;
  width = 100;
  height = 100;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    super.loadimages(this.IMAGES_WALKING);
    this.x = Math.round(200 + Math.random() * 500);
    this.speed = 0.15 + Math.random() * 0.25;
    console.log(this.height, this.width, this.x, this.y);
    this.animate();
  }

  animate() {
    stoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    stoppableInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
