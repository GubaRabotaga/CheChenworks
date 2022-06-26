import { createApp } from "vue";
import Draggable from "vuedraggable";
import App from "@/App.vue";
import router from "@/router/router";
import store from "@/store";
import ui from "@/components/UI";
import icons from "@/components/icons";

const app = createApp(App);

app.component("base-draggable", Draggable);

ui.forEach((component) => {
  app.component(component.name, component);
});

icons.forEach((icon) => {
  app.component(icon.name, icon);
});

app.use(router).use(store).mount("#app");
