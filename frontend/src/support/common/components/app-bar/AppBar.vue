<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <Menu />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dark
      flat
      color="blue darken-3"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndDown"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title
        class="ml-0 pl-4"
      >
        <v-img
          src="https://www.grupoa.com.br/hs-fs/hubfs/logo-rodape.png?width=130&name=logo-rodape.png"
          contain
          max-width="75"
        />
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script lang="ts" src="./AppBar.ts"></script>
