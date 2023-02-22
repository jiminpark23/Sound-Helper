import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StockList from '../views/StockList.vue'
import PopUp from '../views/PopUp.vue'
import StockOrder from '../views/StockOrder.vue'
import StockChart from '../views/StockChart.vue'

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
    path: '/popup',
    name: 'popup',
    component: PopUp
  },
  {
    path: '/order/:name/chart',
    name: 'chart',
    component: StockChart
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
