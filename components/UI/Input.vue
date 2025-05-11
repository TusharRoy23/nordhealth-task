<template>
  <provet-input
    :name="name"
    :type="showPassword ? 'text' : type"
    :label="label"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :size="size"
    :error="error"
    @input="handleInput"
    @change="handleChange"
  >
    <Button
      v-if="type === 'password'"
      slot="end"
      type="button"
      variant="default"
      @click="togglePasswordVisibility"
    >
      <provet-icon
        :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'"
      />
    </Button>
  </provet-input>
</template>
<script setup lang="ts">
interface Props {
  name: string;
  type: "text" | "email" | "password" | "number";
  label?: string | undefined;
  modelValue?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean;
  readonly?: boolean;
  size?: "s" | "m" | "l";
  error?: string | undefined;
}
withDefaults(defineProps<Props>(), {
  type: "text",
  label: undefined,
  modelValue: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  size: "m",
});

const emit = defineEmits(["update:modelValue"]);

// Password visibility state
const showPassword = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const handleChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
