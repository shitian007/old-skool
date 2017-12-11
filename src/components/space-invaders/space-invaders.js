import { constants, initMethods } from './js/init.js';
import { playerShip } from './js/player.js';
import { EnemySaucer } from './js/enemy.js';
import { Bunker } from './js/defense_bunker.js';

// Game State Constants
const GAME_WON = 1;
const GAME_OVER = -1;
const WINDOW_INTERVAL = 15;

// Player Constants
const SHOT_TIMER = 20;
const PLAYER_RIGHT_BOUND = 675;
const PLAYER_LEFT_BOUND = 15;
const PROJECTILE_UPPER_LIMIT = 20;

// Enemy Initialization Constants
const ENEMY_ROWS = 4;
const ENEMY_COLS = 12;
const ENEMY_START_Y_COORD = 120;
const ENEMY_WIDTH_SPACING = 50;
const ENEMY_HEIGHT_SPACING = 25;
// Enemy Movement Constants
const ENEMY_RIGHT_BOUND = 660;
const ENEMY_LEFT_BOUND = 20;
const ENEMY_MOVE_LEFT = -1;
const ENEMY_MOVE_RIGHT = 1;

// Bunker Initialization Constants
const NUM_BUNKERS = 5;
const BUNKER_WIDTH_BLOCKS = 8;
const BUNKER_HEIGHT_BLOCKS = 5;
const BUNKER_START_X_COORD = 60;
const BUNKER_START_Y_COORD = 290;
const BUNKER_WIDTH_SPACING = 125;
const BUNKER_BLOCK_WIDTH_SPACING = 10;
const BUNKER_BLOCK_HEIGHT_SPACING = 10;
// Bunker Collision Constants
const FIRST_BUNKER_RIGHTBOUND = 140;
const SECOND_BUNKER_RIGHTBOUND = 265;
const THIRD_BUNKER_RIGHTBOUND = 390;
const FOURTH_BUNKER_RIGHTBOUND = 515;
const FIFTH_BUNKER_RIGHTBOUND = 640;

// Space Invaders Main component
export default {
  name: 'space-invaders',
  data() {
    return {
      context: null,
      player: null,
      health: 5,
      playerMovement: null,
      enemies: [],
      enemyMovement: { dir: ENEMY_MOVE_RIGHT, down: false},
      playerProjectiles: [],
      enemyProjectiles: [],
      bunkers: [],
      shotTimer: 0,
      intervalID: null,
      gameover: GAME_OVER
    };
  },
  methods: {
    // Register keyUp event for player movement
    keyUp(e) {
      let input = e.key;
      if (input == "ArrowLeft" || input == "ArrowRight") {
        this.playerMovement = null;
      }
    },
    // Register keyDown event for player movement and shooting, shotTimer limits the interval between projectiles
    keyDown(e) {
      let self = this;
      let input = e.key;
      if (input == "ArrowLeft") {
        this.playerMovement = "l";
      } else if (input == "ArrowRight") {
        this.playerMovement = "r";
      } else if (input == " " && this.shotTimer == 0) {
        let playerProjectile = this.player.shoot();
        this.playerProjectiles.push(playerProjectile);
        this.shotTimer = SHOT_TIMER;
      }
    },
    // Player movement limited by right and left bounds of canvas
    playerMove() {
      if (this.playerMovement == "r" && this.player.x < PLAYER_RIGHT_BOUND) this.player.move("right");
      if (this.playerMovement == "l" && this.player.x > PLAYER_LEFT_BOUND) this.player.move("left");
    },
    // Enemy Movement limited by the left and right boundaries of the enemies as a block
    enemyMove() {
      let xMax = ENEMY_LEFT_BOUND;
      let xMin = ENEMY_RIGHT_BOUND;
      for (var i = 0; i < this.enemies.length; i++) {
        xMax = this.enemies[i].x > xMax ? this.enemies[i].x : xMax;
        xMin = this.enemies[i].x < xMin ? this.enemies[i].x : xMin;
      }
      if (xMax > ENEMY_RIGHT_BOUND && !this.enemyMovement.down) {
        this.enemyMovement.dir = ENEMY_MOVE_LEFT;
        this.enemyMovement.down = true;
      } else if (xMin < ENEMY_LEFT_BOUND && !this.enemyMovement.down) {
        this.enemyMovement.dir = ENEMY_MOVE_RIGHT;
        this.enemyMovement.down = true;
      }
      for (i = 0; i < this.enemies.length; i++) {
        if (this.enemyMovement.down) {
          this.enemies[i].move("down");
        }
        this.enemyMovement.dir == ENEMY_MOVE_RIGHT ? this.enemies[i].move("right") : this.enemies[i].move("left");
      }
      this.enemyMovement.down = false;
    },
    // Checks projectile collision and deletes if projectile out of canvas
    projectileMove() {
      for (var i = 0; i < this.playerProjectiles.length; i++) {
        let projectile = this.playerProjectiles[i];
        projectile.move();
        if (projectile.y < PROJECTILE_UPPER_LIMIT) {
          this.remove(this.playerProjectiles, i, projectile);
        } else {
          projectile.x < FIRST_BUNKER_RIGHTBOUND ? this.bunkerCollision(0, i, projectile) :
          projectile.x < SECOND_BUNKER_RIGHTBOUND ? this.bunkerCollision(1, i, projectile) :
          projectile.x < THIRD_BUNKER_RIGHTBOUND ? this.bunkerCollision(2, i, projectile) :
          projectile.x < FOURTH_BUNKER_RIGHTBOUND ? this.bunkerCollision(3, i, projectile) :
          projectile.x < FIFTH_BUNKER_RIGHTBOUND ? this.bunkerCollision(4, i, projectile) :
          {};
          if (projectile) {
            this.enemyCollision(i, projectile);
          }
        }
      }
    },
    // Check for collision of projectile and enemy, remove if necessary
    enemyCollision(index, projectile) {
      for (var i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i].hit(projectile)) {
          this.remove(this.enemies, i, this.enemies[i]);
          this.remove(this.playerProjectiles, index, projectile);
          break;
        }
      }
    },
    // Check for collision of projectile and bunker, remove if necessary
    bunkerCollision(bunkerNum, index, projectile) {
      let bunker = this.bunkers[bunkerNum];
      for (var i = 0; i < bunker.length; i++) {
        if (bunker[i].hit(projectile)) {
          this.remove(bunker, i, bunker[i]);
          this.remove(this.playerProjectiles, index, projectile);
          break;
        }
      }
    },
    // Removal of object: Enemy or Bunker
    remove(arr, index, obj) {
      obj.clear();
      arr.splice(index, 1);
    },
    // Checks: enemies destroyed, bunkers destroyed, defaults to GAME_OVER state
    checkGameState() {
      var destroyed = true;
      for (var i = 0; i < 5; i++) {
        if (this.bunkers[i].length != 0) {
          destroyed = false;
        }
      }
      if (destroyed) {
        return GAME_OVER;
      } else if (this.enemies.length < 1) {
        return GAME_WON;
      } else {
        return GAME_OVER;
      }
    },
    // Initializes Enemies and Bunkers on screen
    init() {
      var i;
      var j;
      var k;
      let self = this;
      // Get context and initialize canvas
      this.context = this.$refs.canvas.getContext('2d');
      initMethods.init(this.context);
      // Instantiate player
      this.player= new playerShip(this.context);
      this.player.show();
      // Initialize enemies
      for (i = 0; i < ENEMY_ROWS; i++) {
        for (j = 0; j < ENEMY_COLS; j++) {
          this.enemies.push(new EnemySaucer(this.context,
                                            (j + 1) * ENEMY_WIDTH_SPACING,
                                            ENEMY_START_Y_COORD - ((i + 1) * ENEMY_HEIGHT_SPACING)));
          this.enemies[i * ENEMY_COLS + j].show();
        }
      }
      // Initialize bunkers
      for (k = 0; k < NUM_BUNKERS; k++) {
        this.bunkers[k] = [];
        for (i = 0; i < BUNKER_HEIGHT_BLOCKS; i++) {
          for (j = 0; j < BUNKER_WIDTH_BLOCKS; j++) {
            this.bunkers[k].push(new Bunker(this.context,
                                            BUNKER_START_X_COORD + (k * BUNKER_WIDTH_SPACING)  + (j * BUNKER_BLOCK_WIDTH_SPACING),
                                            BUNKER_START_Y_COORD + (i * BUNKER_BLOCK_HEIGHT_SPACING)));
            this.bunkers[k][i * BUNKER_WIDTH_BLOCKS + j].show();
          }
        }
      }
      // Capture user keypress
      window.addEventListener("keydown", function(e) {
        self.keyDown(e);
      });
      window.addEventListener("keyup", function(e) {
        self.keyUp(e);
      });
      // Interval updates
      self.intervalID = window.setInterval(function() {
        if (self.gameover != GAME_OVER) {
          window.clearInterval(self.intervalID);
          self.gameoverScreen();
        }
        if (self.shotTimer > 0) {
          self.shotTimer--;
        }
        self.playerMove();
        self.projectileMove();
        self.enemyMove();
      }, WINDOW_INTERVAL);
    }
  },
  mounted() {
    if (this.gameover == GAME_OVER) this.init();
  }
};
