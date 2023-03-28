import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

class ProductsService {
  getAllProducts() {
    return axios.get(API_URL);
  }
}

export default new ProductsService();