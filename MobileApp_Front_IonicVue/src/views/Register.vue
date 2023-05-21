<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Register</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Register page" />
      <main>
        <h1>Register</h1>

        <Error :error="hasError" :errors="errorMessages" />

        <form @submit.prevent="register">
          <table border="0">
            <tbody>
              <tr>
                <td>Username:</td>
                <td>
                  <input
                    type="text"
                    size="20"
                    v-model="values.username"
                    autocomplete="username"
                  />
                  <span v-if="errors.username" class="error">{{
                    errors.username[0]
                  }}</span>
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="email"
                    size="20"
                    v-model="values.email"
                    autocomplete="email"
                  />
                  <span v-if="errors.email" class="error">{{
                    errors.email[0]
                  }}</span>
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input
                    type="password"
                    size="20"
                    v-model="values.password"
                    autocomplete="current-password"
                  />
                  <span v-if="errors.password" class="error">{{
                    errors.password[0]
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit">Register</button>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useField, useForm } from "vee-validate";
// import { required, email, min } from "@vee-validate/rules";
import Error from "../components/Error.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { email, minLength, required } from "@vuelidate/validators";

interface Form {
  username: string;
  email: string;
  password: string;
}

interface ErrorObject {
  $property: string;
  $message: string;
}

const form: Form = reactive({
  username: "",
  email: "",
  password: "",
});

// const validationSchema = {
//   username: {},
//   email: {
//     email,
//   },
//   password: {
//     min: minLength(8),
//   },
// };

const { handleSubmit, resetForm, values, errors } = useForm<Form>({});

const hasError = ref(false);
const errorMessages = ref<ErrorObject[]>([]);

const authStore = useAuthStore();
const router = useRouter();

async function register() {
  console.log(values.username);
  try {
    console.log(values.username);
    await authStore.register(values.username, values.email, values.password);
    console.log(values.username);
    router.push({ name: "account" });
  } catch (error) {
    if (error instanceof Error) {
      hasError.value = true;
      errorMessages.value.push({
        $property: error.name,
        $message: error.message,
      });
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
