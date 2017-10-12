import { constants } from './init.js';

export class Bunker {

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  show() {
    this.context.fillStyle = 'grey';
    this.context.fillRect(this.x, this.y, 10, 10);
  }

  hit(projectile) {
    return Math.abs(projectile.x - this.x) < 20 && projectile.y - this.y < 15;
  }

}
