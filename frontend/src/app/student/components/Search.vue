<template>
  <v-text-field
    ref="inputSearch"
    placeholder="Buscar"
    dense
    outlined
    prepend-inner-icon="mdi-magnify"
    clearable
    hide-details
    @input="emitInput($event)"
  />
</template>

<script lang="ts">
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

</script>
