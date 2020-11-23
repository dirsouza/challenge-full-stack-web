import Vue from 'vue';

export default Vue.extend({
  name: 'Search',

  methods: {
    emitInput(search: string): void {
      if (
        search === null
        || search.length > 1
        || search.length === 0
      ) {
        this.$emit('input', search);
      }
    },
  },
});
