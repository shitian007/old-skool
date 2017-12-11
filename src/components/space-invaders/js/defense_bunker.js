import { constants } from './init.js';

const BUNKER_WIDTH = 10;
const BUNKER_HEIGHT = 10;
const HIT_BOX_RANGE = 5;

// Destructible bunker object as buffer between player ship and enemy ships
export class Bunker {

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  show() {
    this.context.fillStyle = 'grey';
    this.context.fillRect(this.x, this.y, BUNKER_WIDTH, BUNKER_HEIGHT);
  }

  clear() {
    this.context.clearRect(this.x, this.y, BUNKER_WIDTH, BUNKER_HEIGHT);
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, BUNKER_WIDTH, BUNKER_HEIGHT);
  }

  hit(projectile) {
    return Math.abs(projectile.x - this.x) < HIT_BOX_RANGE
      && projectile.y - this.y < HIT_BOX_RANGE;
  }

}
