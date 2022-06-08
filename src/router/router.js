import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/admin",
    component: AdminPanelView,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

export default router;
