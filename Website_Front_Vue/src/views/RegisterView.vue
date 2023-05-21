<template>
    <main>
      <h1>Register</h1>

      <Error :error="error" :errors="errors" />

      <form @submit.prevent="register">
        <table border="0">
          <tbody>
            <tr>
              <td>Username:</td>
              <td><input type="text" size="20" autocomplete="username" v-model="form.username"></td>
            </tr>
            <tr>
              <td>Email:</td>
              <td><input type="text" size="20" autocomplete="username" v-model="form.email"></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input type="password" size="20" autocomplete="current-password" v-model="form.password"></td>
            </tr>
          </tbody>
        </table>
        <br>
        <button type="submit">Create account</button>
      </form>
    </main>
  </template>

  <script>
  import Error from "../components/Error.vue"
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import { useAuthStore } from '../stores/auth'
  import { mapActions } from 'pinia'

  export default {
    name: "Register",
    setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      form: {
        username: { required },
        email: { required, email },
        password: { required, minLenght: minLength(8) },
      }
    }
  },
    data() {
      return {
        form: {
          username: "",
          email: "",
          password: ""
        },
        error: false,
        errors: []
      }
    },
      components: { Error },
      methods: {
        ...mapActions(useAuthStore, { createAccount: 'register'}),
        async register() {
          this.v$.$touch();

        this.error = this.v$.$error;
        this.errors = this.v$.$errors;

        if (this.v$.$error) {
          return;
        }

        try {
          await this.createAccount(this.form.username, this.form.email, this.form.password);
          this.$router.push({name: "account"});
        } catch(error) {
          this.error = true;
          this.errors.push({
            $property: error.name,
            $message: error.message
          });
        }
/*
        try {
        const response = await axios.post("http://127.0.0.1:3000/register", {
          email: this.form.email,
          password: this.form.password,
          username: this.form.username
        });
        //console.log(response.data);

        const user = response.data;

        this.signIn(user);

        this.$router.push({name: "account"});
        } catch(error) {
          this.error = true;
          this.errors.push({
            $property: error.name,
            $message: error.message
          });
          return;
        }
        */

        }
      }
  }
  </script>