<template>
  <div class="container mx-auto py-20">
    <div class="flex my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Cart</h1>
          <h2 class="font-semibold text-2xl">{{ totalItems }} Items</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>
        <div v-if="cartItems.length === 0" class="mt-10">
          Your cart is empty.
        </div>
        <div v-else class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" v-for="(item, index) in cartItems" :key="item.id">
          <div class="flex w-2/5">
            <div class="w-20">
              <img class="h-24" :src="item.details.image" :alt="item.details.title">
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">{{ item.details.title }}</span>
              <span class="text-red-500 text-xs">{{ item.details.category }}</span>
              <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs" @click.prevent="removeItemFromCart(item)">Remove</a>
            </div>
          </div>
          <div class="flex justify-center w-1/5">
            <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" @click="decreaseQuantity(item)">
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
            <input class="mx-2 border text-center w-8" type="text" v-model="item.quantity" @change="updateQuantity(item)" readonly>
            <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" @click="increaseQuantity(item)">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span class="text-center w-1/5 font-semibold text-sm">${{ item.details.price }}</span>
          <span class="text-center w-1/5 font-semibold text-sm">${{ totalCostsPerItem[index].toFixed(2) }}</span>
        </div>

        <div class="flex flex-row justify-between mt-10">
          <router-link class="flex font-semibold text-indigo-600 text-sm mt-10" to="/">
            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
            </svg>
            Continue Shopping
          </router-link>
          <button class="bg-indigo-400 font-semibold hover:bg-indigo-600 text-sm text-white uppercase w-48 h-10 mt-5" @click="clearItemsFromCart()">Clear Cart</button>
        </div>

      </div>
      <div id="summary" class="w-1/4 px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${{ totalCostsCart.toFixed(2) }}</span>
          </div>
          <button class="bg-indigo-700 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CartView',
  data() {
    return {
      cartItems: []
    }
  },
  computed: {
    ...mapState('cart', ['items']),
    ...mapState('products', ['product', 'loading', 'error']),
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalCostsPerItem() {
      return this.items.map(item => item.price * item.quantity);
    },
    totalCostsCart() {
      return this.cartItems.reduce((total, item) => total + item.details.price * item.quantity, 0);
    }
  },
  methods: {
    ...mapActions('cart', ['clearCart', 'removeFromCart', 'updateCartItem']),
    ...mapActions('products', ['getProductById']),
    removeItemFromCart(item) {
      this.removeFromCart(item.id);
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    },
    increaseQuantity(item) {
      item.quantity++;
      this.updateCartItem(item);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCartItem(item);
      }
    },
    clearItemsFromCart() {
      this.clearCart();
      this.cartItems = [];
    },
    async loadCartItems() {
      const promises = this.items.map(async item => {
        const product = {...item};
        await this.getProductById(product.id);
        product.details = {...this.product};
        return product;
      });
      this.cartItems = await Promise.all(promises);
    }
  },
  created() {
    this.loadCartItems();
  }
}
</script>