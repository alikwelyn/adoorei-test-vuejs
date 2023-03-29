import Vue from 'vue';
import Vuex from 'vuex';

import { products } from './products.module';
import { categories } from './categories.module';
import { cart } from './cart.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    categories,
    cart
  }
});