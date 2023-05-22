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

        <div v-if="error" class="error">{{ errorMessage }}</div>

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
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainer,
  },
  setup() {
    const form = ref({
      email: "",
      password: "",
    });

    const error = ref(false);
    const errorMessage = ref("");

    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      try {
        await authStore.login(form.value.email, form.value.password);
        router.push({ path: "/home" });
      } catch (err) {
        error.value = true;
        errorMessage.value = err.message;
      }
    };

    return {
      form,
      error,
      errorMessage,
      login,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
