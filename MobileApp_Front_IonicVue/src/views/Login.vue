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

      <ExploreContainer name="Login page" />
      <main>
        <h1>Login</h1>

        <Error :error="error" :errors="errors" />

        <form @submit.prevent="login">
          <table border="0">
            <tbody>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="text"
                    size="20"
                    v-model="form.email"
                    autocomplete="username"
                  />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input
                    type="password"
                    size="20"
                    v-model="form.password"
                    autocomplete="current-password"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit">Login</button>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import Error from "../components/Error.vue";

interface Form {
  email: string;
  password: string;
}

const form: Form = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  };
});

const v$ = useVuelidate(rules, form);

interface Error {
  $property: string;
  $message: string;
}

const errors = ref<Error[]>([]);
const error = computed(() => v$.$error);

const authStore = useAuthStore();
const router = useRouter();

async function login() {
  if (!v$.$pending) {
    errors.value = [];
    error.value = false;

    if (!v$.$invalid) {
      try {
        await authStore.login(form.email, form.password);
        router.push({ name: "account" });
      } catch (err: any) {
        error.value = true;
        errors.value.push({
          $property: err.name,
          $message: err.message,
        });
      }
    } else {
      v$.$resetValidation();

      for (const key in form) {
        form[key] = "";
      }
    }
  }
}
</script>
