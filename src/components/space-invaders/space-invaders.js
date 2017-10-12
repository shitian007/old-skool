import { constants, initMethods } from './js/init.js';
import { playerShip } from './js/player.js';
import { EnemySaucer } from './js/enemy.js';
import { Bunker } from './js/defense_bunker.js';

export default {
  name: 'space-invaders',
  data() {
    return {
      context: null,
      player: null,
      health: 5,
      playerMovement: null,
      enemies: [],
      enemyMovement: { dir: 1, down: false},
      playerProjectiles: [],
      pPIntervalIDs: [],
      enemyProjectiles: [],
      ePIntervalIDs: [],
      bunkers: [],
      shotTimer: 0
    };
  },
  methods: {
    keyUp(e) {
      let input = e.key;
      if (input == "ArrowLeft" || input == "ArrowRight") {
        this.playerMovement = null;
      }
    },
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
        this.shotTimer = 10;
      }
    },
    playerMove() {
      if (this.playerMovement == "r" && this.player.x < 675) this.player.move("right");
      if (this.playerMovement == "l" && this.player.x > 15) this.player.move("left");
    },
    enemyMove() {
      let xMax = 0;
      let xMin = 500;
      for (var i = 0; i < this.enemies.length; i++) {
        xMax = this.enemies[i].x > xMax ? this.enemies[i].x : xMax;
        xMin = this.enemies[i].x < xMin ? this.enemies[i].x : xMin;
      }
      if (xMax > 660 && !this.enemyMovement.down) {
        this.enemyMovement.dir = -1; this.enemyMovement.down = true;
      } else if (xMin < 20 && !this.enemyMovement.down) {
        this.enemyMovement.dir = 1; this.enemyMovement.down = true;
      }
      for (i = 0; i < this.enemies.length; i++) {
        if (this.enemyMovement.down) {
          this.enemies[i].move("down");
        }
        this.enemyMovement.dir == 1 ? this.enemies[i].move("right") : this.enemies[i].move("left");
      }
      this.enemyMovement.down = false;
    },
    projectileMove() {
      for (var i = 0; i < this.playerProjectiles.length; i++) {
        let projectile = this.playerProjectiles[i];
        projectile.move();
        // Remove projectile if above canvas
        if (projectile.y < 20) {
          this.remove(this.playerProjectiles, i, projectile);
        } else {
          // Check bunker collision
          projectile.x < 140 ? this.bunkerCollision(0, i, projectile) :
            projectile.x < 265 ? this.bunkerCollision(1, i, projectile) :
            projectile.x < 390 ? this.bunkerCollision(2, i, projectile) :
            projectile.x < 515 ? this.bunkerCollision(3, i, projectile) :
            this.bunkerCollision(4, i, projectile);
          // Check enemy collision
          if (projectile) this.enemyCollision(i, projectile);
        }
      }
    },
    enemyCollision(index, projectile) {
      for (var i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i].hit(projectile)) {
          this.remove(this.enemies, i, this.enemies[i]);
          this.remove(this.playerProjectiles, index, projectile);
          break;
        }
      }
    },
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
    // Helper remove
    remove(arr, index, obj) {
      obj.clear();
      arr.splice(index, 1);
    }
  },
  mounted() {
    let self = this;
    // Get context and initialize canvas
    this.context = this.$refs.canvas.getContext('2d');
    initMethods.init(this.context);
    // Instantiate player
    this.player= new playerShip(this.context);
    this.player.show();
    // Initialize enemies
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 12; j++) {
        this.enemies.push(new EnemySaucer(this.context, (j+1) * 50, 120 - ((i+1) * 25)));
        this.enemies[i * 12 + j].show();
      }
    }
    // Initialize bunkers
    for (var k = 0; k < 5; k++) {
      this.bunkers[k] = [];
      for (i = 0; i < 5; i++) {
        for (j = 0; j < 8; j++) {
          this.bunkers[k].push(new Bunker(this.context, 60 + (k * 125)  + (j * 10), 290 + (i * 10)));
          this.bunkers[k][i * 8 + j].show();
          console.log(60 + k * 125);
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
    window.setInterval(function() {
      if (self.shotTimer > 0) self.shotTimer--;
      self.playerMove();
      self.projectileMove();
      self.enemyMove();
    }, 15);
  }
};
