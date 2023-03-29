<template>
  <div class="text-gray-600 body-font">
    <div class="container px-5 py-20 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $route.params.id.charAt(0).toUpperCase() + $route.params.id.slice(1) }}</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between m-3 px-20">
        <span class="text-sm font-semibold">{{ numProducts }} Products</span>
        <button class="relative text-sm focus:outline-none group mt-4 sm:mt-0">
          <div class="flex items-center justify-between w-40 h-10 px-3 border-2 border-gray-300 rounded hover:bg-gray-300">
            <span class="font-medium">{{ selectedSortOption }}</span>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg rounded group-focus:flex">
            <a class="w-full px-4 py-2 text-left hover:bg-gray-200" v-for="opt in sortOptions" :value="opt.value" :key="opt.value" @click="updateSelectedSortOption(opt)">{{ opt.text }}</a>
          </div>
        </button>
      </div>

      <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <div 
          class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          v-for="product in filteredProducts" :key="product.id"
        >
          <CardProduct :id="product.id" :img="product.image" :category="product.category" :name="product.title" :price="product.price.toString()"/>
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
  props: {
    searchTerm: String
  },
  components: {
    CardProduct
  },
  data() {
    return {
      amount: 0,
      selectedSortOption: "Sort By",
      sortOptions: [
        { value: "title", text: "Name" },
        { value: "price", text: "Price" },
        { value: "rating", text: "Rating" },
      ],
    }
  },
  computed: {
    ...mapState('categories', ['category', 'loading', 'error']),
    numProducts() {
      if (this.category) {
        return this.category.length;
      } else {
        return 0;
      }
    },
    filteredProducts() {
      if (this.searchTerm.trim() === '') {
        return this.category;
      }
      const term = this.searchTerm.trim().toLowerCase();
      return this.category.filter(category =>
        category.title.toLowerCase().includes(term)
      );
    }
  },
  methods: {
    ...mapActions('categories', ['getCategoryByName']),
    async loadCategory() {
      const encodedName = encodeURIComponent(this.$route.params.id);
      const decodedName = decodeURIComponent(encodedName);
      await this.getCategoryByName(decodedName);
    },
    sortProducts(sortOrder, sortField) {
      if (this.category) {
        this.category.sort((a, b) => {
          if (sortField === 'title') {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return sortOrder === 'ascending' ? -1 : 1;
            } else if (nameA > nameB) {
              return sortOrder === 'ascending' ? 1 : -1;
            } else {
              return 0;
            }
          } else if (sortField === 'price') {
            if (a.price < b.price) {
              return sortOrder === 'ascending' ? -1 : 1;
            } else if (a.price > b.price) {
              return sortOrder === 'ascending' ? 1 : -1;
            } else {
              return 0;
            }
          } else if (sortField === 'rating') {
            if (a.rating.rate < b.rating.rate) {
              return sortOrder === 'ascending' ? -1 : 1;
            } else if (a.rating.rate > b.rating.rate) {
              return sortOrder === 'ascending' ? 1 : -1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        });
      }
    },
    updateSelectedSortOption(selectedOption) {
      this.selectedSortOption = selectedOption.text;
      this.sortProducts('ascending', selectedOption.value);
    },
  },
  mounted() {
    this.loadCategory();
  },
  beforeRouteUpdate(to, from, next) {
    this.loadCategory();
    next();
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