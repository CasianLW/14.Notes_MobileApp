import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    loggedIn: false,
  }),
  actions: {
    async register(username, email, password) {
      try {
        const response = await axios.post("http://127.0.0.1:3000/register", {
          email: email,
          password: password,
          username: username,
        });
        //console.log(response.data);

        const user = response.data;

        this.loggedIn = true;
        this.user = user;
        localStorage.setItem("token", user.token);
      } catch (error) {
        throw error;
      }
    },
    async login(email, password) {
      try {
        const response = await axios.post("http://127.0.0.1:3000/login", {
          email: email,
          password: password,
        });

        const user = response.data;

        this.loggedIn = true;
        this.user = user;
        localStorage.setItem("token", user.token);
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      if (!this.user.token) {
        throw new Error("Token does not exist");
      }

      try {
        await axios.post(
          "http://127.0.0.1:3000/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.user.token}`,
            },
          }
        );
        this.loggedIn = false;
        this.user = {};
        localStorage.removeItem("token");
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
});
