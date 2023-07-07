/**
 * Represents a Level in the game, which consists of enemies, clouds, background objects, collectables, and a level end point.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  collectables;
  level_end_x = 4800;

  /**
   * Constructs a Level object and initializes its enemies, clouds, background objects, collectables, and level end point.
   * @param {Array} enemies - An array of Enemy objects.
   * @param {Array} clouds - An array of Cloud objects.
   * @param {Array} backgroundObjects - An array of BackgroundObject objects.
   * @param {Array} collectables - An array of CollectableObject objects.
   */
  constructor(enemies, clouds, backgroundObjects, collectables) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
  }
}
