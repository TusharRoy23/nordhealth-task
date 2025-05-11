<template>
  <provet-banner
v-bind="{
    variant
  }">
    <slot />
  </provet-banner>
</template>
<script setup lang="ts">
interface Props {
  variant?: "info" | "danger" | "success" | "warning";
}
withDefaults(defineProps<Props>(), {
  variant: "info",
});
</script>
