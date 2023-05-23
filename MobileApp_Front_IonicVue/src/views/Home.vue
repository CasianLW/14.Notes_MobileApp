<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Homepage</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Homepage</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-text-center" v-if="loggedIn">
        <h1>Hello {{ user.user.name }},</h1>
        <p>Voici votre dashboard :</p>
        <ion-button router-link="/notes" expand="full"
          >Voir vos notes</ion-button
        >
        <ion-button router-link="/account" fill="outline"
          >Voir votre compte</ion-button
        >
      </div>

      <div v-else class="ion-text-center">
        <ion-button router-link="/login" expand="full">Login</ion-button>
        <ion-button router-link="/register" expand="full">Register</ion-button>
      </div>
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
  IonButton,
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
    IonButton,
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

<!-- <style scoped>

</style> -->
