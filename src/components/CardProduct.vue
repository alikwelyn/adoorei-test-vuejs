<template>
    <div :id="id">
        <img :src="img" :alt="name" class="h-80 w-72 object-contain rounded-t-xl px-5" />
            <div class="px-4 py-3 w-72">
                <span class="text-gray-400 mr-3 uppercase text-xs">
                    <router-link :to="`/category/${category}`">
                        {{ category }}
                    </router-link>
                </span>
                <router-link :to="`/product/${id}`">
                    <p class="text-lg font-bold text-black truncate block capitalize">{{ name }}</p>
                </router-link>
                <div class="flex items-center">
                <p class="text-lg font-semibold text-black cursor-auto my-3">${{ price }}</p>
                <div class="ml-auto">
                    <button class="rounded-full bg-slate-500 text-white hover:bg-white hover:text-black hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300" @click="addToCart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus m-auto" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: {
    id: Number,
    img: {
      type: String
    },
    category: String,
    name: String,
    price: String,
  },
  methods: {
    addToCart() {
        this.$store.dispatch('cart/addToCart', {
            id: this.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity
        });
    }
  }
}
</script>