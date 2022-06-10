import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Draggable from "vuedraggable";
import App from "@/App.vue";
import router from "@/router/router";
import store from "@/store";
import components from "@/components/UI";

const app = createApp(App);

app.component("base-draggable", Draggable);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).use(store).mount("#app");
