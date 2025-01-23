import "./assets/css/remedy.scss";
import "./assets/css/variables.scss";

import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(store).mount("#app");
