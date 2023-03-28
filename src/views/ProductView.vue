<template>
  <div>
    <h1>{{ product.title }}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductView',
  computed: {
    ...mapState('products', ['product', 'loading', 'error'])
  },
  methods: {
    ...mapActions('products', ['getProductById']),
    async loadProduct() {
      const id = this.$route.params.id;
      await this.getProductById(id);
    }
  },
  mounted() {
    this.loadProduct();
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