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
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        -719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        -719,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 0, 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0, 0),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        0,
        0
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0, 0),

      new BackgroundObject("img/5_background/layers/air.png", 719, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719,
        0
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 2, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2,
        0
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 3, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 4,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 4,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 4,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 5, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 5,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 5,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 5,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 6, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 6,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 6,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 6,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 7, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 7,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 7,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
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
