<template>
  <provet-checkbox
    :name="name"
    :label="label"
    :checked="modelValue"
    :size="size"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
interface Props {
  name: string;
  label: string;
  modelValue: string | boolean | number;
  disabled?: boolean;
  size?: "s" | "m" | "l";
}
withDefaults(defineProps<Props>(), {
  name: undefined,
  label: undefined,
  modelValue: undefined,
  checked: false,
  disabled: false,
  size: "m",
});

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>
