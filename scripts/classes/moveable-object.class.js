/**
 * Represents a MoveableObject in the game. This is a subclass of DrawableObject that can move and interact with other objects in the game world.
 */
class MoveableObject extends DrawableObject {
  canvas = document.querySelector("#canvas");
  speed = 0.15;
  otherDirection = false;
  speedY = 1;

  acceleration = 1;
  lastHit = 0;
  side = "right";
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    let gravityInterval = stoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.land();
      }
    }, 1000 / 60);
    return gravityInterval;
  }

  land() {
    this.y = 144;
    this.speedY = 0;
  }

  /**
   * Determines whether the object is above the ground.
   * @returns {boolean} A boolean indicating whether the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 144;
    }
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.side = "right";
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.side = "left";
  }

  /**
   * Determines whether the object is colliding with another object.
   * @param {DrawableObject} obj - The other object.
   * @returns {boolean} A boolean indicating whether the objects are colliding.
   */
  isColliding(obj) {
    const myLeft = this.x + this.offset.left;
    const myRight = this.x + this.width - this.offset.right;
    const myTop = this.y + this.offset.top;
    const myBottom = this.y + this.height - this.offset.bottom;

    const otherLeft = obj.x + (obj.offset ? obj.offset.left : 0);
    const otherRight = obj.x + obj.width - (obj.offset ? obj.offset.right : 0);
    const otherTop = obj.y + (obj.offset ? obj.offset.top : 0);
    const otherBottom =
      obj.y + obj.height - (obj.offset ? obj.offset.bottom : 0);

    return (
      myRight >= otherLeft &&
      myLeft <= otherRight &&
      myBottom >= otherTop &&
      myTop <= otherBottom
    );
  }

  /**
   * Determines whether the object is jumping on another object.
   * @param {DrawableObject} obj - The other object.
   * @returns {boolean} A boolean indicating whether the object is jumping on the other object.
   */
  isJumpingOn(obj) {
    if (obj instanceof Endboss) {
      return false;
    }
    const isJumpingOn = this.y < obj.y && this.speedY < 0;
    return isJumpingOn;
  }

  /**
   * Eliminates the object from the level.
   * @param {Level} level - The level from which to remove the object.
   */
  getEliminated(level) {
    // Play death animation.
    this.playAnimation(this.IMAGE_DEAD);

    // After a delay (e.g. one second), remove from game.
    setTimeout(() => {
      let index = level.enemies.indexOf(this);
      if (index > -1) {
        level.enemies.splice(index, 1);
      }
    }, 1000);
  }

  /**
   * Decreases the object's energy by a fixed amount, indicating a hit.
   */
  hit() {
    this.energy -= 30;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Decreases the object's jump energy by a fixed amount, indicating that it has been jumped on.
   */
  jumpedOn() {
    this.jumpEnergy -= 1;
    if (this.jumpEnergy < 0) {
      this.jumpEnergy = 0;
    }
  }

  /**
   * Determines whether the object is hurt.
   * @returns {boolean} A boolean indicating whether the object is hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1.25;
  }

  /**
   * Determines whether the object is dead.
   * @returns {boolean} A boolean indicating whether the object is dead.
   */
  isDead() {
    return this.energy == 0 || this.jumpEnergy == 0;
  }

  /**
   * Plays an animation for the object.
   * @param {Array} images - The sequence of images for the animation.
   */
  playAnimation(images) {
    if (!images) {
      return 0;
    }
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 15;
  }
}
