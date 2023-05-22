<!-- <template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template> -->
<template>
  <ion-menu side="start" content-id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item @click="closeMenu" router-link="/home">Home</ion-item>
        <ion-item
          @click="closeMenu"
          v-if="!userIsAuthenticated"
          router-link="/login"
          >Login</ion-item
        >
        <ion-item
          @click="closeMenu"
          v-if="!userIsAuthenticated"
          router-link="/register"
          >Register</ion-item
        >
        <ion-item
          @click="closeMenu"
          v-if="userIsAuthenticated"
          router-link="/notes"
          >Notes</ion-item
        >
        <ion-item v-if="userIsAuthenticated" @click="logout">Logout</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <div class="ion-page" id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Notes App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <router-view />
    </ion-content>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";
import { useAuthStore } from "@/stores/auth.js";

import { menuController } from "@ionic/vue";

export default defineComponent({
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButtons,
    IonMenuButton,
  },
  setup() {
    const authStore = useAuthStore();
    console.log(authStore.user);
    console.log(authStore.loggedIn);

    function closeMenu() {
      menuController.close();
    }

    function logout() {
      authStore.logout();
      closeMenu();
    }
    const userIsAuthenticated = computed(() => authStore.loggedIn);

    return {
      userIsAuthenticated,
      logout,
      closeMenu,
    };
  },
});
</script>
