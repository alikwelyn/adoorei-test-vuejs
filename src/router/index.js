import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CategoryView from '../views/CategoryView.vue'
import CartView from '../views/CartView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView,
    props: true,
    meta: {
      title: 'Product'
    }
  },
  {
    path: '/category/:id',
    name: 'category',
    component: CategoryView,
    props: true,
    meta: {
      title: 'Category'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    props: true,
    meta: {
      title: 'Cart'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Adoorei Ecommerce Assignment'
  next()
})

export default router
