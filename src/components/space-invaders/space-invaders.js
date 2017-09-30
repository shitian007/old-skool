import { constants, initMethods } from './js/init.js';

export default {
  name: 'space-invaders',
  data() {
    return {
      playerCoord: {x: 350, y: 50},
      health: 5,
      playerProjectiles: [],
      enemies: [],
      enemyProjectiles: []
    };
  },
  mounted() {
    initMethods.init(this.$refs.canvas);
  }
};
