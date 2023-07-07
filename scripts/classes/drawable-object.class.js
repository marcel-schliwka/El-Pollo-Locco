/**
 * Represents a DrawableObject in the game, an abstract entity that can be visualized on the game canvas.
 * This class contains methods for loading and drawing images on a canvas.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  height;
  width;
  x = 100;
  y = 100;

  /**
   * Loads an image from a given path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the loaded image on a given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the drawing surface of a canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images from an array of paths, and stores them in an image cache.
   * @param {Array} arr - An array of image paths.
   */
  loadimages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
