<template>
  <div>
    <Table />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Table from '@/app/student/components/Table.vue';

export default Vue.extend({
  name: 'Student',

  components: {
    Table,
  },
});

</script>
