import { constants } from './init.js';

export class EnemySaucer {

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  // Draws enemy saucer onto canvas
  show() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, 30, 20);
  }

  clear() {
    this.context.clearRect(this.x, this.y, 30, 20);
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 30, 20);
  }

  // Enemies can only move sideways and downwards
  move(dir) {
    this.clear();
    // Redraw enemy saucer
    if (dir == "right") {
      this.x += 1;
    } else if (dir == "left") {
      this.x -= 1;
    } else if (dir == "down") {
      this.y += 5;
    }
    this.show();
  }

  // test if projectile hits ship
  hit(projectile) {
    return Math.abs(projectile.x - this.x) < 22 && projectile.y - this.y < 15;
  }
}
