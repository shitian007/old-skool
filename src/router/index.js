import Vue from 'vue';
import Router from 'vue-router';
// @ is replaced with src by Webpack
import Home from '@/components/home/Home';
import SpaceInvaders from '@/components/space-invaders/SpaceInvaders';

Vue.use(Router);

export default new Router({
  // Remove hashbang
  mode: 'history',
  routes: [
    {
      // Default redirect to home
      path: '*',
      name: 'home',
      component: Home
    },
    {
      path: '/space-invaders',
      name: 'space-invaders',
      component: SpaceInvaders
    }
  ]
});