import Vue from 'vue';
import App from 'Support/common/App.vue';
import router from './support/router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
