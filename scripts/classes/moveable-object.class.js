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
  speedY = 0;
  acceleration = 1;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 145;
  }

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
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  positionEntity(img, factorHeight, factorWidth) {
    const percentHeight = (this.canvas.height + img.height) / 100;
    const percentWidth = (this.canvas.width + img.width) / 100;
    console.log(`1 Prozent: ${percentHeight}`);
    this.height = percentHeight * factorHeight;
    this.width = percentWidth * factorWidth;
    console.log(`${this} ${this.height}`);
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 20;
  }
}
