<template>
  <provet-button
    v-bind="{
      id,
      slot,
      type,
      variant,
      disabled,
      loading,
      size,
    }"
  >
    <slot />
  </provet-button>
</template>
<script setup lang="ts">
import "@provetcloud/web-components/lib/Button";
interface Props {
  id?: string;
  variant?: "default" | "primary" | "dashed" | "plain" | "danger";
  type?: "button" | "submit" | "reset";
  size?: "s" | "m" | "l";
  disabled?: boolean;
  loading?: boolean;
  slot?: "start" | "end";
}

withDefaults(defineProps<Props>(), {
  id: "button",
  variant: "primary",
  type: "button",
  size: "m",
  disabled: false,
  loading: false,
  slot: "start",
});
</script>
