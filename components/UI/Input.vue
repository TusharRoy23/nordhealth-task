<template>
  <provet-input
    v-bind="{
      id,
      name,
      type: showPassword ? 'text' : type,
      label,
      value: modelValue,
      placeholder,
      disabled,
      readonly,
      size,
      error,
      autocomplete,
    }"
    @input="handleInput"
    @change="handleChange"
  >
    <Button
      v-if="type === 'password'"
      v-bind="{ slot: 'end', type: 'button', variant: 'default' }"
      @click="togglePasswordVisibility"
    >
      <provet-icon
        :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'"
      />
    </Button>
  </provet-input>
</template>
<script setup lang="ts">
import "@provetcloud/web-components/lib/Input";
interface Props {
  id?: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  label?: string | undefined;
  modelValue?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean;
  readonly?: boolean;
  size?: "s" | "m" | "l";
  error?: string | undefined;
  autocomplete?: "off" | "on";
}
withDefaults(defineProps<Props>(), {
  id: "input",
  type: "text",
  label: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  size: "m",
  error: undefined,
  autocomplete: "off",
  modelValue: undefined,
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
