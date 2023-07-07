/**
 * Represents a status bar on the game display that extends DrawableObject.
 */
class StatusBar extends DrawableObject {
  world;
  IMAGE_HEALTH_CHARACTER = "img/7_statusbars/3_icons/icon_health.webp";
  IMAGE_SALSA_BOTTLE = "img/7_statusbars/3_icons/icon_salsa_bottle.webp";
  IMAGE_BOSS_HEALTH = "img/7_statusbars/3_icons/icon_health_endboss.webp";
  IMAGE_COIN = "img/7_statusbars/3_icons/icon_coin.webp";

  /**
   * @param {Object} world - The world instance in which the status bar exists.
   */
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

  /**
   * Draws the health of the character on the context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
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

  /**
   * Draws the salsa bottle count of the character on the context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
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

  /**
   * Draws the coin count of the character on the context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
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

  /**
   * Draws the health of the end boss on the context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  drawBossHealth(ctx) {
    let endboss = this.getEndboss();
    let endbossEnergy;
    if (endboss) {
      endbossEnergy = endboss.energy;
      ctx.drawImage(
        this.imageCache[this.IMAGE_BOSS_HEALTH],
        430,
        0,
        this.width,
        this.height
      );
      this.writeText(ctx, endbossEnergy, 530);
    } else {
      endbossEnergy = 0;
    }
  }

  /**
   * Returns the end boss  from the enemies in the level.
   * @returns {Object} The end boss .
   */
  getEndboss() {
    return this.world.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  /**
   * Draws the status bar on the context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    this.drawCharacterHealth(ctx);
    this.drawSalsaBottle(ctx);
    this.drawCoin(ctx);
    this.showBossHealth(ctx);
  }

  /**
   * Writes text on the context at the given position.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to write on.
   * @param {string} text - The text to write.
   * @param {number} x - The x-coordinate at which to start writing.
   */
  writeText(ctx, text, x) {
    ctx.font = "40px Mexico";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, 70);
  }

  /**
   * Shows the health of the end boss on the context if certain conditions are met.
   * @param {CanvasRenderingContext2D} ctx - The canvas  context to draw on.
   */
  showBossHealth(ctx) {
    let endboss = this.getEndboss();
    if (endboss && this.world.character.x > endboss.x - 610) {
      this.drawBossHealth(ctx);
    }
  }
}
