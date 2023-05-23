<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>

      <main>
        <!-- <h1 class="ion-text-center">Account</h1> -->

        <p class="ion-text-center" v-if="loggedIn">🔒 Connected user only</p>

        <ion-card v-if="loggedIn">
          <ion-card-content>
            <ion-card-title class="ion-text-center"
              >Connected User</ion-card-title
            >

            <ion-list>
              <ion-item>
                <ion-label>ID</ion-label>
                <ion-note slot="end">{{ user.id }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Username</ion-label>
                <ion-note slot="end">{{ user.name }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Email</ion-label>
                <ion-note slot="end">{{ user.email }}</ion-note>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <div class="ion-text-center" v-else>
          <p>You're not connected yet.</p>
          <ion-button router-link="/login" expand="block">Login</ion-button>
          <ion-button router-link="/register" expand="block"
            >Register</ion-button
          >
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user.user);
const loggedIn = computed(() => authStore.loggedIn);
</script>

<style scoped>
ion-card {
  margin-top: 20px;
}
</style>
