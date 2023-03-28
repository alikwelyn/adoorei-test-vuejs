<template>
  <div class="text-gray-600 body-font">
    <div class="container px-5 py-20 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $route.params.id.charAt(0).toUpperCase() + $route.params.id.slice(1) }}</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <div 
          class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          v-for="product in category" :key="product.id"
        >
          <router-link :to="`/product/${product.id}`">
            <CardProduct :img="product.image" :category="product.category" :name="product.title" :price="product.price.toString()"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from '@/components/CardProduct.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoryView',
  components: {
    CardProduct
  },
  data() {
    return {
      amount: 0
    }
  },
  computed: {
    ...mapState('categories', ['category', 'loading', 'error'])
  },
  methods: {
    ...mapActions('categories', ['getCategoryByName']),
    async loadCategory() {
      const encodedName = encodeURIComponent(this.$route.params.id);
      const decodedName = decodeURIComponent(encodedName);
      await this.getCategoryByName(decodedName);
      console.log('Category loaded:', this.category);
    }
  },
  mounted() {
    this.loadCategory();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.category) {
        const capitalizedTitle = vm.$route.params.id.charAt(0).toUpperCase() + vm.$route.params.id.slice(1);
        document.title = capitalizedTitle;
      }
    });
  },
  watch: {
    category(newCategory) {
      if (newCategory) {
        const capitalizedTitle = this.$route.params.id.charAt(0).toUpperCase() + this.$route.params.id.slice(1);
        document.title = capitalizedTitle;
      }
    }
}
}
</script>