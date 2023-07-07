/**
 * Class representing a Bottle which is a type of CollectableObjects.
 * @extends CollectableObjects
 */
class Bottle extends CollectableObjects {
  side = "right";
  type = "bottle";
  IMAGE_BOTTLE_RIGHT = "img/6_salsa_bottle/2_salsa_bottle_on_ground.webp";
  IMAGE_BOTTLE_LEFT = "img/6_salsa_bottle/1_salsa_bottle_on_ground.webp";
  offset = {
    top: 5,
    left: 50,
    right: 50,
    bottom: 20,
  };

  /**
   * Constructs a Bottle object.
   * The x-position is randomly chosen within a specified range.
   * The side property (left or right) is also randomly chosen.
   * After setting these properties, it calls the function to load the appropriate image.
   */
  constructor() {
    super();

    /**
     * The x-coordinate of the Bottle.
     * @type {number}
     */
    this.x = Math.round(Math.random() * 5000 + 300);
    /**
     * A boolean value determining the side of the Bottle.
     * @type {boolean}
     */
    this.randomBool = Math.random() < 0.5;
    /**
     * The side of the Bottle, can be 'left' or 'right'.
     * @type {string}
     */
    this.side = this.randomBool ? "left" : "right";
    this.loadImagesBySide();
  }

  /**
   * Load the image for the Bottle based on its side property.
   */
  loadImagesBySide() {
    if (this.side === "right") {
      this.loadImage(this.IMAGE_BOTTLE_RIGHT);
    }
    if (this.side === "left") {
      this.loadImage(this.IMAGE_BOTTLE_LEFT);
    }
  }
}
