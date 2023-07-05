class Coin extends CollectableObjects {
  type = "coin";
  IMAGE_COIN_SMALL = "img/8_coin/coin_1.png";
  IMAGE_COIN_LARGE = "img/8_coin/coin_2.png";
  constructor() {
    super();
    this.minDistance = 500;
    this.x = Math.random() * (5000 - this.minDistance);
    this.y = Math.random() * 100 + 100;
    this.randomBool = Math.random() < 0.5;
    this.size = this.randomBool ? "small" : "large";
    this.loadCoinImage();
  }

  loadCoinImage() {
    if (this.size == "small") {
      this.loadImage(this.IMAGE_COIN_SMALL);
    }
    if (this.size == "large") {
      this.loadImage(this.IMAGE_COIN_LARGE);
    }
  }
}
