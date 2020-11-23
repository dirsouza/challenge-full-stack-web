import Vue from 'vue';
import Loading, { PluginOptions } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const config: PluginOptions = {
  color: '#1976d2',
  backgroundColor: '#1E2257',
  loader: 'bars',
  width: 96,
  height: 96,
};

Vue.use(Loading, config);
