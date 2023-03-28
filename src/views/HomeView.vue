<template>
  <div class="home">
    <HeroBanner img="banner-home.jpg" title="Bem vindo a nossa loja!" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." button="Compre agora"/>
  </div>
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue'

export default {
  name: 'HomeView',
  components: {
    HeroBanner
  }
}
</script>
