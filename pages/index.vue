<template>
  <Stack width="340px" margin="var(--n-space-xl) auto">
    <form autocomplete="off" @submit.prevent="handleSubmit">
      <Card>
        <template #cardHeader> Sign Up </template>
        <Stack>
          <Input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            label="Email"
            placeholder="example@mail.com"
            :error="errors.email"
            expand
            required
            :disabled="isSubmitting"
            @blur="validateField('email')"
            @input="validateField('email')"
          />
          <Input
            id="password"
            v-model="form.password"
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            :error="errors.password"
            expand
            required
            :disabled="isSubmitting"
            @blur="validateField('password')"
            @input="
              validateField('password');
              validateField('confirmPassword');
            "
          />
          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="******"
            :error="errors.confirmPassword"
            expand
            required
            :disabled="isSubmitting"
            @blur="validateField('confirmPassword')"
            @input="
              validateField('confirmPassword');
              validateField('password');
            "
          />
          <Checkbox
            v-model="form.receiveAnnouncements"
            name="check"
            label="Are you want to receive announcements?"
            :disabled="isSubmitting"
          />
        </Stack>
        <template #cardFooter>
          <Button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            :loading="isSubmitting"
            expand
          >
            Sign Up
          </Button>
        </template>
      </Card>
    </form>
  </Stack>
</template>
<script setup lang="ts">
const router = useRouter();
const initialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  receiveAnnouncements: false,
};
const isSubmitting = ref(false);
const form = reactive({ ...initialFormState });

// Validation errors
const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    Object.values(errors).every((error) => !error) &&
    form.email &&
    form.password &&
    form.confirmPassword
  );
});

const validationRules = {
  email: [
    {
      condition: (val: string) => !!val,
      message: "Email is required",
    },
    {
      condition: (val: string) => /^\S+@\S+\.\S+$/.test(val),
      message: "Please enter a valid email",
    },
  ],
  password: [
    {
      condition: (val: string) => !!val,
      message: "Password is required",
    },
    {
      condition: (val: string) => val.length >= 6,
      message: "Password must be at least 6 characters",
    },
  ],
  confirmPassword: [
    {
      condition: (val: string) => val === form.password,
      message: "Passwords do not match",
    },
  ],
  receiveAnnouncements: [], // No validation rules for this field
};

// Validate a single field
const validateField = (fieldName: keyof typeof form) => {
  const rules = validationRules[fieldName] || [];
  if (fieldName === "receiveAnnouncements") return true;

  if (!rules) return true;

  for (const rule of rules) {
    if (!rule.condition(form[fieldName] as string)) {
      errors[fieldName] = rule.message;
      return false;
    }
  }

  errors[fieldName] = "";
  return true;
};

// Validate entire form
const validateForm = () => {
  let isValid = true;

  Object.keys(validationRules).forEach((field) => {
    if (!validateField(field as keyof typeof form)) {
      isValid = false;
    }
  });

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  setTimeout(() => {
    try {
      console.log("Form submitted:", form);
      router.push("/thank-you");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      isSubmitting.value = false;
      Object.assign(form, initialFormState);
    }
  }, 3000);
};
</script>
