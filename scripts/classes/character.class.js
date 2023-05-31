class Character extends MoveableObject {
  x;
  y;
  constructor() {
    super();
    console.log(this.canvas);
    super.loadImage("img/2_character_pepe/2_walk/W-21.png");

    super.positionEntity(this.img, 15, 10);
  }
}
