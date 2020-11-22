import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Default from '@/layouts/Default.vue';
import RoutesApp from '@/app/routes';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Default,
    children: [
      ...RoutesApp,
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
