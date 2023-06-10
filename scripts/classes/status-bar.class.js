class StatusBar extends DrawableObject {
  world;
  IMAGE_HEALTH_CHARACTER = "img/7_statusbars/3_icons/icon_health.png";

  constructor(world) {
    super();
    this.world = world;
    this.loadImage(this.IMAGE_HEALTH_CHARACTER);
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.drawCharacterHealth();
  }

  drawCharacterHealth() {
    this.world.ctx.font = "20px Arial";
    this.world.ctx.fillStyle = "white";
    this.world.ctx.fillText("Test", 50, 50);
  }
}
