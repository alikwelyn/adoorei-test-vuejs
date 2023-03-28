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
        <li class="mb-1">
          <router-link
          class="text-sm text-gray-400 hover:text-gray-500"
          to="/about">About
          </router-link>
        </li>
      </ul>
      <form class="hidden lg:block mb-4 w-full md:mb-0 md:w-1/6">
        <label class="hidden" for="search-form">Search</label>
        <input class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search" type="text">
        <button class="hidden">Submit</button>
      </form>
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
export default {
  name: "NavBar",
  mounted() {
    this.initializeBurgerMenus();
    this.initializeCloseMenus();
  },
  methods: {
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
    }
  }
};
</script>