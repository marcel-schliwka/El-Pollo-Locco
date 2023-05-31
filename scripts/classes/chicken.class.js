class Chicken extends MoveableObject {
  x;
  y;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.positionEntity(canvas, this.img, 10, 5);
    this.x = 40;
    this.y = 50;
    console.log(this.height, this.width, this.x, this.y);
  }
}

// C
