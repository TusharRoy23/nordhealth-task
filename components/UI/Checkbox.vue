<template>
  <provet-checkbox
    v-bind="{
      id,
      name,
      label,
      checked: modelValue,
      size,
      disabled,
    }"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
import "@provetcloud/web-components/lib/Checkbox";
interface Props {
  id?: string;
  name: string;
  label: string;
  modelValue?: string | boolean | number;
  disabled?: boolean;
  size?: "s" | "m" | "l";
}
withDefaults(defineProps<Props>(), {
  id: "checkbox",
  disabled: false,
  size: "m",
  modelValue: false,
});

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>
