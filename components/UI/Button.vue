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
  variant: "primary",
  type: "button",
  size: "m",
  disabled: false,
  loading: false,
  slot: "start",
});
</script>
