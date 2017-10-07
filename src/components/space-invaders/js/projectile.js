import { constants } from './init.js';

export class Projectile {

  constructor(context, x) {
    this.x = x + 7;
    this.y = constants.HEIGHT - 35;
    this.context = context;
  }

  show() {
    this.context.fillStyle = 'blue';
    this.context.fillRect(this.x, this.y, 5, 10);
  }

  clear() {
    this.context.clearRect(this.x, this.y, 5, 10);
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 5, 10);
  }

  move() {
    // Remove previous projectile drawing
    this.clear();
    // Move projectile up
    this.y -= 5;
    // Draw projectile at updated position
    this.show();
  }
}
