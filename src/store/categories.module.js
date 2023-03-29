import CategoriesService from '@/services/categories.service';

export const categories = {
  namespaced: true,
  state: {
    categories: {},
    category: {},
    error: null,
    loading: false
  },
  actions: {
    async getAllCategories({ commit }) {
      try {
        commit('setLoading', true);
        const categories = await CategoriesService.getAll();
        commit('setCategories', categories.data);
        commit('setLoading', false);
        return Promise.resolve(categories.data);
      } catch (error) {
        commit('setFailure', error);
        commit('setLoading', false);
        return Promise.reject(error);
      }
    },
    async getCategoryByName({ commit }, name) {
      try {
        commit('setLoading', true);
        const category = await CategoriesService.getByName(name);
        commit('setSingle', category.data);
        commit('setLoading', false);
        return Promise.resolve(category.data);
      } catch (error) {
        commit('setFailure', error);
        commit('setLoading', false);
        return Promise.reject(error);
      }
    },
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSingle(state, category) {
      state.category = category
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setFailure(state, error) {
      state.error = error;
    },
  }
};