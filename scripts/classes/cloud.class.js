/**
 * Represents a Cloud in the game. This class extends the MoveableObject class.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
  /**
   * @constructor
   * @param {number} x - The initial x-coordinate of the cloud.
   * Initializes the cloud with its x-coordinate and sets the default
   * values of width, height, and y-coordinate.
   */
  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.webp");

    /**
     * @property {number} width - The width of the cloud. Default value is 700.
     * @property {number} height - The height of the cloud. Default value is 400.
     * @property {number} y - The y-coordinate of the cloud. Default value is 0.
     * @property {number} x - The x-coordinate of the cloud. Initial value is provided by the parameter x.
     */
    this.width = 700;
    this.height = 400;
    this.y = 0;
    this.x = x;
    this.animate();
  }

  /**
   * Initiates the cloud's leftward movement animation.
   * The cloud moves left every 1/60 of a second.
   * @method animate
   */
  animate() {
    stoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
