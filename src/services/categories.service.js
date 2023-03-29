import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products/category/';
const API_URL_2 = 'https://fakestoreapi.com/products/categories';

class CategoriesService {
  getAll() {
    return axios.get(API_URL_2);
  }
  getByName(name) {
    return axios.get(API_URL + name);
  }
}

export default new CategoriesService();