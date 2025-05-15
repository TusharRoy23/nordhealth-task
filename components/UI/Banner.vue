<template>
  <provet-banner
    v-bind="{
      variant,
    }"
  >
    <slot />
  </provet-banner>
</template>
<script setup lang="ts">
import "@provetcloud/web-components/lib/Banner";
interface Props {
  variant?: "info" | "danger" | "success" | "warning";
}
withDefaults(defineProps<Props>(), {
  variant: "info",
});
</script>
