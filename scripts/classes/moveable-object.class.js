class MoveableObject extends DrawableObject {
  canvas = document.querySelector("#canvas");
  speed = 0.15;
  otherDirection = false;
  speedY = 1;
  jumpEnergy = 2;
  acceleration = 1;
  lastHit = 0;
  side = "right";
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  applyGravity() {
    let gravityInterval = stoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 60);
    return gravityInterval;
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 145;
    }
  }

  moveRight() {
    this.x += this.speed;
    this.side = "right";
  }

  moveLeft() {
    this.x -= this.speed;
    this.side = "left";
  }

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

  isJumpingOn(obj) {
    if (obj instanceof Endboss) {
      return false;
    }
    const isJumpingOn = this.y < obj.y && this.speedY < 0;
    return isJumpingOn;
  }

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

  hit() {
    this.energy -= 30;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  jumpedOn() {
    this.jumpEnergy -= 1;
    if (this.jumpEnergy < 0) {
      this.jumpEnergy = 0;
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1.25;
  }

  isDead() {
    return this.energy == 0 || this.jumpEnergy == 0;
  }

  positionEntity(img, factorHeight, factorWidth) {
    const percentHeight = (this.canvas.height + img.height) / 100;
    const percentWidth = (this.canvas.width + img.width) / 100;
    console.log(`1 Prozent: ${percentHeight}`);
    this.height = percentHeight * factorHeight;
    this.width = percentWidth * factorWidth;
    console.log(`${this} ${this.height}`);
  }

  playAnimation(images) {
    if (!images) {
      return 0;
    }
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 15;
  }
}
