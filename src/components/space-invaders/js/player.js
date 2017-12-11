import { constants } from './init.js';
import { Projectile } from './projectile.js';

const PLAYER_COLOR = 'white';
const START_HOR_POSITION = constants.WIDTH / 2;
const START_VER_POSITION = constants.HEIGHT - 22;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const HOR_MOVEMENT = 5;

// Player ship with constant vertical position
export class playerShip {

  constructor(context) {
    this.x = START_HOR_POSITION;
    this.context = context;
  }

  show() {
    this.context.fillStyle = PLAYER_COLOR;
    this.context.fillRect(this.x, START_VER_POSITION, PLAYER_WIDTH, PLAYER_HEIGHT);
  }

  clear() {
    this.context.clearRect(this.x, START_VER_POSITION, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.context.fillStyle = constants.CANVAS_COLOR;
    this.context.fillRect(this.x, START_VER_POSITION, PLAYER_WIDTH, PLAYER_HEIGHT);
  }

  // Removes previous drawing of ship and redraws at new position
  move(dir) {
    this.clear();
    if (dir == "right") {
      this.x += HOR_MOVEMENT;
    } else if (dir == "left") {
      this.x -= HOR_MOVEMENT;
    }
    this.show();
  }

  shoot() {
    let pewPew = new Projectile(this.context, this.x);
    return pewPew;
  }

}
