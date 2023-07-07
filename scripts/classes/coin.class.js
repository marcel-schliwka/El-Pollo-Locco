/**
 * Represents a Coin collectible object in the game, which is a type of CollectableObjects.
 */
class Coin extends CollectableObjects {
  type = "coin";
  IMAGE_COIN_SMALL = "img/8_coin/coin_1.webp";
  IMAGE_COIN_LARGE = "img/8_coin/coin_2.webp";
  /**
   * Constructs a Coin object, initializes coin size, and sets its position randomly.
   * Depending on the size of the coin ("small" or "large"), it loads different images.
   */
  constructor() {
    super();
    this.minDistance = 500;
    this.x = Math.random() * (5000 - this.minDistance);
    this.y = Math.random() * 100 + 150;
    this.randomBool = Math.random() < 0.5;
    this.size = this.randomBool ? "small" : "large";
    this.loadCoinImage();
  }

  /**
   * Load the appropriate coin image based on the size of the coin.
   * If the size of the coin is 'small', it will load a small coin image.
   * If the size of the coin is 'large', it will load a large coin image.
   */
  loadCoinImage() {
    if (this.size == "small") {
      this.loadImage(this.IMAGE_COIN_SMALL);
    }
    if (this.size == "large") {
      this.loadImage(this.IMAGE_COIN_LARGE);
    }
  }
}
