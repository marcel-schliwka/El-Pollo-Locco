class ThrowableObject extends MoveableObject {
  side;
  splashed = false;
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, side) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadimages(this.IMAGES_THROW);
    this.loadimages(this.IMAGES_SPLASH);
    this.side = side;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.throw();
  }

  throw() {
    this.speedY = 14;
    this.applyGravity();
    stoppableInterval(() => {
      if (this.side == "right") {
        this.x += 10;
      }
      if (this.side == "left") {
        this.x -= 10;
      }
      if (!this.splashed) {
        this.playAnimation(this.IMAGES_THROW);
      }
    }, 25);
  }

  splash() {
    stoppableInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 250);
  }
}
