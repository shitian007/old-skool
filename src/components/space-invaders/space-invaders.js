import { constants, initMethods } from './js/init.js';
import { playerShip } from './js/player_methods.js';

export default {
  name: 'space-invaders',
  data() {
    return {
      context: null,
      player: null,
      health: 5,
      playerProjectiles: [],
      enemies: [],
      enemyProjectiles: []
    };
  },
  mounted() {
    let self = this;
    // Get context and initialize
    this.context = this.$refs.canvas.getContext('2d');
    initMethods.init(this.context);
    // Instantiate player and show it
    this.player= new playerShip(this.context);
    this.player.show();
  }
};
