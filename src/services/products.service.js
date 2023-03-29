import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products/';

class ProductsService {
  getAllProducts() {
    return axios.get(API_URL);
  }
  getById(id) {
    return axios.get(API_URL + id);
  }
}

export default new ProductsService();