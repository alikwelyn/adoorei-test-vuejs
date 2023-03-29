export const cart = {
  namespaced: true,
  state: {
    items: JSON.parse(localStorage.getItem('cart')) || []
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    updateCartItem({ commit }, item) {
      commit('updateCartItem', item);
    },
    removeFromCart({ commit }, itemId) {
      commit('removeFromCart', itemId);
    },
    clearCart({ commit }) {
      commit('clearCart');
    }
  },
  mutations: {
    addToCart(state, product) {
      const index = state.items.findIndex(cartItem => cartItem.id === product.id);
      if (index !== -1) {
        state.items[index].quantity += product.quantity;
      } else {
        state.items.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));

    },
    updateCartItem(state, item) {
      const index = state.items.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        state.items.splice(index, 1, item);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    removeFromCart(state, itemId) {
      state.items = state.items.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cart');
    }
  }
};