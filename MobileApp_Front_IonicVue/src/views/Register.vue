<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Register</ion-title>
        </ion-toolbar>
      </ion-header>

      <main>
        <!-- <Error :error="hasError" :errors="errorMessages" /> -->

        <form @submit.prevent="register">
          <ion-item>
            <ion-label position="stacked">Username:</ion-label>
            <Field name="username" :rules="usernameRules">
              <template #default="{ field }">
                <ion-input
                  type="text"
                  v-bind="field"
                  autocomplete="username"
                ></ion-input>
                <div v-if="field.value">
                  <ErrorMessage name="username" />
                </div>
              </template>
            </Field>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Email:</ion-label>
            <Field name="email" :rules="emailRules">
              <template #default="{ field }">
                <ion-input
                  type="email"
                  v-bind="field"
                  autocomplete="email"
                ></ion-input>
                <div v-if="field.value">
                  <ErrorMessage name="email" />
                </div>
              </template>
            </Field>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Password:</ion-label>
            <Field name="password" :rules="passwordRules">
              <template #default="{ field }">
                <ion-input
                  type="password"
                  v-bind="field"
                  autocomplete="current-password"
                ></ion-input>
                <div v-if="field.value">
                  <ErrorMessage name="password" />
                </div>
              </template>
            </Field>
          </ion-item>

          <ion-button expand="full" type="submit">Register</ion-button>
        </form>
        <div class="ion-text-center" v-if="activeSpinner">
          <br />
          <br />
          <ion-spinner color="primary"></ion-spinner>
        </div>
        <div v-if="error" class="error ion-text-center">{{ errorMessage }}</div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonInput,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import {
  useForm,
  Field,
  ErrorMessage,
  configure,
  defineRule,
} from "vee-validate";
import { required, min, email } from "@vee-validate/rules";

defineRule("customRequired", (value: string) => {
  if (!value || value.trim() === "") {
    return "Champ obligatoire";
  }
  return true;
});

defineRule("required", required);
defineRule("email", email);
defineRule("customEmail", (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value || !emailRegex.test(value)) {
    return "Entrez une adresse email valide";
  }

  return true;
});
defineRule("min", min);
defineRule("password", (value: string) => {
  if (!/(?=.*[A-Z])/.test(value)) {
    return "Le mot de passe doit contenir au moins une lettre capitale";
  }

  return true;
});

configure({
  generateMessage: (ctx) => {
    const messages = {
      customRequired: "Champ obligatoire",
      customEmail: "Entrez une adresse email valide",
      password: "Le mot de passe doit contenir au moins une lettre capitale",
      required: "Ce champ est obligatoire",
      min: "Le mot de passe doit avoir au moins 8 caractères",
      email: "Entrez une adresse email valide",
    };

    const messageKey = ctx.rule.name as keyof typeof messages;

    return messages[messageKey] ?? "This field is invalid";
  },
});

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainer,
    Field,
    ErrorMessage,
    IonSpinner,
    IonInput,
  },
  setup() {
    const { handleSubmit, resetForm, errors } = useForm();
    const activeSpinner = ref(false);

    const error = ref(false);
    const errorMessage = ref("");

    const usernameRules = "required";
    const emailRules = "customRequired|email";
    const passwordRules = "required|min:8|password";

    const authStore = useAuthStore();
    const router = useRouter();

    const register = handleSubmit(async (values) => {
      activeSpinner.value = true;
      try {
        await authStore.register(
          values.username,
          values.email,
          values.password
        );
        router.push({ path: "/home" });
      } catch (err) {
        error.value = true;
        console.log(err);
        errorMessage.value = "Register failed, try again";
      }
      activeSpinner.value = false;
      setTimeout(() => {
        errorMessage.value = "";
      }, 3000);
    });

    return {
      handleSubmit,
      errors,
      error,
      errorMessage,
      usernameRules,
      emailRules,
      passwordRules,
      register,
      activeSpinner,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
