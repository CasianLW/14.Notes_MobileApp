<template>
  <header>
    <Navbar />

    <p v-if="loggedIn">Bienvenue, {{ user.username }}</p>
  </header>

  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue"
import { useAuthStore } from './stores/auth'
import { mapState, mapActions } from 'pinia'
import axios from 'axios'

export default {
  components: { Navbar },
  computed: {
    ...mapState(useAuthStore, ['loggedIn', 'user'])
  },
  methods: {
    ...mapActions(useAuthStore, ['login'])
  },
  async mounted() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:3000/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            //console.log(response.data);
            const user = response.data;
            this.login(user);

    } catch(error) {
      console.log(error);
    }

  }
}
</script>
