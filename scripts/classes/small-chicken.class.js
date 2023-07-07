class SmallChicken extends Chicken {
  jumpEnergy = 1;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.webp",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.webp",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.webp",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.webp"];
  constructor() {
    super();
    this.width = 75;
    this.height = 75;
    this.y = 360;
    super.loadimages(this.IMAGE_DEAD);
    super.loadimages(this.IMAGES_WALKING);
  }
}
