import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import UserPanelView from "@/views/UserPanelView.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/admin",
    component: AdminPanelView,
  },
  {
    path: "/user",
    component: UserPanelView,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

export default router;
