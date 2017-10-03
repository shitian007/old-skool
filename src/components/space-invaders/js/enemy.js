import { constants } from './init.js';

export class enemySaucer {

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
    this.context.clearRect(this.x, this.y, 20, 20);
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 20, 20);
  }

  // Enemies can only move sideways and downwards
  move(dir) {
    // Redraw enemy saucer
    if (dir == "right") {
      this.x += 5;
    } else if (dir == "left") {
      this.x -= 5;
    } else if (dir == "down") {
      this.y -= 10;
    }
    this.show();
  }
}
