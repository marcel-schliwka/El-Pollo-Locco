class Screens extends DrawableObject {
  constructor() {
    super();
    super.loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
    console.log(img);
  }

  showTitleScreen() {
    console.log(this.img);
  }
}
