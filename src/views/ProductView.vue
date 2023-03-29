<template>
  <div class="container px-5 py-20 mx-auto">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="md:flex-1 px-4">
        <div class="h-64 md:h-80 rounded-lg mb-4 flex items-center justify-center">
          <img :src="product.image" alt="Product" class="h-80 w-72 object-contain rounded-t-xl px-5" />
        </div>
      </div>
      <div class="md:flex-1 px-4">
        <h4 class="font-bold text-orange mb-2 uppercase text-xs tracking-widest">
          <router-link :to="`/category/${product.category}`">
            {{ product.category }}
          </router-link>
        </h4>
        <h1 class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl">{{ product.title }}</h1>
        <p class="text-dark-grayish mb-6 text-base sm:text-lg">{{ product.description }}</p>
        <div class="flex items-center justify-between mb-6 sm:flex-col sm:items-start">
          <div class="flex items-center gap-4">
            <h3 class="text-very-dark font-bold text-3xl inline-block">${{ product.price }}</h3>
          </div>
        </div>
        <div class="flex pt-5 border-t-2 border-gray-100 mt-5">
          <div class="w-1/4 h-10 text-sm bg-light py-2 flex items-center justify-between rounded-lg font-bold relatives">
            <div id="minus" class="plus-minus" @click="decreaseAmount">
              <div class="w-2 h-1 bg-orange absolute cursor-pointer" id="minus"></div>
							<svg width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<defs>
									<path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"></path>
								</defs>
								<use fill="#000" fill-rule="nonzero" xlink:href="#a"></use>
							</svg>
            </div>
            <span id="amount" class="select-none">{{ amount }}</span>
            <div id="plus" class="plus-minus cursor-pointer" @click="increaseAmount">
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="plus">
								<defs>
									<path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"></path>
								</defs>
								<use fill="#000" fill-rule="nonzero" xlink:href="#b" id="plus"></use>
							</svg>
            </div>
					</div>
          <button type="button" class="ml-auto h-10 px-6 py-2 font-semibold rounded-xl bg-slate-500 hover:bg-black text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="text-gray-600 body-font">
      <div class="container px-5 py-20 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">More Products From Same Category</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductView',
  components: {
  },
  data() {
    return {
      amount: 0
    }
  },
  computed: {
    ...mapState('products', ['product', 'products', 'loading', 'error'])
  },
  methods: {
    ...mapActions('products', ['getProductById', 'getAllProducts']),
    async loadProduct() {
      const id = this.$route.params.id;
      await this.getProductById(id);
    },
    async loadProducts() {
      await this.getAllProducts();
    },
    increaseAmount() {
      this.amount += 1;
    },
    decreaseAmount() {
      if (this.amount > 0) {
        this.amount -= 1;
      }
    }
  },
  mounted() {
    this.loadProduct();
    this.loadProducts()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.product) {
        document.title = vm.product.title;
      }
    });
  },
  watch: {
    product(newProduct) {
      if (newProduct) {
        document.title = newProduct.title;
      }
    }
  }
}
</script>