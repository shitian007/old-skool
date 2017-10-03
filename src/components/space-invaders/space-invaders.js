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
      playerProjectiles: [],
      enemies: [],
      projectiles: [],
      bunkers: []
    };
  },
  methods: {
    keyInput(e) {
      let input = e.key;
      if (input == "ArrowLeft") {
        this.player.move("left");
      } else if (input == "ArrowRight") {
        this.player.move("right");
      } else if (input == " ") {
        // this.player.shoot();
      }
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
        this.enemies.push(new EnemySaucer(this.context, (j+1) * 50, (i+1) * 25));
        this.enemies[i * 12 + j].show();
      }
    }
    // Initialize bunkers
    for (i = 0; i < 4; i++) {
      this.bunkers.push(new Bunker(this.context, 40 + i * 180));
      this.bunkers[i].show();
    }
    // Capture user keypress
    window.addEventListener("keypress", function(e) {
      self.keyInput(e);
    });
  }
};
