<template>
    <main>
      <h1>Account</h1>

      <p>🔒 Connected user only</p>

      <div v-if="loggedIn">

      <h2>Connected user</h2>

      <ul>
        <li>ID : {{  user.id }}</li>
        <li>Username  : {{ user.username }}</li>
        <li>Email : {{ user.email }}</li>
      </ul>
    </div>

    <div v-else>You're not connected yet.</div>
    </main>
  </template>

  <script>
    import { useAuthStore } from '../stores/auth'
  import { mapState } from 'pinia'

  export default {
    name: "Account",
    computed: {
      ...mapState(useAuthStore, ['loggedIn', 'user'])
    }
  }
  </script>