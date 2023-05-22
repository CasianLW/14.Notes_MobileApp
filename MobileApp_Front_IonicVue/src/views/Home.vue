<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Homepage</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Homepage</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 1 page" />

      <div v-if="loggedIn">
        <h1>Hello {{ user.user.name }}</h1>
        Voici votre dashboard : <br />
        vide.
      </div>

      <div v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
      <button @click="testUserStatus">Check user status</button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { useAuthStore } from "@/stores/auth";

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
    const authStore = useAuthStore();
    const loggedIn = ref(authStore.loggedIn);
    const user = ref(authStore.user);

    function testUserStatus() {
      console.log(authStore.loggedIn);
    }

    return {
      loggedIn,
      user,
      testUserStatus,
    };
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
