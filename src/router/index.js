import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/pages/Home.vue'),
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: () => import('../views/pages/SearchResult.vue'),
  },
  {
    path: '/scenePage',
    name: 'ScenePage',
    component: () => import('../views/pages/ScenePage.vue'),
  },
  {
    path: '/notFound',
    name: 'NotFound',
    component: () => import('../views/pages/NotFound.vue'),
  },
];
const router = new VueRouter({
  routes,
});

export default router;
