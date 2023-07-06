class ThrowableObject extends MoveableObject {
  side;
  splashed = false;
  touchedGround = false;
  hasInflictedDamage = false;
  world;
  deleted;
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.webp",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.webp",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.webp",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.webp",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.webp",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.webp",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.webp",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.webp",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.webp",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.webp",
  ];

  constructor(x, y, side, world) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.webp");
    this.loadimages(this.IMAGES_THROW);
    this.loadimages(this.IMAGES_SPLASH);
    this.side = side;
    this.x = x;
    this.y = y;
    this.world = world;
    this.width = 100;
    this.height = 100;
    this.throw();
  }

  throw() {
    this.speedY = 18;
    let gravityInterval = this.applyGravity();

    let throwInterval = stoppableInterval(() => {
      if (this.y > 350) {
        this.touchedGround = true;
        clearInterval(gravityInterval);
        this.splash();
      }

      if (this.side == "right" && !this.touchedGround) {
        this.x += 10;
      }
      if (this.side == "left" && !this.touchedGround) {
        this.x -= 10;
      }
      if (!this.splashed) {
        this.playAnimation(this.IMAGES_THROW);
      }
      if (this.touchedGround) {
        clearInterval(throwInterval);
        this.deleteFromGame();
      }
    }, 25);
  }

  splash() {
    stoppableInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 500);
  }

  deleteFromGame() {
    this.deleted = true;
    if (this.world.throwableObjects) {
      setTimeout(() => {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
          this.world.throwableObjects.splice(index, 1);
        }
      }, 1000);
    }
  }
}
