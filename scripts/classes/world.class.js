class World {
  character;
  keyboard;
  enemies = [
    new Chicken(this.canvas),
    new Chicken(this.canvas),
    new Chicken(this.canvas),
  ];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png", -719, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      -719,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      -719,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      -719,
      0
    ),
    new BackgroundObject("img/5_background/layers/air.png", 0, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719, 0),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719,
      0
    ),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2,
      0
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3,
      0
    ),
  ];
  canvas;
  ctx;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.character = new Character();
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.addObjectsToMap(this.clouds);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  randomize(coord) {
    return Math.round(Math.random() * 1000);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
