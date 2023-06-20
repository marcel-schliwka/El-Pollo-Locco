class StatusBar extends DrawableObject {
  world;
  IMAGE_HEALTH_CHARACTER = "img/7_statusbars/3_icons/icon_health.png";
  IMAGE_SALSA_BOTTLE = "img/7_statusbars/3_icons/icon_salsa_bottle.png";
  IMAGE_BOSS_HEALTH = "img/7_statusbars/3_icons/icon_health_endboss.png";
  IMAGE_COIN = "img/7_statusbars/3_icons/icon_coin.png";

  constructor(world) {
    super();
    this.world = world;

    this.loadimages([
      this.IMAGE_HEALTH_CHARACTER,
      this.IMAGE_SALSA_BOTTLE,
      this.IMAGE_BOSS_HEALTH,
      this.IMAGE_COIN,
    ]);
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
  }

  drawCharacterHealth(ctx) {
    ctx.drawImage(
      this.imageCache[this.IMAGE_HEALTH_CHARACTER],
      0,
      0,
      this.width,
      this.height
    );
    this.writeText(ctx, this.world.character.energy, 100, 70);
  }

  drawSalsaBottle(ctx) {
    ctx.drawImage(
      this.imageCache[this.IMAGE_SALSA_BOTTLE],
      140,
      0,
      this.width,
      this.height
    );
    this.writeText(ctx, this.world.character.bottles, 220);
  }

  drawCoin(ctx) {
    ctx.drawImage(
      this.imageCache[this.IMAGE_COIN],
      280,
      0,
      this.width,
      this.height
    );
    this.writeText(ctx, this.world.character.coins, 370);
  }

  drawBossHealth(ctx) {
    let endboss = this.getEndboss();
    let endbossEnergy;
    if (endboss) {
      endbossEnergy = endboss.energy;
      ctx.drawImage(
        this.imageCache[this.IMAGE_BOSS_HEALTH],
        500,
        0,
        this.width,
        this.height
      );
      this.writeText(ctx, endbossEnergy, 600);
    } else {
      endbossEnergy = 0;
    }
  }

  getEndboss() {
    return this.world.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  draw(ctx) {
    this.drawCharacterHealth(ctx);
    this.drawSalsaBottle(ctx);
    this.drawCoin(ctx);
    this.showBossHealth(ctx);
  }

  writeText(ctx, text, x) {
    ctx.font = "40px Mexico";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, 70);
  }

  showBossHealth(ctx) {
    let endboss = this.getEndboss();
    if (endboss && this.world.character.x > endboss.x - 610) {
      this.drawBossHealth(ctx);
    }
  }
}
