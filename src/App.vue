<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <FooterNavigation/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterNavigation from './components/Footer.vue'
export default {
  components: {
    NavBar,
    FooterNavigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
