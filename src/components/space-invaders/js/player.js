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

  clear() {
    this.context.clearRect(this.x, constants.HEIGHT - 22, 20, 20);
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, constants.HEIGHT - 22, 20, 20);
  }

  move(dir) {
    // Remove previous drawing of player ship
    this.clear();
    // Draw player ship at updated position
    if (dir == "right") {
      this.x += 5;
    } else if (dir == "left") {
      this.x -= 5;
    }
    this.show();
  }

}
