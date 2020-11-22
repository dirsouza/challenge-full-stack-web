import Vue from 'vue';

type TMenu = {
  icon: string;
  text: string;
}

export default Vue.extend({
  name: 'Menu',

  data: () => ({
    items: [
      { icon: 'mdi-account-multiple', text: 'Alunos' },
    ] as Array<TMenu>,
  }),
});
