class Coin extends CollectableObjects {
  type = "coin";
  IMAGE_COIN_SMALL = "img/8_coin/coin_1.png";
  IMAGE_COIN_LARGE = "img/8_coin/coin_2.png";
  constructor(x, size) {
    super();
    this.x = x;
    this.size = size;
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
