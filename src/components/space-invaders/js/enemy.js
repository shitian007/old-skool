import { constants } from './init.js';

const ENEMY_COLOR = 'red';
const ENEMY_SAUCER_WIDTH = 30;
const ENEMY_SAUCER_HEIGHT = 20;
const HIT_BOX_HOR_RANGE = 20;
const HIT_BOX_VER_RANGE = 15;
const HOR_MOVEMENT = 1;
const VER_MOVEMENT = 5;

export class EnemySaucer {

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  // Draws enemy saucer onto canvas
  show() {
    this.context.fillStyle = ENEMY_COLOR;
    this.context.fillRect(this.x, this.y, ENEMY_SAUCER_WIDTH, ENEMY_SAUCER_HEIGHT);
  }

  clear() {
    this.context.clearRect(this.x, this.y, ENEMY_SAUCER_WIDTH, ENEMY_SAUCER_HEIGHT);
    this.context.fillStyle = constants.CANVAS_COLOR;
    this.context.fillRect(this.x, this.y, ENEMY_SAUCER_WIDTH, ENEMY_SAUCER_HEIGHT);
  }

  // Enemies can only move sideways and downwards
  move(dir) {
    this.clear();
    // Redraw enemy saucer
    if (dir == "right") {
      this.x += HOR_MOVEMENT;
    } else if (dir == "left") {
      this.x -= HOR_MOVEMENT;
    } else if (dir == "down") {
      this.y += VER_MOVEMENT;
    }
    this.show();
  }

  // test if projectile hits ship
  hit(projectile) {
    return Math.abs(projectile.x - this.x) < HIT_BOX_HOR_RANGE
      && projectile.y - this.y < HIT_BOX_VER_RANGE;
  }
}
