<template>
  <provet-header v-bind="{ slot: 'header' }">
    <router-link :to="{ path: '/' }" class="no-underline">
      <h1 class="n-typescale-l">NordHealth</h1>
    </router-link>
  </provet-header>
</template>
<script setup lang="ts">
import "@provetcloud/web-components/lib/Header";
</script>
<style lang="css" scoped>
.no-underline {
  text-decoration: none;
}
</style>
