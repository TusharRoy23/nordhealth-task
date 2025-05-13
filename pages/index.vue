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
      condition: (val: string) => /[A-Z]/.test(val),
      message: "Password must contain at least one uppercase letter",
    },
    {
      condition: (val: string) => /[a-z]/.test(val),
      message: "Password must contain at least one lowercase letter",
    },
    {
      condition: (val: string) => /[^A-Za-z0-9]/.test(val),
      message: "Password must contain at least one special character",
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
  errorMsg.value = null;
  if (!validateForm()) return;

  isSubmitting.value = true;

  /*
      This can be tested on development mode. In future, it will be replaced with actual backend API call
      */
  if (process.env.NODE_ENV === "development") {
    const { data, error } = await useApiFetch("/api/signup", {
      method: "POST",
      body: {
        email: form.email,
        password: form.password,
        receiveAnnouncements: form.receiveAnnouncements,
      } as User,
    });

    isSubmitting.value = false;

    if (error.value) {
      errorMsg.value = error.value.data.data.message;
      return;
    }
    console.log("data: ", data);
  }

  /*
    setTimeout will be used to simulate a delay for the API call
    In a real-world scenario, this will be removed.
  */
  if (process.env.NODE_ENV === "development") {
    handleRouteChange();
  } else {
    setTimeout(() => {
      handleRouteChange();
    }, 3000);
  }
};

const handleRouteChange = () => {
  try {
    router.push("/thank-you");
  } catch (error) {
    console.error("Navigation error:", error);
  } finally {
    isSubmitting.value = false;
    Object.assign(form, initialFormState);
  }
};
</script>
