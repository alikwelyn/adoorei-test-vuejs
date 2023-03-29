import ProductsService from '@/services/products.service';

export const products = {
  namespaced: true,
  state: {
    products: {},
    product: {},
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
    },
    async getProductById({ commit }, id) {
      try {
        commit('setLoading', true);
        const product = await ProductsService.getById(id);
        commit('setSingle', product.data);
        commit('setLoading', false);
        return Promise.resolve(product.data);
      } catch (error) {
        commit('setFailure', error);
        commit('setLoading', false);
        return Promise.reject(error);
      }
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setSingle(state, product) {
      state.product = product
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setFailure(state, error) {
      state.error = error;
    },
  }
};