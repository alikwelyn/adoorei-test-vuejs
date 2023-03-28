<template>
  <div class="home">
    <HeroBanner img="banner-home.jpg" title="Bem vindo a nossa loja!" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." button="Compre agora"/>
    <div class="text-gray-600 body-font">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Products</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            <div 
              class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
              v-for="product in products" :key="product.id"
            >
              <a href="#">
                <CardProduct :img="product.image" :category="product.category" :name="product.title" :price="product.price.toString()"/>
              </a>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue'
import CardProduct from '@/components/CardProduct.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HeroBanner,
    CardProduct
  },
  computed: {
  ...mapState('products', ['products', 'loading', 'error'])
  },
  methods: {
    ...mapActions('products', ['getAllProducts']),
    async loadProducts() {
      await this.getAllProducts();
    }
  },
  mounted() {
    this.loadProducts();
  },
}
</script>
