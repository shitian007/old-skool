let constants = {
  WIDTH : 700,
  HEIGHT : 400
};

let initMethods = {
  init(context) {
    context.canvas.width = constants.WIDTH;
    context.canvas.height = constants.HEIGHT;
    context.fillRect(10, 10, 1000, 400);
  }
};

export { constants, initMethods };
