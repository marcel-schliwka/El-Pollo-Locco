/**
 * Class representing a collectable object in the game.
 * @extends MoveableObject
 */
class CollectableObjects extends MoveableObject {
  width = 100;
  height = 100;
  y = 340;
  /**
   * Indicates if the collectable object is collected or not.
   * @type {boolean}
   */
  isCollected = false;
  constructor() {
    super();
  }
}
