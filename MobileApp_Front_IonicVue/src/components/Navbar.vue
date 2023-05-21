<template>
 <nav>
        <RouterLink to="/">Home</RouterLink> |
        <span v-if="!loggedIn"><RouterLink to="/register">Register</RouterLink> | </span>
        <span v-if="!loggedIn"><RouterLink to="/login">Login</RouterLink></span>
        <span v-if="loggedIn"><RouterLink to="/account">Account</RouterLink> | </span>
        <a v-if="loggedIn" href="#" @click.prevent="logout">Logout</a>
    </nav>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { mapActions, mapState } from 'pinia'

export default {
    name: "Navbar",
    computed: {
        ...mapState(useAuthStore, ['loggedIn', 'user'])
    },
    methods: {
        ...mapActions(useAuthStore, { signOut: 'logout'}),
        async logout() {
            /*
            const store = useAuthStore();
            const token = store.user.token;

            //const token = this.user.token;

            if (!token) {
                return;
            }

            const response = await axios.post("http://127.0.0.1:3000/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            */

            try {
            this.signOut();
            this.$router.push({name: "home"});
            } catch (e) {
                console.log(e);
                return;
            }
        }
    }
}
</script>
