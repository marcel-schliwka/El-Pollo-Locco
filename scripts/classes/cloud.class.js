class Cloud extends MoveableObject {
  width = 500;
  height = 250;
  y = 20;
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = 200;
    this.animate();
  }

  animate() {
    stoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
