/**
 * @class
 * @classdesc The main class responsible for setting up and managing the game world.
 */
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
  isGameOver = false;
  cameraSide = "left";
  throwableObjects;
  throwCooldown;
  endbossDead;
  camera_x = 0;
  statusBar = new StatusBar(this);

  collectableObjects;

  /**
   * @constructor
   * @param {Object} canvas - The canvas object on which the game world is drawn.
   * @param {Object} keyboard - The keyboard object capturing the player's input.
   * @param {Object} level - The object containing level information.
   * @param {Object} soundManager - The object managing the game's audio.
   */
  constructor(canvas, keyboard, level, soundManager) {
    this.level = level;
    this.soundManager = soundManager;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.throwableObjects = [new ThrowableObject(-2000, -2000, "right", this)];
    this.enemies = level.enemies;
    this.clouds = level.clouds;
    this.collectableObjects = level.collectables;
    this.character = new Character();
    this.keyboard = keyboard;

    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world for each game object and plays the game's theme music.
   */
  setWorld() {
    this.soundManager.playSound(this.soundManager.theme_sound);
    this.character.world = this;
    this.enemies.forEach((enemy) => (enemy.world = this));
  }

  /**
   * Continuously checks for collisions and throwable objects.
   */
  run() {
    stoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }

  /**
   * Checks for collisions between the character, enemies, and collectables.
   */
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
        this.soundManager.playSound(this.soundManager.collect_item_sound);
        this.collectedItem(collectable);
      }
    });
  }

  /**
   * Handles actions when the character collects an item.
   * @param {Object} collectable - The collectable object collected by the character.
   */
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

  /**
   * Handles collision between character and enemy.
   * @param {Object} enemy - The enemy character collided with.
   */
  handleCharacterCollision(enemy) {
    if (this.character.isJumpingOn(enemy)) {
      this.handleJumpOnEnemy(enemy);
    } else if (!this.character.isInvincible) {
      this.handleEnemyHit(enemy);
    }
  }

  /**
   * Checks if the given enemy is an instance of Endboss.
   * @param {Object} enemy - The enemy to check.
   */
  checkIfEnemyIsEndboss(enemy) {
    if (enemy instanceof Endboss) {
      enemy.playerContact = true;
      setTimeout(() => (enemy.playerContact = false), 2000);
    } else {
      enemy.playerContact = false;
    }
  }

  /**
   * Handles the scenario when character jumps on enemy.
   * @param {Object} enemy - The enemy character jumped on.
   */
  handleJumpOnEnemy(enemy) {
    if (!enemy.isDead()) {
      this.soundManager.playSound(this.soundManager.chicken_sound);
      enemy.jumpedOn();
      this.character.speedY = 0;
      if (enemy.jumpEnergy > 0) {
        this.character.jump();
      }
    }
    if (enemy.isDead()) {
      enemy.getEliminated(this.level);
    } else {
    }
    this.initiateInvincibility();
  }

  /**
   * Handles the scenario when character gets hit by an enemy.
   * @param {Object} enemy - The enemy that hit the character.
   */
  handleEnemyHit(enemy) {
    if (!enemy.isDead()) {
      this.character.hit();
    }

    if (this.character.isDead()) {
      setTimeout(this.youLost(), 2000);
    } else {
      this.initiateInvincibility();
    }
  }

  /**
   * Initiates the invincibility state for the character for a certain duration.
   */
  initiateInvincibility() {
    if (!this.character.isInvincible) {
      this.character.isInvincible = true;
      setTimeout(() => {
        this.character.isInvincible = false;
      }, 1000); // Unverwundbarkeitsphase
    }
  }

  /**
   * Handles the collision between a bottle and an enemy.
   * @param {Object} bottle - The bottle involved in the collision.
   * @param {Object} enemy - The enemy involved in the collision.
   */
  handleBottleCollision(bottle, enemy) {
    bottle.splashed = true;
    bottle.hasInflictedDamage = true;
    bottle.splash();
    enemy.hit();
    if (enemy.isDead()) {
      enemy.getEliminated(this.level);
      if (enemy instanceof Endboss) {
        this.endbossDead = true;
        setTimeout(() => this.gameOver(), 2000);
      }
    }
  }

  /**
   * Handles the scenario when the game is over.
   */
  gameOver() {
    this.isGameOver = true;
    this.soundManager.pauseSound(this.soundManager.theme_sound);
    this.soundManager.pauseSound(this.soundManager.endboss_theme_sound);
    stopGame();
  }

  /**
   * Handles the scenario when the player has lost the game.
   */
  youLost() {
    this.soundManager.pauseSound(this.soundManager.theme_sound);
    lostGame();
  }

  /**
   * Returns the current bottle object.
   * @returns {Object} The current throwable bottle object or a dummy bottle if none exists.
   */
  getCurrentBottle() {
    if (this.throwableObjects && this.throwableObjects.length > 0) {
      return this.throwableObjects[this.throwableObjects.length - 1];
    } else {
      let dummyBottle = new ThrowableObject(-1000, -1000, "right", this);
      dummyBottle.deleted = true;
      return dummyBottle;
    }
  }

  /**
   * Checks if a throwable object can be created and if so, creates one.
   */
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

  /**
   * Draws all the game objects on the canvas and manages the camera's position relative to the main character and end boss.
   *
   * The camera moves with the main character until the character reaches the end boss.
   * All moving objects (including the character and end boss) and the static status bar are drawn to the canvas.
   * Finally, the draw() function is set to be called again on the next animation frame to continuously update the game visuals.
   */
  draw() {
    // Clear the context
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let endboss = this.enemies.find((enemy) => enemy instanceof Endboss);

    /**
     * Checks if the Endboss exists
     * After that it checks if the Character is on the left or right side of the boss and flips the camera
     */
    if (endboss) {
      if (this.character.x > endboss.x) {
        this.cameraSide = "right";
        this.camera_x = -this.character.x + this.canvas.width / 2;
      }
    }
    if (!endboss && !this.isGameOver) {
      // Handle scenario when endboss doesn't exist and game is not over.
      // For example, you can set the camera_x to a default value.
      this.cameraSide = "left";
      this.camera_x = 0;
    }

    this.ctx.translate(this.camera_x, 0);

    // Ensure character is always drawn, even when game is over.
    if (this.isGameOver) {
      this.character.draw(this.ctx);
    }
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.collectableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Draws a list of game objects onto the canvas.
   * @param {Array} objects - The list of game objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a game object onto the canvas.
   * @param {Object} mo - The game object to draw.
   */
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

  /**
   * Flips the image of a game object.
   * @param {Object} mo - The game object whose image to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image of a game object to its original orientation.
   * @param {Object} mo - The game object whose image to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
