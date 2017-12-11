const CANVAS_X_START_POINT = 10;
const CANVAS_Y_START_POINT = 10;
const CANVAS_WIDTH= 1000;
const CANVAS_HEIGHT = 400;
let constants = {
  WIDTH : 700,
  HEIGHT : 400
};

let initMethods = {
  init(context) {
    context.canvas.width = constants.WIDTH;
    context.canvas.height = constants.HEIGHT;
    context.fillRect(CANVAS_X_START_POINT, CANVAS_Y_START_POINT, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

export { constants, initMethods };
