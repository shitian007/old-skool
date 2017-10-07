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
      bunkers: []
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
        this.playerMovement = this.player.x > 10 ? "l" : null;
      } else if (input == "ArrowRight") {
        this.playerMovement = this.player.x < 680 ? "r" : null;
      } else if (input == " ") {
        let playerProjectile = this.player.shoot();
        this.playerProjectiles.push(playerProjectile);
        this.setProjectileInterval(playerProjectile);
      }
    },
    setProjectileInterval(projectile) {
      let timerID = window.setInterval(
        function() {
          projectile.move();
        }, 100
      );
      this.pPIntervalIDs.push(timerID);
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
      this.bunkers.push(new Bunker(this.context, 40 + i * 180));
      this.bunkers[i].show();
      for (var j = 0; j < 12; j++) {
        this.enemies.push(new EnemySaucer(this.context, (j+1) * 50, (i+1) * 25));
        this.enemies[i * 12 + j].show();
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
      if (self.playerMovement == "r") self.player.move("right");
      if (self.playerMovement == "l") self.player.move("left");
      self.enemyMove();
    }, 50);
  }
};
