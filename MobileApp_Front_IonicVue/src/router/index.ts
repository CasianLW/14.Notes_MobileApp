import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/Account.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/notes",
    component: () => import("@/views/Notes.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/notes/:id",
    component: () => import("@/views/NoteDetail.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.meta.requiresAuth && !store.loggedIn) {
    return next({
      path: "/login",
    });
  }

  if (to.meta.requiresGuest && store.loggedIn) {
    return next({
      path: "/home",
    });
  }

  next();
});

export default router;
