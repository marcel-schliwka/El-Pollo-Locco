let canvas;
let ctx;
let world;

const init = () => {
  canvas = document.querySelector("#canvas");
  world = new World(canvas);
};
