/**
 * Creates a new Level instance with specified enemies, clouds, background objects, and items.
 * Enemies include Chicken, SmallChicken, and Endboss.
 * Background objects include BackgroundObject instances with specific image paths and positions.
 * Items include Bottle instances with specific positions and Coin instances.
 *
 * @returns {Level} A new Level instance with predefined enemies, clouds, background objects, and items.
 */
function createLevel() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Endboss(),
    ],
    [
      new Cloud(0),
      new Cloud(1000),
      new Cloud(2000),
      new Cloud(3000),
      new Cloud(4000),
      new Cloud(5000),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.webp", -719, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.webp",
        -719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.webp",
        -719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.webp",
        -719,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.webp", 0, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.webp",
        0,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.webp",
        0,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.webp",
        0,
        0
      ),

      new BackgroundObject("img/5_background/layers/air.webp", 719, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.webp",
        719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.webp",
        719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.webp",
        719,
        0
      ),

      new BackgroundObject("img/5_background/layers/air.webp", 719 * 2, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.webp",
        719 * 2,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.webp",
        719 * 2,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.webp",
        719 * 2,
        0
      ),

      new BackgroundObject("img/5_background/layers/air.webp", 719 * 3, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.webp",
        719 * 3,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.webp",
        719 * 3,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.webp",
        719 * 3,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.webp", 719 * 4, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.webp",
        719 * 4,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.webp",
        719 * 4,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.webp",
        719 * 4,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.webp", 719 * 5, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.webp",
        719 * 5,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.webp",
        719 * 5,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.webp",
        719 * 5,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.webp", 719 * 6, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.webp",
        719 * 6,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.webp",
        719 * 6,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.webp",
        719 * 6,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.webp", 719 * 7, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.webp",
        719 * 7,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.webp",
        719 * 7,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.webp",
        719 * 7,
        0
      ),
    ],
    [
      new Bottle(100, "left"),
      new Bottle(320, "right"),
      new Bottle(550, "right"),
      new Bottle(700, "left"),
      new Bottle(1000, "left"),
      new Bottle(1200, "right"),
      new Bottle(1100, "left"),
      new Bottle(400, "right"),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ]
  );
}
