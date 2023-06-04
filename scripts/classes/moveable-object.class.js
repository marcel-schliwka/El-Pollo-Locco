class MoveableObject {
  x = 100;
  y = 100;
  currentImage = 0;
  img;
  canvas = document.querySelector("#canvas");
  height;
  width;
  imageCache = {};
  speed = 0.15;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadimages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  moveRight() {
    console.log("Move Right");
  }

  positionEntity(img, factorHeight, factorWidth) {
    const percentHeight = (canvas.height + img.height) / 100;
    const percentWidth = (canvas.width + img.width) / 100;
    console.log(`1 Prozent: ${percentHeight}`);
    this.height = percentHeight * factorHeight;
    this.width = percentWidth * factorWidth;
    console.log(`${this} ${this.height}`);
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
