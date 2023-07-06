class World {
  level;
  character;
  keyboard;
  enemies;
  clouds;
  backgroundObjects;
  canvas;
  ctx;
  screen;
  throwableObjects;
  throwCooldown;
  camera_x = 0;
  statusBar = new StatusBar(this);

  collectableObjects;

  constructor(canvas, keyboard, level, soundManager) {
    this.level = level;
    this.soundManager = soundManager;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.throwableObjects = [new ThrowableObject(-2000, -2000, "right", this)];
    this.enemies = level.enemies;
    this.clouds - level.clouds;
    this.backgroundObjects = level.clouds;
    this.collectableObjects = level.collectables;
    this.character = new Character();
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.enemies.forEach((enemy) => (enemy.world = this));
  }

  run() {
    stoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }
  checkCollisions() {
    let bottle = this.getCurrentBottle();
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.checkIfEnemyIsEndboss(enemy);
        this.handleCharacterCollision(enemy);
      } else if (
        bottle.isColliding(enemy) &&
        !bottle.hasInflictedDamage &&
        !bottle.deleted
      ) {
        this.handleBottleCollision(bottle, enemy);
      }
    });
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) {
        this.soundManager.collectItem();
        this.collectedItem(collectable);
      }
    });
  }

  collectedItem(collectable) {
    if (collectable.type === "bottle") {
      this.character.bottles++;
    }
    if (collectable.type === "coin") {
      this.character.coins++;
    }
    const collectableIndex = this.level.collectables.indexOf(collectable);
    if (collectableIndex > -1) {
      this.level.collectables.splice(collectableIndex, 1);
    }
  }

  handleCharacterCollision(enemy) {
    if (this.character.isJumpingOn(enemy)) {
      this.handleJumpOnEnemy(enemy);
    } else if (!this.character.isInvincible) {
      this.handleEnemyHit();
    }
  }

  checkIfEnemyIsEndboss(enemy) {
    if (enemy instanceof Endboss) {
      enemy.playerContact = true;
      setTimeout(() => (enemy.playerContact = false), 2000);
    } else {
      enemy.playerContact = false;
    }
  }

  handleJumpOnEnemy(enemy) {
    if (!enemy.isDead()) {
      this.soundManager.chickenHurt();
      this.character.jump();
      enemy.jumpedOn();
    }
    if (enemy.isDead()) {
      enemy.getEliminated(this.level);
    } else {
    }
    this.initiateInvincibility();
  }

  handleEnemyHit() {
    this.character.hit();
    if (this.character.isDead()) {
      setTimeout(this.youLost(), 2000);
    } else {
      this.initiateInvincibility();
    }
  }

  initiateInvincibility() {
    if (!this.character.isInvincible) {
      this.character.isInvincible = true;
      setTimeout(() => {
        this.character.isInvincible = false;
      }, 1000); // Unverwundbarkeitsphase
    }
  }

  handleBottleCollision(bottle, enemy) {
    bottle.splashed = true;
    bottle.hasInflictedDamage = true;
    bottle.splash();
    enemy.hit();
    if (enemy.isDead()) {
      enemy.getEliminated(this.level);
      if (enemy instanceof Endboss) {
        setTimeout(() => this.gameOver(), 2000);
      }
    }
  }

  gameOver() {
    stopGame();
  }

  youLost() {
    lostGame();
  }
  getCurrentBottle() {
    if (this.throwableObjects && this.throwableObjects.length > 0) {
      return this.throwableObjects[this.throwableObjects.length - 1];
    } else {
      let dummyBottle = new ThrowableObject(-1000, -1000, "right", this);
      dummyBottle.deleted = true;
      return dummyBottle;
    }
  }

  checkThrowObjects() {
    let thisSide = this.character.side;
    if (
      this.keyboard.D &&
      this.character.hasEnoughBottles() &&
      !this.throwCooldown
    ) {
      this.throwCooldown = true;
      let bottle = new ThrowableObject(
        this.character.x,
        this.character.y + 100,
        thisSide,
        this
      );
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      setTimeout(() => (this.throwCooldown = false), 2000);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.collectableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // ---- Space for Fixed Objects ---- //
    this.addToMap(this.statusBar);

    // ---- End Space ---- //

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);

    this.addObjectsToMap(this.throwableObjects);
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
    // mo.drawFrame(this.ctx);

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
