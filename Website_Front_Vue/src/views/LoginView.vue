<template>
    <main>
      <h1>Login</h1>

      <Error :error="error" :errors="errors" />

      <form @submit.prevent="login">
        <table border="0">
          <tbody>
            <tr>
              <td>Email:</td>
              <td><input type="text" size="20" v-model="form.email" autocomplete="username"></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input type="password" size="20" v-model="form.password" autocomplete="current-password"></td>
            </tr>
          </tbody>
        </table>
        <br>
        <button type="submit">Login</button>
      </form>
    </main>
  </template>

  <script>
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import Error from "../components/Error.vue"
  import { useAuthStore } from '../stores/auth'
  import { mapActions } from 'pinia'

  export default {
    name: "Login",
    setup () {
    return { v$: useVuelidate() }
  },
  components: { Error },
  validations () {
    return {
      form: {
        email: { required, email },
        password: { required, minLenght: minLength(8) },
      }
    }
  },
    data() {
      return {
        form: {},
        error: false,
        errors: []
      }
    },
    methods: {
      ...mapActions(useAuthStore, { signIn: 'login'}),
      async login() {
        this.v$.$touch();

        this.error = this.v$.$error;
        this.errors = this.v$.$errors;

        if (this.v$.$error) {
          return;
        }
          /*
        try {

        const response = await axios.post("http://127.0.0.1:3000/login", {
          email: this.form.email,
          password: this.form.password
        });

        //console.log(response.data);

        const user = response.data;

        */

        /*
        const store = useAuthStore();
        store.$patch({
          loggedIn: true,
          user: user
        });
        */

        try {
        await this.signIn(this.form.email, this.form.password);
        this.$router.push({name: "account"});
      } catch(error) {
          console.log('ok');
          this.error = true;
          this.errors.push({
            $property: error.name,
            $message: error.message
          });
        }
        /*
        } catch(error) {
          console.log('ok');
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