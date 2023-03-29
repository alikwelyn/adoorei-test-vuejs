<template>
  <div id="app">
    <NavBar @search="searchProducts"/>
    <router-view :searchTerm="searchTerm"/>
    <FooterNavigation/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterNavigation from './components/Footer.vue'
export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  components: {
    NavBar,
    FooterNavigation
  },
  methods: {
    searchProducts(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
  watch: {
    $route() {
      this.searchTerm = '';
    }
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
