<template>
<div>
  <h2>Games</h2>
  <h3>{{ welcomeMessage }}</h3>
  <div class="games-list">
    <div class="game-link">
      <router-link to="/space-invaders">Space Invaders</router-link>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        welcomeMessage: 'Indulge in your favourite pastimes'
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
