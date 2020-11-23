import Vue from 'vue';
import '@/support/plugins/vee-validate';
import '@/support/plugins/vue-the-mask';
import '@/support/plugins/vue-loading';
import '@/support/plugins/sweetalert';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/support/plugins/vuetify';

import '@/sass/overrides.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
