class Bottle extends CollectableObjects {
  side = "right";
  type = "bottle";
  IMAGE_BOTTLE_RIGHT = "img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
  IMAGE_BOTTLE_LEFT = "img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
  constructor(x, side) {
    super();

    this.x = x;
    this.randomBool = Math.random() < 0.5;
    this.side = this.randomBool ? "left" : "right";
    this.loadImagesBySide();
  }

  loadImagesBySide() {
    if (this.side === "right") {
      this.loadImage(this.IMAGE_BOTTLE_RIGHT);
    }
    if (this.side === "left") {
      this.loadImage(this.IMAGE_BOTTLE_LEFT);
    }
  }
}
