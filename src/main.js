import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Draggable from "vuedraggable";
import App from "@/App.vue";
import router from "@/router/router";

const app = createApp(App);
app.component("base-draggable", Draggable);

app.use(router).mount("#app");
