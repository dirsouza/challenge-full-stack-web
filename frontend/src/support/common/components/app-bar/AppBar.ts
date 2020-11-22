import Vue from 'vue';
import Menu from '@/support/common/components/menu/Menu.vue';

export default Vue.extend({
  name: 'AppBar',

  components: {
    Menu,
  },

  data: () => ({
    drawer: undefined as unknown | boolean,
  }),
});
