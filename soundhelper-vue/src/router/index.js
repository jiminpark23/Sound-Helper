import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StockList from '../views/StockList.vue'
import StockOrder from '../views/StockOrder.vue'
import RealTime from '../views/RealTime.vue'
// import VueRouter from 'vue-router'
// import vue from 'vue'
// vue.use(VueRouter)

// import Query from '@/views/Query.vue'
// import Params from '@/views/Params.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: StockList
  },
  {
    path: '/order/:name',
    name: 'Query',
    component: StockOrder,
    props: true
  },
  {
    path: '/realtime',
    name: 'realtime',
    component: RealTime
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
