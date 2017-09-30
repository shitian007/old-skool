let constants = {
  WIDTH : 700,
  HEIGHT : 400
};

let initMethods = {
  init(canvas) {
    canvas.width = constants.WIDTH;
    canvas.height = constants.HEIGHT;
    canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
  }
};

export { constants, initMethods };
