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
    path: '/searchResult/:result',
    name: 'SearchResult',
    component: () => import('../views/pages/SearchResult.vue'),
  },
  {
    path: '/scenePage/:id',
    name: 'ScenePage',
    component: () => import('../views/pages/ScenePage.vue'),
  },
  {
    path: '/notFound/:result',
    name: 'NotFound',
    component: () => import('../views/pages/NotFound.vue'),
  },
];
const router = new VueRouter({
  routes,
});

export default router;
