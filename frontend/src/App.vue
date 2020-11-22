<template>
  <v-app id="inspire">
    <AppBar />

    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/support/common/components/app-bar/AppBar.vue';

export default Vue.extend({
  components: {
    AppBar,
  },
});
</script>
