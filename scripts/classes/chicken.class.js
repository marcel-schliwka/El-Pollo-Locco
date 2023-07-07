/**
 * Represents a Chicken character in the game, which is a type of MoveableObject.
 */
class Chicken extends MoveableObject {
  y = 340;
  x = 100;
  width = 100;
  height = 100;
  jumpEnergy = 2;
  energy = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.webp",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.webp",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.webp"];

  /**
   * Constructs a Chicken object, initializes images and animations, sets its position and speed randomly.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp");
    super.loadimages(this.IMAGE_DEAD);
    super.loadimages(this.IMAGES_WALKING);
    this.x = Math.round(Math.random() * 5000 + 300);
    this.speed = 0.25 + Math.random() * 1.65;
    this.animate();
    this.offset = {
      top: 0,
      left: -15,
      right: -10,
      bottom: 0,
    };
  }

  /**
   * Defines the behavior and animation of the Chicken character.
   * The Chicken character continuously moves left unless it's dead.
   * While it's alive, it plays a walking animation. If it's dead, a death sound effect is played, it plays a dead animation,
   * and it is removed from the game after 1 second.
   */
  animate() {
    stoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 30);
    stoppableInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      if (this.isDead()) {
        this.world.soundManager.playSound(
          this.world.soundManager.chicken_dead_sound
        );
        this.playAnimation(this.IMAGE_DEAD);
        setTimeout(() => delete this, 1000);
      }
    }, 200);
  }
}
