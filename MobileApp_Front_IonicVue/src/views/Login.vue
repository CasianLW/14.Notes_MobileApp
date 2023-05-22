<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- <ExploreContainer name="Login page" /> -->

      <main>
        <h1>Login</h1>

        <div v-if="error" class="error">{{ errorMessage }}</div>

        <form @submit.prevent="login">
          <ion-item>
            <ion-label position="stacked">Email:</ion-label>
            <Field name="email" :rules="emailRules">
              <template #default="{ field }">
                <ion-input
                  type="text"
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

          <ion-button expand="full" type="submit">Login</ion-button>
          <div class="ion-text-center" v-if="activeSpinner">
            <ion-spinner color="primary"></ion-spinner>
          </div>
        </form>
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
      min: "Le mot de passe doit avoir au moins 8 caractéres",
      email: "Entrez une adresse email valide", // This is the custom message for the email rule
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
  },
  setup() {
    const activeSpinner = ref(false);
    const { handleSubmit, resetForm, errors } = useForm();

    const error = ref(false);
    const errorMessage = ref("");
    const emailRules = "customRequired|email";
    const passwordRules = "required|min:8|password";

    const authStore = useAuthStore();
    const router = useRouter();

    const login = handleSubmit(async (values) => {
      activeSpinner.value = true;
      try {
        await authStore.login(values.email, values.password);
        router.push({ path: "/home" });
      } catch (err) {
        error.value = true;
        errorMessage.value = err.message;
      }
      activeSpinner.value = false;
    });

    return {
      error,
      errorMessage,
      login,
      handleSubmit,
      errors,
      emailRules,
      passwordRules,
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
