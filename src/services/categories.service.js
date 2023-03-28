import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products/category/';

class CategoriesService {
  getAll() {
    return axios.get(API_URL);
  }
  getByName(name) {
    return axios.get(API_URL + name);
  }
}

export default new CategoriesService();