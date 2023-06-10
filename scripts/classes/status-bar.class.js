class StatusBar extends DrawableObject {
  world;
  IMAGE_HEALTH_CHARACTER = ["img/7_statusbars/3_icons/icon_health.png"];

  constructor(world) {
    super();
    this.world = world;
    this.loadimages(this.IMAGE_HEALTH_CHARACTER);
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 50;
  }
}
