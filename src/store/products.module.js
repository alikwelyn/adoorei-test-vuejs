import ProductsService from '@/services/products.service';

export const products = {
  namespaced: true,
  state: {
    products: {},
    error: null,
    loading: false
  },
  actions: {
    async getAllProducts({ commit }) {
      try {
        commit('setLoading', true);
        const products = await ProductsService.getAllProducts();
        commit('setProducts', products.data);
        commit('setLoading', false);
        return Promise.resolve(products.data);
      } catch (error) {
        commit('setFailure', error);
        commit('setLoading', false);
        return Promise.reject(error);
      }
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setFailure(state, error) {
      state.error = error;
    },
  }
};