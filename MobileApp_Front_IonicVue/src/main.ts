import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { IonicVue } from "@ionic/vue";

// veevalidate
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";
// Install VeeValidate rules
defineRule("required", required);
defineRule("email", email);
// Configure VeeValidate
configure({
  validateOnInput: true, // Validate on input events
});

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const app = createApp(App).use(IonicVue).use(router).use(createPinia());

// Register VeeValidate components globally
app.component("Field", Field);
app.component("Form", Form);
app.component("ErrorMessage", ErrorMessage);

router.isReady().then(() => {
  app.mount("#app");
});
