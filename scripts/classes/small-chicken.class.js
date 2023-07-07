/**
 * Represents a SmallChicken object in the game, which is a type of Chicken.
 */
class SmallChicken extends Chicken {
  jumpEnergy = 1;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.webp",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.webp",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.webp",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.webp"];
  /**
   * Constructs a SmallChicken object and initializes its width, height, and y position.
   * Overrides the default IMAGES_WALKING and IMAGE_DEAD properties with images suitable for small chickens.
   * Loads the walking and dead images for the small chicken.
   */
  constructor() {
    super();
    this.width = 75;
    this.height = 75;
    this.y = 360;
    super.loadimages(this.IMAGE_DEAD);
    super.loadimages(this.IMAGES_WALKING);
  }
}
