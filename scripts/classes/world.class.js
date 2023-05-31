class World {
  character;
  enemies = [
    new Chicken(this.canvas),
    new Chicken(this.canvas),
    new Chicken(this.canvas),
  ];
  canvas;
  ctx;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.character = new Character();
    this.canvas = canvas;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );
    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    });
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  randomize(coord) {
    return Math.round(Math.random() * 1000);
  }
}
