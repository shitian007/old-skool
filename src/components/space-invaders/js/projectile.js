import { constants } from './init.js';

const PROJECTILE_WIDTH = 5;
const PROJECTILE_HEIGHT = 10;
const HOR_MOVEMENT = 1;
const VER_MOVEMENT = 10;
const START_HOR_POSITION_OFFSET = 7;
const START_VER_POSITION = constants.HEIGHT - 35;

// Player projectile fired at enemies
export class Projectile {

  constructor(context, x) {
    this.x = x + START_HOR_POSITION_OFFSET;
    this.y = START_VER_POSITION;
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
    this.y -= VER_MOVEMENT;
    // Draw projectile at updated position
    this.show();
  }

}
