class World {
  level = level1;
  character;
  keyboard;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  screen;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [new ThrowableObject(-1000, -1000, "right")];

  // throwableObjects = [new ThrowableObject()];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.character = new Character();
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    stoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 100);
  }
  checkCollisions() {
    let bottle = this.getCurrentBottle();
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();

        this.statusBar.setPercentage(this.character.energy);
      } else if (bottle.isColliding(enemy)) {
        bottle.splashed = true;
        bottle.splash();
        console.log("Bottle collided");
      }
    });
  }

  getCurrentBottle() {
    return this.throwableObjects[this.throwableObjects.length - 1];
  }

  checkThrowObjects() {
    let thisSide = this.character.side;
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x,
        this.character.y + 100,
        thisSide
      );
      console.log("Character X", this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
      this.throwableObjects.forEach((bottle, index) => {});
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // ---- Space for Fixed Objects ---- //
    this.addToMap(this.statusBar);
    // ---- End Space ---- //

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);

    this.addObjectsToMap(this.level.clouds);
    // this.addObjectsToMap(this.throwableObjects);
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
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
