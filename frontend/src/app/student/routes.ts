import { RouteConfig } from 'vue-router';

export default [
  {
    path: '',
    name: 'Student',
    component: () => import(/* webpackChunkName: "" */ '@/app/student/Student.vue'),
  },
] as Array<RouteConfig>;
