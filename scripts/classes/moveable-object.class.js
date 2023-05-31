class MoveableObject {
  x;
  y;
  img;
  canvas = document.querySelector("#canvas");
  height;
  width;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  moveRight() {
    console.log("Move Right");
  }

  calculatePosition(canvas, img) {
    let factor = (this.height / canvas.height) * 5;
    this.y = canvas.height / factor;
    console.log("Character Y Position", this.y);
    console.log("This.Height", factor);
    this.x = 50;
  }

  positionEntity(img, factorHeight, factorWidth) {
    const percentHeight = (canvas.height + img.height) / 100;
    const percentWidth = (canvas.width + img.width) / 100;
    console.log(`1 Prozent: ${percentHeight}`);
    this.height = percentHeight * factorHeight;
    this.width = percentWidth * factorWidth;
    console.log(`${this} ${this.height}`);
    this.x = 500;
    this.y = 50;
  }
}
