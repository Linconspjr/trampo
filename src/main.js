import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App)
  .use(bootstrap)
  .component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
