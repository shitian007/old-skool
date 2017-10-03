import { constants } from './init.js';

export class Bunker {

  constructor(context, x) {
    this.x = x;
    this.y = constants.HEIGHT - 100;
    this.context = context;
  }

  show() {
    this.context.fillStyle = 'grey';
    this.context.fillRect(this.x, this.y, 80, 50);
  }

}
