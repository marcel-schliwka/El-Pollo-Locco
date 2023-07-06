class Character extends MoveableObject {
  // y = 150; Ground
  y = 40;
  x = 100;
  width = 150;
  height = 300;
  energy = 100;
  bottles = 0;
  coins = 0;
  world;
  idleTimer = 0;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.webp",
    "img/2_character_pepe/1_idle/idle/I-2.webp",
    "img/2_character_pepe/1_idle/idle/I-3.webp",
    "img/2_character_pepe/1_idle/idle/I-4.webp",
    "img/2_character_pepe/1_idle/idle/I-5.webp",
    "img/2_character_pepe/1_idle/idle/I-6.webp",
    "img/2_character_pepe/1_idle/idle/I-7.webp",
    "img/2_character_pepe/1_idle/idle/I-8.webp",
    "img/2_character_pepe/1_idle/idle/I-9.webp",
    "img/2_character_pepe/1_idle/idle/I-10.webp",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.webp",
    "img/2_character_pepe/1_idle/long_idle/I-12.webp",
    "img/2_character_pepe/1_idle/long_idle/I-13.webp",
    "img/2_character_pepe/1_idle/long_idle/I-14.webp",
    "img/2_character_pepe/1_idle/long_idle/I-15.webp",
    "img/2_character_pepe/1_idle/long_idle/I-16.webp",
    "img/2_character_pepe/1_idle/long_idle/I-17.webp",
    "img/2_character_pepe/1_idle/long_idle/I-18.webp",
    "img/2_character_pepe/1_idle/long_idle/I-19.webp",
    "img/2_character_pepe/1_idle/long_idle/I-20.webp",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.webp",
    "img/2_character_pepe/2_walk/W-22.webp",
    "img/2_character_pepe/2_walk/W-23.webp",
    "img/2_character_pepe/2_walk/W-24.webp",
    "img/2_character_pepe/2_walk/W-25.webp",
    "img/2_character_pepe/2_walk/W-26.webp",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.webp",
    "img/2_character_pepe/3_jump/J-32.webp",
    "img/2_character_pepe/3_jump/J-33.webp",
    "img/2_character_pepe/3_jump/J-34.webp",
    "img/2_character_pepe/3_jump/J-35.webp",
    "img/2_character_pepe/3_jump/J-36.webp",
    "img/2_character_pepe/3_jump/J-37.webp",
    "img/2_character_pepe/3_jump/J-38.webp",
    "img/2_character_pepe/3_jump/J-39.webp",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.webp",
    "img/2_character_pepe/5_dead/D-52.webp",
    "img/2_character_pepe/5_dead/D-53.webp",
    "img/2_character_pepe/5_dead/D-54.webp",
    "img/2_character_pepe/5_dead/D-55.webp",
    "img/2_character_pepe/5_dead/D-56.webp",
    "img/2_character_pepe/5_dead/D-57.webp",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.webp",
    "img/2_character_pepe/4_hurt/H-42.webp",
    "img/2_character_pepe/4_hurt/H-43.webp",
  ];

  speed = 10;
  constructor() {
    super();
    this.applyGravity();
    super.loadImage("img/2_character_pepe/2_walk/W-21.webp");
    super.loadimages(this.IMAGES_IDLE);
    super.loadimages(this.IMAGES_LONG_IDLE);
    super.loadimages(this.IMAGES_WALKING);
    super.loadimages(this.IMAGES_JUMPING);
    super.loadimages(this.IMAGES_DEAD);
    super.loadimages(this.IMAGES_HURT);
    this.offset = {
      top: 200,
      left: 60,
      right: 60,
      bottom: 20,
    };

    this.animate();
  }
  resetIdleTimer() {
    this.idleTimer = 0;
  }
  animate() {
    stoppableInterval(() => {
      if (this.isAboveGround()) {
        this.resetIdleTimer();
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.isDead()) {
        this.resetIdleTimer();
        this.playAnimation(this.IMAGES_DEAD);
        this.world.soundManager.characterDies();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.resetIdleTimer();
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurt()) {
        this.resetIdleTimer();
        this.world.soundManager.characterHurt();
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleTimer += 1;
        if (this.idleTimer > 200) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
        }
      }
    }, 100);

    stoppableInterval(() => {
      this.world.soundManager.characterWalking(false);
      if (this.isDead()) {
        return 0;
      } else if (this.checkIfCharacterJumps()) {
        this.world.soundManager.playJump();
        this.jump();
      } else if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x
      ) {
        this.moveRight();
        this.otherDirection = false;
        this.world.soundManager.characterWalking(true);
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.world.soundManager.characterWalking(true);
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 30);
  }

  hasEnoughBottles() {
    return this.bottles > 0;
  }
  checkIfCharacterJumps() {
    return (
      (this.world.keyboard.SPACE && !this.isAboveGround()) ||
      (this.world.keyboard.UP && !this.isAboveGround()) ||
      (this.world.keyboard.UP &&
        this.world.keyboard.RIGHT &&
        !this.isAboveGround()) ||
      (this.world.keyboard.LEFT &&
        this.world.keyboard.UP &&
        !this.isAboveGround())
    );
  }
}
