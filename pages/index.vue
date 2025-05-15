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
            placeholder="username@example.com"
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
            @input="handlePasswordInput"
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
            @input="handleConfirmPasswordInput"
          />
          <Checkbox
            id="receiveAnnouncements"
            v-model="form.receiveAnnouncements"
            name="check"
            label="Are you want to receive announcements?"
            :disabled="isSubmitting"
          />
          <Banner v-if="errorMsg" variant="danger">
            {{ errorMsg }}
          </Banner>
        </Stack>
        <template #cardFooter>
          <Button
            id="submit"
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
import { useApiFetch } from "~/helper/helper";
import type { User } from "~/utils/types";

const router = useRouter();
const initialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  receiveAnnouncements: false,
};
const isSubmitting = ref(false);
const errorMsg = ref(null);
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
    {
      condition: (val: string) => !/[\s]/.test(val),
      message: "Password cannot contain spaces",
    },
    {
      condition: (val: string) =>
        !/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}]/u.test(
          val,
        ),
      message: "Password cannot contain emojis",
    },
    {
      condition: (val: string) => /[A-Z]/.test(val),
      message: "Password must contain at least one uppercase letter",
    },
    {
      condition: (val: string) => /[a-z]/.test(val),
      message: "Password must contain at least one lowercase letter",
    },
    {
      condition: (val: string) => /[0-9]/.test(val),
      message: "Password must contain at least one number",
    },
    {
      condition: (val: string) => /[^A-Za-z0-9]/.test(val),
      message: "Password must contain at least one special character",
    },
    {
      condition: (val: string) =>
        /^[A-Za-z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/.test(val),
      message: "Password contains invalid characters",
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
const validateField = (fieldName: keyof typeof errors): boolean => {
  const rules = validationRules[fieldName];
  if (!rules?.length) {
    errors[fieldName] = "";
    return true;
  }

  const failedRule = rules.find((rule) => !rule.condition(form[fieldName]));
  errors[fieldName] = failedRule?.message || "";
  return !failedRule;
};

const handlePasswordInput = () => {
  validateField("password");
  if (form.confirmPassword) validateField("confirmPassword");
};

const handleConfirmPasswordInput = () => {
  validateField("confirmPassword");
};

// Validate entire form
const validateForm = (): boolean => {
  return Object.keys(validationRules)
    .filter((field) => field !== "receiveAnnouncements") // skip checkbox
    .every((field) => validateField(field as keyof typeof errors));
};

const simulateApiCall = async () => {
  const { data, error } = await useApiFetch("/api/signup", {
    method: "POST",
    body: {
      email: form.email,
      password: form.password,
      receiveAnnouncements: form.receiveAnnouncements,
    } as User,
  });

  if (error.value) {
    errorMsg.value = error.value.data.data.message;
    return false;
  }

  console.log("data: ", data);
  return true;
};

const handleSubmit = async () => {
  errorMsg.value = null;
  if (!validateForm()) return;

  isSubmitting.value = true;

  const simulate = process.env.NODE_ENV === "development";

  if (simulate && !(await simulateApiCall())) {
    isSubmitting.value = false;
    return;
  }

  if (simulate) {
    handleRouteChange();
  } else {
    setTimeout(handleRouteChange, 3000);
  }
};

const handleRouteChange = async () => {
  try {
    await router.push("/thank-you");
  } catch (error) {
    console.error("Navigation error:", error);
  } finally {
    isSubmitting.value = false;
    Object.assign(form, initialFormState);
  }
};
</script>
