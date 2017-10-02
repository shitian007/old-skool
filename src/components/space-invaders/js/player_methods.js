import { constants } from './init.js';

export class playerShip {

  constructor(context) {
    this.x = constants.WIDTH / 2;
    this.context = context;
  }
  // Draws the ship on the canvas
  show() {
    // Args: x, y, width, height
    this.context.fillStyle = 'white';
    this.context.fillRect(this.x, constants.HEIGHT - 22, 20, 20);
  }

}
