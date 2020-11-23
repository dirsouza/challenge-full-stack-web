import Vue from 'vue';
import VueTheMask, { mask } from 'vue-the-mask';

Vue.directive('mask', mask);
Vue.use(VueTheMask);
