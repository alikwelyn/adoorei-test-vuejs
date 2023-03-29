<template>
  <div class="navbar bg-slate-500">
    <nav class="relative px-4 py-4 flex justify-between items-center">
      <router-link
        class="flex items-center"
        to="/"><img src="https://www.adoorei.com.br/wp-content/uploads/2022/03/LOGO-ADOREI.svg" class="h-6 mr-3 sm:h-9" alt="Adoorei Logo" />
      </router-link>
      <div class="lg:hidden">
        <button class="navbar-burger flex items-center text-blue-600 p-3">
          <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li class="mb-1">
          <router-link
            class="text-sm text-gray-400 hover:text-gray-500"
            to="/">Home
          </router-link>
        </li>
        <li class="mb-1" v-for="(category, index) in categories" :key="index">
          <router-link
            class="text-sm text-gray-400 hover:text-gray-500"
            :to="`${$route.fullPath.includes('/category') ? '' : '/category/'}${category}`">{{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </router-link>
        </li>
      </ul>
      <div class="flex flex-row items-center">
        <div class="mr-10">
          <router-link to="/cart">
            <div class="flex items-center justify-center">
              <div class="relative scale-75">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-black">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span class="absolute -top-2 left-4 rounded-full bg-white p-0.5 px-2 text-sm text-black">{{ totalItems }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div>
          <form @submit.prevent>
            <label class="hidden" for="search-form">Search</label>
            <input v-model="searchTerm" @input="searchProducts" class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search" type="text">
            <button @click="searchProducts" class="hidden">Submit</button>
          </form>
        </div>
      </div>
    </nav>
    <div class="navbar-menu relative z-50 hidden">
      <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-3/5 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div class="flex items-center mb-8">
            <router-link
              class="mr-auto text-3xl font-bold leading-none"
              to="/"><img src="https://www.adoorei.com.br/wp-content/uploads/2022/03/LOGO-ADOREI.svg" class="h-6 mr-3 sm:h-9" alt="Adoorei Logo" />
            </router-link>
            <button class="navbar-close">
              <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li class="mb-1">
                <router-link
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                to="/">Home
                </router-link>
              </li>
              <li class="mb-1">
                <router-link
                class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                to="/about">About
                </router-link>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <div class="pt-6">
              <form class="mb-4 w-full md:mb-0 md:w-1/6">
                <label class="hidden" for="search-form">Search</label>
                <input class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search" type="text">
                <button class="hidden">Submit</button>
              </form>
            </div>
          </div>
        </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "NavBar",
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapState('categories', ['categories', 'loading', 'error']),
    ...mapState({
      items: state => state.cart.items
    }),
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  },
  methods: {
    ...mapActions('categories', ['getAllCategories']),
    async loadCategories() {
      await this.getAllCategories();
    },
    initializeBurgerMenus() {
      const burgerButtons = Array.from(document.querySelectorAll('.navbar-burger'));
      const menuItems = Array.from(document.querySelectorAll('.navbar-menu'));

      burgerButtons.forEach(button => {
        button.addEventListener('click', () => {
          menuItems.forEach(menu => {
            menu.classList.toggle('hidden');
          });
        });
      });
    },
    initializeCloseMenus() {
      const closeButtons = Array.from(document.querySelectorAll('.navbar-close'));
      const backdropItems = Array.from(document.querySelectorAll('.navbar-backdrop'));
      const menuItems = Array.from(document.querySelectorAll('.navbar-menu'));

      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          menuItems.forEach(menu => {
            menu.classList.toggle('hidden');
          });
        });
      });

      backdropItems.forEach(item => {
        item.addEventListener('click', () => {
          menuItems.forEach(menu => {
            menu.classList.toggle('hidden');
          });
        });
      });
    },
    searchProducts() {
      this.$emit('search', this.searchTerm.trim());
    }
  },
  mounted() {
    this.initializeBurgerMenus();
    this.initializeCloseMenus();
    this.loadCategories();
  },
};
</script>