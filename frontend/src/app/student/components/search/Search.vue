<template>
  <v-text-field
    placeholder="Buscar"
    dense
    outlined
    prepend-inner-icon="mdi-magnify"
    clearable
    hide-details
    @input="emitInput($event)"
  />
</template>

<script lang="ts" src="./Search.ts"></script>
