/**
 * Class representing a BackgroundObject in the game. This class extends from MoveableObject and
 * is used for creating the background elements in the game, like scenery
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;
  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The path to the image file for this object.
   * @param {number} x - The initial horizontal coordinate where the object will be placed.
   * @param {number} y - The initial vertical coordinate where the object will be placed.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
