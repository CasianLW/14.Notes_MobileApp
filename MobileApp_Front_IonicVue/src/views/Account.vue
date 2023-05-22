<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Account page" />

      <main>
        <h1>Account</h1>

        <p>🔒 Connected user only</p>

        <div v-if="loggedIn">
          <h2>Connected user</h2>

          <ul>
            <li>ID : {{ user.id }}</li>
            <li>Username : {{ user.name }}</li>
            <li>Email : {{ user.email }}</li>
          </ul>
        </div>

        <div v-else>You're not connected yet.</div>
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
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user.user);
const loggedIn = computed(() => authStore.loggedIn);
</script>

<!-- <style scoped>
  </style> -->
